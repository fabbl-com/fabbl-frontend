import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Container,
  TextField,
  useTheme,
  Box,
  FormControl,
  Grid
} from "@material-ui/core";
import {
  KeyboardBackspace,
  CheckCircleOutlined,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateEmail, updatePassword } from "../redux/actions/userActions";
import { personalDataStyles } from "../assets/jss";
import { strengthColor, strengthIndicator } from "../utils/paswordStrenth";
import { PropTypes } from "prop-types";

const useStyles = makeStyles((theme) => personalDataStyles(theme));

const SecurityData = ({ userId }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.user);

  console.log(profile);

  const [showPassword, setShowPassword] = useState(false);

  // useEffect(() => {
  //   dispatch(getUserProfile(userId));
  // }, []);
  const [formData, setFormData] = useState({});
  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleClick = () => {
    console.log(formData);
    dispatch(updateEmail({ id: userId, data: formData.email }));
  };
  const handelPasswordChange = () => {
    const data = { oldPassword: formData.password1, newPassword: formData.password2 };
    if (formData.password2 === formData.password3) {
      dispatch(updatePassword({ data, id: userId }));
    }
  };

  const goBack = (e) => {
    e.preventDefault();
    history.push(location.from);
  };

  const handlePasswordStrength = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  if (loading) return <div>loading</div>;
  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton onClick={goBack} color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          Privacy & Secuirty Data
        </Typography>
        <div />
      </div>
      <div className={classes.profileBody}>
        <Avatar src={profile.avatar.value} className={classes.avatar} variant="rounded" />
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            {profile.gender.value === 0 ? "Male" : "Female"}
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        <form className={classes.fullWidth}>
          <div>
            <Typography component="h6" variant="h6">
              Email
            </Typography>
            <TextField
              className={classNames(classes.textField)}
              placeholder="Email"
              variant="outlined"
              fullWidth
              size="small"
              defaultValue={profile.email}
              name="email"
              helperText={formData.email === "" && "email is required"}
              FormHelperTextProps={{ error: true }}
              required
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={classes.fullWidth}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div />
              <Button type="submit" variant="contained" color="secondary" onClick={handleClick}>
                Update Email
              </Button>
            </div>
          </div>
        </form>
        <form className={classes.fullWidth}>
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
                  name={el.prop}
                  helperText={
                    el.placeholder === "Confirm Password" &&
                    formData.password3.length > 0 &&
                    formData.password3 !== formData.password2 &&
                    "Password does not match"
                  }
                  FormHelperTextProps={{ error: true }}
                  onChange={(e) => {
                    onChange(e);
                    if (el.placeholder === "New Password") handlePasswordStrength(e.target.value);
                  }}
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  size="small"
                  required
                  className={classes.textField}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={() => {
                          setShowPassword(!showPassword);
                        }}>
                        {showPassword ? (
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
          {strength !== 0 && (
            <FormControl fullWidth>
              <Box sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item>
                    <Box
                      style={{ backgroundColor: level.color }}
                      sx={{ width: 85, height: 8, borderRadius: "7px" }}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1" fontSize="0.75rem">
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </FormControl>
          )}
          <div className={classes.fullWidth}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                onClick={handelPasswordChange}>
                Update Password
              </Button>
            </div>
          </div>
        </form>
      </div>
      <Box mt={4} className={classes.delete}>
        <div style={{ width: "60vw" }}>
          <Typography component="h3" variant="h3" gutterBottom>
            Delete Account
          </Typography>
          <Typography component="p" variant="caption">
            Once you delete Your account, there is no going back. Please be certain.
          </Typography>
        </div>
        <Button variant="contained" style={{ height: "2.5rem", backgroundColor: "#ef006f" }}>
          Delete
        </Button>
      </Box>
    </Container>
  );
};

SecurityData.propTypes = {
  userId: PropTypes.string.isRequired
};

export default SecurityData;
