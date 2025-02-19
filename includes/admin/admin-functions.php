<?php
/**
 * This file handles all admin end action callbacks.
 *
 * @author DevDiggers
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Includes\Admin;

use DDWCMultiPOS\Helper\Error\DDWCPOS_Error_Helper;
use DDWCMultiPOS\Helper\Outlet\DDWCPOS_Outlet_Helper;
use DDWCMultiPOS\Templates\Admin;
use Automattic\WooCommerce\Utilities\OrderUtil;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_Admin_Functions' ) ) {
	/**
	 * Admin Functions Class
	 */
	class DDWCPOS_Admin_Functions {
		/**
		 * Use Error Trait
		 */
		use DDWCPOS_Error_Helper;

		/**
		 * Configuration Variable
		 *
		 * @var array
		 */
		protected $ddwcpos_configuration;

		/**
		 * Construct
		 */
		public function __construct( $ddwcpos_configuration ) {
			$this->ddwcpos_configuration = $ddwcpos_configuration;
		}

		/**
		 * Add Admin menu function
		 *
		 * @return void
		 */
		public function ddwcpos_add_dashboard_menu() {
			$menu_capability = apply_filters( 'ddwcpos_modify_admin_menu_capability', 'manage_woocommerce' );

			add_menu_page( esc_html__( 'MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'MultiPOS - Point of Sale', 'ddwc-multipos' ), $menu_capability, 'ddwc-multipos-management', [ $this, 'ddwcpos_get_analytics' ], 'dashicons-store', 56 );

			add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Analytics | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Analytics', 'ddwc-multipos' ), $menu_capability, 'ddwc-multipos-management', [ $this, 'ddwcpos_get_analytics' ] );

			$hook_outlets_list = add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Outlets | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Outlets', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-outlets', [ $this, 'ddwcpos_get_outlets' ] );

			$hook_cashiers_list = add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Cashiers | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Cashiers', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-cashiers', [ $this, 'ddwcpos_get_cashiers' ] );

			add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Tables | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Tables', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-tables', [ $this, 'ddwcpos_get_tables' ] );

			$hook_barcodes_list = add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Assign Barcodes | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Assign Barcodes', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-product-barcodes', [ $this, 'ddwcpos_get_product_barcodes' ] );

			$hook_stocks_list = add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Assign Stocks | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Assign Stocks', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-product-stocks', [ $this, 'ddwcpos_get_product_stocks' ] );

			$hook_orders_list = add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Orders | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Orders', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-orders', [ $this, 'ddwcpos_get_orders' ] );

			$hook_transactions_list = add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Transactions | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Transactions', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-transactions', [ $this, 'ddwcpos_get_transactions' ] );

			add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Invoices | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Invoices', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-invoices', [ $this, 'ddwcpos_get_invoices' ] );

			add_submenu_page( 'ddwc-multipos-management', esc_html__( 'Configuration | MultiPOS - Point of Sale', 'ddwc-multipos' ), esc_html__( 'Configuration', 'ddwc-multipos' ), $menu_capability, 'ddwcpos-configuration', [ $this, 'ddwcpos_get_configuration' ] );

			do_action( 'ddwcpos_admin_menu_action' );

			add_action( "load-{$hook_outlets_list}", [ $this, 'ddwcpos_add_screen_options_in_outlets_list' ] );
			add_action( "load-{$hook_cashiers_list}", [ $this, 'ddwcpos_add_screen_options_in_cashiers_list' ] );
			add_action( "load-{$hook_barcodes_list}", [ $this, 'ddwcpos_add_screen_options_in_barcodes_list' ] );
			add_action( "load-{$hook_stocks_list}", [ $this, 'ddwcpos_add_screen_options_in_stocks_list' ] );
			add_action( "load-{$hook_orders_list}", [ $this, 'ddwcpos_add_screen_options_in_orders_list' ] );
			add_action( "load-{$hook_transactions_list}", [ $this, 'ddwcpos_add_screen_options_in_transactions_list' ] );

			global $submenu;

			if ( ! empty( $submenu[ 'ddwc-multipos-management' ] ) ) {
				$submenu[ 'ddwc-multipos-management' ][] = [ esc_html__( 'Extensions', 'ddwc-multipos' ) . '<i class="dashicons dashicons-external ddwcpos-dashicon-external"></i>', 'level_1', '//devdiggers.com/woocommerce-extensions/?utm_source=MultiPOS - Point of Sale for WooCommerce Plugin&utm_medium=Plugin Admin Menu&utm_campaign=WooCommerce Extensions' ];
			}
		}

		/**
		 * Admin head function
		 *
		 * @return void
		 */
		public function ddwcpos_admin_head() {
			?>
			<script type="text/javascript">
				// Open extensions menu link in the new tab.
				jQuery( document ).ready( function( $ ) {
					$( "ul#adminmenu a[href*='devdiggers.com']" ).attr( 'target', '_blank' );
				} );
			</script>
			<style>
				.ddwcpos-dashicon-external {
					font-size: 14px;
					vertical-align: -2px;
					height: 10px;
				}
			</style>
			<?php
		}

		/**
		 * Outlets List Screen Options.
		 *
		 * @return void
		 */
		public function ddwcpos_add_screen_options_in_outlets_list() {
			global $myListTable;

			$args = [
				'label'   => esc_html__( 'Outlets Per Page', 'ddwc-multipos' ),
				'default' => 20,
				'option'  => 'outlets_per_page',
				'hidden'  => 'id',
			];

			add_screen_option( 'per_page', $args );

			$myListTable = new Admin\Outlet\DDWCPOS_Outlets_List_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Cashiers List Screen Options.
		 *
		 * @return void
		 */
		public function ddwcpos_add_screen_options_in_cashiers_list() {
			global $myListTable;

			$args = [
				'label'   => esc_html__( 'Cashiers Per Page', 'ddwc-multipos' ),
				'default' => 20,
				'option'  => 'cashiers_per_page',
				'hidden'  => 'id',
			];

			add_screen_option( 'per_page', $args );

			$myListTable = new Admin\Cashier\DDWCPOS_Cashiers_List_Template();
		}

		/**
		 * Assign Barcodes List Screen Options.
		 *
		 * @return void
		 */
		public function ddwcpos_add_screen_options_in_barcodes_list() {
			global $myListTable;

			$args = [
				'label'   => esc_html__( 'Products Per Page', 'ddwc-multipos' ),
				'default' => 20,
				'option'  => 'barcodes_per_page',
				'hidden'  => 'id',
			];

			add_screen_option( 'per_page', $args );

			$myListTable = new Admin\Barcode\DDWCPOS_Product_Barcodes_List_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Product Stocks List Screen Options.
		 *
		 * @return void
		 */
		public function ddwcpos_add_screen_options_in_stocks_list() {
			global $myListTable;

			$args = [
				'label'   => esc_html__( 'Products Per Page', 'ddwc-multipos' ),
				'default' => 20,
				'option'  => 'stocks_per_page',
				'hidden'  => 'id',
			];

			add_screen_option( 'per_page', $args );

			$myListTable = new Admin\Stock\DDWCPOS_Product_Stocks_List_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Orders List Screen Options.
		 *
		 * @return void
		 */
		public function ddwcpos_add_screen_options_in_orders_list() {
			global $myListTable;

			$args = [
				'label'   => esc_html__( 'Orders Per Page', 'ddwc-multipos' ),
				'default' => 20,
				'option'  => 'orders_per_page',
				'hidden'  => 'id',
			];

			add_screen_option( 'per_page', $args );

			$myListTable = new Admin\Order\DDWCPOS_Orders_List_Template();
		}

		/**
		 * Transactions List Screen Options.
		 *
		 * @return void
		 */
		public function ddwcpos_add_screen_options_in_transactions_list() {
			global $myListTable;

			$args = [
				'label'   => esc_html__( 'Transactions Per Page', 'ddwc-multipos' ),
				'default' => 20,
				'option'  => 'transactions_per_page',
				'hidden'  => 'id',
			];

			add_screen_option( 'per_page', $args );

			$myListTable = new Admin\Transaction\DDWCPOS_Transactions_List_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Set Options.
		 *
		 * @param string $status Status.
		 * @param string $option Option.
		 * @param string $value Option Value.
		 * @return string
		 */
		public function ddwcpos_set_options( $status, $option, $value ) {
			$options = [ 'outlets_per_page', 'cashiers_per_page', 'barcodes_per_page', 'stocks_per_page', 'orders_per_page', 'transactions_per_page' ];
			return in_array( $option, $options, true ) ? $value : $status;
		}

		/**
		 * Set screen ids
		 *
		 * @param array $ids
		 * @return array
		 */
		public function ddwcpos_set_wc_screen_ids( $ids ) {
			$screen_id = sanitize_title( esc_html__( 'MultiPOS - Point of Sale', 'ddwc-multipos' ) );
			$screen_ids = [
				'toplevel_page_' . $screen_id,
				'toplevel_page_ddwc-multipos-management',
				$screen_id . '_page_ddwcpos-outlets',
				$screen_id . '_page_ddwcpos-cashiers',
				$screen_id . '_page_ddwcpos-tables',
				$screen_id . '_page_ddwcpos-product-barcodes',
				$screen_id . '_page_ddwcpos-product-stocks',
				$screen_id . '_page_ddwcpos-orders',
				$screen_id . '_page_ddwcpos-transactions',
				$screen_id . '_page_ddwcpos-invoices',
				$screen_id . '_page_ddwcpos-configuration',
			];
			array_push( $ids, ...$screen_ids );
			return $ids;
		}

		/**
		 * Register settings function
		 *
		 * @return settings
		 */
		public function ddwcpos_register_settings() {
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_inventory_type' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_order_status' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_default_barcode' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_order_mails_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_multiple_payments_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_order_note_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_offline_orders_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_custom_product_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_opencash_drawer_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_unit_price_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_automatic_send_kitchen_order_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_order_send_kitchen_checked_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_load_only_guest_customer_enabled' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_load_orders_only_days_old' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_logo' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_default_customer' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_endpoint' );
			register_setting( 'ddwcpos-general-configuration-fields', '_ddwcpos_kitchen_endpoint' );

			register_setting( 'ddwcpos-payments-configuration-fields', '_ddwcpos_payment_method' );

			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_heading_text' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_footer_text' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_button_text' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_rememberme_enabled' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_forgot_enabled' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_bg_primary_color' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_bg_secondary_color' );
			register_setting( 'ddwcpos-login-configuration-fields', '_ddwcpos_login_font_color' );

			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_barcode_printer_width' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_barcode_printer_height' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_barcode_printer_margin' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_barcode_height' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_barcode_margin' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_barcode_orientation' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_printer_width' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_printer_height' );
			register_setting( 'ddwcpos-printer-configuration-fields', '_ddwcpos_printer_margin' );

			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_name' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_short_name' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_description' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_theme_color' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_background_color' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_icon48' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_icon96' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_icon144' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_icon196' );
			register_setting( 'ddwcpos-pwa-configuration-fields', '_ddwcpos_pwa_icon512' );

			register_setting( 'ddwcpos-tables-configuration-fields', '_ddwcpos_tables' );

			register_setting( 'ddwcpos-invoices-configuration-fields', '_ddwcpos_invoices' );

			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_layout_primary_color' );
			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_layout_secondary_color' );
			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_layout_font_size' );
			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_product_layout' );
			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_product_variation_layout' );
			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_variation_product_enabled' );
			register_setting( 'ddwcpos-layout-configuration-fields', '_ddwcpos_show_product_stock_enabled' );
		}

		/**
		 * Enqueue admin scripts function
		 *
		 * @return scripts
		 */
		public function ddwcpos_enqueue_admin_scripts() {
			$pages = [ 'ddwcpos-outlets', 'ddwcpos-cashiers', 'ddwcpos-tables', 'ddwcpos-product-barcodes', 'ddwcpos-product-stocks', 'ddwcpos-transactions', 'ddwcpos-invoices', 'ddwcpos-configuration' ];

			$pages = apply_filters( 'ddwcpos_modify_pages_to_enqueue_script_at_admin_end', $pages );
			if ( ( ! empty( $_REQUEST[ 'page' ] ) && in_array( $_REQUEST[ 'page' ], $pages ) ) || ( strpos( $_SERVER[ 'REQUEST_URI' ], 'user-new.php' ) || strpos( $_SERVER[ 'REQUEST_URI' ], 'user-edit.php' ) ) ) {
				wp_enqueue_media();

				wp_enqueue_style( 'select2', plugins_url() . '/woocommerce/assets/css/select2.css' );

				wp_enqueue_script( 'jquery-ui-datepicker' );

				wp_enqueue_style( 'jquery-ui', plugins_url() . '/woocommerce/assets/css/jquery-ui/jquery-ui.min.css', [], DDWCPOS_SCRIPT_VERSION );

				wp_enqueue_style( 'ddwcpos-admin-style', DDWCPOS_PLUGIN_URL . 'assets/css/admin.css', [], DDWCPOS_SCRIPT_VERSION );

				wp_enqueue_script( 'ddwcpos-admin-script', DDWCPOS_PLUGIN_URL . 'assets/js/admin.js', [ 'select2', 'wp-util' ], DDWCPOS_SCRIPT_VERSION );

				wp_enqueue_style( 'codemirror', DDWCPOS_PLUGIN_URL . 'assets/css/codemirror.css', [], DDWCPOS_SCRIPT_VERSION );

				wp_enqueue_script( 'codemirror', DDWCPOS_PLUGIN_URL . 'assets/js/codemirror.js', [], DDWCPOS_SCRIPT_VERSION );

				wp_enqueue_script( 'tinymce_js', includes_url( 'js/tinymce/' ) . 'wp-tinymce.js', [ 'jquery' ], false, true );

				wp_localize_script(
					'ddwcpos-admin-script',
					'ddwcposAdminObj',
					[
						'ajax' => [
							'ajaxUrl'   => admin_url( 'admin-ajax.php' ),
							'ajaxNonce' => wp_create_nonce( 'ddwcpos-nonce' ),
						],
						'i18n' => [
							'pleaseEnter'          => esc_html__( 'Please enter', 'ddwc-multipos' ),
							'moreCharacter'        => esc_html__( 'or more character', 'ddwc-multipos' ),
							'noResult'             => esc_html__( 'No result Found', 'ddwc-multipos' ),
							'uploadIcon'           => esc_html__( 'Upload Icon', 'ddwc-multipos' ),
							'barcodeError'         => esc_html__( 'Barcode field is empty.', 'ddwc-multipos' ),
							'barcodeQuantityError' => esc_html__( 'Barcode quantity field is empty.', 'ddwc-multipos' ),
							'customStockError'     => esc_html__( 'Custom stock value is invalid.', 'ddwc-multipos' ),
						],
						'ddwcpos_configuration' => $this->ddwcpos_configuration,
						'siteReferer'           => ! empty( $_SERVER[ 'HTTP_REFERER' ] ) ? strpos( $_SERVER[ 'HTTP_REFERER' ], 'ddwcpos-cashiers' ) : false,
					]
				);
			} elseif ( ! empty( $_REQUEST[ 'page' ] ) && 'ddwc-multipos-management' === $_REQUEST[ 'page' ] ) {
				wp_enqueue_style( 'ddwcpos-reports-style', DDWCPOS_PLUGIN_URL . 'assets/css/reports.css', [ 'wp-components', 'wc-components' ], DDWCPOS_SCRIPT_VERSION );

				wp_enqueue_script( 'ddwcpos-reports-script', DDWCPOS_PLUGIN_URL . 'assets/js/reports.js', [ 'wc-components', 'wp-mediaelement' ], DDWCPOS_SCRIPT_VERSION );

				wp_set_script_translations( 'ddwcpos-reports-script', 'ddwc-multipos' );

				$code          = get_woocommerce_currency();
				$outlet_helper = new DDWCPOS_Outlet_Helper();
				$outlets       = $outlet_helper->ddwcpos_get_all_outlets( 999999, 0, '' );
				$site_url      = site_url();
				$parsed_url    = parse_url( $site_url, PHP_URL_PATH );

				wp_localize_script(
					'ddwcpos-reports-script',
					'ddwcposReportsObj',
					[
						'SITE_URL' => $site_url,
						'siteUrl'  => ( $parsed_url ? $parsed_url : '' ) . '/wp-admin/admin.php',
						'outlets'  => $outlets,
						'user_id'  => get_current_user_id(),
						'currency' => [
							'code'              => $code,
							'precision'         => wc_get_price_decimals(),
							'symbol'            => html_entity_decode( get_woocommerce_currency_symbol( $code ) ),
							'symbolPosition'    => get_option( 'woocommerce_currency_pos' ),
							'decimalSeparator'  => wc_get_price_decimal_separator(),
							'thousandSeparator' => wc_get_price_thousand_separator(),
							'priceFormat'       => html_entity_decode( get_woocommerce_price_format() ),
						],
					]
				);
			}

			$screen    = get_current_screen();
			$screen_id = $screen ? $screen->id : '';

			// $order_screen_id = OrderUtil::custom_orders_table_usage_is_enabled() ? wc_get_page_screen_id( 'shop-order' ) : 'shop_order';

			if ( 'edit-shop_order' === $screen_id || 'shop_order' === $screen_id || 'woocommerce_page_wc-orders' || $screen_id ) {
				wp_enqueue_style( 'ddwcpos-admin-style', DDWCPOS_PLUGIN_URL . 'assets/css/admin.css', [], DDWCPOS_SCRIPT_VERSION );
			}
		}

		/**
		 * Add user form fields function
		 *
		 * @return void
		 */
		public function ddwcpos_add_user_form_fields() {
			$outlet_helper     = new DDWCPOS_Outlet_Helper();
			$outlets           = $outlet_helper->ddwcpos_get_all_outlets( 999999, 0, '' );
			$from_cashier_page = ! empty( $_SERVER[ 'HTTP_REFERER' ] ) && strpos( $_SERVER[ 'HTTP_REFERER' ], 'ddwcpos-cashiers' ) ?: 0;
			?>
			<script id="tmpl-ddwcpos_assigned_outlets" type="text/html">
				<div id="ddwcpos-assigned-outlets-row">
					<h3 class="heading"><?php esc_html_e( 'MultiPOS Outlet Details', 'ddwc-multipos' ); ?></h3>
					<table class="form-table" role="presentation">
						<tbody>
							<tr valign="top">
								<th>
									<label for="ddwcpos-assigned-outlets">
										<?php esc_html_e( 'Assigned Outlets', 'ddwc-multipos' ); ?>
										<span class="description"><?php esc_html_e( '(required)', 'ddwc-multipos' ); ?></span>
									</label>
								</th>
								<td>
									<input type="hidden" name="ddwcpos_from_cashier_page" value="<?php echo esc_attr( $from_cashier_page ); ?>" />
									<select id="ddwcpos-assigned-outlets" name="ddwcpos_assigned_outlets[]" class="ddwcpos-assigned-outlets regular-text" data-placeholder="<?php esc_attr_e( 'Select Outlet', 'ddwc-multipos' ); ?>" multiple required>
										<?php
										foreach ( $outlets as $key => $outlet ) {
											?>
											<option value="<?php echo esc_attr( $outlet[ 'id' ] ); ?>"><?php echo esc_html( $outlet[ 'name' ] ); ?></option>
											<?php
										}
										?>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</script>
			<?php
		}

		/**
		 * Validate fields
		 *
		 * @param object $errors
		 * @param string $update
		 * @param object $user
		 * @return void
		 */
		public function ddwcpos_validate_user_fields( &$errors, $update = null, &$user = null ) {
			if ( ! empty( $_POST[ 'createuser' ] ) && ! empty( $_POST[ 'role' ] ) && 'ddwcpos_cashier' === $_POST[ 'role' ] ) {
				if ( empty( $_POST[ 'ddwcpos_assigned_outlets' ] ) ) {
					$errors->add( 'ddwcpos_assigned_outlets_error', esc_html__( 'Please select the assigned outlets.', 'ddwc-multipos' ) );
					return false;
				}
			}
			return $errors;
		}

		/**
		 * Save user custom data function.
		 *
		 * @param int $user_id
		 * @return void
		 */
		public function ddwcpos_save_user_custom_data( $user_id ) {
			if ( ! empty( $_POST[ 'createuser' ] ) && ! empty( $_POST[ 'role' ] ) && 'ddwcpos_cashier' === $_POST[ 'role' ] ) {
				$assigned_outlets  = ! empty( $_POST[ 'ddwcpos_assigned_outlets' ] ) ? $_POST[ 'ddwcpos_assigned_outlets' ] : [];
				$from_cashier_page = ! empty( $_POST[ 'ddwcpos_from_cashier_page' ] ) ?: 0;
				update_user_meta( $user_id, '_ddwcpos_assigned_outlets', $assigned_outlets );

				if ( 0 != $from_cashier_page ) {
					wp_safe_redirect( admin_url( 'admin.php?page=ddwcpos-cashiers&success=yes' ) );
					exit();
				}
			}
		}

		/**
		 * Display custom user profile fields function
		 *
		 * @param object $user
		 * @return void
		 */
		public function ddwcpos_display_custom_user_profile_fields( $user ) {
			$outlet_helper    = new DDWCPOS_Outlet_Helper();
			$outlets          = $outlet_helper->ddwcpos_get_all_outlets( 999999, 0, '' );
			$assigned_outlets = get_user_meta( $user->ID, '_ddwcpos_assigned_outlets', true );

			if ( empty( $assigned_outlets ) ) {
				$assigned_outlets = [];
			}

			?>
			<script id="tmpl-ddwcpos_assigned_outlets" type="text/html">
				<div id="ddwcpos-assigned-outlets-row">
					<h3 class="heading"><?php esc_html_e( 'MultiPOS Outlet Details', 'ddwc-multipos' ); ?></h3>
					<table class="form-table" role="presentation">
						<tbody>
							<tr valign="top">
								<th>
									<label for="ddwcpos-assigned-outlets">
										<?php esc_html_e( 'Assigned Outlets', 'ddwc-multipos' ); ?>
										<span class="description"><?php esc_html_e( '(required)', 'ddwc-multipos' ); ?></span>
									</label>
								</th>
								<td>
									<select id="ddwcpos-assigned-outlets" name="ddwcpos_assigned_outlets[]" class="ddwcpos-assigned-outlets regular-text" data-placeholder="<?php esc_attr_e( 'Select Outlet', 'ddwc-multipos' ); ?>" multiple required>
										<?php
										foreach ( $outlets as $key => $outlet ) {
											?>
											<option value="<?php echo esc_attr( $outlet[ 'id' ] ); ?>" <?php echo esc_attr( in_array( $outlet[ 'id' ], $assigned_outlets, true ) ? 'selected="selected"' : '' ); ?>><?php echo esc_html( $outlet[ 'name' ] ); ?></option>
											<?php
										}
										?>
									</select>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</script>
			<?php
		}

		/**
		 * Save custom user profile fields function
		 *
		 * @param int $user_id
		 * @return void
		 */
		public function ddwcpos_save_custom_user_profile_fields( $user_id ) {
			if ( ! empty( $_POST[ '_wpnonce' ] ) && wp_verify_nonce( $_POST[ '_wpnonce' ], 'update-user_' . $user_id ) && current_user_can( 'edit_user', $user_id ) && 'ddwcpos_cashier' === $_POST[ 'role' ] ) {
				$assigned_outlets = ! empty( $_POST[ 'ddwcpos_assigned_outlets' ] ) ? $_POST[ 'ddwcpos_assigned_outlets' ] : [];
				update_user_meta( $user_id, '_ddwcpos_assigned_outlets', $assigned_outlets );
			}
		}

		/**
		 * Admin bar menu function
		 *
		 * @param object $wp_admin_bar
		 * @return void
		 */
		public function ddwcpos_admin_bar_menu( $wp_admin_bar ) {
			if ( ! is_user_logged_in() ) {
				return;
			}

			// Show only when the user is a member of this site, or they're a super admin.
			if ( ! is_user_member_of_blog() && ! is_super_admin() ) {
				return;
			}

			// Add an option to visit the store.
			$wp_admin_bar->add_node( [
				'parent' => 'site-name',
				'id'     => 'view-pos',
				'title'  => esc_html__( 'Visit POS', 'ddwc-multipos' ),
				'href'   => site_url( $this->ddwcpos_configuration[ 'endpoint' ] ),
			] );
		}

		/**
		 * Get Analytics function
		 *
		 * @return void
		 */
		public function ddwcpos_get_analytics() {
			?>
			<div id="app"></div>
			<?php
		}

		/**
		 * Get outlets list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_outlets() {
			?>
			<div class="wrap">
				<?php
				if ( ! empty( $_GET[ 'action' ] ) && ( 'add' === $_GET[ 'action' ] || 'edit' === $_GET[ 'action' ] ) ) {
					new Admin\Outlet\DDWCPOS_Manage_Outlet_Template( $this->ddwcpos_configuration );
				} else {
					if ( ! empty( $_GET[ 'success' ] ) ) {
						$this->ddwcpos_print_notification( esc_html__( 'Outlet saved successfully.', 'ddwc-multipos' ), 'success' );
					}
					$obj = new Admin\Outlet\DDWCPOS_Outlets_List_Template( $this->ddwcpos_configuration );
					?>
					<h1 class="wp-heading-inline"><?php esc_html_e( 'Outlets', 'ddwc-multipos' ); ?></h1>
					<a href="<?php echo esc_url( admin_url( 'admin.php?page=' . $_REQUEST[ 'page' ] . '&action=add' ) ); ?>" class="page-title-action"><?php esc_html_e( 'Add New', 'ddwc-multipos' ); ?></a>
					<a href="<?php echo esc_url( site_url( $this->ddwcpos_configuration[ 'endpoint' ] ) ); ?>" class="page-title-action" target="_blank"><?php esc_html_e( 'Visit POS', 'ddwc-multipos' ); ?></a>
					<hr class="wp-header-end" />
					<form method="get">
						<input type="hidden" name="page" value="<?php echo isset( $_REQUEST[ 'page' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'page' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
						<input type="hidden" name="paged" value="<?php echo isset( $_REQUEST[ 'paged' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'paged' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
						<?php
						wp_nonce_field( 'ddwcpos_nonce_action', 'ddwcpos_nonce' );
						$obj->prepare_items();
						$obj->search_box( esc_html__( 'Search', 'ddwc-multipos' ), 'search-id' );
						$obj->display();
						?>
					</form>
					<?php
				}
				?>
			</div>
			<?php
		}

		/**
		 * Get cashiers list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_cashiers() {
			if ( ! empty( $_GET[ 'success' ] ) ) {
				$this->ddwcpos_print_notification( esc_html__( 'Cashier created successfully.', 'ddwc-multipos' ), 'success' );
			}
			$obj = new Admin\Cashier\DDWCPOS_Cashiers_List_Template();
			?>
			<div class="wrap">
				<h1 class="wp-heading-inline"><?php esc_html_e( 'Cashiers', 'ddwc-multipos' ); ?></h1>
				<a href="<?php echo esc_url( admin_url( 'user-new.php' ) ); ?>" class="page-title-action"><?php esc_html_e( 'Add New', 'ddwc-multipos' ); ?></a>
				<hr class="wp-header-end" />
				<form method="get">
					<input type="hidden" name="page" value="<?php echo isset( $_REQUEST[ 'page' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'page' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="paged" value="<?php echo isset( $_REQUEST[ 'paged' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'paged' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<?php
					wp_nonce_field( 'ddwcpos_nonce_action', 'ddwcpos_nonce' );
					$obj->prepare_items();
					$obj->search_box( esc_html__( 'Search', 'ddwc-multipos' ), 'search-id' );
					$obj->display();
					?>
				</form>
			</div>
			<?php
		}

		/**
		 * Get tables function
		 *
		 * @return void
		 */
		public function ddwcpos_get_tables() {
			new Admin\Tables\DDWCPOS_Tables_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Get product barcodes list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_product_barcodes() {
			$obj = new Admin\Barcode\DDWCPOS_Product_Barcodes_List_Template( $this->ddwcpos_configuration );
			?>
			<div class="wrap">
				<h1 class="wp-heading-inline"><?php esc_html_e( 'Products', 'ddwc-multipos' ); ?></h1>
				<a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=product' ) ); ?>" class="page-title-action"><?php esc_html_e( 'Add New', 'ddwc-multipos' ); ?></a>
				<hr class="wp-header-end" />
				<form method="get">
					<input type="hidden" name="page" value="<?php echo isset( $_REQUEST[ 'page' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'page' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="paged" value="<?php echo isset( $_REQUEST[ 'paged' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'paged' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<?php
					wp_nonce_field( 'ddwcpos_nonce_action', 'ddwcpos_nonce' );
					$obj->prepare_items();
					$obj->search_box( esc_html__( 'Search', 'ddwc-multipos' ), 'search-id' );
					$obj->display();
					?>
				</form>
			</div>
			<?php
		}

		/**
		 * Get product barcodes list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_product_stocks() {
			$obj = new Admin\Stock\DDWCPOS_Product_Stocks_List_Template( $this->ddwcpos_configuration );
			?>
			<div class="wrap">
				<h1 class="wp-heading-inline"><?php esc_html_e( 'Products', 'ddwc-multipos' ); ?></h1>
				<a href="<?php echo esc_url( admin_url( 'post-new.php?post_type=product' ) ); ?>" class="page-title-action"><?php esc_html_e( 'Add New', 'ddwc-multipos' ); ?></a>
				<hr class="wp-header-end" />
				<form method="get">
					<input type="hidden" name="page" value="<?php echo isset( $_REQUEST[ 'page' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'page' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="paged" value="<?php echo isset( $_REQUEST[ 'paged' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'paged' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="outlet-id" value="<?php echo isset( $_REQUEST[ 'outlet-id' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'outlet-id' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<?php
					wp_nonce_field( 'ddwcpos_nonce_action', 'ddwcpos_nonce' );
					$obj->prepare_items();
					$obj->search_box( esc_html__( 'Search', 'ddwc-multipos' ), 'search-id' );
					$obj->display();
					?>
				</form>
			</div>
			<?php
		}

		/**
		 * Get orders list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_orders() {
			$obj = new Admin\Order\DDWCPOS_Orders_List_Template();
			?>
			<div class="wrap">
				<h1 class="wp-heading-inline"><?php esc_html_e( 'Orders', 'ddwc-multipos' ); ?></h1>
				<hr class="wp-header-end" />
				<form method="get">
					<input type="hidden" name="page" value="<?php echo isset( $_REQUEST[ 'page' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'page' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="paged" value="<?php echo isset( $_REQUEST[ 'paged' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'paged' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="outlet-id" value="<?php echo isset( $_REQUEST[ 'outlet-id' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'outlet-id' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<?php
					wp_nonce_field( 'ddwcpos_nonce_action', 'ddwcpos_nonce' );
					$obj->prepare_items();
					$obj->search_box( esc_html__( 'Search', 'ddwc-multipos' ), 'search-id' );
					$obj->display();
					?>
				</form>
			</div>
			<?php
		}

		/**
		 * Get transactions list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_transactions() {
			$obj = new Admin\Transaction\DDWCPOS_Transactions_List_Template( $this->ddwcpos_configuration );
			?>
			<div class="wrap">
				<h1 class="wp-heading-inline"><?php esc_html_e( 'Transactions', 'ddwc-multipos' ); ?></h1>
				<hr class="wp-header-end" />
				<form method="get">
					<input type="hidden" name="page" value="<?php echo isset( $_REQUEST[ 'page' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'page' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="paged" value="<?php echo isset( $_REQUEST[ 'paged' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'paged' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<input type="hidden" name="outlet-id" value="<?php echo isset( $_REQUEST[ 'outlet-id' ] ) ? esc_attr( sanitize_text_field( wp_unslash( $_REQUEST[ 'outlet-id' ] ) ) ) : ''; // WPCS: CSRF ok. // WPCS: input var ok. ?>" />
					<?php
					wp_nonce_field( 'ddwcpos_nonce_action', 'ddwcpos_nonce' );
					$obj->prepare_items();
					$obj->search_box( esc_html__( 'Search', 'ddwc-multipos' ), 'search-id' );
					$obj->display();
					?>
				</form>
			</div>
			<?php
		}

		/**
		 * Get invoices list function
		 *
		 * @return void
		 */
		public function ddwcpos_get_invoices() {
			new Admin\Invoices\DDWCPOS_Invoices_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Configuration Template function
		 *
		 * @return void
		 */
		public function ddwcpos_get_configuration() {
			new Admin\Configuration\DDWCPOS_Configuration_Template( $this->ddwcpos_configuration );
		}

		/**
		 * Add custom WooCommerce orders column function
		 *
		 * @param array $columns
		 * @return array
		 */
		public function ddwcpos_add_custom_woocommerce_orders_column( $columns ) {
			$new_columns = [];
			foreach ( $columns as $key => $value ) {
				if ( 'order_number' === $key ) {
					ob_start();
					?>
					<span class="order-type tips" data-tip="<?php esc_attr_e( 'Order Type', 'ddwc-multipos' ); ?>"><?php esc_html_e( 'Order Type', 'ddwc-multipos' ); ?></span>
					<?php
					$new_columns[ 'ddwcpos_order_type' ] = ob_get_clean();
				}

				$new_columns[ $key ] = $value;
			}
			return $new_columns;
		}

		/**
		 * Add custom WooCommerce orders column content function
		 *
		 * @param array $column
		 * @param int $order_id
		 * @return string
		 */
		public function ddwcpos_add_custom_woocommerce_orders_column_content( $column, $order_id ) {
			$the_order = wc_get_order( $order_id );

			if ( ! $the_order ) {
				return;
			}

			if ( 'ddwcpos_order_type' === $column ) {
				$outlet_id = $the_order->get_meta( '_ddwcpos_outlet_id', true );

				if ( ! empty( $outlet_id ) ) {
					/* translators: %1$s opening span tag %2$s closing span tag */
					$order_type = sprintf( _x( '%1$sPOS%2$s', 'POS Order Icon', 'ddwc-multipos' ), '<span class="order-type-pos tips" data-tip="', '"><span>');
				} else {
					/* translators: %1$s opening span tag %2$s closing span tag */
					$order_type = sprintf( _x( '%1$sWebsite%2$s', 'Website Order Icon', 'ddwc-multipos' ), '<span class="order-type-checkout tips" data-tip="', '"><span>');
				}

				echo wp_kses_post( $order_type );
			}
		}
	}
}
