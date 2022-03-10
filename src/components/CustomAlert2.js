import React, { useState } from "react";
import { makeStyles, IconButton, Collapse } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    position: "fixed",
    width: "90%",
    top: theme.spacing(8),
    zIndex: 1333,
    left: 0,
    transform: `translateX(5%)`
  }
}));

const CustomAlert2 = ({ isProfileCompleted, isProfileVerified, isEmailVerified }) => {
  const classes = useStyles();
  const [open1, setOpen1] = useState(true);
  const [open2, setOpen2] = useState(true);
  const [open3, setOpen3] = useState(true);

  return (
    <div className={classes.root}>
      {!isProfileVerified && (
        <Collapse in={open1}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpen1(false)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            Your profile is not verified. Please verify your gender to get a verified profile
          </Alert>
        </Collapse>
      )}
      {!isProfileCompleted && (
        <Collapse in={open2}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpen2(false)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            Your profile is not completed. Please complete your profile
          </Alert>
        </Collapse>
      )}
      {!isEmailVerified && (
        <Collapse in={open3}>
          <Alert
            severity="info"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setOpen3(false)}>
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }>
            Your email is not verified. Please verify your email
          </Alert>
        </Collapse>
      )}
    </div>
  );
};

CustomAlert2.propTypes = {
  isProfileCompleted: PropTypes.bool.isRequired,
  isProfileVerified: PropTypes.bool.isRequired,
  isEmailVerified: PropTypes.bool.isRequired
};

export default CustomAlert2;
