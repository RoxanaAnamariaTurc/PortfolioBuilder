import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getModalStyles = (theme: MyTheme) => {
  return {
    div: css({
      position: "fixed",
      top: "5em",
      left: "50%",
      transform: "translateX(-50%)",
      background: `linear-gradient(135deg, 
        ${theme.colors.surface}E6 0%, 
        ${theme.colors.background}F2 100%)`,
      height: "80vh",
      width: "70vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20px",
      backdropFilter: "blur(16px) saturate(180%)",
      WebkitBackdropFilter: "blur(16px) saturate(180%)",
      border: `1px solid ${theme.colors.accent}20`,
      boxShadow: `
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(184, 169, 201, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.05)
      `,
      zIndex: 1000,
      padding: "2em",
      "@media(max-width: 1024px)": {
        width: "80vw",
        height: "auto",
        overflowY: "auto",
        padding: "1em",
      },
      "@media(max-width: 768px)": {
        top: "3em",
        width: "90vw",
      },
    }),
    inputGroup: css({
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "3rem",
      width: "100%",
      "@media(max-width: 768px)": {
        flexDirection: "column",
        gap: "1rem",
      },
    }),
    label: css({
      textAlign: "left",
      color: theme.colors.primary,
      "&.required::after": {
        content: "' *'",
        color: theme.colors.danger,
      },
    }),
    input: css({
      padding: "12px 16px",
      background: `linear-gradient(135deg, 
        ${theme.colors.surface}80 0%, 
        ${theme.colors.background}90 100%)`,
      color: theme.colors.text,
      border: `1px solid ${theme.colors.border}40`,
      borderRadius: "12px",
      width: "35em",
      fontSize: "14px",
      backdropFilter: "blur(8px)",
      WebkitBackdropFilter: "blur(8px)",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
      "@media(max-width: 768px)": {
        width: "auto",
      },
    }),

    closeButton: css({
      position: "absolute",
      top: "20px",
      right: "20px",
      fontSize: "1.5em",
      color: theme.colors.textSecondary,
      padding: "8px",
      cursor: "pointer",
      borderRadius: "8px",
      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "36px",
      height: "36px",
      "&:hover": {
        color: theme.colors.text,
        background: `${theme.colors.accent}20`,
        transform: "scale(1.1)",
      },
      "&:active": {
        transform: "scale(0.95)",
      },
    }),
    form: css({
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: "0.5rem",
    }),
    modal: css({
      display: "flex",
    }),
    buttonContainer: css({
      display: "flex",
      justifyContent: "flex-end",
      gap: "1em",
      width: "39em",
      "@media(max-width: 768px)": {
        width: "auto",
      },
    }),

    customFile: css({
      padding: "10px",
      backgroundColor: theme.colors.transparent,
      border: `1px solid ${theme.colors.primary}`,
      cursor: "pointer",
    }),
    skills: css({
      width: "25em",
      padding: theme.sizes.xsmall,
      margin: theme.sizes.small,
    }),

    h2: css({
      color: theme.colors.primary,
      textAlign: "center",
      marginBottom: "1em",
      fontSize: theme.sizes.medium,
      "@media(max-width: 768px)": {
        fontSize: theme.sizes.small,
      },
    }),
    error: css({
      color: theme.colors.danger,
      fontSize: theme.sizes.small,
    }),
    p: css({
      color: theme.colors.primary,
      fontSize: theme.sizes.medium,
      marginTop: "3em",
      "@media(max-width: 768px)": {
        fontSize: theme.sizes.small,
      },
    }),
  };
};
