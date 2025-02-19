<?php
/**
 * This file handles all admin end ajax action callbacks.
 *
 * @author DevDiggers
 * @version 1.0.0
 * @package MultiPOS - Point of Sale for WooCommerce
 */

namespace DDWCMultiPOS\Includes\Admin;

use DDWCMultiPOS\Helper\Barcode\DDWCPOS_Barcode_Helper;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_Admin_Ajax_Functions' ) ) {
	/**
	 * Admin Functions Class
	 */
	class DDWCPOS_Admin_Ajax_Functions {
		/**
		 * Configuration Variable
		 *
		 * @var array
		 */
		protected $ddwcpos_configuration;

		/**
		 * Class constructor
		 * 
		 * @param array $ddwcpos_configuration
		 */
		public function __construct( $ddwcpos_configuration ) {
			$this->ddwcpos_configuration = $ddwcpos_configuration;
		}

		/**
		 * Verify License function
		 *
		 * @return void
		 */
		public function ddwcpos_verify_license() {
			if ( check_ajax_referer( 'ddwcpos-nonce', 'nonce', false ) ) {
				$purchase_code  = ! empty( $_POST[ 'purchase_code' ] ) ? sanitize_text_field( wp_unslash( $_POST[ 'purchase_code' ] ) ) : '';
				$purchase_email = ! empty( $_POST[ 'purchase_email' ] ) ? sanitize_text_field( wp_unslash( $_POST[ 'purchase_email' ] ) ) : '';
				$status         = ! empty( $_POST[ 'status' ] ) ? sanitize_text_field( wp_unslash( $_POST[ 'status' ] ) ) : '';

				$args = [
					'purchase_code'    => $purchase_code,
					'purchase_email'   => $purchase_email,
					'action'           => $status,
					'user_agent'       => site_url(),
					'multisite'        => is_multisite(),
					'network_site_url' => network_site_url(),
				];

				$response = wp_remote_post( 'https://devdiggers.com/wp-json/ddelv/v1/verify-purchase', [
					'body' => json_encode( $args )
				] );

				$response = json_decode( wp_remote_retrieve_body( $response ) );

				if ( $response->success ) {
					update_option( '_ddwcpos_purchase_code', $purchase_code );
					update_option( '_ddwcpos_purchase_email', $purchase_email );

					if ( 'activate' === $status ) {
						update_option( '_ddwcpos_license_activated', 'yes' );
					} else {
						delete_option( '_ddwcpos_license_activated' );
					}
				}

				wp_send_json( $response );
			}
		}

		/**
		 * Get Users
		 *
		 * @return void
		 */
		public function ddwcpos_get_users_list() {
			$response = [];
			if ( check_ajax_referer( 'ddwcpos-nonce', 'nonce', false ) ) {
				$query = isset( $_POST[ 'query' ] ) ? sanitize_text_field( wp_unslash( $_POST[ 'query' ] ) ) : ''; // wpcs: input var okay.

				$query = new \WP_User_Query( [
					'role__in'       => [ 'customer' ],
					'search'         => '*' . esc_attr( $query ) . '*',
					'search_columns' => [ 'user_login', 'user_email' ],
					'fields'         => [ 'user_email', 'user_login', 'ID' ],
				] );

				$response = [
					'success' => true,
					'message' => esc_html__( 'Successfully fetched!', 'ddwc-multipos' ),
					'users'   => $query->get_results(),
				];
			} else {
				$response = [
					'success' => false,
					'message' => esc_html__( 'Security check failed!', 'ddwc-multipos' ),
				];
			}
			wp_send_json( $response );
		}

		/**
		 * Update product meta function
		 *
		 * @return void
		 */
		public function ddwcpos_update_product_meta() {
			if ( check_ajax_referer( 'ddwcpos-nonce', 'nonce', false ) ) {
				$id             = ! empty( $_POST[ 'id' ] ) ? intval( sanitize_text_field( $_POST[ 'id' ] ) ) : '';
				$product_action = ! empty( $_POST[ 'product_action' ] ) ? sanitize_text_field( $_POST[ 'product_action' ] ) : '';

				if ( 'update_barcode' === $product_action ) {
					$barcode = ! empty( $_POST[ 'barcode' ] ) ? sanitize_text_field( $_POST[ 'barcode' ] ) : '';

					if ( ! empty( $id ) && ! empty( $barcode ) ) {
						$barcode_helper = new DDWCPOS_Barcode_Helper( $this->ddwcpos_configuration );
						$barcode_final  = $barcode_helper->ddwcpos_generate_barcode( $barcode );
						update_post_meta( $id, '_ddwcpos_barcode_init', $barcode );

						$barcode_image_url = DDWCPOS_PLUGIN_URL . "helper/barcode/barcode-image.php?code={$barcode_final}&size={$this->ddwcpos_configuration[ 'barcode_height' ]}";

						ob_start();
						?>
						<div style="width:max-content; margin: <?php echo esc_attr( $this->ddwcpos_configuration[ 'barcode_margin' ] ); ?>; display:inline-block; text-align: center; <?php echo esc_attr( 'vertical' === $this->ddwcpos_configuration[ 'barcode_orientation' ] ? 'transform: rotate(90deg);' : '' ); ?>"><img src="<?php echo esc_url( $barcode_image_print_url ); ?>" alt="<?php esc_attr_e( 'Barcode', 'ddwc-multipos' ); ?>" /></div>
						<?php
						$barcode_print_content = apply_filters( 'ddwcpos_modify_barcode_print_content', ob_get_clean(), $product );

						$response = [
							'success'               => true,
							'barcode_print_content' => $barcode_print_content,
							'image'                 => $barcode_image_url,
							'message'               => esc_html__( 'Barcode updated successfully.', 'ddwc-multipos' ),
						];
					} else {
						$response = [
							'success' => false,
							'message' => esc_html__( 'Barcode field is empty.', 'ddwc-multipos' ),
						];
					}
				} else if ( 'update_custom_stock' === $product_action ) {
					$custom_stock = ! empty( $_POST[ 'custom_stock' ] ) ? sanitize_text_field( $_POST[ 'custom_stock' ] ) : 0;
					$outlet_id    = ! empty( $_POST[ 'outlet_id' ] ) ? sanitize_text_field( $_POST[ 'outlet_id' ] ) : '';

					if ( ! empty( $id ) && isset( $custom_stock ) && ! empty( $outlet_id ) ) {
						update_post_meta( $id, '_ddwcpos_outlet_stock_' . $outlet_id, $custom_stock );

						$response = [
							'success' => true,
							'message' => esc_html__( 'Custom stock updated successfully.', 'ddwc-multipos' ),
						];
					} else {
						$response = [
							'success' => false,
							'message' => esc_html__( 'Custom stock value is invalid.', 'ddwc-multipos' ),
						];
					}
				}

			} else {
				$response = [
					'success' => false,
					'message' => esc_html__( 'Security check failed!', 'ddwc-multipos' ),
				];
			}

			wp_send_json( $response );
		}
	}
}
