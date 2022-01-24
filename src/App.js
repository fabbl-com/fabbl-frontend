import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { dark, light } from "./assets/theme";
import {
  Chat,
  ChatDetails,
  Home,
  Auth,
  Profile,
  Settings,
  ImageUpload,
  VerifyVoice,
  Random,
  SecurityData,
  PersonalData
} from "./pages";
import { Navbar } from "./components";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const App = () => {
  const [isTheme, setTheme] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  const appliedTheme = createTheme(isTheme ? dark : light);

  return (
    <Router>
      <ThemeProvider theme={appliedTheme}>
        <Router>
          <CssBaseline />
          <Navbar isTheme={isTheme} setTheme={setTheme} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/chat" component={() => <Chat isTheme={isTheme} setTheme={setTheme} />} />
            <Route
              path="/chat-details"
              component={() => (
                <ChatDetails socket={socket} isTheme={isTheme} setTheme={setTheme} />
              )}
            />
            <Route
              path="/profile"
              component={() => <Profile isTheme={isTheme} setTheme={setTheme} />}
            />
            <Route
              path="/settings"
              component={() => <Settings isTheme={isTheme} setTheme={setTheme} />}
            />
            <Route path="/edit/personal-data" component={PersonalData} />
            <Route path="/edit/security-data" component={SecurityData} />
            <Route path="/auth" component={Auth} />
            <Route path="/image" component={ImageUpload} />
            <Route path="/verifyvoice" component={VerifyVoice} />
            <Route path="/random" component={Random} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Router>
  );
};

export default App;
