import { css } from "@emotion/react";
import { MyTheme } from "../../theme";

export const getPortfolioStylesDark = (theme: MyTheme) => ({
  portfolio: css({
    height: "100%",
    width: "100vw",
    backgroundColor: theme.colors.portfolioBackground,
    scrollBehavior: "smooth",
  }),
  div: css({
    width: "80%",
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "2em",
    backgroundColor: theme.colors.transparent,
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
    color: theme.colors.primary,
  }),
  h1: css({
    color: theme.colors.primary,
    textAlign: "center",
    fontSize: theme.sizes.medium,
    letterSpacing: "5px",
    paddingTop: "1rem",
  }),
  title: css({
    alignSelf: "flex-start",
    width: "560px",
  }),
  p: css({
    color: theme.colors.primary,
    fontSize: theme.sizes.small,
    margin: "1rem",
  }),
  img: css({
    alignSelf: "flex-start",
    width: "360px",
    height: "300px",
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
    borderRadius: theme.sizes.small,
    objectFit: "cover",
  }),
  a: css({
    alignSelf: "flex-end",
    color: theme.colors.primary,
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
    padding: "1rem",
    transition: "all 0.2s ease",
    ":hover": {
      boxShadow: "none",
      transform: "translateY(4px)",
    },
  }),
  skillDiv: css({
    padding: theme.sizes.medium,
    backgroundColor: theme.colors.transparent,
    color: theme.colors.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }),
  skillsContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:
      "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
    padding: theme.sizes.medium,
    backgroundColor: theme.colors.background,
    color: theme.colors.primary,
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "200px",
  }),
  description: css({
    alignSelf: "end",
    width: "360px",
    height: "300px",
    // boxShadow:
    //   "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
  }),
  container: css({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "1rem",
  }),
  footer: css({
    color: theme.colors.primary,
    textAlign: "center",
  }),
});

export const getPortfolioStylesLight = (theme: MyTheme) => ({
  portfolio: css({
    height: "100%",
    width: "100vw",
    backgroundColor: theme.lightTheme.colors.background,
    margin: 0,
    scrollBehavior: "smooth",
  }),
  div: css({
    width: "80%",
    margin: "10px auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    padding: "2em",
    backgroundColor: theme.colors.transparent,
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
    color: theme.lightTheme.colors.primary,
  }),
  h1: css({
    color: theme.lightTheme.colors.primary,
    textAlign: "center",
    fontSize: theme.sizes.medium,
    letterSpacing: "5px",
    paddingTop: "1rem",
  }),
  title: css({
    alignSelf: "flex-start",
  }),
  p: css({
    color: theme.lightTheme.colors.primary,
    fontSize: theme.sizes.small,
    margin: "1rem",
  }),
  img: css({
    alignSelf: "flex-start",
    width: "360px",
    height: "300px",
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
    borderRadius: theme.sizes.small,
    objectFit: "cover",
  }),
  a: css({
    alignSelf: "flex-end",
    color: theme.lightTheme.colors.primary,
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
    padding: "1rem",
    transition: "all 0.2s ease",
    ":hover": {
      boxShadow: "none",
      transform: "translateY(4px)",
    },
  }),
  skillDiv: css({
    padding: theme.sizes.medium,
    backgroundColor: theme.colors.transparent,
    color: theme.lightTheme.colors.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  }),
  skillsContainer: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow:
      "inset -4px 0 8px -4px #d9c9d9, inset 0 -4px 8px -4px #d9c9d9,inset 4px 0 8px -4px #ffffff,inset 0 4px 8px -4px #ffffff",
    padding: theme.sizes.medium,
    backgroundColor: theme.lightTheme.colors.background,
    color: theme.lightTheme.colors.primary,
    width: "80%",
    margin: "auto",
    marginTop: "20px",
    marginBottom: "200px",
  }),
  description: css({
    alignSelf: "end",
    width: "360px",
    height: "300px",
  }),
  container: css({
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    gap: "1rem",
  }),
  footer: css({
    color: theme.lightTheme.colors.primary,
    textAlign: "center",
  }),
});
