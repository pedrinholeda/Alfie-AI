"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
/**
 * Portal host is the component which actually renders all Portals.
 */
class PortalManager extends React.PureComponent {
  state = {
    portals: []
  };
  mount = (key, children) => {
    this.setState(state => ({
      portals: [...state.portals, {
        key,
        children
      }]
    }));
  };
  update = (key, children) => this.setState(state => ({
    portals: state.portals.map(item => {
      if (item.key === key) {
        return {
          ...item,
          children
        };
      }
      return item;
    })
  }));
  unmount = key => this.setState(state => ({
    portals: state.portals.filter(item => item.key !== key)
  }));
  render() {
    return this.state.portals.map(({
      key,
      children
    }) => /*#__PURE__*/React.createElement(_reactNative.View, {
      key: key,
      collapsable: false /* Need collapsable=false here to clip the elevations, otherwise they appear above sibling components */,
      pointerEvents: "box-none",
      style: _reactNative.StyleSheet.absoluteFill
    }, children));
  }
}
exports.default = PortalManager;
//# sourceMappingURL=PortalManager.js.map