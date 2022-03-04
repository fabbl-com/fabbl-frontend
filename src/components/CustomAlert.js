import React, { useState, useEffect } from "react";
import { Collapse, IconButton, makeStyles } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";

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

const CustomAlert = ({ variant = "outlined", children, color }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  }, [open]);

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          variant={variant}
          severity={color}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}>
              <Close fontSize="inherit" />
            </IconButton>
          }>
          {children}
        </Alert>
      </Collapse>
    </div>
  );
};

CustomAlert.propTypes = {
  children: PropTypes.string.isRequired,
  variant: PropTypes.string,
  color: PropTypes.string.isRequired
};

export default CustomAlert;
