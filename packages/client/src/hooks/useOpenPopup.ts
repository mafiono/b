import { useCallback } from 'react';

export const useOpenPopup = (width = 600, height = 800) =>
  useCallback((url: string) => {
    window.open(url, '', `width=${width},height=${height}`);
  }, []);
