import React, { useEffect } from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NotificationSection from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { removeNotifications, setNotifications } from "../redux/actions/userActions";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#2e9cca",
    color: "#fff"
  },
  menu: {
    backgroundColor: theme.palette.background.default,
    top: `48px !important`,
    left: "auto !important",
    right: 0,

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
    "&:last-child": {
      "&:hover": {
        backgroundColor: "transparent"
      }
    }
  }
}));

const Navbar = ({ socket, userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { notifications } = useSelector((state) => state.user);

  const unread = notifications?.filter((el) => el.isRead === false);

  useEffect(() => {
    if (socket) {
      socket.on("send-notifications", (data) => dispatch(setNotifications(data)));
      socket.on("friends-request-response", (data) => dispatch(removeNotifications(data)));
    }

    return () => socket && socket.off();
  }, [socket]);

  return (
    <AppBar className={classes.appBar} position="fixed" elevation={0}>
      <Toolbar variant="dense">
        <Link to="/">
          <Typography variant="h3" component="h1">
            Fabbl
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <div>
          <NotificationSection
            socket={socket}
            userId={userId}
            notifications={notifications || []}
            unread={unread || []}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  socket: PropTypes.object
};

export default Navbar;
