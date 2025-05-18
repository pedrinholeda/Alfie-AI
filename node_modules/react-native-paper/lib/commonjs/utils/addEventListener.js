"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addEventListener = addEventListener;
exports.addListener = addListener;
function addEventListener(Module, ...rest) {
  const [eventName, handler] = rest;
  let removed = false;
  const subscription = Module.addEventListener(eventName, handler) ?? {
    remove: () => {
      var _Module$removeEventLi, _Module$remove;
      if (removed) {
        return;
      }
      (_Module$removeEventLi = Module.removeEventListener) === null || _Module$removeEventLi === void 0 || _Module$removeEventLi.call(Module, eventName, handler);
      (_Module$remove = Module.remove) === null || _Module$remove === void 0 || _Module$remove.call(Module, eventName, handler);
      removed = true;
    }
  };
  return subscription;
}
function addListener(Module, ...rest) {
  const [eventName, handler] = rest;
  let removed = false;
  const subscription = Module.addListener(eventName, handler) ?? {
    remove: () => {
      if (removed) {
        return;
      }
      Module.removeEventListener(eventName, handler);
      removed = true;
    }
  };
  return subscription;
}
//# sourceMappingURL=addEventListener.js.map