const chatStyles = (theme) => ({
  root: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(1),
    position: "relative",
    overflow: "hidden"
  },
  container: {
    overflow: "hidden"
  },
  paper: {
    height: `calc(100vh - ${theme.spacing(10)}px)`,
    backgroundColor: theme.palette.background.default,
    borderRadius: theme.spacing(1),
    margin: theme.spacing(1, 0),
    overflowX: "scroll",
    scrollbarWidth: "none"
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
    borderTopLeftRadius: theme.spacing(1),
    borderTopRightRadius: theme.spacing(1),
    width: `calc(100% - ${theme.spacing(4)}px)`,
    left: "50%",
    transform: "translateX(-50%)",
    top: theme.spacing(8)
  },
  toolBar: {
    padding: theme.spacing(0, 1)
  },
  avatar: {
    display: "flex"
  },
  username: {
    marginLeft: theme.spacing(1)
  },
  menu: {
    backgroundColor: theme.palette.background.default,
    top: `56px !important`,
    left: "auto !important",
    right: theme.spacing(2),
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
  },
  msgContainer: {
    position: "relative",
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(5)
  },
  msgAction: {
    display: "flex",
    justifyContent: "space-evenly",
    "& hr": {
      backgroundColor: theme.palette.text.secondary
    }
  },
  timeSince: {
    backgroundColor: theme.palette.background.hover,
    display: "inline-block",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.2, 0.5),
    margin: theme.spacing(1, 0)
  },
  encIcon: {
    fontSize: 12
  },
  encMsg: {
    backgroundColor: theme.palette.background.warning,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(0.5, 0.3),
    marginBottom: theme.spacing(2),
    "& span": {
      textDecoration: "underline"
    }
  },
  msgBubble: {
    display: "inline-block",
    maxWidth: "80%",
    position: "relative",
    height: "auto",
    backgroundColor: (props) => (props.align === "left" ? theme.msg.bg.left : theme.msg.bg.right),
    color: (props) => (props.align === "left" ? theme.msg.text.left : theme.msg.text.right),
    padding: theme.spacing(1),
    borderRadius: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    textAlign: "left",
    "&:after": {
      content: `""`,
      position: "absolute",
      width: 0,
      height: 0,
      left: (props) => (props.align === "left" ? -8 : "auto"),
      top: 0,
      right: (props) => (props.align === "right" ? -8 : "auto"),
      border: "8px solid",
      borderColor: (props) =>
        `${
          props.align === "left" ? theme.msg.bg.left : theme.msg.bg.right
        } transparent transparent transparent`
    }
  },
  timestamp: {
    position: "absolute",
    bottom: 0,
    right: theme.spacing(0.5)
  },
  msgWrapper: {
    position: "fixed",
    width: `calc(100% - ${theme.spacing(6)}px)`,
    bottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.palette.background.default,
    zIndex: "2",
    textAlign: "left",
    padding: theme.spacing(0.2, 1, 1, 1)
  },
  sendMessage: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "end"
  },
  inputRoot: {
    padding: theme.spacing(0, 0.6),
    display: "flex",
    alignItems: "end",
    width: `calc(100% - ${theme.spacing(6)}px)`,
    borderRadius: theme.spacing(3),
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.background.hover}`
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    fontSize: "12px"
  },
  iconButton1: {
    padding: 5
  },
  iconButton2: {
    padding: 7
  }
});

export default chatStyles;