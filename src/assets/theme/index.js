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
      subtitle2: {
        fontSize: "0.75rem",
        fontWeight: 400,
        color: "#9E9E9E"
      },
      subtitle1: {
        fontSize: "0.875rem",
        fontWeight: 500
      },
      h6: {
        fontWeight: 500,
        fontSize: "0.75rem"
      },
      h5: {
        fontSize: "0.875rem",
        fontWeight: 500
      },
      h4: {
        fontSize: "1rem",
        fontWeight: 600
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: 600
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 700
      },
      h1: {
        fontSize: "2.5rem !important",
        fontWeight: 700,
        letterSpacing: "2px",
        lineHeight: 1.5,
        textTransform: "uppercase"
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400
      },
      body1: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: "1.334em"
      },
      body2: {
        letterSpacing: "0em",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "1.5rem"
      },
      button: {
        textTransform: "capitalize"
      }
    },
    palette: {
      background: {
        paper: "#eee",
        default: "#eee",
        global: "#a9f7e0",
        hover: "#aaabb8",
        warning: "#f8f2ce",
        error: "#ef006f",
        disabled: "#D1D1D1"
      },
      primary: {
        main: "#1976d2"
      },
      secondary: {
        main: "#5E35B1",
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
      divider: "#333",
      action: {
        focus: "#eee"
      }
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
      subtitle1: {
        fontSize: "0.875rem",
        fontWeight: 500
      },
      subtitle2: {
        fontSize: "0.75rem",
        fontWeight: 400,
        color: "#9E9E9E"
      },
      h6: {
        fontWeight: 500,
        fontSize: "0.75rem"
      },
      h5: {
        fontSize: "0.875rem",
        fontWeight: 500
      },
      h4: {
        fontSize: "1rem",
        fontWeight: 600
      },
      h3: {
        fontSize: "1.25rem",
        fontWeight: 600
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 700
      },
      h1: {
        fontSize: "2.5rem !important",
        fontWeight: 700,
        letterSpacing: "2px",
        lineHeight: 1.5,
        textTransform: "uppercase"
      },
      caption: {
        fontSize: "0.75rem",
        fontWeight: 400
      },
      body1: {
        fontSize: "0.875rem",
        fontWeight: 400,
        lineHeight: "1.334em"
      },
      body2: {
        letterSpacing: "0em",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "1.5rem"
      },
      button: {
        textTransform: "capitalize"
      }
    },
    palette: {
      background: {
        paper: "#424242",
        default: "#12111c",
        global: "#a9f7e0",
        hover: "#182628",
        warning: "#182628",
        error: "#890F0D",
        disabled: "#212121"
      },
      primary: {
        main: "#6749dc"
      },
      secondary: {
        main: "#5E35B1",
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
      divider: "#eee",
      action: {
        focus: "#eee"
      }
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
