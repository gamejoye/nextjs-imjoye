import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const defaultDispatch = (theme: Theme) => { };
export const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  setTheme: defaultDispatch,
});

/// ------------------------------------------------------------

const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) setTheme(savedTheme as Theme);
  }, []);
  const wrappedSetTheme = (theme: Theme) => {
    localStorage.setItem('theme', theme);
    setTheme(theme);
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme: wrappedSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;