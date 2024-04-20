import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

const sharedStyles = {
  portfolio: () =>
    css({
      height: "100%",
      width: "100vw",
      margin: 0,
      scrollBehavior: "smooth",
      "@media(max-width: 768px)": {
        padding: "5px",
      },
      "@media(max-width: 480px)": {
        padding: "2px",
      },
    }),
  div: (theme: MyTheme) =>
    css({
      width: "80%",
      margin: "10px auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-end",
      padding: "2em",
      backgroundColor: theme.colors.transparent,
      "@media(max-width: 768px)": {
        flexDirection: "column",
        padding: "1em",
      },
      "@media(max-width: 480px)": {
        padding: "0.5em",
      },
    }),
  h1: (theme: MyTheme) =>
    css({
      textAlign: "center",
      fontSize: theme.sizes.medium,
      letterSpacing: "5px",
      paddingTop: "1rem",
    }),
  title: () =>
    css({
      alignSelf: "flex-start",
      width: "560px",
    }),
  p: (theme: MyTheme) =>
    css({
      fontSize: theme.sizes.small,
      margin: "1rem",
    }),
  img: (theme: MyTheme) =>
    css({
      alignSelf: "flex-start",
      width: "360px",
      height: "300px",
      borderRadius: theme.sizes.small,
      objectFit: "cover",
    }),
  a: () =>
    css({
      alignSelf: "flex-end",
      padding: "1rem",
      transition: "all 0.2s ease",
      ":hover": {
        boxShadow: "none",
        transform: "translateY(4px)",
      },
    }),
  skillDiv: (theme: MyTheme) =>
    css({
      padding: theme.sizes.medium,
      backgroundColor: theme.colors.transparent,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    }),
  skillsContainer: (theme: MyTheme) =>
    css({
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: theme.sizes.medium,
      width: "80%",
      margin: "auto",
      marginTop: "20px",
      marginBottom: "200px",
    }),
  description: () =>
    css({
      alignSelf: "end",
      width: "360px",
      height: "300px",
    }),
  container: () =>
    css({
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      gap: "1rem",
    }),
  footer: (theme: MyTheme) =>
    css({
      color: theme.colors.primary,
      textAlign: "center",
    }),
};

export const getPortfolioStylesDark = (theme: MyTheme) => ({
  portfolio: sharedStyles.portfolio(),
  backgroundColor: theme.colors.portfolioBackground,
  div: css(sharedStyles.div(theme), {
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
  }),
  h1: css(sharedStyles.h1(theme), {
    color: theme.colors.primary,
  }),
  title: css(sharedStyles.title(), {
    color: theme.colors.primary,
  }),

  p: css(sharedStyles.p(theme), {
    color: theme.colors.primary,
  }),
  img: css(sharedStyles.img(theme), {
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
  }),
  a: css(sharedStyles.a(), {
    color: theme.colors.primary,
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
  }),
  skillDiv: css(sharedStyles.skillDiv(theme), {
    color: theme.colors.primary,
  }),
  skillsContainer: css(sharedStyles.skillsContainer(theme), {
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
    color: theme.colors.primary,
  }),

  description: sharedStyles.description(),
  container: sharedStyles.container(),
  footer: sharedStyles.footer(theme),
});

export const getPortfolioStylesLight = (theme: MyTheme) => ({
  portfolio: css(sharedStyles.portfolio(), {
    backgroundColor: theme.lightTheme.colors.background,
  }),
  div: css(sharedStyles.div(theme), {
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
  }),
  h1: css(sharedStyles.h1(theme), {
    color: theme.lightTheme.colors.primary,
  }),
  title: css(sharedStyles.title(), {
    color: theme.lightTheme.colors.primary,
  }),

  p: css(sharedStyles.p(theme), {
    color: theme.lightTheme.colors.primary,
  }),
  img: css(sharedStyles.img(theme), {
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
  }),
  a: css(sharedStyles.a(), {
    color: theme.lightTheme.colors.primary,
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
  }),
  skillDiv: css(sharedStyles.skillDiv(theme), {
    color: theme.lightTheme.colors.primary,
  }),
  skillsContainer: css(sharedStyles.skillsContainer(theme), {
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
    color: theme.lightTheme.colors.primary,
  }),

  description: sharedStyles.description(),
  container: sharedStyles.container(),
  footer: css(sharedStyles.footer(theme), {
    color: theme.lightTheme.colors.primary,
  }),
});
