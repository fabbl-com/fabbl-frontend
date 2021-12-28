import React from "react";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Divider,
  Container
} from "@material-ui/core";
import {
  KeyboardBackspace,
  Report,
  LocationOn,
  Cake,
  FavoriteBorder,
  CheckCircleOutlined
} from "@material-ui/icons";

import { ProfileStyles } from "../assets/jss";

const useStyles = makeStyles((theme) => ProfileStyles(theme));
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

const Profile = () => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary">
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">{`uuid's Profile`}</Typography>
        <IconButton className={classes.report}>
          <Report />
        </IconButton>
      </div>
      <div className={classes.profileBody}>
        <Avatar
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
          className={classes.avatar}
          variant="rounded"
        />
        <div className={classes.verify}>
          <Typography component="h6" variant="h6">
            Female
          </Typography>
          &nbsp;
          <CheckCircleOutlined fontSize="small" />
        </div>
        <Typography component="h3" variant="h3">
          Username
        </Typography>
        <div className={classes.location}>
          <LocationOn fontSize="small" />
          {"  "}
          <Typography component="h6" variant="h6">
            Location
          </Typography>
        </div>
        <Divider width="100%" className={classes.divider} />
        <div>
          <Typography align="center" component="h3" variant="h4">
            Bio
          </Typography>
          <Typography className={classes.bio} align="center" variant="body1">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut natus voluptates sunt
            rerum,quos delectus earum perferendis animi molestiae aperiam a voluptas ex nesciunt
            veniam tempore? Iste mollitia quod aut?
          </Typography>
        </div>
        <div className={classes.dob}>
          <Cake />
          &nbsp;&nbsp;&nbsp;
          <Typography align="center" component="h3" variant="body1">
            22 Years Old
          </Typography>
        </div>
        <Divider width="100%" className={classes.divider} />
        <div className={classes.hobby}>
          <Typography align="center" component="h3" variant="h4">
            Hobbies & Interest
          </Typography>
          {["Hobby 1", "Hobby 2", "Hobby 3", "Hobby 4", "Hobby 5"].map((tag, i) => (
            <Button
              disableRipple
              style={{ backgroundColor: tagsColor[i % tagsColor.length], color: "#eee" }}
              size="small"
              className={classes.tags}
              key={i}>
              {tag}
            </Button>
          ))}
        </div>
        <Button className={classes.favorite} variant="contained" color="secondary">
          Add To Friends &nbsp;&nbsp;&nbsp;
          <FavoriteBorder />
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
