import React, { useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Grid,
  Avatar,
  Badge
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import AddAPhotofrom from "@material-ui/icons/AddAPhotoRounded";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import lottie from "lottie-web";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "92vh",
    backgroundColor: "#a9f7e0",
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
    marginTop: theme.spacing(0)
  }
}));

const ImageUpload = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isUpload, setUpload] = useState(false);

  const container = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../assets/animation/home.json")
    });
  }, []);

  return (
    <Container maxWidth="sm" className={classes.root} align="center">
      <div className={classes.animation} ref={container}></div>
      <Typography variant="h5" color="textPrimary">
        Upload Your avatar
      </Typography>
      <br />
      <div>
        <Badge
          overlap="circular"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          badgeContent={
            isUpload || <AddAPhotofrom style={{ fontSize: "2.5rem", color: "#4D38A2" }} />
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me for 30 days"
      />
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
        <Circle fontSize="small" style={{ color: "#fff" }} />
        <Circle fontSize="small" color="primary" />
        <Circle fontSize="small" style={{ color: "#fff" }} />
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
