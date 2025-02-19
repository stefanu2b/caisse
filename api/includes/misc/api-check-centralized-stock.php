<?php
/**
 * API Check Centralized Stock class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Misc;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Check_Centralized_Stock' ) ) {
	/**
	 * API API Check Centralized Stock class
	 */
	class DDWCPOS_API_Check_Centralized_Stock {
		/**
		 * Base Name.
		 *
		 * @var string the route base
		 */
		public $base = 'check-centralized-stock';

		/**
		 * API Callback.
		 *
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				$cart_list = json_decode( $request[ 'cart_data' ] );

				$response = [ 'out_of_stock_products' => [] ];

				if ( ! empty( $cart_list ) ) {
					foreach ( $cart_list as $key => $cart_data ) {
						$product_id           = $cart_data->product_id;
						$quantity             = $cart_data->quantity;
						$product              = wc_get_product( $product_id );

						if ( ! $product ) {
							continue;
						}
						// $manage_stock         = get_post_meta( $product_id, '_manage_stock', true );
						$product_stock_status = $product->get_stock_status();
						$product_stock        = false;

						if ( $product->get_manage_stock() ) {
							$product_stock = intval( $product->get_stock_quantity() );
						}

						if ( ! $product->backorders_allowed() && ( 'outofstock' === $product_stock_status || ( 'instock' === $product_stock_status && is_numeric( $product_stock ) && $quantity > $product_stock ) ) ) {
							$response[ 'out_of_stock_products' ][] = $product_id;
						}
					}
				}

				return apply_filters( 'ddwcpos_modify_api_check_centralized_stock_response', $response, $cart_list );
			} catch (Exception $e) {
				return \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
