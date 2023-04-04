import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import { setTheme } from './theme-slice';
import { selectTheme } from './theme-selector';
import { useAppDispatch } from 'store';
import { Theme } from './theme-slice';

export const useTheme = (): [Theme, () => void] => {
  const dispatch = useAppDispatch();
  const theme = useSelector(selectTheme);

  const toggleTheme = () =>
    dispatch(setTheme(theme === 'light' ? 'dark' : 'light'));

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return [theme, toggleTheme];
};
