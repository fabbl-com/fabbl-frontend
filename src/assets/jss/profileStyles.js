const chatStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(6)
  },
  profileHeader: {
    marginTop: theme.spacing(4),
    width: "98%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  profileBody: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    marginTop: theme.spacing(2)
  },
  verify: {
    display: "flex",
    alignItems: "center",
    "& svg": {
      color: theme.palette.success.main
    }
  },
  report: {
    color: theme.palette.error.dark
  },
  avatar: {
    height: theme.spacing(16),
    width: theme.spacing(16)
  },
  location: {
    display: "flex",
    alignItems: "center"
  },
  bio: {
    marginTop: theme.spacing(2)
  },
  dob: {
    display: "flex",
    alignItems: "center"
  },
  divider: {
    margin: theme.spacing(2, 0),
    height: 0,
    borderTop: "1px solid"
  },
  tags: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0.2, 1),
    textTransform: "capitalize",
    minWidth: "auto",
    margin: theme.spacing(2, 1),
    pointerEvents: "none"
  },
  favorite: {
    borderRadius: theme.spacing(1),
    marginTop: theme.spacing(2)
  }
});

export default chatStyles;
