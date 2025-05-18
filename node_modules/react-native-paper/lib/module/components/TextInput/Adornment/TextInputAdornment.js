function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React from 'react';
import { AdornmentSide, AdornmentType, InputMode } from './enums';
import TextInputAffix, { AffixAdornment } from './TextInputAffix';
import TextInputIcon, { IconAdornment } from './TextInputIcon';
import { getConstants } from '../helpers';
export function getAdornmentConfig({
  left,
  right
}) {
  let adornmentConfig = [];
  if (left || right) {
    [{
      side: AdornmentSide.Left,
      adornment: left
    }, {
      side: AdornmentSide.Right,
      adornment: right
    }].forEach(({
      side,
      adornment
    }) => {
      if (adornment && /*#__PURE__*/React.isValidElement(adornment)) {
        let type;
        if (adornment.type === TextInputAffix) {
          type = AdornmentType.Affix;
        } else if (adornment.type === TextInputIcon) {
          type = AdornmentType.Icon;
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
export function getAdornmentStyleAdjustmentForNativeInput({
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
  } = getConstants(isV3);
  if (adornmentConfig.length) {
    const adornmentStyleAdjustmentForNativeInput = adornmentConfig.map(({
      type,
      side
    }) => {
      const isLeftSide = side === AdornmentSide.Left;
      const inputModeAdornemntOffset = mode === InputMode.Outlined ? ADORNMENT_OFFSET + OUTLINED_INPUT_OFFSET : ADORNMENT_OFFSET;
      const paddingKey = `padding${captalize(side)}`;
      const affixWidth = isLeftSide ? leftAffixWidth : rightAffixWidth;
      const padding = typeof paddingHorizontal === 'number' ? paddingHorizontal : inputModeAdornemntOffset;
      const offset = affixWidth + padding;
      const isAffix = type === AdornmentType.Affix;
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, adornmentConfig.map(({
      type,
      side
    }) => {
      let inputAdornmentComponent;
      if (side === AdornmentSide.Left) {
        inputAdornmentComponent = left;
      } else if (side === AdornmentSide.Right) {
        inputAdornmentComponent = right;
      }
      const commonProps = {
        side: side,
        testID: `${side}-${type}-adornment`,
        isTextInputFocused,
        paddingHorizontal,
        disabled
      };
      if (type === AdornmentType.Icon) {
        return /*#__PURE__*/React.createElement(IconAdornment, _extends({}, commonProps, {
          theme: theme,
          key: side,
          icon: inputAdornmentComponent,
          topPosition: topPosition[AdornmentType.Icon],
          forceFocus: forceFocus
        }));
      } else if (type === AdornmentType.Affix) {
        return /*#__PURE__*/React.createElement(AffixAdornment, _extends({}, commonProps, {
          key: side,
          topPosition: topPosition[AdornmentType.Affix][side],
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
export default TextInputAdornment;
//# sourceMappingURL=TextInputAdornment.js.map