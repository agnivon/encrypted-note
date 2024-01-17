"use client";

import React from "react";
import { useContext } from "react";

export type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: React.Dispatch<React.SetStateAction<Theme>>;
};

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => undefined,
});

const ThemeContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<Theme>("dark");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className={theme}>{children}</div>
    </ThemeContext.Provider>
  );
};

const useThemeContext = () => useContext(ThemeContext);

export { ThemeContext, useThemeContext };
export default ThemeContextProvider;
