(self["webpackChunkdd_woocommerce_multipos"] = self["webpackChunkdd_woocommerce_multipos"] || []).push([["src_pos_components_tabs_home_home_jsx"],{

/***/ "./src/pos/actions/categories/index.js":
/*!*********************************************!*\
  !*** ./src/pos/actions/categories/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CATEGORIES": () => (/* binding */ CATEGORIES),
/* harmony export */   "setCategories": () => (/* binding */ setCategories),
/* harmony export */   "getCategories": () => (/* binding */ getCategories)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-notifications-component */ "./node_modules/react-notifications-component/dist/index.js");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_notifications_component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../database */ "./src/pos/database.js");
/* harmony import */ var _fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../fetch */ "./src/pos/fetch.js");




var CATEGORIES = 'CATEGORIES';
var setCategories = function setCategories(categories) {
  return {
    type: CATEGORIES,
    categories: categories
  };
};
var getCategories = function getCategories(outletId) {
  return function (dispatch) {
    LoadCategoresFromIndexDB().then(function (res) {
      if (res && res.length) {
        dispatch(setCategories(res));
      } else {
        react_notifications_component__WEBPACK_IMPORTED_MODULE_1__.store.addNotification({
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading Categories', 'ddwc-multipos'),
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Loading Categories in the POS', 'ddwc-multipos'),
          type: 'info',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 3000,
            pauseOnHover: true
          }
        });
        var postData = {
          outlet_id: parseInt(outletId)
        };
        (0,_fetch__WEBPACK_IMPORTED_MODULE_3__.postRequest)(ddwcposPOSObj.API.GET_CATEGORIES_ENDPOINT, postData).then(function (response) {
          _database__WEBPACK_IMPORTED_MODULE_2__.default.table('categories').bulkPut(response).then(function (result) {
            getCategoresFromIndexDB().then(function (dbres) {
              dispatch(setCategories(dbres));
              react_notifications_component__WEBPACK_IMPORTED_MODULE_1__.store.addNotification({
                title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Categories Loaded', 'ddwc-multipos'),
                message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('All Categories are loaded successfully', 'ddwc-multipos'),
                type: 'success',
                insert: 'top',
                container: 'top-right',
                dismiss: {
                  duration: 3000,
                  pauseOnHover: true
                }
              });
            });
          });
        });
      }
    });
  };
};

var getCategoresFromIndexDB = function getCategoresFromIndexDB() {
  return _database__WEBPACK_IMPORTED_MODULE_2__.default.table('categories').toArray();
};

var LoadCategoresFromIndexDB = function LoadCategoresFromIndexDB() {
  return getCategoresFromIndexDB().then(function (data) {
    return data ? data : false;
  });
};

/***/ }),

/***/ "./src/pos/components/tabs/home/home.jsx":
/*!***********************************************!*\
  !*** ./src/pos/components/tabs/home/home.jsx ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHANGE_DEFAULT_PRODUCT_SEARCH_WORKFLOW_FILTER": () => (/* binding */ CHANGE_DEFAULT_PRODUCT_SEARCH_WORKFLOW_FILTER),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var react_lazyload__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-lazyload */ "./node_modules/react-lazyload/lib/index.js");
/* harmony import */ var react_window__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! react-window */ "./node_modules/react-window/dist/index.esm.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/DatabaseOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/AppstoreOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/CheckOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/RightOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/SearchOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/BarcodeOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/PlusOutlined.js");
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/WarningFilled.js");
/* harmony import */ var _actions_products_index__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../../actions/products/index */ "./src/pos/actions/products/index.js");
/* harmony import */ var _actions_categories_index__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../actions/categories/index */ "./src/pos/actions/categories/index.js");
/* harmony import */ var _actions_customers_index__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../actions/customers/index */ "./src/pos/actions/customers/index.js");
/* harmony import */ var _actions_countries_index__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../actions/countries/index */ "./src/pos/actions/countries/index.js");
/* harmony import */ var _product_product_jsx__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./product/product.jsx */ "./src/pos/components/tabs/home/product/product.jsx");
/* harmony import */ var _popup_popup_jsx__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../../popup/popup.jsx */ "./src/pos/components/popup/popup.jsx");
/* harmony import */ var _actions_cart_index__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../../../actions/cart/index */ "./src/pos/actions/cart/index.js");
/* harmony import */ var _actions_orders_index__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../../../actions/orders/index */ "./src/pos/actions/orders/index.js");
/* harmony import */ var _actions_settings_index__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../../../actions/settings/index */ "./src/pos/actions/settings/index.js");
/* harmony import */ var _actions_transactions__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../../../actions/transactions/index */ "./src/pos/actions/transactions/index.js");
/* harmony import */ var _actions_tables_index__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./../../../actions/tables/index */ "./src/pos/actions/tables/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");
/* harmony import */ var _currency_format__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../../../currency-format */ "./src/pos/currency-format.js");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! react-notifications-component */ "./node_modules/react-notifications-component/dist/index.js");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(react_notifications_component__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__);










function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }






















 // const Product = lazy(() => import('./product/product.jsx'));
// const Popup = lazy(() => import('./../../popup/popup.jsx'));




var CHANGE_DEFAULT_PRODUCT_SEARCH_WORKFLOW_FILTER = 'ddwcpos_change_default_product_search_workflow'; // export const CUSTOM_SEARCH_PRODUCT_METHOD_FILTER = 'ddwcpos_custom_search_product_method';

var Home = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__.default)(Home, _Component);

  var _super = _createSuper(Home);

  function Home(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__.default)(this, Home);

    _this = _super.call(this, props);

    _this.toggleVariationGrid = function () {
      var product = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      if (_this.state.showVariationGrid) {
        _this.setState({
          showVariationGrid: false,
          variationGridProduct: {},
          selectedAttributes: {}
        });
      } else {
        _this.setState({
          showVariationGrid: true,
          variationGridProduct: product,
          selectedAttributes: product.attribute_keys ? product.attribute_keys.reduce(function (acc, curr) {
            return acc[curr] = '', acc;
          }, {}) : {}
        });
      }
    };

    _this.handleVariationGridReset = function () {
      _this.setState({
        showVariationGrid: true,
        selectedAttributes: _this.state.variationGridProduct.attribute_keys ? _this.state.variationGridProduct.attribute_keys.reduce(function (acc, curr) {
          return acc[curr] = '', acc;
        }, {}) : {}
      });
    };

    _this.handleToggleShowWeightPopup = function () {
      _this.setState({
        showWeightPopup: !_this.state.showWeightPopup
      });
    };

    _this.handleWeightInput = function (e) {
      e.stopPropagation();

      if (e.which == 13 && e.target.value) {
        _this.handleWeightSubmit();
      } else {
        _this.setState({
          weightInput: e.target.value
        });
      }
    };

    _this.handleWeightSubmit = function () {
      if (_this.state.weightInput) {
        _this.handleToggleShowWeightPopup();

        _this.props.addToCart(_this.state.weightProduct.variation_id ? _this.state.weightProduct.variation_id : _this.state.weightProduct.product_id, 1, false, _this.state.weightInput);
      } else {
        react_notifications_component__WEBPACK_IMPORTED_MODULE_26__.store.addNotification({
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Error', 'ddwc-multipos'),
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter valid weight.', 'ddwc-multipos'),
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 3000,
            pauseOnHover: true
          }
        });
      }
    };

    _this.renderWeightPopup = function (product) {
      if (_this.state.showWeightPopup) {
        var popupContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter weight for the purchase.', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('%s (%s %s) = %s', 'ddwc-multipos'), product.title, product.weight, ddwcposPOSObj.weight_unit, (0,_currency_format__WEBPACK_IMPORTED_MODULE_25__.ddwcposPrice)(product.sale_price))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
          type: "number",
          min: "0.01",
          step: "0.01",
          onKeyUp: function onKeyUp(e) {
            return _this.handleWeightInput(e);
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter Weight', 'ddwc-multipos'),
          autoFocus: true
        }));
        var variationPopupProps = {
          handleOverlay: _this.handleToggleShowWeightPopup,
          popupContent: popupContent,
          notDisabled: _this.state.weightInput,
          handleSuccess: function handleSuccess(e) {
            return _this.handleWeightSubmit(_this.state.weightInput, product);
          },
          handleCancel: _this.handleToggleShowWeightPopup
        };
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_popup_popup_jsx__WEBPACK_IMPORTED_MODULE_18__.default, variationPopupProps);
      } else {
        return null;
      }
    };

    _this.handleProductSearch = function (e) {
      _this.setState({
        search: e.target.value
      });

      if ((0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)(CHANGE_DEFAULT_PRODUCT_SEARCH_WORKFLOW_FILTER, true, e, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.default)(_this))) {
        _this.props.LoadSearchedProducts(e.target.value.toLowerCase(), _this.props.products);
      }
    };

    _this.handleToggleShowAllCategories = function () {
      _this.setState({
        showAllCategoriesPopup: !_this.state.showAllCategoriesPopup
      });
    };

    _this.handleHideAllCategoriesPopup = function () {
      if (_this.state.showAllCategoriesPopup) {
        _this.setState({
          showAllCategoriesPopup: false
        });
      }
    };

    _this.handleToggleBarcodePopup = function () {
      _this.setState({
        showBarcodePopup: !_this.state.showBarcodePopup
      });
    };

    _this.handleToggleCustomProductPopup = function () {
      _this.setState({
        showCustomProductPopup: !_this.state.showCustomProductPopup
      });
    };

    _this.handleToggleOpenCashDrawerPopup = function () {
      _this.setState({
        showOpenCashDrawerPopup: !_this.state.showOpenCashDrawerPopup
      });
    };

    _this.handleBarcodeInput = function (e) {
      if (e.which == 13) {
        _this.handleAddProductViaBarcode();
      } else {
        _this.setState({
          barcodeValue: e.target.value
        });
      }
    };

    _this.handleOpenCashDrawerAmountInput = function (e) {
      if (e.which == 13) {
        _this.handleOpenCashDrawerAmountSubmit();
      } else {
        _this.setState({
          openCashDrawerAmount: e.target.value
        });
      }
    };

    _this.handleOpenCashDrawerAmountSubmit = function () {
      var args = {
        in: _this.state.openCashDrawerAmount,
        outlet_id: _this.props.outlet.id,
        method: 'opencash',
        reason: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Open Cash Drawer Amount', 'ddwc-multipos')
      };

      _this.props.saveTransaction(args);

      _this.handleToggleOpenCashDrawerPopup();
    };

    _this.handleCustomProductInput = function (e, type) {
      if (e.which == 13 && _this.state.customProductAddEnabled) {
        _this.handleAddCustomProduct();
      } else {
        _this.setState((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)({}, type, e.target.value), function () {
          if (_this.state.customProductName && _this.state.customProductPrice && _this.state.customProductQuantity) {
            _this.setState({
              customProductAddEnabled: true
            });
          } else {
            _this.setState({
              customProductAddEnabled: false
            });
          }
        });
      }
    };

    _this.handleAddProductViaBarcode = function (e) {
      e.preventDefault(); // this.handleToggleBarcodePopup();

      var barcodeValue = _this.state.barcodeValue;

      _this.props.getProductViaBarcode(barcodeValue).then(function (product) {
        if (Object.keys(product).length) {
          if (ddwcposPOSObj.ddwcpos_configuration.unit_price_enabled && product.weight) {
            _this.setState({
              showWeightPopup: true,
              weightProduct: product
            });
          } else {
            _this.props.addToCart(product.product_id, 1);
          }
        } else {
          react_notifications_component__WEBPACK_IMPORTED_MODULE_26__.store.addNotification({
            title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Barcode Error', 'ddwc-multipos'),
            message: sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('No product exists with this barcode "%s".', 'ddwc-multipos'), barcodeValue),
            type: 'danger',
            insert: 'top',
            container: 'top-right',
            dismiss: {
              duration: 3000,
              pauseOnHover: true
            }
          });
        }
      }); // if ( ddwcposPOSObj.ddwcpos_configuration.unit_price_enabled && product.weight ) {
      //     this.setState( {
      //         showWeightPopup: true,
      //         weightProduct  : product,
      //     } );
      // } else {
      //     this.props.getProductViaBarcode(this.state.barcodeValue);
      //     // this.props.addToCart(product.product_id, 1);
      // }


      _this.setState({
        barcodeValue: ''
      });
    };

    _this.handleAddCustomProduct = function () {
      var taxes = _this.props.taxes;
      var customProductPrice = _this.state.customProductPrice;
      var customProductQuantity = parseInt(_this.state.customProductQuantity);
      var product_tax = 0;

      if (ddwcposPOSObj.tax_enabled == 'yes') {
        if (ddwcposPOSObj.tax_display_cart == 'excl') {
          if (ddwcposPOSObj.tax_type == 'yes') {
            var tax_rate = 0;
            taxes.forEach(function (tax) {
              if (tax.rate) {
                tax_rate = tax_rate + tax.rate;
              }
            });
            var real_price = customProductPrice * 100 / (100 + tax_rate);
            product_tax = customProductPrice - real_price;
            customProductPrice = real_price;
          } else {
            taxes.forEach(function (tax) {
              if (tax.rate) {
                product_tax = product_tax + customProductPrice * tax.rate / 100;
              }
            });
          }
        } else {
          if (ddwcposPOSObj.tax_type != 'yes') {
            taxes.forEach(function (tax) {
              if (tax.rate) {
                product_tax = product_tax + customProductPrice * tax.rate / 100;
              }
            });
            customProductPrice = parseFloat(parseFloat(customProductPrice) + parseFloat(product_tax));
            product_tax = 0;
          }
        }
      }

      _this.handleToggleCustomProductPopup();

      var product = {
        title: _this.state.customProductName,
        price: customProductPrice,
        tax: product_tax * customProductQuantity
      };

      _this.props.addToCart(product, customProductQuantity, true);
    };

    _this.handleVariationID = function (attribute_key, attribute_value, product) {
      if (attribute_value) {
        var selectedAttributes = _this.state.selectedAttributes;
        selectedAttributes[attribute_key] = attribute_value;
        var available_variations = product.available_variations;

        _this.setState({
          selectedAttributes: selectedAttributes
        });

        var selectedVariation = available_variations.filter(function (available_variation) {
          return _this.isAttributesMatch(available_variation, selectedAttributes);
        });
        var stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
          className: "outofstock"
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Out of Stock', 'ddwc-multipos'));
        var stateSelectedVariation = {};

        if (selectedVariation.length) {
          stateSelectedVariation = selectedVariation[0];

          if (_this.props.outlet.inventory_type === 'custom') {
            stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
              className: "instock"
            }, sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('In Stock(%s)', 'ddwc-multipos'), selectedVariation[0].stock));
          } else {
            if (selectedVariation[0].stock_status == 'onbackorder') {
              stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                className: "instock"
              }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('On Backorder', 'ddwc-multipos'));
            } else {
              if (selectedVariation[0].stock_quantity > 0) {
                stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                  className: "instock"
                }, sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('In Stock(%s)', 'ddwc-multipos'), selectedVariation[0].stock_quantity));
              } else {
                stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                  className: "instock"
                }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('In Stock', 'ddwc-multipos'));
              }
            }
          }
        }

        _this.setState({
          selectedVariation: stateSelectedVariation,
          variationStockHTML: stockHTML
        });
      } else {
        _this.setState({
          selectedVariation: {},
          variationStockHTML: ''
        });
      }
    };

    _this.isAttributesMatch = function (available_variation, attributes) {
      var variation_attributes = available_variation.attributes;
      var match = true;

      if (available_variation.stock > 0) {
        for (var attr_name in variation_attributes) {
          if (variation_attributes.hasOwnProperty(attr_name)) {
            var val1 = variation_attributes[attr_name];
            var val2 = attributes[attr_name];

            if (val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2) {
              // if ( val1 !== undefined && val2 !== undefined && val1 !== val2 ) {
              match = false;
            }
          }
        }
      } else {
        match = false;
      }

      return match;
    };

    _this.handleAddGridVariation = function (variation, product) {
      if (ddwcposPOSObj.ddwcpos_configuration.unit_price_enabled && variation.weight) {
        _this.setState({
          showWeightPopup: true,
          weightProduct: variation
        });
      } else {
        // this.props.addToCart(product.product_id, 1);
        _this.props.addToCart(variation.variation_id, 1, false, '', _this.state.selectedAttributes);
      }

      _this.toggleVariationGrid();
    };

    _this.state = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_modify_state_in_home_component', {
      cid: '',
      search: '',
      productsLoaded: false,
      categoryProductsLoaded: false,
      showAllCategoriesPopup: false,
      showBarcodePopup: false,
      barcodeValue: '',
      showCustomProductPopup: false,
      showOpenCashDrawerPopup: false,
      openCashDrawerAmount: false,
      customProductName: '',
      customProductPrice: '',
      customProductQuantity: '',
      customProductAddEnabled: false,
      showWeightPopup: false,
      weightInput: '',
      weightProduct: {},
      showVariationGrid: false,
      variationGridProduct: {},
      selectedAttributes: {},
      selectedVariation: {},
      variationStockHTML: ''
    }, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__.default)(_this));
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__.default)(Home, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (this.props.history.action == 'POP') {
        this.setState({
          showOpenCashDrawerPopup: true
        });
      }

      this.props.getCategories(this.props.outlet.id);
      this.props.getProducts(this.props.outlet.id).then(function (res) {
        _this2.setState({
          productsLoaded: true
        });
      });
      this.props.getCustomers(this.props.outlet.id);
      this.props.getTransactions(this.props.outlet.id);
      this.props.getCountriesAndStates(this.props.outlet.id);
      this.props.getTables();
      this.props.getSettings();
      var barcodeString = '';
      window.addEventListener('keypress', function (e) {
        var target = e.target || e.srcElement;

        if (target.tagName.toUpperCase() === 'BODY') {
          if (e.which == 13 && barcodeString) {
            _this2.setState({
              barcodeValue: barcodeString
            }, function () {
              _this2.handleAddProductViaBarcode(e);

              barcodeString = '';
            });
          } else {
            var pressedKey = e.key; // Check if the pressed key is a number or an alphabet (letter)

            var isNumber = /^\d$/.test(pressedKey);
            var isAlphabet = /^[a-zA-Z]$/.test(pressedKey);

            if (isNumber || isAlphabet) {
              barcodeString += pressedKey;
            }
          }
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      var _this3 = this;

      var products = this.props.products.list;
      var cid = this.props.match.params.cid != undefined ? this.props.match.params.cid == 'all' ? 0 : this.props.match.params.cid : 0;

      if (products.length && this.state.productsLoaded && (cid != this.state.cid || !this.state.categoryProductsLoaded)) {
        this.setState({
          cid: cid,
          categoryProductsLoaded: true
        }, function () {
          _this3.props.LoadCategoryProducts(cid, products);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var categories = this.props.categories;
      var mainProducts = this.props.products;
      var haveOpenCashTransaction = this.props.transactions.filter(function (transaction) {
        return transaction.method === 'opencash';
      }).length;
      var searchText = mainProducts.s;
      var categoryText = this.props.match.params.cid != undefined && this.props.match.params.cid > 0 ? this.props.match.params.cid : '';
      var products = [];

      if (searchText) {
        products = mainProducts.sproducts;
      } else if (categoryText) {
        products = mainProducts.cproducts;
      } else {
        products = mainProducts.list;
      }

      products.sort(function (a, b) {
        return a.title > b.title ? 1 : b.title > a.title ? -1 : 0;
      });
      products = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_modify_displaying_products', products, this);
      var element = document.querySelector('.ddwcpos-products-tab-wrapper');
      var cC = 6;
      var sW = element ? element.offsetWidth : 1000;

      if (window.screen.width < 768) {
        sW = window.screen.width;
      }

      var categoryElement = document.querySelector('.ddwcpos-category-wrapper');
      var categoriesCardsLength = categoryElement ? categoryElement.offsetWidth - 10 : 0;
      categoriesCardsLength = Math.floor(categoriesCardsLength / 100);
      var productRowHeight = 134;
      var cW = 260;
      var wH = window.innerWidth;

      if ('image_top' === ddwcposPOSObj.ddwcpos_configuration.product_layout) {
        productRowHeight = 265;
        cW = 150;

        if (wH >= 2300) {
          cC = 9;
          cW = sW / 9.11;
        } else if (wH >= 2100 && wH < 2300) {
          cC = 8;
          cW = sW / 8.11;
        } else if (wH >= 1700 && wH < 2100) {
          cC = 7;
          cW = sW / 7.15;
        } else if (wH >= 1550 && wH < 1700) {
          cC = 6;
          cW = sW / 6.1;
        } else if (wH > 1300 && wH < 1550) {
          cC = 5;
          cW = sW / 5.10;
        } else if (wH > 1024 && wH <= 1300) {
          cC = 4;
          cW = sW / 4;
        } else if (wH > 650 && wH < 1024) {
          productRowHeight = 300;
          cC = 4;
          cW = sW / 4;
        } else if (wH > 440 && wH <= 650) {
          productRowHeight = 300;
          cC = 3;
          cW = sW / 3.09;
        } else {
          productRowHeight = 300; // cC = 3;
          // cW = sW/3.09;

          cC = 2;
          cW = sW / 2.09; // cW = sW/2.09;
        }
      } else {
        if (wH >= 1600) {
          cC = 6;
          cW = sW / 6;
        } else if (wH >= 1550 && wH < 1600) {
          cC = 5;
          cW = sW / 5;
        } else if (wH > 1300 && wH < 1550) {
          cC = 4;
          cW = sW / 4.09;
        } else if (wH > 1024 && wH < 1301) {
          cC = 3;
          cW = sW / 3;
        } else {
          cC = 2;
          cW = sW / 2.07;
        }
      }

      var pA = [];
      var ii = 1;
      var jj = 0;
      var cR;
      products.forEach(function (item, index) {
        cR = cC + 1;

        if (ii % cR == 0) {
          ii = 1;
          jj++;
        }

        if (Array.isArray(pA[jj]) && pA[jj].length) {
          pA[jj].push(item);
        } else {
          pA[jj] = [item];
        }

        ii++;
      });

      var Cell = function Cell(_ref) {
        var columnIndex = _ref.columnIndex,
            rowIndex = _ref.rowIndex,
            style = _ref.style;

        if (undefined != pA[rowIndex][columnIndex]) {
          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
            className: columnIndex % 2 ? rowIndex % 2 === 0 ? 'ddwcpos-grid-item-odd' : 'ddwcpos-grid-item-even' : rowIndex % 2 ? 'ddwcpos-grid-item-odd' : 'ddwcpos-grid-item-even',
            style: style
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react_lazyload__WEBPACK_IMPORTED_MODULE_12__.default, {
            once: true,
            key: columnIndex,
            overflow: true,
            height: 200
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_product_product_jsx__WEBPACK_IMPORTED_MODULE_17__.default, {
            key: columnIndex,
            product: pA[rowIndex][columnIndex],
            outlet: _this4.props.outlet,
            toggleVariationGrid: _this4.toggleVariationGrid,
            notification: _this4.props.notification
          })));
        } else {
          return '';
        }
      };

      var allCategoryClass = 'ddwcpos-category-card';

      if (0 == this.state.cid) {
        allCategoryClass += ' ddwcpos-category-active';
      }

      var categoriesHTML = [];
      var viewAllCategoriesHTML = '';
      var showAllCategoriesPopupHTML = '';

      if (categories.length) {
        categoriesHTML.push((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_28__.Link, {
          key: "all",
          className: allCategoryClass,
          onClick: this.handleHideAllCategoriesPopup,
          to: "".concat(ddwcposPOSObj.siteUrl, "/").concat(ddwcposPOSObj.ddwcpos_configuration.endpoint, "/category/all")
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_29__.default, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('All', 'ddwc-multipos'))));
        var categoriesTempHTML = categories.map(function (val, i) {
          var categoryClass = 'ddwcpos-category-card';

          if (val.id == _this4.state.cid) {
            categoryClass += ' ddwcpos-category-active';
          }

          return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_28__.Link, {
            key: i,
            className: categoryClass,
            onClick: _this4.handleHideAllCategoriesPopup,
            to: "".concat(ddwcposPOSObj.siteUrl, "/").concat(ddwcposPOSObj.ddwcpos_configuration.endpoint, "/category/").concat(val.id)
          }, val.image ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("img", {
            src: val.image,
            alt: val.name,
            width: "24",
            height: "24"
          }) : '', (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", {
            title: val.name
          }, val.name));
        });
        categoriesHTML = categoriesHTML.concat(categoriesTempHTML);

        if (categoriesCardsLength < categoriesHTML.length) {
          viewAllCategoriesHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react_router_dom__WEBPACK_IMPORTED_MODULE_28__.Link, {
            className: "ddwcpos-category-card",
            to: "#",
            onClick: this.handleToggleShowAllCategories
          }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_30__.default, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('View All', 'ddwc-multipos')));

          if (this.state.showAllCategoriesPopup) {
            showAllCategoriesPopupHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
              className: "ddwcpos-popup-overlay",
              onClick: this.handleToggleShowAllCategories
            }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
              className: "ddwcpos-all-categories-popup"
            }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
              className: "ddwcpos-all-categories-popup-content"
            }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('All Categories', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", null, categoriesHTML))));
          }

          categoriesHTML = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(categoriesHTML.slice(0, categoriesCardsLength));
        }
      }

      var barcodePopupHTML = '';

      if (this.state.showBarcodePopup) {
        var popupContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter/Scan Barcode', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("form", {
          onSubmit: function onSubmit(e) {
            return _this4.handleAddProductViaBarcode(e);
          }
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
          type: "text",
          onChange: function onChange(e) {
            return _this4.handleBarcodeInput(e);
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter/Scan Barcode', 'ddwc-multipos'),
          value: this.state.barcodeValue,
          autoFocus: true
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("i", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Press enter after entering barcode to add products.', 'ddwc-multipos')))));
        var barcodePopupProps = {
          handleOverlay: this.handleToggleBarcodePopup,
          popupContent: popupContent,
          notDisabled: true,
          hideCancelButton: true,
          singleButton: true,
          successButtonText: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_31__.default, null), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Done', 'ddwc-multipos')),
          handleSuccess: this.handleToggleBarcodePopup,
          handleCancel: this.handleToggleBarcodePopup
        };
        barcodePopupHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_popup_popup_jsx__WEBPACK_IMPORTED_MODULE_18__.default, barcodePopupProps);
      }

      var customProductPopupHTML = '';

      if (this.state.showCustomProductPopup) {
        var _popupContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Custom Product Details', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
          type: "text",
          onKeyUp: function onKeyUp(e) {
            return _this4.handleCustomProductInput(e, 'customProductName');
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter Product Name', 'ddwc-multipos'),
          autoFocus: true
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
          type: "number",
          min: "0",
          step: "0.01",
          onKeyUp: function onKeyUp(e) {
            return _this4.handleCustomProductInput(e, 'customProductPrice');
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter Price', 'ddwc-multipos')
        }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
          type: "number",
          min: "1",
          onKeyUp: function onKeyUp(e) {
            return _this4.handleCustomProductInput(e, 'customProductQuantity');
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter Quantity', 'ddwc-multipos')
        }));

        var customProductPopupProps = {
          handleOverlay: this.handleToggleCustomProductPopup,
          popupContent: _popupContent,
          notDisabled: this.state.customProductAddEnabled,
          handleSuccess: this.handleAddCustomProduct,
          handleCancel: this.handleToggleCustomProductPopup
        };
        customProductPopupHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_popup_popup_jsx__WEBPACK_IMPORTED_MODULE_18__.default, customProductPopupProps);
      }

      var OpenCashDrawerPopupHTML = '';

      if (ddwcposPOSObj.ddwcpos_configuration.opencash_drawer_enabled && !haveOpenCashTransaction && this.state.showOpenCashDrawerPopup) {
        var _popupContent2 = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Open Cash Drawer Amount', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
          type: "number",
          min: "0",
          step: "0.01",
          onKeyUp: function onKeyUp(e) {
            return _this4.handleOpenCashDrawerAmountInput(e);
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Enter Amount', 'ddwc-multipos'),
          autoFocus: true
        }));

        var OpenCashDrawerPopupProps = {
          handleOverlay: this.handleToggleOpenCashDrawerPopup,
          popupContent: _popupContent2,
          notDisabled: this.state.openCashDrawerAmount,
          handleSuccess: this.handleOpenCashDrawerAmountSubmit,
          handleCancel: this.handleToggleOpenCashDrawerPopup
        };
        OpenCashDrawerPopupHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_popup_popup_jsx__WEBPACK_IMPORTED_MODULE_18__.default, OpenCashDrawerPopupProps);
      }

      var style = {};

      if (!ddwcposPOSObj.ddwcpos_configuration.custom_product_enabled) {
        style.gridTemplateColumns = '60% max-content auto';
      }

      var variationGridHTML = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_custom_variation_grid_html', null, this);

      if (this.state.showVariationGrid && this.state.variationGridProduct && (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_use_default_variation_grid', true, this)) {
        var product = this.state.variationGridProduct;
        var attribute_keys = product.attribute_keys;
        var attribute_values = product.attribute_values;
        var attributes = product.attributes;
        var variationOptionsHTML = [];
        var showAttributeFlag = 0;
        var totalAttributes = attribute_keys.length;
        variationOptionsHTML = attribute_keys.map(function (attribute_key, index) {
          var existedAttribute = attributes[attribute_key] ? Object.values(attributes[attribute_key]) : [];

          if (_this4.state.selectedAttributes[attribute_key]) {
            ++showAttributeFlag;

            if (showAttributeFlag >= totalAttributes) {
              showAttributeFlag = totalAttributes - 1;
            }
          }

          if (existedAttribute && existedAttribute.length && index === showAttributeFlag) {
            var options = existedAttribute.map(function (attribute_value, i) {
              var selectedAttributes = _objectSpread({}, _this4.state.selectedAttributes);

              selectedAttributes[attribute_key] = attribute_value.slug;
              var selectedVariation = product.available_variations.filter(function (available_variation) {
                return _this4.isAttributesMatch(available_variation, selectedAttributes);
              });

              if (totalAttributes - 1 === index) {
                var variationProduct = {};

                if (selectedVariation.length) {
                  variationProduct = selectedVariation[0];
                  var stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                    className: "outofstock"
                  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Out of Stock', 'ddwc-multipos'));

                  if (_this4.props.outlet.inventory_type === 'custom') {
                    stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                      className: "instock"
                    }, sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('In Stock(%s)', 'ddwc-multipos'), variationProduct.stock));
                  } else {
                    if (variationProduct.stock_status == 'onbackorder') {
                      stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                        className: "instock"
                      }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('On Backorder', 'ddwc-multipos'));
                    } else {
                      if (variationProduct.stock_quantity > 0) {
                        stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                          className: "instock"
                        }, sprintf((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('In Stock(%s)', 'ddwc-multipos'), variationProduct.stock_quantity));
                      } else {
                        stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("mark", {
                          className: "instock"
                        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('In Stock', 'ddwc-multipos'));
                      }
                    }
                  }

                  var productCardClass = 'image-left';

                  if ('image_top' === ddwcposPOSObj.ddwcpos_configuration.product_layout) {
                    productCardClass = 'image-top';
                  }

                  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
                    key: i,
                    className: 'ddwcpos-product-card ddwcpos-product-' + productCardClass,
                    onClick: function onClick(e) {
                      return _this4.handleAddGridVariation(variationProduct, product);
                    }
                  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
                    className: "ddwcpos-product-thumbnail",
                    dangerouslySetInnerHTML: {
                      __html: variationProduct.image
                    }
                  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
                    className: "ddwcpos-product-details"
                  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", {
                    title: (0,react_html_parser__WEBPACK_IMPORTED_MODULE_24__.default)(attribute_value.name)
                  }, (0,react_html_parser__WEBPACK_IMPORTED_MODULE_24__.default)(attribute_value.name)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,react_html_parser__WEBPACK_IMPORTED_MODULE_24__.default)(variationProduct.price_html)), stockHTML));
                }
              } else {
                return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", {
                  key: i,
                  onClick: function onClick(e) {
                    return _this4.handleVariationID(attribute_key, attribute_value.slug, product);
                  },
                  className: _this4.state.selectedAttributes[attribute_key] == attribute_value.slug ? 'ddwcpos-variation-attribute ddwcpos-selected-options' : 'ddwcpos-variation-attribute'
                }, attribute_value.name);
              }
            });
            return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
              key: attribute_key,
              className: "ddwcpos-variation-options-group"
            }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h3", null, attribute_values[attribute_key]), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Choose an option', 'ddwc-multipos'))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
              className: "ddwcpos-variation-options"
            }, options));
          } else if (_this4.state.selectedAttributes[attribute_key]) {
            var selectedAttribute = existedAttribute.filter(function (attribute_value) {
              return _this4.state.selectedAttributes[attribute_key] === attribute_value.slug;
            });

            if (selectedAttribute.length) {
              return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
                key: attribute_key,
                className: "ddwcpos-variation-options-group"
              }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h3", null, attribute_values[attribute_key]), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, selectedAttribute[0].name));
            }
          }
        });
        variationGridHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
          className: "ddwcpos-variation-grid",
          style: (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_modify_style_for_products_list', this.props.settings.display_category == 'disabled' ? {
            height: 'calc(100vh - 95px)'
          } : {
            height: 'calc(100vh - 218px)'
          }, this)
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
          className: "ddwcpos-variation-breadcrumbs"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("span", {
          onClick: function onClick(e) {
            return _this4.toggleVariationGrid();
          }
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Back', 'ddwc-multipos')), " ", (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_32__.default, null), " ", product.title), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
          className: "ddwcpos-icon-card",
          onClick: function onClick(e) {
            return _this4.handleVariationGridReset();
          },
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Reset', 'ddwc-multipos')
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Reset', 'ddwc-multipos'))), variationOptionsHTML);
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-products-tab-wrapper"
      }, this.props.settings.display_category != 'disabled' ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-category-wrapper"
      }, categoriesHTML.length ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react__WEBPACK_IMPORTED_MODULE_9__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Select Category', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-categories-container"
      }, categoriesHTML, viewAllCategoriesHTML, showAllCategoriesPopupHTML)) : null) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-search-wrapper"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Products', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-search-input-wrapper",
        style: style
      }, (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_add_different_products_search', false, this) ? (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_add_different_products_search', false, this) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-search-input"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_33__.default, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("input", {
        type: "text",
        className: "ddwcpos-form-control",
        value: this.state.search,
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Search Product by title, ID, SKU or Barcode Number', 'ddwc-multipos'),
        onChange: function onChange(e) {
          return _this4.handleProductSearch(e);
        },
        autoComplete: "off"
      })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-icon-card ddwcpos-barcode-icon",
        onClick: this.handleToggleBarcodePopup,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Add Product via Barcode', 'ddwc-multipos')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_34__.default, null)), ddwcposPOSObj.ddwcpos_configuration.custom_product_enabled ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-icon-card",
        onClick: this.handleToggleCustomProductPopup,
        title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Add Custom Product', 'ddwc-multipos')
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_35__.default, null)) : null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("span", null, products.length + ' ' + (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('Results', 'ddwc-multipos'))), barcodePopupHTML, customProductPopupHTML, OpenCashDrawerPopupHTML, this.renderWeightPopup(this.state.weightProduct)), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_add_content_after_product_search', null, this), this.state.showVariationGrid ? variationGridHTML : products.length > 0 ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(react_window__WEBPACK_IMPORTED_MODULE_36__.FixedSizeGrid, {
        className: "ddwcpos-grid ddwcpos-products-list",
        columnCount: cC,
        columnWidth: cW,
        height: 1000,
        rowCount: pA.length,
        rowHeight: productRowHeight,
        width: sW,
        style: (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_27__.applyFilters)('ddwcpos_modify_style_for_products_list', this.props.settings.display_category == 'disabled' ? {
          height: 'calc(100vh - 95px)'
        } : {
          height: 'calc(100vh - 218px)'
        }, this)
      }, Cell) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("div", {
        className: "ddwcpos-no-results"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_37__.default, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_8__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_11__.__)('No Products Found', 'ddwc-multipos'))));
    }
  }]);

  return Home;
}(react__WEBPACK_IMPORTED_MODULE_9__.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    categories: state.categories,
    products: state.products,
    taxes: state.taxes,
    settings: state.settings,
    transactions: state.transactions
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, (0,redux__WEBPACK_IMPORTED_MODULE_38__.bindActionCreators)({
    getProducts: _actions_products_index__WEBPACK_IMPORTED_MODULE_13__.getProducts,
    getCategories: _actions_categories_index__WEBPACK_IMPORTED_MODULE_14__.getCategories,
    getCustomers: _actions_customers_index__WEBPACK_IMPORTED_MODULE_15__.getCustomers,
    getCountriesAndStates: _actions_countries_index__WEBPACK_IMPORTED_MODULE_16__.getCountriesAndStates,
    LoadCategoryProducts: _actions_products_index__WEBPACK_IMPORTED_MODULE_13__.LoadCategoryProducts,
    LoadSearchedProducts: _actions_products_index__WEBPACK_IMPORTED_MODULE_13__.LoadSearchedProducts,
    getProductViaBarcode: _actions_cart_index__WEBPACK_IMPORTED_MODULE_19__.getProductViaBarcode,
    addToCart: _actions_cart_index__WEBPACK_IMPORTED_MODULE_19__.addToCart,
    getOrders: _actions_orders_index__WEBPACK_IMPORTED_MODULE_20__.getOrders,
    getSettings: _actions_settings_index__WEBPACK_IMPORTED_MODULE_21__.getSettings,
    saveTransaction: _actions_transactions__WEBPACK_IMPORTED_MODULE_22__.saveTransaction,
    getTransactions: _actions_transactions__WEBPACK_IMPORTED_MODULE_22__.getTransactions,
    getTables: _actions_tables_index__WEBPACK_IMPORTED_MODULE_23__.getTables
  }, dispatch));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_10__.connect)(mapStateToProps, mapDispatchToProps)(Home));

/***/ }),

/***/ "./src/pos/components/tabs/home/product/product.jsx":
/*!**********************************************************!*\
  !*** ./src/pos/components/tabs/home/product/product.jsx ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRODUCT_ADD_CUSTOM_INFO": () => (/* binding */ PRODUCT_ADD_CUSTOM_INFO),
/* harmony export */   "ADD_DIFFERENT_VARIATION_OPTIONS_FILTER": () => (/* binding */ ADD_DIFFERENT_VARIATION_OPTIONS_FILTER),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var _actions_cart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../actions/cart */ "./src/pos/actions/cart/index.js");
/* harmony import */ var react_html_parser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-html-parser */ "./node_modules/react-html-parser/lib/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _popup_popup__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../../popup/popup */ "./src/pos/components/popup/popup.jsx");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! react-notifications-component */ "./node_modules/react-notifications-component/dist/index.js");
/* harmony import */ var react_notifications_component__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_notifications_component__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _currency_format__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../currency-format */ "./src/pos/currency-format.js");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ant-design/icons */ "./node_modules/@ant-design/icons/es/icons/ExclamationCircleOutlined.js");









function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__.default)(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__.default)(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__.default)(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }












var PRODUCT_ADD_CUSTOM_INFO = 'ddwcpos_add_custom_product_info';
var ADD_DIFFERENT_VARIATION_OPTIONS_FILTER = 'ddwcpos_add_different_variation_options';

var Product = /*#__PURE__*/function (_Component) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__.default)(Product, _Component);

  var _super = _createSuper(Product);

  function Product(props) {
    var _this;

    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__.default)(this, Product);

    _this = _super.call(this, props);

    _this.handleToggleShowVariationPopup = function () {
      _this.setState({
        showVariationPopup: !_this.state.showVariationPopup,
        selectedAttributes: _this.props.product.attribute_keys ? _this.props.product.attribute_keys.reduce(function (acc, curr) {
          return acc[curr] = '', acc;
        }, {}) : {},
        selectedVariation: {}
      });
    };

    _this.handleToggleShowWeightPopup = function () {
      _this.setState({
        showWeightPopup: !_this.state.showWeightPopup
      });
    };

    _this.handleProductClick = function (product) {
      if ((0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__.applyFilters)('ddwcpos_handle_product_click_custom_functionality', false, product, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__.default)(_this))) {} else if ('variable' == product.type) {
        if ('grid' === ddwcposPOSObj.ddwcpos_configuration.product_variation_layout) {
          // this.props.toggleVariationGrid( variationGrid );
          _this.props.toggleVariationGrid(product);
        } else if ('popup' === ddwcposPOSObj.ddwcpos_configuration.product_variation_layout) {
          _this.setState({
            showVariationPopup: true
          });
        }
      } else {
        if (ddwcposPOSObj.ddwcpos_configuration.unit_price_enabled && product.weight) {
          _this.setState({
            showWeightPopup: true,
            weightProduct: product
          });
        } else {
          _this.props.addToCart(product.product_id, 1);
        }
      }
    };

    _this.handleAddVariation = function (variation, product) {
      if (ddwcposPOSObj.ddwcpos_configuration.unit_price_enabled && variation.weight) {
        _this.setState({
          showWeightPopup: true,
          weightProduct: variation
        });
      } else {
        // this.props.addToCart(product.product_id, 1);
        _this.props.addToCart(variation.variation_id, 1, false, '', _this.state.selectedAttributes);
      }

      _this.setState({
        showVariationPopup: !_this.state.showVariationPopup,
        selectedAttributes: product.attribute_keys ? product.attribute_keys.reduce(function (acc, curr) {
          return acc[curr] = '', acc;
        }, {}) : {},
        selectedVariation: {}
      });
    };

    _this.isAttributesMatch = function (available_variation, attributes) {
      var variation_attributes = available_variation.attributes;
      var match = true;

      if (available_variation.stock > 0) {
        for (var attr_name in variation_attributes) {
          if (variation_attributes.hasOwnProperty(attr_name)) {
            var val1 = variation_attributes[attr_name];
            var val2 = attributes[attr_name];

            if (val1 !== undefined && val2 !== undefined && val1.length !== 0 && val2.length !== 0 && val1 !== val2) {
              // if ( val1 !== undefined && val2 !== undefined && val1 !== val2 ) {
              match = false;
            }
          }
        }
      } else {
        match = false;
      }

      return match;
    };

    _this.handleVariationID = function (attribute_key, attribute_value, product) {
      if (attribute_value) {
        var selectedAttributes = _this.state.selectedAttributes;
        selectedAttributes[attribute_key] = attribute_value;
        var available_variations = product.available_variations;

        _this.setState({
          selectedAttributes: selectedAttributes
        });

        var selectedVariation = available_variations.filter(function (available_variation) {
          return _this.isAttributesMatch(available_variation, selectedAttributes);
        });
        var stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
          className: "outofstock"
        }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Out of Stock', 'ddwc-multipos'));
        var stateSelectedVariation = {};

        if (selectedVariation.length) {
          stateSelectedVariation = selectedVariation[0];

          if (_this.props.outlet.inventory_type === 'custom') {
            stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
              className: "instock"
            }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock(%s)', 'ddwc-multipos'), selectedVariation[0].stock));
          } else {
            if (selectedVariation[0].stock_status == 'onbackorder') {
              stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
                className: "instock"
              }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('On Backorder', 'ddwc-multipos'));
            } else {
              if (selectedVariation[0].stock_quantity > 0) {
                stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
                  className: "instock"
                }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock(%s)', 'ddwc-multipos'), selectedVariation[0].stock_quantity));
              } else {
                stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
                  className: "instock"
                }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock', 'ddwc-multipos'));
              }
            }
          }
        }

        _this.setState({
          selectedVariation: stateSelectedVariation,
          variationStockHTML: stockHTML
        });
      } else {
        _this.setState({
          selectedVariation: {},
          variationStockHTML: ''
        });
      }
    };

    _this.renderVariationPopup = function (product) {
      if (_this.state.showVariationPopup && 'variable' == product.type) {
        var attribute_keys = product.attribute_keys;
        var attribute_values = product.attribute_values;
        var attributes = product.attributes;
        var totalAttributes = attribute_keys.length;
        var variationOptionsHTML = attribute_keys.map(function (attribute_key, index) {
          var existedAttribute = attributes[attribute_key] ? Object.values(attributes[attribute_key]) : [];

          if (existedAttribute && existedAttribute.length) {
            var options = existedAttribute.map(function (attribute_value, i) {
              var selectedAttributes = _objectSpread({}, _this.state.selectedAttributes);

              selectedAttributes[attribute_key] = attribute_value.slug;
              var selectedVariation = product.available_variations.filter(function (available_variation) {
                return _this.isAttributesMatch(available_variation, selectedAttributes);
              });
              var hasStock = true;

              if (totalAttributes - 1 === index) {
                hasStock = false;
                var variationProduct = {};

                if (selectedVariation.length) {
                  variationProduct = selectedVariation[0];

                  if (_this.props.outlet.inventory_type === 'custom') {
                    hasStock = true;
                  } else {
                    if (selectedVariation[0].stock_status == 'onbackorder') {
                      hasStock = true;
                    } else {
                      if (selectedVariation[0].stock_quantity > 0) {
                        hasStock = true;
                      } else {
                        hasStock = true;
                      }
                    }
                  }
                }
              }

              return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("p", {
                key: i,
                onClick: function onClick(e) {
                  return _this.handleVariationID(attribute_key, attribute_value.slug, product);
                },
                className: _this.state.selectedAttributes[attribute_key] == attribute_value.slug ? 'ddwcpos-variation-attribute ddwcpos-selected-options' : 'ddwcpos-variation-attribute'
              }, attribute_value.name, " ", !hasStock ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)(_ant_design_icons__WEBPACK_IMPORTED_MODULE_17__.default, {
                title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Out of Stock', 'ddwc-multipos')
              }) : null);
            });
            return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
              key: attribute_key,
              className: "ddwcpos-popup-options-group"
            }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("h3", null, attribute_values[attribute_key]), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
              className: "ddwcpos-popup-options"
            }, options));
          }
        });
        var popupContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)(react__WEBPACK_IMPORTED_MODULE_8__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Select Variation', 'ddwc-multipos')), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__.applyFilters)(ADD_DIFFERENT_VARIATION_OPTIONS_FILTER, '', product, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__.default)(_this)) ? (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__.applyFilters)(ADD_DIFFERENT_VARIATION_OPTIONS_FILTER, '', product, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__.default)(_this)) : variationOptionsHTML, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
          className: "ddwcpos-variation-product-details"
        }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("p", null, (0,react_html_parser__WEBPACK_IMPORTED_MODULE_11__.default)(_this.state.selectedVariation.price_html)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("p", null, _this.state.variationStockHTML)));
        var variationPopupProps = {
          handleOverlay: _this.handleToggleShowVariationPopup,
          popupContent: popupContent,
          notDisabled: Object.keys(_this.state.selectedVariation).length,
          handleSuccess: function handleSuccess(e) {
            return _this.handleAddVariation(_this.state.selectedVariation, product);
          },
          handleCancel: _this.handleToggleShowVariationPopup
        };
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)(_popup_popup__WEBPACK_IMPORTED_MODULE_13__.default, variationPopupProps);
      } else {
        return null;
      }
    };

    _this.handleWeightInput = function (e) {
      if (e.which == 13 && e.target.value) {
        _this.handleWeightSubmit();
      } else {
        _this.setState({
          weightInput: e.target.value
        });
      }
    };

    _this.handleWeightSubmit = function () {
      if (_this.state.weightInput) {
        _this.handleToggleShowWeightPopup();

        _this.props.addToCart(_this.state.weightProduct.variation_id ? _this.state.weightProduct.variation_id : _this.state.weightProduct.product_id, 1, false, _this.state.weightInput, _this.state.selectedAttributes);
      } else {
        react_notifications_component__WEBPACK_IMPORTED_MODULE_14__.store.addNotification({
          title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Error', 'ddwc-multipos'),
          message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Enter valid weight.', 'ddwc-multipos'),
          type: 'danger',
          insert: 'top',
          container: 'top-right',
          dismiss: {
            duration: 3000,
            pauseOnHover: true
          }
        });
      }
    };

    _this.renderWeightPopup = function (product) {
      if (_this.state.showWeightPopup) {
        var popupContent = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)(react__WEBPACK_IMPORTED_MODULE_8__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("h2", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Enter weight for the purchase.', 'ddwc-multipos')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("p", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('%s (%s %s) = %s', 'ddwc-multipos'), product.title, product.weight, ddwcposPOSObj.weight_unit, (0,_currency_format__WEBPACK_IMPORTED_MODULE_15__.ddwcposPrice)(product.sale_price))), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("input", {
          type: "number",
          min: "0.01",
          step: "0.01",
          onKeyUp: function onKeyUp(e) {
            return _this.handleWeightInput(e);
          },
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('Enter Weight', 'ddwc-multipos'),
          autoFocus: true
        }));
        var variationPopupProps = {
          handleOverlay: _this.handleToggleShowWeightPopup,
          popupContent: popupContent,
          notDisabled: _this.state.weightInput,
          handleSuccess: function handleSuccess(e) {
            return _this.handleWeightSubmit(_this.state.weightInput, product);
          },
          handleCancel: _this.handleToggleShowWeightPopup
        };
        return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)(_popup_popup__WEBPACK_IMPORTED_MODULE_13__.default, variationPopupProps);
      } else {
        return null;
      }
    };

    _this.state = (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__.applyFilters)('ddwcpos_modify_state_in_product_component', {
      showVariationPopup: false,
      showWeightPopup: false,
      weightInput: '',
      weightProduct: {},
      selectedAttributes: _this.props.product.attribute_keys ? _this.props.product.attribute_keys.reduce(function (acc, curr) {
        return acc[curr] = '', acc;
      }, {}) : {},
      selectedVariation: {},
      variationStockHTML: ''
    }, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_3__.default)(_this));
    return _this;
  }

  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__.default)(Product, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var product = this.props.product;
      var stockHTML = '';

      if (ddwcposPOSObj.ddwcpos_configuration.show_product_stock_enabled) {
        if (this.props.outlet.inventory_type === 'custom') {
          if (product.type == 'variable') {
            stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
              className: "instock"
            }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock', 'ddwc-multipos'));
          } else {
            stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
              className: "instock"
            }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock(%s)', 'ddwc-multipos'), product.stock));
          }
        } else {
          if (product.stock_status == 'onbackorder') {
            stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
              className: "instock"
            }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('On Backorder', 'ddwc-multipos'));
          } else {
            if (product.stock_quantity > 0) {
              stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
                className: "instock"
              }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.sprintf)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock(%s)', 'ddwc-multipos'), product.stock_quantity));
            } else {
              stockHTML = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("mark", {
                className: "instock"
              }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_12__.__)('In Stock', 'ddwc-multipos'));
            }
          }
        }
      }

      var productCardClass = 'image-left';

      if ('image_top' === ddwcposPOSObj.ddwcpos_configuration.product_layout) {
        productCardClass = 'image-top';
      }

      return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)(react__WEBPACK_IMPORTED_MODULE_8__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
        className: 'ddwcpos-product-card ddwcpos-product-' + productCardClass,
        onClick: function onClick(e) {
          return _this2.handleProductClick(product);
        }
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
        className: "ddwcpos-product-thumbnail",
        dangerouslySetInnerHTML: {
          __html: product.image
        }
      }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("div", {
        className: "ddwcpos-product-details"
      }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("h2", {
        title: (0,react_html_parser__WEBPACK_IMPORTED_MODULE_11__.default)(product.title)
      }, (0,react_html_parser__WEBPACK_IMPORTED_MODULE_11__.default)(product.title)), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.createElement)("p", null, (0,react_html_parser__WEBPACK_IMPORTED_MODULE_11__.default)(product.price_html)), stockHTML)), this.renderVariationPopup(product), this.renderWeightPopup(this.state.weightProduct), (0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_16__.applyFilters)('ddwcpos_add_custom_html_after_product_card', '', product, this));
    }
  }]);

  return Product;
}(react__WEBPACK_IMPORTED_MODULE_8__.Component);

function mapDispatchToProps(dispatch) {
  return Object.assign({
    dispatch: dispatch
  }, (0,redux__WEBPACK_IMPORTED_MODULE_18__.bindActionCreators)({
    addToCart: _actions_cart__WEBPACK_IMPORTED_MODULE_10__.addToCart
  }, dispatch));
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,react_redux__WEBPACK_IMPORTED_MODULE_9__.connect)(null, mapDispatchToProps)(Product));

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZC13b29jb21tZXJjZS1tdWx0aXBvcy8uL3NyYy9wb3MvYWN0aW9ucy9jYXRlZ29yaWVzL2luZGV4LmpzIiwid2VicGFjazovL2RkLXdvb2NvbW1lcmNlLW11bHRpcG9zLy4vc3JjL3Bvcy9jb21wb25lbnRzL3RhYnMvaG9tZS9ob21lLmpzeCIsIndlYnBhY2s6Ly9kZC13b29jb21tZXJjZS1tdWx0aXBvcy8uL3NyYy9wb3MvY29tcG9uZW50cy90YWJzL2hvbWUvcHJvZHVjdC9wcm9kdWN0LmpzeCJdLCJuYW1lcyI6WyJDQVRFR09SSUVTIiwic2V0Q2F0ZWdvcmllcyIsImNhdGVnb3JpZXMiLCJ0eXBlIiwiZ2V0Q2F0ZWdvcmllcyIsIm91dGxldElkIiwiZGlzcGF0Y2giLCJMb2FkQ2F0ZWdvcmVzRnJvbUluZGV4REIiLCJ0aGVuIiwicmVzIiwibGVuZ3RoIiwic3RvcmUiLCJ0aXRsZSIsIl9fIiwibWVzc2FnZSIsImluc2VydCIsImNvbnRhaW5lciIsImRpc21pc3MiLCJkdXJhdGlvbiIsInBhdXNlT25Ib3ZlciIsInBvc3REYXRhIiwib3V0bGV0X2lkIiwicGFyc2VJbnQiLCJwb3N0UmVxdWVzdCIsImRkd2Nwb3NQT1NPYmoiLCJBUEkiLCJHRVRfQ0FURUdPUklFU19FTkRQT0lOVCIsInJlc3BvbnNlIiwiZGF0YWJhc2UiLCJidWxrUHV0IiwicmVzdWx0IiwiZ2V0Q2F0ZWdvcmVzRnJvbUluZGV4REIiLCJkYnJlcyIsInRvQXJyYXkiLCJkYXRhIiwiQ0hBTkdFX0RFRkFVTFRfUFJPRFVDVF9TRUFSQ0hfV09SS0ZMT1dfRklMVEVSIiwiSG9tZSIsInByb3BzIiwidG9nZ2xlVmFyaWF0aW9uR3JpZCIsInByb2R1Y3QiLCJzdGF0ZSIsInNob3dWYXJpYXRpb25HcmlkIiwic2V0U3RhdGUiLCJ2YXJpYXRpb25HcmlkUHJvZHVjdCIsInNlbGVjdGVkQXR0cmlidXRlcyIsImF0dHJpYnV0ZV9rZXlzIiwicmVkdWNlIiwiYWNjIiwiY3VyciIsImhhbmRsZVZhcmlhdGlvbkdyaWRSZXNldCIsImhhbmRsZVRvZ2dsZVNob3dXZWlnaHRQb3B1cCIsInNob3dXZWlnaHRQb3B1cCIsImhhbmRsZVdlaWdodElucHV0IiwiZSIsInN0b3BQcm9wYWdhdGlvbiIsIndoaWNoIiwidGFyZ2V0IiwidmFsdWUiLCJoYW5kbGVXZWlnaHRTdWJtaXQiLCJ3ZWlnaHRJbnB1dCIsImFkZFRvQ2FydCIsIndlaWdodFByb2R1Y3QiLCJ2YXJpYXRpb25faWQiLCJwcm9kdWN0X2lkIiwicmVuZGVyV2VpZ2h0UG9wdXAiLCJwb3B1cENvbnRlbnQiLCJzcHJpbnRmIiwid2VpZ2h0Iiwid2VpZ2h0X3VuaXQiLCJkZHdjcG9zUHJpY2UiLCJzYWxlX3ByaWNlIiwidmFyaWF0aW9uUG9wdXBQcm9wcyIsImhhbmRsZU92ZXJsYXkiLCJub3REaXNhYmxlZCIsImhhbmRsZVN1Y2Nlc3MiLCJoYW5kbGVDYW5jZWwiLCJoYW5kbGVQcm9kdWN0U2VhcmNoIiwic2VhcmNoIiwiYXBwbHlGaWx0ZXJzIiwiTG9hZFNlYXJjaGVkUHJvZHVjdHMiLCJ0b0xvd2VyQ2FzZSIsInByb2R1Y3RzIiwiaGFuZGxlVG9nZ2xlU2hvd0FsbENhdGVnb3JpZXMiLCJzaG93QWxsQ2F0ZWdvcmllc1BvcHVwIiwiaGFuZGxlSGlkZUFsbENhdGVnb3JpZXNQb3B1cCIsImhhbmRsZVRvZ2dsZUJhcmNvZGVQb3B1cCIsInNob3dCYXJjb2RlUG9wdXAiLCJoYW5kbGVUb2dnbGVDdXN0b21Qcm9kdWN0UG9wdXAiLCJzaG93Q3VzdG9tUHJvZHVjdFBvcHVwIiwiaGFuZGxlVG9nZ2xlT3BlbkNhc2hEcmF3ZXJQb3B1cCIsInNob3dPcGVuQ2FzaERyYXdlclBvcHVwIiwiaGFuZGxlQmFyY29kZUlucHV0IiwiaGFuZGxlQWRkUHJvZHVjdFZpYUJhcmNvZGUiLCJiYXJjb2RlVmFsdWUiLCJoYW5kbGVPcGVuQ2FzaERyYXdlckFtb3VudElucHV0IiwiaGFuZGxlT3BlbkNhc2hEcmF3ZXJBbW91bnRTdWJtaXQiLCJvcGVuQ2FzaERyYXdlckFtb3VudCIsImFyZ3MiLCJpbiIsIm91dGxldCIsImlkIiwibWV0aG9kIiwicmVhc29uIiwic2F2ZVRyYW5zYWN0aW9uIiwiaGFuZGxlQ3VzdG9tUHJvZHVjdElucHV0IiwiY3VzdG9tUHJvZHVjdEFkZEVuYWJsZWQiLCJoYW5kbGVBZGRDdXN0b21Qcm9kdWN0IiwiY3VzdG9tUHJvZHVjdE5hbWUiLCJjdXN0b21Qcm9kdWN0UHJpY2UiLCJjdXN0b21Qcm9kdWN0UXVhbnRpdHkiLCJwcmV2ZW50RGVmYXVsdCIsImdldFByb2R1Y3RWaWFCYXJjb2RlIiwiT2JqZWN0Iiwia2V5cyIsImRkd2Nwb3NfY29uZmlndXJhdGlvbiIsInVuaXRfcHJpY2VfZW5hYmxlZCIsInRheGVzIiwicHJvZHVjdF90YXgiLCJ0YXhfZW5hYmxlZCIsInRheF9kaXNwbGF5X2NhcnQiLCJ0YXhfdHlwZSIsInRheF9yYXRlIiwiZm9yRWFjaCIsInRheCIsInJhdGUiLCJyZWFsX3ByaWNlIiwicGFyc2VGbG9hdCIsInByaWNlIiwiaGFuZGxlVmFyaWF0aW9uSUQiLCJhdHRyaWJ1dGVfa2V5IiwiYXR0cmlidXRlX3ZhbHVlIiwiYXZhaWxhYmxlX3ZhcmlhdGlvbnMiLCJzZWxlY3RlZFZhcmlhdGlvbiIsImZpbHRlciIsImF2YWlsYWJsZV92YXJpYXRpb24iLCJpc0F0dHJpYnV0ZXNNYXRjaCIsInN0b2NrSFRNTCIsInN0YXRlU2VsZWN0ZWRWYXJpYXRpb24iLCJpbnZlbnRvcnlfdHlwZSIsInN0b2NrIiwic3RvY2tfc3RhdHVzIiwic3RvY2tfcXVhbnRpdHkiLCJ2YXJpYXRpb25TdG9ja0hUTUwiLCJhdHRyaWJ1dGVzIiwidmFyaWF0aW9uX2F0dHJpYnV0ZXMiLCJtYXRjaCIsImF0dHJfbmFtZSIsImhhc093blByb3BlcnR5IiwidmFsMSIsInZhbDIiLCJ1bmRlZmluZWQiLCJoYW5kbGVBZGRHcmlkVmFyaWF0aW9uIiwidmFyaWF0aW9uIiwiY2lkIiwicHJvZHVjdHNMb2FkZWQiLCJjYXRlZ29yeVByb2R1Y3RzTG9hZGVkIiwiaGlzdG9yeSIsImFjdGlvbiIsImdldFByb2R1Y3RzIiwiZ2V0Q3VzdG9tZXJzIiwiZ2V0VHJhbnNhY3Rpb25zIiwiZ2V0Q291bnRyaWVzQW5kU3RhdGVzIiwiZ2V0VGFibGVzIiwiZ2V0U2V0dGluZ3MiLCJiYXJjb2RlU3RyaW5nIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInNyY0VsZW1lbnQiLCJ0YWdOYW1lIiwidG9VcHBlckNhc2UiLCJwcmVzc2VkS2V5Iiwia2V5IiwiaXNOdW1iZXIiLCJ0ZXN0IiwiaXNBbHBoYWJldCIsImxpc3QiLCJwYXJhbXMiLCJMb2FkQ2F0ZWdvcnlQcm9kdWN0cyIsIm1haW5Qcm9kdWN0cyIsImhhdmVPcGVuQ2FzaFRyYW5zYWN0aW9uIiwidHJhbnNhY3Rpb25zIiwidHJhbnNhY3Rpb24iLCJzZWFyY2hUZXh0IiwicyIsImNhdGVnb3J5VGV4dCIsInNwcm9kdWN0cyIsImNwcm9kdWN0cyIsInNvcnQiLCJhIiwiYiIsImVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJjQyIsInNXIiwib2Zmc2V0V2lkdGgiLCJzY3JlZW4iLCJ3aWR0aCIsImNhdGVnb3J5RWxlbWVudCIsImNhdGVnb3JpZXNDYXJkc0xlbmd0aCIsIk1hdGgiLCJmbG9vciIsInByb2R1Y3RSb3dIZWlnaHQiLCJjVyIsIndIIiwiaW5uZXJXaWR0aCIsInByb2R1Y3RfbGF5b3V0IiwicEEiLCJpaSIsImpqIiwiY1IiLCJpdGVtIiwiaW5kZXgiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwiQ2VsbCIsImNvbHVtbkluZGV4Iiwicm93SW5kZXgiLCJzdHlsZSIsIm5vdGlmaWNhdGlvbiIsImFsbENhdGVnb3J5Q2xhc3MiLCJjYXRlZ29yaWVzSFRNTCIsInZpZXdBbGxDYXRlZ29yaWVzSFRNTCIsInNob3dBbGxDYXRlZ29yaWVzUG9wdXBIVE1MIiwic2l0ZVVybCIsImVuZHBvaW50IiwiY2F0ZWdvcmllc1RlbXBIVE1MIiwibWFwIiwidmFsIiwiaSIsImNhdGVnb3J5Q2xhc3MiLCJpbWFnZSIsIm5hbWUiLCJjb25jYXQiLCJzbGljZSIsImJhcmNvZGVQb3B1cEhUTUwiLCJiYXJjb2RlUG9wdXBQcm9wcyIsImhpZGVDYW5jZWxCdXR0b24iLCJzaW5nbGVCdXR0b24iLCJzdWNjZXNzQnV0dG9uVGV4dCIsImN1c3RvbVByb2R1Y3RQb3B1cEhUTUwiLCJjdXN0b21Qcm9kdWN0UG9wdXBQcm9wcyIsIk9wZW5DYXNoRHJhd2VyUG9wdXBIVE1MIiwib3BlbmNhc2hfZHJhd2VyX2VuYWJsZWQiLCJPcGVuQ2FzaERyYXdlclBvcHVwUHJvcHMiLCJjdXN0b21fcHJvZHVjdF9lbmFibGVkIiwiZ3JpZFRlbXBsYXRlQ29sdW1ucyIsInZhcmlhdGlvbkdyaWRIVE1MIiwiYXR0cmlidXRlX3ZhbHVlcyIsInZhcmlhdGlvbk9wdGlvbnNIVE1MIiwic2hvd0F0dHJpYnV0ZUZsYWciLCJ0b3RhbEF0dHJpYnV0ZXMiLCJleGlzdGVkQXR0cmlidXRlIiwidmFsdWVzIiwib3B0aW9ucyIsInNsdWciLCJ2YXJpYXRpb25Qcm9kdWN0IiwicHJvZHVjdENhcmRDbGFzcyIsIl9faHRtbCIsIlJlYWN0SHRtbFBhcnNlciIsInByaWNlX2h0bWwiLCJzZWxlY3RlZEF0dHJpYnV0ZSIsInNldHRpbmdzIiwiZGlzcGxheV9jYXRlZ29yeSIsImhlaWdodCIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsIm1hcERpc3BhdGNoVG9Qcm9wcyIsImFzc2lnbiIsImJpbmRBY3Rpb25DcmVhdG9ycyIsImdldE9yZGVycyIsImNvbm5lY3QiLCJQUk9EVUNUX0FERF9DVVNUT01fSU5GTyIsIkFERF9ESUZGRVJFTlRfVkFSSUFUSU9OX09QVElPTlNfRklMVEVSIiwiUHJvZHVjdCIsImhhbmRsZVRvZ2dsZVNob3dWYXJpYXRpb25Qb3B1cCIsInNob3dWYXJpYXRpb25Qb3B1cCIsImhhbmRsZVByb2R1Y3RDbGljayIsInByb2R1Y3RfdmFyaWF0aW9uX2xheW91dCIsImhhbmRsZUFkZFZhcmlhdGlvbiIsInJlbmRlclZhcmlh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RWxOLGFBQVMsRUFBVEEscURBQVNBO0FBQVgsR0FBRCxFQUFnQnRELFFBQWhCLENBQTlDLENBQVA7QUFDSDs7QUFFRCxpRUFBZTBRLG9EQUFPLENBQUMsSUFBRCxFQUFPSixrQkFBUCxDQUFQLENBQWtDTyxPQUFsQyxDQUFmLEUiLCJmaWxlIjoiLi9hc3NldHMvanMvY2h1bmtzL3NyY19wb3NfY29tcG9uZW50c190YWJzX2hvbWVfaG9tZV9qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBfXyB9IGZyb20gJ0B3b3JkcHJlc3MvaTE4bic7XHJcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAncmVhY3Qtbm90aWZpY2F0aW9ucy1jb21wb25lbnQnO1xyXG5pbXBvcnQgZGF0YWJhc2UgZnJvbSAnLi8uLi8uLi9kYXRhYmFzZSc7XHJcbmltcG9ydCB7IHBvc3RSZXF1ZXN0IH0gZnJvbSAnLi8uLi8uLi9mZXRjaCc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0FURUdPUklFUyA9ICdDQVRFR09SSUVTJzsgXHJcblxyXG5leHBvcnQgY29uc3Qgc2V0Q2F0ZWdvcmllcyA9IGNhdGVnb3JpZXMgPT4ge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICB0eXBlOiBDQVRFR09SSUVTLFxyXG4gICAgICAgIGNhdGVnb3JpZXNcclxuICAgIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzID0gb3V0bGV0SWQgPT4gZGlzcGF0Y2ggPT4ge1xyXG4gICAgTG9hZENhdGVnb3Jlc0Zyb21JbmRleERCKCkudGhlbiggcmVzID0+IHtcclxuICAgICAgICBpZiAoIHJlcyAmJiByZXMubGVuZ3RoICkge1xyXG4gICAgICAgICAgICBkaXNwYXRjaChzZXRDYXRlZ29yaWVzKCByZXMgKSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZE5vdGlmaWNhdGlvbih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogX18oICdMb2FkaW5nIENhdGVnb3JpZXMnLCAnZGR3Yy1tdWx0aXBvcycgKSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IF9fKCAnTG9hZGluZyBDYXRlZ29yaWVzIGluIHRoZSBQT1MnLCAnZGR3Yy1tdWx0aXBvcycgKSxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdpbmZvJyxcclxuICAgICAgICAgICAgICAgIGluc2VydDogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXI6ICd0b3AtcmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgZGlzbWlzczoge1xyXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGxldCBwb3N0RGF0YSA9IHtcclxuICAgICAgICAgICAgICAgIG91dGxldF9pZDogcGFyc2VJbnQoIG91dGxldElkICksXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBwb3N0UmVxdWVzdCggZGR3Y3Bvc1BPU09iai5BUEkuR0VUX0NBVEVHT1JJRVNfRU5EUE9JTlQsIHBvc3REYXRhICkudGhlbiggcmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YWJhc2UudGFibGUoICdjYXRlZ29yaWVzJyApLmJ1bGtQdXQoIHJlc3BvbnNlICkudGhlbiggcmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRDYXRlZ29yZXNGcm9tSW5kZXhEQigpLnRoZW4oIGRicmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGF0Y2goIHNldENhdGVnb3JpZXMoIGRicmVzICkgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvcmUuYWRkTm90aWZpY2F0aW9uKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBfXyggJ0NhdGVnb3JpZXMgTG9hZGVkJywgJ2Rkd2MtbXVsdGlwb3MnICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBfXyggJ0FsbCBDYXRlZ29yaWVzIGFyZSBsb2FkZWQgc3VjY2Vzc2Z1bGx5JywgJ2Rkd2MtbXVsdGlwb3MnICksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbnNlcnQ6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiAndG9wLXJpZ2h0JyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc21pc3M6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXVzZU9uSG92ZXI6IHRydWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9XHJcbiAgICB9ICk7XHJcbn1cclxuXHJcbmNvbnN0IGdldENhdGVnb3Jlc0Zyb21JbmRleERCID0gKCkgPT4gZGF0YWJhc2UudGFibGUoICdjYXRlZ29yaWVzJyApLnRvQXJyYXkoKTtcclxuXHJcbmNvbnN0IExvYWRDYXRlZ29yZXNGcm9tSW5kZXhEQiA9ICgpID0+IGdldENhdGVnb3Jlc0Zyb21JbmRleERCKCkudGhlbiggZGF0YSA9PiBkYXRhID8gZGF0YSA6IGZhbHNlICk7XHJcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQsIEZyYWdtZW50IH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xyXG5pbXBvcnQgeyBiaW5kQWN0aW9uQ3JlYXRvcnMgfSBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7IF9fIH0gZnJvbSAnQHdvcmRwcmVzcy9pMThuJztcclxuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xyXG5pbXBvcnQgTGF6eUxvYWQgZnJvbSAncmVhY3QtbGF6eWxvYWQnO1xyXG5pbXBvcnQgeyBGaXhlZFNpemVHcmlkIGFzIEdyaWQgfSBmcm9tICdyZWFjdC13aW5kb3cnO1xyXG5pbXBvcnQgeyBBcHBzdG9yZU91dGxpbmVkLCBCYXJjb2RlT3V0bGluZWQsIERhdGFiYXNlT3V0bGluZWQsIFBsdXNPdXRsaW5lZCwgU2VhcmNoT3V0bGluZWQsIFdhcm5pbmdGaWxsZWQsIENoZWNrT3V0bGluZWQsIFJpZ2h0T3V0bGluZWQgfSBmcm9tICdAYW50LWRlc2lnbi9pY29ucyc7XHJcbmltcG9ydCB7IGdldFByb2R1Y3RzIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy9wcm9kdWN0cy9pbmRleCc7XHJcbmltcG9ydCB7IGdldENhdGVnb3JpZXMgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2NhdGVnb3JpZXMvaW5kZXgnO1xyXG5pbXBvcnQgeyBnZXRDdXN0b21lcnMgfSBmcm9tICcuLi8uLi8uLi9hY3Rpb25zL2N1c3RvbWVycy9pbmRleCc7XHJcbmltcG9ydCB7IGdldENvdW50cmllc0FuZFN0YXRlcyB9IGZyb20gJy4uLy4uLy4uL2FjdGlvbnMvY291bnRyaWVzL2luZGV4JztcclxuaW1wb3J0IHsgTG9hZENhdGVnb3J5UHJvZHVjdHMsIExvYWRTZWFyY2hlZFByb2R1Y3RzIH0gZnJvbSAnLi8uLi8uLi8uLi9hY3Rpb25zL3Byb2R1Y3RzL2luZGV4JztcclxuaW1wb3J0IFByb2R1Y3QgZnJvbSAnLi9wcm9kdWN0L3Byb2R1Y3QuanN4JztcclxuaW1wb3J0IFBvcHVwIGZyb20gJy4vLi4vLi4vcG9wdXAvcG9wdXAuanN4JztcclxuaW1wb3J0IHsgYWRkVG9DYXJ0LCBnZXRQcm9kdWN0VmlhQmFyY29kZSB9IGZyb20gJy4vLi4vLi4vLi4vYWN0aW9ucy9jYXJ0L2luZGV4JztcclxuaW1wb3J0IHsgZ2V0T3JkZXJzIH0gZnJvbSAnLi8uLi8uLi8uLi9hY3Rpb25zL29yZGVycy9pbmRleCc7XHJcbmltcG9ydCB7IGdldFNldHRpbmdzIH0gZnJvbSAnLi8uLi8uLi8uLi9hY3Rpb25zL3NldHRpbmdzL2luZGV4JztcclxuaW1wb3J0IHsgc2F2ZVRyYW5zYWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vYWN0aW9ucy90cmFuc2FjdGlvbnMnO1xyXG5pbXBvcnQgeyBnZXRUcmFuc2FjdGlvbnMgfSBmcm9tICcuLy4uLy4uLy4uL2FjdGlvbnMvdHJhbnNhY3Rpb25zL2luZGV4JztcclxuaW1wb3J0IHsgZ2V0VGFibGVzIH0gZnJvbSAnLi8uLi8uLi8uLi9hY3Rpb25zL3RhYmxlcy9pbmRleCc7XHJcbmltcG9ydCBSZWFjdEh0bWxQYXJzZXIgZnJvbSAncmVhY3QtaHRtbC1wYXJzZXInO1xyXG5cclxuLy8gY29uc3QgUHJvZHVjdCA9IGxhenkoKCkgPT4gaW1wb3J0KCcuL3Byb2R1Y3QvcHJvZHVjdC5qc3gnKSk7XHJcbi8vIGNvbnN0IFBvcHVwID0gbGF6eSgoKSA9PiBpbXBvcnQoJy4vLi4vLi4vcG9wdXAvcG9wdXAuanN4JykpO1xyXG5pbXBvcnQgeyBkZHdjcG9zUHJpY2UgfSBmcm9tICcuLi8uLi8uLi9jdXJyZW5jeS1mb3JtYXQnO1xyXG5pbXBvcnQgeyBzdG9yZSB9IGZyb20gJ3JlYWN0LW5vdGlmaWNhdGlvbnMtY29tcG9uZW50JztcclxuaW1wb3J0IHsgYXBwbHlGaWx0ZXJzIH0gZnJvbSAnQHdvcmRwcmVzcy9ob29rcyc7XHJcblxyXG5leHBvcnQgY29uc3QgQ0hBTkdFX0RFRkFVTFRfUFJPRFVDVF9TRUFSQ0hfV09SS0ZMT1dfRklMVEVSID0gJ2Rkd2Nwb3NfY2hhbmdlX2RlZmF1bHRfcHJvZHVjdF9zZWFyY2hfd29ya2Zsb3cnO1xyXG4vLyBleHBvcnQgY29uc3QgQ1VTVE9NX1NFQVJDSF9QUk9EVUNUX01FVEhPRF9GSUxURVIgPSAnZGR3Y3Bvc19jdXN0b21fc2VhcmNoX3Byb2R1Y3RfbWV0aG9kJztcclxuXHJcblxyXG5jbGFzcyBIb21lIGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnN0YXRlID0gYXBwbHlGaWx0ZXJzKCAnZGR3Y3Bvc19tb2RpZnlfc3RhdGVfaW5faG9tZV9jb21wb25lbnQnLCB7XHJcbiAgICAgICAgICAgIGNpZCAgICAgICAgICAgICAgICAgICAgOiAnJyxcclxuICAgICAgICAgICAgc2VhcmNoICAgICAgICAgICAgICAgICA6ICcnLFxyXG4gICAgICAgICAgICBwcm9kdWN0c0xvYWRlZCAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGNhdGVnb3J5UHJvZHVjdHNMb2FkZWQgOiBmYWxzZSxcclxuICAgICAgICAgICAgc2hvd0FsbENhdGVnb3JpZXNQb3B1cCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93QmFyY29kZVBvcHVwICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIGJhcmNvZGVWYWx1ZSAgICAgICAgICAgOiAnJyxcclxuICAgICAgICAgICAgc2hvd0N1c3RvbVByb2R1Y3RQb3B1cCA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93T3BlbkNhc2hEcmF3ZXJQb3B1cDogZmFsc2UsXHJcbiAgICAgICAgICAgIG9wZW5DYXNoRHJhd2VyQW1vdW50ICAgOiBmYWxzZSxcclxuICAgICAgICAgICAgY3VzdG9tUHJvZHVjdE5hbWUgICAgICA6ICcnLFxyXG4gICAgICAgICAgICBjdXN0b21Qcm9kdWN0UHJpY2UgICAgIDogJycsXHJcbiAgICAgICAgICAgIGN1c3RvbVByb2R1Y3RRdWFudGl0eSAgOiAnJyxcclxuICAgICAgICAgICAgY3VzdG9tUHJvZHVjdEFkZEVuYWJsZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93V2VpZ2h0UG9wdXAgICAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHdlaWdodElucHV0ICAgICAgICAgICAgOiAnJyxcclxuICAgICAgICAgICAgd2VpZ2h0UHJvZHVjdCAgICAgICAgICA6IHt9LFxyXG4gICAgICAgICAgICBzaG93VmFyaWF0aW9uR3JpZCAgICAgIDogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhcmlhdGlvbkdyaWRQcm9kdWN0ICAgOiB7fSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzICAgICA6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZFZhcmlhdGlvbiAgICAgIDoge30sXHJcbiAgICAgICAgICAgIHZhcmlhdGlvblN0b2NrSFRNTCAgICAgOiAnJ1xyXG4gICAgICAgIH0sIHRoaXMgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb21wb25lbnREaWRNb3VudCgpIHtcclxuICAgICAgICBpZiAoIHRoaXMucHJvcHMuaGlzdG9yeS5hY3Rpb24gPT0gJ1BPUCcgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgIHNob3dPcGVuQ2FzaERyYXdlclBvcHVwOiB0cnVlXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuZ2V0Q2F0ZWdvcmllcyggdGhpcy5wcm9wcy5vdXRsZXQuaWQgKTtcclxuICAgICAgICB0aGlzLnByb3BzLmdldFByb2R1Y3RzKCB0aGlzLnByb3BzLm91dGxldC5pZCApLnRoZW4oIHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgIHByb2R1Y3RzTG9hZGVkOiB0cnVlXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9ICk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRDdXN0b21lcnMoIHRoaXMucHJvcHMub3V0bGV0LmlkICk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRUcmFuc2FjdGlvbnMoIHRoaXMucHJvcHMub3V0bGV0LmlkICk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRDb3VudHJpZXNBbmRTdGF0ZXMoIHRoaXMucHJvcHMub3V0bGV0LmlkICk7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRUYWJsZXMoKTtcclxuICAgICAgICB0aGlzLnByb3BzLmdldFNldHRpbmdzKCk7XHJcblxyXG4gICAgICAgIGxldCBiYXJjb2RlU3RyaW5nID0gJyc7XHJcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoICdrZXlwcmVzcycsIGUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XHJcblxyXG4gICAgICAgICAgICBpZiAoIHRhcmdldC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdCT0RZJyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggZS53aGljaCA9PSAxMyAmJiBiYXJjb2RlU3RyaW5nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYmFyY29kZVZhbHVlOiBiYXJjb2RlU3RyaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFkZFByb2R1Y3RWaWFCYXJjb2RlKGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2RlU3RyaW5nID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmVzc2VkS2V5ID0gZS5rZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlIHByZXNzZWQga2V5IGlzIGEgbnVtYmVyIG9yIGFuIGFscGhhYmV0IChsZXR0ZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNOdW1iZXIgPSAvXlxcZCQvLnRlc3QoIHByZXNzZWRLZXkgKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0FscGhhYmV0ID0gL15bYS16QS1aXSQvLnRlc3QoIHByZXNzZWRLZXkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBpc051bWJlciB8fCBpc0FscGhhYmV0ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBiYXJjb2RlU3RyaW5nICs9IHByZXNzZWRLZXk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBjb25zdCBwcm9kdWN0cyA9IHRoaXMucHJvcHMucHJvZHVjdHMubGlzdDtcclxuXHJcbiAgICAgICAgY29uc3QgY2lkID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2lkICE9IHVuZGVmaW5lZCA/ICggdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2lkID09ICdhbGwnID8gMCA6IHRoaXMucHJvcHMubWF0Y2gucGFyYW1zLmNpZCApIDogMDtcclxuXHJcbiAgICAgICAgaWYgKCBwcm9kdWN0cy5sZW5ndGggJiYgdGhpcy5zdGF0ZS5wcm9kdWN0c0xvYWRlZCAmJiAoIGNpZCAhPSB0aGlzLnN0YXRlLmNpZCB8fCAhIHRoaXMuc3RhdGUuY2F0ZWdvcnlQcm9kdWN0c0xvYWRlZCApICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIGNpZCAgICAgICAgICAgICAgICAgICA6IGNpZCxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5UHJvZHVjdHNMb2FkZWQ6IHRydWVcclxuICAgICAgICAgICAgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5Mb2FkQ2F0ZWdvcnlQcm9kdWN0cyggY2lkLCBwcm9kdWN0cyApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlVmFyaWF0aW9uR3JpZCA9IChwcm9kdWN0ID0ge30pID0+IHtcclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUuc2hvd1ZhcmlhdGlvbkdyaWQgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgc2hvd1ZhcmlhdGlvbkdyaWQgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgdmFyaWF0aW9uR3JpZFByb2R1Y3Q6IHt9LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzICA6IHt9LFxyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBzaG93VmFyaWF0aW9uR3JpZCAgIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHZhcmlhdGlvbkdyaWRQcm9kdWN0OiBwcm9kdWN0LFxyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzICA6IHByb2R1Y3QuYXR0cmlidXRlX2tleXMgPyBwcm9kdWN0LmF0dHJpYnV0ZV9rZXlzLnJlZHVjZSgoYWNjLGN1cnIpID0+IChhY2NbY3Vycl0gPSAnJyxhY2MpLHt9KToge30sXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVmFyaWF0aW9uR3JpZFJlc2V0ID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBzaG93VmFyaWF0aW9uR3JpZCAgIDogdHJ1ZSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzICA6IHRoaXMuc3RhdGUudmFyaWF0aW9uR3JpZFByb2R1Y3QuYXR0cmlidXRlX2tleXMgPyB0aGlzLnN0YXRlLnZhcmlhdGlvbkdyaWRQcm9kdWN0LmF0dHJpYnV0ZV9rZXlzLnJlZHVjZSgoYWNjLGN1cnIpID0+IChhY2NbY3Vycl0gPSAnJyxhY2MpLHt9KToge30sXHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZVNob3dXZWlnaHRQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgIHNob3dXZWlnaHRQb3B1cDogISB0aGlzLnN0YXRlLnNob3dXZWlnaHRQb3B1cCxcclxuICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlV2VpZ2h0SW5wdXQgPSBlID0+IHtcclxuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgIGlmICggZS53aGljaCA9PSAxMyAmJiBlLnRhcmdldC52YWx1ZSApIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVXZWlnaHRTdWJtaXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICB3ZWlnaHRJbnB1dDogZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXZWlnaHRTdWJtaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLndlaWdodElucHV0ICkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvZ2dsZVNob3dXZWlnaHRQb3B1cCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZFRvQ2FydCh0aGlzLnN0YXRlLndlaWdodFByb2R1Y3QudmFyaWF0aW9uX2lkID8gdGhpcy5zdGF0ZS53ZWlnaHRQcm9kdWN0LnZhcmlhdGlvbl9pZCA6IHRoaXMuc3RhdGUud2VpZ2h0UHJvZHVjdC5wcm9kdWN0X2lkLCAxLCBmYWxzZSwgdGhpcy5zdGF0ZS53ZWlnaHRJbnB1dCk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN0b3JlLmFkZE5vdGlmaWNhdGlvbih7XHJcbiAgICAgICAgICAgICAgICB0aXRsZSAgICA6IF9fKCAnRXJyb3InLCAnZGR3Yy1tdWx0aXBvcycgKSxcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2UgIDogX18oICdFbnRlciB2YWxpZCB3ZWlnaHQuJywgJ2Rkd2MtbXVsdGlwb3MnICksXHJcbiAgICAgICAgICAgICAgICB0eXBlICAgICA6ICdkYW5nZXInLFxyXG4gICAgICAgICAgICAgICAgaW5zZXJ0ICAgOiAndG9wJyxcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogJ3RvcC1yaWdodCcsXHJcbiAgICAgICAgICAgICAgICBkaXNtaXNzICA6IHtcclxuICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbiAgICA6IDMwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJXZWlnaHRQb3B1cCA9IHByb2R1Y3QgPT4ge1xyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZS5zaG93V2VpZ2h0UG9wdXAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwQ29udGVudCA9IChcclxuICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+eyBfXyggJ0VudGVyIHdlaWdodCBmb3IgdGhlIHB1cmNoYXNlLicsICdkZHdjLW11bHRpcG9zJyApIH08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPnsgc3ByaW50ZiggX18oICclcyAoJXMgJXMpID0gJXMnLCAnZGR3Yy1tdWx0aXBvcycgKSwgcHJvZHVjdC50aXRsZSwgcHJvZHVjdC53ZWlnaHQsIGRkd2Nwb3NQT1NPYmoud2VpZ2h0X3VuaXQsIGRkd2Nwb3NQcmljZSggcHJvZHVjdC5zYWxlX3ByaWNlICkgKSB9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMC4wMVwiIHN0ZXA9XCIwLjAxXCIgb25LZXlVcD17ZSA9PiB0aGlzLmhhbmRsZVdlaWdodElucHV0KGUpfSBwbGFjZWhvbGRlcj17IF9fKCAnRW50ZXIgV2VpZ2h0JywgJ2Rkd2MtbXVsdGlwb3MnICkgfSBhdXRvRm9jdXMgLz5cclxuICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB2YXJpYXRpb25Qb3B1cFByb3BzID0ge1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlT3ZlcmxheTogdGhpcy5oYW5kbGVUb2dnbGVTaG93V2VpZ2h0UG9wdXAsXHJcbiAgICAgICAgICAgICAgICBwb3B1cENvbnRlbnQgOiBwb3B1cENvbnRlbnQsXHJcbiAgICAgICAgICAgICAgICBub3REaXNhYmxlZCAgOiB0aGlzLnN0YXRlLndlaWdodElucHV0LFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlU3VjY2VzczogZSA9PiB0aGlzLmhhbmRsZVdlaWdodFN1Ym1pdCggdGhpcy5zdGF0ZS53ZWlnaHRJbnB1dCwgcHJvZHVjdCApLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FuY2VsIDogdGhpcy5oYW5kbGVUb2dnbGVTaG93V2VpZ2h0UG9wdXAsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFBvcHVwIHsuLi52YXJpYXRpb25Qb3B1cFByb3BzfSAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVQcm9kdWN0U2VhcmNoID0gZSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICBzZWFyY2g6IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgfSApO1xyXG5cclxuICAgICAgICBpZiAoIGFwcGx5RmlsdGVycyggQ0hBTkdFX0RFRkFVTFRfUFJPRFVDVF9TRUFSQ0hfV09SS0ZMT1dfRklMVEVSLCB0cnVlLCBlLCB0aGlzICkgKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuTG9hZFNlYXJjaGVkUHJvZHVjdHMoIGUudGFyZ2V0LnZhbHVlLnRvTG93ZXJDYXNlKCksIHRoaXMucHJvcHMucHJvZHVjdHMgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVG9nZ2xlU2hvd0FsbENhdGVnb3JpZXMgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICBzaG93QWxsQ2F0ZWdvcmllc1BvcHVwOiAhIHRoaXMuc3RhdGUuc2hvd0FsbENhdGVnb3JpZXNQb3B1cFxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVIaWRlQWxsQ2F0ZWdvcmllc1BvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZS5zaG93QWxsQ2F0ZWdvcmllc1BvcHVwICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICBzaG93QWxsQ2F0ZWdvcmllc1BvcHVwOiBmYWxzZVxyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZUJhcmNvZGVQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgIHNob3dCYXJjb2RlUG9wdXA6ICEgdGhpcy5zdGF0ZS5zaG93QmFyY29kZVBvcHVwXHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZUN1c3RvbVByb2R1Y3RQb3B1cCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgIHNob3dDdXN0b21Qcm9kdWN0UG9wdXA6ICEgdGhpcy5zdGF0ZS5zaG93Q3VzdG9tUHJvZHVjdFBvcHVwXHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZU9wZW5DYXNoRHJhd2VyUG9wdXAgPSAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICBzaG93T3BlbkNhc2hEcmF3ZXJQb3B1cDogISB0aGlzLnN0YXRlLnNob3dPcGVuQ2FzaERyYXdlclBvcHVwXHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUJhcmNvZGVJbnB1dCA9IGUgPT4ge1xyXG4gICAgICAgIGlmICggZS53aGljaCA9PSAxMyApIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVBZGRQcm9kdWN0VmlhQmFyY29kZSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgIGJhcmNvZGVWYWx1ZTogZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVPcGVuQ2FzaERyYXdlckFtb3VudElucHV0ID0gZSA9PiB7XHJcbiAgICAgICAgaWYgKCBlLndoaWNoID09IDEzICkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZU9wZW5DYXNoRHJhd2VyQW1vdW50U3VibWl0KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgb3BlbkNhc2hEcmF3ZXJBbW91bnQ6IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgIH0gKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlT3BlbkNhc2hEcmF3ZXJBbW91bnRTdWJtaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYXJncyA9IHtcclxuICAgICAgICAgICAgaW4gICAgICAgOiB0aGlzLnN0YXRlLm9wZW5DYXNoRHJhd2VyQW1vdW50LFxyXG4gICAgICAgICAgICBvdXRsZXRfaWQ6IHRoaXMucHJvcHMub3V0bGV0LmlkLFxyXG4gICAgICAgICAgICBtZXRob2QgICA6ICdvcGVuY2FzaCcsXHJcbiAgICAgICAgICAgIHJlYXNvbiAgIDogX18oICdPcGVuIENhc2ggRHJhd2VyIEFtb3VudCcsICdkZHdjLW11bHRpcG9zJyApXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5zYXZlVHJhbnNhY3Rpb24oIGFyZ3MgKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVRvZ2dsZU9wZW5DYXNoRHJhd2VyUG9wdXAoKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVDdXN0b21Qcm9kdWN0SW5wdXQgPSAoZSwgdHlwZSkgPT4ge1xyXG4gICAgICAgIGlmICggZS53aGljaCA9PSAxMyAmJiB0aGlzLnN0YXRlLmN1c3RvbVByb2R1Y3RBZGRFbmFibGVkICkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZUFkZEN1c3RvbVByb2R1Y3QoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICBbdHlwZV06IGUudGFyZ2V0LnZhbHVlXHJcbiAgICAgICAgICAgIH0sICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5zdGF0ZS5jdXN0b21Qcm9kdWN0TmFtZSAmJiB0aGlzLnN0YXRlLmN1c3RvbVByb2R1Y3RQcmljZSAmJiB0aGlzLnN0YXRlLmN1c3RvbVByb2R1Y3RRdWFudGl0eSApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVByb2R1Y3RBZGRFbmFibGVkOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1c3RvbVByb2R1Y3RBZGRFbmFibGVkOiBmYWxzZVxyXG4gICAgICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBZGRQcm9kdWN0VmlhQmFyY29kZSA9IGUgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAvLyB0aGlzLmhhbmRsZVRvZ2dsZUJhcmNvZGVQb3B1cCgpO1xyXG5cclxuICAgICAgICBjb25zdCBiYXJjb2RlVmFsdWUgPSB0aGlzLnN0YXRlLmJhcmNvZGVWYWx1ZTtcclxuXHJcbiAgICAgICAgdGhpcy5wcm9wcy5nZXRQcm9kdWN0VmlhQmFyY29kZShiYXJjb2RlVmFsdWUpLnRoZW4oIHByb2R1Y3QgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIE9iamVjdC5rZXlzKCBwcm9kdWN0ICkubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkZHdjcG9zUE9TT2JqLmRkd2Nwb3NfY29uZmlndXJhdGlvbi51bml0X3ByaWNlX2VuYWJsZWQgJiYgcHJvZHVjdC53ZWlnaHQgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzaG93V2VpZ2h0UG9wdXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdlaWdodFByb2R1Y3QgIDogcHJvZHVjdCxcclxuICAgICAgICAgICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkVG9DYXJ0KHByb2R1Y3QucHJvZHVjdF9pZCwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdG9yZS5hZGROb3RpZmljYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgICAgIHRpdGxlICAgIDogX18oICdCYXJjb2RlIEVycm9yJywgJ2Rkd2MtbXVsdGlwb3MnICksXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZSAgOiBzcHJpbnRmKCBfXyggJ05vIHByb2R1Y3QgZXhpc3RzIHdpdGggdGhpcyBiYXJjb2RlIFwiJXNcIi4nLCAnZGR3Yy1tdWx0aXBvcycgKSwgYmFyY29kZVZhbHVlICksXHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZSAgICAgOiAnZGFuZ2VyJyxcclxuICAgICAgICAgICAgICAgICAgICBpbnNlcnQgICA6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogJ3RvcC1yaWdodCcsXHJcbiAgICAgICAgICAgICAgICAgICAgZGlzbWlzcyAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uICAgIDogMzAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGF1c2VPbkhvdmVyOiB0cnVlXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgIC8vIGlmICggZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24udW5pdF9wcmljZV9lbmFibGVkICYmIHByb2R1Y3Qud2VpZ2h0ICkge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgLy8gICAgICAgICBzaG93V2VpZ2h0UG9wdXA6IHRydWUsXHJcbiAgICAgICAgLy8gICAgICAgICB3ZWlnaHRQcm9kdWN0ICA6IHByb2R1Y3QsXHJcbiAgICAgICAgLy8gICAgIH0gKTtcclxuICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICB0aGlzLnByb3BzLmdldFByb2R1Y3RWaWFCYXJjb2RlKHRoaXMuc3RhdGUuYmFyY29kZVZhbHVlKTtcclxuICAgICAgICAvLyAgICAgLy8gdGhpcy5wcm9wcy5hZGRUb0NhcnQocHJvZHVjdC5wcm9kdWN0X2lkLCAxKTtcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICBiYXJjb2RlVmFsdWU6ICcnXHJcbiAgICAgICAgfSApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFkZEN1c3RvbVByb2R1Y3QgPSAoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgdGF4ZXMgPSB0aGlzLnByb3BzLnRheGVzO1xyXG5cclxuICAgICAgICBsZXQgY3VzdG9tUHJvZHVjdFByaWNlICAgID0gdGhpcy5zdGF0ZS5jdXN0b21Qcm9kdWN0UHJpY2U7XHJcbiAgICAgICAgbGV0IGN1c3RvbVByb2R1Y3RRdWFudGl0eSA9IHBhcnNlSW50KCB0aGlzLnN0YXRlLmN1c3RvbVByb2R1Y3RRdWFudGl0eSApO1xyXG4gICAgICAgIGxldCBwcm9kdWN0X3RheCAgICAgICAgICAgPSAwO1xyXG5cclxuICAgICAgICBpZiAoIGRkd2Nwb3NQT1NPYmoudGF4X2VuYWJsZWQgPT0gJ3llcycgKSB7XHJcbiAgICAgICAgICAgIGlmICggZGR3Y3Bvc1BPU09iai50YXhfZGlzcGxheV9jYXJ0ID09ICdleGNsJyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggZGR3Y3Bvc1BPU09iai50YXhfdHlwZSA9PSAneWVzJyApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdGF4X3JhdGUgPSAwO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICB0YXhlcy5mb3JFYWNoKCB0YXggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGF4LnJhdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRheF9yYXRlID0gdGF4X3JhdGUgKyB0YXgucmF0ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVhbF9wcmljZSAgID0gKGN1c3RvbVByb2R1Y3RQcmljZSAqIDEwMCkgLyAoMTAwICsgdGF4X3JhdGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByb2R1Y3RfdGF4ICAgICAgICA9IGN1c3RvbVByb2R1Y3RQcmljZSAtIHJlYWxfcHJpY2U7XHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJvZHVjdFByaWNlID0gcmVhbF9wcmljZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGF4ZXMuZm9yRWFjaCggdGF4ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRheC5yYXRlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9kdWN0X3RheCA9IHByb2R1Y3RfdGF4ICsgKCBjdXN0b21Qcm9kdWN0UHJpY2UgKiB0YXgucmF0ZSAvIDEwMCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBkZHdjcG9zUE9TT2JqLnRheF90eXBlICE9ICd5ZXMnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRheGVzLmZvckVhY2goIHRheCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0YXgucmF0ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF90YXggPSBwcm9kdWN0X3RheCArICggY3VzdG9tUHJvZHVjdFByaWNlICogdGF4LnJhdGUgLyAxMDAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3VzdG9tUHJvZHVjdFByaWNlID0gcGFyc2VGbG9hdChwYXJzZUZsb2F0KGN1c3RvbVByb2R1Y3RQcmljZSkgKyBwYXJzZUZsb2F0KHByb2R1Y3RfdGF4KSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJvZHVjdF90YXggICAgICAgID0gMDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5oYW5kbGVUb2dnbGVDdXN0b21Qcm9kdWN0UG9wdXAoKTtcclxuICAgICAgICBjb25zdCBwcm9kdWN0ID0ge1xyXG4gICAgICAgICAgICB0aXRsZTogdGhpcy5zdGF0ZS5jdXN0b21Qcm9kdWN0TmFtZSxcclxuICAgICAgICAgICAgcHJpY2U6IGN1c3RvbVByb2R1Y3RQcmljZSxcclxuICAgICAgICAgICAgdGF4ICA6IHByb2R1Y3RfdGF4ICogY3VzdG9tUHJvZHVjdFF1YW50aXR5LFxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHRoaXMucHJvcHMuYWRkVG9DYXJ0KCBwcm9kdWN0LCBjdXN0b21Qcm9kdWN0UXVhbnRpdHksIHRydWUgKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVWYXJpYXRpb25JRCA9IChhdHRyaWJ1dGVfa2V5LCBhdHRyaWJ1dGVfdmFsdWUsIHByb2R1Y3QpID0+IHtcclxuICAgICAgICBpZiAoIGF0dHJpYnV0ZV92YWx1ZSApIHtcclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRBdHRyaWJ1dGVzID0gdGhpcy5zdGF0ZS5zZWxlY3RlZEF0dHJpYnV0ZXM7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkQXR0cmlidXRlc1thdHRyaWJ1dGVfa2V5XSA9IGF0dHJpYnV0ZV92YWx1ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGF2YWlsYWJsZV92YXJpYXRpb25zID0gcHJvZHVjdC5hdmFpbGFibGVfdmFyaWF0aW9ucztcclxuXHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkQXR0cmlidXRlcyA6IHNlbGVjdGVkQXR0cmlidXRlc1xyXG4gICAgICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzZWxlY3RlZFZhcmlhdGlvbiA9IGF2YWlsYWJsZV92YXJpYXRpb25zLmZpbHRlciggYXZhaWxhYmxlX3ZhcmlhdGlvbiA9PiB0aGlzLmlzQXR0cmlidXRlc01hdGNoKCBhdmFpbGFibGVfdmFyaWF0aW9uLCBzZWxlY3RlZEF0dHJpYnV0ZXMgKSApO1xyXG5cclxuICAgICAgICAgICAgbGV0IHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cIm91dG9mc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICB7X18oICdPdXQgb2YgU3RvY2snLCAnZGR3Yy1tdWx0aXBvcycgKX1cclxuICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdGF0ZVNlbGVjdGVkVmFyaWF0aW9uID0ge307XHJcblxyXG4gICAgICAgICAgICBpZiAoIHNlbGVjdGVkVmFyaWF0aW9uLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlU2VsZWN0ZWRWYXJpYXRpb24gPSBzZWxlY3RlZFZhcmlhdGlvblswXTtcclxuICAgICAgICAgICAgICAgIGlmICggdGhpcy5wcm9wcy5vdXRsZXQuaW52ZW50b3J5X3R5cGUgPT09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hcmsgY2xhc3NOYW1lPVwiaW5zdG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3NwcmludGYoIF9fKCAnSW4gU3RvY2soJXMpJywgJ2Rkd2MtbXVsdGlwb3MnICksIHNlbGVjdGVkVmFyaWF0aW9uWzBdLnN0b2NrICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHNlbGVjdGVkVmFyaWF0aW9uWzBdLnN0b2NrX3N0YXR1cyA9PSAnb25iYWNrb3JkZXInICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFyayBjbGFzc05hbWU9XCJpbnN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge19fKCAnT24gQmFja29yZGVyJywgJ2Rkd2MtbXVsdGlwb3MnICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hcms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBzZWxlY3RlZFZhcmlhdGlvblswXS5zdG9ja19xdWFudGl0eSA+IDAgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcmsgY2xhc3NOYW1lPVwiaW5zdG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3ByaW50ZiggX18oICdJbiBTdG9jayglcyknLCAnZGR3Yy1tdWx0aXBvcycgKSwgc2VsZWN0ZWRWYXJpYXRpb25bMF0uc3RvY2tfcXVhbnRpdHkgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hcms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvY2tIVE1MID0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cImluc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge19fKCAnSW4gU3RvY2snLCAnZGR3Yy1tdWx0aXBvcycgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hcms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFZhcmlhdGlvbiA6IHN0YXRlU2VsZWN0ZWRWYXJpYXRpb24sXHJcbiAgICAgICAgICAgICAgICB2YXJpYXRpb25TdG9ja0hUTUw6IHN0b2NrSFRNTFxyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWYXJpYXRpb246IHt9LFxyXG4gICAgICAgICAgICAgICAgdmFyaWF0aW9uU3RvY2tIVE1MOiAnJ1xyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlzQXR0cmlidXRlc01hdGNoID0gKCBhdmFpbGFibGVfdmFyaWF0aW9uLCBhdHRyaWJ1dGVzICkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHZhcmlhdGlvbl9hdHRyaWJ1dGVzID0gYXZhaWxhYmxlX3ZhcmlhdGlvbi5hdHRyaWJ1dGVzO1xyXG4gICAgICAgIGxldCBtYXRjaCAgICAgICAgICAgICAgICAgID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIGF2YWlsYWJsZV92YXJpYXRpb24uc3RvY2sgPiAwICkge1xyXG4gICAgICAgICAgICBmb3IgKCBsZXQgYXR0cl9uYW1lIGluIHZhcmlhdGlvbl9hdHRyaWJ1dGVzICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCB2YXJpYXRpb25fYXR0cmlidXRlcy5oYXNPd25Qcm9wZXJ0eSggYXR0cl9uYW1lICkgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsMSA9IHZhcmlhdGlvbl9hdHRyaWJ1dGVzWyBhdHRyX25hbWUgXTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2YWwyID0gYXR0cmlidXRlc1sgYXR0cl9uYW1lIF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsMSAhPT0gdW5kZWZpbmVkICYmIHZhbDIgIT09IHVuZGVmaW5lZCAmJiB2YWwxLmxlbmd0aCAhPT0gMCAmJiB2YWwyLmxlbmd0aCAhPT0gMCAmJiB2YWwxICE9PSB2YWwyICkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGlmICggdmFsMSAhPT0gdW5kZWZpbmVkICYmIHZhbDIgIT09IHVuZGVmaW5lZCAmJiB2YWwxICE9PSB2YWwyICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1hdGNoID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuXHRcdHJldHVybiBtYXRjaDtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBZGRHcmlkVmFyaWF0aW9uID0gKHZhcmlhdGlvbiwgcHJvZHVjdCkgPT4ge1xyXG4gICAgICAgIGlmICggZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24udW5pdF9wcmljZV9lbmFibGVkICYmIHZhcmlhdGlvbi53ZWlnaHQgKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgIHNob3dXZWlnaHRQb3B1cDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHdlaWdodFByb2R1Y3QgIDogdmFyaWF0aW9uLFxyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gdGhpcy5wcm9wcy5hZGRUb0NhcnQocHJvZHVjdC5wcm9kdWN0X2lkLCAxKTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5hZGRUb0NhcnQodmFyaWF0aW9uLnZhcmlhdGlvbl9pZCwgMSwgZmFsc2UsICcnLCB0aGlzLnN0YXRlLnNlbGVjdGVkQXR0cmlidXRlcyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnRvZ2dsZVZhcmlhdGlvbkdyaWQoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcmllcyAgICAgICAgICAgICAgPSB0aGlzLnByb3BzLmNhdGVnb3JpZXM7XHJcbiAgICAgICAgY29uc3QgbWFpblByb2R1Y3RzICAgICAgICAgICAgPSB0aGlzLnByb3BzLnByb2R1Y3RzO1xyXG4gICAgICAgIGNvbnN0IGhhdmVPcGVuQ2FzaFRyYW5zYWN0aW9uID0gdGhpcy5wcm9wcy50cmFuc2FjdGlvbnMuZmlsdGVyKCB0cmFuc2FjdGlvbiA9PiB0cmFuc2FjdGlvbi5tZXRob2QgPT09ICdvcGVuY2FzaCcgKS5sZW5ndGg7XHJcbiAgICAgICAgY29uc3Qgc2VhcmNoVGV4dCAgICAgICAgICAgICAgPSBtYWluUHJvZHVjdHMucztcclxuXHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlUZXh0ID0gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2lkICE9IHVuZGVmaW5lZCAmJiB0aGlzLnByb3BzLm1hdGNoLnBhcmFtcy5jaWQgPiAwID8gdGhpcy5wcm9wcy5tYXRjaC5wYXJhbXMuY2lkIDogJyc7XHJcblxyXG4gICAgICAgIGxldCBwcm9kdWN0cyA9IFtdO1xyXG5cclxuICAgICAgICBpZiAoIHNlYXJjaFRleHQpIHtcclxuICAgICAgICAgICAgcHJvZHVjdHMgPSBtYWluUHJvZHVjdHMuc3Byb2R1Y3RzO1xyXG4gICAgICAgIH0gZWxzZSBpZiggY2F0ZWdvcnlUZXh0ICkge1xyXG4gICAgICAgICAgICBwcm9kdWN0cyA9IG1haW5Qcm9kdWN0cy5jcHJvZHVjdHM7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvZHVjdHMgPSBtYWluUHJvZHVjdHMubGlzdDtcclxuXHRcdH1cclxuXHJcbiAgICAgICAgcHJvZHVjdHMuc29ydCgoYSxiKSA9PiAoYS50aXRsZSA+IGIudGl0bGUpID8gMSA6ICgoYi50aXRsZSA+IGEudGl0bGUpID8gLTEgOiAwKSk7XHJcblxyXG4gICAgICAgIHByb2R1Y3RzID0gYXBwbHlGaWx0ZXJzKCAnZGR3Y3Bvc19tb2RpZnlfZGlzcGxheWluZ19wcm9kdWN0cycsIHByb2R1Y3RzLCB0aGlzICk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnLmRkd2Nwb3MtcHJvZHVjdHMtdGFiLXdyYXBwZXInICk7XHJcblxyXG4gICAgICAgIGxldCBjQyA9IDY7XHJcblx0XHRsZXQgc1cgPSBlbGVtZW50ID8gZWxlbWVudC5vZmZzZXRXaWR0aCA6IDEwMDA7XHJcblxyXG4gICAgICAgIGlmICggd2luZG93LnNjcmVlbi53aWR0aCA8IDc2OCApIHtcclxuICAgICAgICAgICAgc1cgPSB3aW5kb3cuc2NyZWVuLndpZHRoO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgY2F0ZWdvcnlFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJy5kZHdjcG9zLWNhdGVnb3J5LXdyYXBwZXInICk7XHJcblxyXG4gICAgICAgIGxldCBjYXRlZ29yaWVzQ2FyZHNMZW5ndGggPSBjYXRlZ29yeUVsZW1lbnQgPyBjYXRlZ29yeUVsZW1lbnQub2Zmc2V0V2lkdGggLSAxMCA6IDA7XHJcblxyXG4gICAgICAgIGNhdGVnb3JpZXNDYXJkc0xlbmd0aCA9IE1hdGguZmxvb3IoIGNhdGVnb3JpZXNDYXJkc0xlbmd0aCAvIDEwMCApO1xyXG5cclxuICAgICAgICBsZXQgcHJvZHVjdFJvd0hlaWdodCA9IDEzNDtcclxuICAgICAgICBsZXQgY1cgPSAyNjA7XHJcbiAgICAgICAgY29uc3Qgd0ggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgaWYgKCAnaW1hZ2VfdG9wJyA9PT0gZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24ucHJvZHVjdF9sYXlvdXQgKSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RSb3dIZWlnaHQgPSAyNjU7XHJcbiAgICAgICAgICAgIGNXID0gMTUwO1xyXG5cclxuICAgICAgICAgICAgaWYgKCB3SCA+PSAyMzAwICkge1xyXG4gICAgICAgICAgICAgICAgY0MgPSA5O1xyXG4gICAgICAgICAgICAgICAgY1cgPSBzVy85LjExO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB3SCA+PSAyMTAwICYmIHdIIDwgMjMwMCApIHtcclxuICAgICAgICAgICAgICAgIGNDID0gODtcclxuICAgICAgICAgICAgICAgIGNXID0gc1cvOC4xMTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggd0ggPj0gMTcwMCAmJiB3SCA8IDIxMDAgKSB7XHJcbiAgICAgICAgICAgICAgICBjQyA9IDc7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzcuMTU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHdIID49IDE1NTAgJiYgd0ggPCAxNzAwICkge1xyXG4gICAgICAgICAgICAgICAgY0MgPSA2O1xyXG4gICAgICAgICAgICAgICAgY1cgPSBzVy82LjE7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHdIID4gMTMwMCAmJiB3SCA8IDE1NTAgKSB7XHJcbiAgICAgICAgICAgICAgICBjQyA9IDU7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzUuMTA7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHdIID4gMTAyNCAmJiB3SCA8PSAxMzAwICkge1xyXG4gICAgICAgICAgICAgICAgY0MgPSA0O1xyXG4gICAgICAgICAgICAgICAgY1cgPSBzVy80O1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB3SCA+IDY1MCAmJiB3SCA8IDEwMjQgKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0Um93SGVpZ2h0ID0gMzAwO1xyXG5cclxuICAgICAgICAgICAgICAgIGNDID0gNDtcclxuICAgICAgICAgICAgICAgIGNXID0gc1cvNDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggd0ggPiA0NDAgJiYgd0ggPD0gNjUwICkge1xyXG4gICAgICAgICAgICAgICAgcHJvZHVjdFJvd0hlaWdodCA9IDMwMDtcclxuXHJcbiAgICAgICAgICAgICAgICBjQyA9IDM7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzMuMDk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0Um93SGVpZ2h0ID0gMzAwO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIGNDID0gMztcclxuICAgICAgICAgICAgICAgIC8vIGNXID0gc1cvMy4wOTtcclxuICAgICAgICAgICAgICAgIGNDID0gMjtcclxuICAgICAgICAgICAgICAgIGNXID0gc1cvMi4wOTtcclxuICAgICAgICAgICAgICAgIC8vIGNXID0gc1cvMi4wOTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggd0ggPj0gMTYwMCApIHtcclxuICAgICAgICAgICAgICAgIGNDID0gNjtcclxuICAgICAgICAgICAgICAgIGNXID0gc1cvNjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICggd0ggPj0gMTU1MCAmJiB3SCA8IDE2MDAgKSB7XHJcbiAgICAgICAgICAgICAgICBjQyA9IDU7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzU7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHdIID4gMTMwMCAmJiB3SCA8IDE1NTAgKSB7XHJcbiAgICAgICAgICAgICAgICBjQyA9IDQ7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzQuMDk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHdIID4gMTAyNCAmJiB3SCA8IDEzMDEgKSB7XHJcbiAgICAgICAgICAgICAgICBjQyA9IDM7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzM7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjQyA9IDI7XHJcbiAgICAgICAgICAgICAgICBjVyA9IHNXLzIuMDc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwQSA9IFtdO1xyXG5cdFx0bGV0IGlpID0gMTtcclxuXHRcdGxldCBqaiA9IDA7XHJcblx0XHRsZXQgY1I7XHJcblxyXG4gICAgICAgIHByb2R1Y3RzLmZvckVhY2goIChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICBjUiA9IGNDICsgMTtcclxuXHRcdFx0aWYgKCBpaSAlIGNSID09IDAgKSB7XHJcblx0XHRcdFx0aWkgPSAxO1xyXG5cdFx0XHRcdGpqKys7XHJcblx0XHRcdH1cclxuXHRcdFx0aWYgKCBBcnJheS5pc0FycmF5KHBBW2pqXSkgJiYgcEFbampdLmxlbmd0aCApIHtcclxuXHRcdFx0XHRwQVtqal0ucHVzaChpdGVtKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRwQVtqal0gPSBbaXRlbV07XHJcblx0XHRcdH1cclxuXHRcdFx0aWkrKztcclxuXHRcdH0pO1xyXG5cclxuICAgICAgICBjb25zdCBDZWxsID0gKHsgY29sdW1uSW5kZXgsIHJvd0luZGV4LCBzdHlsZSB9KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICggdW5kZWZpbmVkICE9IHBBW3Jvd0luZGV4XVtjb2x1bW5JbmRleF0gKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXZcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbkluZGV4ICUgMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyByb3dJbmRleCAlIDIgPT09IDBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdkZHdjcG9zLWdyaWQtaXRlbS1vZGQnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnZGR3Y3Bvcy1ncmlkLWl0ZW0tZXZlbidcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcm93SW5kZXggJSAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAnZGR3Y3Bvcy1ncmlkLWl0ZW0tb2RkJ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ2Rkd2Nwb3MtZ3JpZC1pdGVtLWV2ZW4nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPExhenlMb2FkIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25jZT17dHJ1ZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17Y29sdW1uSW5kZXh9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvdmVyZmxvd1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsyMDB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQcm9kdWN0IGtleT17Y29sdW1uSW5kZXh9IHByb2R1Y3Q9e3BBW3Jvd0luZGV4XVtjb2x1bW5JbmRleF19IG91dGxldD17dGhpcy5wcm9wcy5vdXRsZXR9IHRvZ2dsZVZhcmlhdGlvbkdyaWQ9e3RoaXMudG9nZ2xlVmFyaWF0aW9uR3JpZH0gbm90aWZpY2F0aW9uPXt0aGlzLnByb3BzLm5vdGlmaWNhdGlvbn0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MYXp5TG9hZD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGxldCBhbGxDYXRlZ29yeUNsYXNzID0gJ2Rkd2Nwb3MtY2F0ZWdvcnktY2FyZCc7XHJcblxyXG4gICAgICAgIGlmICggMCA9PSB0aGlzLnN0YXRlLmNpZCApIHtcclxuICAgICAgICAgICAgYWxsQ2F0ZWdvcnlDbGFzcyArPSAnIGRkd2Nwb3MtY2F0ZWdvcnktYWN0aXZlJztcclxuXHRcdH1cclxuXHJcbiAgICAgICAgbGV0IGNhdGVnb3JpZXNIVE1MICAgICAgICAgICAgID0gW107XHJcbiAgICAgICAgbGV0IHZpZXdBbGxDYXRlZ29yaWVzSFRNTCAgICAgID0gJyc7XHJcbiAgICAgICAgbGV0IHNob3dBbGxDYXRlZ29yaWVzUG9wdXBIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGlmICggY2F0ZWdvcmllcy5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgIGNhdGVnb3JpZXNIVE1MLnB1c2goIDxMaW5rIGtleT1cImFsbFwiIGNsYXNzTmFtZT17YWxsQ2F0ZWdvcnlDbGFzc30gb25DbGljaz17dGhpcy5oYW5kbGVIaWRlQWxsQ2F0ZWdvcmllc1BvcHVwfSB0bz17YCR7ZGR3Y3Bvc1BPU09iai5zaXRlVXJsfS8ke2Rkd2Nwb3NQT1NPYmouZGR3Y3Bvc19jb25maWd1cmF0aW9uLmVuZHBvaW50fS9jYXRlZ29yeS9hbGxgfT5cclxuICAgICAgICAgICAgICAgIDxEYXRhYmFzZU91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgICA8cD57IF9fKCAnQWxsJywgJ2Rkd2MtbXVsdGlwb3MnICkgfTwvcD5cclxuICAgICAgICAgICAgPC9MaW5rPiApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcmllc1RlbXBIVE1MID0gY2F0ZWdvcmllcy5tYXAoICh2YWwsIGkpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjYXRlZ29yeUNsYXNzID0gJ2Rkd2Nwb3MtY2F0ZWdvcnktY2FyZCc7XHJcbiAgICAgICAgICAgICAgICBpZiggdmFsLmlkID09IHRoaXMuc3RhdGUuY2lkICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhdGVnb3J5Q2xhc3MgKz0gJyBkZHdjcG9zLWNhdGVnb3J5LWFjdGl2ZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuKFxyXG4gICAgICAgICAgICAgICAgICAgIDxMaW5rIGtleT17aX0gY2xhc3NOYW1lPXtjYXRlZ29yeUNsYXNzfSBvbkNsaWNrPXt0aGlzLmhhbmRsZUhpZGVBbGxDYXRlZ29yaWVzUG9wdXB9IHRvPXtgJHtkZHdjcG9zUE9TT2JqLnNpdGVVcmx9LyR7ZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24uZW5kcG9pbnR9L2NhdGVnb3J5LyR7dmFsLmlkfWB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7dmFsLmltYWdlID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPXt2YWwuaW1hZ2V9IGFsdD17dmFsLm5hbWV9IHdpZHRoPVwiMjRcIiBoZWlnaHQ9XCIyNFwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIHRpdGxlPXt2YWwubmFtZX0+e3ZhbC5uYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L0xpbms+XHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNhdGVnb3JpZXNIVE1MID0gY2F0ZWdvcmllc0hUTUwuY29uY2F0KGNhdGVnb3JpZXNUZW1wSFRNTCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoIGNhdGVnb3JpZXNDYXJkc0xlbmd0aCA8IGNhdGVnb3JpZXNIVE1MLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgIHZpZXdBbGxDYXRlZ29yaWVzSFRNTCA9IDxMaW5rIGNsYXNzTmFtZT1cImRkd2Nwb3MtY2F0ZWdvcnktY2FyZFwiIHRvPVwiI1wiIG9uQ2xpY2s9e3RoaXMuaGFuZGxlVG9nZ2xlU2hvd0FsbENhdGVnb3JpZXN9PlxyXG4gICAgICAgICAgICAgICAgICAgIDxBcHBzdG9yZU91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+eyBfXyggJ1ZpZXcgQWxsJywgJ2Rkd2MtbXVsdGlwb3MnICkgfTwvcD5cclxuICAgICAgICAgICAgICAgIDwvTGluaz5cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuc3RhdGUuc2hvd0FsbENhdGVnb3JpZXNQb3B1cCApIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93QWxsQ2F0ZWdvcmllc1BvcHVwSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZHdjcG9zLXBvcHVwLW92ZXJsYXlcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVRvZ2dsZVNob3dBbGxDYXRlZ29yaWVzfT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1hbGwtY2F0ZWdvcmllcy1wb3B1cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1hbGwtY2F0ZWdvcmllcy1wb3B1cC1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMj57X18oICdBbGwgQ2F0ZWdvcmllcycsICdkZHdjLW11bHRpcG9zJyApfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Y2F0ZWdvcmllc0hUTUx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yaWVzSFRNTCA9IFsuLi5jYXRlZ29yaWVzSFRNTC5zbGljZSgwLCBjYXRlZ29yaWVzQ2FyZHNMZW5ndGgpXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJhcmNvZGVQb3B1cEhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnNob3dCYXJjb2RlUG9wdXAgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcHVwQ29udGVudCA9IChcclxuICAgICAgICAgICAgICAgIDxGcmFnbWVudD5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+eyBfXyggJ0VudGVyL1NjYW4gQmFyY29kZScsICdkZHdjLW11bHRpcG9zJyApIH08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXtlID0+IHRoaXMuaGFuZGxlQWRkUHJvZHVjdFZpYUJhcmNvZGUoZSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBvbkNoYW5nZT17ZSA9PiB0aGlzLmhhbmRsZUJhcmNvZGVJbnB1dChlKX0gcGxhY2Vob2xkZXI9eyBfXyggJ0VudGVyL1NjYW4gQmFyY29kZScsICdkZHdjLW11bHRpcG9zJyApIH0gdmFsdWU9e3RoaXMuc3RhdGUuYmFyY29kZVZhbHVlfSBhdXRvRm9jdXMgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHA+PGk+e19fKCAnUHJlc3MgZW50ZXIgYWZ0ZXIgZW50ZXJpbmcgYmFyY29kZSB0byBhZGQgcHJvZHVjdHMuJywgJ2Rkd2MtbXVsdGlwb3MnICl9PC9pPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Zvcm0+XHJcbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYmFyY29kZVBvcHVwUHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVPdmVybGF5ICAgOiB0aGlzLmhhbmRsZVRvZ2dsZUJhcmNvZGVQb3B1cCxcclxuICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudCAgICA6IHBvcHVwQ29udGVudCxcclxuICAgICAgICAgICAgICAgIG5vdERpc2FibGVkICAgICA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICBoaWRlQ2FuY2VsQnV0dG9uOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgc2luZ2xlQnV0dG9uICAgIDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3NCdXR0b25UZXh0OiA8RnJhZ21lbnQ+PENoZWNrT3V0bGluZWQgLz57IF9fKCAnRG9uZScsICdkZHdjLW11bHRpcG9zJyApIH08L0ZyYWdtZW50PixcclxuICAgICAgICAgICAgICAgIGhhbmRsZVN1Y2Nlc3MgICA6IHRoaXMuaGFuZGxlVG9nZ2xlQmFyY29kZVBvcHVwLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FuY2VsICAgIDogdGhpcy5oYW5kbGVUb2dnbGVCYXJjb2RlUG9wdXAsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBiYXJjb2RlUG9wdXBIVE1MID0gPFBvcHVwIHsuLi5iYXJjb2RlUG9wdXBQcm9wc30gLz5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBjdXN0b21Qcm9kdWN0UG9wdXBIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZS5zaG93Q3VzdG9tUHJvZHVjdFBvcHVwICkge1xyXG4gICAgICAgICAgICBjb25zdCBwb3B1cENvbnRlbnQgPSAoXHJcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnsgX18oICdDdXN0b20gUHJvZHVjdCBEZXRhaWxzJywgJ2Rkd2MtbXVsdGlwb3MnICkgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgb25LZXlVcD17ZSA9PiB0aGlzLmhhbmRsZUN1c3RvbVByb2R1Y3RJbnB1dChlLCAnY3VzdG9tUHJvZHVjdE5hbWUnKX0gcGxhY2Vob2xkZXI9eyBfXyggJ0VudGVyIFByb2R1Y3QgTmFtZScsICdkZHdjLW11bHRpcG9zJyApIH0gYXV0b0ZvY3VzIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBtaW49XCIwXCIgc3RlcD1cIjAuMDFcIiBvbktleVVwPXtlID0+IHRoaXMuaGFuZGxlQ3VzdG9tUHJvZHVjdElucHV0KGUsICdjdXN0b21Qcm9kdWN0UHJpY2UnKX0gcGxhY2Vob2xkZXI9eyBfXyggJ0VudGVyIFByaWNlJywgJ2Rkd2MtbXVsdGlwb3MnICkgfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMVwiIG9uS2V5VXA9e2UgPT4gdGhpcy5oYW5kbGVDdXN0b21Qcm9kdWN0SW5wdXQoZSwgJ2N1c3RvbVByb2R1Y3RRdWFudGl0eScpfSBwbGFjZWhvbGRlcj17IF9fKCAnRW50ZXIgUXVhbnRpdHknLCAnZGR3Yy1tdWx0aXBvcycgKSB9IC8+XHJcbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY3VzdG9tUHJvZHVjdFBvcHVwUHJvcHMgPSB7XHJcbiAgICAgICAgICAgICAgICBoYW5kbGVPdmVybGF5OiB0aGlzLmhhbmRsZVRvZ2dsZUN1c3RvbVByb2R1Y3RQb3B1cCxcclxuICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudCA6IHBvcHVwQ29udGVudCxcclxuICAgICAgICAgICAgICAgIG5vdERpc2FibGVkICA6IHRoaXMuc3RhdGUuY3VzdG9tUHJvZHVjdEFkZEVuYWJsZWQsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTdWNjZXNzOiB0aGlzLmhhbmRsZUFkZEN1c3RvbVByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVDYW5jZWwgOiB0aGlzLmhhbmRsZVRvZ2dsZUN1c3RvbVByb2R1Y3RQb3B1cCxcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIGN1c3RvbVByb2R1Y3RQb3B1cEhUTUwgPSA8UG9wdXAgey4uLmN1c3RvbVByb2R1Y3RQb3B1cFByb3BzfSAvPlxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IE9wZW5DYXNoRHJhd2VyUG9wdXBIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGlmICggZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24ub3BlbmNhc2hfZHJhd2VyX2VuYWJsZWQgJiYgISBoYXZlT3BlbkNhc2hUcmFuc2FjdGlvbiAmJiB0aGlzLnN0YXRlLnNob3dPcGVuQ2FzaERyYXdlclBvcHVwICkge1xyXG4gICAgICAgICAgICBjb25zdCBwb3B1cENvbnRlbnQgPSAoXHJcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnsgX18oICdPcGVuIENhc2ggRHJhd2VyIEFtb3VudCcsICdkZHdjLW11bHRpcG9zJyApIH08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgbWluPVwiMFwiIHN0ZXA9XCIwLjAxXCIgb25LZXlVcD17ZSA9PiB0aGlzLmhhbmRsZU9wZW5DYXNoRHJhd2VyQW1vdW50SW5wdXQoZSl9IHBsYWNlaG9sZGVyPXsgX18oICdFbnRlciBBbW91bnQnLCAnZGR3Yy1tdWx0aXBvcycgKSB9IGF1dG9Gb2N1cyAvPlxyXG4gICAgICAgICAgICAgICAgPC9GcmFnbWVudD5cclxuICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IE9wZW5DYXNoRHJhd2VyUG9wdXBQcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZU92ZXJsYXk6IHRoaXMuaGFuZGxlVG9nZ2xlT3BlbkNhc2hEcmF3ZXJQb3B1cCxcclxuICAgICAgICAgICAgICAgIHBvcHVwQ29udGVudCA6IHBvcHVwQ29udGVudCxcclxuICAgICAgICAgICAgICAgIG5vdERpc2FibGVkICA6IHRoaXMuc3RhdGUub3BlbkNhc2hEcmF3ZXJBbW91bnQsXHJcbiAgICAgICAgICAgICAgICBoYW5kbGVTdWNjZXNzOiB0aGlzLmhhbmRsZU9wZW5DYXNoRHJhd2VyQW1vdW50U3VibWl0LFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FuY2VsIDogdGhpcy5oYW5kbGVUb2dnbGVPcGVuQ2FzaERyYXdlclBvcHVwLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgT3BlbkNhc2hEcmF3ZXJQb3B1cEhUTUwgPSA8UG9wdXAgey4uLk9wZW5DYXNoRHJhd2VyUG9wdXBQcm9wc30gLz5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBzdHlsZSA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoICEgZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24uY3VzdG9tX3Byb2R1Y3RfZW5hYmxlZCApIHtcclxuICAgICAgICAgICAgc3R5bGUuZ3JpZFRlbXBsYXRlQ29sdW1ucyA9ICc2MCUgbWF4LWNvbnRlbnQgYXV0byc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsZXQgdmFyaWF0aW9uR3JpZEhUTUwgPSBhcHBseUZpbHRlcnMoICdkZHdjcG9zX2N1c3RvbV92YXJpYXRpb25fZ3JpZF9odG1sJywgbnVsbCwgdGhpcyApO1xyXG5cclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUuc2hvd1ZhcmlhdGlvbkdyaWQgJiYgdGhpcy5zdGF0ZS52YXJpYXRpb25HcmlkUHJvZHVjdCAmJiBhcHBseUZpbHRlcnMoICdkZHdjcG9zX3VzZV9kZWZhdWx0X3ZhcmlhdGlvbl9ncmlkJywgdHJ1ZSwgdGhpcyApICkge1xyXG4gICAgICAgICAgICBjb25zdCBwcm9kdWN0ICAgICAgICAgID0gdGhpcy5zdGF0ZS52YXJpYXRpb25HcmlkUHJvZHVjdDtcclxuICAgICAgICAgICAgY29uc3QgYXR0cmlidXRlX2tleXMgICA9IHByb2R1Y3QuYXR0cmlidXRlX2tleXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZV92YWx1ZXMgPSBwcm9kdWN0LmF0dHJpYnV0ZV92YWx1ZXM7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgICAgICAgPSBwcm9kdWN0LmF0dHJpYnV0ZXM7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFyaWF0aW9uT3B0aW9uc0hUTUwgPSBbXTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzaG93QXR0cmlidXRlRmxhZyA9IDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsQXR0cmlidXRlcyA9IGF0dHJpYnV0ZV9rZXlzLmxlbmd0aDtcclxuICAgICAgICAgICAgdmFyaWF0aW9uT3B0aW9uc0hUTUwgPSBhdHRyaWJ1dGVfa2V5cy5tYXAoIChhdHRyaWJ1dGVfa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZEF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0gPyBPYmplY3QudmFsdWVzKGF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0pIDogW107XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLnN0YXRlLnNlbGVjdGVkQXR0cmlidXRlc1thdHRyaWJ1dGVfa2V5XSApIHtcclxuICAgICAgICAgICAgICAgICAgICArK3Nob3dBdHRyaWJ1dGVGbGFnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHNob3dBdHRyaWJ1dGVGbGFnID49IHRvdGFsQXR0cmlidXRlcyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2hvd0F0dHJpYnV0ZUZsYWcgPSB0b3RhbEF0dHJpYnV0ZXMgLSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIGV4aXN0ZWRBdHRyaWJ1dGUgJiYgZXhpc3RlZEF0dHJpYnV0ZS5sZW5ndGggJiYgaW5kZXggPT09IHNob3dBdHRyaWJ1dGVGbGFnICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9wdGlvbnMgPSBleGlzdGVkQXR0cmlidXRlLm1hcCggKGF0dHJpYnV0ZV92YWx1ZSwgaSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxlY3RlZEF0dHJpYnV0ZXMgPSB7Li4udGhpcy5zdGF0ZS5zZWxlY3RlZEF0dHJpYnV0ZXN9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0gPSBhdHRyaWJ1dGVfdmFsdWUuc2x1ZztcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkVmFyaWF0aW9uID0gcHJvZHVjdC5hdmFpbGFibGVfdmFyaWF0aW9ucy5maWx0ZXIoIGF2YWlsYWJsZV92YXJpYXRpb24gPT4gdGhpcy5pc0F0dHJpYnV0ZXNNYXRjaCggYXZhaWxhYmxlX3ZhcmlhdGlvbiwgc2VsZWN0ZWRBdHRyaWJ1dGVzICkgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKCB0b3RhbEF0dHJpYnV0ZXMgLSAxICkgPT09IGluZGV4ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhcmlhdGlvblByb2R1Y3QgPSB7fTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlbGVjdGVkVmFyaWF0aW9uLmxlbmd0aCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXJpYXRpb25Qcm9kdWN0ID0gc2VsZWN0ZWRWYXJpYXRpb25bMF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cIm91dG9mc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfXyggJ091dCBvZiBTdG9jaycsICdkZHdjLW11bHRpcG9zJyApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L21hcms+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnByb3BzLm91dGxldC5pbnZlbnRvcnlfdHlwZSA9PT0gJ2N1c3RvbScgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cImluc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c3ByaW50ZiggX18oICdJbiBTdG9jayglcyknLCAnZGR3Yy1tdWx0aXBvcycgKSwgdmFyaWF0aW9uUHJvZHVjdC5zdG9jayApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXJrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggdmFyaWF0aW9uUHJvZHVjdC5zdG9ja19zdGF0dXMgPT0gJ29uYmFja29yZGVyJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFyayBjbGFzc05hbWU9XCJpbnN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfXyggJ09uIEJhY2tvcmRlcicsICdkZHdjLW11bHRpcG9zJyApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHZhcmlhdGlvblByb2R1Y3Quc3RvY2tfcXVhbnRpdHkgPiAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcmsgY2xhc3NOYW1lPVwiaW5zdG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NwcmludGYoIF9fKCAnSW4gU3RvY2soJXMpJywgJ2Rkd2MtbXVsdGlwb3MnICksIHZhcmlhdGlvblByb2R1Y3Quc3RvY2tfcXVhbnRpdHkgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXJrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcmsgY2xhc3NOYW1lPVwiaW5zdG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge19fKCAnSW4gU3RvY2snLCAnZGR3Yy1tdWx0aXBvcycgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXJrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBwcm9kdWN0Q2FyZENsYXNzID0gJ2ltYWdlLWxlZnQnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICdpbWFnZV90b3AnID09PSBkZHdjcG9zUE9TT2JqLmRkd2Nwb3NfY29uZmlndXJhdGlvbi5wcm9kdWN0X2xheW91dCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZHVjdENhcmRDbGFzcyA9ICdpbWFnZS10b3AnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2l9IGNsYXNzTmFtZT17ICdkZHdjcG9zLXByb2R1Y3QtY2FyZCBkZHdjcG9zLXByb2R1Y3QtJyArIHByb2R1Y3RDYXJkQ2xhc3MgfSBvbkNsaWNrPXtlID0+IHRoaXMuaGFuZGxlQWRkR3JpZFZhcmlhdGlvbih2YXJpYXRpb25Qcm9kdWN0LCBwcm9kdWN0KX0gPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZHdjcG9zLXByb2R1Y3QtdGh1bWJuYWlsXCIgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e3sgX19odG1sOiB2YXJpYXRpb25Qcm9kdWN0LmltYWdlIH19PjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZHdjcG9zLXByb2R1Y3QtZGV0YWlsc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMiB0aXRsZT17UmVhY3RIdG1sUGFyc2VyKGF0dHJpYnV0ZV92YWx1ZS5uYW1lKX0+e1JlYWN0SHRtbFBhcnNlcihhdHRyaWJ1dGVfdmFsdWUubmFtZSl9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57UmVhY3RIdG1sUGFyc2VyKHZhcmlhdGlvblByb2R1Y3QucHJpY2VfaHRtbCl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzdG9ja0hUTUx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBrZXk9e2l9IG9uQ2xpY2s9e2UgPT4gdGhpcy5oYW5kbGVWYXJpYXRpb25JRChhdHRyaWJ1dGVfa2V5LCBhdHRyaWJ1dGVfdmFsdWUuc2x1ZywgcHJvZHVjdCl9IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5zZWxlY3RlZEF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0gPT0gYXR0cmlidXRlX3ZhbHVlLnNsdWcgPyAnZGR3Y3Bvcy12YXJpYXRpb24tYXR0cmlidXRlIGRkd2Nwb3Mtc2VsZWN0ZWQtb3B0aW9ucycgOiAnZGR3Y3Bvcy12YXJpYXRpb24tYXR0cmlidXRlJ30+e2F0dHJpYnV0ZV92YWx1ZS5uYW1lfTwvcD47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBrZXk9e2F0dHJpYnV0ZV9rZXl9IGNsYXNzTmFtZT1cImRkd2Nwb3MtdmFyaWF0aW9uLW9wdGlvbnMtZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDM+e2F0dHJpYnV0ZV92YWx1ZXNbYXR0cmlidXRlX2tleV19PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF9fKCAnQ2hvb3NlIGFuIG9wdGlvbicsICdkZHdjLW11bHRpcG9zJyApIH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy12YXJpYXRpb24tb3B0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtvcHRpb25zfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvRnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIHRoaXMuc3RhdGUuc2VsZWN0ZWRBdHRyaWJ1dGVzW2F0dHJpYnV0ZV9rZXldICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQXR0cmlidXRlID0gZXhpc3RlZEF0dHJpYnV0ZS5maWx0ZXIoIGF0dHJpYnV0ZV92YWx1ZSA9PiB0aGlzLnN0YXRlLnNlbGVjdGVkQXR0cmlidXRlc1thdHRyaWJ1dGVfa2V5XSA9PT0gYXR0cmlidXRlX3ZhbHVlLnNsdWcgKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzZWxlY3RlZEF0dHJpYnV0ZS5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGtleT17YXR0cmlidXRlX2tleX0gY2xhc3NOYW1lPVwiZGR3Y3Bvcy12YXJpYXRpb24tb3B0aW9ucy1ncm91cFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57YXR0cmlidXRlX3ZhbHVlc1thdHRyaWJ1dGVfa2V5XX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwPntzZWxlY3RlZEF0dHJpYnV0ZVswXS5uYW1lfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgICAgICAgICAgdmFyaWF0aW9uR3JpZEhUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtdmFyaWF0aW9uLWdyaWRcIiBzdHlsZT17YXBwbHlGaWx0ZXJzKCAnZGR3Y3Bvc19tb2RpZnlfc3R5bGVfZm9yX3Byb2R1Y3RzX2xpc3QnLCB0aGlzLnByb3BzLnNldHRpbmdzLmRpc3BsYXlfY2F0ZWdvcnkgPT0gJ2Rpc2FibGVkJyA/IHtoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gOTVweCknfSA6IHtoZWlnaHQ6ICdjYWxjKDEwMHZoIC0gMjE4cHgpJ30sIHRoaXMpfT5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtdmFyaWF0aW9uLWJyZWFkY3J1bWJzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPjxzcGFuIG9uQ2xpY2s9e2UgPT4gdGhpcy50b2dnbGVWYXJpYXRpb25HcmlkKCl9PnsgX18oICdCYWNrJywgJ2Rkd2MtbXVsdGlwb3MnICkgfTwvc3Bhbj4gPFJpZ2h0T3V0bGluZWQgLz4ge3Byb2R1Y3QudGl0bGV9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtaWNvbi1jYXJkXCIgb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZVZhcmlhdGlvbkdyaWRSZXNldCgpfSB0aXRsZT17X18oICdSZXNldCcsICdkZHdjLW11bHRpcG9zJyApfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfXyggJ1Jlc2V0JywgJ2Rkd2MtbXVsdGlwb3MnICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIHt2YXJpYXRpb25PcHRpb25zSFRNTH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZHdjcG9zLXByb2R1Y3RzLXRhYi13cmFwcGVyXCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2V0dGluZ3MuZGlzcGxheV9jYXRlZ29yeSAhPSAnZGlzYWJsZWQnID9cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtY2F0ZWdvcnktd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNhdGVnb3JpZXNIVE1MLmxlbmd0aCA/XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgyPnsgX18oICdTZWxlY3QgQ2F0ZWdvcnknLCAnZGR3Yy1tdWx0aXBvcycgKSB9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtY2F0ZWdvcmllcy1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge2NhdGVnb3JpZXNIVE1MfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dmlld0FsbENhdGVnb3JpZXNIVE1MfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0FsbENhdGVnb3JpZXNQb3B1cEhUTUx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgOiBudWxsIH1cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1zZWFyY2gtd3JhcHBlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj57IF9fKCAnUHJvZHVjdHMnLCAnZGR3Yy1tdWx0aXBvcycgKSB9PC9oMj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZHdjcG9zLXNlYXJjaC1pbnB1dC13cmFwcGVyXCIgc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge2FwcGx5RmlsdGVycyggJ2Rkd2Nwb3NfYWRkX2RpZmZlcmVudF9wcm9kdWN0c19zZWFyY2gnLCBmYWxzZSwgdGhpcyApID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFwcGx5RmlsdGVycyggJ2Rkd2Nwb3NfYWRkX2RpZmZlcmVudF9wcm9kdWN0c19zZWFyY2gnLCBmYWxzZSwgdGhpcyApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3Mtc2VhcmNoLWlucHV0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFNlYXJjaE91dGxpbmVkIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1mb3JtLWNvbnRyb2xcIiB2YWx1ZT17dGhpcy5zdGF0ZS5zZWFyY2h9IHBsYWNlaG9sZGVyPXsgX18oICdTZWFyY2ggUHJvZHVjdCBieSB0aXRsZSwgSUQsIFNLVSBvciBCYXJjb2RlIE51bWJlcicsICdkZHdjLW11bHRpcG9zJyApIH0gb25DaGFuZ2U9eyBlID0+IHRoaXMuaGFuZGxlUHJvZHVjdFNlYXJjaChlKSB9IGF1dG9Db21wbGV0ZT1cIm9mZlwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtaWNvbi1jYXJkIGRkd2Nwb3MtYmFyY29kZS1pY29uXCIgb25DbGljaz17dGhpcy5oYW5kbGVUb2dnbGVCYXJjb2RlUG9wdXB9IHRpdGxlPXtfXyggJ0FkZCBQcm9kdWN0IHZpYSBCYXJjb2RlJywgJ2Rkd2MtbXVsdGlwb3MnICl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEJhcmNvZGVPdXRsaW5lZCAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBkZHdjcG9zUE9TT2JqLmRkd2Nwb3NfY29uZmlndXJhdGlvbi5jdXN0b21fcHJvZHVjdF9lbmFibGVkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1pY29uLWNhcmRcIiBvbkNsaWNrPXt0aGlzLmhhbmRsZVRvZ2dsZUN1c3RvbVByb2R1Y3RQb3B1cH0gdGl0bGU9e19fKCAnQWRkIEN1c3RvbSBQcm9kdWN0JywgJ2Rkd2MtbXVsdGlwb3MnICl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzT3V0bGluZWQgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IG51bGwgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57IHByb2R1Y3RzLmxlbmd0aCArICcgJyArIF9fKCAnUmVzdWx0cycsICdkZHdjLW11bHRpcG9zJyApIH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHtiYXJjb2RlUG9wdXBIVE1MfVxyXG4gICAgICAgICAgICAgICAgICAgIHtjdXN0b21Qcm9kdWN0UG9wdXBIVE1MfVxyXG4gICAgICAgICAgICAgICAgICAgIHtPcGVuQ2FzaERyYXdlclBvcHVwSFRNTH1cclxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJXZWlnaHRQb3B1cCh0aGlzLnN0YXRlLndlaWdodFByb2R1Y3QpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7YXBwbHlGaWx0ZXJzKCAnZGR3Y3Bvc19hZGRfY29udGVudF9hZnRlcl9wcm9kdWN0X3NlYXJjaCcsIG51bGwsIHRoaXMgKX1cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNob3dWYXJpYXRpb25HcmlkID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyaWF0aW9uR3JpZEhUTUxcclxuICAgICAgICAgICAgICAgICAgICA6XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2R1Y3RzLmxlbmd0aCA+IDAgP1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxHcmlkXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRkd2Nwb3MtZ3JpZCBkZHdjcG9zLXByb2R1Y3RzLWxpc3RcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5Db3VudD17Y0N9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoPXtjV31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVpZ2h0PXsxMDAwfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dDb3VudD17cEEubGVuZ3RofVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dIZWlnaHQ9e3Byb2R1Y3RSb3dIZWlnaHR9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoPXtzV31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2FwcGx5RmlsdGVycyggJ2Rkd2Nwb3NfbW9kaWZ5X3N0eWxlX2Zvcl9wcm9kdWN0c19saXN0JywgdGhpcy5wcm9wcy5zZXR0aW5ncy5kaXNwbGF5X2NhdGVnb3J5ID09ICdkaXNhYmxlZCcgPyB7aGVpZ2h0OiAnY2FsYygxMDB2aCAtIDk1cHgpJ30gOiB7aGVpZ2h0OiAnY2FsYygxMDB2aCAtIDIxOHB4KSd9LCB0aGlzKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtDZWxsfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvR3JpZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDpcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1uby1yZXN1bHRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdhcm5pbmdGaWxsZWQgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IF9fKCAnTm8gUHJvZHVjdHMgRm91bmQnLCAnZGR3Yy1tdWx0aXBvcycgKSB9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxufVxyXG5cclxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gc3RhdGUgPT4gKCB7XHJcbiAgICBjYXRlZ29yaWVzICA6IHN0YXRlLmNhdGVnb3JpZXMsXHJcbiAgICBwcm9kdWN0cyAgICA6IHN0YXRlLnByb2R1Y3RzLFxyXG4gICAgdGF4ZXMgICAgICAgOiBzdGF0ZS50YXhlcyxcclxuICAgIHNldHRpbmdzICAgIDogc3RhdGUuc2V0dGluZ3MsXHJcbiAgICB0cmFuc2FjdGlvbnM6IHN0YXRlLnRyYW5zYWN0aW9ucyxcclxufSApO1xyXG5cclxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oIHsgZGlzcGF0Y2ggfSwgYmluZEFjdGlvbkNyZWF0b3JzKHsgZ2V0UHJvZHVjdHMsIGdldENhdGVnb3JpZXMsIGdldEN1c3RvbWVycywgZ2V0Q291bnRyaWVzQW5kU3RhdGVzLCBMb2FkQ2F0ZWdvcnlQcm9kdWN0cywgTG9hZFNlYXJjaGVkUHJvZHVjdHMsIGdldFByb2R1Y3RWaWFCYXJjb2RlLCBhZGRUb0NhcnQsIGdldE9yZGVycywgZ2V0U2V0dGluZ3MsIHNhdmVUcmFuc2FjdGlvbiwgZ2V0VHJhbnNhY3Rpb25zLCBnZXRUYWJsZXMgfSwgZGlzcGF0Y2ggKSApO1xyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KCBtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyApKEhvbWUpO1xyXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50LCBGcmFnbWVudCB9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcclxuaW1wb3J0IHsgYmluZEFjdGlvbkNyZWF0b3JzIH0gZnJvbSAncmVkdXgnO1xyXG5pbXBvcnQgeyBhZGRUb0NhcnQgfSBmcm9tICcuLi8uLi8uLi8uLi9hY3Rpb25zL2NhcnQnO1xyXG5pbXBvcnQgUmVhY3RIdG1sUGFyc2VyIGZyb20gJ3JlYWN0LWh0bWwtcGFyc2VyJztcclxuaW1wb3J0IHsgc3ByaW50ZiwgX18gfSBmcm9tICdAd29yZHByZXNzL2kxOG4nO1xyXG5pbXBvcnQgUG9wdXAgZnJvbSAnLi8uLi8uLi8uLi9wb3B1cC9wb3B1cCc7XHJcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAncmVhY3Qtbm90aWZpY2F0aW9ucy1jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBkZHdjcG9zUHJpY2UgfSBmcm9tICcuLi8uLi8uLi8uLi9jdXJyZW5jeS1mb3JtYXQnO1xyXG5pbXBvcnQgeyBhcHBseUZpbHRlcnMgfSBmcm9tICdAd29yZHByZXNzL2hvb2tzJztcclxuaW1wb3J0IHsgRXhjbGFtYXRpb25DaXJjbGVPdXRsaW5lZCB9IGZyb20gJ0BhbnQtZGVzaWduL2ljb25zJztcclxuXHJcbmV4cG9ydCBjb25zdCBQUk9EVUNUX0FERF9DVVNUT01fSU5GTyAgICAgICAgICAgICAgICA9ICdkZHdjcG9zX2FkZF9jdXN0b21fcHJvZHVjdF9pbmZvJztcclxuZXhwb3J0IGNvbnN0IEFERF9ESUZGRVJFTlRfVkFSSUFUSU9OX09QVElPTlNfRklMVEVSID0gJ2Rkd2Nwb3NfYWRkX2RpZmZlcmVudF92YXJpYXRpb25fb3B0aW9ucyc7XHJcblxyXG5jbGFzcyBQcm9kdWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IGFwcGx5RmlsdGVycyggJ2Rkd2Nwb3NfbW9kaWZ5X3N0YXRlX2luX3Byb2R1Y3RfY29tcG9uZW50Jywge1xyXG4gICAgICAgICAgICBzaG93VmFyaWF0aW9uUG9wdXA6IGZhbHNlLFxyXG4gICAgICAgICAgICBzaG93V2VpZ2h0UG9wdXAgICA6IGZhbHNlLFxyXG4gICAgICAgICAgICB3ZWlnaHRJbnB1dCAgICAgICA6ICcnLFxyXG4gICAgICAgICAgICB3ZWlnaHRQcm9kdWN0ICAgICA6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZXM6IHRoaXMucHJvcHMucHJvZHVjdC5hdHRyaWJ1dGVfa2V5cyA/IHRoaXMucHJvcHMucHJvZHVjdC5hdHRyaWJ1dGVfa2V5cy5yZWR1Y2UoKGFjYyxjdXJyKSA9PiAoYWNjW2N1cnJdID0gJycsYWNjKSx7fSk6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZFZhcmlhdGlvbiA6IHt9LFxyXG4gICAgICAgICAgICB2YXJpYXRpb25TdG9ja0hUTUw6ICcnXHJcbiAgICAgICAgfSwgdGhpcyApO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVRvZ2dsZVNob3dWYXJpYXRpb25Qb3B1cCA9ICgpID0+IHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgIHNob3dWYXJpYXRpb25Qb3B1cDogISB0aGlzLnN0YXRlLnNob3dWYXJpYXRpb25Qb3B1cCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzOiB0aGlzLnByb3BzLnByb2R1Y3QuYXR0cmlidXRlX2tleXMgPyB0aGlzLnByb3BzLnByb2R1Y3QuYXR0cmlidXRlX2tleXMucmVkdWNlKChhY2MsY3VycikgPT4gKGFjY1tjdXJyXSA9ICcnLGFjYykse30pOiB7fSxcclxuICAgICAgICAgICAgc2VsZWN0ZWRWYXJpYXRpb24gOiB7fSxcclxuICAgICAgICB9ICk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVG9nZ2xlU2hvd1dlaWdodFBvcHVwID0gKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgc2hvd1dlaWdodFBvcHVwOiAhIHRoaXMuc3RhdGUuc2hvd1dlaWdodFBvcHVwLFxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVQcm9kdWN0Q2xpY2sgPSBwcm9kdWN0ID0+IHtcclxuICAgICAgICBpZiAoIGFwcGx5RmlsdGVycyggJ2Rkd2Nwb3NfaGFuZGxlX3Byb2R1Y3RfY2xpY2tfY3VzdG9tX2Z1bmN0aW9uYWxpdHknLCBmYWxzZSwgcHJvZHVjdCwgdGhpcyApICkge1xyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKCAndmFyaWFibGUnID09IHByb2R1Y3QudHlwZSApIHtcclxuICAgICAgICAgICAgaWYgKCAnZ3JpZCcgPT09IGRkd2Nwb3NQT1NPYmouZGR3Y3Bvc19jb25maWd1cmF0aW9uLnByb2R1Y3RfdmFyaWF0aW9uX2xheW91dCApIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoaXMucHJvcHMudG9nZ2xlVmFyaWF0aW9uR3JpZCggdmFyaWF0aW9uR3JpZCApO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy50b2dnbGVWYXJpYXRpb25HcmlkKCBwcm9kdWN0ICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoICdwb3B1cCcgPT09IGRkd2Nwb3NQT1NPYmouZGR3Y3Bvc19jb25maWd1cmF0aW9uLnByb2R1Y3RfdmFyaWF0aW9uX2xheW91dCApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgICAgICBzaG93VmFyaWF0aW9uUG9wdXA6IHRydWVcclxuICAgICAgICAgICAgICAgIH0gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICggZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24udW5pdF9wcmljZV9lbmFibGVkICYmIHByb2R1Y3Qud2VpZ2h0ICkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgICAgIHNob3dXZWlnaHRQb3B1cDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgICAgICB3ZWlnaHRQcm9kdWN0ICA6IHByb2R1Y3QsXHJcbiAgICAgICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFkZFRvQ2FydChwcm9kdWN0LnByb2R1Y3RfaWQsIDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFkZFZhcmlhdGlvbiA9ICh2YXJpYXRpb24sIHByb2R1Y3QpID0+IHtcclxuICAgICAgICBpZiAoIGRkd2Nwb3NQT1NPYmouZGR3Y3Bvc19jb25maWd1cmF0aW9uLnVuaXRfcHJpY2VfZW5hYmxlZCAmJiB2YXJpYXRpb24ud2VpZ2h0ICkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICBzaG93V2VpZ2h0UG9wdXA6IHRydWUsXHJcbiAgICAgICAgICAgICAgICB3ZWlnaHRQcm9kdWN0ICA6IHZhcmlhdGlvbixcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIHRoaXMucHJvcHMuYWRkVG9DYXJ0KHByb2R1Y3QucHJvZHVjdF9pZCwgMSk7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMuYWRkVG9DYXJ0KHZhcmlhdGlvbi52YXJpYXRpb25faWQsIDEsIGZhbHNlLCAnJywgdGhpcy5zdGF0ZS5zZWxlY3RlZEF0dHJpYnV0ZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgIHNob3dWYXJpYXRpb25Qb3B1cDogISB0aGlzLnN0YXRlLnNob3dWYXJpYXRpb25Qb3B1cCxcclxuICAgICAgICAgICAgc2VsZWN0ZWRBdHRyaWJ1dGVzOiBwcm9kdWN0LmF0dHJpYnV0ZV9rZXlzID8gcHJvZHVjdC5hdHRyaWJ1dGVfa2V5cy5yZWR1Y2UoKGFjYyxjdXJyKSA9PiAoYWNjW2N1cnJdID0gJycsYWNjKSx7fSk6IHt9LFxyXG4gICAgICAgICAgICBzZWxlY3RlZFZhcmlhdGlvbiA6IHt9LFxyXG4gICAgICAgIH0gKTtcclxuICAgIH1cclxuXHJcbiAgICBpc0F0dHJpYnV0ZXNNYXRjaCA9ICggYXZhaWxhYmxlX3ZhcmlhdGlvbiwgYXR0cmlidXRlcyApID0+IHtcclxuICAgICAgICBjb25zdCB2YXJpYXRpb25fYXR0cmlidXRlcyA9IGF2YWlsYWJsZV92YXJpYXRpb24uYXR0cmlidXRlcztcclxuICAgICAgICBsZXQgbWF0Y2ggICAgICAgICAgICAgICAgICA9IHRydWU7XHJcbiAgICAgICAgaWYgKCBhdmFpbGFibGVfdmFyaWF0aW9uLnN0b2NrID4gMCApIHtcclxuICAgICAgICAgICAgZm9yICggbGV0IGF0dHJfbmFtZSBpbiB2YXJpYXRpb25fYXR0cmlidXRlcyApIHtcclxuICAgICAgICAgICAgICAgIGlmICggdmFyaWF0aW9uX2F0dHJpYnV0ZXMuaGFzT3duUHJvcGVydHkoIGF0dHJfbmFtZSApICkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZhbDEgPSB2YXJpYXRpb25fYXR0cmlidXRlc1sgYXR0cl9uYW1lIF07XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmFsMiA9IGF0dHJpYnV0ZXNbIGF0dHJfbmFtZSBdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbDEgIT09IHVuZGVmaW5lZCAmJiB2YWwyICE9PSB1bmRlZmluZWQgJiYgdmFsMS5sZW5ndGggIT09IDAgJiYgdmFsMi5sZW5ndGggIT09IDAgJiYgdmFsMSAhPT0gdmFsMiApIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoIHZhbDEgIT09IHVuZGVmaW5lZCAmJiB2YWwyICE9PSB1bmRlZmluZWQgJiYgdmFsMSAhPT0gdmFsMiApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2ggPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYXRjaCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcblx0XHRyZXR1cm4gbWF0Y2g7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlVmFyaWF0aW9uSUQgPSAoYXR0cmlidXRlX2tleSwgYXR0cmlidXRlX3ZhbHVlLCBwcm9kdWN0KSA9PiB7XHJcbiAgICAgICAgaWYgKCBhdHRyaWJ1dGVfdmFsdWUgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQXR0cmlidXRlcyA9IHRoaXMuc3RhdGUuc2VsZWN0ZWRBdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0gPSBhdHRyaWJ1dGVfdmFsdWU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhdmFpbGFibGVfdmFyaWF0aW9ucyA9IHByb2R1Y3QuYXZhaWxhYmxlX3ZhcmlhdGlvbnM7XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEF0dHJpYnV0ZXMgOiBzZWxlY3RlZEF0dHJpYnV0ZXNcclxuICAgICAgICAgICAgfSApO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYXJpYXRpb24gPSBhdmFpbGFibGVfdmFyaWF0aW9ucy5maWx0ZXIoIGF2YWlsYWJsZV92YXJpYXRpb24gPT4gdGhpcy5pc0F0dHJpYnV0ZXNNYXRjaCggYXZhaWxhYmxlX3ZhcmlhdGlvbiwgc2VsZWN0ZWRBdHRyaWJ1dGVzICkgKTtcclxuXHJcbiAgICAgICAgICAgIGxldCBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICA8bWFyayBjbGFzc05hbWU9XCJvdXRvZnN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAge19fKCAnT3V0IG9mIFN0b2NrJywgJ2Rkd2MtbXVsdGlwb3MnICl9XHJcbiAgICAgICAgICAgICAgICA8L21hcms+XHJcbiAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICBsZXQgc3RhdGVTZWxlY3RlZFZhcmlhdGlvbiA9IHt9O1xyXG5cclxuICAgICAgICAgICAgaWYgKCBzZWxlY3RlZFZhcmlhdGlvbi5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVNlbGVjdGVkVmFyaWF0aW9uID0gc2VsZWN0ZWRWYXJpYXRpb25bMF07XHJcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMucHJvcHMub3V0bGV0LmludmVudG9yeV90eXBlID09PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cImluc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzcHJpbnRmKCBfXyggJ0luIFN0b2NrKCVzKScsICdkZHdjLW11bHRpcG9zJyApLCBzZWxlY3RlZFZhcmlhdGlvblswXS5zdG9jayApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L21hcms+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBzZWxlY3RlZFZhcmlhdGlvblswXS5zdG9ja19zdGF0dXMgPT0gJ29uYmFja29yZGVyJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3RvY2tIVE1MID0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcmsgY2xhc3NOYW1lPVwiaW5zdG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfXyggJ09uIEJhY2tvcmRlcicsICdkZHdjLW11bHRpcG9zJyApfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXJrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc2VsZWN0ZWRWYXJpYXRpb25bMF0uc3RvY2tfcXVhbnRpdHkgPiAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RvY2tIVE1MID0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cImluc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NwcmludGYoIF9fKCAnSW4gU3RvY2soJXMpJywgJ2Rkd2MtbXVsdGlwb3MnICksIHNlbGVjdGVkVmFyaWF0aW9uWzBdLnN0b2NrX3F1YW50aXR5ICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXJrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFyayBjbGFzc05hbWU9XCJpbnN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfXyggJ0luIFN0b2NrJywgJ2Rkd2MtbXVsdGlwb3MnICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9tYXJrPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSgge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRWYXJpYXRpb24gOiBzdGF0ZVNlbGVjdGVkVmFyaWF0aW9uLFxyXG4gICAgICAgICAgICAgICAgdmFyaWF0aW9uU3RvY2tIVE1MOiBzdG9ja0hUTUxcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkVmFyaWF0aW9uOiB7fSxcclxuICAgICAgICAgICAgICAgIHZhcmlhdGlvblN0b2NrSFRNTDogJydcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJWYXJpYXRpb25Qb3B1cCA9IHByb2R1Y3QgPT4ge1xyXG4gICAgICAgIGlmICggdGhpcy5zdGF0ZS5zaG93VmFyaWF0aW9uUG9wdXAgJiYgJ3ZhcmlhYmxlJyA9PSBwcm9kdWN0LnR5cGUgKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGF0dHJpYnV0ZV9rZXlzICAgPSBwcm9kdWN0LmF0dHJpYnV0ZV9rZXlzO1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVfdmFsdWVzID0gcHJvZHVjdC5hdHRyaWJ1dGVfdmFsdWVzO1xyXG4gICAgICAgICAgICBjb25zdCBhdHRyaWJ1dGVzICAgICAgID0gcHJvZHVjdC5hdHRyaWJ1dGVzO1xyXG4gICAgICAgICAgICBjb25zdCB0b3RhbEF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVfa2V5cy5sZW5ndGg7XHJcblxyXG4gICAgICAgICAgICBsZXQgdmFyaWF0aW9uT3B0aW9uc0hUTUwgPSBhdHRyaWJ1dGVfa2V5cy5tYXAoIChhdHRyaWJ1dGVfa2V5LCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RlZEF0dHJpYnV0ZSA9IGF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0gPyBPYmplY3QudmFsdWVzKGF0dHJpYnV0ZXNbYXR0cmlidXRlX2tleV0pIDogW107XHJcbiAgICAgICAgICAgICAgICBpZiAoIGV4aXN0ZWRBdHRyaWJ1dGUgJiYgZXhpc3RlZEF0dHJpYnV0ZS5sZW5ndGggKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb3B0aW9ucyA9IGV4aXN0ZWRBdHRyaWJ1dGUubWFwKCAoYXR0cmlidXRlX3ZhbHVlLCBpKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkQXR0cmlidXRlcyA9IHsuLi50aGlzLnN0YXRlLnNlbGVjdGVkQXR0cmlidXRlc307XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkQXR0cmlidXRlc1thdHRyaWJ1dGVfa2V5XSA9IGF0dHJpYnV0ZV92YWx1ZS5zbHVnO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZWN0ZWRWYXJpYXRpb24gPSBwcm9kdWN0LmF2YWlsYWJsZV92YXJpYXRpb25zLmZpbHRlciggYXZhaWxhYmxlX3ZhcmlhdGlvbiA9PiB0aGlzLmlzQXR0cmlidXRlc01hdGNoKCBhdmFpbGFibGVfdmFyaWF0aW9uLCBzZWxlY3RlZEF0dHJpYnV0ZXMgKSApO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGhhc1N0b2NrID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggKCB0b3RhbEF0dHJpYnV0ZXMgLSAxICkgPT09IGluZGV4ICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU3RvY2sgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgdmFyaWF0aW9uUHJvZHVjdCA9IHt9O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc2VsZWN0ZWRWYXJpYXRpb24ubGVuZ3RoICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhcmlhdGlvblByb2R1Y3QgPSBzZWxlY3RlZFZhcmlhdGlvblswXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHRoaXMucHJvcHMub3V0bGV0LmludmVudG9yeV90eXBlID09PSAnY3VzdG9tJyApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzU3RvY2sgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggc2VsZWN0ZWRWYXJpYXRpb25bMF0uc3RvY2tfc3RhdHVzID09ICdvbmJhY2tvcmRlcicgKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNTdG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHNlbGVjdGVkVmFyaWF0aW9uWzBdLnN0b2NrX3F1YW50aXR5ID4gMCApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXNTdG9jayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc1N0b2NrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGtleT17aX0gb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZVZhcmlhdGlvbklEKGF0dHJpYnV0ZV9rZXksIGF0dHJpYnV0ZV92YWx1ZS5zbHVnLCBwcm9kdWN0KX0gY2xhc3NOYW1lPXt0aGlzLnN0YXRlLnNlbGVjdGVkQXR0cmlidXRlc1thdHRyaWJ1dGVfa2V5XSA9PSBhdHRyaWJ1dGVfdmFsdWUuc2x1ZyA/ICdkZHdjcG9zLXZhcmlhdGlvbi1hdHRyaWJ1dGUgZGR3Y3Bvcy1zZWxlY3RlZC1vcHRpb25zJyA6ICdkZHdjcG9zLXZhcmlhdGlvbi1hdHRyaWJ1dGUnfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7YXR0cmlidXRlX3ZhbHVlLm5hbWV9IHsgISBoYXNTdG9jayA/IDxFeGNsYW1hdGlvbkNpcmNsZU91dGxpbmVkIHRpdGxlPXtfXyggJ091dCBvZiBTdG9jaycsICdkZHdjLW11bHRpcG9zJyApfSAvPiA6IG51bGx9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSApO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXthdHRyaWJ1dGVfa2V5fSBjbGFzc05hbWU9XCJkZHdjcG9zLXBvcHVwLW9wdGlvbnMtZ3JvdXBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMz57YXR0cmlidXRlX3ZhbHVlc1thdHRyaWJ1dGVfa2V5XX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkZHdjcG9zLXBvcHVwLW9wdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7b3B0aW9uc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9ICk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBwb3B1cENvbnRlbnQgPSAoXHJcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnsgX18oICdTZWxlY3QgVmFyaWF0aW9uJywgJ2Rkd2MtbXVsdGlwb3MnICkgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBhcHBseUZpbHRlcnMoIEFERF9ESUZGRVJFTlRfVkFSSUFUSU9OX09QVElPTlNfRklMVEVSLCAnJywgcHJvZHVjdCwgdGhpcyApID9cclxuICAgICAgICAgICAgICAgICAgICAgICAgYXBwbHlGaWx0ZXJzKCBBRERfRElGRkVSRU5UX1ZBUklBVElPTl9PUFRJT05TX0ZJTFRFUiwgJycsIHByb2R1Y3QsIHRoaXMgKVxyXG4gICAgICAgICAgICAgICAgICAgIDogdmFyaWF0aW9uT3B0aW9uc0hUTUwgfVxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy12YXJpYXRpb24tcHJvZHVjdC1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPntSZWFjdEh0bWxQYXJzZXIodGhpcy5zdGF0ZS5zZWxlY3RlZFZhcmlhdGlvbi5wcmljZV9odG1sKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPnt0aGlzLnN0YXRlLnZhcmlhdGlvblN0b2NrSFRNTH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFyaWF0aW9uUG9wdXBQcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZU92ZXJsYXk6IHRoaXMuaGFuZGxlVG9nZ2xlU2hvd1ZhcmlhdGlvblBvcHVwLFxyXG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50IDogcG9wdXBDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgbm90RGlzYWJsZWQgIDogT2JqZWN0LmtleXModGhpcy5zdGF0ZS5zZWxlY3RlZFZhcmlhdGlvbikubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlU3VjY2VzczogZSA9PiB0aGlzLmhhbmRsZUFkZFZhcmlhdGlvbiggdGhpcy5zdGF0ZS5zZWxlY3RlZFZhcmlhdGlvbiwgcHJvZHVjdCApLFxyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FuY2VsIDogdGhpcy5oYW5kbGVUb2dnbGVTaG93VmFyaWF0aW9uUG9wdXAsXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPFBvcHVwIHsuLi52YXJpYXRpb25Qb3B1cFByb3BzfSAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXZWlnaHRJbnB1dCA9IGUgPT4ge1xyXG4gICAgICAgIGlmICggZS53aGljaCA9PSAxMyAmJiBlLnRhcmdldC52YWx1ZSApIHtcclxuICAgICAgICAgICAgdGhpcy5oYW5kbGVXZWlnaHRTdWJtaXQoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKCB7XHJcbiAgICAgICAgICAgICAgICB3ZWlnaHRJbnB1dDogZS50YXJnZXQudmFsdWVcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVXZWlnaHRTdWJtaXQgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKCB0aGlzLnN0YXRlLndlaWdodElucHV0ICkge1xyXG4gICAgICAgICAgICB0aGlzLmhhbmRsZVRvZ2dsZVNob3dXZWlnaHRQb3B1cCgpO1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLmFkZFRvQ2FydCh0aGlzLnN0YXRlLndlaWdodFByb2R1Y3QudmFyaWF0aW9uX2lkID8gdGhpcy5zdGF0ZS53ZWlnaHRQcm9kdWN0LnZhcmlhdGlvbl9pZCA6IHRoaXMuc3RhdGUud2VpZ2h0UHJvZHVjdC5wcm9kdWN0X2lkLCAxLCBmYWxzZSwgdGhpcy5zdGF0ZS53ZWlnaHRJbnB1dCwgdGhpcy5zdGF0ZS5zZWxlY3RlZEF0dHJpYnV0ZXMpO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdG9yZS5hZGROb3RpZmljYXRpb24oe1xyXG4gICAgICAgICAgICAgICAgdGl0bGUgICAgOiBfXyggJ0Vycm9yJywgJ2Rkd2MtbXVsdGlwb3MnICksXHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlICA6IF9fKCAnRW50ZXIgdmFsaWQgd2VpZ2h0LicsICdkZHdjLW11bHRpcG9zJyApLFxyXG4gICAgICAgICAgICAgICAgdHlwZSAgICAgOiAnZGFuZ2VyJyxcclxuICAgICAgICAgICAgICAgIGluc2VydCAgIDogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBjb250YWluZXI6ICd0b3AtcmlnaHQnLFxyXG4gICAgICAgICAgICAgICAgZGlzbWlzcyAgOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24gICAgOiAzMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhdXNlT25Ib3ZlcjogdHJ1ZVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyV2VpZ2h0UG9wdXAgPSBwcm9kdWN0ID0+IHtcclxuICAgICAgICBpZiAoIHRoaXMuc3RhdGUuc2hvd1dlaWdodFBvcHVwICkge1xyXG4gICAgICAgICAgICBjb25zdCBwb3B1cENvbnRlbnQgPSAoXHJcbiAgICAgICAgICAgICAgICA8RnJhZ21lbnQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnsgX18oICdFbnRlciB3ZWlnaHQgZm9yIHRoZSBwdXJjaGFzZS4nLCAnZGR3Yy1tdWx0aXBvcycgKSB9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8cD57IHNwcmludGYoIF9fKCAnJXMgKCVzICVzKSA9ICVzJywgJ2Rkd2MtbXVsdGlwb3MnICksIHByb2R1Y3QudGl0bGUsIHByb2R1Y3Qud2VpZ2h0LCBkZHdjcG9zUE9TT2JqLndlaWdodF91bml0LCBkZHdjcG9zUHJpY2UoIHByb2R1Y3Quc2FsZV9wcmljZSApICkgfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIG1pbj1cIjAuMDFcIiBzdGVwPVwiMC4wMVwiIG9uS2V5VXA9e2UgPT4gdGhpcy5oYW5kbGVXZWlnaHRJbnB1dChlKX0gcGxhY2Vob2xkZXI9eyBfXyggJ0VudGVyIFdlaWdodCcsICdkZHdjLW11bHRpcG9zJyApIH0gYXV0b0ZvY3VzIC8+XHJcbiAgICAgICAgICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdmFyaWF0aW9uUG9wdXBQcm9wcyA9IHtcclxuICAgICAgICAgICAgICAgIGhhbmRsZU92ZXJsYXk6IHRoaXMuaGFuZGxlVG9nZ2xlU2hvd1dlaWdodFBvcHVwLFxyXG4gICAgICAgICAgICAgICAgcG9wdXBDb250ZW50IDogcG9wdXBDb250ZW50LFxyXG4gICAgICAgICAgICAgICAgbm90RGlzYWJsZWQgIDogdGhpcy5zdGF0ZS53ZWlnaHRJbnB1dCxcclxuICAgICAgICAgICAgICAgIGhhbmRsZVN1Y2Nlc3M6IGUgPT4gdGhpcy5oYW5kbGVXZWlnaHRTdWJtaXQoIHRoaXMuc3RhdGUud2VpZ2h0SW5wdXQsIHByb2R1Y3QgKSxcclxuICAgICAgICAgICAgICAgIGhhbmRsZUNhbmNlbCA6IHRoaXMuaGFuZGxlVG9nZ2xlU2hvd1dlaWdodFBvcHVwLFxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxQb3B1cCB7Li4udmFyaWF0aW9uUG9wdXBQcm9wc30gLz5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCBwcm9kdWN0ID0gdGhpcy5wcm9wcy5wcm9kdWN0O1xyXG5cclxuICAgICAgICBsZXQgc3RvY2tIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGlmICggZGR3Y3Bvc1BPU09iai5kZHdjcG9zX2NvbmZpZ3VyYXRpb24uc2hvd19wcm9kdWN0X3N0b2NrX2VuYWJsZWQgKSB7XHJcbiAgICAgICAgICAgIGlmICggdGhpcy5wcm9wcy5vdXRsZXQuaW52ZW50b3J5X3R5cGUgPT09ICdjdXN0b20nICkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwcm9kdWN0LnR5cGUgPT0gJ3ZhcmlhYmxlJyApIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cImluc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtfXyggJ0luIFN0b2NrJywgJ2Rkd2MtbXVsdGlwb3MnICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrIGNsYXNzTmFtZT1cImluc3RvY2tcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzcHJpbnRmKCBfXyggJ0luIFN0b2NrKCVzKScsICdkZHdjLW11bHRpcG9zJyApLCBwcm9kdWN0LnN0b2NrICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKCBwcm9kdWN0LnN0b2NrX3N0YXR1cyA9PSAnb25iYWNrb3JkZXInICkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0b2NrSFRNTCA9IChcclxuICAgICAgICAgICAgICAgICAgICAgICAgPG1hcmsgY2xhc3NOYW1lPVwiaW5zdG9ja1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge19fKCAnT24gQmFja29yZGVyJywgJ2Rkd2MtbXVsdGlwb3MnICl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIHByb2R1Y3Quc3RvY2tfcXVhbnRpdHkgPiAwICkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFyayBjbGFzc05hbWU9XCJpbnN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge3NwcmludGYoIF9fKCAnSW4gU3RvY2soJXMpJywgJ2Rkd2MtbXVsdGlwb3MnICksIHByb2R1Y3Quc3RvY2tfcXVhbnRpdHkgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzdG9ja0hUTUwgPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bWFyayBjbGFzc05hbWU9XCJpbnN0b2NrXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge19fKCAnSW4gU3RvY2snLCAnZGR3Yy1tdWx0aXBvcycgKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbWFyaz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwcm9kdWN0Q2FyZENsYXNzID0gJ2ltYWdlLWxlZnQnO1xyXG5cclxuICAgICAgICBpZiAoICdpbWFnZV90b3AnID09PSBkZHdjcG9zUE9TT2JqLmRkd2Nwb3NfY29uZmlndXJhdGlvbi5wcm9kdWN0X2xheW91dCApIHtcclxuICAgICAgICAgICAgcHJvZHVjdENhcmRDbGFzcyA9ICdpbWFnZS10b3AnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPEZyYWdtZW50PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyAnZGR3Y3Bvcy1wcm9kdWN0LWNhcmQgZGR3Y3Bvcy1wcm9kdWN0LScgKyBwcm9kdWN0Q2FyZENsYXNzIH0gb25DbGljaz17ZSA9PiB0aGlzLmhhbmRsZVByb2R1Y3RDbGljayhwcm9kdWN0KX0gPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGR3Y3Bvcy1wcm9kdWN0LXRodW1ibmFpbFwiIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXt7IF9faHRtbDogcHJvZHVjdC5pbWFnZSB9fT48L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRkd2Nwb3MtcHJvZHVjdC1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMiB0aXRsZT17UmVhY3RIdG1sUGFyc2VyKHByb2R1Y3QudGl0bGUpfT57UmVhY3RIdG1sUGFyc2VyKHByb2R1Y3QudGl0bGUpfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwPntSZWFjdEh0bWxQYXJzZXIocHJvZHVjdC5wcmljZV9odG1sKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtzdG9ja0hUTUx9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclZhcmlhdGlvblBvcHVwKHByb2R1Y3QpfVxyXG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyV2VpZ2h0UG9wdXAodGhpcy5zdGF0ZS53ZWlnaHRQcm9kdWN0KX1cclxuICAgICAgICAgICAgICAgIHthcHBseUZpbHRlcnMoICdkZHdjcG9zX2FkZF9jdXN0b21faHRtbF9hZnRlcl9wcm9kdWN0X2NhcmQnLCAnJywgcHJvZHVjdCwgdGhpcyApfVxyXG4gICAgICAgICAgICA8L0ZyYWdtZW50PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIG1hcERpc3BhdGNoVG9Qcm9wcyhkaXNwYXRjaCkge1xyXG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oeyBkaXNwYXRjaCB9LCBiaW5kQWN0aW9uQ3JlYXRvcnMoeyBhZGRUb0NhcnQgfSwgZGlzcGF0Y2gpKTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChudWxsLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFByb2R1Y3QpO1xyXG4iXSwic291cmNlUm9vdCI6IiJ9