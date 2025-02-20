<?php
/**
 * REST API Reports revenue stats controller
 *
 * Handles requests to the /reports/taxes/stats endpoint.
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Reports\Taxes\Stats;

use DDWCMultiPOS\Api\Includes\Reports\TimeInterval;
use DDWCMultiPOS\Api\Includes\Reports\Taxes\DDWCPOS_Taxes_DataStore;
use DDWCMultiPOS\Api\DDWCPOS_Sql_Query;
use Automattic\WooCommerce\Admin\API\Reports\Taxes\Stats\Segmenter;

defined( 'ABSPATH' ) || exit();

/**
 * REST API Reports taxes stats controller class.
 */
class DDWCPOS_Taxes_Stats extends DDWCPOS_Taxes_DataStore {

	/**
	 * Mapping columns to data type to return correct response types.
	 *
	 * @var array
	 */
	protected $column_types = [
		'tax_codes'    => 'intval',
		'total_tax'    => 'floatval',
		'order_tax'    => 'floatval',
		'shipping_tax' => 'floatval',
		'orders_count' => 'intval',
	];

	/**
	 * SQL columns to select in the db query and their mapping to SQL code.
	 *
	 * @var array
	 */
	protected $report_columns = [
		'tax_codes'    => 'COUNT(DISTINCT tax_rate_id) as tax_codes',
		'total_tax'    => 'SUM(total_tax) AS total_tax',
		'order_tax'    => 'SUM(order_tax) as order_tax',
		'shipping_tax' => 'SUM(shipping_tax) as shipping_tax',
	];

	/**
	 * Constructor
	 */
	public function __construct() {
		global $wpdb;
		$table_name = $wpdb->prefix . self::TABLE_NAME;
		// Avoid ambigious column order_id in SQL query.
		$this->report_columns['orders_count'] = "COUNT( DISTINCT ( CASE WHEN parent_id = 0 THEN {$table_name}.order_id END ) ) as orders_count";
	}

	/**
	 * Updates the database query with parameters used for Taxes Stats report
	 *
	 * @param array $query_args       Query arguments supplied by the user.
	 */
	protected function update_sql_query_params( $query_args ) {
		$taxes_where_clause = '';

		global $wpdb;
		$order_tax_lookup_table = $wpdb->prefix . self::TABLE_NAME;

		if ( isset( $query_args['taxes'] ) && ! empty( $query_args['taxes'] ) ) {
			$allowed_taxes       = implode( ',', $query_args['taxes'] );
			$taxes_where_clause .= " AND {$order_tax_lookup_table}.tax_rate_id IN ({$allowed_taxes})";
		}

		$order_status_filter = $this->get_status_subquery( $query_args );
		if ( $order_status_filter ) {
			$taxes_where_clause .= " AND ( {$order_status_filter} )";
		}

		if ( ! empty( $query_args[ 'outlet_id' ] ) ) {
			$taxes_where_clause = " AND postmeta.meta_key = '_ddwcpos_outlet_id' AND postmeta.meta_value=" . $query_args[ 'outlet_id' ];
		} else {
			$taxes_where_clause = " AND postmeta.meta_key = '_ddwcpos_outlet_id'";
		}

		$this->add_time_period_sql_params( $query_args, $order_tax_lookup_table );
		$this->total_query->add_sql_clause( 'where', $taxes_where_clause );

		$this->add_intervals_sql_params( $query_args, $order_tax_lookup_table );
		$this->interval_query->add_sql_clause( 'where', $taxes_where_clause );
		$this->interval_query->add_sql_clause( 'select', $this->get_sql_clause( 'select' ) . ' AS time_interval' );
		$this->interval_query->add_sql_clause( 'where_time', $this->get_sql_clause( 'where_time' ) );
	}

	/**
	 * Get taxes associated with a store.
	 *
	 * @param array $args Array of args to filter the query by. Supports `include`.
	 * @return array An array of all taxes.
	 */
	public static function get_taxes( $args ) {
		global $wpdb;
		$query = "
			SELECT
				tax_rate_id,
				tax_rate_country,
				tax_rate_state,
				tax_rate_name,
				tax_rate_priority
			FROM {$wpdb->prefix}woocommerce_tax_rates
		";
		if ( ! empty( $args['include'] ) ) {
			$included_taxes = implode( ',', $args['include'] );
			$query         .= " WHERE tax_rate_id IN ({$included_taxes})";
		}
		return $wpdb->get_results( $query, ARRAY_A ); // WPCS: cache ok, DB call ok, unprepared SQL ok.
	}

	/**
	 * Returns the report data based on parameters supplied by the user.
	 *
	 * @param array $query_args  Query parameters.
	 * @return stdClass|WP_Error Data.
	 */
	public function get_items( $query_args ) {
		global $wpdb;

		$table_name = $wpdb->prefix . self::TABLE_NAME;

		// These defaults are only partially applied when used via REST API, as that has its own defaults.
		$defaults   = [
			'per_page' => get_option( 'posts_per_page' ),
			'page'     => 1,
			'order'    => 'DESC',
			'orderby'  => 'tax_rate_id',
			'before'   => TimeInterval::default_before(),
			'after'    => TimeInterval::default_after(),
			'fields'   => '*',
			'taxes'    => [],
		];

		$query_args = wp_parse_args( $query_args, $defaults );
		$this->normalize_timezones( $query_args, $defaults );

		$cache_key = $this->get_cache_key( $query_args );
		$data      = wp_cache_get( $cache_key, $this->cache_group );

		if ( false === $data ) {
			$this->initialize_queries();

			$data = (object) [
				'totals'    => (object) [],
				'intervals' => (object) [],
				'total'     => 0,
				'pages'     => 0,
				'page_no'   => 0,
			];

			$selections       = $this->selected_columns( $query_args );
			$params           = $this->get_limit_params( $query_args );
			$order_stats_join = "JOIN {$wpdb->prefix}wc_order_stats ON {$table_name}.order_id = {$wpdb->prefix}wc_order_stats.order_id";

			$reports_type_join = " JOIN {$wpdb->prefix}postmeta as postmeta ON (postmeta.post_id={$wpdb->prefix}wc_order_stats.order_id || postmeta.post_id={$wpdb->prefix}wc_order_stats.parent_id)";

			$this->update_sql_query_params( $query_args );
			$this->interval_query->add_sql_clause( 'join', $order_stats_join );
			$this->interval_query->add_sql_clause( 'join', $reports_type_join );

			$db_intervals            = $wpdb->get_col(
				$this->interval_query->get_query_statement()
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.
			$db_interval_count       = count( $db_intervals );
			$expected_interval_count = TimeInterval::intervals_between( $query_args['after'], $query_args['before'], $query_args['interval'] );
			$total_pages             = (int) ceil( $expected_interval_count / $params['per_page'] );

			if ( $query_args['page'] < 1 || $query_args['page'] > $total_pages ) {
				return $data;
			}
			$this->total_query->add_sql_clause( 'select', $selections );
			$this->total_query->add_sql_clause( 'join', $order_stats_join );
			$this->total_query->add_sql_clause( 'join', $reports_type_join );
			$this->total_query->add_sql_clause( 'where_time', $this->get_sql_clause( 'where_time' ) );

			$totals = $wpdb->get_results(
				$this->total_query->get_query_statement(),
				ARRAY_A
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.

			if ( null === $totals ) {
				return new \WP_Error( 'woocommerce_analytics_taxes_stats_result_failed', esc_html__( 'Sorry, fetching revenue data failed.', 'ddwc-multipos' ) );
			}

			// @todo remove these assignements when refactoring segmenter classes to use query objects.
			$totals_query          = [
				'from_clause'       => $this->total_query->get_sql_clause( 'join' ),
				'where_time_clause' => $this->total_query->get_sql_clause( 'where_time' ),
				'where_clause'      => $this->total_query->get_sql_clause( 'where' ),
			];
			$intervals_query       = [
				'select_clause'     => $this->get_sql_clause( 'select' ),
				'from_clause'       => $this->interval_query->get_sql_clause( 'join' ),
				'where_time_clause' => $this->interval_query->get_sql_clause( 'where_time' ),
				'where_clause'      => $this->interval_query->get_sql_clause( 'where' ),
			];
			$segmenter             = new Segmenter( $query_args, $this->report_columns );
			$totals[0]['segments'] = $segmenter->get_totals_segments( $totals_query, $table_name );

			$this->update_intervals_sql_params( $query_args, $db_interval_count, $expected_interval_count, $table_name );

			if ( '' !== $selections ) {
				$this->interval_query->add_sql_clause( 'select', ', ' . $selections );
			}

			$this->interval_query->add_sql_clause( 'select', ", MAX({$table_name}.date_created) AS datetime_anchor" );
			$this->interval_query->add_sql_clause( 'order_by', $this->get_sql_clause( 'order_by' ) );
			$this->interval_query->add_sql_clause( 'limit', $this->get_sql_clause( 'limit' ) );

			$intervals = $wpdb->get_results(
				$this->interval_query->get_query_statement(),
				ARRAY_A
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.

			if ( null === $intervals ) {
				return new \WP_Error( 'woocommerce_analytics_taxes_stats_result_failed', esc_html__( 'Sorry, fetching tax data failed.', 'ddwc-multipos' ) );
			}

			$totals = (object) $this->cast_numbers( $totals[0] );

			$data = (object) [
				'totals'    => $totals,
				'intervals' => $intervals,
				'total'     => $expected_interval_count,
				'pages'     => $total_pages,
				'page_no'   => (int) $query_args['page'],
			];

			if ( TimeInterval::intervals_missing( $expected_interval_count, $db_interval_count, $params['per_page'], $query_args['page'], $query_args['order'], $query_args['orderby'], count( $intervals ) ) ) {
				$this->fill_in_missing_intervals( $db_intervals, $query_args['adj_after'], $query_args['adj_before'], $query_args['interval'], $data );
				$this->sort_intervals( $data, $query_args['orderby'], $query_args['order'] );
				$this->remove_extra_records( $data, $query_args['page'], $params['per_page'], $db_interval_count, $expected_interval_count, $query_args['orderby'], $query_args['order'] );
			} else {
				$this->update_interval_boundary_dates( $query_args['after'], $query_args['before'], $query_args['interval'], $data->intervals );
			}

			$segmenter->add_intervals_segments( $data, $intervals_query, $table_name );
			$this->create_interval_subtotals( $data->intervals );

			wp_cache_set( $cache_key, $data, $this->cache_group );
		}

		return $data;
	}

	/**
	 * Initialize query objects.
	 */
	protected function initialize_queries() {
		global $wpdb;
		$this->clear_all_clauses();
		unset( $this->subquery );
		$this->total_query = new DDWCPOS_Sql_Query( $this->context . '_total' );
		$this->total_query->add_sql_clause( 'from', $wpdb->prefix . self::TABLE_NAME );

		$this->interval_query = new DDWCPOS_Sql_Query( $this->context . '_interval' );
		$this->interval_query->add_sql_clause( 'from', $wpdb->prefix . self::TABLE_NAME );
		$this->interval_query->add_sql_clause( 'group_by', 'time_interval' );
	}

	/**
	 * Returns string to be used as cache key for the data.
	 *
	 * @param array $params query parameters
	 *
	 * @return string
	 */
	protected function get_cache_key( $params ) {
		global $wpdb;
		return 'woocommerce_' . $wpdb->prefix . self::TABLE_NAME . '_stats_' . md5( wp_json_encode( $params ) );
	}
}
