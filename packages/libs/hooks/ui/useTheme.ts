import { Theme } from '@betnomi/libs/types/ui';
import { useCallback, useState } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(Theme.dark);
  const toggleTheme = useCallback(() => {
    if (theme === Theme.dark) {
      setTheme(Theme.light);
      document.documentElement.classList.add('light');
    } else {
      setTheme(Theme.dark);
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  return {
    theme, setTheme, toggleTheme, isDark: theme === Theme.dark, 
  };
};
