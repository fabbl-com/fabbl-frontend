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
  Grid,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import lottie from "lottie-web";
import animationData from "../assets/animation/auth.json";
import { FacebookIcon, GoogleIcon } from "../assets/icons/index";
import { register, login } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Alert } from "@material-ui/lab";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2e9cca",
    marginTop: "3rem",
    marginBottom: "2.2rem",
    color: "#fff",
    minHeight: `calc(100vh - ${theme.spacing(11)}px)`
  },
  form: {
    width: "100%"
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

const Auth = ({ isAuth }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isRegister, setRegister] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const container = useRef(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  console.log(history);
  console.log(location);
  if (isAuth) {
    if (!isRegister) history.push(location?.state?.from?.pathname);
    else history.push("/image");
  }
  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });

    return () => anim.destroy();
  }, [animationData]);

  const err = useSelector((state) => state.user?.error);

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(user);
    isRegister ? dispatch(register(user)) : dispatch(login(user));
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {err &&
        (err.code === 401 ? (
          <Alert severity="error">Oops! Invalid credential. Please Try again</Alert>
        ) : (
          <Alert severity="error">Something went wrong. Please try agin</Alert>
        ))}
      <div className={classes.animation} ref={container}></div>

      <Typography variant="h5" align="center">
        {isRegister ? "Sign into your Account" : "Create an Account"}
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
        {isRegister && (
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
          type={showPassword ? "text" : "password"}
          vaule={user?.password}
          onChange={(e) => setUser((state) => ({ ...state, password: e.target.value }))}
          margin="normal"
          InputLabelProps={{
            className: classes.textfield
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color="secondary"
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}>
                  {showPassword ? (
                    <Visibility style={{ color: "#362222" }} />
                  ) : (
                    <VisibilityOff style={{ color: "#362222" }} />
                  )}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {isRegister && (
          <Box display="flex" justifyContent="space-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  name="RememberMe"
                  value={user?.RememberMe}
                  color="primary"
                />
              }
              onChange={(e) => {
                setRememberMe(!rememberMe);
                setUser((state) => ({ ...state, rememberMe: e.target.checked }));
              }}
              label="Remember me"
            />
            <Box mt={2}>
              <Link to="/">Forgot your password</Link>
            </Box>
          </Box>
        )}

        <div align="center">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "#362222", marginTop: "2ch", color: "#fff" }}>
            {isRegister ? "Register" : "Login"}
          </Button>
        </div>
      </form>
      <Typography style={{ margin: "1ch 0" }} variant="subtitle1" align="center">
        ------ Or--------
      </Typography>

      <Grid container direction="column" spacing={1} justifyContent="center">
        <Grid item>
          <form action="http://localhost:4000/auth/google">
            <Button
              type="submit"
              fullWidth
              startIcon={<GoogleIcon />}
              style={{ backgroundColor: "#072227", color: "#fff" }}>
              {"  "} Login with Google
            </Button>
          </form>
        </Grid>
        <Grid item>
          <form action="http://localhost:4000/auth/facebook">
            <Button
              type="submit"
              fullWidth
              startIcon={<FacebookIcon />}
              style={{ backgroundColor: "#362222", color: "#fff" }}>
              {"  "} Login with Facebook
            </Button>
          </form>
        </Grid>
      </Grid>

      {isRegister || (
        <Box align="center" m={1}>
          <Circle fontSize="small" color="primary" />
          <Circle fontSize="small" style={{ color: "#fff" }} />
          <Circle fontSize="small" style={{ color: "#fff" }} />
        </Box>
      )}
      <div className={classes.authControll}>
        {isRegister ? (
          <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
            {"Don't have an account?"}
            <Button
              color="primary"
              disableRipple={true}
              onClick={() => {
                setRegister(isRegister);
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
                setRegister(isRegister);
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

Auth.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

export default Auth;
