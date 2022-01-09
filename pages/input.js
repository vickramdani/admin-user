import { Box, Button, Grid, Typography } from "@mui/material";
import Container from "@mui/material/Container";

import Link from "next/link";
import UserForm from "../components/UserForm";

const Input = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box sx={{ mb: 5 }}>
        <Link href="/">
          <Button size="small">Back to dashboard</Button>
        </Link>
      </Box>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="start"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Typography variant="h3" component="div">
            User Input
          </Typography>
        </Grid>
        <Grid item>
          <UserForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Input;
