const settingsStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(6),
    width: "70%",
    [theme.breakpoints.down("md")]: {
      paddingBottom: theme.spacing(8),
      width: "100%"
    }
  },
  profileHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0),
    height: 0,
    borderTop: "1px solid"
  },
  profilePic: {
    display: "flex"
  },
  username: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginLeft: theme.spacing(1),
    "& h1": {
      lineHeight: theme.spacing(0.15)
    }
  },
  theme: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "& > div": {
      display: "flex",
      marginLeft: theme.spacing(1)
    }
  },
  actions: {
    "& > div": {
      display: "flex",
      alignItems: "center",
      margin: theme.spacing(1, 0, 1, 1)
    }
  },
  visibility: {
    display: "flex"
  },
  disabled: {
    "&.Mui-disabled": {
      color: theme.palette.primary.main
    }
    // "&.Mui-disabled:hover": { background: theme.palette.secondary.main }
  }
});

export default settingsStyles;
