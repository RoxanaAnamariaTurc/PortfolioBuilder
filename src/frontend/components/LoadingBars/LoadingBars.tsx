/** @jsxImportSource @emotion/react */
import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { getLoadingStyles } from "./LoadingBars.styles";

interface LoadingBarsProps {
  bars: Array<{ width: string; delay: string }>;
  barColor?: string;
  barHeight?: string;
  direction?: "row" | "column";
}

const Loading: React.FC<LoadingBarsProps> = ({
  bars,
  barColor,
  barHeight,
  direction = "column",
}) => {
  const theme = useTheme();
  const style = getLoadingStyles(theme, barColor, barHeight, direction);

  return (
    <div css={style.container}>
      {bars.map((bar, index) => (
        <div key={index} css={style.bar(bar.width, bar.delay)}></div>
      ))}
    </div>
  );
};

export default Loading;
