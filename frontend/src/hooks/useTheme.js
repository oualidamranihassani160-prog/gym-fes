import { useEffect, useState } from 'react';

const THEME_KEY = 'theme';

export default function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem(THEME_KEY) || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    } catch (e) {
      return 'light';
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try { 
      localStorage.setItem(THEME_KEY, theme);
      window.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === THEME_KEY) {
        setTheme(e.newValue || 'light');
      }
    };
    const onThemeChange = (e) => setTheme(e.detail || 'light');
    window.addEventListener('storage', onStorage);
    window.addEventListener('themechange', onThemeChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('themechange', onThemeChange);
    };
  }, []);

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return { theme, setTheme, toggle };
}
