<?php
/**
 * API Manage Customer class
 *
 * @package MultiPOS - Point of Sale for WCFM Marketplace
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Customers;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Manage_Customer' ) ) {
	/**
     * API Manage Customer class
     */
	class DDWCPOS_API_Manage_Customer {
		/**
		 * Base Name
		 *
		 * @var string $base the route base
		 */
		public $base = 'manage-customer';

		/**
		 * API Callback.
		 * 
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				if ( empty( $request[ 'cashier_id' ] ) || empty( $request[ 'customer_data' ] ) ) {
                    return new \WP_Error( 'rest_invalid_param', esc_html__( 'Params are missing.', 'ddwc-multipos' ) );
                }

				$customer_data = $request[ 'customer_data' ];

				if ( ! empty( $customer_data[ 'id' ] ) ) {
					wp_update_user(
						[
							'ID'         => $customer_data[ 'id' ],
							'user_email' => $customer_data[ 'email' ],
							'nickname'   => $customer_data[ 'email' ],
							'first_name' => $customer_data[ 'first_name' ],
							'last_name'  => $customer_data[ 'last_name' ],
						]
					);

					$customer = new \WC_Customer( $customer_data[ 'id' ] );

					$customer->set_first_name( $customer_data[ 'first_name' ] );

					$customer->set_last_name( $customer_data[ 'last_name' ] );

					$customer->set_billing_first_name( $customer_data[ 'first_name' ] );
					$customer->set_billing_last_name( $customer_data[ 'last_name' ] );
					$customer->set_billing_address_1( $customer_data[ 'address_1' ] );
					$customer->set_billing_address_2( $customer_data[ 'address_2' ] );
					$customer->set_billing_country( $customer_data[ 'country' ] );
					$customer->set_billing_state( $customer_data[ 'state' ] );
					$customer->set_billing_city( $customer_data[ 'city' ] );
					$customer->set_billing_postcode( $customer_data[ 'postcode' ] );
					$customer->set_billing_email( $customer_data[ 'email' ] );
					$customer->set_billing_phone( $customer_data[ 'phone' ] );

					$customer->set_shipping_first_name( $customer_data[ 'first_name' ] );
					$customer->set_shipping_last_name( $customer_data[ 'last_name' ] );
					$customer->set_shipping_address_1( $customer_data[ 'address_1' ] );
					$customer->set_shipping_address_2( $customer_data[ 'address_2' ] );
					$customer->set_shipping_country( $customer_data[ 'country' ] );
					$customer->set_shipping_state( $customer_data[ 'state' ] );
					$customer->set_shipping_city( $customer_data[ 'city' ] );
					$customer->set_shipping_postcode( $customer_data[ 'postcode' ] );

					$customer->save();

					$data = [
						'id'         => $customer_data[ 'id' ],
						'email'      => $customer->get_email(),
						'first_name' => $customer->get_first_name(),
						'last_name'  => $customer->get_last_name(),
						'username'   => $customer->get_username(),
						'avatar_url' => $customer->get_avatar_url(),
						'coupons'    => [],
						'phone'      => $customer_data[ 'phone' ],
						'default'    => 0,
						'billing'    => [
							'first_name' => $customer->get_billing_first_name(),
							'last_name'  => $customer->get_billing_last_name(),
							'company'    => $customer->get_billing_company(),
							'address_1'  => $customer->get_billing_address_1(),
							'address_2'  => $customer->get_billing_address_2(),
							'city'       => $customer->get_billing_city(),
							'state'      => $customer->get_billing_state(),
							'postcode'   => $customer->get_billing_postcode(),
							'country'    => $customer->get_billing_country(),
							'email'      => $customer->get_billing_email(),
							'phone'      => $customer_data[ 'phone' ],
						],
						'shipping'  => [
							'first_name' => $customer->get_shipping_first_name(),
							'last_name'  => $customer->get_shipping_last_name(),
							'company'    => $customer->get_shipping_company(),
							'address_1'  => $customer->get_shipping_address_1(),
							'address_2'  => $customer->get_shipping_address_2(),
							'city'       => $customer->get_shipping_city(),
							'state'      => $customer->get_shipping_state(),
							'postcode'   => $customer->get_shipping_postcode(),
							'country'    => $customer->get_shipping_country(),
						],
					];

					$message = esc_html__( 'Customer updated successfully.', 'ddwc-multipos' );
				} else {
					if ( apply_filters( 'ddwcpos_manage_customer_custom_check', false, $customer_data, $request ) ) {
						$response = [
							'success' => false,
							'message' => apply_filters( 'ddwcpos_manage_customer_custom_check_error_message', esc_html__( 'Manage customer custom check error message.', 'ddwc-multipos' ), $customer_data, $request ),
						];

						return $response;
					} elseif ( email_exists( $customer_data[ 'email' ] ) ) {
						$response = [
							'success' => false,
							'message' => esc_html__( 'Email already exists', 'ddwc-multipos' ),
						];

						return $response;
					} else {
						$username    = wc_create_new_customer_username( $customer_data[ 'email' ] );
						$password    = wp_generate_password();
						$customer_id = wc_create_new_customer( $customer_data[ 'email' ], $username, $password );

						wp_update_user(
							[
								'ID'         => $customer_id,
								'user_email' => $customer_data[ 'email' ],
								'nickname'   => $customer_data[ 'email' ],
								'first_name' => $customer_data[ 'first_name' ],
								'last_name'  => $customer_data[ 'last_name' ],
							]
						);

						$customer = new \WC_Customer( $customer_id );

						$customer->set_first_name( $customer_data[ 'first_name' ] );

						$customer->set_last_name( $customer_data[ 'last_name' ] );

						$customer->set_billing_first_name( $customer_data[ 'first_name' ] );
						$customer->set_billing_last_name( $customer_data[ 'last_name' ] );
						$customer->set_billing_address_1( $customer_data[ 'address_1' ] );
						$customer->set_billing_address_2( $customer_data[ 'address_2' ] );
						$customer->set_billing_country( $customer_data[ 'country' ] );
						$customer->set_billing_state( $customer_data[ 'state' ] );
						$customer->set_billing_city( $customer_data[ 'city' ] );
						$customer->set_billing_postcode( $customer_data[ 'postcode' ] );
						$customer->set_billing_email( $customer_data[ 'email' ] );
						$customer->set_billing_phone( $customer_data[ 'phone' ] );

						$customer->set_shipping_first_name( $customer_data[ 'first_name' ] );
						$customer->set_shipping_last_name( $customer_data[ 'last_name' ] );
						$customer->set_shipping_address_1( $customer_data[ 'address_1' ] );
						$customer->set_shipping_address_2( $customer_data[ 'address_2' ] );
						$customer->set_shipping_country( $customer_data[ 'country' ] );
						$customer->set_shipping_state( $customer_data[ 'state' ] );
						$customer->set_shipping_city( $customer_data[ 'city' ] );
						$customer->set_shipping_postcode( $customer_data[ 'postcode' ] );

						$customer->save();

						$data = [
							'id'         => $customer_id,
							'email'      => $customer->get_email(),
							'first_name' => $customer->get_first_name(),
							'last_name'  => $customer->get_last_name(),
							'username'   => $customer->get_username(),
							'avatar_url' => $customer->get_avatar_url(),
							'coupons'    => [],
							'phone'      => $customer_data[ 'phone' ],
							'billing'    => [
								'first_name' => $customer->get_billing_first_name(),
								'last_name'  => $customer->get_billing_last_name(),
								'company'    => $customer->get_billing_company(),
								'address_1'  => $customer->get_billing_address_1(),
								'address_2'  => $customer->get_billing_address_2(),
								'city'       => $customer->get_billing_city(),
								'state'      => $customer->get_billing_state(),
								'postcode'   => $customer->get_billing_postcode(),
								'country'    => $customer->get_billing_country(),
								'email'      => $customer->get_billing_email(),
								'phone'      => $customer_data[ 'phone' ],
							],
							'shipping'  => [
								'first_name' => $customer->get_shipping_first_name(),
								'last_name'  => $customer->get_shipping_last_name(),
								'company'    => $customer->get_shipping_company(),
								'address_1'  => $customer->get_shipping_address_1(),
								'address_2'  => $customer->get_shipping_address_2(),
								'city'       => $customer->get_shipping_city(),
								'state'      => $customer->get_shipping_state(),
								'postcode'   => $customer->get_shipping_postcode(),
								'country'    => $customer->get_shipping_country(),
							],
						];

						$message = esc_html__( 'Customer created successfully.', 'ddwc-multipos' );
					}
				}

				do_action( 'ddwcpos_api_after_customer_save', $customer->get_id(), $customer_data, $request );

				$data = apply_filters( 'ddwcpos_api_customer_data', $data );

				$response = [
					'success' => true,
					'message' => $message,
					'data'    => $data,
				];

				return $response;
			} catch ( \Exception $e ) {
                return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
