import React from "react";
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

const useStyles = makeStyles((theme) => settingsStyles(theme));

const Settings = ({ isTheme, setTheme }) => {
  const classes = useStyles();

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
      <div className={classes.theme}>
        <div>
          {!isTheme ? <BrightnessHigh fontSize="small" /> : <Brightness4 fontSize="small" />}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <Typography>Theme</Typography>
        </div>
        <Switch
          color="primary"
          className={classes.changeTheme}
          onChange={() => {
            setTheme((state) => !state);
          }}
          size="small"
          checked={isTheme}
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
              icon: <Person fontSize="small" />
            },
            {
              title: "Gender",
              icon: <Wc fontSize="small" />
            },
            {
              title: "Bio",
              icon: <Info fontSize="small" />
            },
            {
              title: "Age",
              icon: <Event fontSize="small" />
            },
            {
              title: "Location",
              icon: <LocationOn fontSize="small" />
            },
            {
              title: "Relationship Status",
              icon: <Favorite fontSize="small" />
            },
            {
              title: "Hobbies & Interest",
              icon: <SentimentSatisfied fontSize="small" />
            }
          ].map((el, i) => (
            <div key={i}>
              {el.icon}
              &nbsp;&nbsp;&nbsp;
              <Typography>{el.title}</Typography>
              <div style={{ flexGrow: 1 }} />
              <FormControl size="small" variant="outlined">
                <Select
                  defaultValue={1}
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
                icon: <Delete fontSize="small" />
              }
            ].map((el, i) => (
              <div key={i}>
                {el.icon}
                &nbsp;&nbsp;&nbsp;
                <Typography>{el.title}</Typography>
                <div style={{ flexGrow: 1 }} />
                <FormControl size="small" variant="outlined">
                  <Select
                    defaultValue={1}
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
        <Button variant="contained" color="secondary">
          Update Profile
        </Button>
      </Box>
    </Container>
  );
};

Settings.propTypes = {
  isTheme: PropTypes.bool.isRequired,
  setTheme: PropTypes.func.isRequired
};

export default Settings;
