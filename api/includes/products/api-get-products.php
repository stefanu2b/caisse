<?php
/**
 * API Get Products class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\API\Includes\Products;

use DDWCMultiPOS\Helper\Outlet\DDWCPOS_Outlet_Helper;
use DDWCMultiPOS\Helper\Barcode\DDWCPOS_Barcode_Helper;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Get_Products' ) ) {
	/**
	 * API Get Products Class.
	 */
	class DDWCPOS_API_Get_Products {
		/**
		 * Base Name.
		 *
		 * @var string the route base
		 */
		public $base = 'get-products';

		/**
		 * Configuration Variable
		 *
		 * @var array
		 */
		protected $ddwcpos_configuration;

		/**
		 * Outlet Helper Variable
		 *
		 * @var object
		 */
		protected $outlet_helper;

		/**
		 * Barcode Helper Variable
		 *
		 * @var object
		 */
		protected $barcode_helper;

		/**
		* Constructor.
		*/
		public function __construct( $ddwcpos_configuration ) {
			$this->ddwcpos_configuration = $ddwcpos_configuration;
			$this->outlet_helper         = new DDWCPOS_Outlet_Helper();
			$this->barcode_helper        = new DDWCPOS_Barcode_Helper( $ddwcpos_configuration );
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

				$cashier_id     = $request[ 'cashier_id' ];
				$outlet_id      = $request[ 'outlet_id' ];
				$per_page       = $request[ 'per_page' ];
				$current_page   = $request[ 'current_page' ];
				$outlet_data    = $this->outlet_helper->ddwcpos_get_outlet_details_by_id( $outlet_id );
				$tax            = new \WC_Tax();

				$states_list = WC()->countries->get_states( $outlet_data[ 'country' ] );

				if ( is_array( $states_list ) ) {
					$state_code = array_search( $outlet_data[ 'state' ], $states_list );
				}

				$state_code = ! empty( $state_code ) ? $state_code : $outlet_data[ 'state' ];

				$rates = $tax->find_rates( [
					'country'  => $outlet_data[ 'country' ],
					'city'     => $outlet_data[ 'city' ],
					'state'    => $state_code,
					'postcode' => $outlet_data[ 'postcode' ],
				] );

				if ( -1 === $per_page ) {
					$search_results = new \WP_Query( apply_filters( 'ddwcpos_modify_api_total_products_count_args', [
						'ignore_sticky_posts' => 1,
						'post_type'           => [ 'product', 'product_variation' ],
						'order'               => 'DESC',
						'orderby'             => 'ID',
						'post_status'         => 'publish',
						'posts_per_page'      => $per_page,
						'fields'              => 'ids',
					], $request ) );

					wp_reset_postdata();

					$response = [
						'taxes'          => $rates,
						'total_products' => apply_filters( 'ddwcpos_modify_api_total_products_count', $search_results->post_count, $request ),
					];

					return apply_filters( 'ddwcpos_modify_api_total_products_count_response', $response, $request );
				} else {
					$data          = [];
					WC()->customer = new \WC_Customer( $cashier_id );

					WC()->customer->set_shipping_country( $outlet_data[ 'country' ] );
					WC()->customer->set_shipping_city( $outlet_data[ 'city' ] );
					WC()->customer->set_shipping_state( $outlet_data[ 'state' ] );
					WC()->customer->set_shipping_postcode( $outlet_data[ 'postcode' ] );

					WC()->customer->set_billing_country( $outlet_data[ 'country' ] );
					WC()->customer->set_billing_city( $outlet_data[ 'city' ] );
					WC()->customer->set_billing_state( $outlet_data[ 'state' ] );
					WC()->customer->set_billing_postcode( $outlet_data[ 'postcode' ] );

					$off  = ( $current_page - 1 ) * $per_page;

					$args = [
						'post_type'           => [ 'product', 'product_variation' ],
						'post_status'         => 'publish',
						'ignore_sticky_posts' => 1,
						'posts_per_page'      => $per_page,
						'offset'              => $off,
						'order'               => 'DESC',
						'orderby'             => 'ID',
						'fields'              => 'ids',
					];

					$args = apply_filters( 'ddwcpos_modify_api_products_list_args', $args, $request );

					$search_results = new \WP_Query( $args );

					wp_reset_postdata();

					if ( $search_results->have_posts() ) {
						$inventory_type = $this->outlet_helper->ddwcpos_get_inventory_type( $outlet_id );

						while ( $search_results->have_posts() ) {
							$search_results->the_post();

							$product_id   = $search_results->post;

							if ( apply_filters( 'ddwcpos_exclude_product_in_pos', false, $product_id ) ) {
								continue;
							}

							$response = $this->ddwcpos_prepare_product_data( $product_id, $outlet_id, $inventory_type, $request );

							if ( ! $response ) {
								continue;
							}

							$data[] = $response;
						}
					}

					return apply_filters( 'ddwcpos_modify_api_get_products_response', $data, $request );
				}

			} catch ( \Exception $e ) {
				return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}

		/**
		 * Check parent category function
		 *
		 * @param array $categories
		 * @param int $parent_id
		 * @return array
		 */
		public function ddwcpos_check_parent_category( $categories, $parent_id ) {
			$parent_category = get_term( $parent_id );
			$parent_id       = $parent_category->parent;

			if ( ! empty( $parent_id ) ) {
				$categories[] = $parent_id;
				$this->ddwcpos_check_parent_category( $categories, $parent_id );
			}

			return $categories;
		}

		/**
		 * Prepare product data function
		 *
		 * @param int $product_id
		 * @param int $outlet_id
		 * @param string $inventory_type
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_prepare_product_data( $product_id, $outlet_id, $inventory_type, $request ) {
			$product = wc_get_product( $product_id );

			if ( ! $product ) {
				return false;
			}

			$product_type = $product->get_type();

			if ( 'grouped' === $product_type || 'external' === $product_type ) {
				return false;
			}

			$is_include_tax = get_option( 'woocommerce_prices_include_tax' );
			$shop_display   = get_option( 'woocommerce_tax_display_shop' );
			$cart_display   = get_option( 'woocommerce_tax_display_cart' );

			$variations           = [];
			$available_variations = [];
			$attributes           = [];
			$selected_attributes  = [];

			if ( 'variable' === $product_type || 'variation' === $product_type ) {
				$attributes = $product->get_variation_attributes();
				// $attributes = $product->get_attributes();
			}

			if ( 'variable' === $product_type ) {
				add_filter( 'woocommerce_product_is_in_stock', function( $in_stock, $product ) use ( $outlet_id, $inventory_type ) {
					if ( 'custom' === $inventory_type ) {
						$stock = intval( $product->get_meta( '_ddwcpos_outlet_stock_' . $outlet_id, true ) );

						return $stock > 0;
					}

					return $in_stock;
				}, 10, 2 );

				$available_variations = $product->get_available_variations();
				$selected_attributes  = $product->get_default_attributes();

				$in_stock_variations = false;

				foreach ( $available_variations as $key => $available_variation ) {
					$variation_id  = $available_variation[ 'variation_id' ];
					$variation_obj = wc_get_product( $variation_id );

					ob_start();
					if ( 'custom' === $inventory_type ) {
						$stock = $variation_obj->get_meta( '_ddwcpos_outlet_stock_' . $outlet_id, true );
						?>
						<mark class="instock">
							<?php
							/* translators: %s for product stock quantity */
							echo sprintf( esc_html__( 'In Stock(%s)', 'ddwc-multipos' ), $stock ); 
							?>
						</mark>
						<?php
					} else {
						$stock_status       = $variation_obj->get_stock_status();
						$stock_quantity     = $variation_obj->get_stock_quantity();
						$backorders_allowed = $variation_obj->backorders_allowed();

						if ( $backorders_allowed ) {
							$stock = 999999999;
							if ( $stock_quantity > 0 ) {
								?>
								<mark class="instock">
									<?php
									/* translators: %s for product stock quantity */
									echo sprintf( esc_html__( 'On Backorder(%s)', 'ddwc-multipos' ), $stock_quantity ); 
									?>
								</mark>
								<?php
							} else {
								?>
								<mark class="instock"><?php esc_html_e( 'On Backorder', 'ddwc-multipos' ); ?></mark>
								<?php
							}
							?>
							<?php
						} else if ( 'instock' === $stock_status ) {
							$stock = $stock_quantity > 0 ? $stock_quantity : 999999999;
							if ( $stock_quantity > 0 ) {
								?>
								<mark class="instock">
									<?php
									/* translators: %s for product stock quantity */
									echo sprintf( esc_html__( 'In Stock(%s)', 'ddwc-multipos' ), $stock_quantity ); 
									?>
								</mark>
								<?php
							} else {
								?>
								<mark class="instock"><?php esc_html_e( 'In Stock', 'ddwc-multipos' ); ?></mark>
								<?php
							}
						} else {
							$stock = 0;
						}
					}

					$stock_html = ob_get_clean();

					// if ( $stock <= 0 ) {
					// 	continue;
					// }

					if ( $stock <= 0 && apply_filters( 'ddwcpos_add_custom_check_variation_stock_check', true, $stock, $variation_obj, $product, $request ) ) {
						continue;
					}

					$in_stock_variations = true;

					$barcode_init  = $this->barcode_helper->ddwcpos_get_barcode_init( $variation_obj );
					$barcode_final = $this->barcode_helper->ddwcpos_generate_barcode( $barcode_init );

					if ( 'yes' === $is_include_tax ) {
						if ( 'excl' === $shop_display && 'excl' === $cart_display ) {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = floatval( wc_get_price_excluding_tax( $variation_obj ) );
							$product_tax   = floatval( wc_get_price_including_tax( $variation_obj ) ) - $sale_price;
						} elseif ( 'incl' === $shop_display && 'excl' === $cart_display ) {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = floatval( wc_get_price_excluding_tax( $variation_obj ) );
							$product_tax   = floatval( wc_get_price_including_tax( $variation_obj ) ) - $sale_price;
						} elseif ( 'excl' === $shop_display && 'incl' === $cart_display ) {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = $variation_obj->get_sale_price();
							$sale_price    = $sale_price ? $sale_price : $regular_price;
							$product_tax   = 0;
						} else {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = $variation_obj->get_sale_price();
							$sale_price    = $sale_price ? $sale_price : $regular_price;
							$product_tax   = 0;
						}
					} else {
						if ( 'excl' === $shop_display && 'excl' === $cart_display ) {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = floatval( wc_get_price_excluding_tax( $variation_obj ) );
							$product_tax   = floatval( wc_get_price_including_tax( $variation_obj ) ) - $sale_price;
						} elseif ( 'incl' === $shop_display && 'excl' === $cart_display ) {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = floatval( wc_get_price_excluding_tax( $variation_obj ) );
							$product_tax   = floatval( wc_get_price_including_tax( $variation_obj ) ) - $sale_price;
						} elseif ( 'excl' === $shop_display && 'incl' === $cart_display ) {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = wc_get_price_including_tax( $variation_obj );
							$product_tax   = 0;
						} else {
							$regular_price = $variation_obj->get_regular_price();
							$sale_price    = wc_get_price_including_tax( $variation_obj );
							$product_tax   = 0;
						}
					}

					$available_variations[ $key ][ 'image' ]          = $variation_obj->get_image( 'thumbnail' );
					$available_variations[ $key ][ 'slug' ]           = $variation_obj->get_slug();
					$available_variations[ $key ][ 'title' ]          = $variation_obj->get_name( 'edit' );
					$available_variations[ $key ][ 'price_html' ]     = $variation_obj->get_price_html();
					$available_variations[ $key ][ 'onsale' ]         = $variation_obj->is_on_sale();
					$available_variations[ $key ][ 'regular_price' ]  = $sale_price;
					$available_variations[ $key ][ 'sale_price' ]     = $sale_price;
					$available_variations[ $key ][ 'stock_quantity' ] = $stock_quantity;
					$available_variations[ $key ][ 'stock' ]          = $stock;
					$available_variations[ $key ][ 'stock_status' ]   = $backorders_allowed ?'onbackorder' : $variation_obj->get_stock_status();
					$available_variations[ $key ][ 'stock_html' ]     = $stock_html;
					$available_variations[ $key ][ 'tax' ]            = $product_tax;
					$available_variations[ $key ][ 'originalTax' ]    = $product_tax;
					$available_variations[ $key ][ 'barcode_init' ]   = $barcode_init;
					$available_variations[ $key ][ 'barcode_final' ]  = $barcode_final;
					$available_variations[ $key ][ 'any_variation' ]  = false;
				}
			}

			ob_start();
			if ( 'custom' === $inventory_type ) {
				$stock = $product->get_meta( '_ddwcpos_outlet_stock_' . $outlet_id, true );

				if ( 'variable' === $product_type ) {
					?>
					<mark class="instock"><?php echo esc_html__( 'In Stock', 'ddwc-multipos' ); ?></mark>
					<?php
				} else {
					?>
					<mark class="instock">
						<?php
						/* translators: %s for product stock quantity */
						echo sprintf( esc_html__( 'In Stock(%s)', 'ddwc-multipos' ), $stock ); 
						?>
					</mark>
					<?php
				}
			} else {
				$stock_status       = $product->get_stock_status();
				$backorders_allowed = $product->backorders_allowed();
				$stock_quantity     = $product->get_stock_quantity();

				if ( $backorders_allowed ) {
					$stock = 999999999;
					if ( $stock_quantity > 0 ) {
						?>
						<mark class="instock">
							<?php
							/* translators: %s for product stock quantity */
							echo sprintf( esc_html__( 'On Backorder(%s)', 'ddwc-multipos' ), $stock_quantity ); 
							?>
						</mark>
						<?php
					} else {
						?>
						<mark class="instock"><?php esc_html_e( 'On Backorder', 'ddwc-multipos' ); ?></mark>
						<?php
					}
				} else if ( 'instock' === $stock_status ) {
					$stock = $stock_quantity > 0 ? $stock_quantity : 999999999;
					if ( $stock_quantity > 0 ) {
						?>
						<mark class="instock">
							<?php
							/* translators: %s for product stock quantity */
							echo sprintf( esc_html__( 'In Stock(%s)', 'ddwc-multipos' ), $stock_quantity ); 
							?>
						</mark>
						<?php
					} else {
						?>
						<mark class="instock"><?php esc_html_e( 'In Stock', 'ddwc-multipos' ); ?></mark>
						<?php
					}
				} else {
					$stock = 0;
					?>
					<mark class="outofstock"><?php esc_html_e( 'Out of Stock', 'ddwc-multipos' ); ?></mark>
					<?php
				}
			}

			$stock_html = ob_get_clean();

			if ( ( 'variable' === $product_type && ! $in_stock_variations ) || ( 'variable' !== $product_type && $stock <= 0 ) ) {
				return false;
			}

			$barcode_init  = $this->barcode_helper->ddwcpos_get_barcode_init( $product );
			$barcode_final = $this->barcode_helper->ddwcpos_generate_barcode( $barcode_init );

			if ( 'yes' === $is_include_tax ) {
				if ( 'excl' === $shop_display && 'excl' === $cart_display ) {
					$regular_price = $product->get_regular_price();
					$sale_price    = floatval( wc_get_price_excluding_tax( $product ) );
					$product_tax   = floatval( wc_get_price_including_tax( $product ) ) - $sale_price;
				} elseif ( 'incl' === $shop_display && 'excl' === $cart_display ) {
					$regular_price = $product->get_regular_price();
					$sale_price    = floatval( wc_get_price_excluding_tax( $product ) );
					$product_tax   = floatval( wc_get_price_including_tax( $product ) ) - $sale_price;
				} elseif ( 'excl' === $shop_display && 'incl' === $cart_display ) {
					$regular_price = $product->get_regular_price();
					$sale_price    = $product->get_price();
					$product_tax   = 0;
				} else {
					$regular_price = $product->get_regular_price();
					$sale_price    = $product->get_price();
					$product_tax   = 0;
				}
			} else {
				if ( 'excl' === $shop_display && 'excl' === $cart_display ) {
					$regular_price = $product->get_regular_price();
					$sale_price    = floatval( wc_get_price_excluding_tax( $product ) );
					$product_tax   = floatval( wc_get_price_including_tax( $product ) ) - $sale_price;
				} elseif ( 'incl' === $shop_display && 'excl' === $cart_display ) {
					$regular_price = $product->get_regular_price();
					$sale_price    = floatval( wc_get_price_excluding_tax( $product ) );
					$product_tax   = floatval( wc_get_price_including_tax( $product ) ) - $sale_price;
				} elseif ( 'excl' === $shop_display && 'incl' === $cart_display ) {
					$regular_price = $product->get_regular_price();
					$sale_price    = wc_get_price_including_tax( $product );
					$product_tax   = 0;
				} else {
					$regular_price = $product->get_regular_price();
					$sale_price    = wc_get_price_including_tax( $product );
					$product_tax   = 0;
				}
			}

			$categories = [];

			if ( 'variation' === $product_type ) {
				$terms = get_the_terms( $product->get_parent_id(), 'product_cat' );
			} else {
				$terms = get_the_terms( $product_id, 'product_cat' );
			}

			if ( ! empty( $terms ) ) {
				foreach ( $terms as $term ) {
					$categories[] = $term->term_id;

					if ( ! empty( $term->parent ) ) {
						$categories[] = $term->parent;
						$categories   = $this->ddwcpos_check_parent_category( $categories, $term->parent );
					}
				}
			}

			$attribute_keys   = [];
			$attribute_values = [];

			// if ( ! empty( $available_variations ) ) {
			//     foreach ( $attributes as $attribute_key => $attribute_value ) {
			//         $attribute_sanitized_key                      = 'attribute_' . sanitize_title( $attribute_key );
			//         $attribute_keys[]                             = $attribute_sanitized_key;
			//         $attribute_values[ $attribute_sanitized_key ] = wc_attribute_label( $attribute_key );
			//         $attributes[ $attribute_sanitized_key ]       = $attributes[ $attribute_key ];
			//         unset( $attributes[ $attribute_key ] );
			//     }
			// }

			if ( ! empty( $available_variations ) ) {
				foreach ( $attributes as $attribute_key => $attribute_value ) {
					$attribute_sanitized_key                      = 'attribute_' . sanitize_title( $attribute_key );
					$attribute_keys[]                             = $attribute_sanitized_key;
					$attribute_values[ $attribute_sanitized_key ] = wc_attribute_label( $attribute_key );

					foreach ( $attribute_value as $attr_key => $attr_val ) {
						$term = get_term_by( 'slug', $attr_val, $attribute_key );

						if ( ! is_wp_error( $term ) && $term && null !== $term->name && '' !== $term->name ) {
							$attributes[ $attribute_key ][ $attr_key ] = [
								'slug' => $term->slug,
								'name' => $term->name,
							];
						} else {
							$attributes[ $attribute_key ][ $attr_key ] = [
								'slug' => $attr_val,
								'name' => $attr_val,
							];
						}
					}

					$attributes[ $attribute_sanitized_key ] = $attributes[ $attribute_key ];

					unset( $attributes[ $attribute_key ] );
				}
			}
			// if ( $product_type == 'variable' ) {
			//     echo '<pre>';
			//     print_r( $product );
			//     echo '</pre><br>';
			//     die;
			//  }

			// if ( ! empty( $available_variations ) ) {
			//     foreach ( $attributes as $attribute_key => $attribute ) {
			//         $attribute_sanitized_key                      = 'attribute_' . sanitize_title( $attribute->get_name() );
			//         $attribute_keys[]                             = $attribute_sanitized_key;
			//         $attribute_values[ $attribute_sanitized_key ] = wc_attribute_label( $attribute->get_name() );
			//         $attributes[ $attribute_sanitized_key ]       = $attributes[ $attribute_key ];
			//         unset( $attributes[ $attribute_key ] );
			//     }
			// }

			return apply_filters(
				'ddwcpos_modify_api_products_data',
				[
					'product_id'           => $product_id,
					'sku'                  => $product->get_sku(),
					'slug'                 => $product->get_slug(),
					'title'                => $product->get_name( 'edit' ),
					'parent'               => $product->get_parent_id(),
					'price_html'           => $product->get_price_html(),
					'regular_price'        => $sale_price,
					'sale_price'           => $sale_price,
					'onsale'               => $product->is_on_sale(),
					'stock'                => $stock,
					'stock_html'           => $stock_html,
					'stock_status'         => $backorders_allowed ? 'onbackorder' : $product->get_stock_status(),
					'stock_quantity'       => 'custom' === $inventory_type ? ( $backorders_allowed ? $stock_quantity : $stock ) : $product->get_stock_quantity(),
					'image'                => $product->get_image( 'thumbnail' ),
					'categories'           => $categories,
					'tax'                  => $product_tax,
					'originalTax'          => $product_tax,
					'available_variations' => ! empty( $available_variations ) ? $available_variations : [],
					'attributes'           => ! empty( $attributes ) ? $attributes : '',
					'selected_attributes'  => ! empty( $selected_attributes ) ? $selected_attributes : '',
					'attribute_keys'       => $attribute_keys,
					'attribute_values'     => $attribute_values,
					'type'                 => $product_type,
					'weight'               => floatval( $product->get_weight() ),
					'length'               => floatval( $product->get_length() ),
					'width'                => floatval( $product->get_width() ),
					'height'               => floatval( $product->get_height() ),
					'barcode_init'         => $barcode_init,
					'barcode_final'        => $barcode_final,
				],
				$request
			);
		}
	}
}
