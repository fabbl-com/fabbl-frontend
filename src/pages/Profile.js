import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  makeStyles,
  Avatar,
  Typography,
  IconButton,
  Button,
  Box,
  Container
} from "@material-ui/core";
import {
  KeyboardBackspace,
  Report,
  LocationOn,
  Cake,
  FavoriteBorder,
  CheckCircleOutlined,
  Edit
} from "@material-ui/icons";
import { useParams, useLocation, useHistory } from "react-router-dom";
import { profileStyles } from "../assets/jss";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../redux/actions/userActions.js";
import Tags from "../components/Tags";
const useStyles = makeStyles((theme) => profileStyles(theme));
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

const Profile = ({ userId }) => {
  const classes = useStyles();
  let { profile, loading } = useSelector((state) => state.user);
  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getUserProfile(id));
  // }, [getUserProfile]);

  console.log(profile);
  const goBack = (e) => {
    e.preventDefault();
    history.push(location.from || "/");
  };

  if (loading) return <div>loading</div>;
  return (
    <Container className={classes.root}>
      <div className={classes.profileHeader}>
        <IconButton color="primary" onClick={goBack}>
          <KeyboardBackspace />
        </IconButton>
        <Typography component="h6" variant="h6">
          {profile.displayName.value} `s profile
        </Typography>
        <IconButton
          className={classes.report}
          href={id === userId ? "/edit/personal-data" : "/report"}>
          {id !== userId ? <Report /> : <Edit color="primary" />}
        </IconButton>
      </div>
      <div className={classes.profileBody}>
        <Avatar src={profile.avatar.value} className={classes.avatar} variant="rounded" />
        <Box mt={2}>
          <Typography component="h1" variant="h1">
            {profile.displayName.value}
          </Typography>
        </Box>
        <Box className={classes.verify} m={1}>
          <Typography component="h4" variant="h4">
            {profile.gender.value === 0 ? "Male" : "Female"}
          </Typography>
          &nbsp;
          {profile.isProfileVerified && <CheckCircleOutlined fontSize="small" />}
        </Box>
        <div className={classes.location}>
          <LocationOn fontSize="small" />
          {"  "}
          <Typography component="h6" variant="h6">
            {profile.location.value}
          </Typography>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Cake fontSize="small" />
          &nbsp;
          <Typography component="h3">
            {Math.floor((new Date() - new Date(profile.dob.value)) / (365 * 24 * 60 * 60 * 1000))}{" "}
            Years Old
          </Typography>
        </div>
        <Box mb={1}>
          <Typography
            className={classes.bio}
            align="center"
            component="h3"
            variant="subtitle1"
            gutterBottom>
            {profile.headline.value}
          </Typography>
        </Box>
        {/* <Divider width="100%" className={classes.divider} /> */}
        <div className={classes.hobby}>
          <Typography align="center" component="h3" variant="h4">
            Hobbies & Interest
          </Typography>
          <Box align="center">
            <Tags tags={profile.hobby.value || []} />
          </Box>
        </div>

        {id === userId || (
          <Button
            className={classes.favorite}
            variant="contained"
            color="secondary"
            aria-label="add friend">
            Add To Friends &nbsp;&nbsp;&nbsp;
            <FavoriteBorder />
          </Button>
        )}
      </div>
    </Container>
  );
};
Profile.propTypes = {
  userId: PropTypes.string.isRequired
};

export default Profile;
