<?php
/**
 * API Create Order class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\API\Includes\Orders;

use DDWCMultiPOS\Helper\Outlet\DDWCPOS_Outlet_Helper;
use DDWCMultiPOS\Helper\Transaction\DDWCPOS_Transaction_Helper;
use Automattic\WooCommerce\Utilities\NumberUtil;
use Automattic\WooCommerce\Proxies\LegacyProxy;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Create_Order' ) ) {
	/**
	 * API Create Order Class.
	 */
	class DDWCPOS_API_Create_Order {
		/**
		 * Base Name.
		 *
		 * @var string the route base
		 */
		public $base = 'create-order';

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

				if ( ! empty( $request[ 'order_data' ] ) ) {
					$order_data = json_decode( $request[ 'order_data' ], true );
					$order      = $this->ddwcpos_create_order( $order_data, $request );
					return $order;
				} else if ( ! empty( $request[ 'offline_orders' ] ) ) {
					$orders              = [];
					$offline_orders_data = json_decode( $request[ 'offline_orders' ], true );

					foreach ( $offline_orders_data as $order_data ) {
						$orders[] = $this->ddwcpos_create_order( $order_data, $request );
					}

					return $orders;
				}
			} catch ( \Exception $e ) {
				return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}

		/**
		 * Create Order.
		 * 
		 * @param array $order_data
		 * @param object $request
		 * @return array
		 */
		public function ddwcpos_create_order( $order_data, $request ) {
			$order_response     = [];
			$outlet_id          = $request[ 'outlet_id' ];
			$cashier_id         = $request[ 'cashier_id' ];
			$outlet_helper      = new DDWCPOS_Outlet_Helper();
			$transaction_helper = new DDWCPOS_Transaction_Helper();
			$outlet_data        = $outlet_helper->ddwcpos_get_outlet_details_by_id( $outlet_id );
			$inventory_type     = $outlet_helper->ddwcpos_get_inventory_type( $outlet_id );
			$customer_id        = $order_data[ 'customer_id' ];
			$offline_id         = ! empty( $order_data[ 'offline_id' ] ) ? intval( $order_data[ 'offline_id' ] ) : '';
			$coupons            = ! empty( $order_data[ 'coupons' ] ) ? $order_data[ 'coupons' ] : [];
			$discount           = ! empty( $order_data[ 'discount' ] ) ? $order_data[ 'discount' ] : '';
			$order_note         = ! empty( $order_data[ 'order_note' ] ) ? sanitize_text_field( $order_data[ 'order_note' ] ) : '';
			$payment_methods    = $order_data[ 'payment_methods' ];
			$table              = $order_data[ 'table' ];
			$kitchen_status     = ! empty( $order_data[ 'kitchen_status' ] ) ? $order_data[ 'kitchen_status' ] : '';
			$tax                = new \WC_Tax();
			$tendered           = 0;
			$customer           = new \WC_Customer( $customer_id );

			$states_list = WC()->countries->get_states( $outlet_data[ 'country' ] );

			if ( is_array( $states_list ) ) {
				$state_code = array_search( $outlet_data[ 'state' ], $states_list );
			}

			$state_code = ! empty( $state_code ) ? $state_code : $outlet_data[ 'state' ];

			$billing_address = [
				'first_name' => $customer->get_billing_first_name() ? $customer->get_billing_first_name() : $customer->get_first_name(),
				'last_name'  => $customer->get_billing_last_name() ? $customer->get_billing_last_name() : $customer->get_last_name(),
				'company'    => $customer->get_billing_company(),
				'address_1'  => $outlet_data[ 'address1' ],
				'address_2'  => $outlet_data[ 'address2' ],
				'city'       => $outlet_data[ 'city' ],
				'state'      => $state_code,
				'postcode'   => $outlet_data[ 'postcode' ],
				'country'    => $outlet_data[ 'country' ],
				'email'      => $customer->get_billing_email(),
				'phone'      => $customer->get_billing_phone(),
			];

			$shipping_address = [
				'first_name' => $customer->get_shipping_first_name(),
				'last_name'  => $customer->get_shipping_last_name(),
				'company'    => $customer->get_shipping_company(),
				'address_1'  => $outlet_data[ 'address1' ],
				'address_2'  => $outlet_data[ 'address2' ],
				'city'       => $outlet_data[ 'city' ],
				'state'      => $state_code,
				'postcode'   => $outlet_data[ 'postcode' ],
				'country'    => $outlet_data[ 'country' ],
			];

			$order = wc_create_order( [ 'customer_id' => apply_filters( 'ddwcpos_modify_customer_id_in_creating_order', $customer_id, $request ) ] );

			if ( empty( $this->ddwcpos_configuration[ 'order_mails_enabled' ] ) ) {
				remove_action( 'woocommerce_order_status_pending_to_processing_notification', [ WC()->mailer()->emails[ 'WC_Email_New_Order' ], 'trigger' ] );
				remove_action( 'woocommerce_order_status_pending_to_processing_notification', [ WC()->mailer()->emails[ 'WC_Email_Customer_Processing_Order' ], 'trigger' ] );
				remove_action( 'woocommerce_order_status_pending_to_completed_notification', [ WC()->mailer()->emails[ 'WC_Email_New_Order' ], 'trigger' ] );
				remove_action( 'woocommerce_order_status_completed_notification', [ WC()->mailer()->emails[ 'WC_Email_Customer_Completed_Order' ], 'trigger' ] );
			}

			$order_id = $order->get_id();

			if ( count( $payment_methods ) > 1 ) {
				$payment_method       = 'split';
				$payment_method_title = esc_html__( 'Split', 'ddwc-multipos' );

				foreach ( $payment_methods as $key => $value ) {
					$tendered += floatval( $value[ 'amount' ] );

					$order->update_meta_data( '_ddwcpos_payment_' . $value[ 'slug' ], $value[ 'amount' ] );
				}
			} else {
				$payment_method       = $payment_methods[0][ 'slug' ];
				$payment_method_title = $payment_methods[0][ 'name' ];
				$tendered             = $payment_methods[0][ 'amount' ];
			}

			// $order_items_count = 0;

			$order->update_meta_data( '_ddwcpos_tendered_amount', $tendered );
			$order->update_meta_data( '_ddwcpos_table', $table );

			if ( ! empty( $offline_id ) ) {
				$order->update_meta_data( '_ddwcpos_offline_id', $offline_id );
			}

			$order->update_meta_data( '_ddwcpos_payment_methods', $payment_methods );

			$tax_display_cart = get_option( 'woocommerce_tax_display_cart' );
			$global_tax_rate  = 0;

			// $prices_include_tax = get_option( 'woocommerce_prices_include_tax' );

			if ( wc_tax_enabled() ) {
				$rates = $tax->find_rates( [
					'country'  => $outlet_data[ 'country' ],
					'city'     => $outlet_data[ 'city' ],
					'state'    => $state_code,
					'postcode' => $outlet_data[ 'postcode' ],
				] );

				foreach ( $rates as $key => $rate ) {
					$global_tax_rate += $rate[ 'rate' ];
				}
			}

			foreach ( $order_data[ 'products' ] as $item ) {
				if ( $item[ 'custom' ] ) {
					$custom_product_price = $item[ 'total' ];

					if ( wc_tax_enabled() && 'excl' !== $tax_display_cart ) {
						$custom_product_price  = $item[ 'total' ] * 100 / ( 100 + $tax_rate );
					}

					$order_custom_item = wc_get_container()->get( LegacyProxy::class )->get_instance_of( \WC_Order_Item_Product::class );

					$order_custom_item->set_props(
						[
							'name'      => $item[ 'name' ],
							'quantity'  => $item[ 'quantity' ],
							'tax_class' => null,
							'total'     => $custom_product_price,
							'subtotal'  => $custom_product_price,
							// 'taxes'     => [
							//     'total'    => $item[ 'tax' ],
							//     'subtotal' => $item[ 'tax' ],
							// ],
						]
					);

					$order_custom_item->set_order_id( $order_id );
					$order_custom_item->save();

					$order->add_item( $order_custom_item );

					// $this->wpdb->insert(
					//     $this->wpdb->prefix . 'woocommerce_order_items',
					//     [
					//         'order_item_name' => $item[ 'name' ],
					//         'order_item_type' => 'line_item',
					//         'order_id'        => $order_id,
					//     ],
					//     [
					//         '%s',
					//         '%s',
					//         '%d',
					//     ]
					// );

					// $order_items_count = $order_items_count + $item[ 'quantity' ];

					// $order_item_id = $this->wpdb->insert_id;

					// $insert_data = [
					//     '_line_subtotal_tax' => $item[ 'tax' ],
					//     '_line_total'        => $custom_product_price,
					//     '_qty'               => $item[ 'quantity' ],
					//     '_line_subtotal'     => $custom_product_price,
					//     '_tax_class'         => $item[ 'tax_label' ],
					//     '_line_tax'          => $item[ 'tax' ],
					// ];

					// $insert_data = apply_filters( 'ddwcpos_modify_custom_product_insert_data', $insert_data, $request );

					// $query_string = "INSERT INTO {$this->wpdb->prefix}woocommerce_order_itemmeta ( order_item_id, meta_key, meta_value) VALUES ";

					// $custom_fields = $place_holders = [];

					// foreach ( $insert_data as $key => $value ) {
					//     array_push( $custom_fields, $order_item_id, $key, $value );
					//     $place_holders[] = "(%d, %s, %s)";
					// }

					// $query_string .= implode( ', ', $place_holders );

					// $this->wpdb->query( $this->wpdb->prepare( $query_string, $custom_fields ) );
				}
			}

			foreach ( $order_data[ 'products' ] as $item ) {
				if ( ! $item[ 'custom' ] ) {
					$product = wc_get_product( $item[ 'product_id' ] );

					if ( $product ) {
						$product_id    = $item[ 'product_id' ];
						$product_title = $item[ 'name' ];
						$tax_status    = $product->get_tax_status();
						$tax_class     = $product->get_tax_class();
						$tax_rate      = 0;

						if ( wc_tax_enabled() ) {
							if ( ! empty( $tax_class ) ) {
								$rates    = $tax->get_rates_for_tax_class( $tax_class );
								$priority = 1;

								foreach ( $rates as $key => $rate ) {
									if ( $rate->tax_rate_priority == $priority ) {
										if ( empty( $rate->tax_rate_country ) || ( $outlet_data[ 'country' ] === $rate->tax_rate_country && ( empty( $rate->tax_rate_state ) || $state_code === $rate->tax_rate_state ) && ( empty( $rate->city_count ) || $outlet_data[ 'city' ] === $rate->city_count ) && ( empty( $rate->postcode_count ) || $outlet_data[ 'postcode' ] === $rate->postcode_count ) ) ) {
											++$priority;

											$tax_rate += floatval( $rate->tax_rate );
										}
									}
								}
							} else {
								$tax_rate = $global_tax_rate;
							}
						}

						if ( 'incl' === $tax_display_cart && 'none' !== $tax_status ) {
							$tax_excluded_price = $item[ 'uf' ] * $item[ 'quantity' ] / ( ( $tax_rate / 100 ) + 1 );

							$item_id = $order->add_product( $product, $item[ 'quantity' ], [
								'subtotal'  => $tax_excluded_price,
								'total'     => $tax_excluded_price,
								'name'      => $product_title,
								'variation' => $item[ 'attributes' ],
							] );
						} else {
							$item_id = $order->add_product( $product, $item[ 'quantity' ], [
								'subtotal'  => $item[ 'uf' ] * $item[ 'quantity' ],
								'total'     => $item[ 'uf' ] * $item[ 'quantity' ],
								'name'      => $product_title,
								'variation' => $item[ 'attributes' ],
							] );
						}

						do_action( 'ddwcpos_after_adding_product_in_order', $item_id, $item, $order, $request );

						// $order_items_count = $order_items_count + $item[ 'quantity' ];

						if ( 'custom' === $inventory_type ) {
							$custom_stock = get_post_meta( $product_id, '_ddwcpos_outlet_stock_' . $outlet_id, true );

							$order->update_meta_data( '_ddwcpos_outlet_stock_' . $outlet_id, $custom_stock - $item[ 'quantity' ] );

							$product_stock = $product->get_stock_quantity();

							wc_update_product_stock( $product, $product_stock + $item[ 'quantity' ] );
						}
					}
				}
			}

			if ( apply_filters( 'ddwcpos_set_address_in_order', true, $order, $request ) ) {
				$order->set_address( $billing_address, 'billing' );
				$order->set_address( $shipping_address, 'shipping' );
			}

			$order->set_payment_method( $payment_method );
			$order->set_payment_method_title( $payment_method_title );

			$order_items = $order->get_items();

			$order_discount = 0;

			if ( ! empty( $coupons ) ) {
				$coupon_amount = 0;

				foreach ( $coupons as $coupon_key => $coupon_val ) {
					if ( 'percent' === $coupon_val[ 'type' ] ) {
						foreach ( $order_items as $order_item ) {
							$total          = $order_item->get_total();
							$discount_total = $order_item->get_subtotal() * floatval( $coupon_val[ 'price' ] ) / 100;
							$order_item->set_total( $total - $discount_total );
							$order_item->save();
						}

						$coupon_amount = $order->get_subtotal() * $coupon_val[ 'price' ] / 100;
					} else {
						// $discount_amount = floatval( number_format( $coupon_val[ 'price' ], 2 ) );

						// if ( 'yes' === $prices_include_tax ) {
						//     $real_price      = ( $discount_amount * 100 ) / ( 100 + $tax_rate );
						//     $product_tax     = $discount_amount - $real_price;
						//     $discount_amount = $real_price;
						// } else {
						//     $discount_amount = floatval( number_format( $coupon_val[ 'price' ], 2 ) );
						// }

						// $this_order = $order_items_count;

						$items = [];

						if ( 'fixed_product' === $coupon_val[ 'type' ] ) {
							$this->ddwcpos_apply_coupon_fixed_product( $coupon_val, $order_items );
						} elseif ( 'fixed_cart' === $coupon_val[ 'type' ] ) {
							$total_discount = $this->ddwcpos_apply_coupon_fixed_cart( $coupon_val, $order_items );
						}

						// foreach ( $order_items as $order_item ) {
						//     $items[] = $order_item->get_total();
						//     return absint( NumberUtil::round( $order_item->get_total() - $this->get_discount( $item->key, true ) ) );
						// }

						// foreach ( $order_items as $order_item ) {
						//     $total          = $order_item->get_total();
						//     $qty            = $order_item->get_quantity();
						//     $discount_total = $discount_amount / $this_order;


						//     // if ( $total > $qty * $discount_total ) {
						//     //     $order_item->set_total( $total - $qty * $discount_total );
						//     //     $discount_amount = $discount_amount - ( $qty * $discount_total );
						//     //     $this_order      = $this_order - $qty;
						//     // } else {
						//     //     $order_item->set_total( $total - $total );
						//     //     $discount_amount = $discount_amount - $total;
						//     //     $this_order      = $this_order - $qty;
						//     // }

						//     $order_item->save();
						// }

						$coupon_amount = $coupon_val[ 'price' ];
					}

					$coupon_amount = apply_filters( 'ddwcpos_modify_coupon_coupon_in_create_order', $coupon_amount, $coupon_val, $order, $request );

					$item = new \WC_Order_Item_Coupon();

					$item->set_props(
						[
							'code'         => $coupon_val[ 'code' ],
							'discount'     => floatval( $coupon_amount ),
							'discount_tax' => apply_filters( 'ddwcpos_modify_coupon_discount_tax_in_create_order', 0, $coupon_amount, $coupon_val, $order, $request ),
							'order_id'     => $order_id,
						]
					);

					$order->add_item( $item );
				}
			}

			$order->calculate_totals();

			$order_total = $order->get_total();

			if ( ! empty( $discount ) ) {
				if ( 'percentage' === $discount[ 'type' ] ) {
					$discount_amount = wc_format_decimal( floatval( $order_total * $discount[ 'amount' ] / 100 ), 2 );
				} elseif ( 'fixed' === $discount[ 'type' ] ) {
					$discount_amount = floatval( $discount[ 'amount' ] );
				}

				if ( ! empty( $discount_amount ) ) {
					$order_total -= $discount_amount;

					$item = new \WC_Order_Item_Fee();

					$item->set_order_id( $order_id );
					$item->set_name( esc_html__( 'POS Custom Discount', 'ddwc-multipos' ) );
					$item->set_tax_class( '' );
					$item->set_taxes( [
						'total' => [],
					] );
					$item->set_tax_status( 'none' );
					$item->set_total_tax( 0 );
					$item->set_total( -$discount_amount );

					$order->add_item( $item );
				}

				if ( $order_total < 0 ) {
					$order_total = 0;
				}

				$order->set_total( $order_total );
			}

			if ( ! empty( $order_note ) ) {
				$order->add_order_note( $order_note );
			}

			$order->update_meta_data( '_ddwcpos_outlet_id', $outlet_id );
			$order->update_meta_data( '_ddwcpos_cashier_id', $cashier_id );

			if ( ! empty( $kitchen_status ) ) {
				$order->update_meta_data( '_ddwcpos_kitchen_status', $kitchen_status );
			}

			do_action( 'ddwcpos_before_payment_complete_in_order_at_pos', $order, $order_data, $request );

			if ( apply_filters( 'ddwcpos_process_order_payment_complete', true, $order, $order_data, $request ) ) {
				$order->payment_complete();
			}

			$order = apply_filters( 'ddwcpos_modify_creating_pos_order', $order, $order_data, $request );

			do_action( 'ddwcpos_after_creating_order', $order, $order_data, $request );

			if ( apply_filters( 'ddwcpos_process_order_update_status', true, $order, $order_data, $request ) ) {
				$order->update_status( str_replace( 'wc-', '', $this->ddwcpos_configuration[ 'order_status' ] ) );
			}

			$order->save();

			$api_get_orders = new DDWCPOS_API_Get_Orders( $this->ddwcpos_configuration );
			$order_response = $api_get_orders->ddwcpos_prepare_order_data( $order_id );

			$order_response[ 'transactions' ] = [];

			foreach ( $payment_methods as $key => $value ) {
				$transaction_data = [
					'cashier_id' => $cashier_id,
					'outlet_id'  => $outlet_id,
					'order_id'   => $order_id,
					'in'         => $value[ 'amount' ],
					'out'        => 'cash' === $value[ 'slug' ] ? $order_response[ 'change' ] : 0,
					'method'     => $value[ 'slug' ],
					'reference'  => '',
					'date'       => current_time( 'Y-m-d H:i:s' ),
				];

				$transaction_data[ 'id' ]             = strval( $transaction_helper->ddwcpos_save_transaction( $transaction_data ) );
				$order_response[ 'transactions' ][]   = $transaction_data;
			}

			$order_response = apply_filters( 'ddwcpos_modify_api_order_response', $order_response, $order, $request );

			return apply_filters( 'ddwcpos_modify_api_create_order_response', $order_response, $order, $request );
		}

		/**
		 * Apply fixed cart discount to items.
		 *
		 * @param  array $coupon Coupon array.
		 * @param  array $items_to_apply Array of items to apply the coupon to.
		 * @param  int $amount Fixed discount amount to apply in cents. Leave blank to pull from coupon.
		 * @return int Total discounted.
		 */
		protected function ddwcpos_apply_coupon_fixed_cart( $coupon, $items_to_apply, $amount = null ) {
			$total_discount = 0;
			$amount         = $amount ? $amount : wc_add_number_precision( $coupon[ 'price' ] );
			$items_to_apply = array_filter( $items_to_apply, array( $this, 'ddwcpos_filter_products_with_price' ) );

			$item_count = 0;

			foreach ( $items_to_apply as $key => $item ) {
				$item_count += $item->get_quantity();
			}

			if ( ! $item_count ) {
				return $total_discount;
			}

			if ( ! $amount ) {
				// If there is no amount we still send it through so filters are fired.
				$total_discount = $this->ddwcpos_apply_coupon_fixed_product( $coupon, $items_to_apply, 0 );
			} else {
				$per_item_discount = absint( $amount / $item_count ); // round it down to the nearest cent.

				if ( $per_item_discount > 0 ) {
					$total_discount = $this->ddwcpos_apply_coupon_fixed_product( $coupon, $items_to_apply, $per_item_discount );

					/**
					 * If there is still discount remaining, repeat the process.
					 */
					if ( $total_discount > 0 && $total_discount < $amount ) {
						$total_discount += $this->ddwcpos_apply_coupon_fixed_cart( $coupon, $items_to_apply, $amount - $total_discount );
					}
				} elseif ( $amount > 0 ) {
					$total_discount += $this->ddwcpos_apply_coupon_remainder( $coupon, $items_to_apply, $amount );
				}
			}

			return $total_discount;
		}

		/**
		 * Apply fixed product discount to items.
		 *
		 * @param  array $coupon Coupon array.
		 * @param  array     $items_to_apply Array of items to apply the coupon to.
		 * @param  int       $amount Fixed discount amount to apply in cents. Leave blank to pull from coupon.
		 * @return int Total discounted.
		 */
		protected function ddwcpos_apply_coupon_fixed_product( $coupon, $items_to_apply, $amount = null ) {
			$total_discount  = 0;
			$amount          = $amount ? $amount : wc_add_number_precision( $coupon[ 'price' ] );

			foreach ( $items_to_apply as $item ) {
				// Find out how much price is available to discount for the item.
				$discounted_price = $this->ddwcpos_get_discounted_price_in_cents( $item );

				// Get the price we actually want to discount, based on settings.
				$price_to_discount = ( 'yes' === get_option( 'woocommerce_calc_discounts_sequentially', 'no' ) ) ? $discounted_price : $item->get_total();

				$apply_quantity = $item->get_quantity();
				$discount       = $amount * $apply_quantity;

				$discount       = min( $discounted_price, $discount );
				$total_discount = $total_discount + $discount;

				$item->set_total( wc_remove_number_precision_deep( $discounted_price - $discount ) );

				// Store code and discount amount per item.
				// $this->discounts[ $coupon->get_code() ][ $item->key ] += $discount;
			}
			return $total_discount;
		}

		/**
		 * Deal with remaining fractional discounts by splitting it over items
		 * until the amount is expired, discounting 1 cent at a time.
		 *
		 * @since 3.2.0
		 * @param  array $coupon Coupon array.
		 * @param  array     $items_to_apply Array of items to apply the coupon to.
		 * @param  int       $amount Fixed discount amount to apply.
		 * @return int Total discounted.
		 */
		protected function ddwcpos_apply_coupon_remainder( $coupon, $items_to_apply, $amount ) {
			$total_discount = 0;

			foreach ( $items_to_apply as $item ) {
				for ( $i = 0; $i < $item->get_quantity(); $i ++ ) {
					// Find out how much price is available to discount for the item.
					$price_to_discount = $this->ddwcpos_get_discounted_price_in_cents( $item );

					// Run coupon calculations.
					$discount = min( $price_to_discount, 1 );

					// Store totals.
					$total_discount += $discount;

					$item->set_total( wc_remove_number_precision_deep( $price_to_discount - $discount ) );

					// Store code and discount amount per item.
					// $this->discounts[ $coupon->get_code() ][ $item->key ] += $discount;

					if ( $total_discount >= $amount ) {
						break 2;
					}
				}
				if ( $total_discount >= $amount ) {
					break;
				}
			}
			return $total_discount;
		}

		/**
		 * Filter out all products which have been fully discounted to 0.
		 * Used as array_filter callback.
		 *
		 * @since  3.2.0
		 * @param  object $item Get data for this item.
		 * @return bool
		 */
		protected function ddwcpos_filter_products_with_price( $item ) {
			return $this->ddwcpos_get_discounted_price_in_cents( $item ) > 0;
		}

		/**
		 * Get discounted price of an item to precision (in cents).
		 *
		 * @param  object $item Get data for this item.
		 * @return int
		 */
		public function ddwcpos_get_discounted_price_in_cents( $item ) {
			return absint( NumberUtil::round( wc_add_number_precision( $item->get_total() ) ) );
		}
	}
}
