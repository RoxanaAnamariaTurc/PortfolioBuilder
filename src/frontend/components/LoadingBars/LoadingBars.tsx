/** @jsxImportSource @emotion/react */
import React from "react";
import { useTheme } from "../../../hooks/useTheme";
import { getLoadingStyles } from "./LoadingBars.styles";

interface LoadingBarsProps {
  bars?: Array<{ width: string; delay: string }>;
  barColor?: string;
  barHeight?: string;
  direction?: "row" | "column";
  type?: "bar" | "circle";
}

const Loading: React.FC<LoadingBarsProps> = ({
  bars = [],
  barColor,
  barHeight,
  direction = "column",
  type = "bar",
}) => {
  const theme = useTheme();
  const style = getLoadingStyles(theme, barColor, barHeight, direction);

  return (
    <div role="progressbar" css={style.container}>
      {type === "bar" ? (
        bars.map((bar, index) => (
          <div key={index} css={style.bar(bar.width, bar.delay)}></div>
        ))
      ) : (
        <div css={style.circle}></div>
      )}
    </div>
  );
};

export default Loading;
