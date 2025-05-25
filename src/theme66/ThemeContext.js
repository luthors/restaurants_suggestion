import { createContext, useState } from "react";

export const ThemeContext = createContext({
  toggleTheme: () => {},
  isDarkMode: false,
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};