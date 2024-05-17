import { css, keyframes } from "@emotion/react";
import { MyTheme } from "../../../theme";

const barAnimation = keyframes`
0% { transform: scaleX(1); }
50% { transform: scaleX(0.5); }
100% { transform: scaleX(1); }
`;

export const getLoadingStyles = (
  theme: MyTheme,
  barColor = theme.colors.danger,
  barHeight = "2px",
  direction = "column"
) => ({
  container: css({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  }),
  bar: (width: string, delay: string) =>
    css({
      backgroundColor: barColor,
      width: width,
      height: barHeight,
      marginBottom: direction === "column" ? `${theme.sizes.small}` : "0",
      marginRight: direction === "row" ? `${theme.sizes.small}` : "0",
      animation: `${barAnimation} 1s infinite`,
      animationDelay: delay,
    }),
});
