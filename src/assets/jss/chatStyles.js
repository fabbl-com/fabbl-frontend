const chatStyles = (theme) => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.background.default
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.4)"
    },
    marginLeft: theme.spacing(3)
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
    "& > div": {
      margin: theme.spacing(0.5)
    }
  },
  msgCard: {
    backgroundColor: theme.palette.card.default,
    borderRadius: theme.spacing(1),
    "& > div": {
      padding: theme.spacing(1)
    }
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
    top: "48px !important",
    left: "auto !important",
    right: 0,
    width: "150px",
    "& > ul": {
      padding: 0
    }
  },
  menuItem: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: `1px solid ${theme.palette.icons.primary}`,
    "&:hover": {
      backgroundColor: theme.palette.background.hover
    },
    "&:first-child": {
      border: "none",
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  }
});

export default chatStyles;
