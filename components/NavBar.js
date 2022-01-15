import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useAuth } from "../Auth";
import { auth } from "../firebase";

const NavBar = () => {
  const router = useRouter();

  const logOut = () => {
    router.push("/");
    auth.signOut();
  };

  return (
    <AppBar position="static" color="transparent">
      <Toolbar>
        <Grid container alignItems="center" spacing={3}>
          <Grid item xs>
            <Typography variant="h5" component="div">
              Next Admin
            </Typography>
          </Grid>

          <Grid item xs="auto">
            <Button
              onClick={() => router.push("/profile")}
              variant="text"
              color="tertiary"
              style={{ fontSize: "14px" }}
            >
              Profile
            </Button>
          </Grid>

          <Grid item xs="auto">
            <Button
              onClick={logOut}
              variant="outlined"
              color="tertiary"
              style={{ fontSize: "14px" }}
            >
              Log Out
            </Button>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
