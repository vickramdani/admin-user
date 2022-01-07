import { Button, TextField } from "@mui/material";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { memo, useContext, useRef, useState } from "react";
import { db } from "../firebase";
import { UserContext } from "../pages/userContext";

const UserForm = () => {
  const inputAreaRef = useRef();
  const { showAlert, user, setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (user?.hasOwnProperty("timestamp")) {
        // update user
        const docRef = doc(db, "user-data", user.id); // specify the document by id
        const userUpdated = { ...user };
        await updateDoc(docRef, userUpdated); // update the user
        setUser({ username: "", email: "" });
        showAlert(
          "info",
          `User with ${user.id} ID has been updated successfully`
        );
      } else {
        const collectionRef = collection(db, "user-data"); // specify the collection in firestore
        const docRef = await addDoc(collectionRef, {
          // add a document to a collection and add timestamp to it
          ...user,
          timestamp: serverTimestamp(),
        });
        setUser({ username: "", email: "" });
        showAlert(
          "success",
          `User with ${docRef.id} ID has been added successfully`
        );
      }
    } catch (error) {
      showAlert(error, `Failed adding user`);
    }
  };
  return (
    <div ref={inputAreaRef}>
      <TextField
        fullWidth
        label="Username"
        margin="normal"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 2,
          color: "#fff",
        }}
        onClick={handleSubmit}
      >
        {user?.hasOwnProperty("timestamp") ? "Update User" : "Add User"}
      </Button>
    </div>
  );
};

export default memo(UserForm);
