import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import theme from "../utils/theme";
import "../styles/globals.css";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../Auth";
import NavBar from "../components/NavBar";
import { UserContext } from "../components/UserContext";
import { Alert, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState({
    username: "",
    email: "",
    citizenship: "",
    occupation: "",
  });
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = useCallback(
    (type, msg) => {
      setAlertType(type);
      setAlertMessage(msg);
      setOpen(true);
    },
    [setAlertType, setAlertMessage, setOpen]
  );

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>User Admin</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <UserContext.Provider value={{ showAlert, user, setUser }}>
            <CssBaseline />
            <NavBar />
            <Snackbar
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
            >
              <Alert
                onClose={handleClose}
                severity={alertType}
                sx={{ width: "100%" }}
              >
                {alertMessage}
              </Alert>
            </Snackbar>

            <Component {...pageProps} />
          </UserContext.Provider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
