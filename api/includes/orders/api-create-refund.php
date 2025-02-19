<?php
/**
 * API Create Refund class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\API\Includes\Orders;

use DDWCMultiPOS\Helper\Transaction\DDWCPOS_Transaction_Helper;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Create_Refund' ) ) {
	/**
	 * API Create Refund Class.
	 */
	class DDWCPOS_API_Create_Refund {
		/**
		 * Base Name.
		 *
		 * @var string the route base
		 */
		public $base = 'create-refund';

		/**
		 * DB Variable
		 *
		 * @var object
		 */
		protected $wpdb;

		/**
		 * Configuration Variable
		 *
		 * @var array
		 */
		protected $ddwcpos_configuration;

		/**
		 * Constructor.
		 */
		public function __construct( $ddwcpos_configuration ) {
			global $wpdb;
			$this->wpdb                  = $wpdb;
			$this->ddwcpos_configuration = $ddwcpos_configuration;
		}

		/**
		 * API Callback.
		 * 
		 * @param object $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				if ( empty( $request[ 'cashier_id' ] ) || empty( $request[ 'outlet_id' ] ) ) {
					return new \WP_Error( 'rest_invalid_param', esc_html__( 'Params are missing.', 'ddwc-multipos' ) );
				}

				$refund_data = json_decode( $request[ 'refund_data' ], true );
				$order_id    = ! empty( $refund_data[ 'orderId' ] ) ? intval( $refund_data[ 'orderId' ] ) : '';
				$order       = wc_get_order( $order_id );

				if ( ! $order ) {
					return new \WP_Error( 'rest_invalid_param', esc_html__( 'Order not found.', 'ddwc-multipos' ) );
				}

				$order_response     = [];
				$outlet_id          = $request[ 'outlet_id' ];
				$cashier_id         = $request[ 'cashier_id' ];
				$transaction_helper = new DDWCPOS_Transaction_Helper();
				$refund_reason      = ! empty( $refund_data[ 'refundReason' ] ) ? $refund_data[ 'refundReason' ] : '';
				$refund_products    = ! empty( $refund_data[ 'refundProducts' ] ) ? $refund_data[ 'refundProducts' ] : [];
				$restock_items      = ! empty( $refund_data[ 'restockItems' ] ) ? $refund_data[ 'restockItems' ] : false;

				$order_items = $order->get_items();

				// Prepare line items which we are refunding.
				$line_items    = [];
				$refund_amount = 0;

				$custom_discount_item_id = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT order_item_id FROM {$this->wpdb->prefix}woocommerce_order_items WHERE order_id=%d AND order_item_name LIKE %s", $order_id, esc_html__( 'POS Custom Discount', 'ddwc-multipos' ) ) );

				if ( $custom_discount_item_id ) {
					$custom_discount_amount = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT meta_value FROM {$this->wpdb->prefix}woocommerce_order_itemmeta WHERE order_item_id=%d AND meta_key LIKE %s", $custom_discount_item_id, '_line_total' ) );
				}

				$total_quantity = 0;
				foreach ( $order_items as $item_id => $item ) {
					$quantity        = $item->get_quantity();
					$total_quantity += $quantity;
				}

				// order items loop
				foreach ( $order_items as $item_id => $order_item ) {
					if ( array_key_exists( $item_id, $refund_products ) ) {
						$order_item_data     = $order_item->get_data();
						$product_total_price = $order_item_data[ 'total' ];
						$product_unit_price  = $product_total_price / $order_item_data[ 'quantity' ];

						$refund_amount += wc_format_decimal( $product_unit_price * $refund_products[ $item_id ] );

						if ( ! empty( $custom_discount_amount ) ) {
							$refund_amount += ( $custom_discount_amount / $total_quantity ) * $refund_products[ $item_id ];
						}

						$refund_tax = $order_item_data[ 'taxes' ][ 'subtotal' ];

						if ( ! empty( $refund_tax ) ) {
							foreach ( $refund_tax as $key => $value ) {
								$tax = wc_format_decimal( $refund_tax[ $key ] / $order_item_data[ 'quantity' ] * $refund_products[ $item_id ] );
								$refund_amount += $tax;
								$refund_tax[ $key ] = $tax;
							}
						}

						$line_items[ $item_id ] = array(
							'qty'          => $refund_products[ $item_id ],
							'refund_total' => wc_format_decimal( $product_unit_price * $refund_products[ $item_id ] ),
							'refund_tax'   => $refund_tax,
						);
					}
				}

				// Create the refund object.
				$refund = wc_create_refund(
					[
						'amount'         => $refund_amount,
						'reason'         => $refund_reason,
						'order_id'       => $order_id,
						'line_items'     => $line_items,
						'refund_payment' => false,
						'restock_items'  => $restock_items,
					]
				);

				$order_items     = $order->get_items();
				$tendered        = floatval( $order->get_meta( '_ddwcpos_tendered_amount', true ) );
				$table           = $order->get_meta( '_ddwcpos_table', true );
				$payment_methods = $order->get_meta( '_ddwcpos_payment_methods', true );
				$offline_id      = $order->get_meta( '_ddwcpos_offline_id', true );
				$api_get_orders  = new DDWCPOS_API_Get_Orders( $this->ddwcpos_configuration );
				$order_response  = $api_get_orders->ddwcpos_prepare_order_data( $order_id );

				$transaction_data = [
					'cashier_id' => $cashier_id,
					'outlet_id'  => $outlet_id,
					'order_id'   => $order_id,
					'in'         => 0,
					'out'        => $refund_amount,
					// 'method'     => $order_response[ 'payment_method' ],
					'method'     => 'refund',
					'reference'  => esc_html__( 'Refund is done for the order.', 'ddwc-multipos' ),
					'date'       => current_time( 'Y-m-d H:i:s' ),
				];

				$transaction_data[ 'id' ]           = strval( $transaction_helper->ddwcpos_save_transaction( $transaction_data ) );
				$order_response[ 'transactions' ][] = $transaction_data;

				$order_response = apply_filters( 'ddwcpos_modify_api_order_response', $order_response, $order, $request );

				return apply_filters( 'ddwcpos_modify_api_create_refund_response', $order_response, $order, $request );
			} catch ( \Exception $e ) {
				return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}
	}
}
