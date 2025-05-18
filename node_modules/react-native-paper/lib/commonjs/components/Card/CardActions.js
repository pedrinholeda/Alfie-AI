"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
var _theming = require("../../core/theming");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * A component to show a list of actions inside a Card.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Card, Button } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Card>
 *     <Card.Actions>
 *       <Button>Cancel</Button>
 *       <Button>Ok</Button>
 *     </Card.Actions>
 *   </Card>
 * );
 *
 * export default MyComponent;
 * ```
 */
const CardActions = ({
  theme,
  style,
  children,
  ...rest
}) => {
  const {
    isV3
  } = (0, _theming.useInternalTheme)(theme);
  const justifyContent = isV3 ? 'flex-end' : 'flex-start';
  const containerStyle = [styles.container, {
    justifyContent
  }, style];
  return /*#__PURE__*/React.createElement(_reactNative.View, _extends({}, rest, {
    style: containerStyle
  }), React.Children.map(children, (child, index) => {
    if (! /*#__PURE__*/React.isValidElement(child)) {
      return child;
    }
    const compact = !isV3 && child.props.compact !== false;
    const mode = child.props.mode ?? (isV3 ? index === 0 ? 'outlined' : 'contained' : undefined);
    const childStyle = [isV3 && styles.button, child.props.style];
    return /*#__PURE__*/React.cloneElement(child, {
      ...child.props,
      compact,
      mode,
      style: childStyle
    });
  }));
};
CardActions.displayName = 'Card.Actions';
const styles = _reactNative.StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8
  },
  button: {
    marginLeft: 8
  }
});
var _default = exports.default = CardActions;
//# sourceMappingURL=CardActions.js.map