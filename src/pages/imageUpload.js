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
  IconButton
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import AddAPhotofrom from "@material-ui/icons/AddAPhotoRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import lottie from "lottie-web";
import { Link } from "react-router-dom";
const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
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
  }
}));

const ImageUpload = () => {
  const classes = useStyles();
  const [isUpload, setUpload] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../assets/animation/auth.json")
    });
  }, []);

  return (
    <Container maxWidth="sm" className={classes.root} align="center">
      <div className={classes.animation} ref={container}></div>
      <Typography variant="h5">Upload Your avatar</Typography>
      <br />
      <div>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          badgeContent={
            <>
              <input accept="image/*" style={{ display: "none" }} id="upload-avatar" type="file" />
              <label htmlFor="upload-avatar">
                <IconButton aria-label="upload avatar" component="span">
                  {isUpload || <AddAPhotofrom style={{ fontSize: "2.5rem", color: "#4D38A2" }} />}
                </IconButton>
              </label>
            </>
          }>
          <Avatar
            variant="rounded"
            className={classes.image}
            src={isUpload ? "https://bit.ly/3Ez2w7J" : ""}>
            {isUpload || (
              <AccountBoxIcon
                style={{ fontSize: "12rem", backgroundColor: "#fff", color: "#888181" }}
              />
            )}
          </Avatar>
        </Badge>
      </div>
      <FormControlLabel control={<Checkbox value="remember" />} label="Remember me for 30 days" />
      <Grid container direction="column" justifyContent="center" spacing={1}>
        <Grid item>
          <Button
            type="submit"
            variant="contained"
            onClick={() => {
              setUpload(!isUpload);
            }}>
            {isUpload ? "Next" : "Upload"}
          </Button>
        </Grid>
        {isUpload || (
          <Grid item>
            <Button>Skip</Button>
          </Grid>
        )}
      </Grid>

      <Box align="center" m={2}>
        <Link to="/auth">
          <Circle fontSize="small" style={{ color: "#fff" }} />
        </Link>
        <Link to="/image">
          <Circle fontSize="small" color="primary" />
        </Link>
        <Link to="/verifyvoice">
          <Circle fontSize="small" style={{ color: "#fff" }} />
        </Link>
      </Box>

      <div className={classes.authControll}>
        <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
          Already have an account? Login now
        </Typography>
      </div>
    </Container>
  );
};

export default ImageUpload;
