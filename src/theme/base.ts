import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#012e31",
      contrastText: "#fff"
    },
    secondary: {
      main: "#006064"
    },
    background: {
      default: "#fffdeb",
      paper: "#012e31"
    }
  },
  typography: {
    fontFamily: "Roboto Slab, serif",
    h1: {
      fontFamily: "Roboto Slab, serif",
      fontSize: "3rem",
      color: "#012e31"
    },
    h3: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "1.5rem",
        color: "#012e31"
      },
    body1: {
      fontFamily: "Montserrat, sans-serif",
      fontSize: "1rem",
      color: "#012e31"
    },
    body2: {
        fontFamily: "Montserrat, sans-serif",
        fontSize: "0.75rem",
        color: "#012e31"
      },
    button: {
      fontFamily: "Montserrat, sans-serif",
      color: "#012e31"
    }
  }
});
