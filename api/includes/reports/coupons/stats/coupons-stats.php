<?php
/**
 * REST API Reports coupons stats controller
 *
 * Handles requests to the /reports/coupons/stats endpoint.
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Reports\Coupons\Stats;

use DDWCMultiPOS\Api\Includes\Reports\TimeInterval;
use DDWCMultiPOS\Api\Includes\Reports\Coupons\DDWCPOS_Coupons_DataStore;

defined( 'ABSPATH' ) || exit();

/**
 * REST API Reports coupons stats controller class.
 *
 * @extends DDWCPOS_Coupons_DataStore
 */
class DDWCPOS_Coupons_Stats extends DDWCPOS_Coupons_DataStore {

	/**
	 * Mapping columns to data type to return correct response types.
	 *
	 * @var array
	 */
	protected $column_types = [
		'date_start'     => 'strval',
		'date_end'       => 'strval',
		'date_start_gmt' => 'strval',
		'date_end_gmt'   => 'strval',
		'amount'         => 'floatval',
		'coupons_count'  => 'intval',
		'orders_count'   => 'intval',
	];

	/**
	 * SQL columns to select in the db query.
	 *
	 * @var array
	 */
	protected $report_columns = [
		'amount'        => 'SUM(discount_amount) as amount',
		'coupons_count' => 'COUNT(DISTINCT coupon_id) as coupons_count',
		'orders_count'  => 'COUNT(DISTINCT order_id) as orders_count',
	];

	/**
	 * Constructor
	 */
	public function __construct() {
		global $wpdb;
		$table_name = $wpdb->prefix . self::TABLE_NAME;
		// Avoid ambigious column order_id in SQL query.
		$this->report_columns['orders_count'] = str_replace( 'order_id', $table_name . '.order_id', $this->report_columns['orders_count'] );
	}

	/**
	 * Updates the database query with parameters used for Products Stats report: categories and order status.
	 *
	 * @param array $query_args       Query arguments supplied by the user.
	 * @param array $totals_params    SQL parameters for the totals query.
	 * @param array $intervals_params SQL parameters for the intervals query.
	 */
	protected function update_sql_query_params( $query_args, &$totals_params, &$intervals_params ) {
		global $wpdb;

		$coupons_where_clause = '';
		$coupons_from_clause  = '';

		$order_coupon_lookup_table = $wpdb->prefix . self::TABLE_NAME;

		$included_coupons = $this->get_included_coupons( $query_args );
		if ( $included_coupons ) {
			$coupons_where_clause .= " AND {$order_coupon_lookup_table}.coupon_id IN ({$included_coupons})";
		}

		$order_status_filter = $this->get_status_subquery( $query_args );
		if ( $order_status_filter ) {
			$coupons_from_clause  .= " JOIN {$wpdb->prefix}wc_order_stats ON {$order_coupon_lookup_table}.order_id = {$wpdb->prefix}wc_order_stats.order_id";
			$coupons_where_clause .= " AND ( {$order_status_filter} )";
		}

		$reports_type_join = " JOIN {$wpdb->prefix}postmeta as postmeta ON (postmeta.post_id={$wpdb->prefix}wc_order_stats.order_id || postmeta.post_id={$wpdb->prefix}wc_order_stats.parent_id)";

		$totals_params                  = array_merge( $totals_params, $this->get_time_period_sql_params( $query_args, $order_coupon_lookup_table ) );
		$totals_params['where_clause'] .= $coupons_where_clause;
		$totals_params['from_clause']  .= $coupons_from_clause;
		$totals_params['from_clause']  .= $reports_type_join;

		$intervals_params                  = array_merge( $intervals_params, $this->get_intervals_sql_params( $query_args, $order_coupon_lookup_table ) );
		$intervals_params['where_clause'] .= $coupons_where_clause;
		$intervals_params['from_clause']  .= $coupons_from_clause;
		$intervals_params['from_clause']  .= $reports_type_join;
	}

	/**
	 * Returns the report data based on parameters supplied by the user.
	 *
	 * @since 3.5.0
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
			'orderby'  => 'date',
			'before'   => TimeInterval::default_before(),
			'after'    => TimeInterval::default_after(),
			'fields'   => '*',
			'interval' => 'week',
			'coupons'  => [],
		];
		$query_args = wp_parse_args( $query_args, $defaults );
		$this->normalize_timezones( $query_args, $defaults );

		$cache_key = $this->get_cache_key( $query_args );
		$data      = wp_cache_get( $cache_key, $this->cache_group );

		if ( false === $data ) {
			$data = (object) [
				'data'    => [],
				'total'   => 0,
				'pages'   => 0,
				'page_no' => 0,
			];

			$selections      = $this->selected_columns( $query_args );
			$totals_query    = [];
			$intervals_query = [];
			$this->update_sql_query_params( $query_args, $totals_query, $intervals_query );

			$db_intervals = $wpdb->get_col(
				"SELECT
					{$intervals_query['select_clause']} AS time_interval
				FROM
					{$table_name}
					{$intervals_query['from_clause']}
				WHERE
					1=1
					{$intervals_query['where_time_clause']}
					{$intervals_query['where_clause']}
				GROUP BY
					time_interval"
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.

			$db_interval_count       = count( $db_intervals );
			$expected_interval_count = TimeInterval::intervals_between( $query_args['after'], $query_args['before'], $query_args['interval'] );
			$total_pages             = (int) ceil( $expected_interval_count / $intervals_query['per_page'] );
			if ( $query_args['page'] < 1 || $query_args['page'] > $total_pages ) {
				return $data;
			}

			$totals = $wpdb->get_results(
				"SELECT
					{$selections}
				FROM
					{$table_name}
					{$totals_query['from_clause']}
				WHERE
					1=1
					{$totals_query['where_time_clause']}
					{$totals_query['where_clause']}",
				ARRAY_A
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.

			if ( null === $totals ) {
				return $data;
			}
			$totals[0]['segments'] = [];
			$totals                = (object) $this->cast_numbers( $totals[0] );

			// Intervals.
			$this->update_intervals_sql_params( $intervals_query, $query_args, $db_interval_count, $expected_interval_count, $table_name );

			if ( '' !== $selections ) {
				$selections = ', ' . $selections;
			}

			$intervals = $wpdb->get_results(
				"SELECT
					MAX({$table_name}.date_created) AS datetime_anchor,
					{$intervals_query['select_clause']} AS time_interval
					{$selections}
				FROM
					{$table_name}
					{$intervals_query['from_clause']}
				WHERE
					1=1
					{$intervals_query['where_time_clause']}
					{$intervals_query['where_clause']}
				GROUP BY
					time_interval
				ORDER BY
					{$intervals_query['order_by_clause']}
				{$intervals_query['limit']}",
				ARRAY_A
			); // WPCS: cache ok, DB call ok, unprepared SQL ok.

			if ( null === $intervals ) {
				return $data;
			}

			$data = (object) [
				'totals'    => $totals,
				'intervals' => $intervals,
				'total'     => $expected_interval_count,
				'pages'     => $total_pages,
				'page_no'   => (int) $query_args['page'],
			];

			if ( TimeInterval::intervals_missing( $expected_interval_count, $db_interval_count, $intervals_query['per_page'], $query_args['page'], $query_args['order'], $query_args['orderby'], count( $intervals ) ) ) {
				$this->fill_in_missing_intervals( $db_intervals, $query_args['adj_after'], $query_args['adj_before'], $query_args['interval'], $data );
				$this->sort_intervals( $data, $query_args['orderby'], $query_args['order'] );
				$this->remove_extra_records( $data, $query_args['page'], $intervals_query['per_page'], $db_interval_count, $expected_interval_count, $query_args['orderby'], $query_args['order'] );
			} else {
				$this->update_interval_boundary_dates( $query_args['after'], $query_args['before'], $query_args['interval'], $data->intervals );
			}
			$this->create_interval_subtotals( $data->intervals );

			wp_cache_set( $cache_key, $data, $this->cache_group );
		}

		return $data;
	}

	/**
	 * Returns string to be used as cache key for the data.
	 *
	 * @param array $params Query parameters.
	 * @return string
	 */
	protected function get_cache_key( $params ) {
		return 'woocommerce_' . self::TABLE_NAME . '_stats_' . md5( wp_json_encode( $params ) );
	}
}
