import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Link from "next/link";
import { memo } from "react";

const Details = ({ userProps }) => {
  const user = JSON.parse(userProps);
  console.log(user);

  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid items xs={5}>
        <Card sx={{ minWidth: 550, boxShadow: 3, borderRadius: "20px", p: 3 }}>
          <Box
            sx={{
              mb: 2,
            }}
          >
            <Link href="/" passHref>
              <IconButton>
                <ArrowBackIosNewIcon />
              </IconButton>
            </Link>
          </Box>
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              sx={{ textAlign: "center", mb: 5, fontWeight: "bold" }}
            >
              User Information
            </Typography>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                Name:
              </Typography>
              <Typography variant="h5" component="div">
                {user.username}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                email:
              </Typography>
              <Typography variant="h5" component="div">
                {user.email}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                Citizenship:
              </Typography>
              <Typography variant="h5" component="div">
                {user.citizenship}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                Occupation:
              </Typography>
              <Typography variant="h5" component="div">
                {user.occupation}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
export default memo(Details);

export const getStaticPaths = async () => {
  const snapshot = await getDocs(collection(db, "user-data"));
  const paths = snapshot.docs.map((doc) => {
    return {
      params: { id: doc.id.toString() },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "user-data", id);
  const docSnap = await getDoc(docRef);

  return {
    props: { userProps: JSON.stringify(docSnap.data()) || null },
    revalidate: 5,
  };
};
