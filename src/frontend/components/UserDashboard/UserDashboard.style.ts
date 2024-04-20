import { css } from "@emotion/react";
import { MyTheme } from "../../../theme";

export const getUserdashboardStyles = (
  theme: MyTheme,
  isModalOpen: boolean,
  inSkillsModalOpen: boolean
) => {
  return {
    userDashboard: css({
      height: "100%",
      width: "100vw",
      flexGrow: 1,
      filter: isModalOpen || inSkillsModalOpen ? "blur(15px)" : "none",
      transition: ".3s ease-out",
      "@media(max-width: 768px)": {
        padding: "10px",
      },
    }),
    userProfile: css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "2rem",
      padding: "2rem",
      backgroundColor: theme.colors.background,
      borderRadius: "10px",
      boxShadow:
        "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
      margin: "2em",
      "@media(max-width: 768px)": {
        gridTemplateColumns: "1fr",
        padding: "1rem",
        margin: "1rem",
      },
    }),
    h3: css({
      color: theme.colors.primary,
      marginBottom: "1rem",
    }),
    userInfo: css({
      display: "flex",
      flexDirection: "column",
      boxShadow: `inset -8px 0 8px -10px ${theme.colors.primary}`,
    }),
    userInfoTable: css({
      border: "none",
      borderCollapse: "collapse",
      color: theme.colors.primary,
    }),
    th: css({
      border: "none",
      borderCollapse: "collapse",
      color: theme.colors.primary,
      fontSize: "1rem",
      padding: "1rem",
    }),
    td: css({
      border: "none",
      borderCollapse: "collapse",
    }),
    userImage: css({
      display: "flex",
      flexDirection: "row",
    }),
    img: css({
      width: "170px",
      height: "150px",
      borderRadius: "35%",
      objectFit: "cover",
      "@media(max-width: 768px)": {
        width: "100px",
        height: "100px",
      },
    }),
    li: css({
      listStyle: "none",
      marginTop: "0.5rem",
      color: theme.colors.primary,
    }),
    userSkills: css({
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      fontFamily: theme.fonts.body,
    }),
    h4: css({
      color: theme.colors.primary,
      marginBottom: "1rem",
    }),
    userProjects: css({
      padding: "2rem",
    }),
    userProjectsDiv: css({
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "baseline",
      gap: "1rem",
      fontSize: "1.4rem",
      "@media(max-width: 768px)": {
        fontSize: "1rem",
        flexDirection: "column",
        alignItems: "center",
      },
    }),
    h2: css({
      color: theme.colors.primary,
    }),
    ul: css({
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr 1fr",
      gap: "1rem",
      marginTop: "1rem",
    }),
    userProjectsImg: css({
      width: "100px",
      height: "100px",
      "@media(max-width: 768px)": {
        width: "50px",
        height: "50px",
      },
    }),
    a: css({
      color: theme.colors.primary,
      cursor: "pointer",
    }),
    tableContainer: css({
      backgroundColor: theme.colors.background,
      borderRadius: "10px",
      boxShadow:
        "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
      padding: "3em",
      width: "100%",
      overflowY: "scroll",
      maxHeight: "500px",
      "&::-webkit-scrollbar": {
        width: "10px",
      },
      "&::-webkit-scrollbar-track": {
        background: theme.colors.transparent,
      },
      "&::-webkit-scrollbar-thumb": {
        background: theme.colors.background,
        borderRadius: "10px",
      },
      "@media(max-width: 768px)": {
        padding: "1em",
        maxHeight: "400px",
      },
    }),
    table: css({
      width: "100%",
      borderCollapse: "collapse",
      backgroundColor: "transparent",
      fontSize: "medium",
      color: theme.colors.primary,
      fontFamily: theme.fonts.body,
      height: "100%",
      "@media(max-width: 768px)": {
        fontSize: "small",
      },
    }),

    tableImg: css({
      width: "7em",
      height: "7em",
      borderRadius: "5px",
      objectFit: "cover",
      "@media(max-width: 768px)": {
        width: "50px",
        height: "50px",
      },
    }),
    themeDiv: css({
      width: "2em",
      height: "30px",
      borderRadius: "2px",
      border: `1px solid ${theme.colors.primary}`,
    }),
    h5: css({
      color: theme.colors.primary,
      marginBottom: "1rem",
      marginTop: "1rem",
    }),
    skills: css({
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      gap: "2rem",
    }),
    userBtns: css({
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      gap: "1rem",
      marginTop: "2rem",
      padding: "1rem",
      marginLeft: "auto",
    }),
    thead: css({
      padding: "2em",
      position: "sticky",
      top: "-4em",
      backgroundColor: theme.colors.portfolioBackground,
      color: theme.colors.primary,
      zIndex: 1,
      height: "5em",
      borderBottom: `1px solid ${theme.colors.primary}`,
    }),
    link: css({
      alignSelf: "flex-end",
      color: theme.colors.secondary,
      boxShadow:
        "inset -4px 0 8px -4px #1d1c2c, inset 0 -4px 8px -4px #1d1c2c,inset 4px 0 8px -4px #3d3c4c,inset 0 4px 8px -4px #3d3c4c",
      padding: "0.35rem",
      cursor: "pointer",
      fontSize: ".75rem",
      marginLeft: "1em",
      transition: "all 0.2s ease",
      ":hover": {
        boxShadow: "none",
        transform: "translateY(4px)",
      },
    }),
  };
};
