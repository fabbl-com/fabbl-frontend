import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
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

import { Navbar } from "./components";
import { checkAuth } from "./redux/actions/userActions";
import PrivateRoute from "./PrivateRoute";
const events = require("events");

const ENDPOINT = "http://localhost:4000";

const App = () => {
  const [isTheme, setTheme] = useState(false);
  const [socket, setSocket] = useState(null);
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId") || null;

  const eventEmitter = new events.EventEmitter();

  const { isAuth, authChecking } = useSelector((state) => state.user);

  useEffect(() => {
    // console.log(userId);
    let newSocket;
    if (userId) {
      newSocket = io(ENDPOINT, { reconnectionDelayMax: 10000, query: `userId=${userId}` });
      setSocket(newSocket);
    }

    dispatch(checkAuth());
    // return () => newSocket.off();
  }, []);

  // console.log(isAuth);

  const appliedTheme = createTheme(isTheme ? dark : light);

  if (authChecking) return <span>loading...</span>;

  return (
    <ThemeProvider theme={appliedTheme}>
      <Router>
        <Suspense fallback={<span>loading...</span>}>
          <CssBaseline />
          <Navbar isTheme={isTheme} setTheme={setTheme} />
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
            <PrivateRoute isAuth={isAuth} path="/profile">
              <Profile isTheme={isTheme} setTheme={setTheme} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/settings">
              <Settings userId={userId} isTheme={isTheme} setTheme={setTheme} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/edit/personal-data">
              <PersonalData userId={userId} />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/edit/security-data">
              <SecurityData />
            </PrivateRoute>
            <PrivateRoute isAuth={isAuth} path="/find">
              <FindRandom userId={userId} socket={socket} eventEmitter={eventEmitter} />
            </PrivateRoute>
            <Route path="/auth" render={() => <Auth isAuth={isAuth} />} />
            <Route path="/image" render={() => <ImageUpload userId={userId} />} />
            <Route path="/verify-voice" render={() => <VerifyVoice />} />
            <Route path="/user/verify-email" render={() => <VerifyEmail />} />
            <Route path="/user/reset-password" render={() => <ResetPassword userId={userId} />} />
          </Switch>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
