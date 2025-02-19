<?php
/**
 * Invoice Helper class
 *
 * @package MultiPOS - Point of Sale for WooCommerce
 */

namespace DDWCMultiPOS\Helper\Invoice;

defined( 'ABSPATH' ) || exit();

if ( ! class_exists( 'DDWCPOS_Invoice_Helper' ) ) {
    /**
     * Invoice Helper class
     */
    class DDWCPOS_Invoice_Helper {

		/**
         * Configuration Variable
         * 
         * @var array
         */
        protected $ddwcpos_configuration;

		/**
		 * Construct
		 * 
		 * @param array $ddwcpos_configuration
		 */
		public function __construct( $ddwcpos_configuration ) {
            $this->ddwcpos_configuration = $ddwcpos_configuration;
		}

		/**
		 * Get invoice html function
		 *
		 * @return void
		 */
        public function ddwcpos_get_invoice_html() {
            $logo_url = ! empty( $this->ddwcpos_configuration[ 'logo' ] ) ? wp_get_attachment_url( $this->ddwcpos_configuration[ 'logo' ] ) : DDWCPOS_PLUGIN_URL . 'assets/images/logo.png';
            return (
                '<div class="ddwcpos-invoice-container">
                    <div class="invoice-header">
                        <img src="' . esc_url( $logo_url ) . '" />

                        <hr />
                        <h3>SALES RECEIPT</h3>
                        <hr />
                    </div>

                    <div class="invoice-details">
                        <p><strong>Order:</strong> ${order_id}</p>
                        <p><strong>Date:</strong> ${order_date}</p>
                        <p><strong>Cashier:</strong> ${cashier_name}</p>
                        <p><strong>Customer:</strong> ${customer_fname} ${customer_lname}</p>
                        ${applyFilters( INVOICE_ADD_DETAILS_AFTER_CUSTOMER_NAME_FILTER, "", order, currentState )}
                    </div>

                    <div class="product-details">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Unit Price</th>
                                    <th>Quantity</th>
                                    <th>Total Price</th>
                                </tr>
                            </thead>
                        </table>
                        ${product_row}

                        <h3 style="text-align: center; margin: 12px 0 5px;">${total_quantity} Item(s) Sold</h3>

                        <hr />

                        <div class="invoice-details">
                            <div class="left-details">
                                <p style="font-weight: 600;">Sub Total</p>
                            </div>
                            <div class="right-details">
                                <p style="font-weight: 600;">${sub_total}</p>
                            </div>
                        </div>
                        <hr />
                        <div class="invoice-details">
                            <div class="left-details">
                                <p>${tax_label}</p>
                                <p>Discount</p>
                                ${coupon_name}
                            </div>
                            <div class="right-details">
                                <p>${order_tax}</p>
                                <p>${order_discount}</p>
                                ${coupon_amount}
                            </div>
                        </div>
                        ${applyFilters( INVOICE_ADD_DETAILS_BEFORE_TOTAL_FILTER, "", order, currentState )}
                        <hr />
                        <div class="invoice-details">
                            <div class="left-details">
                                <p style="font-size: 22px; font-weight: 600;">Total</p>
                                <p>Refunded</p>
                                ${tendered_payment_name}
                            </div>
                            <div class="right-details">
                                <p style="font-size: 21px; font-weight: 600;">${order_total}</p>
                                <p>${order_refunded}</p>
                                ${tendered_payment_amount}
                            </div>
                        </div>
                        <hr />
                        <div class="invoice-details">
                            <div class="left-details">
                                <p>Total Tendered</p>
                                <p>Change</p>
                            </div>
                            <div class="right-details">
                                <p>${tendered_total}</p>
                                <p>${order_change}</p>
                            </div>
                        </div>
                        ${applyFilters( INVOICE_ADD_DETAILS_AFTER_CHANGE_FILTER, "", order, currentState )}
                        <hr />
                    </div>

                    <div class="invoice-footer">
                        <p style="margin: 10px 0; text-align: center;">THANK YOU, HAVE A NICE DAY.</p>
                        <h3 style="text-align: center;">${outlet_name}</h3>
                        <p>${outlet_address1} ${outlet_address2}</p>
                        <p>${outlet_city} ${outlet_state}</p>
                        <p><strong>Phone:</strong> ${outlet_phone}</p>
                        <p><strong>Email:</strong> ${outlet_email}</p>
                    </div>
                </div>'
            );
        }

		/**
		 * Get invoice css function
		 *
		 * @return string
		 */
		public function ddwcpos_get_invoice_css() {
            return str_replace( '                ', '', '
                @font-face {
                    font-family: "OpenSans";
                    font-style: normal;
                    src: url(' . esc_url( DDWCPOS_PLUGIN_URL . 'assets/fonts/OpenSans-Regular.ttf' ) . ') format("truetype");
                }
                .ddwcpos-invoice-container {
                    padding: 10px;
                    border-radius: 2px;
                    font-family: "OpenSans", sans-serif;
                    word-break: break-word;
                }
                .ddwcpos-invoice-container * {
                    padding: 0;
                    margin: 0;
                }
                p {
                    line-height: 1.5;
                }
                .invoice-header, .invoice-footer {
                    text-align: center;
                }
                .invoice-header h3 {
                    margin: 10px 0;
                    text-align: center;
                }
                .invoice-header img {
                    width: 50px;
                    width: auto;
                    margin: 10px 0;
                }
                .invoice-details {
                    width: 100%;
                    display: inline-block;
                    padding: 8px 0;
                }
                .left-details, .right-details {
                    width: 50%;
                }
                .invoice-details .left-details {
                    float: left;
                }
                .invoice-details .right-details {
                    float: right;
                    text-align: right;
                }
                .product-details table {
                    border-collapse: collapse;
                    width: 100%;
                    text-align: center;
                }
                .product-details table thead th {
                    padding: 12px 0;
                }
                .product-details table tr th:nth-child(1), .product-details table tr td:nth-child(1) {
                    text-align: left;
                }
                .product-details table tr th:nth-child(4), .product-details table tr td:nth-child(4) {
                    text-align: right;
                }
                .product-details table th, .product-details table td {
                    padding: 3px 0;
                }
                .product-details table th:first-child,
                .product-details table td:first-child {
                    width: 35%;
                }
                .product-details table th, .product-details table td p {
                    padding: 3px 0;
                }
                .product-details table thead {
                    border-style: dashed;
                    border-width: 3px 0 3px;
                    border-color: #ddd;
                }
                hr {
                    margin: 0 auto;
                    border-style: dashed;
                    border-width: 3px 0;
                    border-top-color: #ddd;
                    border-bottom-color: #fafafa;
                    clear: both;
                }'
            );
        }
    }
}