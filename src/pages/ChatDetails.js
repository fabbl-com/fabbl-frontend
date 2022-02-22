import React, { createRef, useEffect, useRef, useState } from "react";
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
  Paper
} from "@material-ui/core";
import {
  Brightness4,
  BrightnessHigh,
  Block,
  ArrowBack,
  MoreVert,
  AccountCircle,
  PersonAdd,
  Send,
  KeyboardArrowDown,
  InsertEmoticon,
  Gif,
  Stars
} from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { Link, useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";

import { chatDetailsStyles } from "../assets/jss";
import { makeMessageSeen, sendMessage } from "../utils/socket.io";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setUserMessages,
  setUserOffline,
  setFriends,
  setBlocked
} from "../redux/actions/messageActions";
import { ProfileBadge } from "../components";
import { SET_USER_MESSAGES_REQUEST } from "../redux/constants/messageActionTypes";

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
  const [lastRreceived, setLastRreceived] = useState(-1);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [msgs, setMsgs] = useState([]);
  const [text, setText] = useState("");
  const theme = useTheme();
  const dispatch = useDispatch();
  const location = useLocation();
  const messagesEndRef = useRef();
  const [elems, setElems] = useState([]);
  const [customProps, setCustomProps] = useState({ isBlocked: false, friendStatus: "" });

  if (!socket) return <div>Loading...</div>;

  const { loading, receiver } = useSelector((state) => state.messages);
  const { messages, _id } = useSelector((state) => state.messages.messages);

  useEffect(() => {
    const query = location?.state;
    setSelectedUserId(query.userId);
    setCustomProps((state) => ({
      ...state,
      isBlocked: query.isBlocked,
      friendStatus: query.friendStatus
    }));
    socket.emit("get-user-messages", { sender: userId, receiver: query.userId });
    dispatch({ type: SET_USER_MESSAGES_REQUEST });
    socket.on("get-user-messages-response", (data) => {
      dispatch(setUserMessages(data));
    });

    socket.on("send-message-response", (message) => setMsgs((state) => [...state, message]));
    socket.on("connection-response", (data) => dispatch(setUserOffline(data)));
    socket.on("block-response", (data) => {
      setCustomProps((state) => ({ ...state, isBlocked: data.isBlocked }));
      dispatch(setBlocked(data));
    });
    socket.on("add-friends-response", (data) =>
      setCustomProps((state) => ({ ...state, friendStatus: data.status || "" }))
    );

    return () => socket.off();
  }, [socket]);

  useEffect(() => {
    if (messages && messages.length > 0) setMsgs((state) => [...state, ...messages]);
  }, [messages]);

  useEffect(() => {
    if (msgs && msgs.length > 0) {
      for (let i = msgs.length - 1; i >= 0; i--) {
        if (msgs[i].sender !== userId) {
          setLastRreceived(i);
          break;
        }
      }
      scrollToBottom();
      setElems((state) =>
        Array(msgs.length)
          .fill()
          .map((_, i) => state[i] || createRef())
      );
    }
  }, [msgs]);

  useEffect(() => {
    socket.on("read-response", (data) => {
      let index = -1;
      const temp = msgs;
      for (let i = temp.length - 1; i >= 0; i--) {
        if (temp[i].sender === data.sender) {
          index = i;
          temp[i].isRead = true;
          break;
        }
      }
      if (index !== -1 && temp && temp.length > 0) {
        setMsgs(temp);
        console.log(msgs);
      }
    });
  }, [socket, msgs]);

  useEffect(() => {
    if (lastRreceived >= 0) {
      const container = elems[lastRreceived];
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!msgs[lastRreceived].isRead && entry.isIntersecting) {
            makeMessageSeen(
              socket,
              {
                _id,
                createdAt: msgs[lastRreceived].createdAt,
                sender: msgs[lastRreceived].sender
              },
              eventEmitter
            );
          }
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1
        }
      );
      container.current && observer.observe(container.current);
      return () => container.current && observer.unobserve(container.current);
    }
  }, [msgs, lastRreceived]);

  const sendMessageAndUpdate = (e) => {
    const keyCode = e.which || e.keyCode;
    if (e.type === "submit" || (e.type === "keypress" && keyCode === 13 && !e.shiftKey)) {
      e.preventDefault();
      if (customProps.isBlocked)
        alert(`You have blocked ${receiver?.displayName?.value}. Unblock to send messages`);
      else {
        if (!text) alert("message is empty");
        else if (!userId) alert("login");
        else if (!selectedUserId) alert("select a user");
        else {
          try {
            const message = {
              sender: userId,
              receiver: selectedUserId,
              text: text.trim(),
              isRead: false,
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

  const handleFriends = (e) => {
    e.preventDefault();
    if (customProps.friendStatus === "sent")
      alert("You have already sent a friend request. Please wait for the response");
    if (customProps.friendStatus === "received")
      alert("Congratulations you have already received a friend request click OK to confirm it");
    handleMenuClose();
    console.log("click ");
    if (userId && selectedUserId)
      socket.emit("add-friends", { sender: userId, receiver: selectedUserId });
  };

  const handleBlock = (e) => {
    e.preventDefault();
    handleMenuClose();
    console.log("click ");
    if (userId && selectedUserId) {
      if (!customProps.isBlocked)
        socket.emit("block", { sender: userId, receiver: selectedUserId });
      else socket.emit("unblock", { sender: userId, receiver: selectedUserId });
    }
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
      <MenuItem className={classes.menuItem} onClick={handleFriends}>
        <Typography>Add to Friends</Typography>
        <IconButton className={classes.menuIcons} color="primary">
          <PersonAdd />
        </IconButton>
      </MenuItem>
      <MenuItem className={classes.menuItem} onClick={handleBlock}>
        <Typography>{!customProps.isBlocked ? "Block" : "Unblock"}</Typography>
        <IconButton className={classes.menuIcons} color="primary">
          <Block />
        </IconButton>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <Container className={classes.elems}>
        <Paper className={classes.paper}>
          <AppBar elevation={1} className={classes.appBar} position="fixed" color="inherit">
            <Toolbar className={classes.toolBar} variant="dense">
              <Link to="/chat">
                <IconButton style={{ color: theme.palette.icons.primary }} size="small">
                  <ArrowBack />
                </IconButton>
              </Link>
              <div className={classes.avatar}>
                <Link to="/profile">
                  <ProfileBadge
                    color="primary"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right"
                    }}
                    overlap="circular"
                    variant="dot"
                    invisible={!receiver?.online}>
                    {loading ? (
                      <Skeleton animation="wave" variant="circle" width={40} height={40} />
                    ) : (
                      <Avatar
                        aria-label="user"
                        src={receiver?.avatar?.value}
                        className={classes.avatar}>
                        {receiver?.displayName?.value}
                      </Avatar>
                    )}
                  </ProfileBadge>
                </Link>
                <div className={classes.username}>
                  <Typography align="left" component="h1" variant="h6">
                    {loading ? (
                      <Skeleton varint="rect" animation="wave" width={180} />
                    ) : (
                      receiver?.displayName?.value
                    )}
                    {!loading &&
                      (customProps.friendStatus === "friends" ? (
                        <Stars fontSize="small" />
                      ) : receiver?.isBlocked ? (
                        <Block fontSize="small" />
                      ) : (
                        ""
                      ))}
                  </Typography>
                  <Typography component="h1" variant="caption">
                    {loading ? (
                      <Skeleton varint="rect" animation="wave" width={150} />
                    ) : receiver?.online ? (
                      "Active Now"
                    ) : (
                      `Last active: ${new Date(receiver?.lastLogin).toLocaleTimeString()}`
                    )}
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
              <Typography className={classes.timeSince} variant="body2">
                {loading ? (
                  <Skeleton animation="wave" width={200} />
                ) : (
                  `Matched At: ${new Date(receiver?.matchAt).toLocaleString()}`
                )}
              </Typography>
              {!loading ? (
                !receiver?.isBlockedBy ? (
                  msgs
                    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
                    .map((msg, i) => (
                      <div ref={elems[i]} key={i}>
                        <Message
                          align={msg.sender === userId ? "left" : "right"}
                          time={msg.createdAt}
                          isRead={msg.isRead}>
                          {msg.text}
                        </Message>
                      </div>
                    ))
                ) : (
                  <div style={{ color: "red" }}>You cannot reply to this conversation</div>
                )
              ) : (
                [...new Array(9)].map((_, i) => (
                  <div key={i} style={{ display: "flex", width: "100%", flexDirection: "column" }}>
                    <Skeleton
                      height={60}
                      style={{ alignSelf: i % 2 == 0 ? "start" : "end", borderRadius: "1ch" }}
                      width="50%"
                      animation="wave"
                    />
                  </div>
                ))
              )}
              {!loading && customProps.isBlocked && (
                <div style={{ margin: "2ch 0", color: "red" }}>
                  You have blocked {receiver?.displayName?.value}. Unblock to send messages
                </div>
              )}
            </div>
            <div className={classes.msgWrapper}>
              <form
                onSubmit={sendMessageAndUpdate}
                onKeyPress={sendMessageAndUpdate}
                className={classes.sendMessage}>
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
