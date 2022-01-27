import React, { useEffect, useRef, useState } from "react";
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
import queryString from "query-string";

import { chatDetailsStyles } from "../assets/jss";
import { receiveMessage, sendMessage } from "../utils/socket.io";
import { connect, useDispatch, useSelector } from "react-redux";
import { getMessages } from "../redux/actions/messageActions";

const useStyles = makeStyles((theme) => chatDetailsStyles(theme));

const ScrollDown = ({ children }) => {
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
  children: PropTypes.element.isRequired
};

const Message = ({ time, isRead, children, ...props }) => {
  const classes = useStyles(props);
  const theme = useTheme();

  return (
    <>
      <div>
        <div {...props}>
          <div
            style={{ width: `${children && children.length <= 10 && "100px"}` }}
            className={classes.msgBubble}>
            <div>{children}</div>
            <Typography variant="caption" className={classes.timestamp}>
              {new Date(time).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
            </Typography>
          </div>
        </div>
        {props.align === "left" && (
          <Typography align="left" component="p" variant="caption">
            {isRead ? "seen" : "not seen"}
          </Typography>
        )}
        <div style={{ margin: theme.spacing(1, 0) }} />
      </div>
    </>
  );
};

Message.propTypes = {
  children: PropTypes.string.isRequired,
  align: PropTypes.string,
  time: PropTypes.string,
  isRead: PropTypes.bool
};

const ChatDetails = ({ userId, socket, eventEmitter, isTheme, setTheme }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const messagesEndRef = useRef();

  if (!socket) return <div>Loading...</div>;

  const { messages, loading } = useSelector((state) => state.messages);

  useEffect(() => {
    const query = queryString.parse(location?.search);
    console.log(userId, "us");
    setSelectedUserId(query.userId);
    dispatch(getMessages(userId, query.userId));
  }, []);

  useEffect(() => {
    if (messages && messages.length > 0) setMsgs((state) => [...state, ...messages]);
  }, [messages]);

  useEffect(() => {
    scrollToBottom();
  }, [msgs]);

  useEffect(() => {
    receiveMessage(socket, eventEmitter);
    eventEmitter.on("send-message-response", (message) => {
      setMsgs((state) => [...state, message]);
      // scroll down
      scrollToBottom();
    });

    return () => eventEmitter.removeListener("send-message-response");
  }, [socket, eventEmitter]);

  const sendMessageAndUpdate = (e) => {
    e.preventDefault();
    if (!text) alert("message is empty");
    else if (!userId) alert("login");
    else if (!selectedUserId) alert("select a user");
    else {
      try {
        const message = {
          sender: userId,
          receiver: selectedUserId,
          text: text.trim(),
          createdAt: new Date()
        };
        sendMessage(socket, message);
        setMsgs((state) => [...state, message]);
        setText("");
        // scroll down
        scrollToBottom();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef) {
      messagesEndRef.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  };

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
            <div
              style={{
                maxWidth: "100%",
                height: "100vh",
                overflowY: "scroll",
                marginBottom: "0"
              }}
              ref={messagesEndRef}>
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
              {!loading ? (
                msgs
                  .sort((a, b) => a.createdAt - b.createdAt)
                  .map((msg, index) => (
                    <div key={index}>
                      <Message
                        align={msg.sender === userId ? "left" : "right"}
                        time={msg.createdAt}
                        isRead={msg.isRead}>
                        {msg.text}
                      </Message>
                    </div>
                  ))
              ) : (
                <div>Loading...</div>
              )}
            </div>
            <div className={classes.msgWrapper}>
              <form onSubmit={sendMessageAndUpdate} className={classes.sendMessage}>
                <div component="form" className={classes.inputRoot}>
                  <InputBase
                    className={classes.input}
                    maxRows={3}
                    multiline
                    onChange={(e) => setText(e.target.value)}
                    value={text}
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
                <IconButton type="submit" color="primary" className={classes.iconButton2}>
                  <Send />
                </IconButton>
              </form>
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

const mapStateToProps = (state) => ({
  isAuth: state.user.isAuth
});

ChatDetails.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired,
  userId: PropTypes.string,
  socket: PropTypes.object,
  eventEmitter: PropTypes.object
};

export default connect(mapStateToProps)(ChatDetails);
