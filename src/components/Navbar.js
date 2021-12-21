import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Switch, Toolbar, Typography, IconButton, Button } from "@material-ui/core";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import MenuIcon from "@material-ui/icons/Menu";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  nav: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));

const Navbar = ({ isTheme, setTheme }) => {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);

  const changeTheme = () => {
    setTheme(!isTheme);
    setChecked(!checked);
  };
  const theme = useTheme();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar className={classes.nav}>
        <Button disableRipple="true" startIcon={<HomeOutlinedIcon />} size="large">
          <Typography variant="h6" component="h6" style={{ color: theme.palette.primary.main }}>
            {" "}
            Fabbl
          </Typography>
        </Button>
        {/* 
        <HomeOutlinedIcon />
        <Typography variant="h6" color="inherit">
          Fabbl
        </Typography>
        */}
        <div>
          <Switch
            checked={checked}
            onChange={() => {
              changeTheme();
            }}
            style={{ color: theme.palette.secondary.icons }}
          />
          <IconButton edge="start" color="inherit" aria-label="Notifications">
            <NotificationsActiveIcon />
          </IconButton>
          <IconButton edge="start" color="inherit" aria-label="Menu">
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
