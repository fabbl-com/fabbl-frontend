import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { AppBar, Switch, Toolbar, Typography } from "@material-ui/core";
import PropTypes from "prop-types";

const Navbar = ({ isTheme, setTheme }) => {
  const [checked, setChecked] = useState(false);

  const changeTheme = () => {
    setTheme(!isTheme);
    setChecked(!checked);
  };

  const theme = useTheme();
  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Switch
          checked={checked}
          onChange={() => {
            changeTheme();
          }}
          style={{ color: theme.palette.secondary.icons }}
        />
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default Navbar;
