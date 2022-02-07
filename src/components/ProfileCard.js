import React from "react";
import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Divider,
  makeStyles,
  Typography
} from "@material-ui/core";
import { Like, VerifyUserIcon } from "../assets/icons";
import Tags from "./Tags";
import { Close, Favorite, Replay, LocationOn, CheckCircleOutline } from "@material-ui/icons";
import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
  status: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(1, 0)
  },
  card: {
    backgroundColor: "#FDF1F2"
  },
  avatar: {
    height: "8rem",
    width: "8rem",
    marginTop: theme.spacing(2)
  },
  mtb1: {
    margin: theme.spacing(1, 0)
  },
  divider: {
    backgroundColor: "#abb",
    height: "0.7px"
  },
  check: {
    position: "absolute"
  }
}));

const ProfileCard = ({
  displayName,
  avatar,
  headline,
  gender,
  city,
  country,
  relationshipStatus,
  dob,
  hobby,
  isProfileVerified
}) => {
  const classes = useStyles();

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const age = parseInt((new Date() - new Date(dob.value)) / (365 * 24 * 60 * 60 * 1000));
  const location = `${city.value}`;

  return (
    <Card elevation={1} className={classes.card}>
      <CardContent align="center">
        <Avatar variant="rounded" className={classes.avatar} src={avatar.value} />
        <div className={classes.status}>
          <Favorite fontSize="small" />
          &nbsp;&nbsp;
          <Typography align="center" variant="body1" component="p">
            {capitalize(relationshipStatus.value)}
          </Typography>
        </div>
        <div className={classes.status}>
          <LocationOn fontSize="small" />
          &nbsp;&nbsp;
          <Typography align="center" variant="body1" component="p">
            {location}
          </Typography>
        </div>
        <Typography className={classes.mtb1} variant="h5" component="h2">
          {displayName.value}
          <span>, {age}</span>
          &nbsp;
          {!isProfileVerified && <CheckCircleOutline color="primary" className={classes.check} />}
        </Typography>
        <Typography variant="body1" component="p">
          {headline.value ||
            "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica"}
        </Typography>
      </CardContent>
      <Divider className={classes.divider} />
      <CardContent>
        <Typography variant="h5" gutterBottom component="h5">
          Hobbies & Interests
        </Typography>
        <Tags tags={hobby.value} />
      </CardContent>
    </Card>
  );
};

ProfileCard.propTypes = {
  displayName: PropTypes.object,
  avatar: PropTypes.object,
  headline: PropTypes.object,
  gender: PropTypes.object,
  city: PropTypes.object,
  country: PropTypes.object,
  relationshipStatus: PropTypes.object,
  dob: PropTypes.object,
  hobby: PropTypes.object,
  isProfileVerified: PropTypes.bool
};

export default ProfileCard;
