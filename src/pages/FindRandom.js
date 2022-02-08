import React, { useEffect, useState, useRef, useMemo } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Avatar, Typography, IconButton, Button } from "@material-ui/core";
import { randomStyles } from "../assets/jss/index";
import { getRandomUsers, like, getLikes } from "../utils/socket.io";
import { PropTypes } from "prop-types";
import { setRandomUsers } from "../redux/actions/messageActions";
import { setLikes } from "../redux/actions/userActions";
import lottie from "lottie-web";
import profileSearching from "../assets/animation/profileSearching.json";
import matching from "../assets/animation/matching.json";
import { ProfileCard } from "../components";
import TinderCard from "react-tinder-card";
import { Replay, ArrowBack, Close, Favorite } from "@material-ui/icons";
import classNames from "classnames";

const useStyles = makeStyles((theme) => randomStyles(theme));

const SIZE = 10;

const FindRandom = ({ userId, socket, eventEmitter }) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const container1 = useRef(null);
  const container2 = useRef(null);
  const [page, setPage] = useState(1);

  if (!socket) return <div style={{ marginTop: "3rem" }}>Loading...</div>;

  const { loading, error, randomUsers } = useSelector((state) => state.messages);

  useEffect(() => {
    lottie.loadAnimation({
      container: container1.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: matching
    });
    lottie.loadAnimation({
      container: container2.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: profileSearching
    });
  }, [profileSearching, matching]);

  useEffect(() => {
    const data = {
      userId,
      page,
      limit: 10,
      choices: { gender: "female", day: 1 }
    };
    getRandomUsers(socket, data);
    socket.on("get-random-users-response", (data) => {
      dispatch(setRandomUsers(data.users));
    });
  }, [page]);

  useEffect(() => {
    getLikes(socket, eventEmitter);
    eventEmitter.on("like-response", (data) => {
      dispatch(setLikes(data.likes));
    });
  }, [eventEmitter]);

  const [currentIndex, setCurrentIndex] = useState(SIZE - 1);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(SIZE)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < SIZE - 1;

  const canSwipe = currentIndex >= 0;
  const swiped = (direction, id, index) => {
    console.log(direction, id, index);
    // send to likes Array
    if (direction === "right") {
      like(socket, { senderId: userId, receiverId: id });
    }
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < SIZE) {
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <Container maxWidth="sm" className={classes.root} align="center">
      <div className={classes.searchControl}>
        <IconButton>
          <ArrowBack fontSize="small" />
        </IconButton>
      </div>
      {randomUsers.length == 0 ? (
        <>
          <div className={classes.finding}>
            <div className={classes.person}>
              <Typography className={classes.header} align="center" variant="h3">
                Finding someone
              </Typography>
              <Avatar className={classes.avatar} src={"https://bit.ly/3Ez2w7J"} />
            </div>
            <div className={classes.matching} ref={container1} />
            <div className={classes.searchingConatiner}>
              <div className={classes.searching} ref={container2} />
            </div>
          </div>
        </>
      ) : (
        <div className={classes.cardContainer}>
          <div className={classes.profileCardContainer}>
            {randomUsers.map((user, i) => (
              <TinderCard
                key={i}
                ref={childRefs[i]}
                className={classes.profileCard}
                preventSwipe={["up", "down"]}
                onSwipe={(dir) => swiped(dir, user.profile._id, i)}
                onCardLeftScreen={() => outOfFrame(user.profile.displayName.value, i)}>
                <ProfileCard
                  displayName={user.profile.displayName}
                  avatar={user.profile.avatar}
                  headline={user.profile.headline}
                  gender={user.profile.gender}
                  city={user.profile.city}
                  country={user.profile.country}
                  relationshipStatus={user.profile.relationshipStatus}
                  dob={user.profile.dob}
                  isProfileVerified={user.profile.isProfileVerified}
                  hobby={user.profile.hobby}
                />
              </TinderCard>
            ))}
          </div>
          <div className={classes.action}>
            <Button
              disabled={!canGoBack}
              className={classNames(classes.btn, classes.btn_repeat)}
              onClick={() => goBack()}>
              <Replay />
            </Button>
            <Button
              disabled={!canSwipe}
              className={classNames(classes.btn, classes.btn_close)}
              onClick={() => swipe("left")}>
              <Close />
            </Button>
            <Button
              disabled={!canSwipe}
              className={classNames(classes.btn, classes.btn_like)}
              onClick={() => swipe("right")}>
              <Favorite className={classes.like} />
            </Button>
          </div>
        </div>
      )}
    </Container>
  );
};

FindRandom.propTypes = {
  userId: PropTypes.string,
  socket: PropTypes.object,
  eventEmitter: PropTypes.object
};

export default FindRandom;
