import { createContext, useContext, useEffect, useState } from "react";
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
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setStyle(
      savedTheme === "dark"
        ? getPortfolioStylesDark(theme)
        : getPortfolioStylesLight(theme)
    );
  }, [theme]);

  const toggleTheme = () => {
    if (currentTheme === "light") {
      setCurrentTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setCurrentTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <ThemeContext.Provider value={{ style, toggleTheme, currentTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
