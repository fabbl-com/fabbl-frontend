import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";

const colors = [
  "#075e54",
  "#12111c",
  "#131928",
  "#141826",
  "#182628",
  "#19182a",
  "#200037",
  "#25274d",
  "#29648a",
  "#2e9cca",
  "#f8f2ce",
  "#333",
  "#3b945e",
  "#464866",
  "#4d38a2",
  "#57ba98",
  "#65ccb8",
  "#6749dc",
  "#aaabb8",
  "#a9f7e0",
  "#d31d71",
  "#ef006f"
  // "#eee"
];

export const light = responsiveFontSizes(
  createTheme({
    spacing: 4,
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
        default: "#65ccb8"
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
        secondary: "#eee"
      }
    }
  })
);

export const dark = responsiveFontSizes(
  createTheme({
    spacing: 4,
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
        main: "#eee"
      },
      secondary: {
        main: "#eee",
        icons: "#eee"
      },
      text: {
        primary: "#eee",
        secondary: "#eee"
      }
    }
  })
);
