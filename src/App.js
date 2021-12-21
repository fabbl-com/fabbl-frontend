import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { dark, light } from "./assets/theme";
import { Chat, Home, Auth } from "./pages";
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
              <Route path="/chat" component={Chat} />
              <Route path="/auth" component={Auth} />
            </Switch>
          </Router>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
