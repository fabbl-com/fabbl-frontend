import React, { useEffect, useState } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  useTheme,
  Toolbar,
  AppBar,
  Container,
  Zoom,
  Fab,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Button,
  Divider
} from "@material-ui/core";
import {
  Brightness4,
  BrightnessHigh,
  ArrowBack,
  MoreVert,
  AccountCircle,
  EnhancedEncryption,
  Send,
  KeyboardArrowDown,
  InsertEmoticon,
  Gif
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import io from "socket.io-client";
const ENDPOINT = "localhost:4000";

import { chatDetailsStyles } from "../assets/jss";

const useStyles = makeStyles((theme) => chatDetailsStyles(theme));

let socket;
const ScrollDown = ({ children }) => {
  const theme = useTheme();

  socket = io(ENDPOINT);

  useEffect(() => {
    socket.on("connection", () => {
      console.log("connection");
    });
  }, []);

  useEffect(() => {
    socket.on("disconnection", () => {
      console.log("connection");
    });
  }, []);

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
  children: PropTypes.element.isRequired
};

const Message = ({ children, ...props }) => {
  const classes = useStyles(props);
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
