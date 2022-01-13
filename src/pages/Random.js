import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "94vh",
    marginTop: theme.spacing(6),
    backgroundColor: "#2e9cca",
    color: "#fff"
  }
}));

const Random = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Container maxWidth="sm" className={classes.root} align="center">
      random
    </Container>
  );
};

export default Random;
