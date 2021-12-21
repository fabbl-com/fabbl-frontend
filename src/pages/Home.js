import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Button, Container, Grid, Typography, Link } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/cipher10111">
        Cipher
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(() => ({
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
      <Copyright />
    </Container>
  );
};

export default Home;
