import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useState } from "react";

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });

  const loginWithGoogle = () => {
    signInWithRedirect(auth, provider);
  };
  const loginWithEmail = () => {
    const email = admin.email;
    const password = admin.password;
    signInWithEmailAndPassword(auth, email, password);
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid items>
          <Typography variant="h5">Sign In</Typography>
        </Grid>
        <Box>
          <Grid items>
            <TextField
              fullWidth
              label="Email"
              margin="normal"
              onChange={(e) => setAdmin({ ...admin, email: e.target.value })}
            />
          </Grid>

          <Grid items>
            <TextField
              fullWidth
              label="Password"
              margin="normal"
              type="password"
              onChange={(e) => setAdmin({ ...admin, password: e.target.value })}
            />
          </Grid>
          <Grid
            items
            sx={{
              mt: 3,
              textAlign: "center",
            }}
          >
            <Button
              variant="contained"
              onClick={loginWithEmail}
              sx={{
                backgroundColor: "#00e676",
                width: "100%",
              }}
            >
              Sign in
            </Button>
          </Grid>
        </Box>
        <Grid
          items
          sx={{
            mt: 3,
            mb: 3,
          }}
        >
          <Typography variant="h7">Or</Typography>
        </Grid>

        <Grid items>
          <Button
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={loginWithGoogle}
          >
            Sign in with Google
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
