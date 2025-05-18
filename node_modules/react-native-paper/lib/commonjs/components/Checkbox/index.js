"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _Checkbox = _interopRequireDefault(require("./Checkbox"));
var _CheckboxAndroid = _interopRequireDefault(require("./CheckboxAndroid"));
var _CheckboxIOS = _interopRequireDefault(require("./CheckboxIOS"));
var _CheckboxItem = _interopRequireDefault(require("./CheckboxItem"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Checkbox = Object.assign(
// @component ./Checkbox.tsx
_Checkbox.default, {
  // @component ./CheckboxItem.tsx
  Item: _CheckboxItem.default,
  // @component ./CheckboxAndroid.tsx
  Android: _CheckboxAndroid.default,
  // @component ./CheckboxIOS.tsx
  IOS: _CheckboxIOS.default
});
var _default = exports.default = Checkbox;
//# sourceMappingURL=index.js.map