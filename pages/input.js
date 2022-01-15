import { Box, Button, Grid, IconButton, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

import Link from "next/link";
import UserForm from "../components/UserForm";

const Input = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Box
        sx={{
          mb: 4,
        }}
      >
        <Link href="/" passHref>
          <IconButton>
            <ArrowBackIosNewIcon />
          </IconButton>
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
