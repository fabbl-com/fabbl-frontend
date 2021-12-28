import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography, Link } from "@material-ui/core";
import lottie from "lottie-web";

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
    height: "100%",
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.background.global,
    color: theme.palette.background.global
  },
  animation: {
    height: "15rem",
    marginTop: theme.spacing(0)
  },
  copyRight: {
    /*
    position: "fixed",
    bottom: "0",
    */
    width: "100%"
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
      animationData: require("../assets/animation/home.json")
    });
  }, []);

  return (
    <Container className={classes.root} maxWidth="sm">
      <Typography variant="h1" component="h2" color="textPrimary">
        Fabbl
      </Typography>
      <Typography component="h1" variant="subtitle1" align="left" color="textPrimary">
        The annonymous messaging app
      </Typography>
      <br />

      <div className={classes.animation} ref={container}></div>

      <div>
        <Typography variant="h3" align="left" color="textPrimary" gutterBottom>
          Welcome To Our Community
        </Typography>
        <Typography variant="subtitle2" color="textPrimary" gutterBottom>
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
