import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Divider,
  Container,
  Switch,
  FormControl,
  Select,
  MenuItem,
  Button,
  Box,
  useTheme,
  Badge
} from "@material-ui/core";
import {
  KeyboardBackspace,
  LocationOn,
  Brightness4,
  Person,
  Public,
  Group,
  Wc,
  Info,
  Event,
  SentimentSatisfied,
  Delete,
  Favorite,
  BrightnessHigh
} from "@material-ui/icons";
import { PropTypes } from "prop-types";
import { CustomAlert } from "../components";
import { settingsStyles } from "../assets/jss";
import { updateProfilePref } from "../redux/actions/userActions";
import { useLocation, useHistory } from "react-router-dom";
import Spinner from "../components/Spinner";
const useStyles = makeStyles((theme) => settingsStyles(theme));

const Settings = ({ userId, isTheme, setTheme }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();

  const {
    profile = null,
    error = null,
    isPrefUpdated = false
  } = useSelector((state) => state.user);

  const [formData, setFormData] = useState({
    age: 1,
    autoDelete: "1",
    bio: 1,
    genderPref: 1,
    hobbies: 1,
    location: 1,
    relationshipStatusPref: 1,
    theme: 1,
    username: 1
  });

  const [isClicked, setClicked] = useState(false);
  useEffect(() => {
    // if (!profile) dispatch(getUserProfile(userId));
    if (profile)
      setFormData({
        age: profile.dob.status,
        autoDelete: "1",
        bio: profile.headline.status,
        genderPref: profile.gender.status,
        hobbies: profile.hobby.status,
        location: profile.location.status,
        relationshipStatusPref: profile.relationshipStatus.status,
        theme: profile.settings.theme,
        username: profile.displayName.status
      });
  }, [profile]);
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateProfilePref({ userId, data: formData }));
    setTimeout(() => {
      setClicked(false);
    }, 3000);
  };

  const goBack = (e) => {
    e.preventDefault();
    history.push(location.from || "/");
  };

  return (
    <Container maxWidth="lg" className={classes.root}>
      {/* {error &&
        (error.code === 401 ? (
          <CustomAlert variant="filled" color="error">
            Unauthorized!
          </CustomAlert>
        ) : (
          <CustomAlert variant="filled" color="error">
            Something went wrong. Please try agin
          </CustomAlert>
        ))}
      {isPrefUpdated && !error && (
        <CustomAlert variant="filled" color={"success"}>
          Profile Updated Successfully!
        </CustomAlert>
      )} */}
      <div className={classes.profileHeader}>
        <IconButton onClick={goBack} color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h3" variant="h3">
          Settings
        </Typography>
        <div />
      </div>
      <div className={classes.profilePic}>
        <Avatar src={profile?.avatar?.value} variant="rounded" />
        <div className={classes.username}>
          <Typography component="h1" variant="h6">
            {profile?.displayName?.value}
          </Typography>
          <Typography component="h2" variant="body2">
            @uuid
          </Typography>
        </div>
      </div>
      <Divider width="100%" className={classes.divider} />
      <form onSubmit={handleSubmit}>
        <div className={classes.theme}>
          <div>
            {!isTheme ? <BrightnessHigh fontSize="small" /> : <Brightness4 fontSize="small" />}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Typography>Theme</Typography>
          </div>
          <Switch
            color="primary"
            className={classes.changeTheme}
            onChange={(e, newValue) => {
              setTheme((state) => !state);
              setFormData((state) => ({ ...state, theme: Number(newValue) }));
            }}
            size="small"
            checked={isTheme}
            name="theme"
            value={isTheme}
          />
        </div>
        <Divider width="100%" className={classes.divider} />
        <div>
          <Typography component="h1" variant="h6">
            Profile Visibility
          </Typography>
          <div className={classes.actions}>
            {[
              {
                title: "Username",
                icon: <Person fontSize="small" />,
                name: "username"
              },
              {
                title: "Gender",
                icon: <Wc fontSize="small" />,
                name: "genderPref"
              },
              {
                title: "Bio",
                icon: <Info fontSize="small" />,
                name: "bio"
              },
              {
                title: "Age",
                icon: <Event fontSize="small" />,
                name: "age"
              },
              {
                title: "Location",
                icon: <LocationOn fontSize="small" />,
                name: "location"
              },
              {
                title: "Relationship Status",
                icon: <Favorite fontSize="small" />,
                name: "relationshipStatusPref"
              },
              {
                title: "Hobbies & Interest",
                icon: <SentimentSatisfied fontSize="small" />,
                name: "hobbies"
              }
            ].map((el, i) => (
              <div key={i}>
                {el.icon}
                &nbsp;&nbsp;&nbsp;
                <Typography>{el.title}</Typography>
                <div style={{ flexGrow: 1 }} />
                <Badge
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "center"
                  }}
                  badgeContent={"Upcoming"}
                  color="primary">
                  <FormControl size="small" variant="outlined">
                    <Select
                      name={el.name}
                      defaultValue={1}
                      disabled
                      onChange={onChange}
                      classes={{
                        select: classes.visibility,
                        disabled: classes.disabled
                      }}>
                      <MenuItem value={1}>
                        <Public fontSize="small" />
                        &nbsp;&nbsp;&nbsp; Public
                      </MenuItem>
                      <MenuItem value={2}>
                        <Group fontSize="small" />
                        &nbsp;&nbsp;&nbsp; Only friends
                      </MenuItem>
                      <MenuItem value={3}>
                        <Person fontSize="small" />
                        &nbsp;&nbsp;&nbsp; Only me
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Badge>
              </div>
            ))}
          </div>
          <Divider width="100%" className={classes.divider} />
          <div>
            <Typography component="h1" variant="h6">
              Control
            </Typography>
            <div className={classes.actions}>
              {[
                {
                  title: "Delete Message automatically after",
                  icon: <Delete fontSize="small" />,
                  name: "autoDelete"
                }
              ].map((el, i) => (
                <div key={i}>
                  {el.icon}
                  &nbsp;&nbsp;&nbsp;
                  <Typography>{el.title}</Typography>
                  <div style={{ flexGrow: 1 }} />
                  <Badge
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "center"
                    }}
                    badgeContent={"Upcoming"}
                    color="primary">
                    <FormControl size="small" variant="outlined">
                      <Select
                        name={el.name}
                        defaultValue={1}
                        disabled
                        onChange={onChange}
                        native
                        classes={{
                          select: classes.visibility,
                          disabled: classes.disabled
                        }}>
                        <option value={1}>10 min</option>
                        <option value={2}>15 min</option>
                        <option value={3}>custom</option>
                        <option value={4}>Never</option>
                      </Select>
                    </FormControl>
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Box align="center" mb={2} mt={1}>
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            aria-label="delete"
            onClick={() => {
              setClicked(true);
            }}>
            {isClicked ? <Spinner /> : "Update Profile"}
          </Button>
        </Box>
      </form>
    </Container>
  );
};

Settings.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
};

export default Settings;
