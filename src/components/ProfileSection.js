/* eslint-disable no-constant-condition */
import { useState, useRef, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";

// material-ui
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Grow,
  List,
  Button,
  ListItemIcon,
  ListItemText,
  Popper,
  Switch,
  Typography,
  useMediaQuery,
  useTheme,
  makeStyles,
  ListItem
} from "@material-ui/core";
import { PropTypes } from "prop-types";

import { ExitToApp, Lock, Person, Settings } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/actions/userActions";
import Swal from "sweetalert2";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  chip: {
    height: "32px",
    alignItems: "center",
    borderRadius: "24px",
    transition: "all .2s ease-in-out",
    border: `1px solid transparent !important`,
    backgroundColor: "#EDE7F6 !important",
    '&[aria-controls="menu-list-grow"], &:hover': {
      border: `1px solid ${theme.palette.secondary.main} !important`,
      boxShadow: theme.shadows[16],
      background: `${theme.palette.secondary.main}!important`,
      color: theme.palette.secondary.light,
      "& .MuiChip-label": {
        color: "#fff"
      }
    },
    "& .MuiChip-label": {
      lineHeight: 0,
      color: "#5E35B1",
      padding: theme.spacing(1)
    }
  },
  card: {
    borderRadius: "12px",
    background: theme.palette.background.default,
    padding: "1ch",
    ":hover": {
      boxShadow: theme.shadows[16]
    }
  },
  avatar: {
    width: "24px",
    height: "24px",
    fontSize: "1.1rem",
    margin: "8px 0 8px 8px !important",
    cursor: "pointer"
  },
  card2: {
    background: theme.palette.background.default,
    borderRadius: "12px",
    marginTop: "2ch",
    marginBottom: "2ch"
  },
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "inherit",
    borderRadius: "10px"
  },
  listItem: {
    borderRadius: "12px",
    margin: "0.1ch 0",
    "&:hover": {
      backgroundColor: "rgb(237, 231, 246)"
    }
  },
  popup: {
    width: "auto !important"
  },
  icon: {
    fontSize: "10px"
  },
  title: {
    fontSize: "1rem !important"
  },
  titleMd: {
    lineHeight: "1.5 !important"
  },
  button: {
    fontSize: "inherit"
  }
}));

// ==============================|| PROFILE MENU ||============================== //

const ProfileSection = ({ userId, isTheme, setTheme }) => {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleLogout = async () => {
    setOpen((state) => !state);
    dispatch(logout());
  };

  const { profile, isAuth, isLoggedOut, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (isLoggedOut && !error) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "You have been logged out successfully!",
        showConfirmButton: false,
        timer: 1500,
        customClass: {
          button: matchesXs && `${classes.button}`,
          popup: matchesXs && `${classes.popup}`,
          icon: matchesXs && `${classes.icon}`,
          title: matchesXs ? `${classes.title}` : `${classes.titleMd}`
        }
      });
      history.push("/");
    }
  }, [isLoggedOut, error, matchesXs]);

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen((state) => !state);
  };

  const handleListItemClick = (event, route = "") => {
    setOpen((state) => !state);

    if (route && route !== "") {
      history.push({ pathname: route, from: location?.pathname || "/" });
    }
  };
  const handleToggle = () => {
    if (!isAuth) {
      // Swal.fire({
      //   position: "center",
      //   icon: "error",
      //   title: "You are not logged in",
      //   customClass: {
      //     button: matchesXs && `${classes.button}`,
      //     popup: matchesXs && `${classes.popup}`,
      //     icon: matchesXs && `${classes.icon}`,
      //     title: matchesXs && `${classes.title}`
      //   }
      // });
      history.push("/auth");
    } else {
      setOpen((prevOpen) => !prevOpen);
    }
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleThemeChange = () => {
    localStorage.setItem("theme", !isTheme);
    setTheme((state) => !state);
    console.log(isTheme);
  };

  return (
    <>
      <Chip
        className={classes.chip}
        icon={
          <Avatar
            src={profile?.avatar?.value}
            color="secondary"
            className={classes.avatar}
            aria-controls={open && "menu-list-grow"}
            aria-haspopup="true"
          />
        }
        label={<Settings fontSize="small" color="primary" />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open && "menu-list-grow"}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
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
              backgroundColor: "#fff",
              borderRadius: "12px",
              marginTop: "1ch"
            }}
            in={open}
            {...TransitionProps}>
            <ClickAwayListener onClickAway={handleClose}>
              <Card className={classes.card} elevation={16}>
                <Box style={{ padding: "1ch" }}>
                  <Grid>
                    <Grid container direction="row" spacing={1} alignItems="center">
                      <Typography variant="h4">Hello</Typography>
                      {isAuth && (
                        <Typography component="span" variant="h4" style={{ fontWeight: 400 }}>
                          ,&nbsp;{profile?.displayName?.value}
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <Divider light style={{ marginTop: "2ch" }} />
                </Box>
                <Box>
                  <Card className={classes.card2}>
                    <CardContent>
                      <Grid container spacing={3} direction="column">
                        <Grid item>
                          <Grid item container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1">Change Theme</Typography>
                            </Grid>
                            <Grid item>
                              <Switch
                                checked={isTheme}
                                onChange={handleThemeChange}
                                color="primary"
                                name="theme"
                                size="small"
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid item container alignItems="center" justifyContent="space-between">
                            <Grid item>
                              <Typography variant="subtitle1">Allow Auto Delete</Typography>
                            </Grid>
                            <Grid item>
                              <Switch name="auto-delete" size="small" />
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                  <Divider light />
                  <List className={classes.list}>
                    <ListItem
                      component={Button}
                      className={classes.listItem}
                      onClick={(event) => handleListItemClick(event, `profile/${userId}`)}>
                      <ListItemIcon>
                        <Person fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2">Profile</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      component={Button}
                      className={classes.listItem}
                      onClick={(event) => handleListItemClick(event, "/settings")}>
                      <ListItemIcon>
                        <Settings fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2">Account Settings</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      component={Button}
                      className={classes.listItem}
                      onClick={(event) => handleListItemClick(event, `/edit/security-data`)}>
                      <ListItemIcon>
                        <Lock fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2">Security Data</Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem
                      component={Button}
                      className={classes.listItem}
                      onClick={handleLogout}>
                      <ListItemIcon>
                        <ExitToApp fontSize="small" color="primary" />
                      </ListItemIcon>
                      <ListItemText>
                        <Typography variant="body2">Logout</Typography>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
              </Card>
            </ClickAwayListener>
          </Grow>
        )}
      </Popper>
    </>
  );
};

ProfileSection.propTypes = {
  userId: PropTypes.string.isRequired,
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default ProfileSection;
