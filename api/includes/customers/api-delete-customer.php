<?php
/**
 * API Delete Customer class
 *
 * @package MultiPOS - Point of Sale for WCFM Marketplace
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Customers;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Delete_Customer' ) ) {
	/**
     * API Delete Customer class
     */
	class DDWCPOS_API_Delete_Customer {
		/**
		 * Base Name
		 *
		 * @var string $base the route base
		 */
		public $base = 'delete-customer';

		/**
		 * API Callback.
		 * 
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				if ( empty( $request[ 'cashier_id' ] ) || empty( $request[ 'customer_id' ] ) ) {
                    return new \WP_Error( 'rest_invalid_param', esc_html__( 'Params are missing.', 'ddwc-multipos' ) );
                }

				$customer_id = $request[ 'customer_id' ];
				$customer    = get_user_by( 'ID', $customer_id );

				if ( ! $customer ) {
					return new \WP_Error( 'customer_not_found', esc_html__( 'Customer not found.', 'ddwc-multipos' ) );
				}

				require_once( ABSPATH . 'wp-admin/includes/user.php' );

				$response = wp_delete_user( $customer_id );

				return apply_filters( 'ddwcpos_modify_api_delete_customer_response', $customer_id, $request );
			} catch ( \Exception $e ) {
				return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
