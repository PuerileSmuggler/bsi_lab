import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  overrides: {
    MuiTextField: {
      root: {
        backgroundColor: "#000",
        border: "1px solid #444",
      },
    },
    MuiMenu: {
      list: {
        backgroundColor: "#000",
        "& > *": {
          "&:hover": {
            cursor: "pointer",
            backgroundColor: "#2e2e31",
          },
        },
      },
    },
    MuiSelect: {
      root: {
        backgroundColor: "#000",
        border: "1px solid #444",
      },
      icon: {
        color: "white",
      },
    },
    MuiButton: {
      root: {
        textTransform: "none",
        color: "black",
      },
      contained: {
        "&.Mui-disabled": {
          backgroundColor: "#2f2f2f",
          color: "#ccc",
        },
      },
    },
  },
  palette: {
    primary: {
      main: "#ff9900",
    },
    secondary: {
      main: "#1b1b1b",
    },
    text: {
      primary: "#f8f8f8",
      secondary: "#f8f8f8",
    },
  },
});
