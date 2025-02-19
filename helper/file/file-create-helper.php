<?php
/**
 * File Create Helper class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 */

namespace DDWCMultiPOS\Helper\File;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_File_Create_Helper' ) ) {
	/**
	 * File Create Helper class
	 */
	class DDWCPOS_File_Create_Helper {
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
		 * Write service worker function
		 *
		 * @return void
		 */
		public function ddwcpos_write_service_worker() {
			$form_url = 'admin.php?page=ddwcpos-configuration';

			$service_worker_data = '"use strict";
            var staticCache = "ddwcpos-static-v1";

            var cacheFiles = [];

            // add scope for /blog and /article so that it can skip /customer scope
            self.addEventListener("install", event => {
                console.log("[ServiceWorker] Install");

                event.waitUntil(
                    caches.open(staticCache).then(cache => {
                        return cache.addAll(cacheFiles);
                    }).then( () => {
                        self.skipWaiting();
                    })
                );
            });

            self.addEventListener("activate", e => {
                console.log("[ServiceWorker] Activate");

                e.waitUntil(
                    // Get all the cache keys (keyList)
                    caches.keys().then( keyList => {
                        return Promise.all(keyList.map( key => {
                            // If a cached item is saved under a previous cacheName
                            if (key !== staticCache) {
                                // Delete that cached file
                                console.log("[ServiceWorker] Removing old cache", key);

                                return caches.delete(key);
                            }
                        }));
                    })
                ); // end e.waitUntil

                return self.clients.claim();
            });

            self.addEventListener("fetch", event => {
                if (event.request.method != "GET" || !(event.request.url.indexOf("http") === 0))
                    return;

                if ( event.request.mode === "navigate" || event.request.method === "GET" ) {
                    let _newUrl = event.request.url;

                    if ( event.request.referrer != "" && !skipIfThese( _newUrl, event.request.referrer ) )
                        return;

                    event.respondWith(getCacheData(event.request, staticCache));
                }
            });

            const skipIfThese = (requestUrl, currentUrl) => {
                const posEndpoint = "' . $this->ddwcpos_configuration[ 'endpoint' ] . '";
                if ( currentUrl.includes( `/${posEndpoint}` ) ) {
                    let _pathStr = requestUrl.split("/");
                    if ( _pathStr.indexOf( posEndpoint ) > 0 || _pathStr.indexOf("uploads") > 0 ) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            }

            const getCacheData = (request, cacheName) => {
                var storageUrl = request.url;

                var checkResponse = navigator.onLine;

                return caches.open(cacheName).then( cache => {
                    if (checkResponse == true) {
                        return fetch(request).then( networkResponse => {
                            if (networkResponse.ok == true) {
                                cache.put(storageUrl, networkResponse.clone());
                            }

                            return networkResponse;
                        }).catch( error => {
                            return cache.match(storageUrl).then( response => {
                                if (response)
                                    return formFilter(response);
                                else
                                    return fallBackResponse("live");
                            });
                        });
                    } else {
                        return cache.match(storageUrl).then( response => {
                            if (response) {
                                return response;
                            } else {
                                return fetch(request).then( networkResponse => {
                                    if (networkResponse.ok == true) {
                                        cache.put(storageUrl, networkResponse.clone());
                                    }

                                    return networkResponse;
                                }).catch( error => {
                                    return fallBackResponse("css");
                                });
                            }
                        });
                    }
                });
            }

            const fallBackResponse = type => {
                switch (type) {
                    case "post":
                        var headers = {
                            "Cache-Control" : "no-cache",
                            "Connection"    : "Keep-Alive",
                            "Content-Length": "7960",
                            "Content-Type"  : "application/json"
                        }

                        var body = {
                            success: "You are offline right now, we stored your data and will sync it as soon as you will get online."
                        };

                        return new Response(JSON.stringify(body), { "headers": headers });

                    case "live":
                        var headers = {
                            "Cache-Control" : "no-cache",
                            "Connection"    : "Keep-Alive",
                            "Content-Length": "7960",
                            "Content-Type"  : "text/html"
                        }

                        var body = {
                            offline: true
                        };

                        return new Response(body, { "headers": headers });

                    case "css":

                    default:
                        var headers = {
                            "Cache-Control": "no-cache",
                            "Connection": "Keep-Alive",
                            "Content-Length": "7960",
                            "Content-Type": "application/json"
                        }

                        var body = {};

                        return new Response(JSON.stringify(body), { "headers": headers });
                }
            }

            const formFilter = response => {
                var headers = {
                    "Cache-Control"   : "no-cache",
                    "Connection"      : "Keep-Alive",
                    "Content-Encoding": "gzip",
                    "Content-Length"  : "7960",
                    "Content-Type"    : "text/html; charset=UTF-8"
                }

                return response.text().then(body => new Response(body, { "headers": headers }));
            }';

			$this->ddwcpos_write_file( $form_url, $service_worker_data, 'ddwcpos-service-worker.js' );
		}

		/**
		 * Generate new manifest function
		 *
		 * @return void
		 */
		public function ddwcpos_generate_new_manifest_file() {
			$form_url   = 'admin.php?page=ddwcpos-configuration';
			$icons_path = DDWCPOS_PLUGIN_URL . 'assets/images/';

			$icon48  = $this->ddwcpos_configuration[ 'pwa_icon48' ];
			$icon96  = $this->ddwcpos_configuration[ 'pwa_icon96' ];
			$icon144 = $this->ddwcpos_configuration[ 'pwa_icon144' ];
			$icon196 = $this->ddwcpos_configuration[ 'pwa_icon196' ];
			$icon512 = $this->ddwcpos_configuration[ 'pwa_icon512' ];

			$icon48  = ! empty( $icon48 ) ? wp_get_attachment_url( $icon48 ) : $icons_path . 'pwa48.png';
			$icon96  = ! empty( $icon96 ) ? wp_get_attachment_url( $icon96 ) : $icons_path . 'pwa96.png';
			$icon144 = ! empty( $icon144 ) ? wp_get_attachment_url( $icon144 ) : $icons_path . 'pwa144.png';
			$icon196 = ! empty( $icon196 ) ? wp_get_attachment_url( $icon196 ) : $icons_path . 'pwa196.png';
			$icon512 = ! empty( $icon512 ) ? wp_get_attachment_url( $icon512 ) : $icons_path . 'pwa512.png';

			$manifest_data = '{
                "name"            : "' . $this->ddwcpos_configuration[ 'pwa_name' ] . '",
                "short_name"      : "' . $this->ddwcpos_configuration[ 'pwa_short_name' ] . '",
                "start_url"       : "' . $this->ddwcpos_configuration[ 'endpoint' ] . '",
                "description"     : "' . $this->ddwcpos_configuration[ 'pwa_description' ] . '",
                "display"         : "standalone",
                "orientation"     : "portrait-primary",
                "theme_color"     : "' . $this->ddwcpos_configuration[ 'pwa_theme_color' ] . '",
                "background_color": "' . $this->ddwcpos_configuration[ 'pwa_background_color' ] . '",
                "icons"           : [
                    {
                        "src": "' . $icon48 . '",
                        "sizes": "48x48",
                        "type": "image/png"
                    },
                    {
                        "src": "' . $icon96 . '",
                        "sizes": "96x96",
                        "type": "image/png"
                    },
                    {
                        "src": "' . $icon144 . '",
                        "sizes": "144x144",
                        "type": "image/png"
                    },
                    {
                        "src": "' . $icon196 . '",
                        "sizes": "196x196",
                        "type": "image/png"
                    },
                    {
                        "src": "' . $icon512 . '",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any maskable"
                    }
                ]
            }';

			$this->ddwcpos_write_file( $form_url, $manifest_data, 'ddwcpos-manifest.json' );
		}

		/**
		 * Write file function
		 *
		 * @param string $form_url
		 * @param string $file_content
		 * @param string $filename
		 * @return Write file
		 */
		public function ddwcpos_write_file( $form_url, $file_content, $filename ) {
			global $wp_filesystem;

			$method  = '';
			$context = ABSPATH;

			if ( ! $this->ddwcpos_file_init( $form_url, $method, ABSPATH ) ) {
				return false;
			}

			$target_dir  = $wp_filesystem->find_folder( $context );
			$target_file = trailingslashit( $target_dir ) . $filename;

			require_once( ABSPATH . 'wp-admin/includes/file.php' );

			if ( ! $wp_filesystem->put_contents( $target_file, $file_content, FS_CHMOD_FILE ) ) {
				return new \WP_Error( 'writing_error', esc_html__( 'Error when writing file', 'ddwc-multipos' ) );
			}

			return $file_content;
		}

		/**
		 * File init function
		 *
		 * @param string $form_url
		 * @param string $method
		 * @param string $context
		 * @param string $fields
		 * @return bool
		 */
		public function ddwcpos_file_init( $form_url, $method, $context, $fields = null ) {
			include_once ABSPATH . 'wp-admin/includes/file.php';

			if ( false === ( $creds = request_filesystem_credentials( $form_url, $method, false, $context, $fields ) ) ) {
				return false;
			}

			if ( ! WP_Filesystem( $creds ) ) {
				request_filesystem_credentials( $form_url, $method, true, $context, $fields );
				return false;
			}

			return true;
		}
	}
}
