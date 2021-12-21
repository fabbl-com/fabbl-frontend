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
      <Typography component="h1" variant="h1" align="left" color="textPrimary" gutterBottom>
        Fabble
      </Typography>
      <Typography component="h1" variant="subtitle1" align="left" color="textPrimary" gutterBottom>
        The annonymous messaging app
      </Typography>
      <br />
      <div className={classes.root}>
        <Typography variant="h3" align="left" color="textPrimary" paragraph>
          Welcome To Our Community
        </Typography>
      </div>
      <br />
      <Grid container direction="row" spacing={4}>
        <Grid item>
          <Button variant="contained" color="secondary">
            EXPLORE
          </Button>
        </Grid>
        <Grid item>
          <Button variant="outlined" color="secondary">
            LOGIN
          </Button>
        </Grid>
      </Grid>
      <br />
    </Container>
  );
};

export default Home;
