import React from "react";
import { Button, makeStyles } from "@material-ui/core";

const tagsColor = [
  "#000000",
  "#172774",
  "#544179",
  "#0F044C",
  "#14274E",
  "#B000B9",
  "#0B4619",
  "#483434"
];

const useStyles = makeStyles((theme) => ({
  tags: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(0.2, 1.2),
    textTransform: "lowercase",
    minWidth: "auto",
    margin: theme.spacing(1, 1, 0, 0),
    border: "0.5px solid #aaabb8"
  }
}));

const Tags = ({ tags }) => {
  const classes = useStyles();
  return tags.map((tag, i) => (
    <Button
      style={{ backgroundColor: tagsColor[i % tagsColor.length], color: "#eee" }}
      disableRipple
      aria-label="tag"
      variant="text"
      size="small"
      className={classes.tags}
      key={i}>
      {tag}
    </Button>
  ));
};

export default Tags;
