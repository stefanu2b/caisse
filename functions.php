<?php
/**
 * Plugin Name: MultiPOS - POS by NUMERICU
 * Description: <code><strong>MultiPOS - POS by NUMERICU</strong></code> permet aux propriétaires de boutiques de vendre des produits en ligne ainsi que dans leurs magasins physiques. Il peut synchroniser votre boutique en ligne avec le point de vente, en incluant les commandes, les clients et les fiches produits, et vice versa.
 * Plugin URI: https://numericu.com
 * Author: NUMERICU
 * Author URI: https://numericu.com
 * Version: 5.1.0
 * Text Domain: ddwc-multipos
 * Domain Path: /i18n
 * WC requires at least: 5.0.0
 * WC tested up to: 8.8.x
 * WP requires at least: 5.0.0
 * WP tested up to: 6.5.x
 * Requires Plugins: woocommerce
 *
 * @package MultiPOS - POS by NUMERICU
 */

use DDWCMultiPOS\Includes\DDWCPOS_File_Handler;

defined( 'ABSPATH' ) || exit();

// Define Constants.
defined( 'DDWCPOS_PLUGIN_FILE' ) || define( 'DDWCPOS_PLUGIN_FILE', plugin_dir_path( __FILE__ ) );
defined( 'DDWCPOS_PLUGIN_URL' ) || define( 'DDWCPOS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
defined( 'DDWCPOS_SCRIPT_VERSION' ) || define( 'DDWCPOS_SCRIPT_VERSION', '1.3.9' );

if ( ! class_exists( 'DDWCPOS_Init' ) ) {
	/**
	 * Init class
	 */
	class DDWCPOS_Init {
		/**
		 * Class constructor
		 */
		public function __construct() {
			add_action( 'plugins_loaded', [ $this, 'ddwcpos_loaded' ] );
			add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), [ $this, 'ddwcpos_plugin_settings_link' ] );
		}

		/**
		 * Plugin loaded function
		 *
		 * @return void
		 */
		public function ddwcpos_loaded() {
			load_plugin_textdomain( 'ddwc-multipos', false, basename( dirname( __FILE__ ) ) . '/i18n' );

			if ( ! class_exists( 'WooCommerce' ) ) {
				add_action( 'admin_notices', function () {
					?>
					<div class="error">
						<p>
							<?php
							/* translators: %1$s for a opening tag and %2$s for a closing tag */
							echo sprintf( esc_html__( 'MultiPOS - Point of Sale for WooCommerce is activated but not effective. It requires %1$sWooCommerce Plugin%2$s in order to use its functionalities.', 'ddwc-multipos' ), '<a href="' . esc_url( '//wordpress.org/plugins/woocommerce/' ) . '" target="_blank">', '</a>' );
							?>
						</p>
					</div>
					<?php
				} );
			} else {
				// For HPOS Compatibility
				add_action( 'before_woocommerce_init', function() {
					if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
						\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', __FILE__, true );
					}
				} );

				require_once DDWCPOS_PLUGIN_FILE . 'autoload/autoload.php';
				new DDWCPOS_File_Handler();
			}
		}

		/**
		 * Plugin settings link
		 *
		 * @param array $links Links Array.
		 * @return array $links
		 */
		public function ddwcpos_plugin_settings_link( $links ) {
			ob_start();
			?>
			<a href="<?php echo esc_url( admin_url( 'admin.php?page=ddwcpos-configuration' ) ); ?>"><?php esc_html_e( 'Configuration', 'ddwc-multipos' ); ?></a>
			<?php
			array_unshift( $links, ob_get_clean() );
			return $links;
		}
	}
}

new DDWCPOS_Init();

require_once DDWCPOS_PLUGIN_FILE . 'includes/install.php';
register_activation_hook( __FILE__, [ 'DDWCPOS_Install', 'ddwcpos_create_schema' ] );