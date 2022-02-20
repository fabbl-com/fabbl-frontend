import React from "react";
import { AppBar, Toolbar, Typography, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import NotificationSection from "./Notifications";

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

const Navbar = ({ socket, userId, isTheme, setTheme }) => {
  const classes = useStyles();
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
          <NotificationSection />
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};

export default Navbar;
