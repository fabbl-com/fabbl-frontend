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
    spacing: 8,
    typography: {
      fontFamily: ["Poppins", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Raleway"
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Open Sans"
      }
    },
    palette: {
      background: {
        default: "#eee"
      },
      primary: {
        main: "#009900"
      },
      secondary: {
        main: "#12111c",
        icons: "#009900"
      },
      text: {
        primary: "#12111c",
        secondary: "#333"
      },
      card: {
        default: "#fff"
      },
      icons: {
        main: "#009900"
      }
    }
  })
);

export const dark = responsiveFontSizes(
  createTheme({
    spacing: 8,
    typography: {
      fontFamily: ["Poppins", "Raleway", "Open Sans"].join(","),
      h1: {
        fontSize: "5rem",
        fontFamily: "Raleway"
      },
      h3: {
        fontSize: "2.5rem",
        fontFamily: "Open Sans"
      }
    },
    palette: {
      background: {
        default: "#12111c"
      },
      primary: {
        main: "#6749dc"
      },
      secondary: {
        main: "#eee",
        icons: "#6749dc"
      },
      text: {
        primary: "#eee",
        secondary: "#eee"
      },
      card: {
        default: "#25274d"
      },
      icons: {
        main: "#6749dc"
      }
    }
  })
);
