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
    background: theme.palette.card.default,
    borderRadius: theme.spacing(3),
    padding: theme.spacing(2, 1),
    height: "530px",
    maxWidth: "450px",
    minWidth: "300px"
  },
  avatar: {
    height: "8rem",
    width: "8rem",
    marginTop: theme.spacing(2)
  },
  mtb1: {
    margin: theme.spacing(1, 0),
    lineHeight: "16px"
  },
  divider: {
    backgroundColor: "#abb",
    height: "0.7px"
  },
  check: {
    position: "absolute",
    fontSize: theme.spacing(2)
  },
  testUser: {
    position: "absolute",
    right: "10px",
    top: "10px",
    padding: "0.2ch 0.3ch"
  }
}));

const ProfileCard = ({
  displayName,
  avatar,
  headline,
  gender,
  location,
  relationshipStatus,
  dob,
  hobby,
  isProfileVerified,
  isTestUser = false
}) => {
  const classes = useStyles();

  const mapToString = (value) => {
    const arr = ["Single", "Commited", "Married", "Broken Heart"];
    return arr[value];
  };

  const age = parseInt((new Date() - new Date(dob.value)) / (365 * 24 * 60 * 60 * 1000));

  return (
    <Card elevation={4} className={classes.card}>
      <CardContent align="center">
        {isTestUser && (
          <Button color="primary" variant="outlined" className={classes.testUser}>
            Test User
          </Button>
        )}
        <Avatar variant="rounded" className={classes.avatar} src={avatar.value} />
        <div className={classes.status}>
          <Favorite style={{ color: "#ec5e6f" }} fontSize="small" />
          &nbsp;&nbsp;
          <Typography align="center" variant="body1" component="p">
            {mapToString(relationshipStatus.value)}
          </Typography>
        </div>
        <div className={classes.status}>
          <LocationOn style={{ color: "#5D8BF4" }} fontSize="small" />
          &nbsp;&nbsp;
          <Typography align="center" variant="body1" component="p">
            {location.value}
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
  location: PropTypes.object,
  relationshipStatus: PropTypes.object,
  dob: PropTypes.object,
  hobby: PropTypes.object,
  isProfileVerified: PropTypes.bool,
  isTestUser: PropTypes.bool.isRequired
};

export default ProfileCard;
