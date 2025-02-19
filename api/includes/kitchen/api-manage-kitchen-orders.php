<?php
/**
 * API Manage Kitchen Orders class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Kitchen;

use DDWCMultiPOS\Helper\Outlet\DDWCPOS_Outlet_Helper;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Manage_Kitchen_Orders' ) ) {
	/**
	 * API Manage Kitchen Orders class
	 */
	class DDWCPOS_API_Manage_Kitchen_Orders {
		/**
		 * Base Name
		 *
		 * @var string $base the route base
		 */
		public $base = 'manage-kitchen-orders';

		/**
		 * API Callback.
		 * 
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				if ( empty( $request[ 'outlet_id' ] ) || empty( $request[ 'action' ] ) ) {
					return new \WP_Error( 'rest_invalid_param', esc_html__( 'Params are missing.', 'ddwc-multipos' ) );
				}

				$outlet_id      = $request[ 'outlet_id' ];
				$action         = $request[ 'action' ];
				$outlet_helper  = new DDWCPOS_Outlet_Helper();
				$kitchen_orders = $outlet_helper->ddwcpos_get_outlet_meta( $outlet_id, '_ddwcpos_kitchen_orders', true );

				if ( empty( $kitchen_orders ) ) {
					$kitchen_orders = [];

					if ( 'add' === $action ) {
						$kitchen_orders[] = $request[ 'order_data' ];

						$outlet_helper->ddwcpos_update_outlet_meta( $outlet_id, '_ddwcpos_kitchen_orders', $kitchen_orders );
					}
				} else {
					if ( 'add' === $action ) {
						$new_data = true;
						foreach ( $kitchen_orders as $key => $value ) {
							if ( $value[ 'id' ] == $request[ 'order_data' ][ 'id' ] ) {
								$kitchen_orders[ $key ] = $request[ 'order_data' ];
								$new_data = false;
								break;
							}
						}

						if ( $new_data ) {
							$kitchen_orders[] = $request[ 'order_data' ];
						}

						$outlet_helper->ddwcpos_update_outlet_meta( $outlet_id, '_ddwcpos_kitchen_orders', $kitchen_orders );
					} else if ( 'remove' === $action ) {
						$new_data = false;

						foreach ( $kitchen_orders as $key => $value ) {
							if ( $value[ 'id' ] == $request[ 'order_data' ][ 'id' ] ) {
								// $kitchen_orders[ $key ][ 'kitchen_status' ] = 'ready';
								unset( $kitchen_orders[ $key ] );
								$new_data = true;
								break;
							}
						}

						if ( $new_data ) {
							$kitchen_orders = array_values( $kitchen_orders );
							$outlet_helper->ddwcpos_update_outlet_meta( $outlet_id, '_ddwcpos_kitchen_orders', $kitchen_orders );
						}
					}
				}

				return apply_filters( 'ddwcpos_modify_api_manage_kitchen_order_response', $kitchen_orders, $request );
			} catch ( \Exception $e ) {
				return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
