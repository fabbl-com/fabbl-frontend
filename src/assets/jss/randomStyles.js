const randomStyles = (theme) => ({
  root: {
    overflow: "hidden",
    maxHeight: "100vh",
    backgroundColor: "#CCFBFE"
  },
  searchControl: {
    marginTop: theme.spacing(0),
    // padding: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "space-between"
  },
  finding: {
    height: `calc(100vh - ${theme.spacing(12)}px)`,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    [theme.breakpoints.up("md")]: {
      marginTop: theme.spacing(13)
    }
  },
  person: {
    flex: 0.5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    height: "100%"
  },
  searchingConatiner: {
    marginTop: theme.spacing(-5)
  },
  avatar: {
    width: "100px",
    height: "100px"
  },
  header: {
    marginBottom: theme.spacing(2),
    color: "#131928"
  },
  matching: {
    width: "150px",
    marginTop: theme.spacing(7)
  },
  cardContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: `calc(100vh - ${theme.spacing(11.5)}px)`
  },
  profileCardContainer: {
    width: "100%",
    height: "100%",
    flex: 0.9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  profileCard: {
    position: "absolute"
  },
  action: {
    display: "flex",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center"
    // padding: theme.spacing(2)
  },
  btn: {
    position: "relative",
    backgroundColor: "#fff",
    padding: theme.spacing(1.5),
    minWidth: "auto",
    borderRadius: "50%",
    boxShadow: `0 .3em 0.6em rgba(0, 0, 0, 0.3)`
  },
  btn_repeat: {
    color: "#f5b748",
    borderColor: "red"
  },
  btn_close: {
    color: "#76e2b3"
  },
  btn_like: {
    color: "#ec5e6f"
  },
  like: {
    display: "block",
    "& > path": {
      stroke: "currentColor",
      strokeWidth: 2,
      fill: "transparent",
      transition: `fill 0.5s cubic-bezier(.7,0,.3,1)`
    }
  }
});

export default randomStyles;
