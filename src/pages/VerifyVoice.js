import React, { useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  FormControl,
  InputLabel,
  Box,
  Button,
  Grid,
  MenuItem,
  Select
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import MicIcon from "@material-ui/icons/Mic";
import lottie from "lottie-web";
import { Link } from "react-router-dom";
import animationData from "../assets/animation/auth.json";
import recordAnimationData from "../assets/animation/recordAnimation.json";
import sentence from "../utils/randomSentence";
import { record } from "../utils/recordVoice";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2e9cca",
    color: "#fff",
    marginBottom: "2.2rem",
    minHeight: `calc(100vh - ${theme.spacing(6)}px)`
  },
  authControll: {
    backgroundColor: "#fff",
    height: "2.2rem",
    width: "100%",
    position: "fixed",
    bottom: "0",
    left: "0"
  },
  formControl: {
    margin: theme.spacing(2, 0),
    minWidth: 110,
    Color: "#fff"
  },
  lines: {
    backgroundColor: "#333",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
    margin: theme.spacing(2, 0)
  },
  mic: {
    width: "6rem",
    height: "6rem",
    borderRadius: "50%",
    background: "linear-gradient(to right, #51B59A, #65CCB8,#36B199,#65CCB8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  actionButton: {
    backgroundColor: "#D31D71",
    width: theme.spacing(18),
    color: "#fff",
    marginTop: theme.spacing(1)
  },
  animation: {
    height: "15rem",
    marginTop: theme.spacing(0)
  },
  recordAnimation: {
    height: "6rem"
  }
}));

const VoiceUpload = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [Gender, setGender] = useState("");
  const [isRecording, setRecording] = useState(false);

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

  const box = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      recordAnimationData
    });
  }, []);

  const handelRecoding = () => {
    setRecording(!isRecording);
    console.log(record());
  };

  return (
    <Container maxWidth="sm" className={classes.root} align="center">
      <div className={classes.animation} ref={container}></div>
      <Typography variant="h5" align="center">
        Get a verified profile
      </Typography>

      <Grid container direction="row" justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="body1">Select Your Gender</Typography>
        </Grid>
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="select-Gender-label">Gender</InputLabel>
            <Select
              labelId="select-Gender-label"
              id="select-Gender-label"
              value={Gender}
              onChange={(event) => {
                setGender(event.target.value);
              }}
              label="Gender">
              <MenuItem value={"Male"}>Male</MenuItem>
              <MenuItem value={"Female"}>Female</MenuItem>
              <MenuItem value={"Other"}>Other</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Typography variant="h5" align="center">
        Speak the lines
      </Typography>
      <Box align="center" className={classes.lines}>
        <Typography variant="body1" align="left">
          {sentence()}
        </Typography>
      </Box>
      <Button
        className={classes.mic}
        onClick={() => {
          handelRecoding();
        }}>
        {isRecording ? (
          <div className={classes.recordAnimation} ref={box}></div>
        ) : (
          <MicIcon style={{ fontSize: "3rem", color: "#D31D71" }} />
        )}
      </Button>
      <Typography variant="subtitle1" align="center">
        {" "}
        Tap to record{" "}
      </Typography>
      <Button type="submit" variant="contained" className={classes.actionButton}>
        Verify
      </Button>
      <Box align="center" m={2}>
        <Link to="/auth">
          <Circle fontSize="small" style={{ color: "#fff" }} />
        </Link>
        <Link to="/image">
          <Circle fontSize="small" style={{ color: "#fff" }} />
        </Link>
        <Link to="/verifyvoice">
          <Circle fontSize="small" color="primary" />
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

export default VoiceUpload;
