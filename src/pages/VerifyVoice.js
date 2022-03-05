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
  Select,
  useMediaQuery,
  Divider
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import MicIcon from "@material-ui/icons/Mic";
import lottie from "lottie-web";
import { Link } from "react-router-dom";
import animationData from "../assets/animation/auth.json";
import recordAnimationData from "../assets/animation/recordAnimation.json";
import sentence from "../utils/randomSentence";
import { verifyGender } from "../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#2e9cca",
    color: "#fff",
    marginBottom: "2.2rem",
    minHeight: `calc(100vh - 100px)`
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
    margin: theme.spacing(4, 0)
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
    padding: theme.spacing(1, 10),
    color: "#fff",
    marginTop: theme.spacing(1),
    [theme.breakpoints.up("md")]: {
      borderRadius: theme.spacing(3)
    }
  },
  animation: {
    height: "15rem",
    marginTop: theme.spacing(6)
  },
  recordAnimation: {
    height: "6rem"
  }
}));

const VoiceUpload = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [gender, setGender] = useState("Male");
  const [lines, setLines] = useState("");
  const [isRecording, setRecording] = useState(false);
  const [audio, setAudio] = useState(null);
  const [url, setURL] = useState("");
  const dispatch = useDispatch();
  const matchesMd = useMediaQuery(theme.breakpoints.up("md"));

  const { profile = {} } = useSelector((state) => state.user);

  const container = useRef(null);

  useEffect(() => {
    if (profile && profile?.gender?.value) {
      setGender(profile?.gender?.value === 0 ? "Male" : "Female");
    }
  }, [profile]);

  useEffect(() => {
    setLines(sentence());
  }, []);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData
    });
    return () => anim.destroy();
  }, [isRecording]);

  const box = useRef(null);

  useEffect(() => {
    isRecording &&
      lottie.loadAnimation({
        container: box.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: recordAnimationData
      });
  }, [isRecording]);

  console.log(audio, url);

  const handelRecoding = async () => {
    setRecording(!isRecording);
    try {
      const options = {
        mimeType: "audio/x-wav;codecs=acm",
        audioBitsPerSecond: 128,
        sampleRate: 22050,
        sampleSize: 1024
      };
      const stream = await navigator.mediaDevices.getUserMedia(
        { audio: true, sampleSize: 16 },
        options
      );
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];
      mediaRecorder.ondataavailable = (event) => {
        console.log("data-available");
        if (event.data.size > 0) {
          chunks.push(event.data);
          let audioData = new Blob(chunks, { type: "audio/x-wav;codecs=acm" });
          audioData.lastModifiedDate = new Date();
          audioData.name = "test.wav";
          var url = URL.createObjectURL(audioData);
          setURL(url);
          setAudio(audioData);
        }
      };
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      setTimeout(() => {
        mediaRecorder.stop();
        setRecording((state) => !state);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAudio = () => {
    dispatch(verifyGender(gender === "Male" ? 0 : 1));
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="sm" align="center">
        <div className={classes.animation} ref={container}></div>
        <Typography style={{ margin: "2ch 0" }} variant="h2" align="center">
          Get a verified profile Speak the lines
        </Typography>
        <Box align="center" className={classes.lines}>
          <Typography variant="body1" align="left">
            {lines}
          </Typography>
        </Box>
        <Button
          className={classes.mic}
          aria-label="mic"
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
        {!matchesMd && (
          <Divider
            style={{
              margin: "4ch 0 2ch 0",
              backgroundColor: "rgba(255,255,255, 0.5)",
              height: "0.3px"
            }}
          />
        )}
        <Grid
          style={{ margin: "2ch 0" }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Grid item>
            <Typography variant="h4">Select Your Gender</Typography>
          </Grid>
          <Grid item>
            <FormControl size="small" variant="outlined" className={classes.formControl}>
              <InputLabel style={{ color: "#eee" }} id="select-Gender-label">
                Gender
              </InputLabel>
              <Select
                style={{ color: "#eee" }}
                labelId="select-Gender-label"
                id="select-Gender-label"
                value={gender}
                onChange={(event) => {
                  setGender(event.target.value);
                }}
                label="Gender">
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button
          fullWidth={!matchesMd}
          aria-label="verify"
          onClick={handleAudio}
          // disabled={!audio}
          variant="contained"
          color="secondary"
          className={classes.actionButton}>
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
          <Typography variant="subtitle1" align="center" color="Primary" paragraph>
            Already have an account?{" "}
            <Link style={{ textDecoration: "underline" }} to="/auth">
              {" "}
              Login
            </Link>{" "}
            now
          </Typography>
        </div>
      </Container>
    </div>
  );
};

export default VoiceUpload;
