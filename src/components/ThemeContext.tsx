import { createContext, useContext, useState } from "react";
import { useTheme } from "../hooks/useTheme";
import { MyTheme } from "../theme";
import {
  getPortfolioStylesLight,
  getPortfolioStylesDark,
} from "./Portfolio/Portfolio.styles";

const ThemeContext = createContext<any>(null);

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const theme = useTheme() as MyTheme;
  const [style, setStyle] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark"
      ? getPortfolioStylesDark(theme)
      : getPortfolioStylesLight(theme);
  });

  const toggleTheme = () => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
      setStyle(getPortfolioStylesDark(theme));
      localStorage.setItem("theme", "dark");
    } else {
      setStyle(getPortfolioStylesLight(theme));
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ style, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
