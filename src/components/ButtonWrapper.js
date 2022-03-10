import React from "react";
import { ButtonBase, Avatar, makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import classNames from "classnames";

const useStyles = makeStyles(() => ({
  iconWrapper: {
    borderRadius: "12px",
    "&:hover": {
      "& $iconAvatar": {
        background: "#5E35B1 !important",
        color: "#EDE7F6 !important"
      }
    }
  },
  iconAvatar: {
    cursor: "pointer",
    borderRadius: "8px",
    width: "28px",
    height: "28px",
    fontSize: "1.2rem",
    transition: "all .2s ease-in-out",
    background: "#EDE7F6"
  }
}));

const ButtonWrapper = ({ children, className }) => {
  const classes = useStyles();
  return (
    <ButtonBase className={classNames(classes.iconWrapper, className)}>
      <Avatar variant="rounded" className={classes.iconAvatar} alt="avatar">
        {children}
      </Avatar>
    </ButtonBase>
  );
};

ButtonWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired
};

export default ButtonWrapper;
