import React, { useState } from "react";
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
  useMediaQuery
} from "@material-ui/core";
import {
  KeyboardBackspace,
  CheckCircleOutlined,
  Visibility,
  VisibilityOff
} from "@material-ui/icons";
import { useLocation, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateEmail, updatePassword } from "../redux/actions/userActions";
import { LOGOUT_SUCCESS } from "../redux/constants/userActionTypes";
import { personalDataStyles } from "../assets/jss";
import { strengthColor, strengthIndicator } from "../utils/paswordStrenth";
import { CustomAlert } from "../components";
import PasswordStrength from "../components/PasswordStrength";
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
  const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
  const {
    isEmailSent = false,
    isPasswordUpdated = false,
    error = null,
    profile,
    loading
  } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);
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
    history.push(location.from || "/");
  };

  const handlePasswordStrength = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Type <strong style="background: #eee">${profile.displayName.value}</strong> to delete your account`,
      input: "text",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Delete",
      showLoaderOnConfirm: true,
      customClass: {
        confirmButton: matchesXs && `${classes.sweetalertButton}`,
        cancelButton: matchesXs && `${classes.sweetalertButton}`,
        popup: matchesXs && `${classes.popup}`,
        title: matchesXs && `${classes.title}`,
        input: matchesXs && `${classes.sweetalertInput}`
      },
      preConfirm: async (text) => {
        console.log(text);
        if (text !== profile.displayName.value)
          Swal.showValidationMessage(`Type ${profile.displayName.value} to continue`);
        else {
          return fetch(`/user/delete/${userId}`, { method: "DELETE" })
            .then((response) => {
              if (!response.ok) {
                throw new Error(response.statusText);
              }
              return response.json();
            })
            .catch((error) => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Account deleted successfully!",
          showConfirmButton: true,
          customClass: {
            button: matchesXs && `${classes.button}`,
            popup: matchesXs && `${classes.popup}`,
            icon: matchesXs && `${classes.icon}`,
            title: matchesXs ? `${classes.title}` : `${classes.titleMd}`
          }
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch({ type: LOGOUT_SUCCESS, payload: { success: true, isLoggedOut: true } });
          }
        });
      }
    });
  };

  const canDelete = (new Date() - new Date(profile.createdAt)) / (1000 * 60 * 60 * 24) >= 30;

  if (loading) return <div>loading</div>;
  return (
    <Container className={classes.root}>
      {error &&
        (error.code === 401 ? (
          <CustomAlert variant="filled" color="error">
            Invalid Credentials!
          </CustomAlert>
        ) : (
          <CustomAlert variant="filled" color="error">
            Something went wrong. Please try agin
          </CustomAlert>
        ))}
      {isEmailSent && !error && (
        <CustomAlert variant="filled" color={"success"}>
          An email has been sent. Please verify your email
        </CustomAlert>
      )}
      {isPasswordUpdated && !error && (
        <CustomAlert variant="filled" color={"success"}>
          Password updated succesfully!
        </CustomAlert>
      )}
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
              <Button
                aria-label="update email"
                variant="contained"
                color="secondary"
                onClick={handleClick}>
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
                    formData.password3?.length > 0 &&
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

          <div className={classes.fullWidth}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div />
              <Button
                variant="contained"
                aria-label="Update password"
                color="secondary"
                onClick={handelPasswordChange}>
                Update Password
              </Button>
            </div>
            {strength !== 0 && <PasswordStrength level={level} />}
          </div>
        </form>
      </div>
      <Box mt={1} className={classes.delete}>
        <div style={{ width: "60%" }}>
          <Typography component="h3" variant="h3" gutterBottom>
            Delete Account
          </Typography>
          <Typography component="p" variant="caption">
            {!canDelete
              ? "You can delete your acount after 30 days of registration"
              : "Once you delete Your account, there is no going back. Please be certain."}
          </Typography>
        </div>
        <Button
          disabled={canDelete}
          aria-label="delete"
          onClick={handleDelete}
          variant="contained"
          style={{
            height: "2.5rem",
            backgroundColor: canDelete ? "#ef006f" : "#aaa",
            color: "#fff"
          }}>
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
