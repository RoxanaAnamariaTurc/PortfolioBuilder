export interface MyTheme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    background: string;
    hover: string;
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
}

export const theme: MyTheme = {
  colors: {
    primary: "#D1E8E2",
    secondary: "#2C3531",
    danger: "#F60909",
    background: "linear-gradient(to bottom, #2C3531, #0C2F3B)",
    hover: "#D9B08C",
  },
  fonts: {
    body: "Arial, sans serif",
    heading: "Georgia, sans serif",
  },
  sizes: {
    xsmall: "0.25rem",
    small: "1em",
    medium: "2em",
    large: "3em",
    xlarge: "4em",
  },
};
