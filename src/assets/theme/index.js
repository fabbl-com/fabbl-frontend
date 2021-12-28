import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

// const colors = [
//   "#075e54",
//   "#12111c",
//   "#131928",
//   "#141826",
//   "#182628",
//   "#19182a",
//   "#200037",
//   "#25274d",
//   "#29648a",
//   "#2e9cca",
//   "#f8f2ce",
//   "#333",
//   "#3b945e",
//   "#464866",
//   "#4d38a2",
//   "#57ba98",
//   "#65ccb8",
//   "#6749dc",
//   "#aaabb8",
//   "#a9f7e0",
//   "#d31d71",
//   "#ef006f"
//   // "#eee"
// ];

export const light = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ["Poppins", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Raleway"
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Open Sans"
      },
      body1: {
        fontSize: "0.9rem"
      },
      body2: {
        fontSize: "0.8rem"
      },
      button: {
        textTransform: "inherit"
      }
    },
    palette: {
      background: {
        paper: "#eee",
        default: "#eee",
        global: "#a9f7e0",
        hover: "#aaabb8",
        warning: "#f8f2ce",
        error: "#ef006f"
      },
      primary: {
        main: "#1976d2"
      },
      secondary: {
        main: "#9c27b0",
        icons: "#009900"
      },
      icons: {
        primary: "#333"
      },
      text: {
        primary: "#12111c",
        secondary: "#333",
        global: "#333"
      },
      card: {
        default: "#fff"
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Open Sans"
      },
      body2: {
        fontSize: "0.8rem"
      },
      button: {
        textTransform: "inherit"
      },
      divider: "#999"
    },
    msg: {
      bg: {
        left: "#fff",
        right: "#6749DB"
      },
      text: {
        left: "#4E5251",
        right: "#eee"
      }
    }
  })
);

export const dark = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: ["Poppins", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Raleway"
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Open Sans"
      },
      body1: {
        fontSize: "0.9rem"
      },
      body2: {
        fontSize: "0.8rem"
      },
      button: {
        textTransform: "inherit"
      }
    },
    palette: {
      background: {
        paper: "#424242",
        default: "#12111c",
        global: "#a9f7e0",
        hover: "#182628",
        warning: "#182628",
        error: "#ef006f"
      },
      primary: {
        main: "#6749dc"
      },
      secondary: {
        main: "#eee",
        icons: "#6749dc"
      },
      icons: {
        primary: "#eee"
      },
      text: {
        primary: "#eee",
        secondary: "#eee",
        global: "#333"
      },
      card: {
        default: "#25274d"
      },
      divider: "#999"
    },
    msg: {
      bg: {
        left: "#25274d",
        right: "#6749DB"
      },
      text: {
        left: "#eee",
        right: "#eee"
      }
    }
  })
);
