import { Alert, Box, Snackbar } from "@mui/material";
import { useCallback, useState } from "react";
import UserDashboard from "../components/UserDashboard";
import { UserContext } from "../components/UserContext";

export default function Home() {
  const [user, setUser] = useState({ username: "", email: "" });
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
    <UserContext.Provider value={{ showAlert, user, setUser }}>
      <Box>
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
        <UserDashboard />
      </Box>
    </UserContext.Provider>
  );
}
