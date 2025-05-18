"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ListAccordionGroupContext = void 0;
var React = _interopRequireWildcard(require("react"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ListAccordionGroupContext = exports.ListAccordionGroupContext = /*#__PURE__*/React.createContext(null);

/**
 * List.AccordionGroup allows to control a group of List Accordions. `id` prop for List.Accordion is required in order for group to work.
 * List.AccordionGroup can be a controlled or uncontrolled component. The example shows the uncontrolled version.
 * At most one Accordion can be expanded at a given time.
 *
 * ## Usage
 * ```js
 * import * as React from 'react';
 * import { View, Text } from 'react-native';
 * import { List } from 'react-native-paper';
 *
 * const MyComponent = () => (
 *   <List.AccordionGroup>
 *     <List.Accordion title="Accordion 1" id="1">
 *       <List.Item title="Item 1" />
 *     </List.Accordion>
 *     <List.Accordion title="Accordion 2" id="2">
 *       <List.Item title="Item 2" />
 *     </List.Accordion>
 *     <View>
 *       <Text>
 *         List.Accordion can be wrapped because implementation uses React.Context.
 *       </Text>
 *       <List.Accordion title="Accordion 3" id="3">
 *         <List.Item title="Item 3" />
 *       </List.Accordion>
 *     </View>
 *   </List.AccordionGroup>
 * );
 *
 * export default MyComponent;
 *```
 */
const ListAccordionGroup = ({
  expandedId: expandedIdProp,
  onAccordionPress,
  children
}) => {
  const [expandedId, setExpandedId] = React.useState(undefined);
  const onAccordionPressDefault = newExpandedId => {
    setExpandedId(currentExpandedId => currentExpandedId === newExpandedId ? undefined : newExpandedId);
  };
  return /*#__PURE__*/React.createElement(ListAccordionGroupContext.Provider, {
    value: {
      expandedId: expandedIdProp || expandedId,
      // component can be controlled or uncontrolled
      onAccordionPress: onAccordionPress || onAccordionPressDefault
    }
  }, children);
};
ListAccordionGroup.displayName = 'List.AccordionGroup';
var _default = exports.default = ListAccordionGroup;
//# sourceMappingURL=ListAccordionGroup.js.map