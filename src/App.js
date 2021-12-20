import React from "react";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { dark, light } from "./assets/theme";
import { Home } from "./pages";
import { Navbar } from "./components";

const App = () => {
  const [isTheme, setTheme] = React.useState(false);

  const appliedTheme = createTheme(isTheme ? dark : light);

  return (
    <React.Fragment>
      <ThemeProvider theme={appliedTheme}>
        <CssBaseline />
        <Navbar isTheme={isTheme} setTheme={setTheme} />
        <Home />
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
