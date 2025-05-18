"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
class PortalConsumer extends React.Component {
  componentDidMount() {
    this.checkManager();
    this.key = this.props.manager.mount(this.props.children);
  }
  componentDidUpdate() {
    this.checkManager();
    this.props.manager.update(this.key, this.props.children);
  }
  componentWillUnmount() {
    this.checkManager();
    this.props.manager.unmount(this.key);
  }
  checkManager() {
    if (!this.props.manager) {
      throw new Error('Looks like you forgot to wrap your root component with `Provider` component from `react-native-paper`.\n\n' + "Please read our getting-started guide and make sure you've followed all the required steps.\n\n" + 'https://callstack.github.io/react-native-paper/docs/guides/getting-started');
    }
  }
  render() {
    return null;
  }
}
exports.default = PortalConsumer;
//# sourceMappingURL=PortalConsumer.js.map