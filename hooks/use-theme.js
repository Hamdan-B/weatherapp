import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "@/hooks/use-color-scheme";

const ThemeToggleContext = createContext({
  isDark: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === "dark");

  // keep in sync with system by default
  useEffect(() => {
    setIsDark(systemScheme === "dark");
  }, [systemScheme]);

  const toggleTheme = () => setIsDark((v) => !v);

  return (
    <ThemeToggleContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeToggleContext.Provider>
  );
};

export const useThemeToggle = () => useContext(ThemeToggleContext);

export default ThemeToggleContext;
