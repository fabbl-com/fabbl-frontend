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
import { withStyles } from "@material-ui/styles";
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
import { getChatListUsers } from "../redux/actions/messageActions";
import { Alert } from "@material-ui/lab";

import { chatStyles } from "../assets/jss";
import { getChatList } from "../utils/socket.io";

const useStyles = makeStyles((theme) => chatStyles(theme));

const ProfileBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""'
    }
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1
    },
    "100%": {
      transform: "scale(2)",
      opacity: 0
    }
  }
}))(Badge);

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

const Chat = ({ userId, socket, eventEmitter, isTheme, setTheme }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [isSearchMode, setSearchMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  if (!socket) return <div>Loading...</div>;

  const { chatListUsers, loading } = useSelector((state) => state.messages);

  useEffect(() => {
    getChatList(socket, eventEmitter, userId);
    eventEmitter.on("chat-list-response", (data) => {
      dispatch(getChatListUsers(data?.messages));
    });

    return () => {
      socket.off();
    };
  }, [userId, socket, eventEmitter]);

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
      <div id="scroll-to-top" />
      <AppBar elevation={1} className={classes.appBar} color="inherit">
        <Toolbar variant="dense">
          <Typography
            style={{ marginRight: theme.spacing(2) }}
            color="textSecondary"
            component="h1"
            variant="h6"
            align="center">
            <Link to="/ikabir/friends">Friends</Link>
          </Typography>
          <Typography color="textSecondary" component="h1" variant="h6" align="center">
            <Link to="/all">All</Link>
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
      <Container className={classes.msgContainer}>
        {!loading ? (
          chatListUsers
            .sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
            .map((user, i) => (
              <Link to={`/chat-details?userId=${user?.profile?._id}`} key={i}>
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
                        invisible={!user.profile.online}>
                        <Avatar
                          aria-label="user"
                          src={user.profile.avatar.value}
                          className={classes.avatar}>
                          {"user.profile.avatar"}
                        </Avatar>
                      </ProfileBadge>
                    }
                    title={
                      <div className={classes.userTitle}>
                        <Typography component="h1" variant="h6">
                          {user.profile.displayName.value}
                        </Typography>
                        <Typography component="p" variant="caption">
                          {moment(user.createdAt).fromNow()}
                        </Typography>
                      </div>
                    }
                    subheader={
                      <div>
                        <Typography component="p" variant="body2" className={classes.msg}>
                          {user.message}
                        </Typography>
                        <Badge
                          className={classes.msgCount}
                          color="primary"
                          badgeContent={user.unread}
                        />
                      </div>
                    }
                  />
                </Card>
              </Link>
            ))
        ) : (
          <Alert severity="error">Oops! Invalid credential. Please Try again</Alert>
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
