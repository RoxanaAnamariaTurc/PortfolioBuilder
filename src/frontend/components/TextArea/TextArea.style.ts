import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getTextAreaStyles = (theme: MyTheme) => {
  return {
    textarea: css({
      padding: "12px 16px",
      background: `linear-gradient(135deg, 
        ${theme.colors.surface}80 0%, 
        ${theme.colors.background}90 100%)`,
      color: theme.colors.text,
      border: `1px solid ${theme.colors.border}40`,
      borderRadius: "12px",
      width: "35em",
      fontSize: "14px",
      lineHeight: "1.6",
      resize: "vertical",
      minHeight: "120px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      fontFamily: "inherit",
      "&:focus": {
        outline: "none",
        border: `1px solid ${theme.colors.accent}`,
        boxShadow: `
          0 0 0 3px ${theme.colors.accent}20,
          0 4px 6px -1px rgba(0, 0, 0, 0.1)
        `,
        background: `linear-gradient(135deg, 
          ${theme.colors.surface}90 0%, 
          ${theme.colors.background}A0 100%)`,
      },
      "&::placeholder": {
        color: `${theme.colors.textSecondary}80`,
      },
      "@media (max-width: 768px)": {
        width: "100%",
      },
    }),
    div: css({
      color: theme.colors.primary,
      marginLeft: theme.sizes.small,
    }),
    span: css({
      color: "red",
    }),
  };
};
