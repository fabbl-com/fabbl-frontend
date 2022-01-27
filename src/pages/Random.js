import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Switch, FormControlLabel, Avatar, Typography } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { randomStyles } from "../assets/jss/index";
const useStyles = makeStyles((theme) => randomStyles(theme));

const Random = () => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isOfflineuser, setofflineuser] = useState(false);

  return (
    <Container maxWidth="sm" className={classes.root} align="center">
      <div className={classes.searchControl}>
        <ArrowBack fontSize="small" style={{ marginTop: ".15rem" }} />
        <FormControlLabel
          control={<Switch size="small" onChange={() => setofflineuser(!isOfflineuser)} />}
          label="Offline User"
        />
      </div>
      <Avatar variant="rounded" className={classes.image} src={"https://bit.ly/3Ez2w7J"} />
      <Typography variant="subtitle1">Finding someone...…</Typography>
    </Container>
  );
};

export default Random;
