<?php
/**
 * API Get Countries & states class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 * @version 1.0.0
 */

namespace DDWCMultiPOS\Api\Includes\Misc;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_API_Get_Countries_States' ) ) {
	/**
     * API Get Countries & states class
     */
	class DDWCPOS_API_Get_Countries_States {
		/**
		 * Base Name
		 *
		 * @var string $base the route base
		 */
		public $base = 'get-countries-states';

		/**
		 * API Callback.
		 * 
		 * @param array $request
		 * @return array
		 */
		public function ddwcpos_get_data( $request ) {
			try {
				$countries_obj = new \WC_Countries();

				$response = [
					'countries'    => $countries_obj->__get( 'countries' ),
					'base_country' => $countries_obj->get_base_country(),
					'states'       => $countries_obj->get_states(),
				];

				return apply_filters( 'ddwcpos_modify_api_countries_response', $response, $request );
			} catch ( \Exception $e ) {
                return new \WP_Error( 'data_error', $e->getMessage() );
			}
		}

	}
}
