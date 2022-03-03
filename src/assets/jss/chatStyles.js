const chatStyles = (theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.background.default,
    zIndex: 10,
    [theme.breakpoints.up("md")]: {
      padding: " 0 9%"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.card.default,
    "&:hover": {
      backgroundColor: theme.palette.background.hover
    },
    marginLeft: theme.spacing(3),
    transition: "all 2s"
  },
  searchIcon: {
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: theme.spacing(0, 2),
    pointerEvents: "none"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%"
  },
  msgContainer: {
    marginTop: theme.spacing(12),
    padding: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      padding: " 0 3%"
    },
    "& > div": {
      margin: theme.spacing(0.5)
    }
  },
  msgCard: {
    backgroundColor: theme.palette.card.default,
    borderRadius: theme.spacing(1),
    "& > div": {
      padding: theme.spacing(1)
    },
    margin: theme.spacing(0.5, 0)
  },
  cardHeaderRoot: {
    marginRight: theme.spacing(1)
  },
  cardHeaderContent: {
    overflow: "hidden"
  },
  cardHeaderSubheader: {
    width: "100%",
    "& > div": {
      width: "100%",
      display: "flex",
      position: "relative",
      justifyContent: "space-between"
    }
  },
  userTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  msg: {
    paddingRight: theme.spacing(2),
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  msgCount: {
    "& > span": {
      transform: "scale(0.7)"
    }
  },
  menu: {
    backgroundColor: theme.palette.background.default,
    top: `48px !important`,
    left: "auto !important",
    right: 0,
    minWidth: "200px",
    "& > ul": {
      padding: 0
    }
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    "&:hover": {
      backgroundColor: theme.palette.background.hover
    },
    "&:first-child": {
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  },
  menuIcons: {
    "&:hover": {
      background: "none"
    }
  }
});

export default chatStyles;
