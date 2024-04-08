export interface MyTheme {
  colors: {
    primary: string;
    secondary: string;
    danger: string;
    background: string;
    hover: string;
    transparent: string;
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
    primary: "#add8e6",
    secondary: "#2C3531",
    danger: "darkorange",
    background: "linear-gradient(to bottom, black, #2d2c3c)",
    hover: "#967BB6",
    transparent: "transparent",
  },
  fonts: {
    body: "Roboto",
    heading: "Georgia, sans serif",
  },
  sizes: {
    xsmall: "0.25rem",
    small: "1rem",
    medium: "2rem",
    large: "5rem",
    xlarge: "10rem",
  },
};
