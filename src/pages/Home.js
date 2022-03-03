import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography } from "@material-ui/core";
import lottie from "lottie-web";
import queryString from "query-string";
import animationData from "../assets/animation/home.json";
import { useDispatch } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { setUser } from "../redux/actions/userActions";
import demoImage from "../assets/logo/Asset 1.png";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" to="https://github.com/cipher10111">
        Cipher
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: `calc(100vh - ${theme.spacing(6)}px)`,
    marginTop: theme.spacing(6),
    backgroundColor: "#2e9cca",
    color: "#fff"
  },
  animation: {
    height: "28rem",
    width: "38.13rem",
    marginTop: theme.spacing(-5),
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "100%",
    marginTop: theme.spacing(-5),
    [theme.breakpoints.down("md")]: {
      alignItems: "top"
    }
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
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    var query = queryString.parse(location?.search);
    console.log(query);
    if (query.userId) {
      dispatch(setUser(query.userId));
    }
    history.push("/");
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
  }, []);

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.content}>
        <Container maxWidth="sm">
          <Typography variant="h1" align="left">
            The annonymous messaging app
          </Typography>
          <br />
          <div>
            <Typography variant="h3" align="left" gutterBottom>
              Welcome To Our Community
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
              Lorem ipsum dolor sit amet, consectetur Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Quos blanditiis tenetur Lorem ipsum dolor sit amet, consectetur
            </Typography>
          </div>
          <br />
          <Link to="/find">
            <Button variant="contained" color="secondary" aria-label="get started">
              Get Started
            </Button>
          </Link>
        </Container>
        <div>
          <img className={classes.animation} src={demoImage} alt="demo" />
        </div>
      </Container>
      <div className={classes.copyRight} align="center">
        <Copyright />
      </div>
    </div>
  );
};

export default Home;
