/*!
  * Bootstrap v4.1.3 (https://getbootstrap.com/)
  * Copyright 2011-2018 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
  * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jquery'), require('popper.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jquery', 'popper.js'], factory) :
  (factory((global.bootstrap = {}),global.jQuery,global.Popper));
}(this, (function (exports,$,Popper) { 'use strict';

  $ = $ && $.hasOwnProperty('default') ? $['default'] : $;
  Popper = Popper && Popper.hasOwnProperty('default') ? Popper['default'] : Popper;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): util.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Util = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Private TransitionEnd Helpers
     * ------------------------------------------------------------------------
     */
    var TRANSITION_END = 'transitionend';
    var MAX_UID = 1000000;
    var MILLISECONDS_MULTIPLIER = 1000; // Shoutout AngusCroll (https://goo.gl/pxwQGp)

    function toType(obj) {
      return {}.toString.call(obj).match(/\s([a-z]+)/i)[1].toLowerCase();
    }

    function getSpecialTransitionEndEvent() {
      return {
        bindType: TRANSITION_END,
        delegateType: TRANSITION_END,
        handle: function handle(event) {
          if ($$$1(event.target).is(this)) {
            return event.handleObj.handler.apply(this, arguments); // eslint-disable-line prefer-rest-params
          }

          return undefined; // eslint-disable-line no-undefined
        }
      };
    }

    function transitionEndEmulator(duration) {
      var _this = this;

      var called = false;
      $$$1(this).one(Util.TRANSITION_END, function () {
        called = true;
      });
      setTimeout(function () {
        if (!called) {
          Util.triggerTransitionEnd(_this);
        }
      }, duration);
      return this;
    }

    function setTransitionEndSupport() {
      $$$1.fn.emulateTransitionEnd = transitionEndEmulator;
      $$$1.event.special[Util.TRANSITION_END] = getSpecialTransitionEndEvent();
    }
    /**
     * --------------------------------------------------------------------------
     * Public Util Api
     * --------------------------------------------------------------------------
     */


    var Util = {
      TRANSITION_END: 'bsTransitionEnd',
      getUID: function getUID(prefix) {
        do {
          // eslint-disable-next-line no-bitwise
          prefix += ~~(Math.random() * MAX_UID); // "~~" acts like a faster Math.floor() here
        } while (document.getElementById(prefix));

        return prefix;
      },
      getSelectorFromElement: function getSelectorFromElement(element) {
        var selector = element.getAttribute('data-target');

        if (!selector || selector === '#') {
          selector = element.getAttribute('href') || '';
        }

        try {
          return document.querySelector(selector) ? selector : null;
        } catch (err) {
          return null;
        }
      },
      getTransitionDurationFromElement: function getTransitionDurationFromElement(element) {
        if (!element) {
          return 0;
        } // Get transition-duration of the element


        var transitionDuration = $$$1(element).css('transition-duration');
        var floatTransitionDuration = parseFloat(transitionDuration); // Return 0 if element or transition duration is not found

        if (!floatTransitionDuration) {
          return 0;
        } // If multiple durations are defined, take the first


        transitionDuration = transitionDuration.split(',')[0];
        return parseFloat(transitionDuration) * MILLISECONDS_MULTIPLIER;
      },
      reflow: function reflow(element) {
        return element.offsetHeight;
      },
      triggerTransitionEnd: function triggerTransitionEnd(element) {
        $$$1(element).trigger(TRANSITION_END);
      },
      // TODO: Remove in v5
      supportsTransitionEnd: function supportsTransitionEnd() {
        return Boolean(TRANSITION_END);
      },
      isElement: function isElement(obj) {
        return (obj[0] || obj).nodeType;
      },
      typeCheckConfig: function typeCheckConfig(componentName, config, configTypes) {
        for (var property in configTypes) {
          if (Object.prototype.hasOwnProperty.call(configTypes, property)) {
            var expectedTypes = configTypes[property];
            var value = config[property];
            var valueType = value && Util.isElement(value) ? 'element' : toType(value);

            if (!new RegExp(expectedTypes).test(valueType)) {
              throw new Error(componentName.toUpperCase() + ": " + ("Option \"" + property + "\" provided type \"" + valueType + "\" ") + ("but expected type \"" + expectedTypes + "\"."));
            }
          }
        }
      }
    };
    setTransitionEndSupport();
    return Util;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): alert.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Alert = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'alert';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.alert';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Selector = {
      DISMISS: '[data-dismiss="alert"]'
    };
    var Event = {
      CLOSE: "close" + EVENT_KEY,
      CLOSED: "closed" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      ALERT: 'alert',
      FADE: 'fade',
      SHOW: 'show'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Alert =
    /*#__PURE__*/
    function () {
      function Alert(element) {
        this._element = element;
      } // Getters


      var _proto = Alert.prototype;

      // Public
      _proto.close = function close(element) {
        var rootElement = this._element;

        if (element) {
          rootElement = this._getRootElement(element);
        }

        var customEvent = this._triggerCloseEvent(rootElement);

        if (customEvent.isDefaultPrevented()) {
          return;
        }

        this._removeElement(rootElement);
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._getRootElement = function _getRootElement(element) {
        var selector = Util.getSelectorFromElement(element);
        var parent = false;

        if (selector) {
          parent = document.querySelector(selector);
        }

        if (!parent) {
          parent = $$$1(element).closest("." + ClassName.ALERT)[0];
        }

        return parent;
      };

      _proto._triggerCloseEvent = function _triggerCloseEvent(element) {
        var closeEvent = $$$1.Event(Event.CLOSE);
        $$$1(element).trigger(closeEvent);
        return closeEvent;
      };

      _proto._removeElement = function _removeElement(element) {
        var _this = this;

        $$$1(element).removeClass(ClassName.SHOW);

        if (!$$$1(element).hasClass(ClassName.FADE)) {
          this._destroyElement(element);

          return;
        }

        var transitionDuration = Util.getTransitionDurationFromElement(element);
        $$$1(element).one(Util.TRANSITION_END, function (event) {
          return _this._destroyElement(element, event);
        }).emulateTransitionEnd(transitionDuration);
      };

      _proto._destroyElement = function _destroyElement(element) {
        $$$1(element).detach().trigger(Event.CLOSED).remove();
      }; // Static


      Alert._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $element = $$$1(this);
          var data = $element.data(DATA_KEY);

          if (!data) {
            data = new Alert(this);
            $element.data(DATA_KEY, data);
          }

          if (config === 'close') {
            data[config](this);
          }
        });
      };

      Alert._handleDismiss = function _handleDismiss(alertInstance) {
        return function (event) {
          if (event) {
            event.preventDefault();
          }

          alertInstance.close(this);
        };
      };

      _createClass(Alert, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Alert;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DISMISS, Alert._handleDismiss(new Alert()));
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Alert._jQueryInterface;
    $$$1.fn[NAME].Constructor = Alert;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Alert._jQueryInterface;
    };

    return Alert;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): button.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Button = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'button';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.button';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ClassName = {
      ACTIVE: 'active',
      BUTTON: 'btn',
      FOCUS: 'focus'
    };
    var Selector = {
      DATA_TOGGLE_CARROT: '[data-toggle^="button"]',
      DATA_TOGGLE: '[data-toggle="buttons"]',
      INPUT: 'input',
      ACTIVE: '.active',
      BUTTON: '.btn'
    };
    var Event = {
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      FOCUS_BLUR_DATA_API: "focus" + EVENT_KEY + DATA_API_KEY + " " + ("blur" + EVENT_KEY + DATA_API_KEY)
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Button =
    /*#__PURE__*/
    function () {
      function Button(element) {
        this._element = element;
      } // Getters


      var _proto = Button.prototype;

      // Public
      _proto.toggle = function toggle() {
        var triggerChangeEvent = true;
        var addAriaPressed = true;
        var rootElement = $$$1(this._element).closest(Selector.DATA_TOGGLE)[0];

        if (rootElement) {
          var input = this._element.querySelector(Selector.INPUT);

          if (input) {
            if (input.type === 'radio') {
              if (input.checked && this._element.classList.contains(ClassName.ACTIVE)) {
                triggerChangeEvent = false;
              } else {
                var activeElement = rootElement.querySelector(Selector.ACTIVE);

                if (activeElement) {
                  $$$1(activeElement).removeClass(ClassName.ACTIVE);
                }
              }
            }

            if (triggerChangeEvent) {
              if (input.hasAttribute('disabled') || rootElement.hasAttribute('disabled') || input.classList.contains('disabled') || rootElement.classList.contains('disabled')) {
                return;
              }

              input.checked = !this._element.classList.contains(ClassName.ACTIVE);
              $$$1(input).trigger('change');
            }

            input.focus();
            addAriaPressed = false;
          }
        }

        if (addAriaPressed) {
          this._element.setAttribute('aria-pressed', !this._element.classList.contains(ClassName.ACTIVE));
        }

        if (triggerChangeEvent) {
          $$$1(this._element).toggleClass(ClassName.ACTIVE);
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Static


      Button._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          if (!data) {
            data = new Button(this);
            $$$1(this).data(DATA_KEY, data);
          }

          if (config === 'toggle') {
            data[config]();
          }
        });
      };

      _createClass(Button, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Button;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      event.preventDefault();
      var button = event.target;

      if (!$$$1(button).hasClass(ClassName.BUTTON)) {
        button = $$$1(button).closest(Selector.BUTTON);
      }

      Button._jQueryInterface.call($$$1(button), 'toggle');
    }).on(Event.FOCUS_BLUR_DATA_API, Selector.DATA_TOGGLE_CARROT, function (event) {
      var button = $$$1(event.target).closest(Selector.BUTTON)[0];
      $$$1(button).toggleClass(ClassName.FOCUS, /^focus(in)?$/.test(event.type));
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Button._jQueryInterface;
    $$$1.fn[NAME].Constructor = Button;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Button._jQueryInterface;
    };

    return Button;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): carousel.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Carousel = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'carousel';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.carousel';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ARROW_LEFT_KEYCODE = 37; // KeyboardEvent.which value for left arrow key

    var ARROW_RIGHT_KEYCODE = 39; // KeyboardEvent.which value for right arrow key

    var TOUCHEVENT_COMPAT_WAIT = 500; // Time for mouse compat events to fire after touch

    var Default = {
      interval: 5000,
      keyboard: true,
      slide: false,
      pause: 'hover',
      wrap: true
    };
    var DefaultType = {
      interval: '(number|boolean)',
      keyboard: 'boolean',
      slide: '(boolean|string)',
      pause: '(string|boolean)',
      wrap: 'boolean'
    };
    var Direction = {
      NEXT: 'next',
      PREV: 'prev',
      LEFT: 'left',
      RIGHT: 'right'
    };
    var Event = {
      SLIDE: "slide" + EVENT_KEY,
      SLID: "slid" + EVENT_KEY,
      KEYDOWN: "keydown" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY,
      TOUCHEND: "touchend" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      CAROUSEL: 'carousel',
      ACTIVE: 'active',
      SLIDE: 'slide',
      RIGHT: 'carousel-item-right',
      LEFT: 'carousel-item-left',
      NEXT: 'carousel-item-next',
      PREV: 'carousel-item-prev',
      ITEM: 'carousel-item'
    };
    var Selector = {
      ACTIVE: '.active',
      ACTIVE_ITEM: '.active.carousel-item',
      ITEM: '.carousel-item',
      NEXT_PREV: '.carousel-item-next, .carousel-item-prev',
      INDICATORS: '.carousel-indicators',
      DATA_SLIDE: '[data-slide], [data-slide-to]',
      DATA_RIDE: '[data-ride="carousel"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Carousel =
    /*#__PURE__*/
    function () {
      function Carousel(element, config) {
        this._items = null;
        this._interval = null;
        this._activeElement = null;
        this._isPaused = false;
        this._isSliding = false;
        this.touchTimeout = null;
        this._config = this._getConfig(config);
        this._element = $$$1(element)[0];
        this._indicatorsElement = this._element.querySelector(Selector.INDICATORS);

        this._addEventListeners();
      } // Getters


      var _proto = Carousel.prototype;

      // Public
      _proto.next = function next() {
        if (!this._isSliding) {
          this._slide(Direction.NEXT);
        }
      };

      _proto.nextWhenVisible = function nextWhenVisible() {
        // Don't call next when the page isn't visible
        // or the carousel or its parent isn't visible
        if (!document.hidden && $$$1(this._element).is(':visible') && $$$1(this._element).css('visibility') !== 'hidden') {
          this.next();
        }
      };

      _proto.prev = function prev() {
        if (!this._isSliding) {
          this._slide(Direction.PREV);
        }
      };

      _proto.pause = function pause(event) {
        if (!event) {
          this._isPaused = true;
        }

        if (this._element.querySelector(Selector.NEXT_PREV)) {
          Util.triggerTransitionEnd(this._element);
          this.cycle(true);
        }

        clearInterval(this._interval);
        this._interval = null;
      };

      _proto.cycle = function cycle(event) {
        if (!event) {
          this._isPaused = false;
        }

        if (this._interval) {
          clearInterval(this._interval);
          this._interval = null;
        }

        if (this._config.interval && !this._isPaused) {
          this._interval = setInterval((document.visibilityState ? this.nextWhenVisible : this.next).bind(this), this._config.interval);
        }
      };

      _proto.to = function to(index) {
        var _this = this;

        this._activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeIndex = this._getItemIndex(this._activeElement);

        if (index > this._items.length - 1 || index < 0) {
          return;
        }

        if (this._isSliding) {
          $$$1(this._element).one(Event.SLID, function () {
            return _this.to(index);
          });
          return;
        }

        if (activeIndex === index) {
          this.pause();
          this.cycle();
          return;
        }

        var direction = index > activeIndex ? Direction.NEXT : Direction.PREV;

        this._slide(direction, this._items[index]);
      };

      _proto.dispose = function dispose() {
        $$$1(this._element).off(EVENT_KEY);
        $$$1.removeData(this._element, DATA_KEY);
        this._items = null;
        this._config = null;
        this._element = null;
        this._interval = null;
        this._isPaused = null;
        this._isSliding = null;
        this._activeElement = null;
        this._indicatorsElement = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._addEventListeners = function _addEventListeners() {
        var _this2 = this;

        if (this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN, function (event) {
            return _this2._keydown(event);
          });
        }

        if (this._config.pause === 'hover') {
          $$$1(this._element).on(Event.MOUSEENTER, function (event) {
            return _this2.pause(event);
          }).on(Event.MOUSELEAVE, function (event) {
            return _this2.cycle(event);
          });

          if ('ontouchstart' in document.documentElement) {
            // If it's a touch-enabled device, mouseenter/leave are fired as
            // part of the mouse compatibility events on first tap - the carousel
            // would stop cycling until user tapped out of it;
            // here, we listen for touchend, explicitly pause the carousel
            // (as if it's the second time we tap on it, mouseenter compat event
            // is NOT fired) and after a timeout (to allow for mouse compatibility
            // events to fire) we explicitly restart cycling
            $$$1(this._element).on(Event.TOUCHEND, function () {
              _this2.pause();

              if (_this2.touchTimeout) {
                clearTimeout(_this2.touchTimeout);
              }

              _this2.touchTimeout = setTimeout(function (event) {
                return _this2.cycle(event);
              }, TOUCHEVENT_COMPAT_WAIT + _this2._config.interval);
            });
          }
        }
      };

      _proto._keydown = function _keydown(event) {
        if (/input|textarea/i.test(event.target.tagName)) {
          return;
        }

        switch (event.which) {
          case ARROW_LEFT_KEYCODE:
            event.preventDefault();
            this.prev();
            break;

          case ARROW_RIGHT_KEYCODE:
            event.preventDefault();
            this.next();
            break;

          default:
        }
      };

      _proto._getItemIndex = function _getItemIndex(element) {
        this._items = element && element.parentNode ? [].slice.call(element.parentNode.querySelectorAll(Selector.ITEM)) : [];
        return this._items.indexOf(element);
      };

      _proto._getItemByDirection = function _getItemByDirection(direction, activeElement) {
        var isNextDirection = direction === Direction.NEXT;
        var isPrevDirection = direction === Direction.PREV;

        var activeIndex = this._getItemIndex(activeElement);

        var lastItemIndex = this._items.length - 1;
        var isGoingToWrap = isPrevDirection && activeIndex === 0 || isNextDirection && activeIndex === lastItemIndex;

        if (isGoingToWrap && !this._config.wrap) {
          return activeElement;
        }

        var delta = direction === Direction.PREV ? -1 : 1;
        var itemIndex = (activeIndex + delta) % this._items.length;
        return itemIndex === -1 ? this._items[this._items.length - 1] : this._items[itemIndex];
      };

      _proto._triggerSlideEvent = function _triggerSlideEvent(relatedTarget, eventDirectionName) {
        var targetIndex = this._getItemIndex(relatedTarget);

        var fromIndex = this._getItemIndex(this._element.querySelector(Selector.ACTIVE_ITEM));

        var slideEvent = $$$1.Event(Event.SLIDE, {
          relatedTarget: relatedTarget,
          direction: eventDirectionName,
          from: fromIndex,
          to: targetIndex
        });
        $$$1(this._element).trigger(slideEvent);
        return slideEvent;
      };

      _proto._setActiveIndicatorElement = function _setActiveIndicatorElement(element) {
        if (this._indicatorsElement) {
          var indicators = [].slice.call(this._indicatorsElement.querySelectorAll(Selector.ACTIVE));
          $$$1(indicators).removeClass(ClassName.ACTIVE);

          var nextIndicator = this._indicatorsElement.children[this._getItemIndex(element)];

          if (nextIndicator) {
            $$$1(nextIndicator).addClass(ClassName.ACTIVE);
          }
        }
      };

      _proto._slide = function _slide(direction, element) {
        var _this3 = this;

        var activeElement = this._element.querySelector(Selector.ACTIVE_ITEM);

        var activeElementIndex = this._getItemIndex(activeElement);

        var nextElement = element || activeElement && this._getItemByDirection(direction, activeElement);

        var nextElementIndex = this._getItemIndex(nextElement);

        var isCycling = Boolean(this._interval);
        var directionalClassName;
        var orderClassName;
        var eventDirectionName;

        if (direction === Direction.NEXT) {
          directionalClassName = ClassName.LEFT;
          orderClassName = ClassName.NEXT;
          eventDirectionName = Direction.LEFT;
        } else {
          directionalClassName = ClassName.RIGHT;
          orderClassName = ClassName.PREV;
          eventDirectionName = Direction.RIGHT;
        }

        if (nextElement && $$$1(nextElement).hasClass(ClassName.ACTIVE)) {
          this._isSliding = false;
          return;
        }

        var slideEvent = this._triggerSlideEvent(nextElement, eventDirectionName);

        if (slideEvent.isDefaultPrevented()) {
          return;
        }

        if (!activeElement || !nextElement) {
          // Some weirdness is happening, so we bail
          return;
        }

        this._isSliding = true;

        if (isCycling) {
          this.pause();
        }

        this._setActiveIndicatorElement(nextElement);

        var slidEvent = $$$1.Event(Event.SLID, {
          relatedTarget: nextElement,
          direction: eventDirectionName,
          from: activeElementIndex,
          to: nextElementIndex
        });

        if ($$$1(this._element).hasClass(ClassName.SLIDE)) {
          $$$1(nextElement).addClass(orderClassName);
          Util.reflow(nextElement);
          $$$1(activeElement).addClass(directionalClassName);
          $$$1(nextElement).addClass(directionalClassName);
          var transitionDuration = Util.getTransitionDurationFromElement(activeElement);
          $$$1(activeElement).one(Util.TRANSITION_END, function () {
            $$$1(nextElement).removeClass(directionalClassName + " " + orderClassName).addClass(ClassName.ACTIVE);
            $$$1(activeElement).removeClass(ClassName.ACTIVE + " " + orderClassName + " " + directionalClassName);
            _this3._isSliding = false;
            setTimeout(function () {
              return $$$1(_this3._element).trigger(slidEvent);
            }, 0);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          $$$1(activeElement).removeClass(ClassName.ACTIVE);
          $$$1(nextElement).addClass(ClassName.ACTIVE);
          this._isSliding = false;
          $$$1(this._element).trigger(slidEvent);
        }

        if (isCycling) {
          this.cycle();
        }
      }; // Static


      Carousel._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data());

          if (typeof config === 'object') {
            _config = _objectSpread({}, _config, config);
          }

          var action = typeof config === 'string' ? config : _config.slide;

          if (!data) {
            data = new Carousel(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'number') {
            data.to(config);
          } else if (typeof action === 'string') {
            if (typeof data[action] === 'undefined') {
              throw new TypeError("No method named \"" + action + "\"");
            }

            data[action]();
          } else if (_config.interval) {
            data.pause();
            data.cycle();
          }
        });
      };

      Carousel._dataApiClickHandler = function _dataApiClickHandler(event) {
        var selector = Util.getSelectorFromElement(this);

        if (!selector) {
          return;
        }

        var target = $$$1(selector)[0];

        if (!target || !$$$1(target).hasClass(ClassName.CAROUSEL)) {
          return;
        }

        var config = _objectSpread({}, $$$1(target).data(), $$$1(this).data());

        var slideIndex = this.getAttribute('data-slide-to');

        if (slideIndex) {
          config.interval = false;
        }

        Carousel._jQueryInterface.call($$$1(target), config);

        if (slideIndex) {
          $$$1(target).data(DATA_KEY).to(slideIndex);
        }

        event.preventDefault();
      };

      _createClass(Carousel, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Carousel;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_SLIDE, Carousel._dataApiClickHandler);
    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var carousels = [].slice.call(document.querySelectorAll(Selector.DATA_RIDE));

      for (var i = 0, len = carousels.length; i < len; i++) {
        var $carousel = $$$1(carousels[i]);

        Carousel._jQueryInterface.call($carousel, $carousel.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Carousel._jQueryInterface;
    $$$1.fn[NAME].Constructor = Carousel;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Carousel._jQueryInterface;
    };

    return Carousel;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): collapse.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Collapse = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'collapse';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.collapse';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      toggle: true,
      parent: ''
    };
    var DefaultType = {
      toggle: 'boolean',
      parent: '(string|element)'
    };
    var Event = {
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SHOW: 'show',
      COLLAPSE: 'collapse',
      COLLAPSING: 'collapsing',
      COLLAPSED: 'collapsed'
    };
    var Dimension = {
      WIDTH: 'width',
      HEIGHT: 'height'
    };
    var Selector = {
      ACTIVES: '.show, .collapsing',
      DATA_TOGGLE: '[data-toggle="collapse"]'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Collapse =
    /*#__PURE__*/
    function () {
      function Collapse(element, config) {
        this._isTransitioning = false;
        this._element = element;
        this._config = this._getConfig(config);
        this._triggerArray = $$$1.makeArray(document.querySelectorAll("[data-toggle=\"collapse\"][href=\"#" + element.id + "\"]," + ("[data-toggle=\"collapse\"][data-target=\"#" + element.id + "\"]")));
        var toggleList = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggleList.length; i < len; i++) {
          var elem = toggleList[i];
          var selector = Util.getSelectorFromElement(elem);
          var filterElement = [].slice.call(document.querySelectorAll(selector)).filter(function (foundElem) {
            return foundElem === element;
          });

          if (selector !== null && filterElement.length > 0) {
            this._selector = selector;

            this._triggerArray.push(elem);
          }
        }

        this._parent = this._config.parent ? this._getParent() : null;

        if (!this._config.parent) {
          this._addAriaAndCollapsedClass(this._element, this._triggerArray);
        }

        if (this._config.toggle) {
          this.toggle();
        }
      } // Getters


      var _proto = Collapse.prototype;

      // Public
      _proto.toggle = function toggle() {
        if ($$$1(this._element).hasClass(ClassName.SHOW)) {
          this.hide();
        } else {
          this.show();
        }
      };

      _proto.show = function show() {
        var _this = this;

        if (this._isTransitioning || $$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var actives;
        var activesData;

        if (this._parent) {
          actives = [].slice.call(this._parent.querySelectorAll(Selector.ACTIVES)).filter(function (elem) {
            return elem.getAttribute('data-parent') === _this._config.parent;
          });

          if (actives.length === 0) {
            actives = null;
          }
        }

        if (actives) {
          activesData = $$$1(actives).not(this._selector).data(DATA_KEY);

          if (activesData && activesData._isTransitioning) {
            return;
          }
        }

        var startEvent = $$$1.Event(Event.SHOW);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        if (actives) {
          Collapse._jQueryInterface.call($$$1(actives).not(this._selector), 'hide');

          if (!activesData) {
            $$$1(actives).data(DATA_KEY, null);
          }
        }

        var dimension = this._getDimension();

        $$$1(this._element).removeClass(ClassName.COLLAPSE).addClass(ClassName.COLLAPSING);
        this._element.style[dimension] = 0;

        if (this._triggerArray.length) {
          $$$1(this._triggerArray).removeClass(ClassName.COLLAPSED).attr('aria-expanded', true);
        }

        this.setTransitioning(true);

        var complete = function complete() {
          $$$1(_this._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).addClass(ClassName.SHOW);
          _this._element.style[dimension] = '';

          _this.setTransitioning(false);

          $$$1(_this._element).trigger(Event.SHOWN);
        };

        var capitalizedDimension = dimension[0].toUpperCase() + dimension.slice(1);
        var scrollSize = "scroll" + capitalizedDimension;
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        this._element.style[dimension] = this._element[scrollSize] + "px";
      };

      _proto.hide = function hide() {
        var _this2 = this;

        if (this._isTransitioning || !$$$1(this._element).hasClass(ClassName.SHOW)) {
          return;
        }

        var startEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(startEvent);

        if (startEvent.isDefaultPrevented()) {
          return;
        }

        var dimension = this._getDimension();

        this._element.style[dimension] = this._element.getBoundingClientRect()[dimension] + "px";
        Util.reflow(this._element);
        $$$1(this._element).addClass(ClassName.COLLAPSING).removeClass(ClassName.COLLAPSE).removeClass(ClassName.SHOW);
        var triggerArrayLength = this._triggerArray.length;

        if (triggerArrayLength > 0) {
          for (var i = 0; i < triggerArrayLength; i++) {
            var trigger = this._triggerArray[i];
            var selector = Util.getSelectorFromElement(trigger);

            if (selector !== null) {
              var $elem = $$$1([].slice.call(document.querySelectorAll(selector)));

              if (!$elem.hasClass(ClassName.SHOW)) {
                $$$1(trigger).addClass(ClassName.COLLAPSED).attr('aria-expanded', false);
              }
            }
          }
        }

        this.setTransitioning(true);

        var complete = function complete() {
          _this2.setTransitioning(false);

          $$$1(_this2._element).removeClass(ClassName.COLLAPSING).addClass(ClassName.COLLAPSE).trigger(Event.HIDDEN);
        };

        this._element.style[dimension] = '';
        var transitionDuration = Util.getTransitionDurationFromElement(this._element);
        $$$1(this._element).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
      };

      _proto.setTransitioning = function setTransitioning(isTransitioning) {
        this._isTransitioning = isTransitioning;
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._config = null;
        this._parent = null;
        this._element = null;
        this._triggerArray = null;
        this._isTransitioning = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        config.toggle = Boolean(config.toggle); // Coerce string values

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getDimension = function _getDimension() {
        var hasWidth = $$$1(this._element).hasClass(Dimension.WIDTH);
        return hasWidth ? Dimension.WIDTH : Dimension.HEIGHT;
      };

      _proto._getParent = function _getParent() {
        var _this3 = this;

        var parent = null;

        if (Util.isElement(this._config.parent)) {
          parent = this._config.parent; // It's a jQuery object

          if (typeof this._config.parent.jquery !== 'undefined') {
            parent = this._config.parent[0];
          }
        } else {
          parent = document.querySelector(this._config.parent);
        }

        var selector = "[data-toggle=\"collapse\"][data-parent=\"" + this._config.parent + "\"]";
        var children = [].slice.call(parent.querySelectorAll(selector));
        $$$1(children).each(function (i, element) {
          _this3._addAriaAndCollapsedClass(Collapse._getTargetFromElement(element), [element]);
        });
        return parent;
      };

      _proto._addAriaAndCollapsedClass = function _addAriaAndCollapsedClass(element, triggerArray) {
        if (element) {
          var isOpen = $$$1(element).hasClass(ClassName.SHOW);

          if (triggerArray.length) {
            $$$1(triggerArray).toggleClass(ClassName.COLLAPSED, !isOpen).attr('aria-expanded', isOpen);
          }
        }
      }; // Static


      Collapse._getTargetFromElement = function _getTargetFromElement(element) {
        var selector = Util.getSelectorFromElement(element);
        return selector ? document.querySelector(selector) : null;
      };

      Collapse._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          var _config = _objectSpread({}, Default, $this.data(), typeof config === 'object' && config ? config : {});

          if (!data && _config.toggle && /show|hide/.test(config)) {
            _config.toggle = false;
          }

          if (!data) {
            data = new Collapse(this, _config);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Collapse, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Collapse;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      // preventDefault only for <a> elements (which change the URL) not inside the collapsible element
      if (event.currentTarget.tagName === 'A') {
        event.preventDefault();
      }

      var $trigger = $$$1(this);
      var selector = Util.getSelectorFromElement(this);
      var selectors = [].slice.call(document.querySelectorAll(selector));
      $$$1(selectors).each(function () {
        var $target = $$$1(this);
        var data = $target.data(DATA_KEY);
        var config = data ? 'toggle' : $trigger.data();

        Collapse._jQueryInterface.call($target, config);
      });
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Collapse._jQueryInterface;
    $$$1.fn[NAME].Constructor = Collapse;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Collapse._jQueryInterface;
    };

    return Collapse;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): dropdown.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Dropdown = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'dropdown';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.dropdown';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var SPACE_KEYCODE = 32; // KeyboardEvent.which value for space key

    var TAB_KEYCODE = 9; // KeyboardEvent.which value for tab key

    var ARROW_UP_KEYCODE = 38; // KeyboardEvent.which value for up arrow key

    var ARROW_DOWN_KEYCODE = 40; // KeyboardEvent.which value for down arrow key

    var RIGHT_MOUSE_BUTTON_WHICH = 3; // MouseEvent.which value for the right button (assuming a right-handed mouse)

    var REGEXP_KEYDOWN = new RegExp(ARROW_UP_KEYCODE + "|" + ARROW_DOWN_KEYCODE + "|" + ESCAPE_KEYCODE);
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY,
      KEYDOWN_DATA_API: "keydown" + EVENT_KEY + DATA_API_KEY,
      KEYUP_DATA_API: "keyup" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DISABLED: 'disabled',
      SHOW: 'show',
      DROPUP: 'dropup',
      DROPRIGHT: 'dropright',
      DROPLEFT: 'dropleft',
      MENURIGHT: 'dropdown-menu-right',
      MENULEFT: 'dropdown-menu-left',
      POSITION_STATIC: 'position-static'
    };
    var Selector = {
      DATA_TOGGLE: '[data-toggle="dropdown"]',
      FORM_CHILD: '.dropdown form',
      MENU: '.dropdown-menu',
      NAVBAR_NAV: '.navbar-nav',
      VISIBLE_ITEMS: '.dropdown-menu .dropdown-item:not(.disabled):not(:disabled)'
    };
    var AttachmentMap = {
      TOP: 'top-start',
      TOPEND: 'top-end',
      BOTTOM: 'bottom-start',
      BOTTOMEND: 'bottom-end',
      RIGHT: 'right-start',
      RIGHTEND: 'right-end',
      LEFT: 'left-start',
      LEFTEND: 'left-end'
    };
    var Default = {
      offset: 0,
      flip: true,
      boundary: 'scrollParent',
      reference: 'toggle',
      display: 'dynamic'
    };
    var DefaultType = {
      offset: '(number|string|function)',
      flip: 'boolean',
      boundary: '(string|element)',
      reference: '(string|element)',
      display: 'string'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Dropdown =
    /*#__PURE__*/
    function () {
      function Dropdown(element, config) {
        this._element = element;
        this._popper = null;
        this._config = this._getConfig(config);
        this._menu = this._getMenuElement();
        this._inNavbar = this._detectNavbar();

        this._addEventListeners();
      } // Getters


      var _proto = Dropdown.prototype;

      // Public
      _proto.toggle = function toggle() {
        if (this._element.disabled || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this._element);

        var isActive = $$$1(this._menu).hasClass(ClassName.SHOW);

        Dropdown._clearMenus();

        if (isActive) {
          return;
        }

        var relatedTarget = {
          relatedTarget: this._element
        };
        var showEvent = $$$1.Event(Event.SHOW, relatedTarget);
        $$$1(parent).trigger(showEvent);

        if (showEvent.isDefaultPrevented()) {
          return;
        } // Disable totally Popper.js for Dropdown in Navbar


        if (!this._inNavbar) {
          /**
           * Check for Popper dependency
           * Popper - https://popper.js.org
           */
          if (typeof Popper === 'undefined') {
            throw new TypeError('Bootstrap dropdown require Popper.js (https://popper.js.org)');
          }

          var referenceElement = this._element;

          if (this._config.reference === 'parent') {
            referenceElement = parent;
          } else if (Util.isElement(this._config.reference)) {
            referenceElement = this._config.reference; // Check if it's jQuery element

            if (typeof this._config.reference.jquery !== 'undefined') {
              referenceElement = this._config.reference[0];
            }
          } // If boundary is not `scrollParent`, then set position to `static`
          // to allow the menu to "escape" the scroll parent's boundaries
          // https://github.com/twbs/bootstrap/issues/24251


          if (this._config.boundary !== 'scrollParent') {
            $$$1(parent).addClass(ClassName.POSITION_STATIC);
          }

          this._popper = new Popper(referenceElement, this._menu, this._getPopperConfig());
        } // If this is a touch-enabled device we add extra
        // empty mouseover listeners to the body's immediate children;
        // only needed because of broken event delegation on iOS
        // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html


        if ('ontouchstart' in document.documentElement && $$$1(parent).closest(Selector.NAVBAR_NAV).length === 0) {
          $$$1(document.body).children().on('mouseover', null, $$$1.noop);
        }

        this._element.focus();

        this._element.setAttribute('aria-expanded', true);

        $$$1(this._menu).toggleClass(ClassName.SHOW);
        $$$1(parent).toggleClass(ClassName.SHOW).trigger($$$1.Event(Event.SHOWN, relatedTarget));
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._element).off(EVENT_KEY);
        this._element = null;
        this._menu = null;

        if (this._popper !== null) {
          this._popper.destroy();

          this._popper = null;
        }
      };

      _proto.update = function update() {
        this._inNavbar = this._detectNavbar();

        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Private


      _proto._addEventListeners = function _addEventListeners() {
        var _this = this;

        $$$1(this._element).on(Event.CLICK, function (event) {
          event.preventDefault();
          event.stopPropagation();

          _this.toggle();
        });
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this._element).data(), config);
        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getMenuElement = function _getMenuElement() {
        if (!this._menu) {
          var parent = Dropdown._getParentFromElement(this._element);

          if (parent) {
            this._menu = parent.querySelector(Selector.MENU);
          }
        }

        return this._menu;
      };

      _proto._getPlacement = function _getPlacement() {
        var $parentDropdown = $$$1(this._element.parentNode);
        var placement = AttachmentMap.BOTTOM; // Handle dropup

        if ($parentDropdown.hasClass(ClassName.DROPUP)) {
          placement = AttachmentMap.TOP;

          if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
            placement = AttachmentMap.TOPEND;
          }
        } else if ($parentDropdown.hasClass(ClassName.DROPRIGHT)) {
          placement = AttachmentMap.RIGHT;
        } else if ($parentDropdown.hasClass(ClassName.DROPLEFT)) {
          placement = AttachmentMap.LEFT;
        } else if ($$$1(this._menu).hasClass(ClassName.MENURIGHT)) {
          placement = AttachmentMap.BOTTOMEND;
        }

        return placement;
      };

      _proto._detectNavbar = function _detectNavbar() {
        return $$$1(this._element).closest('.navbar').length > 0;
      };

      _proto._getPopperConfig = function _getPopperConfig() {
        var _this2 = this;

        var offsetConf = {};

        if (typeof this._config.offset === 'function') {
          offsetConf.fn = function (data) {
            data.offsets = _objectSpread({}, data.offsets, _this2._config.offset(data.offsets) || {});
            return data;
          };
        } else {
          offsetConf.offset = this._config.offset;
        }

        var popperConfig = {
          placement: this._getPlacement(),
          modifiers: {
            offset: offsetConf,
            flip: {
              enabled: this._config.flip
            },
            preventOverflow: {
              boundariesElement: this._config.boundary
            }
          } // Disable Popper.js if we have a static display

        };

        if (this._config.display === 'static') {
          popperConfig.modifiers.applyStyle = {
            enabled: false
          };
        }

        return popperConfig;
      }; // Static


      Dropdown._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data) {
            data = new Dropdown(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      Dropdown._clearMenus = function _clearMenus(event) {
        if (event && (event.which === RIGHT_MOUSE_BUTTON_WHICH || event.type === 'keyup' && event.which !== TAB_KEYCODE)) {
          return;
        }

        var toggles = [].slice.call(document.querySelectorAll(Selector.DATA_TOGGLE));

        for (var i = 0, len = toggles.length; i < len; i++) {
          var parent = Dropdown._getParentFromElement(toggles[i]);

          var context = $$$1(toggles[i]).data(DATA_KEY);
          var relatedTarget = {
            relatedTarget: toggles[i]
          };

          if (event && event.type === 'click') {
            relatedTarget.clickEvent = event;
          }

          if (!context) {
            continue;
          }

          var dropdownMenu = context._menu;

          if (!$$$1(parent).hasClass(ClassName.SHOW)) {
            continue;
          }

          if (event && (event.type === 'click' && /input|textarea/i.test(event.target.tagName) || event.type === 'keyup' && event.which === TAB_KEYCODE) && $$$1.contains(parent, event.target)) {
            continue;
          }

          var hideEvent = $$$1.Event(Event.HIDE, relatedTarget);
          $$$1(parent).trigger(hideEvent);

          if (hideEvent.isDefaultPrevented()) {
            continue;
          } // If this is a touch-enabled device we remove the extra
          // empty mouseover listeners we added for iOS support


          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().off('mouseover', null, $$$1.noop);
          }

          toggles[i].setAttribute('aria-expanded', 'false');
          $$$1(dropdownMenu).removeClass(ClassName.SHOW);
          $$$1(parent).removeClass(ClassName.SHOW).trigger($$$1.Event(Event.HIDDEN, relatedTarget));
        }
      };

      Dropdown._getParentFromElement = function _getParentFromElement(element) {
        var parent;
        var selector = Util.getSelectorFromElement(element);

        if (selector) {
          parent = document.querySelector(selector);
        }

        return parent || element.parentNode;
      }; // eslint-disable-next-line complexity


      Dropdown._dataApiKeydownHandler = function _dataApiKeydownHandler(event) {
        // If not input/textarea:
        //  - And not a key in REGEXP_KEYDOWN => not a dropdown command
        // If input/textarea:
        //  - If space key => not a dropdown command
        //  - If key is other than escape
        //    - If key is not up or down => not a dropdown command
        //    - If trigger inside the menu => not a dropdown command
        if (/input|textarea/i.test(event.target.tagName) ? event.which === SPACE_KEYCODE || event.which !== ESCAPE_KEYCODE && (event.which !== ARROW_DOWN_KEYCODE && event.which !== ARROW_UP_KEYCODE || $$$1(event.target).closest(Selector.MENU).length) : !REGEXP_KEYDOWN.test(event.which)) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        if (this.disabled || $$$1(this).hasClass(ClassName.DISABLED)) {
          return;
        }

        var parent = Dropdown._getParentFromElement(this);

        var isActive = $$$1(parent).hasClass(ClassName.SHOW);

        if (!isActive && (event.which !== ESCAPE_KEYCODE || event.which !== SPACE_KEYCODE) || isActive && (event.which === ESCAPE_KEYCODE || event.which === SPACE_KEYCODE)) {
          if (event.which === ESCAPE_KEYCODE) {
            var toggle = parent.querySelector(Selector.DATA_TOGGLE);
            $$$1(toggle).trigger('focus');
          }

          $$$1(this).trigger('click');
          return;
        }

        var items = [].slice.call(parent.querySelectorAll(Selector.VISIBLE_ITEMS));

        if (items.length === 0) {
          return;
        }

        var index = items.indexOf(event.target);

        if (event.which === ARROW_UP_KEYCODE && index > 0) {
          // Up
          index--;
        }

        if (event.which === ARROW_DOWN_KEYCODE && index < items.length - 1) {
          // Down
          index++;
        }

        if (index < 0) {
          index = 0;
        }

        items[index].focus();
      };

      _createClass(Dropdown, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Dropdown;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.KEYDOWN_DATA_API, Selector.DATA_TOGGLE, Dropdown._dataApiKeydownHandler).on(Event.KEYDOWN_DATA_API, Selector.MENU, Dropdown._dataApiKeydownHandler).on(Event.CLICK_DATA_API + " " + Event.KEYUP_DATA_API, Dropdown._clearMenus).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();
      event.stopPropagation();

      Dropdown._jQueryInterface.call($$$1(this), 'toggle');
    }).on(Event.CLICK_DATA_API, Selector.FORM_CHILD, function (e) {
      e.stopPropagation();
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Dropdown._jQueryInterface;
    $$$1.fn[NAME].Constructor = Dropdown;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Dropdown._jQueryInterface;
    };

    return Dropdown;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): modal.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Modal = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'modal';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.modal';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var ESCAPE_KEYCODE = 27; // KeyboardEvent.which value for Escape (Esc) key

    var Default = {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: true
    };
    var DefaultType = {
      backdrop: '(boolean|string)',
      keyboard: 'boolean',
      focus: 'boolean',
      show: 'boolean'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      RESIZE: "resize" + EVENT_KEY,
      CLICK_DISMISS: "click.dismiss" + EVENT_KEY,
      KEYDOWN_DISMISS: "keydown.dismiss" + EVENT_KEY,
      MOUSEUP_DISMISS: "mouseup.dismiss" + EVENT_KEY,
      MOUSEDOWN_DISMISS: "mousedown.dismiss" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      SCROLLBAR_MEASURER: 'modal-scrollbar-measure',
      BACKDROP: 'modal-backdrop',
      OPEN: 'modal-open',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DIALOG: '.modal-dialog',
      DATA_TOGGLE: '[data-toggle="modal"]',
      DATA_DISMISS: '[data-dismiss="modal"]',
      FIXED_CONTENT: '.fixed-top, .fixed-bottom, .is-fixed, .sticky-top',
      STICKY_CONTENT: '.sticky-top'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Modal =
    /*#__PURE__*/
    function () {
      function Modal(element, config) {
        this._config = this._getConfig(config);
        this._element = element;
        this._dialog = element.querySelector(Selector.DIALOG);
        this._backdrop = null;
        this._isShown = false;
        this._isBodyOverflowing = false;
        this._ignoreBackdropClick = false;
        this._scrollbarWidth = 0;
      } // Getters


      var _proto = Modal.prototype;

      // Public
      _proto.toggle = function toggle(relatedTarget) {
        return this._isShown ? this.hide() : this.show(relatedTarget);
      };

      _proto.show = function show(relatedTarget) {
        var _this = this;

        if (this._isTransitioning || this._isShown) {
          return;
        }

        if ($$$1(this._element).hasClass(ClassName.FADE)) {
          this._isTransitioning = true;
        }

        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: relatedTarget
        });
        $$$1(this._element).trigger(showEvent);

        if (this._isShown || showEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = true;

        this._checkScrollbar();

        this._setScrollbar();

        this._adjustDialog();

        $$$1(document.body).addClass(ClassName.OPEN);

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(this._element).on(Event.CLICK_DISMISS, Selector.DATA_DISMISS, function (event) {
          return _this.hide(event);
        });
        $$$1(this._dialog).on(Event.MOUSEDOWN_DISMISS, function () {
          $$$1(_this._element).one(Event.MOUSEUP_DISMISS, function (event) {
            if ($$$1(event.target).is(_this._element)) {
              _this._ignoreBackdropClick = true;
            }
          });
        });

        this._showBackdrop(function () {
          return _this._showElement(relatedTarget);
        });
      };

      _proto.hide = function hide(event) {
        var _this2 = this;

        if (event) {
          event.preventDefault();
        }

        if (this._isTransitioning || !this._isShown) {
          return;
        }

        var hideEvent = $$$1.Event(Event.HIDE);
        $$$1(this._element).trigger(hideEvent);

        if (!this._isShown || hideEvent.isDefaultPrevented()) {
          return;
        }

        this._isShown = false;
        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (transition) {
          this._isTransitioning = true;
        }

        this._setEscapeEvent();

        this._setResizeEvent();

        $$$1(document).off(Event.FOCUSIN);
        $$$1(this._element).removeClass(ClassName.SHOW);
        $$$1(this._element).off(Event.CLICK_DISMISS);
        $$$1(this._dialog).off(Event.MOUSEDOWN_DISMISS);

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._element).one(Util.TRANSITION_END, function (event) {
            return _this2._hideModal(event);
          }).emulateTransitionEnd(transitionDuration);
        } else {
          this._hideModal();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(window, document, this._element, this._backdrop).off(EVENT_KEY);
        this._config = null;
        this._element = null;
        this._dialog = null;
        this._backdrop = null;
        this._isShown = null;
        this._isBodyOverflowing = null;
        this._ignoreBackdropClick = null;
        this._scrollbarWidth = null;
      };

      _proto.handleUpdate = function handleUpdate() {
        this._adjustDialog();
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, config);
        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._showElement = function _showElement(relatedTarget) {
        var _this3 = this;

        var transition = $$$1(this._element).hasClass(ClassName.FADE);

        if (!this._element.parentNode || this._element.parentNode.nodeType !== Node.ELEMENT_NODE) {
          // Don't move modal's DOM position
          document.body.appendChild(this._element);
        }

        this._element.style.display = 'block';

        this._element.removeAttribute('aria-hidden');

        this._element.scrollTop = 0;

        if (transition) {
          Util.reflow(this._element);
        }

        $$$1(this._element).addClass(ClassName.SHOW);

        if (this._config.focus) {
          this._enforceFocus();
        }

        var shownEvent = $$$1.Event(Event.SHOWN, {
          relatedTarget: relatedTarget
        });

        var transitionComplete = function transitionComplete() {
          if (_this3._config.focus) {
            _this3._element.focus();
          }

          _this3._isTransitioning = false;
          $$$1(_this3._element).trigger(shownEvent);
        };

        if (transition) {
          var transitionDuration = Util.getTransitionDurationFromElement(this._element);
          $$$1(this._dialog).one(Util.TRANSITION_END, transitionComplete).emulateTransitionEnd(transitionDuration);
        } else {
          transitionComplete();
        }
      };

      _proto._enforceFocus = function _enforceFocus() {
        var _this4 = this;

        $$$1(document).off(Event.FOCUSIN) // Guard against infinite focus loop
        .on(Event.FOCUSIN, function (event) {
          if (document !== event.target && _this4._element !== event.target && $$$1(_this4._element).has(event.target).length === 0) {
            _this4._element.focus();
          }
        });
      };

      _proto._setEscapeEvent = function _setEscapeEvent() {
        var _this5 = this;

        if (this._isShown && this._config.keyboard) {
          $$$1(this._element).on(Event.KEYDOWN_DISMISS, function (event) {
            if (event.which === ESCAPE_KEYCODE) {
              event.preventDefault();

              _this5.hide();
            }
          });
        } else if (!this._isShown) {
          $$$1(this._element).off(Event.KEYDOWN_DISMISS);
        }
      };

      _proto._setResizeEvent = function _setResizeEvent() {
        var _this6 = this;

        if (this._isShown) {
          $$$1(window).on(Event.RESIZE, function (event) {
            return _this6.handleUpdate(event);
          });
        } else {
          $$$1(window).off(Event.RESIZE);
        }
      };

      _proto._hideModal = function _hideModal() {
        var _this7 = this;

        this._element.style.display = 'none';

        this._element.setAttribute('aria-hidden', true);

        this._isTransitioning = false;

        this._showBackdrop(function () {
          $$$1(document.body).removeClass(ClassName.OPEN);

          _this7._resetAdjustments();

          _this7._resetScrollbar();

          $$$1(_this7._element).trigger(Event.HIDDEN);
        });
      };

      _proto._removeBackdrop = function _removeBackdrop() {
        if (this._backdrop) {
          $$$1(this._backdrop).remove();
          this._backdrop = null;
        }
      };

      _proto._showBackdrop = function _showBackdrop(callback) {
        var _this8 = this;

        var animate = $$$1(this._element).hasClass(ClassName.FADE) ? ClassName.FADE : '';

        if (this._isShown && this._config.backdrop) {
          this._backdrop = document.createElement('div');
          this._backdrop.className = ClassName.BACKDROP;

          if (animate) {
            this._backdrop.classList.add(animate);
          }

          $$$1(this._backdrop).appendTo(document.body);
          $$$1(this._element).on(Event.CLICK_DISMISS, function (event) {
            if (_this8._ignoreBackdropClick) {
              _this8._ignoreBackdropClick = false;
              return;
            }

            if (event.target !== event.currentTarget) {
              return;
            }

            if (_this8._config.backdrop === 'static') {
              _this8._element.focus();
            } else {
              _this8.hide();
            }
          });

          if (animate) {
            Util.reflow(this._backdrop);
          }

          $$$1(this._backdrop).addClass(ClassName.SHOW);

          if (!callback) {
            return;
          }

          if (!animate) {
            callback();
            return;
          }

          var backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);
          $$$1(this._backdrop).one(Util.TRANSITION_END, callback).emulateTransitionEnd(backdropTransitionDuration);
        } else if (!this._isShown && this._backdrop) {
          $$$1(this._backdrop).removeClass(ClassName.SHOW);

          var callbackRemove = function callbackRemove() {
            _this8._removeBackdrop();

            if (callback) {
              callback();
            }
          };

          if ($$$1(this._element).hasClass(ClassName.FADE)) {
            var _backdropTransitionDuration = Util.getTransitionDurationFromElement(this._backdrop);

            $$$1(this._backdrop).one(Util.TRANSITION_END, callbackRemove).emulateTransitionEnd(_backdropTransitionDuration);
          } else {
            callbackRemove();
          }
        } else if (callback) {
          callback();
        }
      }; // ----------------------------------------------------------------------
      // the following methods are used to handle overflowing modals
      // todo (fat): these should probably be refactored out of modal.js
      // ----------------------------------------------------------------------


      _proto._adjustDialog = function _adjustDialog() {
        var isModalOverflowing = this._element.scrollHeight > document.documentElement.clientHeight;

        if (!this._isBodyOverflowing && isModalOverflowing) {
          this._element.style.paddingLeft = this._scrollbarWidth + "px";
        }

        if (this._isBodyOverflowing && !isModalOverflowing) {
          this._element.style.paddingRight = this._scrollbarWidth + "px";
        }
      };

      _proto._resetAdjustments = function _resetAdjustments() {
        this._element.style.paddingLeft = '';
        this._element.style.paddingRight = '';
      };

      _proto._checkScrollbar = function _checkScrollbar() {
        var rect = document.body.getBoundingClientRect();
        this._isBodyOverflowing = rect.left + rect.right < window.innerWidth;
        this._scrollbarWidth = this._getScrollbarWidth();
      };

      _proto._setScrollbar = function _setScrollbar() {
        var _this9 = this;

        if (this._isBodyOverflowing) {
          // Note: DOMNode.style.paddingRight returns the actual value or '' if not set
          //   while $(DOMNode).css('padding-right') returns the calculated value or 0 if not set
          var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
          var stickyContent = [].slice.call(document.querySelectorAll(Selector.STICKY_CONTENT)); // Adjust fixed content padding

          $$$1(fixedContent).each(function (index, element) {
            var actualPadding = element.style.paddingRight;
            var calculatedPadding = $$$1(element).css('padding-right');
            $$$1(element).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + _this9._scrollbarWidth + "px");
          }); // Adjust sticky content margin

          $$$1(stickyContent).each(function (index, element) {
            var actualMargin = element.style.marginRight;
            var calculatedMargin = $$$1(element).css('margin-right');
            $$$1(element).data('margin-right', actualMargin).css('margin-right', parseFloat(calculatedMargin) - _this9._scrollbarWidth + "px");
          }); // Adjust body padding

          var actualPadding = document.body.style.paddingRight;
          var calculatedPadding = $$$1(document.body).css('padding-right');
          $$$1(document.body).data('padding-right', actualPadding).css('padding-right', parseFloat(calculatedPadding) + this._scrollbarWidth + "px");
        }
      };

      _proto._resetScrollbar = function _resetScrollbar() {
        // Restore fixed content padding
        var fixedContent = [].slice.call(document.querySelectorAll(Selector.FIXED_CONTENT));
        $$$1(fixedContent).each(function (index, element) {
          var padding = $$$1(element).data('padding-right');
          $$$1(element).removeData('padding-right');
          element.style.paddingRight = padding ? padding : '';
        }); // Restore sticky content

        var elements = [].slice.call(document.querySelectorAll("" + Selector.STICKY_CONTENT));
        $$$1(elements).each(function (index, element) {
          var margin = $$$1(element).data('margin-right');

          if (typeof margin !== 'undefined') {
            $$$1(element).css('margin-right', margin).removeData('margin-right');
          }
        }); // Restore body padding

        var padding = $$$1(document.body).data('padding-right');
        $$$1(document.body).removeData('padding-right');
        document.body.style.paddingRight = padding ? padding : '';
      };

      _proto._getScrollbarWidth = function _getScrollbarWidth() {
        // thx d.walsh
        var scrollDiv = document.createElement('div');
        scrollDiv.className = ClassName.SCROLLBAR_MEASURER;
        document.body.appendChild(scrollDiv);
        var scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
        document.body.removeChild(scrollDiv);
        return scrollbarWidth;
      }; // Static


      Modal._jQueryInterface = function _jQueryInterface(config, relatedTarget) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = _objectSpread({}, Default, $$$1(this).data(), typeof config === 'object' && config ? config : {});

          if (!data) {
            data = new Modal(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config](relatedTarget);
          } else if (_config.show) {
            data.show(relatedTarget);
          }
        });
      };

      _createClass(Modal, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return Modal;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      var _this10 = this;

      var target;
      var selector = Util.getSelectorFromElement(this);

      if (selector) {
        target = document.querySelector(selector);
      }

      var config = $$$1(target).data(DATA_KEY) ? 'toggle' : _objectSpread({}, $$$1(target).data(), $$$1(this).data());

      if (this.tagName === 'A' || this.tagName === 'AREA') {
        event.preventDefault();
      }

      var $target = $$$1(target).one(Event.SHOW, function (showEvent) {
        if (showEvent.isDefaultPrevented()) {
          // Only register focus restorer if modal will actually get shown
          return;
        }

        $target.one(Event.HIDDEN, function () {
          if ($$$1(_this10).is(':visible')) {
            _this10.focus();
          }
        });
      });

      Modal._jQueryInterface.call($$$1(target), config, this);
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Modal._jQueryInterface;
    $$$1.fn[NAME].Constructor = Modal;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Modal._jQueryInterface;
    };

    return Modal;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tooltip.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tooltip = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tooltip';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tooltip';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-tooltip';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');
    var DefaultType = {
      animation: 'boolean',
      template: 'string',
      title: '(string|element|function)',
      trigger: 'string',
      delay: '(number|object)',
      html: 'boolean',
      selector: '(string|boolean)',
      placement: '(string|function)',
      offset: '(number|string)',
      container: '(string|element|boolean)',
      fallbackPlacement: '(string|array)',
      boundary: '(string|element)'
    };
    var AttachmentMap = {
      AUTO: 'auto',
      TOP: 'top',
      RIGHT: 'right',
      BOTTOM: 'bottom',
      LEFT: 'left'
    };
    var Default = {
      animation: true,
      template: '<div class="tooltip" role="tooltip">' + '<div class="arrow"></div>' + '<div class="tooltip-inner"></div></div>',
      trigger: 'hover focus',
      title: '',
      delay: 0,
      html: false,
      selector: false,
      placement: 'top',
      offset: 0,
      container: false,
      fallbackPlacement: 'flip',
      boundary: 'scrollParent'
    };
    var HoverState = {
      SHOW: 'show',
      OUT: 'out'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
    };
    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TOOLTIP: '.tooltip',
      TOOLTIP_INNER: '.tooltip-inner',
      ARROW: '.arrow'
    };
    var Trigger = {
      HOVER: 'hover',
      FOCUS: 'focus',
      CLICK: 'click',
      MANUAL: 'manual'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tooltip =
    /*#__PURE__*/
    function () {
      function Tooltip(element, config) {
        /**
         * Check for Popper dependency
         * Popper - https://popper.js.org
         */
        if (typeof Popper === 'undefined') {
          throw new TypeError('Bootstrap tooltips require Popper.js (https://popper.js.org)');
        } // private


        this._isEnabled = true;
        this._timeout = 0;
        this._hoverState = '';
        this._activeTrigger = {};
        this._popper = null; // Protected

        this.element = element;
        this.config = this._getConfig(config);
        this.tip = null;

        this._setListeners();
      } // Getters


      var _proto = Tooltip.prototype;

      // Public
      _proto.enable = function enable() {
        this._isEnabled = true;
      };

      _proto.disable = function disable() {
        this._isEnabled = false;
      };

      _proto.toggleEnabled = function toggleEnabled() {
        this._isEnabled = !this._isEnabled;
      };

      _proto.toggle = function toggle(event) {
        if (!this._isEnabled) {
          return;
        }

        if (event) {
          var dataKey = this.constructor.DATA_KEY;
          var context = $$$1(event.currentTarget).data(dataKey);

          if (!context) {
            context = new this.constructor(event.currentTarget, this._getDelegateConfig());
            $$$1(event.currentTarget).data(dataKey, context);
          }

          context._activeTrigger.click = !context._activeTrigger.click;

          if (context._isWithActiveTrigger()) {
            context._enter(null, context);
          } else {
            context._leave(null, context);
          }
        } else {
          if ($$$1(this.getTipElement()).hasClass(ClassName.SHOW)) {
            this._leave(null, this);

            return;
          }

          this._enter(null, this);
        }
      };

      _proto.dispose = function dispose() {
        clearTimeout(this._timeout);
        $$$1.removeData(this.element, this.constructor.DATA_KEY);
        $$$1(this.element).off(this.constructor.EVENT_KEY);
        $$$1(this.element).closest('.modal').off('hide.bs.modal');

        if (this.tip) {
          $$$1(this.tip).remove();
        }

        this._isEnabled = null;
        this._timeout = null;
        this._hoverState = null;
        this._activeTrigger = null;

        if (this._popper !== null) {
          this._popper.destroy();
        }

        this._popper = null;
        this.element = null;
        this.config = null;
        this.tip = null;
      };

      _proto.show = function show() {
        var _this = this;

        if ($$$1(this.element).css('display') === 'none') {
          throw new Error('Please use show on visible elements');
        }

        var showEvent = $$$1.Event(this.constructor.Event.SHOW);

        if (this.isWithContent() && this._isEnabled) {
          $$$1(this.element).trigger(showEvent);
          var isInTheDom = $$$1.contains(this.element.ownerDocument.documentElement, this.element);

          if (showEvent.isDefaultPrevented() || !isInTheDom) {
            return;
          }

          var tip = this.getTipElement();
          var tipId = Util.getUID(this.constructor.NAME);
          tip.setAttribute('id', tipId);
          this.element.setAttribute('aria-describedby', tipId);
          this.setContent();

          if (this.config.animation) {
            $$$1(tip).addClass(ClassName.FADE);
          }

          var placement = typeof this.config.placement === 'function' ? this.config.placement.call(this, tip, this.element) : this.config.placement;

          var attachment = this._getAttachment(placement);

          this.addAttachmentClass(attachment);
          var container = this.config.container === false ? document.body : $$$1(document).find(this.config.container);
          $$$1(tip).data(this.constructor.DATA_KEY, this);

          if (!$$$1.contains(this.element.ownerDocument.documentElement, this.tip)) {
            $$$1(tip).appendTo(container);
          }

          $$$1(this.element).trigger(this.constructor.Event.INSERTED);
          this._popper = new Popper(this.element, tip, {
            placement: attachment,
            modifiers: {
              offset: {
                offset: this.config.offset
              },
              flip: {
                behavior: this.config.fallbackPlacement
              },
              arrow: {
                element: Selector.ARROW
              },
              preventOverflow: {
                boundariesElement: this.config.boundary
              }
            },
            onCreate: function onCreate(data) {
              if (data.originalPlacement !== data.placement) {
                _this._handlePopperPlacementChange(data);
              }
            },
            onUpdate: function onUpdate(data) {
              _this._handlePopperPlacementChange(data);
            }
          });
          $$$1(tip).addClass(ClassName.SHOW); // If this is a touch-enabled device we add extra
          // empty mouseover listeners to the body's immediate children;
          // only needed because of broken event delegation on iOS
          // https://www.quirksmode.org/blog/archives/2014/02/mouse_event_bub.html

          if ('ontouchstart' in document.documentElement) {
            $$$1(document.body).children().on('mouseover', null, $$$1.noop);
          }

          var complete = function complete() {
            if (_this.config.animation) {
              _this._fixTransition();
            }

            var prevHoverState = _this._hoverState;
            _this._hoverState = null;
            $$$1(_this.element).trigger(_this.constructor.Event.SHOWN);

            if (prevHoverState === HoverState.OUT) {
              _this._leave(null, _this);
            }
          };

          if ($$$1(this.tip).hasClass(ClassName.FADE)) {
            var transitionDuration = Util.getTransitionDurationFromElement(this.tip);
            $$$1(this.tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
          } else {
            complete();
          }
        }
      };

      _proto.hide = function hide(callback) {
        var _this2 = this;

        var tip = this.getTipElement();
        var hideEvent = $$$1.Event(this.constructor.Event.HIDE);

        var complete = function complete() {
          if (_this2._hoverState !== HoverState.SHOW && tip.parentNode) {
            tip.parentNode.removeChild(tip);
          }

          _this2._cleanTipClass();

          _this2.element.removeAttribute('aria-describedby');

          $$$1(_this2.element).trigger(_this2.constructor.Event.HIDDEN);

          if (_this2._popper !== null) {
            _this2._popper.destroy();
          }

          if (callback) {
            callback();
          }
        };

        $$$1(this.element).trigger(hideEvent);

        if (hideEvent.isDefaultPrevented()) {
          return;
        }

        $$$1(tip).removeClass(ClassName.SHOW); // If this is a touch-enabled device we remove the extra
        // empty mouseover listeners we added for iOS support

        if ('ontouchstart' in document.documentElement) {
          $$$1(document.body).children().off('mouseover', null, $$$1.noop);
        }

        this._activeTrigger[Trigger.CLICK] = false;
        this._activeTrigger[Trigger.FOCUS] = false;
        this._activeTrigger[Trigger.HOVER] = false;

        if ($$$1(this.tip).hasClass(ClassName.FADE)) {
          var transitionDuration = Util.getTransitionDurationFromElement(tip);
          $$$1(tip).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }

        this._hoverState = '';
      };

      _proto.update = function update() {
        if (this._popper !== null) {
          this._popper.scheduleUpdate();
        }
      }; // Protected


      _proto.isWithContent = function isWithContent() {
        return Boolean(this.getTitle());
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var tip = this.getTipElement();
        this.setElementContent($$$1(tip.querySelectorAll(Selector.TOOLTIP_INNER)), this.getTitle());
        $$$1(tip).removeClass(ClassName.FADE + " " + ClassName.SHOW);
      };

      _proto.setElementContent = function setElementContent($element, content) {
        var html = this.config.html;

        if (typeof content === 'object' && (content.nodeType || content.jquery)) {
          // Content is a DOM node or a jQuery
          if (html) {
            if (!$$$1(content).parent().is($element)) {
              $element.empty().append(content);
            }
          } else {
            $element.text($$$1(content).text());
          }
        } else {
          $element[html ? 'html' : 'text'](content);
        }
      };

      _proto.getTitle = function getTitle() {
        var title = this.element.getAttribute('data-original-title');

        if (!title) {
          title = typeof this.config.title === 'function' ? this.config.title.call(this.element) : this.config.title;
        }

        return title;
      }; // Private


      _proto._getAttachment = function _getAttachment(placement) {
        return AttachmentMap[placement.toUpperCase()];
      };

      _proto._setListeners = function _setListeners() {
        var _this3 = this;

        var triggers = this.config.trigger.split(' ');
        triggers.forEach(function (trigger) {
          if (trigger === 'click') {
            $$$1(_this3.element).on(_this3.constructor.Event.CLICK, _this3.config.selector, function (event) {
              return _this3.toggle(event);
            });
          } else if (trigger !== Trigger.MANUAL) {
            var eventIn = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSEENTER : _this3.constructor.Event.FOCUSIN;
            var eventOut = trigger === Trigger.HOVER ? _this3.constructor.Event.MOUSELEAVE : _this3.constructor.Event.FOCUSOUT;
            $$$1(_this3.element).on(eventIn, _this3.config.selector, function (event) {
              return _this3._enter(event);
            }).on(eventOut, _this3.config.selector, function (event) {
              return _this3._leave(event);
            });
          }

          $$$1(_this3.element).closest('.modal').on('hide.bs.modal', function () {
            return _this3.hide();
          });
        });

        if (this.config.selector) {
          this.config = _objectSpread({}, this.config, {
            trigger: 'manual',
            selector: ''
          });
        } else {
          this._fixTitle();
        }
      };

      _proto._fixTitle = function _fixTitle() {
        var titleType = typeof this.element.getAttribute('data-original-title');

        if (this.element.getAttribute('title') || titleType !== 'string') {
          this.element.setAttribute('data-original-title', this.element.getAttribute('title') || '');
          this.element.setAttribute('title', '');
        }
      };

      _proto._enter = function _enter(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusin' ? Trigger.FOCUS : Trigger.HOVER] = true;
        }

        if ($$$1(context.getTipElement()).hasClass(ClassName.SHOW) || context._hoverState === HoverState.SHOW) {
          context._hoverState = HoverState.SHOW;
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.SHOW;

        if (!context.config.delay || !context.config.delay.show) {
          context.show();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.SHOW) {
            context.show();
          }
        }, context.config.delay.show);
      };

      _proto._leave = function _leave(event, context) {
        var dataKey = this.constructor.DATA_KEY;
        context = context || $$$1(event.currentTarget).data(dataKey);

        if (!context) {
          context = new this.constructor(event.currentTarget, this._getDelegateConfig());
          $$$1(event.currentTarget).data(dataKey, context);
        }

        if (event) {
          context._activeTrigger[event.type === 'focusout' ? Trigger.FOCUS : Trigger.HOVER] = false;
        }

        if (context._isWithActiveTrigger()) {
          return;
        }

        clearTimeout(context._timeout);
        context._hoverState = HoverState.OUT;

        if (!context.config.delay || !context.config.delay.hide) {
          context.hide();
          return;
        }

        context._timeout = setTimeout(function () {
          if (context._hoverState === HoverState.OUT) {
            context.hide();
          }
        }, context.config.delay.hide);
      };

      _proto._isWithActiveTrigger = function _isWithActiveTrigger() {
        for (var trigger in this._activeTrigger) {
          if (this._activeTrigger[trigger]) {
            return true;
          }
        }

        return false;
      };

      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, this.constructor.Default, $$$1(this.element).data(), typeof config === 'object' && config ? config : {});

        if (typeof config.delay === 'number') {
          config.delay = {
            show: config.delay,
            hide: config.delay
          };
        }

        if (typeof config.title === 'number') {
          config.title = config.title.toString();
        }

        if (typeof config.content === 'number') {
          config.content = config.content.toString();
        }

        Util.typeCheckConfig(NAME, config, this.constructor.DefaultType);
        return config;
      };

      _proto._getDelegateConfig = function _getDelegateConfig() {
        var config = {};

        if (this.config) {
          for (var key in this.config) {
            if (this.constructor.Default[key] !== this.config[key]) {
              config[key] = this.config[key];
            }
          }
        }

        return config;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length) {
          $tip.removeClass(tabClass.join(''));
        }
      };

      _proto._handlePopperPlacementChange = function _handlePopperPlacementChange(popperData) {
        var popperInstance = popperData.instance;
        this.tip = popperInstance.popper;

        this._cleanTipClass();

        this.addAttachmentClass(this._getAttachment(popperData.placement));
      };

      _proto._fixTransition = function _fixTransition() {
        var tip = this.getTipElement();
        var initConfigAnimation = this.config.animation;

        if (tip.getAttribute('x-placement') !== null) {
          return;
        }

        $$$1(tip).removeClass(ClassName.FADE);
        this.config.animation = false;
        this.hide();
        this.show();
        this.config.animation = initConfigAnimation;
      }; // Static


      Tooltip._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data && /dispose|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Tooltip(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tooltip, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Tooltip;
    }();
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Tooltip._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tooltip;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tooltip._jQueryInterface;
    };

    return Tooltip;
  }($, Popper);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): popover.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Popover = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'popover';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.popover';
    var EVENT_KEY = "." + DATA_KEY;
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var CLASS_PREFIX = 'bs-popover';
    var BSCLS_PREFIX_REGEX = new RegExp("(^|\\s)" + CLASS_PREFIX + "\\S+", 'g');

    var Default = _objectSpread({}, Tooltip.Default, {
      placement: 'right',
      trigger: 'click',
      content: '',
      template: '<div class="popover" role="tooltip">' + '<div class="arrow"></div>' + '<h3 class="popover-header"></h3>' + '<div class="popover-body"></div></div>'
    });

    var DefaultType = _objectSpread({}, Tooltip.DefaultType, {
      content: '(string|element|function)'
    });

    var ClassName = {
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      TITLE: '.popover-header',
      CONTENT: '.popover-body'
    };
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      INSERTED: "inserted" + EVENT_KEY,
      CLICK: "click" + EVENT_KEY,
      FOCUSIN: "focusin" + EVENT_KEY,
      FOCUSOUT: "focusout" + EVENT_KEY,
      MOUSEENTER: "mouseenter" + EVENT_KEY,
      MOUSELEAVE: "mouseleave" + EVENT_KEY
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Popover =
    /*#__PURE__*/
    function (_Tooltip) {
      _inheritsLoose(Popover, _Tooltip);

      function Popover() {
        return _Tooltip.apply(this, arguments) || this;
      }

      var _proto = Popover.prototype;

      // Overrides
      _proto.isWithContent = function isWithContent() {
        return this.getTitle() || this._getContent();
      };

      _proto.addAttachmentClass = function addAttachmentClass(attachment) {
        $$$1(this.getTipElement()).addClass(CLASS_PREFIX + "-" + attachment);
      };

      _proto.getTipElement = function getTipElement() {
        this.tip = this.tip || $$$1(this.config.template)[0];
        return this.tip;
      };

      _proto.setContent = function setContent() {
        var $tip = $$$1(this.getTipElement()); // We use append for html objects to maintain js events

        this.setElementContent($tip.find(Selector.TITLE), this.getTitle());

        var content = this._getContent();

        if (typeof content === 'function') {
          content = content.call(this.element);
        }

        this.setElementContent($tip.find(Selector.CONTENT), content);
        $tip.removeClass(ClassName.FADE + " " + ClassName.SHOW);
      }; // Private


      _proto._getContent = function _getContent() {
        return this.element.getAttribute('data-content') || this.config.content;
      };

      _proto._cleanTipClass = function _cleanTipClass() {
        var $tip = $$$1(this.getTipElement());
        var tabClass = $tip.attr('class').match(BSCLS_PREFIX_REGEX);

        if (tabClass !== null && tabClass.length > 0) {
          $tip.removeClass(tabClass.join(''));
        }
      }; // Static


      Popover._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' ? config : null;

          if (!data && /destroy|hide/.test(config)) {
            return;
          }

          if (!data) {
            data = new Popover(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Popover, null, [{
        key: "VERSION",
        // Getters
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }, {
        key: "NAME",
        get: function get() {
          return NAME;
        }
      }, {
        key: "DATA_KEY",
        get: function get() {
          return DATA_KEY;
        }
      }, {
        key: "Event",
        get: function get() {
          return Event;
        }
      }, {
        key: "EVENT_KEY",
        get: function get() {
          return EVENT_KEY;
        }
      }, {
        key: "DefaultType",
        get: function get() {
          return DefaultType;
        }
      }]);

      return Popover;
    }(Tooltip);
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */


    $$$1.fn[NAME] = Popover._jQueryInterface;
    $$$1.fn[NAME].Constructor = Popover;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Popover._jQueryInterface;
    };

    return Popover;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): scrollspy.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var ScrollSpy = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'scrollspy';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.scrollspy';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Default = {
      offset: 10,
      method: 'auto',
      target: ''
    };
    var DefaultType = {
      offset: 'number',
      method: 'string',
      target: '(string|element)'
    };
    var Event = {
      ACTIVATE: "activate" + EVENT_KEY,
      SCROLL: "scroll" + EVENT_KEY,
      LOAD_DATA_API: "load" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_ITEM: 'dropdown-item',
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active'
    };
    var Selector = {
      DATA_SPY: '[data-spy="scroll"]',
      ACTIVE: '.active',
      NAV_LIST_GROUP: '.nav, .list-group',
      NAV_LINKS: '.nav-link',
      NAV_ITEMS: '.nav-item',
      LIST_ITEMS: '.list-group-item',
      DROPDOWN: '.dropdown',
      DROPDOWN_ITEMS: '.dropdown-item',
      DROPDOWN_TOGGLE: '.dropdown-toggle'
    };
    var OffsetMethod = {
      OFFSET: 'offset',
      POSITION: 'position'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var ScrollSpy =
    /*#__PURE__*/
    function () {
      function ScrollSpy(element, config) {
        var _this = this;

        this._element = element;
        this._scrollElement = element.tagName === 'BODY' ? window : element;
        this._config = this._getConfig(config);
        this._selector = this._config.target + " " + Selector.NAV_LINKS + "," + (this._config.target + " " + Selector.LIST_ITEMS + ",") + (this._config.target + " " + Selector.DROPDOWN_ITEMS);
        this._offsets = [];
        this._targets = [];
        this._activeTarget = null;
        this._scrollHeight = 0;
        $$$1(this._scrollElement).on(Event.SCROLL, function (event) {
          return _this._process(event);
        });
        this.refresh();

        this._process();
      } // Getters


      var _proto = ScrollSpy.prototype;

      // Public
      _proto.refresh = function refresh() {
        var _this2 = this;

        var autoMethod = this._scrollElement === this._scrollElement.window ? OffsetMethod.OFFSET : OffsetMethod.POSITION;
        var offsetMethod = this._config.method === 'auto' ? autoMethod : this._config.method;
        var offsetBase = offsetMethod === OffsetMethod.POSITION ? this._getScrollTop() : 0;
        this._offsets = [];
        this._targets = [];
        this._scrollHeight = this._getScrollHeight();
        var targets = [].slice.call(document.querySelectorAll(this._selector));
        targets.map(function (element) {
          var target;
          var targetSelector = Util.getSelectorFromElement(element);

          if (targetSelector) {
            target = document.querySelector(targetSelector);
          }

          if (target) {
            var targetBCR = target.getBoundingClientRect();

            if (targetBCR.width || targetBCR.height) {
              // TODO (fat): remove sketch reliance on jQuery position/offset
              return [$$$1(target)[offsetMethod]().top + offsetBase, targetSelector];
            }
          }

          return null;
        }).filter(function (item) {
          return item;
        }).sort(function (a, b) {
          return a[0] - b[0];
        }).forEach(function (item) {
          _this2._offsets.push(item[0]);

          _this2._targets.push(item[1]);
        });
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        $$$1(this._scrollElement).off(EVENT_KEY);
        this._element = null;
        this._scrollElement = null;
        this._config = null;
        this._selector = null;
        this._offsets = null;
        this._targets = null;
        this._activeTarget = null;
        this._scrollHeight = null;
      }; // Private


      _proto._getConfig = function _getConfig(config) {
        config = _objectSpread({}, Default, typeof config === 'object' && config ? config : {});

        if (typeof config.target !== 'string') {
          var id = $$$1(config.target).attr('id');

          if (!id) {
            id = Util.getUID(NAME);
            $$$1(config.target).attr('id', id);
          }

          config.target = "#" + id;
        }

        Util.typeCheckConfig(NAME, config, DefaultType);
        return config;
      };

      _proto._getScrollTop = function _getScrollTop() {
        return this._scrollElement === window ? this._scrollElement.pageYOffset : this._scrollElement.scrollTop;
      };

      _proto._getScrollHeight = function _getScrollHeight() {
        return this._scrollElement.scrollHeight || Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
      };

      _proto._getOffsetHeight = function _getOffsetHeight() {
        return this._scrollElement === window ? window.innerHeight : this._scrollElement.getBoundingClientRect().height;
      };

      _proto._process = function _process() {
        var scrollTop = this._getScrollTop() + this._config.offset;

        var scrollHeight = this._getScrollHeight();

        var maxScroll = this._config.offset + scrollHeight - this._getOffsetHeight();

        if (this._scrollHeight !== scrollHeight) {
          this.refresh();
        }

        if (scrollTop >= maxScroll) {
          var target = this._targets[this._targets.length - 1];

          if (this._activeTarget !== target) {
            this._activate(target);
          }

          return;
        }

        if (this._activeTarget && scrollTop < this._offsets[0] && this._offsets[0] > 0) {
          this._activeTarget = null;

          this._clear();

          return;
        }

        var offsetLength = this._offsets.length;

        for (var i = offsetLength; i--;) {
          var isActiveTarget = this._activeTarget !== this._targets[i] && scrollTop >= this._offsets[i] && (typeof this._offsets[i + 1] === 'undefined' || scrollTop < this._offsets[i + 1]);

          if (isActiveTarget) {
            this._activate(this._targets[i]);
          }
        }
      };

      _proto._activate = function _activate(target) {
        this._activeTarget = target;

        this._clear();

        var queries = this._selector.split(','); // eslint-disable-next-line arrow-body-style


        queries = queries.map(function (selector) {
          return selector + "[data-target=\"" + target + "\"]," + (selector + "[href=\"" + target + "\"]");
        });
        var $link = $$$1([].slice.call(document.querySelectorAll(queries.join(','))));

        if ($link.hasClass(ClassName.DROPDOWN_ITEM)) {
          $link.closest(Selector.DROPDOWN).find(Selector.DROPDOWN_TOGGLE).addClass(ClassName.ACTIVE);
          $link.addClass(ClassName.ACTIVE);
        } else {
          // Set triggered link as active
          $link.addClass(ClassName.ACTIVE); // Set triggered links parents as active
          // With both <ul> and <nav> markup a parent is the previous sibling of any nav ancestor

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_LINKS + ", " + Selector.LIST_ITEMS).addClass(ClassName.ACTIVE); // Handle special case when .nav-link is inside .nav-item

          $link.parents(Selector.NAV_LIST_GROUP).prev(Selector.NAV_ITEMS).children(Selector.NAV_LINKS).addClass(ClassName.ACTIVE);
        }

        $$$1(this._scrollElement).trigger(Event.ACTIVATE, {
          relatedTarget: target
        });
      };

      _proto._clear = function _clear() {
        var nodes = [].slice.call(document.querySelectorAll(this._selector));
        $$$1(nodes).filter(Selector.ACTIVE).removeClass(ClassName.ACTIVE);
      }; // Static


      ScrollSpy._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var data = $$$1(this).data(DATA_KEY);

          var _config = typeof config === 'object' && config;

          if (!data) {
            data = new ScrollSpy(this, _config);
            $$$1(this).data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(ScrollSpy, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }, {
        key: "Default",
        get: function get() {
          return Default;
        }
      }]);

      return ScrollSpy;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(window).on(Event.LOAD_DATA_API, function () {
      var scrollSpys = [].slice.call(document.querySelectorAll(Selector.DATA_SPY));
      var scrollSpysLength = scrollSpys.length;

      for (var i = scrollSpysLength; i--;) {
        var $spy = $$$1(scrollSpys[i]);

        ScrollSpy._jQueryInterface.call($spy, $spy.data());
      }
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = ScrollSpy._jQueryInterface;
    $$$1.fn[NAME].Constructor = ScrollSpy;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return ScrollSpy._jQueryInterface;
    };

    return ScrollSpy;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): tab.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  var Tab = function ($$$1) {
    /**
     * ------------------------------------------------------------------------
     * Constants
     * ------------------------------------------------------------------------
     */
    var NAME = 'tab';
    var VERSION = '4.1.3';
    var DATA_KEY = 'bs.tab';
    var EVENT_KEY = "." + DATA_KEY;
    var DATA_API_KEY = '.data-api';
    var JQUERY_NO_CONFLICT = $$$1.fn[NAME];
    var Event = {
      HIDE: "hide" + EVENT_KEY,
      HIDDEN: "hidden" + EVENT_KEY,
      SHOW: "show" + EVENT_KEY,
      SHOWN: "shown" + EVENT_KEY,
      CLICK_DATA_API: "click" + EVENT_KEY + DATA_API_KEY
    };
    var ClassName = {
      DROPDOWN_MENU: 'dropdown-menu',
      ACTIVE: 'active',
      DISABLED: 'disabled',
      FADE: 'fade',
      SHOW: 'show'
    };
    var Selector = {
      DROPDOWN: '.dropdown',
      NAV_LIST_GROUP: '.nav, .list-group',
      ACTIVE: '.active',
      ACTIVE_UL: '> li > .active',
      DATA_TOGGLE: '[data-toggle="tab"], [data-toggle="pill"], [data-toggle="list"]',
      DROPDOWN_TOGGLE: '.dropdown-toggle',
      DROPDOWN_ACTIVE_CHILD: '> .dropdown-menu .active'
      /**
       * ------------------------------------------------------------------------
       * Class Definition
       * ------------------------------------------------------------------------
       */

    };

    var Tab =
    /*#__PURE__*/
    function () {
      function Tab(element) {
        this._element = element;
      } // Getters


      var _proto = Tab.prototype;

      // Public
      _proto.show = function show() {
        var _this = this;

        if (this._element.parentNode && this._element.parentNode.nodeType === Node.ELEMENT_NODE && $$$1(this._element).hasClass(ClassName.ACTIVE) || $$$1(this._element).hasClass(ClassName.DISABLED)) {
          return;
        }

        var target;
        var previous;
        var listElement = $$$1(this._element).closest(Selector.NAV_LIST_GROUP)[0];
        var selector = Util.getSelectorFromElement(this._element);

        if (listElement) {
          var itemSelector = listElement.nodeName === 'UL' ? Selector.ACTIVE_UL : Selector.ACTIVE;
          previous = $$$1.makeArray($$$1(listElement).find(itemSelector));
          previous = previous[previous.length - 1];
        }

        var hideEvent = $$$1.Event(Event.HIDE, {
          relatedTarget: this._element
        });
        var showEvent = $$$1.Event(Event.SHOW, {
          relatedTarget: previous
        });

        if (previous) {
          $$$1(previous).trigger(hideEvent);
        }

        $$$1(this._element).trigger(showEvent);

        if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) {
          return;
        }

        if (selector) {
          target = document.querySelector(selector);
        }

        this._activate(this._element, listElement);

        var complete = function complete() {
          var hiddenEvent = $$$1.Event(Event.HIDDEN, {
            relatedTarget: _this._element
          });
          var shownEvent = $$$1.Event(Event.SHOWN, {
            relatedTarget: previous
          });
          $$$1(previous).trigger(hiddenEvent);
          $$$1(_this._element).trigger(shownEvent);
        };

        if (target) {
          this._activate(target, target.parentNode, complete);
        } else {
          complete();
        }
      };

      _proto.dispose = function dispose() {
        $$$1.removeData(this._element, DATA_KEY);
        this._element = null;
      }; // Private


      _proto._activate = function _activate(element, container, callback) {
        var _this2 = this;

        var activeElements;

        if (container.nodeName === 'UL') {
          activeElements = $$$1(container).find(Selector.ACTIVE_UL);
        } else {
          activeElements = $$$1(container).children(Selector.ACTIVE);
        }

        var active = activeElements[0];
        var isTransitioning = callback && active && $$$1(active).hasClass(ClassName.FADE);

        var complete = function complete() {
          return _this2._transitionComplete(element, active, callback);
        };

        if (active && isTransitioning) {
          var transitionDuration = Util.getTransitionDurationFromElement(active);
          $$$1(active).one(Util.TRANSITION_END, complete).emulateTransitionEnd(transitionDuration);
        } else {
          complete();
        }
      };

      _proto._transitionComplete = function _transitionComplete(element, active, callback) {
        if (active) {
          $$$1(active).removeClass(ClassName.SHOW + " " + ClassName.ACTIVE);
          var dropdownChild = $$$1(active.parentNode).find(Selector.DROPDOWN_ACTIVE_CHILD)[0];

          if (dropdownChild) {
            $$$1(dropdownChild).removeClass(ClassName.ACTIVE);
          }

          if (active.getAttribute('role') === 'tab') {
            active.setAttribute('aria-selected', false);
          }
        }

        $$$1(element).addClass(ClassName.ACTIVE);

        if (element.getAttribute('role') === 'tab') {
          element.setAttribute('aria-selected', true);
        }

        Util.reflow(element);
        $$$1(element).addClass(ClassName.SHOW);

        if (element.parentNode && $$$1(element.parentNode).hasClass(ClassName.DROPDOWN_MENU)) {
          var dropdownElement = $$$1(element).closest(Selector.DROPDOWN)[0];

          if (dropdownElement) {
            var dropdownToggleList = [].slice.call(dropdownElement.querySelectorAll(Selector.DROPDOWN_TOGGLE));
            $$$1(dropdownToggleList).addClass(ClassName.ACTIVE);
          }

          element.setAttribute('aria-expanded', true);
        }

        if (callback) {
          callback();
        }
      }; // Static


      Tab._jQueryInterface = function _jQueryInterface(config) {
        return this.each(function () {
          var $this = $$$1(this);
          var data = $this.data(DATA_KEY);

          if (!data) {
            data = new Tab(this);
            $this.data(DATA_KEY, data);
          }

          if (typeof config === 'string') {
            if (typeof data[config] === 'undefined') {
              throw new TypeError("No method named \"" + config + "\"");
            }

            data[config]();
          }
        });
      };

      _createClass(Tab, null, [{
        key: "VERSION",
        get: function get() {
          return VERSION;
        }
      }]);

      return Tab;
    }();
    /**
     * ------------------------------------------------------------------------
     * Data Api implementation
     * ------------------------------------------------------------------------
     */


    $$$1(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (event) {
      event.preventDefault();

      Tab._jQueryInterface.call($$$1(this), 'show');
    });
    /**
     * ------------------------------------------------------------------------
     * jQuery
     * ------------------------------------------------------------------------
     */

    $$$1.fn[NAME] = Tab._jQueryInterface;
    $$$1.fn[NAME].Constructor = Tab;

    $$$1.fn[NAME].noConflict = function () {
      $$$1.fn[NAME] = JQUERY_NO_CONFLICT;
      return Tab._jQueryInterface;
    };

    return Tab;
  }($);

  /**
   * --------------------------------------------------------------------------
   * Bootstrap (v4.1.3): index.js
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   * --------------------------------------------------------------------------
   */

  (function ($$$1) {
    if (typeof $$$1 === 'undefined') {
      throw new TypeError('Bootstrap\'s JavaScript requires jQuery. jQuery must be included before Bootstrap\'s JavaScript.');
    }

    var version = $$$1.fn.jquery.split(' ')[0].split('.');
    var minMajor = 1;
    var ltMajor = 2;
    var minMinor = 9;
    var minPatch = 1;
    var maxMajor = 4;

    if (version[0] < ltMajor && version[1] < minMinor || version[0] === minMajor && version[1] === minMinor && version[2] < minPatch || version[0] >= maxMajor) {
      throw new Error('Bootstrap\'s JavaScript requires at least jQuery v1.9.1 but less than v4.0.0');
    }
  })($);

  exports.Util = Util;
  exports.Alert = Alert;
  exports.Button = Button;
  exports.Carousel = Carousel;
  exports.Collapse = Collapse;
  exports.Dropdown = Dropdown;
  exports.Modal = Modal;
  exports.Popover = Popover;
  exports.Scrollspy = ScrollSpy;
  exports.Tab = Tab;
  exports.Tooltip = Tooltip;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bootstrap.js.map



    /**
     * ------------------------------------------------------------------------
     * JSON Data
     * ------------------------------------------------------------------------
     */


{
  "paging": {
    "page": 0,
    "pageSize": 500,
    "total": 205
  },
  "updated": "2018-12-20T14:07:46Z",
  "data": [
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "62040",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IA",
      "origZip": "52641",
      "destState": "IL",
      "awardsTried": false,
      "loadId": "11078110",
      "miles": 212,
      "shipId": "285329"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "74066",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OK",
      "origZip": "74403",
      "destState": "OK",
      "awardsTried": false,
      "loadId": "11079471",
      "miles": 40,
      "shipId": "285337"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "13027",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "origZip": "16502",
      "destState": "NY",
      "awardsTried": true,
      "loadId": "11079489",
      "miles": 229,
      "shipId": "285363"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "07101",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CT",
      "origZip": "06477",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11079659",
      "miles": 84,
      "shipId": "285430"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MI",
      "origZip": "48036",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11079816",
      "miles": 196,
      "shipId": "285443"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "43512",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11079912",
      "miles": 127,
      "shipId": "285463"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "44830",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11079913",
      "miles": 84,
      "shipId": "285458"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "07101",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "origZip": "19440",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11079961",
      "miles": 88,
      "shipId": "285452"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "KY",
      "origZip": "40218",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080004",
      "miles": 216,
      "shipId": "285474"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "30121",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MS",
      "origZip": "38868",
      "destState": "GA",
      "awardsTried": false,
      "loadId": "11080024",
      "miles": 266,
      "shipId": "285436"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "63118",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "origZip": "63043",
      "destState": "MO",
      "awardsTried": false,
      "loadId": "11080039",
      "miles": 22,
      "shipId": "285497"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "44857",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080052",
      "miles": 86,
      "shipId": "285516"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "44141",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080054",
      "miles": 120,
      "shipId": "285500"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "44141",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080055",
      "miles": 120,
      "shipId": "285499"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "43619",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080057",
      "miles": 119,
      "shipId": "285495"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "origZip": "45214",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080058",
      "miles": 115,
      "shipId": "285483"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43125",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MI",
      "origZip": "49855",
      "destState": "OH",
      "awardsTried": true,
      "loadId": "11080059",
      "miles": 631,
      "shipId": "285460"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "07101",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "origZip": "19440",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11080073",
      "miles": 88,
      "shipId": "285504"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "13027",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "origZip": "16502",
      "destState": "NY",
      "awardsTried": true,
      "loadId": "11080083",
      "miles": 229,
      "shipId": "285486"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "30121",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "origZip": "30071",
      "destState": "GA",
      "awardsTried": false,
      "loadId": "11080091",
      "miles": 47,
      "shipId": "285519"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "47348",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MI",
      "origZip": "49512",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11080097",
      "miles": 190,
      "shipId": "285511"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "32218",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "origZip": "32117",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11080100",
      "miles": 96,
      "shipId": "285520"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "32218",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "AL",
      "origZip": "35661",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11080286",
      "miles": 525,
      "shipId": "285529"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "77029",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "origZip": "76140",
      "destState": "TX",
      "awardsTried": false,
      "loadId": "11080302",
      "miles": 268,
      "shipId": "285540"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "03054",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MA",
      "origZip": "02155",
      "destState": "NH",
      "awardsTried": false,
      "loadId": "11080374",
      "miles": 44,
      "shipId": "285553"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "07101",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "origZip": "08691",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11080380",
      "miles": 53,
      "shipId": "285551"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "43229",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MI",
      "origZip": "49749",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080383",
      "miles": 417,
      "shipId": "285548"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "32218",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "origZip": "31408",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11080392",
      "miles": 132,
      "shipId": "285539"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "03054",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "origZip": "03301",
      "destState": "NH",
      "awardsTried": false,
      "loadId": "11080393",
      "miles": 27,
      "shipId": "285557"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "63118",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "origZip": "61264",
      "destState": "MO",
      "awardsTried": false,
      "loadId": "11080394",
      "miles": 231,
      "shipId": "276556"
    },
    {
      "shipDate": "2018-12-20T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "91406",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "origZip": "93725",
      "destState": "CA",
      "awardsTried": false,
      "loadId": "11080396",
      "miles": 200,
      "shipId": "285552"
    },
    {
      "shipDate": "2018-12-21T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "47348",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MI",
      "origZip": "49512",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11055456",
      "miles": 190,
      "shipId": "284125"
    },
    {
      "shipDate": "2018-12-21T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "80011",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NM",
      "origZip": "88201",
      "destState": "CO",
      "awardsTried": false,
      "loadId": "11080180",
      "miles": 533,
      "shipId": "285523"
    },
    {
      "shipDate": "2018-12-21T01:00:00",
      "commodity": "DRY",
      "destZip": "64506",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-21T12:00:00",
      "origZip": "63118",
      "destState": "MO",
      "awardsTried": true,
      "loadId": "11061441",
      "miles": 306,
      "shipId": "24103617"
    },
    {
      "shipDate": "2018-12-21T03:00:00",
      "commodity": "DRY",
      "destZip": "38225",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-21T12:00:00",
      "origZip": "62040",
      "destState": "TN",
      "awardsTried": false,
      "loadId": "11060113",
      "miles": 235,
      "shipId": "24106538"
    },
    {
      "shipDate": "2018-12-21T03:00:00",
      "commodity": "DRY",
      "destZip": "62959",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-21T10:00:00",
      "origZip": "63118",
      "destState": "IL",
      "awardsTried": true,
      "loadId": "11061574",
      "miles": 112,
      "shipId": "24104920"
    },
    {
      "shipDate": "2018-12-21T03:00:00",
      "commodity": "DRY",
      "destZip": "03301",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-22T12:00:00",
      "origZip": "13027",
      "destState": "NH",
      "awardsTried": false,
      "loadId": "11078608",
      "miles": 290,
      "shipId": "24124904"
    },
    {
      "shipDate": "2018-12-21T05:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "42001",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-21T13:00:00",
      "origZip": "63118",
      "destState": "KY",
      "awardsTried": true,
      "loadId": "11061595",
      "miles": 166,
      "shipId": "24104965"
    },
    {
      "shipDate": "2018-12-21T05:00:00",
      "commodity": "DRY",
      "destZip": "62301",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "62040",
      "destState": "IL",
      "awardsTried": true,
      "loadId": "11065933",
      "miles": 133,
      "shipId": "24104925"
    },
    {
      "shipDate": "2018-12-21T05:00:00",
      "commodity": "DRY",
      "destZip": "45710",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "origZip": "63118",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080277",
      "miles": 476,
      "shipId": "24097622"
    },
    {
      "shipDate": "2018-12-21T06:00:00",
      "commodity": "DRY",
      "destZip": "45069",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "VA",
      "arrivalDate": "2018-12-26T07:00:00",
      "origZip": "23185",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080327",
      "miles": 552,
      "shipId": "24126122"
    },
    {
      "shipDate": "2018-12-21T07:00:00",
      "commodity": "DRY",
      "destZip": "62901",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-21T14:00:00",
      "origZip": "62040",
      "destState": "IL",
      "awardsTried": true,
      "loadId": "11066210",
      "miles": 100,
      "shipId": "24102172"
    },
    {
      "shipDate": "2018-12-21T11:00:00",
      "commodity": "DRY",
      "destZip": "32437",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "arrivalDate": "2018-12-24T06:00:00",
      "origZip": "30121",
      "destState": "FL",
      "awardsTried": true,
      "loadId": "11062252",
      "miles": 312,
      "shipId": "24101789"
    },
    {
      "shipDate": "2018-12-21T12:00:00",
      "commodity": "REEFER",
      "destZip": "32218",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-27T01:01:00",
      "origZip": "80524",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11080330",
      "miles": 1720,
      "shipId": "24126213"
    },
    {
      "shipDate": "2018-12-21T12:00:00",
      "commodity": "REEFER",
      "destZip": "59301",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-24T07:00:00",
      "origZip": "80524",
      "destState": "MT",
      "awardsTried": false,
      "loadId": "11080332",
      "miles": 456,
      "shipId": "24126210"
    },
    {
      "shipDate": "2018-12-21T13:00:00",
      "commodity": "DRY",
      "destZip": "66061",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "origZip": "63118",
      "destState": "KS",
      "awardsTried": false,
      "loadId": "11080278",
      "miles": 271,
      "shipId": "24103341"
    },
    {
      "shipDate": "2018-12-21T14:00:00",
      "commodity": "DRY",
      "destZip": "19440",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "13027",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11066800",
      "miles": 242,
      "shipId": "24110595"
    },
    {
      "shipDate": "2018-12-21T15:00:00",
      "commodity": "DRY",
      "destZip": "05403",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-22T08:00:00",
      "origZip": "13027",
      "destState": "VT",
      "awardsTried": true,
      "loadId": "11063721",
      "miles": 260,
      "shipId": "24107583"
    },
    {
      "shipDate": "2018-12-21T15:00:00",
      "commodity": "DRY",
      "destZip": "92069",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "80524",
      "destState": "CA",
      "awardsTried": true,
      "loadId": "11066944",
      "miles": 1104,
      "shipId": "24111197"
    },
    {
      "shipDate": "2018-12-21T15:00:00",
      "commodity": "DRY",
      "destZip": "56560",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "origZip": "80524",
      "destState": "MN",
      "awardsTried": false,
      "loadId": "11078078",
      "miles": 796,
      "shipId": "24109098"
    },
    {
      "shipDate": "2018-12-21T19:00:00",
      "commodity": "DRY",
      "destZip": "08852",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "13027",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11066802",
      "miles": 269,
      "shipId": "24110587"
    },
    {
      "shipDate": "2018-12-21T20:00:00",
      "commodity": "DRY",
      "destZip": "07869",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T10:00:00",
      "origZip": "13027",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11066795",
      "miles": 226,
      "shipId": "24110639"
    },
    {
      "shipDate": "2018-12-21T20:00:00",
      "commodity": "DRY",
      "destZip": "08852",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "13027",
      "destState": "NJ",
      "awardsTried": false,
      "loadId": "11066796",
      "miles": 269,
      "shipId": "24110638"
    },
    {
      "shipDate": "2018-12-22T08:00:00",
      "commodity": "REEFER",
      "destZip": "59901",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "80524",
      "destState": "MT",
      "awardsTried": true,
      "loadId": "11070077",
      "miles": 906,
      "shipId": "24114863"
    },
    {
      "shipDate": "2018-12-22T13:00:00",
      "commodity": "DRY",
      "destZip": "32824",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "07101",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11053669",
      "miles": 1070,
      "shipId": "24080544"
    },
    {
      "shipDate": "2018-12-22T15:00:00",
      "commodity": "REEFER",
      "destZip": "85225",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-24T05:00:00",
      "origZip": "91406",
      "destState": "AZ",
      "awardsTried": true,
      "loadId": "11057498",
      "miles": 409,
      "shipId": "24100421"
    },
    {
      "shipDate": "2018-12-22T20:00:00",
      "commodity": "DRY",
      "destZip": "12401",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "13027",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11063653",
      "miles": 201,
      "shipId": "24106168"
    },
    {
      "shipDate": "2018-12-22T21:00:00",
      "commodity": "REEFER",
      "destZip": "62040",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-26T13:00:00",
      "origZip": "80524",
      "destState": "IL",
      "awardsTried": false,
      "loadId": "11059420",
      "miles": 887,
      "shipId": "24101972"
    },
    {
      "shipDate": "2018-12-23T04:00:00",
      "commodity": "DRY",
      "destZip": "49009",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T07:00:00",
      "origZip": "13027",
      "destState": "MI",
      "awardsTried": true,
      "loadId": "11063507",
      "miles": 570,
      "shipId": "24103482"
    },
    {
      "shipDate": "2018-12-23T05:00:00",
      "commodity": "DRY",
      "destZip": "20772",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "13027",
      "destState": "MD",
      "awardsTried": true,
      "loadId": "11063685",
      "miles": 378,
      "shipId": "24107002"
    },
    {
      "shipDate": "2018-12-23T05:00:00",
      "commodity": "DRY",
      "destZip": "20772",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "13027",
      "destState": "MD",
      "awardsTried": true,
      "loadId": "11063687",
      "miles": 378,
      "shipId": "24107004"
    },
    {
      "shipDate": "2018-12-23T05:00:00",
      "commodity": "DRY",
      "destZip": "20772",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "13027",
      "destState": "MD",
      "awardsTried": true,
      "loadId": "11063689",
      "miles": 378,
      "shipId": "24107006"
    },
    {
      "shipDate": "2018-12-23T05:00:00",
      "commodity": "DRY",
      "destZip": "72745",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080281",
      "miles": 311,
      "shipId": "24101647"
    },
    {
      "shipDate": "2018-12-23T05:00:00",
      "commodity": "DRY",
      "destZip": "33122",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-25T07:00:00",
      "origZip": "07101",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11080288",
      "miles": 1270,
      "shipId": "24110774"
    },
    {
      "shipDate": "2018-12-23T05:00:00",
      "commodity": "DRY",
      "destZip": "44515",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "origZip": "13027",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080397",
      "miles": 317,
      "shipId": "24103880"
    },
    {
      "shipDate": "2018-12-23T06:00:00",
      "commodity": "DRY",
      "destZip": "44515",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "13027",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11063541",
      "miles": 317,
      "shipId": "24103878"
    },
    {
      "shipDate": "2018-12-23T06:00:00",
      "commodity": "DRY",
      "destZip": "44515",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "13027",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11063542",
      "miles": 317,
      "shipId": "24103879"
    },
    {
      "shipDate": "2018-12-23T06:00:00",
      "commodity": "DRY",
      "destZip": "72745",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080280",
      "miles": 311,
      "shipId": "24101648"
    },
    {
      "shipDate": "2018-12-23T08:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "37086",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "63118",
      "destState": "TN",
      "awardsTried": false,
      "loadId": "11080126",
      "miles": 315,
      "shipId": "24125697"
    },
    {
      "shipDate": "2018-12-23T08:00:00",
      "commodity": "DRY",
      "destZip": "72745",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-24T13:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080279",
      "miles": 311,
      "shipId": "24101649"
    },
    {
      "shipDate": "2018-12-23T12:00:00",
      "commodity": "DRY",
      "destZip": "54656",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "63118",
      "destState": "WI",
      "awardsTried": true,
      "loadId": "11061470",
      "miles": 429,
      "shipId": "24104258"
    },
    {
      "shipDate": "2018-12-23T15:00:00",
      "commodity": "REEFER",
      "destZip": "35211",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-26T06:00:00",
      "origZip": "32218",
      "destState": "AL",
      "awardsTried": true,
      "loadId": "11058091",
      "miles": 414,
      "shipId": "24100231"
    },
    {
      "shipDate": "2018-12-23T17:00:00",
      "commodity": "DRY",
      "destZip": "13088",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "07101",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11079975",
      "miles": 256,
      "shipId": "24125322"
    },
    {
      "shipDate": "2018-12-23T17:00:00",
      "commodity": "DRY",
      "destZip": "74953",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "origZip": "63118",
      "destState": "OK",
      "awardsTried": false,
      "loadId": "11080282",
      "miles": 418,
      "shipId": "24101461"
    },
    {
      "shipDate": "2018-12-23T20:00:00",
      "commodity": "REEFER",
      "destZip": "54612",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-24T14:00:00",
      "origZip": "62040",
      "destState": "WI",
      "awardsTried": true,
      "loadId": "11065923",
      "miles": 466,
      "shipId": "24101542"
    },
    {
      "shipDate": "2018-12-23T21:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "66219",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-25T08:00:00",
      "origZip": "63118",
      "destState": "KS",
      "awardsTried": false,
      "loadId": "11061333",
      "miles": 266,
      "shipId": "24103307"
    },
    {
      "shipDate": "2018-12-23T22:00:00",
      "commodity": "DRY",
      "destZip": "12901",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "03054",
      "destState": "NY",
      "awardsTried": true,
      "loadId": "11055907",
      "miles": 248,
      "shipId": "24107214"
    },
    {
      "shipDate": "2018-12-23T23:00:00",
      "commodity": "DRY",
      "destZip": "04240",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-24T09:00:00",
      "origZip": "07101",
      "destState": "ME",
      "awardsTried": false,
      "loadId": "11079964",
      "miles": 352,
      "shipId": "24125343"
    },
    {
      "shipDate": "2018-12-23T23:00:00",
      "commodity": "DRY",
      "destZip": "11747",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-24T06:00:00",
      "origZip": "03054",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11080372",
      "miles": 244,
      "shipId": "24126186"
    },
    {
      "shipDate": "2018-12-24T00:01:00",
      "commodity": "DRY",
      "destZip": "13820",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-24T12:00:00",
      "origZip": "03054",
      "destState": "NY",
      "awardsTried": true,
      "loadId": "11055727",
      "miles": 222,
      "shipId": "24102500"
    },
    {
      "shipDate": "2018-12-24T00:01:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "12561",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-24T07:00:00",
      "origZip": "07101",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11066248",
      "miles": 82,
      "shipId": "24105337"
    },
    {
      "shipDate": "2018-12-24T01:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "12866",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-24T06:00:00",
      "origZip": "07101",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11051944",
      "miles": 182,
      "shipId": "24093696"
    },
    {
      "shipDate": "2018-12-24T01:00:00",
      "commodity": "DRY",
      "destZip": "12401",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-24T12:00:00",
      "origZip": "13027",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11063652",
      "miles": 201,
      "shipId": "24106167"
    },
    {
      "shipDate": "2018-12-24T01:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "37086",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-24T11:00:00",
      "origZip": "62040",
      "destState": "TN",
      "awardsTried": false,
      "loadId": "11078372",
      "miles": 317,
      "shipId": "24124025"
    },
    {
      "shipDate": "2018-12-24T03:00:00",
      "commodity": "DRY",
      "destZip": "46803",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "arrivalDate": "2018-12-24T08:00:00",
      "origZip": "43229",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11056939",
      "miles": 148,
      "shipId": "24104949"
    },
    {
      "shipDate": "2018-12-24T05:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "13901",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-24T14:00:00",
      "origZip": "07101",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11056308",
      "miles": 164,
      "shipId": "24102489"
    },
    {
      "shipDate": "2018-12-24T05:00:00",
      "commodity": "DRY",
      "destZip": "28601",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-26T04:00:00",
      "origZip": "32218",
      "destState": "NC",
      "awardsTried": true,
      "loadId": "11058484",
      "miles": 401,
      "shipId": "24103836"
    },
    {
      "shipDate": "2018-12-24T05:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "19720",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-26T08:00:00",
      "origZip": "07101",
      "destState": "DE",
      "awardsTried": false,
      "loadId": "11067039",
      "miles": 118,
      "shipId": "24101717"
    },
    {
      "shipDate": "2018-12-24T05:00:00",
      "commodity": "DRY",
      "destZip": "62521",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-25T13:00:00",
      "origZip": "63118",
      "destState": "IL",
      "awardsTried": false,
      "loadId": "11078417",
      "miles": 120,
      "shipId": "24120244"
    },
    {
      "shipDate": "2018-12-24T06:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "06492",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-25T00:01:00",
      "origZip": "07101",
      "destState": "CT",
      "awardsTried": false,
      "loadId": "11066267",
      "miles": 101,
      "shipId": "24078630"
    },
    {
      "shipDate": "2018-12-24T06:00:00",
      "commodity": "DRY",
      "destZip": "94621",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-25T07:00:00",
      "origZip": "91406",
      "destState": "CA",
      "awardsTried": true,
      "loadId": "11068511",
      "miles": 360,
      "shipId": "24112447"
    },
    {
      "shipDate": "2018-12-24T07:00:00",
      "commodity": "DRY",
      "destZip": "72745",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-24T16:00:00",
      "origZip": "62040",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11078323",
      "miles": 320,
      "shipId": "24116831"
    },
    {
      "shipDate": "2018-12-24T09:00:00",
      "commodity": "DRY",
      "destZip": "43619",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-25T11:00:00",
      "origZip": "07101",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11069864",
      "miles": 541,
      "shipId": "24102576"
    },
    {
      "shipDate": "2018-12-24T15:00:00",
      "commodity": "DRY",
      "destZip": "48197",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "arrivalDate": "2018-12-24T22:00:00",
      "origZip": "43229",
      "destState": "MI",
      "awardsTried": false,
      "loadId": "11069210",
      "miles": 169,
      "shipId": "24101259"
    },
    {
      "shipDate": "2018-12-24T16:00:00",
      "commodity": "DRY",
      "destZip": "29201",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-26T07:00:00",
      "origZip": "63118",
      "destState": "SC",
      "awardsTried": false,
      "loadId": "11069322",
      "miles": 738,
      "shipId": "24113212"
    },
    {
      "shipDate": "2018-12-24T23:00:00",
      "commodity": "DRY",
      "destZip": "71601",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-26T08:00:00",
      "origZip": "77029",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11078682",
      "miles": 418,
      "shipId": "24115088"
    },
    {
      "shipDate": "2018-12-25T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "74066",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OK",
      "origZip": "74110",
      "destState": "OK",
      "awardsTried": false,
      "loadId": "11079485",
      "miles": 9,
      "shipId": "285295"
    },
    {
      "shipDate": "2018-12-25T03:00:00",
      "commodity": "DRY",
      "destZip": "38756",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "arrivalDate": "2018-12-26T09:00:00",
      "origZip": "30121",
      "destState": "MS",
      "awardsTried": true,
      "loadId": "11069894",
      "miles": 412,
      "shipId": "24113879"
    },
    {
      "shipDate": "2018-12-26T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "47348",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MI",
      "origZip": "49009",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11078502",
      "miles": 144,
      "shipId": "285090"
    },
    {
      "shipDate": "2018-12-26T04:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "01923",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-26T13:00:00",
      "origZip": "07101",
      "destState": "MA",
      "awardsTried": false,
      "loadId": "11051823",
      "miles": 242,
      "shipId": "24093679"
    },
    {
      "shipDate": "2018-12-26T06:00:00",
      "commodity": "DRY",
      "destZip": "58801",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-27T14:00:00",
      "origZip": "80011",
      "destState": "ND",
      "awardsTried": false,
      "loadId": "11063329",
      "miles": 686,
      "shipId": "24108539"
    },
    {
      "shipDate": "2018-12-26T06:00:00",
      "commodity": "REEFER",
      "destZip": "66609",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "origZip": "80011",
      "destState": "KS",
      "awardsTried": true,
      "loadId": "11078534",
      "miles": 530,
      "shipId": "24099664"
    },
    {
      "shipDate": "2018-12-26T06:00:00",
      "commodity": "DRY",
      "destZip": "68138",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-27T10:00:00",
      "origZip": "80011",
      "destState": "NE",
      "awardsTried": false,
      "loadId": "11078546",
      "miles": 525,
      "shipId": "24122163"
    },
    {
      "shipDate": "2018-12-26T07:00:00",
      "commodity": "DRY",
      "destZip": "55374",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "origZip": "62040",
      "destState": "MN",
      "awardsTried": false,
      "loadId": "11078309",
      "miles": 562,
      "shipId": "24095207"
    },
    {
      "shipDate": "2018-12-26T07:00:00",
      "commodity": "DRY",
      "destZip": "19440",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-26T15:00:00",
      "origZip": "03054",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11080368",
      "miles": 322,
      "shipId": "24126177"
    },
    {
      "shipDate": "2018-12-26T08:00:00",
      "commodity": "DRY",
      "destZip": "18104",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-26T11:00:00",
      "origZip": "07101",
      "destState": "PA",
      "awardsTried": true,
      "loadId": "11056214",
      "miles": 89,
      "shipId": "24039464"
    },
    {
      "shipDate": "2018-12-26T08:00:00",
      "commodity": "DRY",
      "destZip": "21740",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-28T08:00:00",
      "origZip": "13027",
      "destState": "MD",
      "awardsTried": false,
      "loadId": "11079527",
      "miles": 320,
      "shipId": "24121128"
    },
    {
      "shipDate": "2018-12-26T09:00:00",
      "commodity": "REEFER",
      "destZip": "95035",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "OR",
      "arrivalDate": "2018-12-28T10:00:00",
      "origZip": "97217",
      "destState": "CA",
      "awardsTried": true,
      "loadId": "11068277",
      "miles": 662,
      "shipId": "24112095"
    },
    {
      "shipDate": "2018-12-26T09:00:00",
      "commodity": "DRY",
      "destZip": "23834",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "arrivalDate": "2018-12-27T02:00:00",
      "origZip": "17015",
      "destState": "VA",
      "awardsTried": false,
      "loadId": "11080303",
      "miles": 231,
      "shipId": "24126191"
    },
    {
      "shipDate": "2018-12-26T11:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "50316",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-27T07:00:00",
      "origZip": "62040",
      "destState": "IA",
      "awardsTried": true,
      "loadId": "11067839",
      "miles": 341,
      "shipId": "24108971"
    },
    {
      "shipDate": "2018-12-26T11:00:00",
      "commodity": "DRY",
      "destZip": "97217",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-28T10:00:00",
      "origZip": "80524",
      "destState": "OR",
      "awardsTried": false,
      "loadId": "11080345",
      "miles": 1169,
      "shipId": "24126156"
    },
    {
      "shipDate": "2018-12-26T12:00:00",
      "commodity": "DRY",
      "destZip": "06492",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-27T00:00:00",
      "origZip": "07101",
      "destState": "CT",
      "awardsTried": false,
      "loadId": "11079061",
      "miles": 101,
      "shipId": "24025346"
    },
    {
      "shipDate": "2018-12-26T12:00:00",
      "commodity": "DRY",
      "destZip": "94080",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-27T00:01:00",
      "origZip": "90745",
      "destState": "CA",
      "awardsTried": false,
      "loadId": "11080257",
      "miles": 399,
      "shipId": "24125881"
    },
    {
      "shipDate": "2018-12-26T14:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "36617",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "arrivalDate": "2018-12-28T06:00:00",
      "origZip": "30121",
      "destState": "AL",
      "awardsTried": false,
      "loadId": "11078440",
      "miles": 362,
      "shipId": "24116758"
    },
    {
      "shipDate": "2018-12-26T17:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "91406",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-27T03:00:00",
      "origZip": "90039",
      "destState": "CA",
      "awardsTried": true,
      "loadId": "11079802",
      "miles": 15,
      "shipId": "24114407"
    },
    {
      "shipDate": "2018-12-26T18:00:00",
      "commodity": "DRY",
      "destZip": "89103",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-26T18:00:00",
      "origZip": "90745",
      "destState": "NV",
      "awardsTried": false,
      "loadId": "11079929",
      "miles": 280,
      "shipId": "24125329"
    },
    {
      "shipDate": "2018-12-26T21:00:00",
      "commodity": "DRY",
      "destZip": "10566",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-27T10:00:00",
      "origZip": "03054",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11078120",
      "miles": 214,
      "shipId": "24119832"
    },
    {
      "shipDate": "2018-12-26T22:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "83835",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OR",
      "arrivalDate": "2018-12-27T10:00:00",
      "origZip": "97217",
      "destState": "ID",
      "awardsTried": true,
      "loadId": "11067501",
      "miles": 380,
      "shipId": "24111599"
    },
    {
      "shipDate": "2018-12-26T23:00:00",
      "commodity": "REEFER",
      "destZip": "71601",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-27T07:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": true,
      "loadId": "11078796",
      "miles": 378,
      "shipId": "24115091"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "DRY",
      "destZip": "07101",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-31T20:01:00",
      "origZip": "80524",
      "destState": "NJ",
      "awardsTried": true,
      "loadId": "11078293",
      "miles": 1744,
      "shipId": "24123266"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "DRY",
      "destZip": "07101",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-31T20:01:00",
      "origZip": "80524",
      "destState": "NJ",
      "awardsTried": true,
      "loadId": "11078294",
      "miles": 1744,
      "shipId": "24123267"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "DRY",
      "destZip": "94080",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-27T12:01:00",
      "origZip": "90745",
      "destState": "CA",
      "awardsTried": false,
      "loadId": "11078655",
      "miles": 399,
      "shipId": "24124083"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "32218",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "origZip": "34104",
      "destState": "FL",
      "awardsTried": true,
      "loadId": "11079228",
      "miles": 330,
      "shipId": "285287"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "32218",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "SC",
      "origZip": "29201",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11079326",
      "miles": 270,
      "shipId": "285302"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "TRADERETURN",
      "destZip": "80011",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NE",
      "origZip": "68025",
      "destState": "CO",
      "awardsTried": false,
      "loadId": "11080009",
      "miles": 513,
      "shipId": "285468"
    },
    {
      "shipDate": "2018-12-27T00:01:00",
      "commodity": "DRY",
      "destZip": "57350",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-28T07:00:00",
      "origZip": "80524",
      "destState": "SD",
      "awardsTried": false,
      "loadId": "11080092",
      "miles": 563,
      "shipId": "24116705"
    },
    {
      "shipDate": "2018-12-27T01:00:00",
      "commodity": "DRY",
      "destZip": "54880",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-28T07:00:00",
      "origZip": "63118",
      "destState": "WI",
      "awardsTried": false,
      "loadId": "11078416",
      "miles": 652,
      "shipId": "24120122"
    },
    {
      "shipDate": "2018-12-27T01:00:00",
      "commodity": "DRY",
      "destZip": "22151",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-27T08:00:00",
      "origZip": "07101",
      "destState": "VA",
      "awardsTried": false,
      "loadId": "11079478",
      "miles": 242,
      "shipId": "24125109"
    },
    {
      "shipDate": "2018-12-27T04:00:00",
      "commodity": "DRY",
      "destZip": "29303",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-28T08:00:00",
      "origZip": "32218",
      "destState": "SC",
      "awardsTried": false,
      "loadId": "11080025",
      "miles": 354,
      "shipId": "24125404"
    },
    {
      "shipDate": "2018-12-27T05:00:00",
      "commodity": "DRY",
      "destZip": "32940",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-27T14:00:00",
      "origZip": "32218",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11069377",
      "miles": 181,
      "shipId": "24113324"
    },
    {
      "shipDate": "2018-12-27T06:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "81601",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-27T14:00:00",
      "origZip": "80011",
      "destState": "CO",
      "awardsTried": false,
      "loadId": "11070407",
      "miles": 163,
      "shipId": "24120922"
    },
    {
      "shipDate": "2018-12-27T06:00:00",
      "commodity": "REEFER",
      "destZip": "88007",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-28T10:00:00",
      "origZip": "80011",
      "destState": "NM",
      "awardsTried": true,
      "loadId": "11078535",
      "miles": 639,
      "shipId": "24099823"
    },
    {
      "shipDate": "2018-12-27T06:00:00",
      "commodity": "DRY",
      "destZip": "06492",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-28T00:00:00",
      "origZip": "07101",
      "destState": "CT",
      "awardsTried": false,
      "loadId": "11079066",
      "miles": 101,
      "shipId": "23953060"
    },
    {
      "shipDate": "2018-12-27T06:00:00",
      "commodity": "DRY",
      "destZip": "71901",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-28T09:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080161",
      "miles": 394,
      "shipId": "24125727"
    },
    {
      "shipDate": "2018-12-27T07:00:00",
      "commodity": "DRY",
      "destZip": "71901",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-28T10:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080159",
      "miles": 394,
      "shipId": "24125730"
    },
    {
      "shipDate": "2018-12-27T08:00:00",
      "commodity": "DRY",
      "destZip": "19440",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "arrivalDate": "2018-12-27T10:00:00",
      "origZip": "17015",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11039402",
      "miles": 115,
      "shipId": "24080492"
    },
    {
      "shipDate": "2018-12-27T08:00:00",
      "commodity": "DRY",
      "destZip": "19440",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "PA",
      "arrivalDate": "2018-12-27T10:00:00",
      "origZip": "17015",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11078478",
      "miles": 115,
      "shipId": "24124302"
    },
    {
      "shipDate": "2018-12-27T12:00:00",
      "commodity": "DRY",
      "destZip": "37086",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-28T12:00:00",
      "origZip": "63118",
      "destState": "TN",
      "awardsTried": false,
      "loadId": "11080147",
      "miles": 315,
      "shipId": "24125747"
    },
    {
      "shipDate": "2018-12-27T12:00:00",
      "commodity": "DRY",
      "destZip": "37086",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-28T12:00:00",
      "origZip": "63118",
      "destState": "TN",
      "awardsTried": false,
      "loadId": "11080148",
      "miles": 315,
      "shipId": "24125745"
    },
    {
      "shipDate": "2018-12-27T15:00:00",
      "commodity": "REEFER",
      "destZip": "83835",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-29T14:00:00",
      "origZip": "80524",
      "destState": "ID",
      "awardsTried": true,
      "loadId": "11078876",
      "miles": 994,
      "shipId": "24123127"
    },
    {
      "shipDate": "2018-12-27T16:00:00",
      "commodity": "DRY",
      "destZip": "30501",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-28T09:00:00",
      "origZip": "32218",
      "destState": "GA",
      "awardsTried": false,
      "loadId": "11078273",
      "miles": 344,
      "shipId": "24124291"
    },
    {
      "shipDate": "2018-12-27T17:00:00",
      "commodity": "REEFER",
      "destZip": "67226",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-28T15:00:00",
      "origZip": "80011",
      "destState": "KS",
      "awardsTried": false,
      "loadId": "11070440",
      "miles": 502,
      "shipId": "24116392"
    },
    {
      "shipDate": "2018-12-27T19:00:00",
      "commodity": "DRY",
      "destZip": "29303",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-31T08:00:00",
      "origZip": "13027",
      "destState": "SC",
      "awardsTried": false,
      "loadId": "11079702",
      "miles": 786,
      "shipId": "24120627"
    },
    {
      "shipDate": "2018-12-27T19:00:00",
      "commodity": "DRY",
      "destZip": "72701",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080209",
      "miles": 331,
      "shipId": "24125783"
    },
    {
      "shipDate": "2018-12-27T20:00:00",
      "commodity": "DRY",
      "destZip": "68138",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-31T07:00:00",
      "origZip": "80011",
      "destState": "NE",
      "awardsTried": true,
      "loadId": "11065410",
      "miles": 525,
      "shipId": "24090061"
    },
    {
      "shipDate": "2018-12-27T21:00:00",
      "commodity": "DRY",
      "destZip": "35078",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-29T12:00:00",
      "origZip": "77029",
      "destState": "AL",
      "awardsTried": false,
      "loadId": "11079369",
      "miles": 659,
      "shipId": "24115785"
    },
    {
      "shipDate": "2018-12-27T21:00:00",
      "commodity": "DRY",
      "destZip": "35954",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-29T03:00:00",
      "origZip": "77029",
      "destState": "AL",
      "awardsTried": true,
      "loadId": "11079372",
      "miles": 693,
      "shipId": "24115758"
    },
    {
      "shipDate": "2018-12-27T21:00:00",
      "commodity": "DRY",
      "destZip": "54701",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-29T07:00:00",
      "origZip": "63118",
      "destState": "WI",
      "awardsTried": false,
      "loadId": "11080164",
      "miles": 504,
      "shipId": "24125723"
    },
    {
      "shipDate": "2018-12-27T22:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "72160",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "IL",
      "arrivalDate": "2018-12-28T10:00:00",
      "origZip": "62040",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11079450",
      "miles": 351,
      "shipId": "24115095"
    },
    {
      "shipDate": "2018-12-27T22:00:00",
      "commodity": "DRY",
      "destZip": "06477",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-28T11:00:00",
      "origZip": "03054",
      "destState": "CT",
      "awardsTried": false,
      "loadId": "11080371",
      "miles": 160,
      "shipId": "24126182"
    },
    {
      "shipDate": "2018-12-28T00:01:00",
      "commodity": "REEFER",
      "destZip": "76308",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-29T09:00:00",
      "origZip": "77571",
      "destState": "TX",
      "awardsTried": true,
      "loadId": "11078155",
      "miles": 397,
      "shipId": "24122300"
    },
    {
      "shipDate": "2018-12-28T00:01:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "81520",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-28T09:00:00",
      "origZip": "80011",
      "destState": "CO",
      "awardsTried": false,
      "loadId": "11080359",
      "miles": 244,
      "shipId": "24126290"
    },
    {
      "shipDate": "2018-12-28T00:01:00",
      "commodity": "DRY",
      "destZip": "19440",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-28T08:00:00",
      "origZip": "03054",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11080369",
      "miles": 322,
      "shipId": "24126178"
    },
    {
      "shipDate": "2018-12-28T04:00:00",
      "commodity": "DRY",
      "destZip": "17402",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NJ",
      "arrivalDate": "2018-12-28T10:00:00",
      "origZip": "07101",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11078186",
      "miles": 173,
      "shipId": "24116696"
    },
    {
      "shipDate": "2018-12-28T04:00:00",
      "commodity": "DRY",
      "destZip": "19440",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-31T08:00:00",
      "origZip": "13027",
      "destState": "PA",
      "awardsTried": false,
      "loadId": "11078599",
      "miles": 242,
      "shipId": "24124351"
    },
    {
      "shipDate": "2018-12-28T05:00:00",
      "commodity": "REEFER",
      "destZip": "85225",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-29T08:00:00",
      "origZip": "91406",
      "destState": "AZ",
      "awardsTried": true,
      "loadId": "11057509",
      "miles": 409,
      "shipId": "24100434"
    },
    {
      "shipDate": "2018-12-28T05:00:00",
      "commodity": "REEFER",
      "destZip": "51101",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-29T23:00:00",
      "origZip": "80524",
      "destState": "IA",
      "awardsTried": true,
      "loadId": "11078983",
      "miles": 558,
      "shipId": "24117236"
    },
    {
      "shipDate": "2018-12-28T05:00:00",
      "commodity": "DRY",
      "destZip": "44141",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-29T08:00:00",
      "origZip": "13027",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11079541",
      "miles": 338,
      "shipId": "24124983"
    },
    {
      "shipDate": "2018-12-28T06:00:00",
      "commodity": "REEFER",
      "destZip": "66061",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-29T09:00:00",
      "origZip": "80011",
      "destState": "KS",
      "awardsTried": true,
      "loadId": "11070429",
      "miles": 585,
      "shipId": "24118162"
    },
    {
      "shipDate": "2018-12-28T06:00:00",
      "commodity": "REEFER",
      "destZip": "88201",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-29T08:00:00",
      "origZip": "80011",
      "destState": "NM",
      "awardsTried": true,
      "loadId": "11070438",
      "miles": 533,
      "shipId": "24116582"
    },
    {
      "shipDate": "2018-12-28T06:00:00",
      "commodity": "DRY",
      "destZip": "44141",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-29T09:00:00",
      "origZip": "13027",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11079544",
      "miles": 338,
      "shipId": "24124987"
    },
    {
      "shipDate": "2018-12-28T08:00:00",
      "commodity": "REEFER",
      "destZip": "97217",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "94534",
      "destState": "OR",
      "awardsTried": true,
      "loadId": "11078013",
      "miles": 598,
      "shipId": "24124330"
    },
    {
      "shipDate": "2018-12-28T09:00:00",
      "commodity": "DRY",
      "destZip": "54751",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-29T09:00:00",
      "origZip": "63118",
      "destState": "WI",
      "awardsTried": false,
      "loadId": "11080146",
      "miles": 531,
      "shipId": "24125748"
    },
    {
      "shipDate": "2018-12-28T13:00:00",
      "commodity": "REEFER",
      "destZip": "97402",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "80524",
      "destState": "OR",
      "awardsTried": true,
      "loadId": "11078900",
      "miles": 1181,
      "shipId": "24121332"
    },
    {
      "shipDate": "2018-12-28T13:00:00",
      "commodity": "DRY",
      "destZip": "66061",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-29T08:00:00",
      "origZip": "63118",
      "destState": "KS",
      "awardsTried": false,
      "loadId": "11080154",
      "miles": 271,
      "shipId": "24125737"
    },
    {
      "shipDate": "2018-12-28T16:00:00",
      "commodity": "DRY",
      "destZip": "86404",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-29T06:00:00",
      "origZip": "91406",
      "destState": "AZ",
      "awardsTried": false,
      "loadId": "11079987",
      "miles": 306,
      "shipId": "24117888"
    },
    {
      "shipDate": "2018-12-28T20:00:00",
      "commodity": "DRY",
      "destZip": "10474",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-29T09:00:00",
      "origZip": "03054",
      "destState": "NY",
      "awardsTried": false,
      "loadId": "11078132",
      "miles": 221,
      "shipId": "24123874"
    },
    {
      "shipDate": "2018-12-28T20:00:00",
      "commodity": "DRY",
      "destZip": "38301",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T06:00:00",
      "origZip": "63118",
      "destState": "TN",
      "awardsTried": false,
      "loadId": "11080177",
      "miles": 264,
      "shipId": "24125705"
    },
    {
      "shipDate": "2018-12-28T20:00:00",
      "commodity": "DRY",
      "destZip": "46227",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T10:00:00",
      "origZip": "63118",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11080178",
      "miles": 248,
      "shipId": "24125704"
    },
    {
      "shipDate": "2018-12-28T22:00:00",
      "commodity": "DRY",
      "destZip": "46227",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T10:00:00",
      "origZip": "63118",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11080175",
      "miles": 248,
      "shipId": "24125708"
    },
    {
      "shipDate": "2018-12-28T22:00:00",
      "commodity": "DRY",
      "destZip": "46227",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T10:00:00",
      "origZip": "63118",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11080176",
      "miles": 248,
      "shipId": "24125707"
    },
    {
      "shipDate": "2018-12-28T22:00:00",
      "commodity": "DRY",
      "destZip": "46227",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T10:00:00",
      "origZip": "63118",
      "destState": "IN",
      "awardsTried": false,
      "loadId": "11080219",
      "miles": 248,
      "shipId": "24125767"
    },
    {
      "shipDate": "2018-12-29T00:01:00",
      "commodity": "REEFER",
      "destZip": "30121",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2019-01-04T23:00:00",
      "origZip": "91406",
      "destState": "GA",
      "awardsTried": false,
      "loadId": "11080084",
      "miles": 2144,
      "shipId": "24118074"
    },
    {
      "shipDate": "2018-12-29T03:00:00",
      "commodity": "DRY",
      "destZip": "49203",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-31T08:00:00",
      "origZip": "13027",
      "destState": "MI",
      "awardsTried": false,
      "loadId": "11079713",
      "miles": 505,
      "shipId": "24119620"
    },
    {
      "shipDate": "2018-12-29T05:00:00",
      "commodity": "REEFER",
      "destZip": "43125",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2019-01-02T13:00:00",
      "origZip": "80524",
      "destState": "OH",
      "awardsTried": true,
      "loadId": "11078935",
      "miles": 1253,
      "shipId": "24120524"
    },
    {
      "shipDate": "2018-12-29T07:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "44141",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "OH",
      "arrivalDate": "2018-12-29T13:00:00",
      "origZip": "43229",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11079098",
      "miles": 120,
      "shipId": "24123340"
    },
    {
      "shipDate": "2018-12-29T08:00:00",
      "commodity": "REEFER",
      "destZip": "85031",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CA",
      "arrivalDate": "2018-12-30T07:00:00",
      "origZip": "91763",
      "destState": "AZ",
      "awardsTried": true,
      "loadId": "11080259",
      "miles": 344,
      "shipId": "24124800"
    },
    {
      "shipDate": "2018-12-29T09:00:00",
      "commodity": "DRY",
      "destZip": "87107",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T06:00:00",
      "origZip": "63118",
      "destState": "NM",
      "awardsTried": false,
      "loadId": "11080225",
      "miles": 1030,
      "shipId": "24115298"
    },
    {
      "shipDate": "2018-12-29T12:00:00",
      "commodity": "DRY",
      "destZip": "60538",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-31T04:00:00",
      "origZip": "13027",
      "destState": "IL",
      "awardsTried": false,
      "loadId": "11078600",
      "miles": 699,
      "shipId": "24124377"
    },
    {
      "shipDate": "2018-12-29T14:00:00",
      "commodity": "REEFER",
      "destZip": "51301",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-31T10:00:00",
      "origZip": "80524",
      "destState": "IA",
      "awardsTried": true,
      "loadId": "11078982",
      "miles": 656,
      "shipId": "24117244"
    },
    {
      "shipDate": "2018-12-29T14:00:00",
      "commodity": "DRYDRAUGHT",
      "destZip": "79601",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-30T08:00:00",
      "origZip": "77029",
      "destState": "TX",
      "awardsTried": false,
      "loadId": "11079347",
      "miles": 371,
      "shipId": "24121519"
    },
    {
      "shipDate": "2018-12-29T16:00:00",
      "commodity": "DRY",
      "destZip": "43125",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2019-01-01T05:00:00",
      "origZip": "63118",
      "destState": "OH",
      "awardsTried": false,
      "loadId": "11080192",
      "miles": 427,
      "shipId": "24125812"
    },
    {
      "shipDate": "2018-12-29T17:00:00",
      "commodity": "DRY",
      "destZip": "77041",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-31T06:00:00",
      "origZip": "32218",
      "destState": "TX",
      "awardsTried": false,
      "loadId": "11080043",
      "miles": 886,
      "shipId": "24125458"
    },
    {
      "shipDate": "2018-12-29T18:00:00",
      "commodity": "REEFER",
      "destZip": "73149",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T11:00:00",
      "origZip": "63118",
      "destState": "OK",
      "awardsTried": true,
      "loadId": "11078791",
      "miles": 503,
      "shipId": "24115483"
    },
    {
      "shipDate": "2018-12-29T20:00:00",
      "commodity": "DRY",
      "destZip": "79601",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-31T07:00:00",
      "origZip": "77029",
      "destState": "TX",
      "awardsTried": false,
      "loadId": "11079764",
      "miles": 371,
      "shipId": "24125264"
    },
    {
      "shipDate": "2018-12-29T20:00:00",
      "commodity": "DRY",
      "destZip": "79601",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-31T07:00:00",
      "origZip": "77029",
      "destState": "TX",
      "awardsTried": false,
      "loadId": "11079765",
      "miles": 371,
      "shipId": "24125263"
    },
    {
      "shipDate": "2018-12-29T22:00:00",
      "commodity": "DRY",
      "destZip": "37379",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "63118",
      "destState": "TN",
      "awardsTried": true,
      "loadId": "11080169",
      "miles": 428,
      "shipId": "24125716"
    },
    {
      "shipDate": "2018-12-30T00:01:00",
      "commodity": "DRY",
      "destZip": "97217",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2019-01-04T00:00:00",
      "origZip": "80524",
      "destState": "OR",
      "awardsTried": false,
      "loadId": "11078033",
      "miles": 1349,
      "shipId": "24124250"
    },
    {
      "shipDate": "2018-12-30T00:01:00",
      "commodity": "DRY",
      "destZip": "33982",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "arrivalDate": "2018-12-31T09:01:00",
      "origZip": "30121",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11078454",
      "miles": 584,
      "shipId": "24119255"
    },
    {
      "shipDate": "2018-12-30T00:01:00",
      "commodity": "DRY",
      "destZip": "33916",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "arrivalDate": "2018-12-31T06:00:00",
      "origZip": "30121",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11078460",
      "miles": 604,
      "shipId": "24121867"
    },
    {
      "shipDate": "2018-12-30T00:01:00",
      "commodity": "REEFER",
      "destZip": "60609",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "NY",
      "arrivalDate": "2018-12-31T07:00:00",
      "origZip": "13027",
      "destState": "IL",
      "awardsTried": true,
      "loadId": "11079533",
      "miles": 662,
      "shipId": "24124314"
    },
    {
      "shipDate": "2018-12-30T04:00:00",
      "commodity": "DRY",
      "destZip": "30607",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "FL",
      "arrivalDate": "2018-12-31T07:00:00",
      "origZip": "32218",
      "destState": "GA",
      "awardsTried": false,
      "loadId": "11078272",
      "miles": 303,
      "shipId": "24124290"
    },
    {
      "shipDate": "2018-12-30T04:00:00",
      "commodity": "DRY",
      "destZip": "97217",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2019-01-04T04:00:00",
      "origZip": "80524",
      "destState": "OR",
      "awardsTried": false,
      "loadId": "11078848",
      "miles": 1349,
      "shipId": "24124973"
    },
    {
      "shipDate": "2018-12-30T05:00:00",
      "commodity": "DRY",
      "destZip": "72160",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T08:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": true,
      "loadId": "11060803",
      "miles": 341,
      "shipId": "24099534"
    },
    {
      "shipDate": "2018-12-30T05:00:00",
      "commodity": "DRY",
      "destZip": "33916",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "GA",
      "arrivalDate": "2018-12-31T08:00:00",
      "origZip": "30121",
      "destState": "FL",
      "awardsTried": false,
      "loadId": "11078461",
      "miles": 604,
      "shipId": "24121869"
    },
    {
      "shipDate": "2018-12-30T05:00:00",
      "commodity": "DRY",
      "destZip": "22151",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "NH",
      "arrivalDate": "2018-12-30T19:00:00",
      "origZip": "03054",
      "destState": "VA",
      "awardsTried": false,
      "loadId": "11079111",
      "miles": 476,
      "shipId": "24121576"
    },
    {
      "shipDate": "2018-12-30T05:00:00",
      "commodity": "DRY",
      "destZip": "72160",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11079950",
      "miles": 341,
      "shipId": "24115100"
    },
    {
      "shipDate": "2018-12-30T05:00:00",
      "commodity": "DRY",
      "destZip": "72160",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080226",
      "miles": 341,
      "shipId": "24115099"
    },
    {
      "shipDate": "2018-12-30T06:00:00",
      "commodity": "DRY",
      "destZip": "97217",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2019-01-04T06:00:00",
      "origZip": "80524",
      "destState": "OR",
      "awardsTried": false,
      "loadId": "11078031",
      "miles": 1349,
      "shipId": "24124258"
    },
    {
      "shipDate": "2018-12-30T06:00:00",
      "commodity": "DRY",
      "destZip": "72110",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "MO",
      "arrivalDate": "2018-12-31T12:00:00",
      "origZip": "63118",
      "destState": "AR",
      "awardsTried": false,
      "loadId": "11080227",
      "miles": 357,
      "shipId": "24115084"
    },
    {
      "shipDate": "2018-12-30T07:00:00",
      "commodity": "DRY",
      "destZip": "97301",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2019-01-02T07:00:00",
      "origZip": "80524",
      "destState": "OR",
      "awardsTried": true,
      "loadId": "11078039",
      "miles": 1180,
      "shipId": "24124235"
    },
    {
      "shipDate": "2018-12-30T07:00:00",
      "commodity": "DRY",
      "destZip": "30082",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "VA",
      "arrivalDate": "2018-12-31T08:00:00",
      "origZip": "23834",
      "destState": "GA",
      "awardsTried": false,
      "loadId": "11078505",
      "miles": 513,
      "shipId": "24005844"
    },
    {
      "shipDate": "2018-12-30T07:00:00",
      "commodity": "DRY",
      "destZip": "38868",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "TX",
      "arrivalDate": "2018-12-31T09:00:00",
      "origZip": "77029",
      "destState": "MS",
      "awardsTried": false,
      "loadId": "11079762",
      "miles": 582,
      "shipId": "24125266"
    },
    {
      "shipDate": "2018-12-30T08:00:00",
      "commodity": "REEFER",
      "destZip": "87301",
      "equipment": "R",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2018-12-31T07:00:00",
      "origZip": "80011",
      "destState": "NM",
      "awardsTried": false,
      "loadId": "11079569",
      "miles": 502,
      "shipId": "24115305"
    },
    {
      "shipDate": "2018-12-30T08:00:00",
      "commodity": "DRY",
      "destZip": "51501",
      "equipment": "D",
      "mode": "T",
      "activeRate": false,
      "origState": "CO",
      "arrivalDate": "2019-01-02T08:00:00",
      "origZip": "80524",
      "destState": "IA",
      "awardsTried": false,
      "loadId": "11080395",
      "miles": 520,
      "shipId": "24126114"
    }
  ]
}
