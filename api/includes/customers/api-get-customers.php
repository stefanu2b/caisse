<?php
/**
 * API Get Customers class
 *
 * @package MultiPOS - Point of Sale for WCFM Marketplace
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Customers;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Get_Customers' ) ) {
	/**
	 * API Get Customers class
	 */
	class DDWCPOS_API_Get_Customers {
		/**
		 * Base Name.
		 *
		 * @var string the route base
		 */
		public $base = 'get-customers';

		/**
		 * Configuration Variable
		 *
		 * @var array
		 */
		protected $ddwcpos_configuration;

		/**
		 * Constructor.
		 * 
		 * @param array $ddwcpos_configuration
		 */
		public function __construct( $ddwcpos_configuration ) {
			$this->ddwcpos_configuration = $ddwcpos_configuration;
		}

		/**
		 * API Callback.
		 * 
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				if ( empty( $request[ 'cashier_id' ] ) || empty( $request[ 'outlet_id' ] ) ) {
					return new \WP_Error( 'rest_invalid_param', esc_html__( 'Params are missing.', 'ddwc-multipos' ) );
				}

				$cashier_id   = $request[ 'cashier_id' ];
				$outlet_id    = $request[ 'outlet_id' ];
				$per_page     = $request[ 'per_page' ];
				$current_page = $request[ 'current_page' ];

				if ( -1 === $per_page ) {
					$args = [
						'role'   => 'customer',
						'fields' => 'ids',
					];

					if ( ! empty( $this->ddwcpos_configuration[ 'load_only_guest_customer_enabled' ] ) && ! empty( $this->ddwcpos_configuration[ 'default_customer' ] ) ) {
						$args[ 'include' ] = [ $this->ddwcpos_configuration[ 'default_customer' ] ];
					}

					$args = apply_filters( 'ddwcpos_modify_api_total_customers_count_args', $args, $request );

					$user_query = new \WP_User_Query( $args );

					wp_reset_postdata();

					return apply_filters( 'ddwcpos_modify_api_total_customers_count', $user_query->get_total(), $request );
				} else {
					$data = [];
					$off  = ( $current_page - 1 ) * $per_page;

					$args = [
						'role'    => 'customer',
						'number'  => $per_page,
						'offset'  => $off,
						'order'   => 'DESC',
						'orderby' => 'ID',
						'fields'  => 'ids',
					];

					if ( ! empty( $this->ddwcpos_configuration[ 'load_only_guest_customer_enabled' ] ) && ! empty( $this->ddwcpos_configuration[ 'default_customer' ] ) ) {
						$args[ 'include' ] = [ $this->ddwcpos_configuration[ 'default_customer' ] ];
					}

					$args = apply_filters( 'ddwcpos_modify_api_customers_args', $args, $request );

					$query = new \WP_User_Query( $args );

					wp_reset_postdata();

					$customer_ids = $query->get_results();

					if ( ! empty( $customer_ids ) ) {
						foreach ( $customer_ids as $customer_id ) {
							$customer = new \WC_Customer( $customer_id );
							$phone    = $customer->get_billing_phone();

							$data[] = apply_filters( 'ddwcpos_api_customer_data', [
								'id'           => intval( $customer_id ),
								'email'        => $customer->get_email(),
								'first_name'   => $customer->get_first_name(),
								'last_name'    => $customer->get_last_name(),
								'display_name' => $customer->get_display_name(),
								'username'     => $customer->get_username(),
								'avatar_url'   => $customer->get_avatar_url(),
								'coupons'      => [],
								'phone'        => $phone,
								'default'      => $customer_id == $this->ddwcpos_configuration[ 'default_customer' ] ? 1 : 0,
								'billing'      => [
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
									'phone'      => $phone,
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
							] );
						}
					}

					return apply_filters( 'ddwcpos_modify_api_get_customers_response', $data, $request );
				}

			} catch ( \Exception $e ) {
				return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
