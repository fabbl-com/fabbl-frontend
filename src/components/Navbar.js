import React, { useEffect, useState } from "react";
import { AppBar, Box, Toolbar, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NotificationSection from "./Notifications";
import { useDispatch, useSelector } from "react-redux";
import { removeNotifications, setNotifications } from "../redux/actions/userActions";
import ProfileSection from "./ProfileSection";
import { Alert } from "@material-ui/lab";
import { Explore, Favorite, GitHub } from "@material-ui/icons";
import ButtonWrapper from "./ButtonWrapper";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#2e9cca",
    color: "#fff",
    [theme.breakpoints.up("md")]: {
      padding: " 0 7%"
    }
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
  },
  box: {
    marginLeft: theme.spacing(2)
  },
  link: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnWrapper: {
    "&:hover": {
      "& $icon": {
        color: "#fff"
      }
    }
  },
  icon: {
    color: "#5E35B1"
  }
}));

const Navbar = ({ socket, userId, isTheme, setTheme, matchesMd }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isLoggedOut, setLoggedOut] = useState(false);

  const { notifications, isAuth } = useSelector((state) => state.user);

  const unread = notifications?.filter((el) => el.isRead === false);

  useEffect(() => {
    if (socket) {
      socket.on("send-notifications", (data) => dispatch(setNotifications(data)));
      socket.on("friends-request-response", (data) => dispatch(removeNotifications(data)));
    }

    return () => socket && socket.off();
  }, [socket]);

  useEffect(() => {
    setTimeout(() => {
      if (isLoggedOut && !isAuth) setLoggedOut(false);
    }, [1000]);
  }, [isAuth]);

  return (
    <AppBar className={classes.appBar} position="fixed" elevation={0}>
      <Toolbar variant="dense">
        {isLoggedOut && <Alert severity="success">Logged out successfully</Alert>}
        <Link to="/">
          <Typography variant="h3" component="h1">
            Fabbl
          </Typography>
        </Link>
        <div style={{ flexGrow: 1 }} />
        <div style={{ display: "flex", alignItems: "center" }}>
          {matchesMd && isAuth && (
            <>
              <Box className={classes.box}>
                <ButtonWrapper className={classes.btnWrapper}>
                  <Link className={classes.link} to={"/find"}>
                    <Explore className={classes.icon} fontSize="small" />
                  </Link>
                </ButtonWrapper>
              </Box>
              <Box className={classes.box}>
                <ButtonWrapper className={classes.btnWrapper}>
                  <Link className={classes.link} to={"/chat"}>
                    <Favorite className={classes.icon} fontSize="small" />
                  </Link>
                </ButtonWrapper>
              </Box>
            </>
          )}
          <Box className={classes.box}>
            <ButtonWrapper className={classes.btnWrapper}>
              <Link
                className={classes.link}
                target="__blank"
                to={{ pathname: "https://github.com/fabbl-com" }}>
                <GitHub className={classes.icon} fontSize="small" />
              </Link>
            </ButtonWrapper>
          </Box>
          <NotificationSection
            socket={socket}
            userId={userId}
            notifications={notifications || []}
            unread={unread || []}
          />
          <ProfileSection isTheme={isTheme} setTheme={setTheme} userId={userId} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  userId: PropTypes.string.isRequired,
  socket: PropTypes.object,
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired,
  matchesMd: PropTypes.bool.isRequired
};

export default Navbar;
