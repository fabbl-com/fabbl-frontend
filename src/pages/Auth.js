import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Button,
  Container,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Box
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%"
  },
  submit: {
    margin: theme.spacing(2, 0, 2)
  },
  authControll: {
    marginBottom: theme.spacing(0)
  }
}));

const Auth = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isRegistered, setRegistered] = useState(false);
  return (
    <Container maxWidth="sm">
      <Typography variant="h5" align="center" color="textPrimary" paragraph>
        {isRegistered ? "Sign into your Account" : "Create an Account"}
      </Typography>
      <form className={classes.form}>
        <TextField required fullWidth label="Email" type="email" />
        {isRegistered || <TextField required fullWidth label="Username" type="text" />}
        <TextField required fullWidth name="password" label="Password" type="password" />
        {isRegistered && (
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me for 30 days"
          />
        )}
        <div>
          <Button type="submit" variant="contained" color="secondary" className={classes.submit}>
            Register
          </Button>
        </div>
      </form>
      <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
        Or Login with using social media
      </Typography>
      <Box align="center">
        <Circle fontSize="small" />
        <Circle fontSize="small" />
        <Circle fontSize="small" />
      </Box>
      <div className="authControll">
        {isRegistered ? (
          <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
            {"Don't have an account?"}
            <Button
              color="primary"
              disableRipple="true"
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
              disableRipple="true"
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
