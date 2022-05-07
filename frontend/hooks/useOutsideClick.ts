import { useEffect, useRef, useCallback } from 'react';

function useOutsideClick(
  state: boolean,
  setState: React.Dispatch<React.SetStateAction<boolean>>
) {
  const componentRef = useRef<HTMLDivElement>(null);

  const toggleVisibility = useCallback(
    () => setState(!state),
    [setState, state]
  );

  const handleClickOutside = useCallback(
    (e) => {
      if (
        state &&
        componentRef.current &&
        !componentRef.current.contains(e.target)
      ) {
        toggleVisibility();
      }
    },
    [state, toggleVisibility]
  );

  const keyPress = useCallback(
    (e) => {
      if (state && e.key === 'Escape') {
        toggleVisibility();
      }
    },
    [state, toggleVisibility]
  );
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', keyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', keyPress);
    };
  }, [handleClickOutside, keyPress]);

  return {
    componentRef,
    toggleVisibility,
  };
}

export default useOutsideClick;
