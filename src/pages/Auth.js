import React, { useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Box,
  Grid
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import lottie from "lottie-web";
import animationData from "../assets/animation/auth.json";
import { FacebookIcon, GoogleIcon } from "../assets/icons/index";
import { register, login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "97vh",
    backgroundColor: "#2e9cca",
    marginTop: "3rem",
    color: "#fff"
  },
  form: {
    width: "100%"
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
    width: "8rem",
    backgroundColor: "#d31d71"
  },
  authControll: {
    backgroundColor: "#fff",
    height: "2.2rem",
    width: "100%",
    position: "fixed",
    bottom: "0",
    left: "0"
  },
  textfield: {
    color: "#fff !important"
  }
}));

const Auth = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isRegistered, setRegistered] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const container = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
  }, [animationData]);

  const err = useSelector((state) => state.auth?.error);

  useEffect(() => {
    err && setError(err);
    setTimeout(() => {
      err && setError(null);
    }, 3000);
  }, [err]);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(user);
    !isRegistered ? dispatch(register(user)) : dispatch(login(user));
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {error &&
        (error.code === 401 ? (
          <Alert severity="error">Oops! Invalid credential. Please Try again</Alert>
        ) : (
          <Alert severity="error">Something went wrong. Please try agin</Alert>
        ))}
      <div className={classes.animation} ref={container}></div>

      <Typography variant="h5" align="center">
        {isRegistered ? "Sign into your Account" : "Create an Account"}
      </Typography>
      <form onSubmit={handleRegister} className={classes.form}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          vaule={user?.email}
          onChange={(e) => setUser((state) => ({ ...state, email: e.target.value }))}
          margin="normal"
          InputLabelProps={{
            className: classes.textfield
          }}
        />
        {!isRegistered && (
          <TextField
            required
            fullWidth
            label="displayName"
            type="text"
            margin="normal"
            vaule={user?.displayName}
            onChange={(e) => setUser((state) => ({ ...state, displayName: e.target.value }))}
            InputLabelProps={{
              className: classes.textfield
            }}
          />
        )}
        <TextField
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          vaule={user?.password}
          onChange={(e) => setUser((state) => ({ ...state, password: e.target.value }))}
          margin="normal"
          InputLabelProps={{
            className: classes.textfield
          }}
        />
        {isRegistered && (
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me for 30 days"
          />
        )}
        <div align="center">
          <Button type="submit" variant="contained" className={classes.submit}>
            {!isRegistered ? "Register" : "Login"}
          </Button>
        </div>
      </form>
      <Typography variant="subtitle1" align="center" paragraph>
        Or Login with using social media
      </Typography>

      <Grid container direction="row" spacing={4} justifyContent="center">
        <Grid item>
          <form action="http://localhost:4000/auth/google">
            <Button type="submit">
              <GoogleIcon />
            </Button>
          </form>
        </Grid>
        <Grid item>
          <form action="http://localhost:4000/auth/facebook">
            <Button type="submit">
              <FacebookIcon />
            </Button>
          </form>
        </Grid>
      </Grid>

      {isRegistered || (
        <Box align="center" m={2}>
          <Circle fontSize="small" color="primary" />
          <Circle fontSize="small" style={{ color: "#fff" }} />
          <Circle fontSize="small" style={{ color: "#fff" }} />
        </Box>
      )}
      <div className={classes.authControll}>
        {isRegistered ? (
          <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
            {"Don't have an account?"}
            <Button
              color="primary"
              disableRipple={true}
              onClick={() => {
                setRegistered(!isRegistered);
              }}>
              Register
            </Button>
            now
          </Typography>
        ) : (
          <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
            {"Already have an account?"}
            <Button
              color="primary"
              disableRipple={true}
              onClick={() => {
                setRegistered(!isRegistered);
              }}>
              Login
            </Button>
            now
          </Typography>
        )}
      </div>
    </Container>
  );
};

export default Auth;
