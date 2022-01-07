import {
  AppBar,
  Avatar,
  Button,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useAuth } from "../Auth";
import { auth } from "../firebase";

const NavBar = () => {
  const { currentUser } = useAuth();
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
            <Avatar src={currentUser.photoURL} />
          </Grid>

          <Grid item xs="auto">
            <Typography variant="h7">{currentUser.displayName}</Typography>
          </Grid>

          <Grid item xs="auto">
            <Button
              onClick={() => auth.signOut()}
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
