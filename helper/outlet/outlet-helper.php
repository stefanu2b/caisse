<?php
/**
 * Outlet Helper class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 */

namespace DDWCMultiPOS\Helper\Outlet;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_Outlet_Helper' ) ) {
    /**
     * Outlet Helper class
     */
    class DDWCPOS_Outlet_Helper {
        /**
		 * Database Object
		 *
		 * @var object
		 */
        protected $wpdb;

		/**
		 * Outlet table Variable
		 *
		 * @var string
		 */
		protected $outlet_table;

		/**
		 * Outlet Meta table Variable
		 *
		 * @var string
		 */
		protected $outletmeta_table;

		/**
		 * Construct
		 */
		public function __construct() {
			global $wpdb;
            $this->wpdb             = $wpdb;
            $this->outlet_table     = $this->wpdb->prefix . 'ddwcpos_outlets';
            $this->outletmeta_table = $this->wpdb->prefix . 'ddwcpos_outletmeta';
		}

        /**
		 * Save outlet to DB function
		 *
		 * @param array $data
		 * @return int
		 */
		public function ddwcpos_save_outlet( $data ) {
			$default_data = [
                'name'           => '',
                'mode'           => '',
                'inventory_type' => '',
                'address1'       => '',
                'address2'       => '',
                'city'           => '',
                'state'          => '',
                'country'        => '',
                'postcode'       => '',
                'phone'          => '',
                'email'          => '',
                'payments'       => '',
                'invoice'        => '',
                'tables'         => '',
                'status'         => '',
                'created'        => current_time( 'Y-m-d H:i:s' ),
                'updated'        => current_time( 'Y-m-d H:i:s' ),
			];

			$data = wp_parse_args( $data, $default_data );

            if ( ! empty( $data[ 'id' ] ) ) {
                $outlet_id = $data[ 'id' ];
                unset( $data[ 'id' ] );
                unset( $data[ 'created' ] );
                $this->wpdb->update(
                    $this->outlet_table,
                    $data,
                    [ 'id' => $outlet_id ],
                    [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ],
                    [ '%d' ]
                );
            } else {
				unset( $data[ 'id' ] );

                $this->wpdb->insert(
                    $this->outlet_table,
                    $data,
                    [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%s' ]
                );

				$outlet_id = $this->wpdb->insert_id;
            }

            return $outlet_id;
		}

        /**
		 * Get all outlets function
		 *
		 * @param int $per_page
		 * @param int $offset
		 * @param string $search
		 * @return array
		 */
		public function ddwcpos_get_all_outlets( $per_page, $offset, $search ) {
			$data = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT * FROM $this->outlet_table WHERE name LIKE %s ORDER BY id DESC LIMIT %d OFFSET %d", '%' . $search . '%', $per_page, $offset ), ARRAY_A );

			return apply_filters( 'ddwcpos_modify_outlets_data', $data, $per_page, $offset, $search );
		}

        /**
		 * Get all outlets count function
		 *
		 * @param string $search
		 * @return int|null
		 */
		public function ddwcpos_get_all_outlets_count( $search ) {
			$data = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT count(id) FROM $this->outlet_table WHERE name LIKE %s", '%' . $search . '%' ), ARRAY_A );

			return apply_filters( 'ddwcpos_modify_outlets_count_data', $data, $search );
		}

		/**
		 * Get outlet details by ids function
		 *
		 * @param array $ids
		 * @return array
		 */
        public function ddwcpos_get_outlet_details_by_ids( $ids ) {
			$in_str_arr = array_fill( 0, count( $ids ), '%d' );
			$in_str = join( ',', $in_str_arr );

            $data = $this->wpdb->get_results( $this->wpdb->prepare( "SELECT * FROM $this->outlet_table WHERE id IN ($in_str) AND status='enabled'", $ids ), ARRAY_A );

			return apply_filters( 'ddwcpos_modify_outlets_data', $data, $ids );
        }

        /**
		 * Get outlet details by id function
		 *
		 * @param int $id
		 * @return array
		 */
        public function ddwcpos_get_outlet_details_by_id( $id ) {
            $data = $this->wpdb->get_row( $this->wpdb->prepare( "SELECT * FROM $this->outlet_table WHERE id=%d", $id ), ARRAY_A );

			return apply_filters( 'ddwcpos_modify_outlets_data', $data, $id );
        }

        /**
		 * Delete outlet function
		 * 
		 * @param int $id
		 * @return int|boolean
		 */
        public function ddwcpos_delete_outlet( $id ) {
			$this->wpdb->delete(
				$this->outletmeta_table,
				[
					'outlet_id'  => $id,
				],
				[ '%d' ]
			);

            return $this->wpdb->delete(
				$this->outlet_table,
				[
					'id' => $id
				],
                [ '%d' ]
            );
        }

		/**
		 * Update Outlet Meta function
		 *
		 * @param int $outlet_id
		 * @param string $meta_key
		 * @param string $meta_value
		 * @return void
		 */
		public function ddwcpos_update_outlet_meta( $outlet_id, $meta_key, $meta_value ) {
			$meta_value = is_array( $meta_value ) ? maybe_serialize( $meta_value ) : $meta_value;

			$meta_id = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT id FROM $this->outletmeta_table WHERE outlet_id=%d AND meta_key=%s", $outlet_id, $meta_key ) );

			if ( ! empty( $meta_id ) ) {
				$this->wpdb->update(
					$this->outletmeta_table,
					[
						'meta_value' => $meta_value,
					],
					[
						'id' => $meta_id,
					],
					[ '%s' ],
					[ '%d' ]
				);
			} else {
				$this->wpdb->insert(
					$this->outletmeta_table,
					[
						'outlet_id'  => $outlet_id,
						'meta_key'   => $meta_key,
						'meta_value' => $meta_value,
					],
					[ '%d', '%s', '%s' ]
				);
			}
		}

		/**
		 * Get Outlet Meta function
		 *
		 * @param int $outlet_id
		 * @param string $meta_key
		 * @param boolean $meta_value_single
		 * @return string|array
		 */
		public function ddwcpos_get_outlet_meta( $outlet_id, $meta_key, $meta_value_single = false ) {
			$meta_value = maybe_unserialize( $this->wpdb->get_var( $this->wpdb->prepare( "SELECT meta_value FROM $this->outletmeta_table WHERE outlet_id=%d AND meta_key=%s", $outlet_id, $meta_key ) ) );

			return $meta_value_single ? $meta_value : [ $meta_value ];
		}

		/**
		 * Delete Outlet Meta function
		 *
		 * @param int $outlet_id
		 * @param string $meta_key
		 * @param string $meta_value
		 * @return boolean
		 */
		public function ddwcpos_delete_outlet_meta( $outlet_id, $meta_key, $meta_value = '' ) {
			if ( $meta_value ) {
				return $this->wpdb->delete(
					$this->outletmeta_table,
					[
						'outlet_id'  => $outlet_id,
						'meta_key'   => $meta_key,
						'meta_value' => $meta_value,
					],
					[ '%d', '%s', '%s' ]
				);
			} else {
				return $this->wpdb->delete(
					$this->outletmeta_table,
					[
						'outlet_id' => $outlet_id,
						'meta_key'  => $meta_key,
					],
					[ '%d', '%s' ]
				);
			}
		}

		/**
		 * Get outlet modes function
		 *
		 * @return array
		 */
		public function ddwcpos_get_outlet_modes() {
			return apply_filters( 'ddwcpos_modify_outlet_modes', [
				'grocery'    => esc_html__( 'Grocery/Retail', 'ddwc-multipos' ),
				'restaurant' => esc_html__( 'Restaurant/Cafe', 'ddwc-multipos' ),
			] );
		}

		/**
		 * Get inventory type function
		 *
		 * @param int $id
		 * @return string
		 */
		public function ddwcpos_get_inventory_type( $id ) {
			global $ddwcpos_configuration;

			$inventory_type = $this->wpdb->get_var( $this->wpdb->prepare( "SELECT inventory_type FROM $this->outlet_table WHERE id=%d", $id ) );

			if ( empty( $inventory_type ) ) {
				$inventory_type = $ddwcpos_configuration[ 'inventory_type' ];
			}

			return apply_filters( 'ddwcpos_modify_outlet_inventory_type', $inventory_type, $id );
		}
    }
}