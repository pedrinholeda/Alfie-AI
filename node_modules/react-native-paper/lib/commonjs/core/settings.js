"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SettingsContext = exports.Provider = exports.Consumer = void 0;
var React = _interopRequireWildcard(require("react"));
var _MaterialCommunityIcon = _interopRequireDefault(require("../components/MaterialCommunityIcon"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const SettingsContext = exports.SettingsContext = /*#__PURE__*/React.createContext({
  icon: _MaterialCommunityIcon.default,
  rippleEffectEnabled: true
});
const {
  Provider,
  Consumer
} = SettingsContext;
exports.Consumer = Consumer;
exports.Provider = Provider;
//# sourceMappingURL=settings.js.map