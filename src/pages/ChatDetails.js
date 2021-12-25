import React, { useState } from "react";
import {
  makeStyles,
  Card,
  CardHeader,
  Avatar,
  Typography,
  Badge,
  IconButton,
  useTheme,
  useScrollTrigger,
  Toolbar,
  AppBar,
  Container,
  Zoom,
  Fab,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  ListItemIcon,
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  TextareaAutosize,
  InputAdornment
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import {
  Brightness4,
  BrightnessHigh,
  KeyboardArrowUp,
  ArrowBack,
  MoreVert,
  Search,
  AccountCircle,
  EnhancedEncryption,
  Send,
  KeyboardArrowDown,
  InsertEmoticon,
  Gif
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

import { chatStyles } from "../assets/jss";

const useStyles = makeStyles((theme) => ({
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
  msgWrapper: {
    position: "fixed",
    minHeight: theme.spacing(6),
    width: `calc(100% - ${theme.spacing(6)}px)`,
    bottom: theme.spacing(2),
    borderRadius: theme.spacing(1),
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: theme.palette.background.default,
    zIndex: "2",
    textAlign: "left",
    padding: theme.spacing(1)
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
}));

const ScrollDown = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window && window(),
    disableHysteresis: false,
    threshold: -100
  });
  const theme = useTheme();

  const handleScrollDown = (e) => {
    const anchor = (e.target.ownerDocument || document).querySelector("#scroll-to-bottom");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={true}>
      <div
        style={{ position: "fixed", bottom: theme.spacing(7), right: theme.spacing(2), zIndex: 3 }}
        onClick={handleScrollDown}
        role="presentation">
        {children}
      </div>
    </Zoom>
  );
};

ScrollDown.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const useStyles2 = makeStyles((theme) => ({
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
  }
}));

const Message = ({ children, ...props }) => {
  const classes = useStyles2(props);
  const theme = useTheme();

  return (
    <>
      <div>
        <div {...props}>
          <div
            style={{ width: `${children.length <= 10 && "100px"}` }}
            className={classes.msgBubble}>
            <div>{children}</div>
            <Typography variant="caption" className={classes.timestamp}>
              10:30 AM
            </Typography>
          </div>
        </div>
        {props.align === "right" && (
          <Typography align="right" component="p" variant="caption">
            seen
          </Typography>
        )}
        <div style={{ margin: theme.spacing(1, 0) }} />
      </div>
    </>
  );
};

Message.propTypes = {
  children: PropTypes.string.isRequired,
  align: PropTypes.string
};

const ChatDetails = ({ isTheme, setTheme }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const Actions = (
    <Menu
      classes={{
        paper: classes.menu
      }}
      id="actions-menu"
      keepMounted
      anchorEl={anchorEl}
      onClose={handleMenuClose}
      open={Boolean(anchorEl)}>
      <MenuItem disableRipple className={classes.menuItem}>
        <Typography>Change Theme</Typography>
        <IconButton color="primary" onClick={() => setTheme(!isTheme)}>
          {!isTheme ? <Brightness4 /> : <BrightnessHigh />}
        </IconButton>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleMenuClose}>
        <Typography>My account</Typography>
        <IconButton className={classes.menuIcons} color="primary">
          <AccountCircle />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <Container className={classes.container}>
        <Paper className={classes.paper}>
          <AppBar elevation={1} className={classes.appBar} position="fixed" color="inherit">
            <Toolbar className={classes.toolBar} variant="dense">
              <Link to="/chat">
                <IconButton style={{ color: theme.palette.icons.primary }} size="small">
                  <ArrowBack />
                </IconButton>
              </Link>
              <div className={classes.avatar}>
                <Avatar />
                <div className={classes.username}>
                  <Typography align="left" component="h1" variant="h6">
                    Dora
                  </Typography>
                  <Typography component="h1" variant="caption">
                    Last active 12:34 AM
                  </Typography>
                </div>
              </div>
              <div style={{ flexGrow: 1 }} />
              <IconButton
                aria-controls="actions-menu"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ color: theme.palette.icons.primary }}
                size="small">
                <MoreVert />
              </IconButton>
              {Actions}
            </Toolbar>
          </AppBar>
          <Container align="center" className={classes.msgContainer}>
            <div className={classes.msgAction}>
              <Button variant="text">BLOCK</Button>
              <Divider orientation="vertical" flexItem />
              <Button variant="text">ADD</Button>
            </div>
            <Typography className={classes.timeSince} variant="body2">
              11 December 2021
            </Typography>
            <Typography className={classes.encMsg} variant="body2">
              <EnhancedEncryption className={classes.encIcon} />
              Messages are end-to-end encrypted. No other user can read to them except you and{" "}
              {"  "}
              <Link to="/uuid">
                <span>uuid.</span>
              </Link>
              {"  "}
              Click to
              {"  "}
              <Link to="/e2e">
                <span>learn more</span>
              </Link>
            </Typography>
            <Message align="left">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="left">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="left">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="left">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="left">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="left">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">
              Lorem ipsum dolor sit amet ff ddff consectetur adipisicing elit. Amet, itaque quaerat!
              Et laudantium fesgeg esgeesgesg segg sges segsgseg
            </Message>
            <Message align="right">Lorem</Message>
            <div className={classes.msgWrapper}>
              <div className={classes.sendMessage}>
                <div component="form" className={classes.inputRoot}>
                  <InputBase
                    className={classes.input}
                    maxRows={3}
                    multiline
                    placeholder="Write your message..."
                    variant="outlined"
                  />
                  <IconButton color="secondary" className={classes.iconButton1}>
                    <Gif />
                  </IconButton>
                  <IconButton color="secondary" className={classes.iconButton1}>
                    <InsertEmoticon />
                  </IconButton>
                </div>
                <IconButton color="primary" className={classes.iconButton2}>
                  <Send />
                </IconButton>
              </div>
            </div>
          </Container>
          <div id="scroll-to-bottom" />
        </Paper>
        <ScrollDown>
          <Fab color="secondary" size="small" aria-label="scroll back to bottom">
            <KeyboardArrowDown />
          </Fab>
        </ScrollDown>
      </Container>
    </div>
  );
};

ChatDetails.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default ChatDetails;
