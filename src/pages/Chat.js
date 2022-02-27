import React, { useState, useEffect } from "react";
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
  MenuItem
} from "@material-ui/core";
import moment from "moment";
import {
  AccountCircle,
  Brightness4,
  BrightnessHigh,
  KeyboardArrowUp,
  MoreVert,
  Search
} from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { getChatListUsers, setChatListUserOffline } from "../redux/actions/messageActions";
import { Skeleton } from "@material-ui/lab";
import { decode, genDerivedKey } from "../lib/hashAlgorithm";

import { chatStyles } from "../assets/jss";
import { getChatList } from "../utils/socket.io";
import { ProfileBadge } from "../components";

const useStyles = makeStyles((theme) => chatStyles(theme));

const ScrollTop = ({ children, window }) => {
  const trigger = useScrollTrigger({
    target: window && window(),
    disableHysteresis: true,
    threshold: 100
  });
  const theme = useTheme();

  const handleScrollUp = (e) => {
    const anchor = (e.target.ownerDocument || document).querySelector("#scroll-to-top");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div
        style={{ position: "fixed", bottom: theme.spacing(2), right: theme.spacing(2), zIndex: 3 }}
        onClick={handleScrollUp}
        role="presentation">
        {children}
      </div>
    </Zoom>
  );
};

ScrollTop.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const UserCard = ({ online, displayName, url, time, message, unread, privateKey, publicKey }) => {
  const classes = useStyles();
  const [derivedKey, setDerivedKey] = useState(null);
  const [msg, setMsg] = useState("You have a new match. Go and chat...");

  useEffect(() => {
    const work = async () => {
      if (privateKey && publicKey) {
        const pKey = JSON.parse(publicKey);
        const key = await genDerivedKey(pKey, privateKey);
        console.log(pKey, privateKey, key);
        setDerivedKey(key);
      }
    };
    work();
  }, [publicKey, privateKey]);

  useEffect(() => {
    const work = async () => {
      const msg = await decode(message, derivedKey);
      console.log(msg);
      setMsg(msg);
    };
    if (message && derivedKey) work();
  }, [message, derivedKey]);

  return (
    <Card className={classes.msgCard}>
      <CardHeader
        classes={{
          root: classes.cardHeaderRoot,
          content: classes.cardHeaderContent,
          subheader: classes.cardHeaderSubheader
        }}
        avatar={
          <ProfileBadge
            color="primary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            overlap="circular"
            variant="dot"
            invisible={!online}>
            <Avatar aria-label="user" src={url} className={classes.avatar}>
              {displayName}
            </Avatar>
          </ProfileBadge>
        }
        title={
          <div className={classes.userTitle}>
            <Typography component="h1" variant="h6">
              {displayName}
            </Typography>
            <Typography component="p" variant="caption">
              {moment(time).fromNow()}
            </Typography>
          </div>
        }
        subheader={
          <div>
            <Typography component="p" variant="body2" className={classes.msg}>
              {msg}
            </Typography>
            <Badge className={classes.msgCount} color="primary" badgeContent={unread} />
          </div>
        }
      />
    </Card>
  );
};

UserCard.propTypes = {
  online: PropTypes.bool.isRequired,
  displayName: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  message: PropTypes.string,
  unread: PropTypes.number,
  privateKey: PropTypes.object,
  publicKey: PropTypes.string.isRequired
};

const Chat = ({ userId, socket, eventEmitter, isTheme, setTheme }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isSearchMode, setSearchMode] = useState(false);
  const [users, setUsers] = useState([]);
  const [isFriends, setFriends] = useState(true);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!socket) return <div>Loading...</div>;

  const { chatListUsers, loading } = useSelector((state) => state.messages);
  const { privateKey } = useSelector((state) => state.user);
  const friends = chatListUsers.filter((user) => user.friendStatus === "friends");

  useEffect(() => {
    getChatList(socket, eventEmitter, userId, dispatch);
    eventEmitter.on("chat-list-response", chatListListener);

    return () => {
      socket.off();
      eventEmitter.removeListener("chat-list-response", chatListListener);
    };
  }, [userId, socket, eventEmitter]);

  useEffect(() => {
    socket.on("connection-response", (data) => {
      console.log(data);
      dispatch(setChatListUserOffline(data));
    });
  }, [socket]);

  useEffect(() => {
    if (isFriends) setUsers(friends);
    else setUsers(chatListUsers);
  }, [isFriends, friends.length]);

  const chatListListener = (data) => {
    dispatch(getChatListUsers(data?.messages));
  };

  return (
    <div className={classes.root}>
      <div id="scroll-to-top" />
      <AppBar elevation={1} className={classes.appBar} color="inherit">
        <Toolbar variant="dense">
          <Typography
            onClick={() => setFriends(false)}
            style={{
              marginRight: theme.spacing(2),
              cursor: "pointer",
              borderBottom: !isFriends && "3px solid blue"
            }}
            color="textSecondary"
            component="h1"
            variant="h6"
            align="center">
            All
          </Typography>
          <Typography
            onClick={() => setFriends(true)}
            style={{ cursor: "pointer", borderBottom: isFriends && "3px solid blue" }}
            color="textSecondary"
            component="h1"
            variant="h6"
            align="center">
            Friends
          </Typography>
          <div style={{ flexGrow: 1 }} />
          {isSearchMode ? (
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
          ) : (
            <IconButton
              onClick={() => setSearchMode(true)}
              style={{ color: theme.palette.icons.primary }}
              size="small">
              <Search />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Container className={classes.msgContainer}>
        {!loading ? (
          users.length > 0 ? (
            users
              .sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
              .map((user, i) => (
                <Link
                  to={{
                    pathname: `/chat-details`,
                    state: {
                      userId: user.userId,
                      friendStatus: user.friendStatus,
                      isBlocked: user.isBlocked ? true : false
                    }
                  }}
                  key={i}>
                  <UserCard
                    online={user?.online}
                    displayName={user?.displayName?.value}
                    url={user?.avatar?.value}
                    message={user?.message || ""}
                    time={user?.createdAt}
                    unread={user?.unread}
                    privateKey={privateKey}
                    publicKey={user?.publicKey}
                  />
                </Link>
              ))
          ) : (
            <div>Awww such an empty. Please find some friends first</div>
          )
        ) : (
          [...new Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                margin: "2ch 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly"
              }}>
              <Skeleton variant="circle" width={40} height={40} />
              <Skeleton
                style={{ borderRadius: "1.5ch" }}
                variant="rect"
                height={50}
                width="85%"
                animation="wave"
              />
            </div>
          ))
        )}
        <ScrollTop>
          <Fab color="secondary" size="small" aria-label="scroll back to top">
            <KeyboardArrowUp />
          </Fab>
        </ScrollTop>
      </Container>
    </div>
  );
};

Chat.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired,
  userId: PropTypes.string,
  socket: PropTypes.object,
  eventEmitter: PropTypes.object
};

export default Chat;
