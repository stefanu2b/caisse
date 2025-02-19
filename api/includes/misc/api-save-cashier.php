<?php
/**
 * Save Cashier class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Misc;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Save_Cashier' ) ) {
    /**
     * Save Cashier class
     */
    class DDWCPOS_API_Save_Cashier {
        /**
         * Base Name.
         *
         * @var string the route base
         */
        public $base = 'save-cashier';

        /**
         * API Callback.
         *
         * @param array $request
		 * @return array
         */
        public function ddwcpos_get_data( $request ) {
            try {
                if ( empty( $request[ 'cashier_id' ] ) || empty( $request[ 'cashier_data' ] ) ) {
                    return new \WP_Error( 'rest_invalid_param', esc_html__( 'Params are missing.', 'ddwc-multipos' ) );
                }

				$customer_data = $request[ 'cashier_data' ];

                $cashier_id = $customer_data[ 'id' ];

                update_user_meta( $cashier_id, 'first_name', $customer_data[ 'first_name' ] );
                update_user_meta( $cashier_id, 'last_name', $customer_data[ 'last_name' ] );

                $cashier_data = get_userdata( $cashier_id );

                if ( ! empty( $customer_data[ 'current_password' ] ) ) {
                    if ( wp_check_password( $customer_data[ 'current_password' ], $cashier_data->user_pass, $cashier_id ) ) {
                        $cashier = new \WP_User( $cashier_id );

                        wp_set_password( $customer_data[ 'new_password' ], $cashier_id );

                        // Log-in again.
                        wp_set_auth_cookie( $cashier_id );
                        wp_set_current_user( $cashier_id );
                        do_action( 'wp_login', $cashier->user_login, $cashier );

                        return [
                            'success' => true,
                            'message' => esc_html__( 'Your account details are saved successfully.', 'ddwc-multipos' ),
                        ];
                    } else {
                        return [
                            'success' => false,
                            'message' => esc_html__( 'Your current password do not matched, please enter the correct password.', 'ddwc-multipos' ),
                        ];
                    }
                }

                return [
                    'success' => true,
                    'message' => esc_html__( 'Your account details are saved successfully.', 'ddwc-multipos' ),
                ];
            } catch ( \Exception $e ) {
                return new \WP_Error( 'data_error', $e->getMessage() );
            }
        }
    }
}
