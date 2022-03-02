import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import notFoundSvg from "../assets/animation/404.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${notFoundSvg})`,
    height: "100vh",
    backgroundPosition: " center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "80vw 90vh",
    [theme.breakpoints.down("md")]: {
      backgroundPosition: " top"
    }
  },
  button: {
    marginTop: "40vh"
  }
}));

const NotFound = () => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.root}>
        {" "}
        <center>
          <Button className={classes.button} variant="outlined" color="primary" href={"/"}>
            {" "}
            Go Home
          </Button>
        </center>
      </div>
    </>
  );
};

export default NotFound;
