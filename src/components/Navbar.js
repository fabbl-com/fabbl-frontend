import React, { useState } from "react";
import { AppBar, Switch, Toolbar, Typography, IconButton, makeStyles } from "@material-ui/core";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.global,
    color: theme.palette.text.global
  }
}));

const Navbar = ({ isTheme, setTheme }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const changeTheme = () => {
    setTheme(!isTheme);
    setChecked(!checked);
  };
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
          <Switch
            size="small"
            checked={checked}
            onChange={() => {
              changeTheme();
            }}
          />
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
