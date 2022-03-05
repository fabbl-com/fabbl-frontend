import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline, useMediaQuery } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { dark, light } from "./assets/theme";
const Auth = lazy(() => import("./pages/Auth"));
const Chat = lazy(() => import("./pages/Chat"));
const ChatDetails = lazy(() => import("./pages/ChatDetails"));
const FindRandom = lazy(() => import("./pages/FindRandom"));
const ImageUpload = lazy(() => import("./pages/ImageUpload"));
const PersonalData = lazy(() => import("./pages/PersonalData"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const SecurityData = lazy(() => import("./pages/SecurityData"));
const Settings = lazy(() => import("./pages/Settings"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const VerifyVoice = lazy(() => import("./pages/VerifyVoice"));

const Alert = lazy(() => import("./components/CustomAlert"));

// const Loader = lazy(() => import("./components/Loader"));

import Loader from "./components/Loader";

import NotFound from "./pages/NotFound";

const Navbar = lazy(() => import("./components/Navbar"));
const BottomNav = lazy(() => import("./components/BottomNav"));

import { checkAuth } from "./redux/actions/userActions";
import PrivateRoute from "./PrivateRoute";
const events = require("events");

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const App = () => {
  const _isTheme = localStorage.getItem("theme")
    ? JSON.parse(localStorage.getItem("theme"))
    : false;
  const [isTheme, setTheme] = useState(_isTheme);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const eventEmitter = new events.EventEmitter();

  const { userId, isAuth, authChecking } = useSelector((state) => state.user);

  useEffect(() => {
    console.log(userId);
    let newSocket;
    if (userId) {
      newSocket = io(ENDPOINT, { reconnectionDelayMax: 10000, query: `userId=${userId}` });
      setSocket(newSocket);
      newSocket.on("connect_error", (err) => console.log(err.message));
      newSocket.on("error", (err) => console.log(err.message));
    }

    return () => newSocket && newSocket.off();
  }, [userId]);

  useEffect(() => dispatch(checkAuth()), []);
  useEffect(() => setTheme(_isTheme), [_isTheme]);

  const appliedTheme = createTheme(isTheme ? dark : light);
  const matchesMd = useMediaQuery(appliedTheme.breakpoints.up("sm"));

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Suspense fallback={<Loader />}>
          <CssBaseline />
          <Navbar
            matchesMd={matchesMd}
            userId={userId}
            socket={socket}
            isTheme={isTheme}
            setTheme={setTheme}
          />
          <Alert />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <PrivateRoute isAuth={isAuth} path="/chat">
              <Chat
                userId={userId}
                socket={socket}
                eventEmitter={eventEmitter}
                isTheme={isTheme}
                setTheme={setTheme}
              />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/chat-details">
              <ChatDetails
                userId={userId}
                socket={socket}
                eventEmitter={eventEmitter}
                isTheme={isTheme}
                setTheme={setTheme}
              />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/profile/:id">
              <Profile isTheme={isTheme} userId={userId} setTheme={setTheme} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/settings">
              <Settings userId={userId} isTheme={isTheme} setTheme={setTheme} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/edit/personal-data">
              <PersonalData userId={userId} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/edit/security-data">
              <SecurityData userId={userId} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/find">
              <FindRandom userId={userId} socket={socket} eventEmitter={eventEmitter} />
            </PrivateRoute>
            <Route path="/auth" render={() => <Auth />} />
            <Route path="/image" render={() => <ImageUpload userId={userId} />} />
            <Route path="/verify-voice" render={() => <VerifyVoice />} />
            <Route path="/user/verify-email" render={() => <VerifyEmail />} />
            <Route path="/user/reset-password" render={() => <ResetPassword userId={userId} />} />
            <Route component={NotFound} />
          </Switch>
          {!matchesMd && <BottomNav isAuth={isAuth} />}
          {authChecking && <Loader />}
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
