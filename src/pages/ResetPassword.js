import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Typography,
  IconButton,
  Button,
  Container,
  TextField,
  useTheme,
  Paper
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { resetPassword } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { PropTypes } from "prop-types";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(6),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: `calc(100vh - ${theme.spacing(6)}px)`,
    backgroundColor: theme.palette.backgroundColor
  },
  profileBody: {
    margin: theme.spacing(2, 0)
  },
  fullWidth: {
    width: "100%"
  }
}));

const ResetPassword = ({ userId }) => {
  const classes = useStyles();
  const theme = useTheme();

  const dispatch = useDispatch();
  const history = useHistory();

  const { loading, error, success, userInfo } = useSelector((state) => state.user);

  const [password, setPassword] = useState({
    password1: "",
    password2: "",
    showPassword: false
  });

  const handleChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

  const handlePassword = () => {
    if (password.password1 && password.password2) {
      console.log(password);
      if (password.password1 != password.password2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password do not match"
        });
      } else {
        dispatch(resetPassword({ userId, password: password.password2 }));
      }
    }
  };

  useEffect(() => {
    if (success && !error) {
      Swal.fire({
        title: "Email has been reset successfully. Click OK to go to Profile",
        icon: "info",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          history.push(`/profile/${userId}`);
        }
      });
    } else if (!success && error) {
      let message = "Something went wrong at our end. Please try agin later";
      if (error.code < 500) message = error.message;

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message
      });
    }
  }, [success, userInfo, error]);

  return (
    <Container className={classes.root}>
      <Paper>
        <div>
          {[
            { placeholder: "New Password", prop: "password1" },
            { placeholder: "Confirm Password", prop: "password2" }
          ].map((el, i) => (
            <div className={classes.profileBody} key={i}>
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
          ))}
          <div>
            <Button onClick={handlePassword} fullWidth variant="contained" color="secondary">
              Update Password
            </Button>
          </div>
        </div>
      </Paper>
    </Container>
  );
};

ResetPassword.propTypes = {
  userId: PropTypes.string.isRequired
};

export default ResetPassword;
