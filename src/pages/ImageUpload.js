import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Grid,
  Avatar,
  Badge,
  IconButton,
  useTheme,
  useMediaQuery
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import AddAPhotofrom from "@material-ui/icons/AddAPhotoRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import lottie from "lottie-web";
import { uploadAvatar } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { PropTypes } from "prop-types";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: `calc(100vh - ${theme.spacing(6)}px)`,

    backgroundColor: "#2e9cca",
    color: "#fff",
    marginTop: "3rem"
  },
  authControll: {
    backgroundColor: "#fff",

    height: "2.2rem",
    width: "100%",
    position: "fixed",
    bottom: "0",
    left: "0"
  },
  image: {
    backgroundColor: "#888181",
    height: "7rem",
    width: "7rem"
  },
  animation: {
    height: "15rem",
    marginTop: "0"
  },
  popup: {
    width: "auto !important"
  },
  icon: {
    fontSize: "10px"
  },
  title: {
    fontSize: "1rem !important"
  },
  titleMd: {
    lineHeight: "1.5 !important"
  },
  button: {
    fontSize: "inherit"
  }
}));

const ImageUpload = ({ userId }) => {
  const classes = useStyles();
  const [isUpload, setUpload] = useState(false);
  const [user, setUser] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const container = useRef(null);
  const theme = useTheme();
  const matchesSm = useMediaQuery(theme.breakpoints.down("md"));

  const {
    loading,
    error = null,
    isAuth = false,
    profile = {},
    isImageUploaded = false
  } = useSelector((state) => state.user);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../assets/animation/auth.json")
    });

    return () => anim.destroy();
  }, []);

  useEffect(() => {
    if (!loading && isImageUploaded) {
      Swal.fire({
        title: "Successfully registered!. Click OK to continue.",
        confirmButtonText: "OK",
        icon: "success",
        customClass: {
          button: matchesSm && `${classes.button}`,
          popup: matchesSm && `${classes.popup}`,
          icon: matchesSm && `${classes.icon}`,
          title: matchesSm ? `${classes.title}` : `${classes.titleMd}`
        }
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/verify-voice");
        }
      });
    }
  }, [loading, isImageUploaded]);

  const { isProfileCompleted = false, avatar } = profile;

  if (isAuth && isProfileCompleted) history.push(location.from || "/");

  const handleUpload = (e) => {
    e.preventDefault();
    console.log(user.data);
    if (user.data) dispatch(uploadAvatar({ userId, data: user.data }));
  };
  const handleChange = (e) => {
    e.preventDefault();
    const newImage = e?.target?.files?.[0];
    if (newImage) {
      setImage(URL.createObjectURL(newImage));
      setUser((state) => ({ ...state, data: newImage }));
    }
  };
  return (
    <div className={classes.root}>
      {loading && <Loader />}
      <Container maxWidth="sm" align="center">
        <div className={classes.animation} ref={container}></div>
        <Typography variant="h5">Upload Your avatar</Typography>
        <br />
        <form onSubmit={handleUpload}>
          <div>
            <Badge
              overlap="circular"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              badgeContent={
                <>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id="upload-avatar"
                    type="file"
                    // value={user?.data}
                    onChange={handleChange}
                  />
                  <label htmlFor="upload-avatar">
                    <IconButton aria-label="upload avatar" component="span">
                      {isUpload || (
                        <AddAPhotofrom style={{ fontSize: "2.5rem", color: "#4D38A2" }} />
                      )}
                    </IconButton>
                  </label>
                </>
              }>
              <Avatar variant="rounded" className={classes.image} src={image || avatar?.value}>
                {isUpload || (
                  <AccountBoxIcon
                    style={{ fontSize: "12rem", backgroundColor: "#fff", color: "#888181" }}
                  />
                )}
              </Avatar>
            </Badge>
          </div>

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
          <Grid container direction="column" justifyContent="center" spacing={1}>
            <Grid item>
              <Button type="submit" variant="contained" aria-label="upload">
                Upload
              </Button>
            </Grid>
            {isUpload || (
              <Grid item>
                <Button aria-label="skip" onClick={() => history.push("/verify-voice")}>
                  Skip
                </Button>
              </Grid>
            )}
          </Grid>
        </form>
        <Box align="center" m={2}>
          <Link to="/auth">
            <Circle fontSize="small" style={{ color: "#fff" }} />
          </Link>
          <Link to="/image">
            <Circle fontSize="small" color="primary" />
          </Link>
          <Link to="/verify-voice">
            <Circle fontSize="small" style={{ color: "#fff" }} />
          </Link>
        </Box>

        <div className={classes.authControll}>
          <Typography variant="subtitle1" align="center" color="primary" paragraph>
            Already have an account? Login now
          </Typography>
        </div>
      </Container>
    </div>
  );
};

ImageUpload.propTypes = {
  userId: PropTypes.string.isRequired
};

export default ImageUpload;
