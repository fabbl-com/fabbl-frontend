import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Switch, FormControlLabel, Avatar, Typography } from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import { randomStyles } from "../assets/jss/index";
import { getRandomUsers } from "../utils/socket.io";
import { PropTypes } from "prop-types";
import { setRandomUsers } from "../redux/actions/messageActions";
const useStyles = makeStyles((theme) => randomStyles(theme));

const Random = ({ userId, socket, eventEmitter }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [isOfflineuser, setofflineuser] = useState(false);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  if (!socket) return <div>Loading...</div>;

  useEffect(() => {
    const data = {
      userId,
      page,
      limit: 10,
      choices: { gender: "female", day: 1 }
    };
    getRandomUsers(socket, data);
    socket.on("get-random-users-response", (data) => {
      console.log(data);
      dispatch(setRandomUsers(data.users));
    });
  }, [page]);

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

Random.propTypes = {
  userId: PropTypes.string,
  socket: PropTypes.object,
  eventEmitter: PropTypes.object
};

export default Random;
