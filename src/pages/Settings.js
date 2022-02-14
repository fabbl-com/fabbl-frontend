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
  Box
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

import { settingsStyles } from "../assets/jss";
import { updateProfilePref, getUserProfile } from "../redux/actions/userActions";
const useStyles = makeStyles((theme) => settingsStyles(theme));

const Settings = ({ isTheme, setTheme }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.user?.userInfo);
  console.log(profile);
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
  useEffect(() => {
    dispatch(getUserProfile());
    if (profile)
      setFormData({
        age: profile.profile.dob.status,
        autoDelete: "1",
        bio: profile.profile.headline.status,
        genderPref: profile.profile.gender.status,
        hobbies: profile.profile.hobby.status,
        location: profile.profile.city.status,
        relationshipStatusPref: profile.profile.relationshipStatus.status,
        theme: profile.profile.settings.theme,
        username: profile.profile.displayName.status
      });
  }, [!profile]);
  console.log(formData);
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateProfilePref(formData));
  };

  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          settings
        </Typography>
        <div />
      </div>
      <div className={classes.profilePic}>
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
          variant="rounded"
        />
        <div className={classes.username}>
          <Typography component="h1" variant="h6">
            Dora
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
            onChange={(e) => {
              setTheme((state) => !state);
              onChange(e);
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
                <FormControl size="small" variant="outlined">
                  <Select
                    name={el.name}
                    defaultValue={2}
                    onChange={(e, index, value) => {
                      onChange(e, index, value);
                    }}
                    classes={{
                      select: classes.visibility
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
                  <FormControl size="small" variant="outlined">
                    <Select
                      name={el.name}
                      defaultValue={formData.age}
                      onChange={(e, index, value) => {
                        onChange(e, index, value);
                      }}
                      native
                      classes={{
                        select: classes.visibility
                      }}>
                      <option value={1}>10 min</option>
                      <option value={2}>15 min</option>
                      <option value={3}>custom</option>
                      <option value={4}>Never</option>
                    </Select>
                  </FormControl>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Box align="center" mb={2} mt={1}>
          <Button variant="contained" color="secondary" type="submit">
            Update Profile
          </Button>
        </Box>
      </form>
    </Container>
  );
};

Settings.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default Settings;
