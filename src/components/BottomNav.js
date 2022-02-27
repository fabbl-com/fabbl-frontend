import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import HomeIcon from "@material-ui/icons/Home";
import ExploreIcon from "@material-ui/icons/Explore";
import PersonIcon from "@material-ui/icons/Person";
import ChatIcon from "@material-ui/icons/Chat";
import { useLocation } from "react-router-dom";
import { PropTypes } from "prop-types";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    position: "fixed",
    bottom: 0,
    width: " 100vw",
    height: "3rem",
    background: theme.palette.background.default
  }
}));

export default function BottomNav({ isAuth }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  let location = useLocation();
  console.log(location.pathname);
  if (!isAuth || location.pathname === "/chat-details") {
    return <></>;
  }

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      className={classes.root}>
      <BottomNavigationAction icon={<HomeIcon fontSize="medium" />} />
      <BottomNavigationAction icon={<ExploreIcon fontSize="medium" />} />
      <BottomNavigationAction icon={<ChatIcon fontSize="medium" />} />
      <BottomNavigationAction icon={<PersonIcon fontSize="medium" />} />
    </BottomNavigation>
  );
}

BottomNav.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
