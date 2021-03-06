import React, { useState } from "react";
import {
  Button,
  Typography,
  TextField,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  useMediaQuery,
  Card,
  Divider,
  useTheme,
  makeStyles
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Alert } from "@material-ui/lab";
import PropTypes from "prop-types";
import { resetPassword } from "../redux/actions/userActions";
import Logo from "../assets/logo/Logo";
import { FacebookIcon, GoogleIcon } from "../assets/icons";
import { strengthColor, strengthIndicator } from "../utils/paswordStrenth";
import PasswordStrength from "../components/PasswordStrength";
import Swal from "sweetalert2";

const useStyles = makeStyles((theme) => ({
  btn: {
    borderRadius: theme.spacing(1),
    color: "#616161",
    backgroundColor: "#F6FBFF",
    border: "1px solid transparent",
    "&:hover": {
      backgroundColor: "#F6FBFF",
      borderColor: "rgb(33, 150, 243)"
    }
  }
}));

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const ResetPassword = () => {
  const theme = useTheme();

  const matchDownSM = useMediaQuery(theme.breakpoints.down("md"));
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({ password1: "", password2: "" });
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const token = query.get("token");
  // console.log(token);
  const { error, success } = useSelector((state) => state.user);

  if (success) history.push(location?.state?.from?.pathname || "/");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user);
    if (user.password1 && user.password2) {
      console.log(user);
      if (user.password1 != user.password2) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password do not match"
        });
      } else {
        dispatch(resetPassword({ token, password: user.password2 }));
      }
    }
  };
  const handlePasswordStrength = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  return (
    <div
      style={{
        backgroundColor: theme.palette.primary.light,
        minHeight: "100vh",
        marginTop: "3rem"
      }}>
      {/* {error &&
        (error.code === 401 ? (
          <Alert severity="error">Oops! Invalid credential. Please Try again</Alert>
        ) : (
          <Alert severity="error">Something went wrong. Please try agin</Alert>
        ))} */}
      <Grid
        container
        direction="column"
        justifyContent="flex-end"
        style={{ minHeight: "100vh", borderRadius: "12px" }}>
        <Grid item xs={12}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            style={{ minHeight: "calc(100vh - 68px)" }}>
            <Grid item style={{ margin: "1ch", marginBottom: 0 }}>
              <Card
                style={{
                  maxWidth: "475px",
                  borderRadius: "12px",
                  padding: "2.5ch",
                  "& > *": {
                    flexGrow: 1,
                    flexBasis: "50%"
                  },
                  borderColor: "#42a5f5",
                  boxShadow: theme.shadows[16]
                }}>
                <Box style={{ padding: "2ch" }}>
                  <Grid container spacing={2} alignItems="center" justifyContent="center">
                    <Grid item style={{ marginBottom: "3ch" }}>
                      <Link to="/">
                        <Logo />
                      </Link>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        direction={matchDownSM ? "column-reverse" : "row"}
                        alignItems="center"
                        justifyContent="center">
                        <Grid item>
                          <Grid container alignItems="center" justifyContent="center" spacing={1}>
                            <Typography
                              color="secondary"
                              align="center"
                              gutterBottom
                              variant={matchDownSM ? "h3" : "h2"}>
                              Hi, Welcome Back
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container direction="column" justifyContent="center" spacing={2}>
                        <Grid item xs={12}>
                          <form action={`${ENDPOINT}/auth/google`}>
                            <Button
                              fullWidth
                              aria-label="sign in with google"
                              type="submit"
                              size="large"
                              variant="outlined"
                              startIcon={<GoogleIcon />}
                              className={classes.btn}>
                              Sign in with Google
                            </Button>
                          </form>
                        </Grid>
                        <Grid item xs={12}>
                          <form action={`${ENDPOINT}/auth/facebook`}>
                            <Button
                              type="submit"
                              fullWidth
                              size="large"
                              variant="outlined"
                              aria-label="Sign in with Facebook"
                              startIcon={<FacebookIcon />}
                              className={classes.btn}>
                              Sign in with Facebook
                            </Button>
                          </form>
                        </Grid>
                        <Grid item xs={12}>
                          <Box
                            style={{
                              alignItems: "center",
                              display: "flex"
                            }}>
                            <Divider light style={{ flexGrow: 1 }} orientation="horizontal" />

                            <Button
                              variant="outlined"
                              aria-label="or"
                              style={{
                                cursor: "unset",
                                margin: "2ch",
                                padding: "0.5ch 7ch",
                                borderColor: `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: "12px"
                              }}
                              disableRipple
                              disabled>
                              OR
                            </Button>

                            <Divider light style={{ flexGrow: 1 }} orientation="horizontal" />
                          </Box>
                        </Grid>
                        <Grid item xs={12} container alignItems="center" justifyContent="center">
                          <Box style={{ marginBottom: "1ch" }}>
                            <Typography variant="subtitle1">Enter New Password</Typography>
                          </Box>
                        </Grid>
                      </Grid>

                      <form noValidate onSubmit={handleSubmit}>
                        <TextField
                          required
                          fullWidth
                          variant="outlined"
                          name="password"
                          label="Password"
                          type={showPassword ? "text" : "password"}
                          vaule={user?.password1}
                          onChange={(e) => {
                            setUser((state) => ({ ...state, password1: e.target.value }));
                            handlePasswordStrength(e.target.value);
                          }}
                          margin="normal"
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
                                    <Visibility color="primary" />
                                  ) : (
                                    <VisibilityOff color="primary" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        <TextField
                          required
                          fullWidth
                          variant="outlined"
                          name="password2"
                          label="Confirm Password"
                          type={showPassword ? "text" : "password"}
                          vaule={user?.password2}
                          helperText={
                            user?.password2?.length > 0 &&
                            user?.password2 !== user?.password1 &&
                            "Password does not match"
                          }
                          FormHelperTextProps={{ error: true }}
                          onChange={(e) =>
                            setUser((state) => ({ ...state, password2: e.target.value }))
                          }
                          margin="normal"
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
                                    <Visibility color="primary" />
                                  ) : (
                                    <VisibilityOff color="primary" />
                                  )}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                        />
                        {strength !== 0 && <PasswordStrength level={level} />}
                        <Box style={{ marginTop: "3ch" }}>
                          <Button
                            color="secondary"
                            disableElevation
                            aria-label="reset password"
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained">
                            Reset Password
                          </Button>
                        </Box>
                      </form>
                    </Grid>
                  </Grid>
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} style={{ margin: "3ch", mraginTop: "1ch" }}>
          <Grid container direction="row" justifyContent="space-between">
            <Link target="_blank" to={{ pathname: "https://github.com/fabbl-com" }}>
              <Typography variant="subtitle2" underline="hover">
                Github
              </Typography>
            </Link>
            <Typography variant="subtitle2" target="_blank" underline="hover">
              &copy; Fabbl
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

// ResetPassword.propTypes = {
//   isAuth: PropTypes.bool.isRequired
// };

export default ResetPassword;
