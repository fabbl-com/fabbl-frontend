import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { dark, light } from "./assets/theme";
import { Navbar } from "./components";
import routes from "./router";

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
              {routes.map((route, index) => (
                <Route
                  exact
                  key={index}
                  path={route.path}
                  component={(isTheme, setTheme) => route.component(isTheme, setTheme)}
                />
              ))}
            </Switch>
          </Router>
        </ThemeProvider>
      </Router>
    </React.Fragment>
  );
};

export default App;
