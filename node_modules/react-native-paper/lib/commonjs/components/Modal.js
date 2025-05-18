"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _reactNativeSafeAreaContext = require("react-native-safe-area-context");
var _useLatestCallback = _interopRequireDefault(require("use-latest-callback"));
var _Surface = _interopRequireDefault(require("./Surface"));
var _theming = require("../core/theming");
var _addEventListener = require("../utils/addEventListener");
var _BackHandler = require("../utils/BackHandler/BackHandler");
var _useAnimatedValue = _interopRequireDefault(require("../utils/useAnimatedValue"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const DEFAULT_DURATION = 220;
const AnimatedPressable = _reactNative.Animated.createAnimatedComponent(_reactNative.Pressable);

/**
 * The Modal component is a simple way to present content above an enclosing view.
 * To render the `Modal` above other components, you'll need to wrap it with the [`Portal`](./Portal) component.
 * Note that this modal is NOT accessible by default; if you need an accessible modal, please use the React Native Modal.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Modal, Portal, Text, Button, PaperProvider } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [visible, setVisible] = React.useState(false);
 *
 *   const showModal = () => setVisible(true);
 *   const hideModal = () => setVisible(false);
 *   const containerStyle = {backgroundColor: 'white', padding: 20};
 *
 *   return (
 *     <PaperProvider>
 *       <Portal>
 *         <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
 *           <Text>Example Modal.  Click outside this area to dismiss.</Text>
 *         </Modal>
 *       </Portal>
 *       <Button style={{marginTop: 30}} onPress={showModal}>
 *         Show
 *       </Button>
 *     </PaperProvider>
 *   );
 * };
 *
 * export default MyComponent;
 * ```
 */
function Modal({
  dismissable = true,
  dismissableBackButton = dismissable,
  visible = false,
  overlayAccessibilityLabel = 'Close modal',
  onDismiss = () => {},
  children,
  contentContainerStyle,
  style,
  theme: themeOverrides,
  testID = 'modal'
}) {
  var _theme$colors;
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const onDismissCallback = (0, _useLatestCallback.default)(onDismiss);
  const {
    scale
  } = theme.animation;
  const {
    top,
    bottom
  } = (0, _reactNativeSafeAreaContext.useSafeAreaInsets)();
  const opacity = (0, _useAnimatedValue.default)(visible ? 1 : 0);
  const [visibleInternal, setVisibleInternal] = React.useState(visible);
  const showModalAnimation = React.useCallback(() => {
    _reactNative.Animated.timing(opacity, {
      toValue: 1,
      duration: scale * DEFAULT_DURATION,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      useNativeDriver: true
    }).start();
  }, [opacity, scale]);
  const hideModalAnimation = React.useCallback(() => {
    _reactNative.Animated.timing(opacity, {
      toValue: 0,
      duration: scale * DEFAULT_DURATION,
      easing: _reactNative.Easing.out(_reactNative.Easing.cubic),
      useNativeDriver: true
    }).start(({
      finished
    }) => {
      if (!finished) {
        return;
      }
      setVisibleInternal(false);
    });
  }, [opacity, scale]);
  React.useEffect(() => {
    if (visibleInternal === visible) {
      return;
    }
    if (!visibleInternal && visible) {
      setVisibleInternal(true);
      return showModalAnimation();
    }
    if (visibleInternal && !visible) {
      return hideModalAnimation();
    }
  }, [visible, showModalAnimation, hideModalAnimation, visibleInternal]);
  React.useEffect(() => {
    if (!visible) {
      return undefined;
    }
    const onHardwareBackPress = () => {
      if (dismissable || dismissableBackButton) {
        onDismissCallback();
      }
      return true;
    };
    const subscription = (0, _addEventListener.addEventListener)(_BackHandler.BackHandler, 'hardwareBackPress', onHardwareBackPress);
    return () => subscription.remove();
  }, [dismissable, dismissableBackButton, onDismissCallback, visible]);
  if (!visibleInternal) {
    return null;
  }
  return /*#__PURE__*/React.createElement(_reactNative.Animated.View, {
    pointerEvents: visible ? 'auto' : 'none',
    accessibilityViewIsModal: true,
    accessibilityLiveRegion: "polite",
    style: _reactNative.StyleSheet.absoluteFill,
    onAccessibilityEscape: onDismissCallback,
    testID: testID
  }, /*#__PURE__*/React.createElement(AnimatedPressable, {
    accessibilityLabel: overlayAccessibilityLabel,
    accessibilityRole: "button",
    disabled: !dismissable,
    onPress: dismissable ? onDismissCallback : undefined,
    importantForAccessibility: "no",
    style: [styles.backdrop, {
      backgroundColor: (_theme$colors = theme.colors) === null || _theme$colors === void 0 ? void 0 : _theme$colors.backdrop,
      opacity
    }],
    testID: `${testID}-backdrop`
  }), /*#__PURE__*/React.createElement(_reactNative.View, {
    style: [styles.wrapper, {
      marginTop: top,
      marginBottom: bottom
    }, style],
    pointerEvents: "box-none",
    testID: `${testID}-wrapper`
  }, /*#__PURE__*/React.createElement(_Surface.default, {
    testID: `${testID}-surface`,
    theme: theme,
    style: [{
      opacity
    }, styles.content, contentContainerStyle],
    container: true
  }, children)));
}
var _default = exports.default = Modal;
const styles = _reactNative.StyleSheet.create({
  backdrop: {
    flex: 1
  },
  wrapper: {
    ..._reactNative.StyleSheet.absoluteFillObject,
    justifyContent: 'center'
  },
  // eslint-disable-next-line react-native/no-color-literals
  content: {
    backgroundColor: 'transparent',
    justifyContent: 'center'
  }
});
//# sourceMappingURL=Modal.js.map