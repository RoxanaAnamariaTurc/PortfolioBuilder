import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getRegisterStyle = (theme: MyTheme) => {
  return {
    pageWrapper: css({
      backgroundColor: theme.colors.background,
      minHeight: "100vh",
      width: "100%",
      position: "relative",
    }),
    registerDiv: css({
      boxSizing: "border-box",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      background: `
        ${theme.colors.surface}
      `,
      backdropFilter: "blur(20px)",
      border: `1px solid ${theme.colors.border}`,
      borderRadius: "24px",
      height: "90vh",
      width: "90vw",
      maxWidth: "500px",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
      boxShadow: `
        0 25px 50px -12px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(184, 169, 201, 0.15),
        inset 0 1px 0 rgba(255, 255, 255, 0.05)
      `,
      "@media(max-width: 768px)": {
        width: "95vw",
        height: "auto",
        minHeight: "80vh",
        overflowY: "auto",
        padding: "2rem",
        borderRadius: "16px",
      },
    }),
    h1: css({
      background: theme.colors.gradient,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      textAlign: "center",
      padding: "2rem 2rem 1rem",
      fontSize: "2.5rem",
      fontWeight: "700",
      letterSpacing: "-0.025em",
      "@media(max-width: 768px)": {
        fontSize: "2rem",
        padding: "1.5rem 1rem 1rem",
      },
    }),
    form: css({
      boxSizing: "border-box",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "start",
      height: "80vh",
      marginBottom: "7em",
      "@media(max-width: 768px)": {
        gridTemplateColumns: "1fr",
        height: "auto",
        marginBottom: "2em",
      },
    }),
    inputGroup: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      marginLeft: "5%",
      label: css({
        color: theme.colors.text,
        fontSize: theme.sizes.small,
        alignSelf: "flex-start",
        margin: "1rem",
        fontWeight: "500",
        // "&.required::after": {
        //   content: "' *'",
        //   color: theme.colors.danger,
        // },
        "@media(max-width: 768px)": {
          fontSize: "0.9rem",
        },
        span: css({
          color: theme.colors.danger,
        }),
      }),
      p: css({
        color: theme.colors.primary,
        fontSize: theme.sizes.small,
        margin: "1rem",
      }),
      input: css({
        border: `1px solid ${theme.colors.border}`,
        borderRadius: "12px",
        padding: "0.875rem 1rem",
        width: "90%",
        margin: "0.5rem 1rem",
        background: `
          ${theme.colors.surfaceVariant}
        `,
        backdropFilter: "blur(10px)",
        fontSize: theme.sizes.small,
        color: theme.colors.text,
        fontWeight: "400",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: `
          0 1px 3px 0 rgba(0, 0, 0, 0.1),
          0 1px 2px 0 rgba(0, 0, 0, 0.06)
        `,
        "&:focus": {
          outline: "none",
          borderColor: theme.colors.accent,
          boxShadow: `
            0 0 0 3px rgba(139, 92, 246, 0.1),
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06)
          `,
          transform: "translateY(-1px)",
        },
        "&:hover:not(:focus)": {
          borderColor: theme.colors.primary,
          boxShadow: `
            0 4px 6px -1px rgba(0, 0, 0, 0.1),
            0 2px 4px -1px rgba(0, 0, 0, 0.06)
          `,
        },
        "&::placeholder": {
          color: theme.colors.textSecondary,
          opacity: 0.8,
        },
        "@media(max-width: 768px)": {
          padding: "0.75rem",
          width: "100%",
          margin: "0.5rem 0",
        },
      }),
    }),

    buttonWrapper: css({
      gridColumn: 2,
      justifySelf: "end",
    }),
  };
};
