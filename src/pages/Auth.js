import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}));

const Home = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return <Container maxWidth="sm">LOGIN page</Container>;
};

export default Home;
