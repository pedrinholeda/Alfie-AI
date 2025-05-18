"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show content inside a Card.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Card, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Content>
 *       <Text variant="titleLarge">Card title</Text>
 *       <Text variant="bodyMedium">Card content</Text>
 *     </Card.Content>
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 */
const CardContent = ({
  index,
  total,
  siblings,
  style,
  ...rest
}) => {
  const cover = 'withInternalTheme(CardCover)';
  const title = 'withInternalTheme(CardTitle)';
  let contentStyle, prev, next;
  if (typeof index === 'number' && siblings) {
    prev = siblings[index - 1];
    next = siblings[index + 1];
  }
  if (prev === cover && next === cover || prev === title && next === title || total === 1) {
    contentStyle = styles.only;
  } else if (index === 0) {
    if (next === cover || next === title) {
      contentStyle = styles.only;
    } else {
      contentStyle = styles.first;
    }
  } else if (typeof total === 'number' && index === total - 1) {
    if (prev === cover || prev === title) {
      contentStyle = styles.only;
    } else {
      contentStyle = styles.last;
    }
  } else if (prev === cover || prev === title) {
    contentStyle = styles.first;
  } else if (next === cover || next === title) {
    contentStyle = styles.last;
  }
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, rest, {
    style: [styles.container, contentStyle, style]
  }));
};
CardContent.displayName = 'Card.Content';
const styles = _reactNative.StyleSheet.create({
  container: {
    paddingHorizontal: 16
  },
  first: {
    paddingTop: 16
  },
  last: {
    paddingBottom: 16
  },
  only: {
    paddingVertical: 16
  }
});
var _default = exports.default = CardContent;
//# sourceMappingURL=CardContent.js.map