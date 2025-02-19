<?php
/**
 * API Coupon Check class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Misc;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Coupon_Check' ) ) {
	/**
	 * API Coupon Check class
	 */
	class DDWCPOS_API_Coupon_Check {
		/**
		 * Base Name
		 *
		 * @var string $base the route base
		 */
		public $base = 'check-coupon';

		/**
		 * API Callback.
		 *
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				$response = [
					'success' => false,
					'message' => '',
				];

				$coupon_code = strip_tags( $request[ 'coupon_code' ] );
				$customer_id = $request[ 'customer' ][ 'id' ];

				if ( ! empty( $coupon_code ) ) {
					$coupon = new \WC_Coupon( $coupon_code );

					if ( 0 === $coupon->get_id() ) {
						$response[ 'message' ] = esc_html__( 'Invalid coupon code', 'ddwc-multipos' );
					} else {
						$coupon_data = [
							'price'        => wc_format_decimal( $coupon->get_amount(), 2 ),
							'code'         => $coupon->get_code(),
							'type'         => $coupon->get_discount_type(),
							'date_expires' => $coupon->get_date_expires(),
							'restrictions' => [
								'minimum_amount'              => $coupon->get_minimum_amount(),
								'maximum_amount'              => $coupon->get_maximum_amount(),
								'exclude_sale_items'          => $coupon->get_exclude_sale_items(),
								'product_ids'                 => $coupon->get_product_ids(),
								'excluded_product_ids'        => $coupon->get_excluded_product_ids(),
								'product_categories'          => $coupon->get_product_categories(),
								'excluded_product_categories' => $coupon->get_excluded_product_categories(),
								'email_restrictions'          => $coupon->get_email_restrictions(),
								'individual_use'              => $coupon->get_individual_use(),
							],
						];

						$WC_Coupon_Data_Store_CPT = new \WC_Coupon_Data_Store_CPT();
						$used_by_customer         = $WC_Coupon_Data_Store_CPT->get_usage_by_user_id( $coupon, $customer_id );
						$total_usage_by_customer  = $coupon->get_usage_limit_per_user();

						if ( empty( $total_usage_by_customer ) || ( $total_usage_by_customer - $used_by_customer ) > 0 ) {
							if ( empty( $coupon_data[ 'date_expires' ] ) || strtotime( current_time( 'Y-m-d' ) ) <= strtotime( $coupon_data[ 'date_expires' ]->date( 'Y-m-d' ) ) ) {
								$response[ 'coupon' ] = $coupon_data;
								// $response[ 'coupon' ] = [
								//     'code'         => $coupon_data[ 'coupon' ][ 'code' ],
								//     'price'        => $coupon_data[ 'coupon' ][ 'amount' ],
								//     'type'         => $coupon_data[ 'coupon' ][ 'type' ],
								//     'restrictions' => $coupon_data[ 'coupon' ][ 'restrictions' ],
									// 'product_ids'        => ! empty( $coupon_data[ 'coupon' ][ 'product_ids' ] ) ? $coupon_data[ 'coupon' ][ 'product_ids' ] : [],
									// 'product_categories' => ! empty( $coupon_data[ 'coupon' ][ 'product_categories' ] ) ? $coupon_data[ 'coupon' ][ 'product_categories' ] : [],
								// ];

								$response[ 'success' ] = true;
								$response[ 'message' ] = esc_html__( 'Coupon Applied Successfully.', 'ddwc-multipos' );
							} else {
								$response[ 'message' ] = esc_html__( 'Sorry, Coupon Expired. Try another one!', 'ddwc-multipos' );
							}
						} else {
							$response[ 'message' ] = esc_html__( 'Sorry, Coupon already used at limit by this customer.', 'ddwc-multipos' );
						}
					}
				} else {
					$response[ 'message' ] = esc_html__( 'Invalid Coupon', 'ddwc-multipos' );
				}

				return apply_filters( 'ddwcpos_modify_api_coupon_response', $response, $coupon_code );
			} catch ( \Exception $e ) {
				return \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
