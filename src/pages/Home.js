import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography, Link } from "@material-ui/core";
import lottie from "lottie-web";
import animationData from "../assets/animation/home.json";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/cipher10111">
        Cipher
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "94vh",
    marginTop: theme.spacing(6),
    backgroundColor: "#2e9cca",
    color: "#fff"
  },
  animation: {
    height: "16rem",
    marginTop: theme.spacing(0)
  },
  copyRight: {
    marginTop: theme.spacing(3),
    width: "100%",
    height: "2rem",
    position: "fixed",
    bottom: "0",
    left: "0"
  }
}));

const Home = () => {
  const classes = useStyles();
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

  return (
    <Container className={classes.root} maxWidth="sm">
      <Typography variant="h1" component="h2">
        Fabbl
      </Typography>
      <Typography component="h1" variant="subtitle1" align="left">
        The annonymous messaging app
      </Typography>
      <br />
      <div>
        <Typography variant="h3" align="left" gutterBottom>
          Welcome To Our Community
        </Typography>
        <div className={classes.animation} ref={container}></div>
        <Typography variant="subtitle2" gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur Lorem
          ipsum dolor sit amet, consectetur
        </Typography>
      </div>
      <br />

      <Button variant="contained" color="secondary">
        Get Started
      </Button>

      <br />
      <div className={classes.copyRight} align="center">
        <Copyright />
      </div>
    </Container>
  );
};

export default Home;
