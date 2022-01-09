import Link from "next/link";
import UserDashboard from "../components/UserDashboard";
import { UserContext } from "../components/UserContext";
import { Box } from "@mui/material";

export default function Home() {
  return (
    <Box>
      <UserDashboard />
    </Box>
  );
}
