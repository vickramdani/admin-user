import { doc, getDoc, updateDoc } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { db } from "../firebase";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Avatar,
  Input,
  Container,
  IconButton,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useAuth } from "../Auth";
import Link from "next/link";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

const ProfileDashboard = () => {
  const [user, setUser] = useState([]);
  const [progress, setProgress] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const getUserProfile = async () => {
      const docRef = doc(db, "users", currentUser.uid);

      const docSnap = await getDoc(docRef);

      try {
        if (docSnap.exists()) {
          await setUser(docSnap.data());
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserProfile();
  }, [user, currentUser.uid]);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `${user.uid}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (error) => console.log(error),
      async () => {
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        await addImageUrl(user, url);
      }
    );
  };

  const addImageUrl = async (user, url) => {
    const docRef = doc(db, "users", user.uid);
    const userUpdated = { ...user, imageURL: url };
    await updateDoc(docRef, userUpdated);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6, mb: 6 }}>
      <Card
        sx={{
          borderRadius: "20px",
          p: 3,
        }}
      >
        <CardContent>
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
          <Box
            sx={{
              mb: 8,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Avatar
                src={user.imageURL}
                sx={{
                  width: "250px",
                  height: "250px",
                }}
              />
            </Box>

            <Box
              sx={{
                mt: 3,
              }}
            >
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={onFileChange}
                  sx={{
                    display: "none",
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  size="small"
                  sx={{
                    color: "secondary.main",
                  }}
                >
                  Upload Photo Profile
                </Button>
              </label>
            </Box>

            <Box
              sx={{
                mt: 4,
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                {user.username}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                Email:
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
                D.O.B:
              </Typography>
              <Typography variant="h5" component="div">
                {user.dob}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                Gender:
              </Typography>
              <Typography variant="h5" component="div">
                {user.gender}
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
                {user.nationality}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", mb: 2 }}>
              <Typography
                variant="h5"
                component="div"
                sx={{ fontWeight: "bold", mr: 2 }}
              >
                Address:
              </Typography>
              <Typography variant="h5" component="div">
                {user.address}
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
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default memo(ProfileDashboard);
