import { ThemeProvider } from "@mui/material/styles";
import theme from "../utils/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider } from "../Auth";
import NavBar from "../components/NavBar";
import { UserContext } from "../components/UserContext";
import { Alert, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";

const Layout = ({ children }) => {
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
            {children}
          </UserContext.Provider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default Layout;
