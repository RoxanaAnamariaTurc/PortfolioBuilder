import { css, keyframes } from "@emotion/react";
import { MyTheme } from "../../../theme";

const barAnimation = keyframes`
0% { transform: scaleX(1); }
50% { transform: scaleX(0.5); }
100% { transform: scaleX(1); }
`;

const circleAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const getLoadingStyles = (
  theme: MyTheme,
  barColor = theme.colors.danger,
  barHeight = "2px",
  direction = "column",
  type = "bar"
) => ({
  container: css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: direction === "column" ? "column" : "row",
    justifyContent: "center",
    alignItems: "center",
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
  circle: css({
    border: `4px solid ${theme.colors.primary}`,
    borderRadius: "50%",
    borderTop: `4px solid ${barColor}`,
    width: "30px",
    height: "30px",
    animation: `${circleAnimation} 1s linear infinite`,
  }),
});
