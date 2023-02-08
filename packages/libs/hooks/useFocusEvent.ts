import { useCallback, useState } from 'react';

export const useFocusEvent = (initialState = false) => {
  const [focused, setFocused] = useState(initialState);

  const onFocus = useCallback(() => setFocused(true), [setFocused]);
  const offFocus = useCallback(() => setTimeout(() => setFocused(false)), [setFocused]);
  const onBlur = useCallback(() => setTimeout(() => setFocused(false), 300), [setFocused]);

  return {
    focused, onBlur, offFocus, onFocus, 
  };
};
