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

import { chatDetailsStyles } from "../assets/jss";

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

const ChatDetails = ({ socket, isTheme, setTheme }) => {
  if (!socket) return <div>Not Connected</div>;

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [msgs, setMsgs] = useState({});
  const [msg, setMsg] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const msgListener = (msg) => {
      setMsgs((state) => {
        const newMsgs = { ...state };
        newMsgs[msg.id] = msg;
        return newMsgs;
      });
    };

    const delMsgListener = (msgID) => {
      setMsgs((state) => {
        const newMsgs = { ...state };
        delete newMsgs[msgID];
        return newMsgs;
      });
    };

    socket.on("msg", msgListener);
    socket.on("delMsg", delMsgListener);
    socket.emit("getMsgs");

    return () => {
      socket.off("msg", msgListener);
      socket.off("delMsg", delMsgListener);
    };
  }, [socket]);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const sendMsg = (e) => {
    e.preventDefault();
    if (msg) socket.emit("msg", msg);
    setMsg("");
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
            {[...Object.values(msgs)]
              .sort((a, b) => a.time - b.time)
              .map((msg) => (
                <div key={msg.id} title={`Sent at ${new Date(msg.time).toLocaleTimeString()}`}>
                  <Message align="left">{`${msg.user.name} ${msg.value} ${new Date(
                    msg.time
                  ).toLocaleTimeString()}`}</Message>
                </div>
              ))}
            <Message align="right">Lorem</Message>
            <div className={classes.msgWrapper}>
              <form onSubmit={sendMsg} className={classes.sendMessage}>
                <div component="form" className={classes.inputRoot}>
                  <InputBase
                    className={classes.input}
                    maxRows={3}
                    multiline
                    onChange={(e) => setMsg(e.target.value)}
                    value={msg}
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

ChatDetails.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired,
  socket: PropTypes.object
};

export default ChatDetails;
