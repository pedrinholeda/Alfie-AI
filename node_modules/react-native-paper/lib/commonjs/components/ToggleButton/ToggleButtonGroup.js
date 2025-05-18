"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ToggleButtonGroupContext = exports.ToggleButtonGroup = void 0;
var React = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ToggleButtonGroupContext = exports.ToggleButtonGroupContext =
/*#__PURE__*/
//@ts-expect-error: TS can't ensure the type from Group to children
React.createContext(null);

/**
 * Toggle group allows to control a group of toggle buttons.</br>
 * It doesn't change the appearance of the toggle buttons. If you want to group them in a row, check out [ToggleButton.Row](ToggleButtonRow).
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { ToggleButton } from 'react-native-paper';
 *
 * const MyComponent = () => {
 *   const [value, setValue] = React.useState('left');
 *
 *   return (
 *     <ToggleButton.Group
 *       onValueChange={value => setValue(value)}
 *       value={value}>
 *       <ToggleButton icon="format-align-left" value="left" />
 *       <ToggleButton icon="format-align-right" value="right" />
 *     </ToggleButton.Group>
 *   );
 * };
 *
 * export default MyComponent;
 *```
 */
const ToggleButtonGroup = ({
  value,
  onValueChange,
  children
}) => /*#__PURE__*/React.createElement(ToggleButtonGroupContext.Provider, {
  value: {
    value,
    onValueChange
  }
}, children);
exports.ToggleButtonGroup = ToggleButtonGroup;
ToggleButtonGroup.displayName = 'ToggleButton.Group';
var _default = exports.default = ToggleButtonGroup; // @component-docs ignore-next-line
//# sourceMappingURL=ToggleButtonGroup.js.map