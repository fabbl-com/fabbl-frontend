const settingsStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(6)
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
  }
});

export default settingsStyles;
