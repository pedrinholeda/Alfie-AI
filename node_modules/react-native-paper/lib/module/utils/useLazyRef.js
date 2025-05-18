import * as React from 'react';
export default function useLazyRef(callback) {
  const lazyRef = React.useRef(undefined);
  if (lazyRef.current === undefined) {
    lazyRef.current = callback();
  }
  return lazyRef;
}
//# sourceMappingURL=useLazyRef.js.map