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
  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h1" align="center" color="textPrimary" gutterBottom>
        Fabble
      </Typography>
      <br />
      <div className={classes.root}>
        <Typography variant="h3" align="center" color="textPrimary" paragraph>
          The annonymous messaging app
        </Typography>
      </div>
      <br />
      <Grid container direction="row" justify="center" spacing={4}>
        <Grid item>
          <Button variant="contained" color="secondary">
            Button 1
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary">
            Button 2
          </Button>
        </Grid>
      </Grid>
      <br />
    </Container>
  );
};

export default Home;
