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
  Paper,
  Box
} from "@material-ui/core";
import {
  Block,
  ArrowBack,
  MoreVert,
  PersonAdd,
  Send,
  KeyboardArrowDown,
  InsertEmoticon,
  Gif,
  Stars,
  Done,
  DoneAll
} from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { Link, useLocation, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { chatDetailsStyles } from "../assets/jss";
import { makeMessageSeen, sendMessage } from "../utils/socket.io";
import { connect, useDispatch, useSelector } from "react-redux";
import { setUserMessages, setUserOffline, setBlocked } from "../redux/actions/messageActions";
import { ProfileBadge } from "../components";
import { SET_USER_MESSAGES_REQUEST } from "../redux/constants/messageActionTypes";
import { decode, encode, genDerivedKey } from "../lib/hashAlgorithm";

const useStyles = makeStyles((theme) => chatDetailsStyles(theme));

const SIZE = 15;

const Message = ({ derivedKey, time, isRead, children, ...props }) => {
  const classes = useStyles(props);
  const theme = useTheme();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const work = async () => {
      try {
        const msg = await decode(children, derivedKey);
        setMessage(msg);
      } catch (error) {
        console.log(error);
        setMessage("");
      }
    };
    work();
  }, [props]);

  return (
    <>
      <div>
        <div {...props}>
          <div
            style={{ width: `${message && message.length <= 10 && "100px"}` }}
            className={classes.msgBubble}>
            <div>{message}</div>
            <Typography variant="caption" className={classes.timestamp}>
              {new Date(time).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true
              })}
            </Typography>

            {props.align === "left" && (
              <Box align="left" mb={-5}>
                {isRead ? <DoneAll fontSize="small" /> : <Done fontSize="small" />}
              </Box>
            )}
          </div>
        </div>
        <div style={{ margin: theme.spacing(1, 0) }} />
      </div>
    </>
  );
};

Message.propTypes = {
  children: PropTypes.string.isRequired,
  derivedKey: PropTypes.object,
  align: PropTypes.string,
  time: PropTypes.any,
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
  const history = useHistory();
  const scrollDownRef = useRef();
  const [derivedKey, setDerivedKey] = useState(null);
  const [publicKey, setPublicKey] = useState(null);
  const [elems, setElems] = useState([]);
  const [customProps, setCustomProps] = useState({ isBlocked: false, friendStatus: "" });
  const [hasMore, setHasMore] = useState(true);
  const [showScrollDownButton, setShowScrollDownButton] = useState(false);
  const [page, setPage] = useState(1);
  const timelineRef = useRef();

  // if (!socket) return <div>Loading...</div>;

  const { loading, receiver, messages, messageId } = useSelector((state) => state.messages);
  const { privateKey } = useSelector((state) => state.user);

  useEffect(async () => {
    if (privateKey && publicKey) {
      const key = await genDerivedKey(publicKey, privateKey);
      setDerivedKey(key);
    }
  }, [publicKey, privateKey]);

  useEffect(() => {
    const query = location?.state;
    if (!query) history.push("/chat");
    setSelectedUserId(query.userId);
    setCustomProps((state) => ({
      ...state,
      isBlocked: query.isBlocked,
      friendStatus: query.friendStatus
    }));
    dispatch({ type: SET_USER_MESSAGES_REQUEST });
    socket.on("get-user-messages-response", (data) => {
      const key = data?.receiver?.publicKey;
      if (key) setPublicKey(JSON.parse(key));
      const msgs = data?.messages;
      if (msgs.length === 0) setHasMore(false);
      else {
        const _id = data?.messages?._id;
        dispatch(setUserMessages({ messageId: _id, messages: msgs, receiver: data?.receiver }));
      }
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
                _id: messageId,
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

  useEffect(() => {
    if (selectedUserId)
      socket.emit("get-user-messages", {
        sender: userId,
        receiver: selectedUserId,
        size: SIZE,
        page
      });
  }, [page, selectedUserId]);

  const sendMessageAndUpdate = async (e) => {
    const keyCode = e.which || e.keyCode;
    if (!derivedKey) return;
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
            const hash = await encode(text.trim(), derivedKey);
            console.log(derivedKey, hash, msgs);
            const message = {
              sender: userId,
              receiver: selectedUserId,
              text: hash,
              isRead: false,
              createdAt: new Date()
            };
            sendMessage(socket, message);
            setMsgs((state) => [message, ...state]);
            setText("");
            scrollToBottom();
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  };

  const scrollToBottom = () => timelineRef.current.scrollTo(0, timelineRef.current.scrollHeight);
  const handleMenuClose = () => setAnchorEl(null);

  const handleFriends = (e) => {
    e.preventDefault();
    if (customProps.friendStatus === "sent")
      alert("You have already sent a friend request. Please wait for the response");
    if (customProps.friendStatus === "received")
      alert("Congratulations you have already received a friend request click OK to confirm it");
    handleMenuClose();
    if (userId && selectedUserId)
      socket.emit("add-friends", { sender: userId, receiver: selectedUserId });
  };

  const handleBlock = (e) => {
    e.preventDefault();
    handleMenuClose();
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

  const onScroll = (e) => {
    if (e.target?.scrollTop < -100) setShowScrollDownButton(true);
    else setShowScrollDownButton(false);
  };

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
                <Link to={`/profile/${userId}`}>
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
                height: "100%"
              }}>
              {!loading ? (
                !receiver?.isBlockedBy ? (
                  <div
                    id="scrollableDiv"
                    style={{
                      height: `calc(100vh - 180px)`,
                      overflow: "auto",
                      display: "flex",
                      flexDirection: "column-reverse"
                    }}
                    ref={timelineRef}>
                    <InfiniteScroll
                      ref={scrollDownRef}
                      onScroll={onScroll}
                      dataLength={msgs.length}
                      next={() => setPage(page + 1)}
                      style={{
                        display: "flex",
                        flexDirection: "column-reverse",
                        padding: "0 2ch"
                      }}
                      inverse={true}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      scrollableTarget="scrollableDiv">
                      {msgs.map((msg, i) => (
                        <div ref={elems[i]} key={i}>
                          <Message
                            align={msg.sender === userId ? "left" : "right"}
                            time={msg.createdAt}
                            derivedKey={derivedKey}
                            isRead={msg.isRead}>
                            {msg.text}
                          </Message>
                        </div>
                      ))}
                      <Typography className={classes.timeSince} variant="body2">
                        {`Matched At: ${new Date(receiver?.matchAt).toLocaleString()}`}
                      </Typography>
                    </InfiniteScroll>
                  </div>
                ) : (
                  <div style={{ color: "red" }}>You cannot reply to this conversation</div>
                )
              ) : (
                [...new Array(15)].map((_, i) => (
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
          </Container>
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
          <div id="scroll-to-bottom" />
        </Paper>
        <Zoom in={showScrollDownButton}>
          <div
            style={{
              position: "fixed",
              bottom: theme.spacing(7),
              right: theme.spacing(2),
              zIndex: 3
            }}
            onClick={scrollToBottom}
            role="presentation">
            <Fab color="secondary" size="small" aria-label="scroll back to bottom">
              <KeyboardArrowDown />
            </Fab>
          </div>
        </Zoom>
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
