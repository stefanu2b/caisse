<?php
/**
 * API Create Transaction class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Transactions;

use DDWCMultiPOS\Helper\Transaction\DDWCPOS_Transaction_Helper;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Create_Transaction' ) ) {
    /**
     * API Create Transaction class
     */
    class DDWCPOS_API_Create_Transaction {
        /**
         * Base Name.
         *
         * @var string the route base
         */
        public $base = 'create-transaction';

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

                global $wpdb;

                $transaction_helper = new DDWCPOS_Transaction_Helper();

                $data = [
                    'cashier_id' => $request[ 'cashier_id' ],
                    'outlet_id'  => $request[ 'outlet_id' ],
                    'order_id'   => NULL,
                    'in'         => ! empty( $request[ 'in' ] ) ? $request[ 'in' ] : '',
                    'out'        => ! empty( $request[ 'out' ] ) ? $request[ 'out' ] : '',
                    'method'     => ! empty( $request[ 'method' ] ) ? $request[ 'method' ] : 'manual',
                    'reference'  => ! empty( $request[ 'reference' ] ) ? $request[ 'reference' ] : '',
                    'date'       => current_time( 'Y-m-d H:i:s' ),
                ];

                $data[ 'id' ] = strval( $transaction_helper->ddwcpos_save_transaction( $data ) );

                return [ $data ];
            } catch ( \Exception $e ) {
                return \WP_Error( 'data_error', $e->getMessage() );
            }
        }
    }
}
