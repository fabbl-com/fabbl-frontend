import React, { useState, useRef, useEffect, Fragment } from "react";
import {
  Avatar,
  Badge,
  Box,
  Button,
  ButtonBase,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  makeStyles,
  Grow,
  Card,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  List
} from "@material-ui/core";
import { Close, Done, NotificationsActive, NotificationsNone } from "@material-ui/icons";
import {
  BLOCKED,
  CONFIRMED_FRIEND_REQUEST,
  GOT_FRIEND_REQUEST,
  LIKED,
  MATCHED,
  UNBLOCKED,
  DECLINED_FRIEND_REQUEST
} from "../constants";
import { PropTypes } from "prop-types";
import moment from "moment";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
const useStyles = makeStyles((theme) => ({
  box: {
    marginLeft: "2ch",
    marginRight: "2ch",
    [theme.breakpoints.down("md")]: {
      marginRight: "2ch"
    }
  },
  iconWrapper: {
    borderRadius: "12px",
    "&:hover": {
      "& $iconAvatar": {
        background: "#5E35B1 !important",
        color: "#EDE7F6 !important"
      }
    }
  },
  iconAvatar: {
    cursor: "pointer",
    borderRadius: "8px",
    width: "28px",
    height: "28px",
    fontSize: "1.2rem",
    transition: "all .2s ease-in-out"
  },
  border: {
    borderRadius: "1.5ch",
    "& .MuiInputBase-root": {
      borderRadius: "1.5ch"
    },
    "& .MuiSelect-root": {
      borderRadius: "1.5ch"
    }
  },
  listWrapper: {
    cursor: "pointer",
    padding: 16,
    "&:hover": {
      background: theme.palette.background.primary
    },
    "& .MuiListItem-root": {
      padding: 0
    }
  },
  list: {
    width: "100%",
    maxWidth: 350,
    minWidth: 330,
    padding: 0,
    [theme.breakpoints.down("md")]: {
      maxWidth: 300
    },
    "& .MuiListItemSecondaryActionRoot": {
      top: "22px"
    },
    "& .MuiDividerRoot": {
      marginTop: 0,
      marginBottom: 0
    }
  }
}));

const CustomListItem = ({
  handleConfirm,
  handleDecline,
  name,
  url,
  time,
  notificationType,
  isRead
}) => {
  const theme = useTheme();
  const classes = useStyles();

  const getMessage = (notificationType, name) => {
    switch (notificationType) {
      case LIKED:
        return "Congratulations! someone has liked you";
      case MATCHED:
        return "Congratulations! you have got a new match. Go and chat with them...";
      case GOT_FRIEND_REQUEST:
        return `${name} has sent you a friend request. Add them to your friends list...`;
      case CONFIRMED_FRIEND_REQUEST:
        return `${name} has confirmed your friend request`;
      case BLOCKED:
        return `Ooops! ${name} has blocked you. You cannot message him/her further`;
      case UNBLOCKED:
        return `${name} has unblocked you. You can message him/her`;
      case DECLINED_FRIEND_REQUEST:
        return `${name} has declined your friend request`;
      default:
        return;
    }
  };

  return (
    <div
      className={classes.listWrapper}
      style={{ paddingBottom: notificationType === GOT_FRIEND_REQUEST ? "16px" : 0 }}>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar
            alt={notificationType !== LIKED ? name : "*****"}
            src={notificationType !== LIKED ? url : ""}
          />
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="subtitle1">
              {notificationType !== LIKED ? name : "*****"}
            </Typography>
          }
        />
        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="caption" display="block" gutterBottom>
                {moment(time).fromNow()}
              </Typography>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>
      <Grid container direction="column" style={{ paddingLeft: "7ch" }}>
        <Grid item xs={12} style={{ paddingBottom: "2ch" }}>
          <Typography variant="subtitle2">{getMessage(notificationType, name)}</Typography>
        </Grid>
        {notificationType === GOT_FRIEND_REQUEST && (
          <Grid item xs={12}>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Button
                  style={{
                    backgroundColor: theme.palette.primary
                  }}
                  aria-label="Accept"
                  onClick={handleConfirm}
                  variant="contained"
                  disableElevation
                  endIcon={<Done />}>
                  Accept
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    backgroundColor: theme.palette.error.light
                  }}
                  aria-label="decline"
                  onClick={handleDecline}
                  variant="contained"
                  disableElevation
                  endIcon={<Close />}>
                  Decline
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </div>
  );
};

CustomListItem.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleDecline: PropTypes.func.isRequired,
  name: PropTypes.string,
  url: PropTypes.string,
  notificationType:
    PropTypes.oneOf[
      (LIKED, MATCHED, GOT_FRIEND_REQUEST, CONFIRMED_FRIEND_REQUEST, BLOCKED, UNBLOCKED)
    ],
  time: PropTypes.string.isRequired,
  isRead: PropTypes.bool.isRequired
};

const NotificationSection = ({ socket, userId, notifications, unread }) => {
  const theme = useTheme();
  const classes = useStyles();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const [unreadCount, setUnreadCount] = useState(unread.length);
  const [isViewAll, setViewAll] = useState(false);

  useEffect(() => {
    setUnreadCount(unread.length);
  }, [unread]);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => setValue(event.target.value);

  const handleConfirm = (e, { id, notificationId }) => {
    e.preventDefault();
    if (socket)
      socket.emit("confirm-friends-request", { sender: userId, receiver: id, notificationId });
  };

  const handleDecline = (e, { id, notificationId }) => {
    e.preventDefault();
    if (socket)
      socket.emit("decline-friends-request", { sender: userId, receiver: id, notificationId });
  };

  const handleRead = (e) => {
    e.preventDefault();
    if (socket) socket.emit("read-all", { userId });
  };

  useEffect(() => {
    if (socket)
      socket.on("read-all-response", (data) => {
        if (data.success) {
          setUnreadCount(data.count);
        } else {
          alert(data.message);
        }
      });

    return () => socket && socket.off();
  }, [socket]);

  const filterNotification = (data) => data.filter((el) => value == 0 || !el.isRead);

  return (
    <>
      <Box className={classes.box}>
        <Badge badgeContent={unreadCount} max={9} color="secondary">
          <ButtonBase className={classes.iconWrapper} aria-label="icon">
            <Avatar
              variant="rounded"
              className={classes.iconAvatar}
              style={{
                background: open ? "#5E35B1" : "#EDE7F6",
                color: open ? "#EDE7F6" : "#5E35B1"
              }}
              ref={anchorRef}
              aria-controls={open ? "menu-list-grow" : undefined}
              aria-haspopup="true"
              onClick={handleToggle}>
              {unreadCount === 0 ? (
                <NotificationsNone fontSize="small" />
              ) : (
                <NotificationsActive fontSize="small" />
              )}
            </Avatar>
          </ButtonBase>
        </Badge>
      </Box>
      <Popper
        placement={matchesXs ? "bottom" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps }) => (
          <Grow
            style={{
              transformOrigin: matchesXs ? "top" : "top-right",
              background: theme.palette.background.default,
              borderRadius: "12px",
              marginTop: "1ch"
            }}
            in={open}
            {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <Card
                  style={{
                    background: theme.palette.background.default,
                    borderRadius: "12px",
                    boxShadow: theme.shadows[16]
                  }}
                  elevation={16}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        style={{ paddingTop: "2ch", paddingLeft: "2ch", paddingRight: "2ch" }}>
                        <Grid item>
                          <Grid container direction="row" spacing={2}>
                            <Typography variant="subtitle1">Total</Typography>&nbsp;
                            <Chip
                              size="small"
                              label={notifications.length}
                              max={9}
                              style={{
                                color: theme.palette.background.default,
                                backgroundColor: theme.palette.warning.dark
                              }}
                            />
                          </Grid>
                        </Grid>
                        {unreadCount > 0 && (
                          <Grid item>
                            <Typography
                              onClick={handleRead}
                              style={{ textDecoration: "underline", cursor: "pointer" }}
                              variant="subtitle2"
                              color="primary">
                              Mark as all read
                            </Typography>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <Grid container direction="column" spacing={2}>
                      <Grid item xs={12}>
                        <Box
                          style={{
                            paddingLeft: "2ch",
                            paddingRight: "2ch",
                            paddingTop: "0.25ch",
                            borderRadius: "2ch"
                          }}>
                          <TextField
                            id="outlined-select-currency-native"
                            select
                            fullWidth
                            variant="outlined"
                            value={value}
                            onChange={handleChange}
                            className={classes.border}
                            SelectProps={{
                              native: true
                            }}>
                            <option value={0}>All Notification</option>
                            <option value={1}>Unread</option>
                          </TextField>
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider light />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <div
                        style={{
                          maxHeight: isViewAll ? `400px` : `200px`,
                          overflow: !isViewAll ? "hidden" : "hidden scroll"
                        }}>
                        <List className={classes.list}>
                          <PerfectScrollbar data-mdb-perfect-scrollbar={isViewAll}>
                            {notifications && notifications.length > 0 ? (
                              filterNotification(notifications)
                                .sort((b, a) => new Date(a.createdAt) - new Date(b.createdAt))
                                .map((el, index) => (
                                  <Fragment key={index}>
                                    <CustomListItem
                                      handleConfirm={(e) =>
                                        handleConfirm(e, {
                                          id: el.userId,
                                          notificationId: el?.notificationId
                                        })
                                      }
                                      handleDecline={(e) =>
                                        handleDecline(e, {
                                          id: el.userId,
                                          notificationId: el?.notificationId
                                        })
                                      }
                                      name={el?.displayName?.value || "*****"}
                                      url={el?.avatar?.value}
                                      time={el.createdAt}
                                      notificationType={el.notificationType}
                                      isRead={el.isRead}
                                    />
                                    <Divider light />
                                  </Fragment>
                                ))
                            ) : (
                              <div style={{ paddingLeft: "2ch" }}>You have no notifications</div>
                            )}
                          </PerfectScrollbar>
                        </List>
                      </div>
                    </Grid>
                  </Grid>
                  <Divider light />
                  <CardActions style={{ padding: "1.25ch", justifyContent: "center" }}>
                    <Button
                      onClick={() => setViewAll((state) => !state)}
                      size="small"
                      aria-label="view"
                      color="primary"
                      disableElevation>
                      {!isViewAll ? "View All" : "Hide"}
                    </Button>
                  </CardActions>
                </Card>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

NotificationSection.propTypes = {
  notifications: PropTypes.array,
  unread: PropTypes.array,
  socket: PropTypes.object,
  userId: PropTypes.string.isRequired
};

export default NotificationSection;
