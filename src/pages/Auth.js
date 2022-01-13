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
    color: "#fff"
  }
}));

const Auth = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isRegistered, setRegistered] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
  }, []);

  return (
    <Container maxWidth="sm" className={classes.root}>
      <div className={classes.animation} ref={container}></div>

      <Typography variant="h5" align="center">
        {isRegistered ? "Sign into your Account" : "Create an Account"}
      </Typography>
      <form className={classes.form}>
        <TextField
          required
          fullWidth
          label="Email"
          type="email"
          margin="normal"
          InputLabelProps={{
            className: classes.textfield
          }}
        />
        {isRegistered || (
          <TextField
            required
            fullWidth
            label="Username"
            type="text"
            margin="normal"
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

      <Grid container direction="row" spacing={4} justify="center">
        <Grid item>
          <GoogleIcon />
        </Grid>
        <Grid item>
          <FacebookIcon />
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
