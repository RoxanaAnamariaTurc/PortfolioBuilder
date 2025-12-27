export interface MyTheme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    background: string;
    hover: string;
    transparent: string;
    portfolioBackground: string;
    accent: string;
    border: string;
    text: string;
    textSecondary: string;
    surface: string; // Card/surface backgrounds
    surfaceVariant: string; // Alternative surfaces
    success: string; // Success messages
    warning: string; // Warning messages
    gradient: string; // Main gradient
  };
  fonts: {
    body: string;
    heading: string;
  };
  sizes: {
    xsmall: string;
    small: string;
    medium: string;
    large: string;
    xlarge: string;
  };
  lightTheme: {
    colors: {
      primary: string;
      secondary?: string;
      background?: string;
      hover?: string;
      transparent?: string;
      accent?: string;
      border?: string;
      text?: string;
      textSecondary?: string;
      surface?: string;
      surfaceVariant?: string;
      success?: string;
      warning?: string;
      gradient?: string;
    };
  };
  currentTheme: "light" | "dark";
}

export const theme: MyTheme = {
  colors: {
    // Dark theme with black backgrounds and pastel purple accents
    primary: "#b8a9c9", // Pastel purple
    secondary: "#d4c4e3", // Light pastel purple
    danger: "#e57373", // Soft red
    background: "#000000", // Pure black background
    portfolioBackground: "#0a0a0a", // Near black
    hover: "#c9b8db", // Lighter pastel purple hover
    transparent: "transparent",
    accent: "#dcd0eb", // Very light pastel purple accent
    border: "rgba(184, 169, 201, 0.3)", // Semi-transparent pastel purple border
    text: "#f5f5f5", // Off-white text
    textSecondary: "#a0a0a0", // Soft gray
    surface: "rgba(20, 20, 20, 0.9)", // Dark surface
    surfaceVariant: "rgba(30, 30, 30, 0.9)", // Slightly lighter dark surface
    success: "#81c784", // Soft green
    warning: "#ffb74d", // Soft amber
    gradient: "linear-gradient(135deg, #b8a9c9 0%, #d4c4e3 100%)", // Pastel purple gradient
  },
  fonts: {
    body: "Roboto",
    heading: "Georgia, sans serif",
  },
  sizes: {
    xsmall: "0.5rem",
    small: "0.75rem",
    medium: "2rem",
    large: "5rem",
    xlarge: "10rem",
  },
  lightTheme: {
    colors: {
      // Light theme with pastel purple accents
      primary: "#9575cd", // Pastel purple for light theme
      secondary: "#b39ddb", // Lighter purple secondary
      background: "#fafafa", // Very light gray background
      transparent: "transparent",
      hover: "#a586d9", // Purple hover
      accent: "#ce93d8", // Pink-purple accent
      border: "rgba(149, 117, 205, 0.2)", // Semi-transparent purple border
      text: "#212121", // Dark text
      textSecondary: "#616161", // Medium gray
      surface: "rgba(255, 255, 255, 0.9)", // White surface
      surfaceVariant: "rgba(250, 250, 250, 0.9)", // Very light surface
      success: "#66bb6a", // Soft green for light theme
      warning: "#ffa726", // Soft amber for light theme
      gradient: "linear-gradient(135deg, #b8a9c9 0%, #d4c4e3 100%)", // Pastel purple gradient
    },
  },
  currentTheme: (localStorage.getItem("theme") as "light" | "dark") || "light",
};
