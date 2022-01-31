import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  tags: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0.3, 1),
    textTransform: "lowercase",
    minWidth: "auto",
    margin: theme.spacing(1, 1, 0, 0)
  }
}));

const Tags = ({ tags, color }) => {
  const classes = useStyles();
  return tags.map((tag, index) => (
    <Button
      disableRipple
      variant="text"
      style={
        {
          // backgroundColor: "#eee"
        }
      }
      size="small"
      className={classes.tags}
      key={index}>
      #{tag}
    </Button>
  ));
};

export default Tags;
