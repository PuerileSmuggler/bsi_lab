import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        backgroundColor: "aliceblue",
      },
    },
  },
  palette: {
    primary: {
      main: "#5f9ea0",
      contrastText: "aliceblue",
    },
    secondary: {
      main: "#2e2e31",
    },
    text: {
      secondary: "aliceblue",
    },
  },
});
