import React, { useEffect, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Container, Typography, useMediaQuery, useTheme } from "@material-ui/core";
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
    height: `calc(100vh - ${theme.spacing(1)}px)`,
    marginTop: theme.spacing(6),
    backgroundColor: "#2e9cca",
    color: "#fff"
  },
  animation: {
    height: "28rem",
    width: "38.13rem",
    // marginTop: theme.spacing(-5),
    [theme.breakpoints.down("md")]: {
      display: "none"
    }
  },
  content: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 0,
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      alignItems: "top",
      justifyContent: "center",
      marginTop: theme.spacing(6),
      paddingTop: theme.spacing(7)
    },
    [theme.breakpoints.up("md")]: {
      height: "100%"
    }
  },
  copyRight: {
    marginTop: theme.spacing(3),
    width: "100%",
    height: "2rem",
    position: "fixed",
    bottom: "0",
    left: "0"
  },
  btn: {
    borderRadius: theme.spacing(3),
    boxShadow: theme.shadows[16],
    padding: "1ch 3ch",
    [theme.breakpoints.down("md")]: {
      borderRadius: theme.spacing(0.5)
    }
  },
  headline: {}
}));

const Home = () => {
  const container = useRef(null);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const theme = useTheme();
  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const classes = useStyles(matchesMd);

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
        <Container
          align={matchesMd ? "center" : "left"}
          style={{ margin: 0, paddingLeft: !matchesMd && 0 }}
          maxWidth="sm">
          <Typography
            variant="h1"
            className={classes.headline}
            align={matchesMd ? "center" : "left"}>
            The anonymous messaging app
          </Typography>
          <br />
          <div>
            <Typography variant="h3" align={matchesMd ? "center" : "left"} gutterBottom>
              Welcome To Our Community
            </Typography>
            <Typography style={{ color: "#b8c4c2" }} variant="body1" gutterBottom>
              With fabbl, get the fast,simple, secure messaging and connect with millions of people
              like you for free*, available on phones all over the world.
            </Typography>
          </div>
          <br />
          <Link to="/find">
            <Button
              fullWidth={matchesMd}
              className={classes.btn}
              variant="contained"
              color="secondary"
              aria-label="get started">
              Get Started
            </Button>
          </Link>
        </Container>
        <div>
          <img className={classes.animation} src={demoImage} alt="demo" />
        </div>
      </Container>
      {/* <div className={classes.copyRight} align="center">
        <Copyright />
      </div> */}
    </div>
  );
};

export default Home;
