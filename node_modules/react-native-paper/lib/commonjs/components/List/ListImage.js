"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * A component to show image in a list item.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { List, MD3Colors } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <>
 *     <List.Image variant="image" source={{uri: 'https://www.someurl.com/apple'}} />
 *     <List.Image variant="video" source={require('../../some-apple.png')} />
 *   </>
 * );
 *
 * export default MyComponent;
 * ```
 */
const ListImage = ({
  style,
  source,
  variant = 'image',
  theme: themeOverrides
}) => {
  const theme = (0, _theming.useInternalTheme)(themeOverrides);
  const getStyles = () => {
    if (variant === 'video') {
      if (!theme.isV3) {
        return [style, styles.video];
      }
      return [style, styles.videoV3];
    }
    return [style, styles.image];
  };
  return /*#__PURE__*/React.createElement(_reactNative.Image, {
    style: getStyles(),
    source: source,
    accessibilityIgnoresInvertColors: true,
    testID: "list-image"
  });
};
const styles = _reactNative.StyleSheet.create({
  image: {
    width: 56,
    height: 56
  },
  video: {
    width: 100,
    height: 64,
    marginLeft: 0
  },
  videoV3: {
    width: 114,
    height: 64,
    marginLeft: 0
  }
});
ListImage.displayName = 'List.Image';
var _default = exports.default = ListImage;
//# sourceMappingURL=ListImage.js.map