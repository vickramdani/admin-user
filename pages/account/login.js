import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { auth, provider } from "../../firebase";
import { useState } from "react";
import Register from "./register";
import { useRouter } from "next/router";

const Login = () => {
  const [admin, setAdmin] = useState({
    email: "",
    password: "",
  });
  const [clicked, setClicked] = useState(false);

  const loginWithEmail = () => {
    const email = admin.email;
    const password = admin.password;
    signInWithEmailAndPassword(auth, email, password);
  };

  const registerPage = (e) => {
    e.preventDefault();
    setClicked(true);
  };

  if (clicked) {
    return <Register />;
  } else {
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
          <Grid items xs={3}>
            <Card
              sx={{
                minWidth: 375,
                boxShadow: 3,
                padding: 3,
              }}
            >
              <CardContent
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="h5">Sign In</Typography>
                <Box
                  sx={{
                    mt: 2,
                    mb: 2,
                  }}
                >
                  <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    onChange={(e) =>
                      setAdmin({ ...admin, email: e.target.value })
                    }
                  />
                  <TextField
                    fullWidth
                    label="Password"
                    margin="normal"
                    type="password"
                    onChange={(e) =>
                      setAdmin({ ...admin, password: e.target.value })
                    }
                  />
                </Box>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  variant="contained"
                  onClick={loginWithEmail}
                  sx={{
                    backgroundColor: "#00e676",
                    width: "95%",
                    mb: 2,
                  }}
                >
                  Sign in
                </Button>
                <Typography variant="h7">
                  {"Don't have an account?"}
                  <Button
                    variant="text"
                    size="small"
                    onClick={(e) => registerPage(e)}
                  >
                    Sign up
                  </Button>
                  here
                </Typography>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }
};

export default Login;
