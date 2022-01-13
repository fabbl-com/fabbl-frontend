import React from "react";
import { AppBar, Toolbar, Typography, IconButton, makeStyles } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  appBar: {
    backgroundColor: "#2e9cca",
    color: "#fff"
  }
}));

const Navbar = () => {
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
          <IconButton size="small" edge="start" color="inherit" aria-label="Notifications">
            <NotificationsActiveIcon />
          </IconButton>
          <IconButton size="small" edge="start" color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default Navbar;
