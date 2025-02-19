<?php
/**
 * API Get Categories class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\API\Includes\Products;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_GET_Product_Categories' ) ) {
    /**
     * API Get Categories class
     */
    class DDWCPOS_API_GET_Product_Categories {
        /**
         * Base Name.
         *
         * @var string the route base
         */
        public $base = 'get-product-categories';

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

                if ( apply_filters( 'ddwcpos_api_product_categories_different_approach', false, $request ) ) {
                    return apply_filters( 'ddwcpos_api_product_categories_different_approach_response', [], $request );
                }

                $cashier_id = $request[ 'cashier_id' ];
                $outlet_id  = $request[ 'outlet_id' ];
                $categories = [];

                // $product_categories = get_terms( 'product_cat', 'orderby=name&hide_empty=0&parent=0' );
                // $outlet_helper = new DDWCPOS_Outlet_Helper();
                // $outlet_data   = $outlet_helper->ddwcpos_get_outlet_details_by_id( $outlet_id );
                // $outlet_author = get_userdata( $outlet_data[ 'author' ] );
                // get_term_meta( $result[ 'term_id' ], '_wcfm_vendor', $author_id );

                $args = [
                    'taxonomy'     => 'product_cat',
                    'orderby'      => 'name',
                    'show_count'   => 1,
                    'pad_counts'   => 1,
                    'hierarchical' => 1,
                    'title_li'     => '',
                    'hide_empty'   => 0,
                    // 'meta_key'     => '_wcfm_vendor',
                    // 'meta_value'   => $outlet_data[ 'author' ],
                ];

                $all_categories = get_categories( apply_filters( 'ddwcpos_modify_api_product_categories_args', $args, $request ) );

                foreach ( $all_categories as $cat ) {
                    $cat_thumbnail_id = get_term_meta( $cat->term_id, 'thumbnail_id', true );
                    $cat_image_url    = wp_get_attachment_url( $cat_thumbnail_id );

                    if ( apply_filters( 'ddwcpos_modify_api_add_category_in_response', true, $cat->term_id, $request ) ) {
                        $categories[] = [
                            'id'     => $cat->term_id,
                            'name'   => $cat->name,
                            'image'  => $cat_image_url,
                            'parent' => $cat->category_parent,
                        ];
                    }
                }

                return apply_filters( 'ddwcpos_modify_api_get_product_categories_response', $categories, $request );
            } catch ( \Exception $e ) {
                return new \WP_Error( 'data_error', $e->getMessage() );
            }
        }
    }
}
