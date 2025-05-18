"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _PortalConsumer = _interopRequireDefault(require("./PortalConsumer"));
var _PortalHost = _interopRequireWildcard(require("./PortalHost"));
var _settings = require("../../core/settings");
var _theming = require("../../core/theming");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Portal allows rendering a component at a different place in the parent tree.
 * You can use it to render content which should appear above other elements, similar to `Modal`.
 * It requires a [`Portal.Host`](PortalHost) component to be rendered somewhere in the parent tree.
 * Note that if you're using the `Provider` component, this already includes a `Portal.Host`.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { Portal, Text } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <Portal>
 *     <Text>This is rendered at a different place</Text>
 *   </Portal>
 * );
 *
 * export default MyComponent;
 * ```
 */
class Portal extends React.Component {
  // @component ./PortalHost.tsx
  static Host = _PortalHost.default;
  render() {
    const {
      children,
      theme
    } = this.props;
    return /*#__PURE__*/React.createElement(_settings.Consumer, null, settings => /*#__PURE__*/React.createElement(_PortalHost.PortalContext.Consumer, null, manager => /*#__PURE__*/React.createElement(_PortalConsumer.default, {
      manager: manager
    }, /*#__PURE__*/React.createElement(_settings.Provider, {
      value: settings
    }, /*#__PURE__*/React.createElement(_theming.ThemeProvider, {
      theme: theme
    }, children)))));
  }
}
var _default = exports.default = (0, _theming.withInternalTheme)(Portal);
//# sourceMappingURL=Portal.js.map