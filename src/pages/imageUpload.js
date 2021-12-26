import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Box,
  Button,
  Grid
} from "@material-ui/core";
import Circle from "@material-ui/icons/FiberManualRecord";
import AddAPhotofrom from "@material-ui/icons/AddAPhotoRounded";
import AccountCircle from "@material-ui/icons/AccountCircleRounded";

import { FacebookIcon, GoogleIcon } from "../assets/icons/index";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "92vh",
    backgroundColor: "#a9f7e0",
    marginTop: "3rem"
  },
  authControll: {
    backgroundColor: "#fff",
    height: "2.2rem",
    width: "100%",
    position: "fixed",
    bottom: "0",
    left: "0"
  }
}));

const ImageUpload = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  return (
    <Container maxWidth="sm" className={classes.root}>
      <Typography variant="h5" align="center" color="textPrimary">
        Upload Your avatar
      </Typography>

      <Grid container direction="column" justify="center">
        <Grid item>
          <Button type="submit" variant="contained">
            Upload
          </Button>
        </Grid>
        <Grid item>
          <Button>Skip</Button>
        </Grid>
      </Grid>

      <Box align="center">
        <Circle fontSize="small" color="secondary" />
        <Circle fontSize="small" color="primary" />
        <Circle fontSize="small" color="primary" />
      </Box>

      <div className={classes.authControll}>
        <Typography variant="subtitle1" align="center" color="textPrimary" paragraph>
          Already have an account? Login now
        </Typography>
      </div>
    </Container>
  );
};

export default ImageUpload;
