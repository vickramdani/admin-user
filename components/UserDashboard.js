import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { memo, useEffect, useState } from "react";
import { db } from "../firebase";
import Container from "@mui/material/Container";
import UserList from "./UserList";
import { Box, Typography } from "@mui/material";
import UserForm from "./UserForm";

const UserDashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, "user-data"); // specify the collection in firestore
    const q = query(collectionRef, orderBy("timestamp", "desc")); // query the collection in descend order

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      // listen to any change in the collection
      setUsers(
        querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
      );
    });
    return unsubscribe;
  }, []);
  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Typography variant="h2" component="div">
        <Box sx={{ fontWeight: "bold", textAlign: "center" }}>User Panel</Box>
      </Typography>
      <UserForm />
      <UserList users={users} />
    </Container>
  );
};

export default memo(UserDashboard);
