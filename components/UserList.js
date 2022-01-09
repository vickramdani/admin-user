import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ReadMoreIcon from "@mui/icons-material/ReadMore";

import { useRouter } from "next/router";
import { memo, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import Link from "next/link";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

const UserList = ({ users }) => {
  const { showAlert, setUser } = useContext(UserContext);
  const router = useRouter();

  const deleteUser = async (id, e) => {
    e.preventDefault();
    const docRef = doc(db, "user-data", id);
    await deleteDoc(docRef);
    showAlert("success", `User with ID: ${id} deleted successfully`);
  };

  const seeMore = (id, e) => {
    e.preventDefault();
    router.push(`/user/${id}`);
  };

  return (
    <TableContainer component={Paper} sx={{ mt: 7, mb: 5 }}>
      <Table sx={{ minWidth: 450 }} aria-label="simple table">
        <TableHead
          sx={{
            bgcolor: "primary.main",
          }}
        >
          <TableRow>
            <TableCell align="center" sx={{ color: "secondary.main" }}>
              Username
            </TableCell>
            <TableCell align="center" sx={{ color: "secondary.main" }}>
              Email
            </TableCell>
            <TableCell align="center" sx={{ color: "secondary.main" }}>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="tertiary"
                  onClick={(e) => deleteUser(user.id, e)}
                >
                  <DeleteIcon />
                </IconButton>
                <Link href="/input" passHref>
                  <IconButton
                    color="tertiary"
                    onClick={() =>
                      setUser({
                        id: user.id,
                        username: user.username,
                        email: user.email,
                        citizenship: user.citizenship,
                        occupation: user.occupation,
                        timestamp: user.timestamp,
                      })
                    }
                  >
                    <EditIcon />
                  </IconButton>
                </Link>
                <IconButton
                  color="tertiary"
                  onClick={(e) => seeMore(user.id, e)}
                >
                  <ReadMoreIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default memo(UserList);
