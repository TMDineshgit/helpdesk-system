import { useEffect, useRef } from 'react';

function IndeterminateCheckbox({ checked, indeterminate = false, onChange }) {
  const ref = useRef(null);

  // "indeterminate" (the dash) can only be set through the DOM element itself
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate && !checked;
    }
  }, [indeterminate, checked]);

  return (
    <input
      ref={ref}
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 cursor-pointer"
    />
  );
}

export default IndeterminateCheckbox;