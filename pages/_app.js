import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import theme from "../utils/theme";
import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../Auth";
import NavBar from "../components/NavBar";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>User Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <NavBar />
          <Component {...pageProps} />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
