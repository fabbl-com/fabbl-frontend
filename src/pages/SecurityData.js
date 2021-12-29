import React, { useState } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Container,
  TextField,
  useTheme
} from "@material-ui/core";
import {
  KeyboardBackspace,
  CheckCircleOutlined,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";

import classNames from "classnames";

import { personalDataStyles } from "../assets/jss";

const useStyles = makeStyles((theme) => personalDataStyles(theme));

const PersonalData = () => {
  const classes = useStyles();
  const theme = useTheme();

  const [password, setPassword] = useState({
    password1: "",
    password2: "",
    password3: "",
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          Privacy & Secuirty Data
        </Typography>
        <div />
      </div>
      <div className={classes.profileBody}>
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
          className={classes.avatar}
          variant="rounded"
        />
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            Female
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        <div className={classes.fullWidth}>
          <Typography component="h6" variant="h6">
            Email
          </Typography>
          <TextField
            className={classNames(classes.textField)}
            placeholder="Email"
            variant="outlined"
            fullWidth
            size="small"
            defaultValue={`someone@gmail.com`}
          />
        </div>
        <div className={classes.fullWidth}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-1ch" }}>
            <div />
            <Button variant="contained" color="secondary">
              Update Email
            </Button>
          </div>
        </div>
        {[
          { placeholder: "Old Password", prop: "password1" },
          { placeholder: "New Password", prop: "password2" },
          { placeholder: "Confirm Password", prop: "password3" }
        ].map((el, i) => (
          <React.Fragment key={i}>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                {el.placeholder}
              </Typography>
              <TextField
                fullWidth
                placeholder={el.placeholder}
                type={password.showPassword ? "text" : "password"}
                variant="outlined"
                size="small"
                onChange={handleChange(el.prop)}
                className={classes.textField}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={handleClickShowPassword}>
                      {password.showPassword ? (
                        <Visibility style={{ color: theme.palette.text.secondary }} />
                      ) : (
                        <VisibilityOff style={{ color: theme.palette.text.secondary }} />
                      )}
                    </IconButton>
                  )
                }}
              />
            </div>
          </React.Fragment>
        ))}
        <div className={classes.fullWidth}>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "-1ch" }}>
            <div />
            <Button variant="contained" color="secondary">
              Update Password
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default PersonalData;
