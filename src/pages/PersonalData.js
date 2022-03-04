/* eslint-disable no-constant-condition */
import { hobbies } from "../assets/static";
import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Container,
  Badge,
  TextField,
  Select,
  MenuItem,
  InputBase,
  useMediaQuery,
  useTheme
} from "@material-ui/core";
import { KeyboardBackspace, CheckCircleOutlined, PhotoCamera } from "@material-ui/icons";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { Autocomplete, Skeleton } from "@material-ui/lab";
import DateFnsUtils from "@date-io/date-fns";
import classNames from "classnames";
import { personalDataStyles } from "../assets/jss";
import { updateProfile, uploadAvatar } from "../redux/actions/userActions";
import { withStyles } from "@material-ui/styles";
import { PropTypes } from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { CustomAlert } from "../components";

const useStyles = makeStyles((theme) => personalDataStyles(theme));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)"
    }
  }
}))(InputBase);

const PersonalData = ({ userId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {
    error = null,
    loading,
    profile = null,
    isProfileUpdated = false
  } = useSelector((state) => state.user);
  const [image, setImage] = useState(null);
  const history = useHistory();
  const location = useLocation();
  const [gender, setGender] = useState(0);
  const [disableGenderUpdate, setDisableGenderUpdate] = useState(true);
  const [formData, setFormData] = useState({
    usernameData: "",
    bioData: "",
    // ageData: new Date(),
    locationData: "",
    relationshipStatusData: 0,
    hobbiesData: []
  });
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (profile) {
      setFormData({
        usernameData: profile.displayName?.value,
        bioData: profile.headline?.value,
        ageData: profile.dob.value || new Date(),
        locationData: profile.location?.value,
        relationshipStatusData: profile.relationshipStatus?.value,
        hobbiesData: profile.hobby?.value
      });
      setGender(profile.gender?.value);
    }
  }, [profile]);

  useEffect(() => {
    if (profile && gender !== profile.gender.value) {
      setDisableGenderUpdate(false);
    } else {
      setDisableGenderUpdate(true);
    }
  }, [gender, profile]);

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(updateProfile({ userId, data: formData }));
  };

  const handleAvatarChange = (e) => {
    e.preventDefault();
    const newImage = e?.target?.files?.[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      console.log(newImage);
      dispatch(uploadAvatar({ userId, data: newImage }));
    }
  };

  const checkDisable = useCallback(() => formData?.hobbiesData.length >= 5, [formData]);

  const goBack = (e) => {
    e.preventDefault();
    console.log(location);
    history.push(location.from || "/");
  };

  return (
    <Container className={classes.root}>
      {!isProfileUpdated &&
        error &&
        (error.code === 401 ? (
          <CustomAlert variant="filled" color="error">
            Unauthorized!
          </CustomAlert>
        ) : (
          <CustomAlert variant="filled" color="error">
            Something went wrong. Please try agin
          </CustomAlert>
        ))}
      {isProfileUpdated && !error && (
        <CustomAlert variant="filled" color={"success"}>
          Profile Updated Successfully!
        </CustomAlert>
      )}
      <div className={classes.profileHeader}>
        <IconButton onClick={goBack} color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h3" variant="h3">
          Personal Data
        </Typography>
        <IconButton style={{ visibility: "hidden" }}>
          <KeyboardBackspace />
        </IconButton>
      </div>
      <div className={classes.profileBody}>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          badgeContent={
            <>
              <input
                onChange={handleAvatarChange}
                accept="image/*"
                className={classes.input}
                id="upload-avatar"
                type="file"
              />
              <label htmlFor="upload-avatar">
                <IconButton color="secondary" aria-label="upload avatar" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </>
          }>
          {loading ? (
            <Skeleton width={matchesMd ? 100 : 200} height={matchesMd ? 150 : 300} animation="wave">
              <Avatar className={classes.avatar} />
            </Skeleton>
          ) : (
            <Avatar
              src={image || profile?.avatar.value}
              className={classes.avatar}
              variant="rounded"
            />
          )}
        </Badge>
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            {profile?.gender?.value === 0 ? "Male" : formData.genderData === 1 ? "Female" : ""}
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        {!loading ? (
          <form
            onSubmit={handleSubmit}
            style={{ width: !matchesMd && "70%" }}
            className={classes.fullWidth}>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Headline
              </Typography>
              <TextField
                className={classes.textField}
                placeholder="Headline"
                variant="outlined"
                fullWidth
                multiline
                size="small"
                name="bioData"
                value={formData.bioData}
                required
                helperText={
                  (formData.bioData.length < 100 || formData.bioData.length > 200) &&
                  "Headline must be in between 100-200 characters"
                }
                FormHelperTextProps={{ error: true }}
                inputProps={{ minLength: 100, maxLength: 200 }}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Display name
              </Typography>
              <TextField
                className={classNames(classes.textField)}
                placeholder="Username"
                variant="outlined"
                fullWidth
                size="small"
                name="usernameData"
                value={formData.usernameData}
                required
                helperText={
                  !formData.usernameData.match("[a-zA-Z0-9_-]{3,10}") &&
                  "DisplayName must be alphanumeric in 3-10 chars"
                }
                inputProps={{ maxLength: 10, pattern: "[a-zA-Z0-9_-]{3,10}" }}
                FormHelperTextProps={{ error: true }}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Date of Birth
              </Typography>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  maxDate={new Date(new Date() - 13 * 365 * 24 * 60 * 60 * 1000)}
                  minDate={new Date(new Date() - 35 * 365 * 24 * 60 * 60 * 1000)}
                  className={classes.textField}
                  autoOk
                  inputVariant="outlined"
                  fullWidth
                  size="small"
                  format="dd/MM/yyyy"
                  value={new Date(formData.ageData)}
                  name="ageDate"
                  InputAdornmentProps={{ position: "end" }}
                  onChange={(selectedDate) =>
                    setFormData((state) => ({ ...state, ageData: selectedDate }))
                  }
                />
              </MuiPickersUtilsProvider>
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Relationship Status
              </Typography>
              <Select
                id="demo-customized-select-label"
                variant="outlined"
                fullWidth
                name="relationshipStatusData"
                input={<BootstrapInput />}
                value={Number(formData.relationshipStatusData)}
                onChange={(e) => onChange(e)}>
                <MenuItem value={0}>single</MenuItem>
                <MenuItem value={1}>commited</MenuItem>
                <MenuItem value={2}>married</MenuItem>
                <MenuItem value={3}>heart-broken</MenuItem>
              </Select>
            </div>
            <div className={classNames(classes.fullWidth, classes.hobby)}>
              <Typography component="h6" variant="h6">
                Hobbies & Interest
              </Typography>
              <Autocomplete
                multiple
                getOptionDisabled={checkDisable}
                options={hobbies}
                getOptionLabel={(option) => option}
                name="hobbiesData"
                value={formData?.hobbiesData}
                filterSelectedOptions
                limitTags={matchesMd ? 1 : 5}
                onChange={(e, value) =>
                  setFormData((state) => ({
                    ...state,
                    hobbiesData: [...value]
                  }))
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    className={classes.textField}
                    variant="outlined"
                    placeholder="Hobbies & Interest"
                  />
                )}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Location
              </Typography>
              <TextField
                className={classNames(classes.textField)}
                placeholder="Location"
                variant="outlined"
                fullWidth
                size="small"
                name="locationData"
                value={formData.locationData}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.fullWidth}>
              <Typography component="h6" variant="h6">
                Gender
              </Typography>
              <Select
                id="demo-customized-select-label"
                variant="outlined"
                fullWidth
                name="relationshipStatusData"
                input={<BootstrapInput />}
                value={gender}
                onChange={(e) => setGender(e.target.value)}>
                <MenuItem value={0}>Male</MenuItem>
                <MenuItem value={1}>Female</MenuItem>
              </Select>
            </div>
            <div className={classes.fullWidth}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-around",
                  marginTop: "3ch",
                  paddingBottom: "6ch"
                }}>
                <Button
                  className={classes.button}
                  aria-label="verify"
                  color="primary"
                  variant="contained"
                  disabled={disableGenderUpdate}>
                  Verify Gender
                </Button>
                <Button
                  disabled={!disableGenderUpdate}
                  className={classes.button}
                  variant="contained"
                  aria-label="update"
                  color="secondary"
                  type="submit">
                  Update Profile
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            <Skeleton animation="wave" />
          </div>
        )}
      </div>
    </Container>
  );
};

PersonalData.propTypes = {
  userId: PropTypes.string.isRequired
};

export default PersonalData;
