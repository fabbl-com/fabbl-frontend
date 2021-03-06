import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Container, Avatar, Typography, IconButton, Button } from "@material-ui/core";
import { randomStyles } from "../assets/jss/index";
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
import { SET_RANDOM_USERS_REQUEST } from "../redux/constants/messageActionTypes";

const useStyles = makeStyles((theme) => randomStyles(theme));

const SIZE = 5;

const FindRandom = ({ userId, socket }) => {
  const theme = useTheme();
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const container1 = useRef(null);
  const container2 = useRef(null);
  const [page, setPage] = useState(1);
  const [currentIndex, setCurrentIndex] = useState(SIZE - 1);
  const currentIndexRef = useRef(currentIndex);

  if (!socket) return <div style={{ marginTop: "3rem" }}>Loading...</div>;

  console.log(currentIndex);

  const { error, randomUsers } = useSelector((state) => state.messages);
  const isFinding = useSelector((state) => state.messages?.loading);
  const { loading, profile } = useSelector((state) => state.user);

  if (!loading && !profile?.isProfileCompleted)
    history.push({ pathname: "/edit/personal-data", state: { from: location } });

  useEffect(() => {
    if (isFinding) {
      const anim1 = lottie.loadAnimation({
        container: container1.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: matching
      });
      const anim2 = lottie.loadAnimation({
        container: container2.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: profileSearching
      });
      return () => {
        anim1.destroy();
        anim2.destroy();
      };
    }
  }, [profileSearching, matching, isFinding]);

  useEffect(() => {
    const data = {
      userId,
      page,
      limit: SIZE,
      choices: { day: 1 }
    };
    socket.emit("get-random-users", data);
    dispatch({ type: SET_RANDOM_USERS_REQUEST });
    socket.on("get-random-users-response", (data) => dispatch(setRandomUsers(data.users)));

    return () => socket.off();
  }, [page, socket]);

  useEffect(() => {
    socket.on("like-response", (data) => dispatch(setLikes(data.likes)));
    socket.on("reload-response", (data) => console.log(data));

    return () => {
      socket.off();
    };
  }, [socket]);

  useEffect(() => {
    if (currentIndex === -1) {
      setPage((state) => state + 1);
      setCurrentIndex(SIZE - 1);
    }
  }, [currentIndex]);

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
    const data = { senderId: userId, receiverId: id };
    if (direction === "right") {
      socket.emit("like", data);
    }
    socket.emit("view", data);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipe = (dir) => {
    if (canSwipe && currentIndex < SIZE) {
      console.log(childRefs[currentIndex], childRefs);
      childRefs[currentIndex].current.swipe(dir);
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    socket.emit("reload", { senderId: userId, receiverId: randomUsers[newIndex].id });
    await childRefs[newIndex].current.restoreCard();
    console.log(randomUsers[newIndex], childRefs);
  };

  console.log(childRefs[0].current, childRefs[1], childRefs[4]);

  return (
    <div className={classes.root}>
      <Container style={{ height: "100%" }} maxWidth="sm" align="center">
        <div className={classes.searchControl}>
          <IconButton onClick={() => history.goBack()}>
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
                <Avatar className={classes.avatar} src={profile.avatar.value} />
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
              {randomUsers
                .sort((a, b) => a.score - b.score)
                .map((user, i) => (
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
                      location={user.profile.location}
                      relationshipStatus={user.profile.relationshipStatus}
                      dob={user.profile.dob}
                      isProfileVerified={user.profile.isProfileVerified}
                      hobby={user.profile.hobby}
                      isTestUser={user.profile.isTestUser || false}
                    />
                  </TinderCard>
                ))}
            </div>
            <div className={classes.action}>
              <Button
                disabled={!canGoBack}
                aria-label="back"
                className={classNames(classes.btn, classes.btn_repeat)}
                onClick={() => goBack()}>
                <Replay />
              </Button>
              <Button
                disabled={!canSwipe}
                aria-label="left"
                className={classNames(classes.btn, classes.btn_close)}
                onClick={() => swipe("left")}>
                <Close />
              </Button>
              <Button
                disabled={!canSwipe}
                aria-label="right"
                className={classNames(classes.btn, classes.btn_like)}
                onClick={() => swipe("right")}>
                <Favorite className={classes.like} />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </div>
  );
};

FindRandom.propTypes = {
  userId: PropTypes.string,
  socket: PropTypes.object
};

export default FindRandom;
