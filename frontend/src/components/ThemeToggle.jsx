import React from 'react';
import useTheme from '../hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <button onClick={toggle} title="Toggle theme" className="p-2 rounded-full hover:bg-gray-700 transition-colors">
      {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-gray-600" />}
    </button>
  );
};

export default ThemeToggle;
