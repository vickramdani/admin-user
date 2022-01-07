import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const base = createTheme({
  palette: {
    primary: {
      main: "#42a5f5",
    },
    secondary: {
      main: "#fff",
    },
    tertiary: {
      main: "#424242",
    },
    error: {
      main: "#d50000",
    },
  },
});

const theme = responsiveFontSizes(base);
export default theme;
