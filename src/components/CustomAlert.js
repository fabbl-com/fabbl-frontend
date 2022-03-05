import React, { useState, useEffect } from "react";
import { Collapse, IconButton, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2)
    },
    position: "fixed",
    width: "90%",
    top: theme.spacing(8),
    zIndex: 1,
    left: 0,
    transform: `translateX(5%)`
  }
}));

const CustomAlert = () => {
  const classes = useStyles();
  const alerts = useSelector((state) => state.alert);
  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div key={alert.id} className={classes.root}>
        <Alert variant="filled" severity={alert.alertType}>
          {alert.msg}
        </Alert>
      </div>
    ))
  );
};

export default CustomAlert;
