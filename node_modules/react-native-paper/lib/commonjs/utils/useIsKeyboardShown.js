"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useIsKeyboardShown;
var React = _interopRequireWildcard(require("react"));
var _reactNative = require("react-native");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function useIsKeyboardShown({
  onShow,
  onHide
}) {
  React.useEffect(() => {
    let willShowSubscription;
    let willHideSubscription;
    let didShowSubscription;
    let didHideSubscription;
    if (_reactNative.Platform.OS === 'ios') {
      willShowSubscription = _reactNative.Keyboard.addListener('keyboardWillShow', onShow);
      willHideSubscription = _reactNative.Keyboard.addListener('keyboardWillHide', onHide);
    } else {
      didShowSubscription = _reactNative.Keyboard.addListener('keyboardDidShow', onShow);
      didHideSubscription = _reactNative.Keyboard.addListener('keyboardDidHide', onHide);
    }
    return () => {
      if (_reactNative.Platform.OS === 'ios') {
        var _willShowSubscription, _willHideSubscription;
        if ((_willShowSubscription = willShowSubscription) !== null && _willShowSubscription !== void 0 && _willShowSubscription.remove) {
          willShowSubscription.remove();
        } else {
          // @ts-expect-error: We keep deprecated listener remove method for backwards compat with old RN versions
          _reactNative.Keyboard.removeListener('keyboardWillShow', onShow);
        }
        if ((_willHideSubscription = willHideSubscription) !== null && _willHideSubscription !== void 0 && _willHideSubscription.remove) {
          willHideSubscription.remove();
        } else {
          // @ts-expect-error: We keep deprecated listener remove method for backwards compat with old RN versions
          _reactNative.Keyboard.removeListener('keyboardWillHide', onHide);
        }
      } else {
        var _didShowSubscription, _didHideSubscription;
        if ((_didShowSubscription = didShowSubscription) !== null && _didShowSubscription !== void 0 && _didShowSubscription.remove) {
          didShowSubscription.remove();
        } else {
          // @ts-expect-error: We keep deprecated listener remove method for backwards compat with old RN versions
          _reactNative.Keyboard.removeListener('keyboardDidShow', onShow);
        }
        if ((_didHideSubscription = didHideSubscription) !== null && _didHideSubscription !== void 0 && _didHideSubscription.remove) {
          didHideSubscription.remove();
        } else {
          // @ts-expect-error: We keep deprecated listener remove method for backwards compat with old RN versions
          _reactNative.Keyboard.removeListener('keyboardDidHide', onHide);
        }
      }
    };
  }, [onHide, onShow]);
}
//# sourceMappingURL=useIsKeyboardShown.js.map