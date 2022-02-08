import React, { useEffect, useRef } from "react";
import queryString from "query-string";
import { makeStyles } from "@material-ui/core/styles";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../redux/actions/userActions";
import { Typography } from "@material-ui/core";
import lottie from "lottie-web";
import verifySuccess from "../assets/animation/verifySuccess.json";
import verifyFail from "../assets/animation/verifyFail.json";
import fabbl from "../assets/logo/fabbl.png";

const useStyles = makeStyles((theme) => ({
  root: {
    color: "#fff",
    marginTop: "3rem"
  },
  card: {
    marginBottom: theme.spacing(3),
    color: "#00a92a",
    backgroundColor: "#fff",
    width: "95%",
    maxWidth: "600px",
    margin: "6rem auto",
    textAlign: "center",
    boxSizing: "border-box",
    padding: "40px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)"
  },
  logo: {
    width: "100px",
    height: "100px"
  },
  verify: {
    margin: "0 auto",
    width: "200px",
    height: "200px"
  },
  link: {
    width: "100%",
    margin: "0 auto",
    textAlign: "center",

    "& a": {
      background: "#414141",
      padding: "20px",
      display: "inline-block",
      "&:hover": {
        background: "#5f5f5f"
      },
      width: "100px"
    }
  }
}));

const useQuery = () => {
  return queryString.parse(useLocation()?.search);
};

const VerifyEmail = () => {
  const query = useQuery();
  const dispatch = useDispatch();
  const container = useRef(null);
  const classes = useStyles();

  const { isEmailVerified, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isEmailVerified) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: verifySuccess
      });
    } else if (error) {
      lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: verifyFail
      });
    }
  }, [verifySuccess, verifyFail, isEmailVerified, error]);

  useEffect(() => {
    if (query?.token) dispatch(verifyEmail(query.token));
  }, []);

  if (loading) return <div>Loading...</div>;
  return (
    <div className={classes.root}>
      {!loading && (
        <>
          <div style={{ color: isEmailVerified ? "#00a92a" : "#f00" }} className={classes.card}>
            {/* <img className={classes.logo} src={fabbl} alt="Logo" /> */}
            <Typography component="h3" variant="h4">
              {isEmailVerified && !error
                ? "Email Verified"
                : error.code == 500
                ? "Email verification failed!"
                : "Verification email timout expired!"}
            </Typography>
            <div className={classes.verify} ref={container} />
            <Typography component="h5" variant="h6">
              {isEmailVerified
                ? `Thanks, we're so happy to have you on our platform`
                : "Please try again..."}
            </Typography>
          </div>
          <div className={classes.link}>
            <Link to="/">Go Home</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default VerifyEmail;
