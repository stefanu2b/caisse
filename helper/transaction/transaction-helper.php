<?php
/**
 * Transaction Helper class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 */

namespace DDWCMultiPOS\Helper\Transaction;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_Transaction_Helper' ) ) {
	/**
	 * Transaction Helper class
	 */
	class DDWCPOS_Transaction_Helper {
		/**
		 * Database Object
		 *
		 * @var object
		 */
		protected $wpdb;

		/**
		 * Transaction table variable
		 *
		 * @var string
		 */
		protected $transactions_table;

		/**
		 * Outlet table Variable
		 *
		 * @var string
		 */
		protected $outlet_table;

		/**
		 * Users table Variable
		 *
		 * @var string
		 */
		protected $users_table;

		/**
		 * Construct
		 */
		public function __construct() {
			global $wpdb;
			$this->wpdb = $wpdb;

			$this->transactions_table = $this->wpdb->prefix . 'ddwcpos_transactions';
			$this->outlet_table       = $this->wpdb->prefix . 'ddwcpos_outlets';
			$this->users_table        = $this->wpdb->users;
		}

		/**
		 * Save transaction to DB function
		 *
		 * @param array $data
		 * @return int
		 */
		public function ddwcpos_save_transaction( $data ) {
			$default_data = [
				'cashier_id' => 0,
				'outlet_id'  => 0,
				'order_id'   => NULL,
				'in'         => '',
				'out'        => '',
				'method'     => '',
				'reference'  => '',
				'date'       => current_time( 'Y-m-d H:i:s' ),
			];

			$data = wp_parse_args( $data, $default_data );
			$this->wpdb->insert(
				$this->transactions_table,
				$data,
				[ '%d', '%d', '%d', '%s', '%s', '%s', '%s', '%s' ]
			);

			return $this->wpdb->insert_id;
		}

		/**
		 * Get all transactions function
		 *
		 * @param int $per_page
		 * @param int $offset
		 * @param string $search
		 * @return array
		 */
		public function ddwcpos_get_all_transactions( $per_page, $offset, $search ) {
			$conditions = '';

			if ( ! empty( $_GET[ 'outlet-id' ] ) ) {
				$conditions .= $this->wpdb->prepare( " AND transactions.outlet_id=%s", $_GET[ 'outlet-id' ] );
			}
			if ( ! empty( $_GET[ 'transaction-from-date' ] ) ) {
				$transaction_from_date = $_GET[ 'transaction-from-date' ];
				$transaction_to_date   = ! empty( $_GET[ 'transaction-to-date' ] ) ? $_GET[ 'transaction-to-date' ] : $transaction_from_date;
				$conditions           .= $this->wpdb->prepare( " AND DATE(date) BETWEEN %s AND %s", $transaction_from_date, $transaction_to_date );
			}
			if ( ! empty( $_GET[ 'cashier-id' ] ) ) {
				$conditions .= $this->wpdb->prepare( " AND transactions.cashier_id=%d", $_GET[ 'cashier-id' ] );
			}
			if ( ! empty( $search ) ) {
				$conditions .= $this->wpdb->prepare( " AND transactions.id LIKE %s", '%' . $search . '%' );
			}

			$data = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT DISTINCT transactions.* FROM $this->transactions_table as transactions LEFT JOIN $this->users_table as users ON transactions.cashier_id=users.ID LEFT JOIN $this->outlet_table as outlets ON transactions.outlet_id=outlets.id WHERE 1=1 $conditions ORDER BY id DESC LIMIT %d OFFSET %d", $per_page, $offset ), ARRAY_A );

			return apply_filters( 'ddwcpos_modify_transactions_data', $data, $per_page, $offset, $search );
		}

		/**
		 * Get all transactions count function
		 *
		 * @param int $per_page
		 * @param int $offset
		 * @param string $search
		 * @return array
		 */
		public function ddwcpos_get_all_transactions_count( $search ) {
			$conditions = '';

			if ( ! empty( $_GET[ 'outlet-id' ] ) ) {
				$conditions .= $this->wpdb->prepare( " AND transactions.outlet_id=%s", $_GET[ 'outlet-id' ] );
			}
			if ( ! empty( $_GET[ 'transaction-from-date' ] ) ) {
				$transaction_from_date = $_GET[ 'transaction-from-date' ];
				$transaction_to_date   = ! empty( $_GET[ 'transaction-to-date' ] ) ? $_GET[ 'transaction-to-date' ] : $transaction_from_date;
				$conditions           .= $this->wpdb->prepare( " AND DATE(date) BETWEEN %s AND %s", $transaction_from_date, $transaction_to_date );
			}
			if ( ! empty( $_GET[ 'cashier-id' ] ) ) {
				$conditions .= $this->wpdb->prepare( " AND transactions.cashier_id=%d", $_GET[ 'cashier-id' ] );
			}
			if ( ! empty( $search ) ) {
				$conditions .= $this->wpdb->prepare( " AND transactions.id LIKE %s", '%' . $search . '%' );
			}

			$data = $this->wpdb->get_var( "SELECT count(DISTINCT transactions.id) FROM $this->transactions_table as transactions JOIN $this->users_table as users ON transactions.cashier_id=users.ID LEFT JOIN $this->outlet_table as outlets ON transactions.outlet_id=outlets.id WHERE 1=1 $conditions" );

			return apply_filters( 'ddwcpos_modify_transactions_count_data', $data, $search );
		}

		/**
		 * Get transaction details by id function
		 *
		 * @param int $id
		 * @return array
		 */
		public function ddwcpos_get_transaction_details_by_id( $id ) {
			$data = $this->wpdb->get_row( $this->wpdb->prepare( "SELECT * FROM $this->transactions_table WHERE id=%d", $id ), ARRAY_A );

			return apply_filters( 'ddwcpos_modify_transaction_details', $data, $id );
		}

		/**
		 * Delete transaction function
		 * 
		 * @param int $id
		 * @return int|bool
		 */
		public function ddwcpos_delete_transaction( $id ) {
			return $this->wpdb->delete(
				$this->transactions_table,
				[
					'id' => $id
				],
				[ '%d' ]
			);
		}
	}
}
