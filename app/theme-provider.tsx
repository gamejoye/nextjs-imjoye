import { PropsWithChildren, createContext, useContext, useState } from 'react';

type Theme = 'light' | 'dark';
interface ThemeContext {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const defaultDispatch = (theme: Theme) => { };
const ThemeContext = createContext<ThemeContext>({
  theme: 'light',
  setTheme: defaultDispatch,
});
const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export default ThemeProvider;