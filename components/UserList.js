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
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { memo, useContext } from "react";
import { UserContext } from "../pages/userContext";

const UserList = ({ users }) => {
  const { showAlert, setUser } = useContext(UserContext);
  const deleteUser = async (id, e) => {
    e.preventDefault();
    const docRef = doc(db, "user-data", id);
    await deleteDoc(docRef);
    showAlert("success", `User with ID: ${id} deleted successfully`);
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
            <TableCell sx={{ color: "secondary.main" }}>Username</TableCell>
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
              <TableCell component="th" scope="row">
                {user.username}
              </TableCell>
              <TableCell align="center">{user.email}</TableCell>
              <TableCell align="center">
                <IconButton
                  color="error"
                  onClick={(e) => deleteUser(user.id, e)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="tertiary"
                  onClick={() =>
                    setUser({
                      id: user.id,
                      username: user.username,
                      email: user.email,
                      timestamp: user.timestamp,
                    })
                  }
                >
                  <EditIcon />
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
