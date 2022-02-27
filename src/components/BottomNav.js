import React, { useState } from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Typography,
  makeStyles
} from "@material-ui/core";
import { Favorite, Explore, Home, Person } from "@material-ui/icons";
import { useLocation, Link } from "react-router-dom";
import PropTypes from "prop-types";
const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    position: "fixed",
    bottom: 0,
    width: "100vw",
    "& Mui-selected .MuiSvgIcon-root": {
      transform: "scale(1.5)"
    }
  }
}));

export default function BottomNav({ isAuth }) {
  const classes = useStyles();
  const location = useLocation();
  if (!isAuth || location.pathname === "/chat-details") return <></>;

  const values = {
    "/": 0,
    "/find": 1,
    "/chat": 2,
    "/edit/personal-data": 3
  };

  return (
    <BottomNavigation
      value={values[location.pathname]}
      showLabels
      // onChange={(event, newValue) => setValue(newValue)}
      className={classes.root}>
      <BottomNavigationAction
        label={
          <Link to={"/"}>
            <Typography variant="caption">Home</Typography>
          </Link>
        }
        icon={
          <Link to={"/"}>
            <Home className={classes.icon} fontSize="small" />
          </Link>
        }
      />
      <BottomNavigationAction
        label={
          <Link to={"/find"}>
            <Typography variant="caption">Explore</Typography>
          </Link>
        }
        icon={
          <Link to={"/find"}>
            <Explore fontSize="small" />
          </Link>
        }
      />
      <BottomNavigationAction
        label={
          <Link to={"/chat"}>
            <Typography variant="caption">Matches</Typography>
          </Link>
        }
        icon={
          <Link to={"/chat"}>
            <Favorite fontSize="small" />
          </Link>
        }
      />
      <BottomNavigationAction
        label={
          <Link to={"/edit/personal-data"}>
            <Typography variant="caption">Profile</Typography>
          </Link>
        }
        icon={
          <Link to={"/edit/personal-data"}>
            <Person fontSize="small" />
          </Link>
        }
      />
    </BottomNavigation>
  );
}

BottomNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
