"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.getAdornmentConfig = getAdornmentConfig;
exports.getAdornmentStyleAdjustmentForNativeInput = getAdornmentStyleAdjustmentForNativeInput;
var _react = _interopRequireDefault(require("react"));
var _enums = require("./enums");
var _TextInputAffix = _interopRequireWildcard(require("./TextInputAffix"));
var _TextInputIcon = _interopRequireWildcard(require("./TextInputIcon"));
var _helpers = require("../helpers");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function getAdornmentConfig({
  left,
  right
}) {
  let adornmentConfig = [];
  if (left || right) {
    [{
      side: _enums.AdornmentSide.Left,
      adornment: left
    }, {
      side: _enums.AdornmentSide.Right,
      adornment: right
    }].forEach(({
      side,
      adornment
    }) => {
      if (adornment && /*#__PURE__*/_react.default.isValidElement(adornment)) {
        let type;
        if (adornment.type === _TextInputAffix.default) {
          type = _enums.AdornmentType.Affix;
        } else if (adornment.type === _TextInputIcon.default) {
          type = _enums.AdornmentType.Icon;
        }
        adornmentConfig.push({
          side,
          type
        });
      }
    });
  }
  return adornmentConfig;
}
function getAdornmentStyleAdjustmentForNativeInput({
  adornmentConfig,
  leftAffixWidth,
  rightAffixWidth,
  paddingHorizontal,
  inputOffset = 0,
  mode,
  isV3
}) {
  const {
    OUTLINED_INPUT_OFFSET,
    ADORNMENT_OFFSET
  } = (0, _helpers.getConstants)(isV3);
  if (adornmentConfig.length) {
    const adornmentStyleAdjustmentForNativeInput = adornmentConfig.map(({
      type,
      side
    }) => {
      const isLeftSide = side === _enums.AdornmentSide.Left;
      const inputModeAdornemntOffset = mode === _enums.InputMode.Outlined ? ADORNMENT_OFFSET + OUTLINED_INPUT_OFFSET : ADORNMENT_OFFSET;
      const paddingKey = `padding${captalize(side)}`;
      const affixWidth = isLeftSide ? leftAffixWidth : rightAffixWidth;
      const padding = typeof paddingHorizontal === 'number' ? paddingHorizontal : inputModeAdornemntOffset;
      const offset = affixWidth + padding;
      const isAffix = type === _enums.AdornmentType.Affix;
      const marginKey = `margin${captalize(side)}`;
      return {
        [marginKey]: isAffix ? 0 : offset,
        [paddingKey]: isAffix ? offset : inputOffset
      };
    });
    const allStyleAdjustmentsMerged = adornmentStyleAdjustmentForNativeInput.reduce((mergedStyles, currentStyle) => {
      return {
        ...mergedStyles,
        ...currentStyle
      };
    }, {});
    return allStyleAdjustmentsMerged;
  } else {
    return [{}];
  }
}
const captalize = text => text.charAt(0).toUpperCase() + text.slice(1);
const TextInputAdornment = ({
  adornmentConfig,
  left,
  right,
  onAffixChange,
  textStyle,
  visible,
  topPosition,
  isTextInputFocused,
  forceFocus,
  paddingHorizontal,
  maxFontSizeMultiplier,
  theme,
  disabled
}) => {
  if (adornmentConfig.length) {
    return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, adornmentConfig.map(({
      type,
      side
    }) => {
      let inputAdornmentComponent;
      if (side === _enums.AdornmentSide.Left) {
        inputAdornmentComponent = left;
      } else if (side === _enums.AdornmentSide.Right) {
        inputAdornmentComponent = right;
      }
      const commonProps = {
        side: side,
        testID: `${side}-${type}-adornment`,
        isTextInputFocused,
        paddingHorizontal,
        disabled
      };
      if (type === _enums.AdornmentType.Icon) {
        return /*#__PURE__*/_react.default.createElement(_TextInputIcon.IconAdornment, _extends({}, commonProps, {
          theme: theme,
          key: side,
          icon: inputAdornmentComponent,
          topPosition: topPosition[_enums.AdornmentType.Icon],
          forceFocus: forceFocus
        }));
      } else if (type === _enums.AdornmentType.Affix) {
        return /*#__PURE__*/_react.default.createElement(_TextInputAffix.AffixAdornment, _extends({}, commonProps, {
          key: side,
          topPosition: topPosition[_enums.AdornmentType.Affix][side],
          affix: inputAdornmentComponent,
          textStyle: textStyle,
          onLayout: onAffixChange[side],
          visible: visible,
          maxFontSizeMultiplier: maxFontSizeMultiplier
        }));
      } else {
        return null;
      }
    }));
  } else {
    return null;
  }
};
var _default = exports.default = TextInputAdornment;
//# sourceMappingURL=TextInputAdornment.js.map