import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
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
        <Card
          sx={{ minWidth: 550, boxShadow: 3 }}
          style={{ backgroundColor: "#fafafa" }}
        >
          <CardContent>
            <Typography
              variant="h4"
              component="div"
              sx={{ textAlign: "center", mb: 2 }}
            >
              User Information
            </Typography>
            <Typography variant="h5" component="div">
              Name: {user.username}
            </Typography>
            <Typography variant="h5" component="div">
              Email: {user.email}
            </Typography>
            <Typography variant="h5" component="div">
              Citizenship: {user.citizenship}
            </Typography>
            <Typography variant="h5" component="div">
              Occupation: {user.occupation}
            </Typography>
          </CardContent>
          <CardActions>
            <Link href="/" passHref>
              <Button size="small">Back to dashboard</Button>
            </Link>
          </CardActions>
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
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const docRef = doc(db, "user-data", id);
  const docSnap = await getDoc(docRef);

  return {
    props: { userProps: JSON.stringify(docSnap.data()) || null },
    revalidate: 3,
  };
};
