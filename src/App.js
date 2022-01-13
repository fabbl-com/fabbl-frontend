import React from "react";
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
  Random
} from "./pages";
import { Navbar } from "./components";

const App = () => {
  const [isTheme, setTheme] = React.useState(false);

  const appliedTheme = createTheme(isTheme ? dark : light);

  return (
    <React.Fragment>
      <Router>
        <ThemeProvider theme={appliedTheme}>
          <Router>
            <CssBaseline />
            <Navbar isTheme={isTheme} setTheme={setTheme} />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route
                path="/chat"
                component={() => <Chat isTheme={isTheme} setTheme={setTheme} />}
              />
              <Route
                path="/chat-details"
                component={() => <ChatDetails isTheme={isTheme} setTheme={setTheme} />}
              />
              <Route
                path="/profile"
                component={() => <Profile isTheme={isTheme} setTheme={setTheme} />}
              />
              <Route
                path="/settings"
                component={() => <Settings isTheme={isTheme} setTheme={setTheme} />}
              />
              <Route path="/auth" component={Auth} />
              <Route path="/image" component={ImageUpload} />
              <Route path="/verifyvoice" component={VerifyVoice} />
              <Route path="/random" component={Random} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
