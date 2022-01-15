import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Input,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const nationalities = [
  {
    value: "Indonesia",
    label: "Indonesia",
  },
  {
    value: "Malaysia",
    label: "Malaysia",
  },
  {
    value: "Singapore",
    label: "Singapore",
  },
  {
    value: "Japan",
    label: "Japan",
  },
  {
    value: "South Korea",
    label: "South Korea",
  },
  {
    value: "United States",
    label: "United States",
  },
  {
    value: "England",
    label: "England",
  },
];

const Register = () => {
  const [admin, setAdmin] = useState({
    username: "",
    dob: null,
    gender: "",
    nationality: "",
    address: "",
    occupation: "",
    email: "",
    password: "",
  });

  const handleSubmit = async () => {
    const email = admin.email;
    const password = admin.password;
    const username = admin.username;
    const dob = admin.dob;
    const gender = admin.gender;
    const nationality = admin.nationality;
    const address = admin.address;
    const occupation = admin.occupation;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserDocument(user, {
        username,
        dob,
        gender,
        nationality,
        address,
        occupation,
      });
    } catch (error) {
      console.log("error", error);
    }

    setAdmin({
      username: "",
      dob: null,
      gender: "",
      nationality: "",
      address: "",
      email: "",
      password: "",
      occupation: "",
    });
  };

  const createUserDocument = async (user, additionalData) => {
    if (!user) return;

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {
      try {
        await setDoc(userRef, {
          ...additionalData,
          email: user.email,
          uid: user.uid,
        });
      } catch (error) {
        console.log("Error in creating user", error);
      }
    }
  };

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ mt: 3, mb: 3 }}
        style={{ minHeight: "100vh" }}
      >
        <Grid items xs={4}>
          <Card
            sx={{
              minWidth: 375,
              boxShadow: 3,
              padding: 3,
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="h4">Sign Up</Typography>
              <Box
                sx={{
                  mt: 2,
                  mb: 2,
                }}
              >
                <TextField
                  fullWidth
                  label="Username"
                  margin="normal"
                  sx={{ mb: 3 }}
                  onChange={(e) =>
                    setAdmin({ ...admin, username: e.target.value })
                  }
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Day of Born"
                    // views={["year", "month", "day"]}
                    value={admin.dob}
                    onChange={(newValue) => {
                      setAdmin({
                        ...admin,
                        dob: new Date(newValue).toLocaleDateString(),
                      });
                    }}
                    sx={{ mt: 1, mb: 1 }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
                <FormControl component="fieldset" sx={{ mt: 1, ml: 1, mb: 1 }}>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    aria-label="gender"
                    name="row-radio-buttons-group"
                    value={admin.gender}
                    onChange={(e) =>
                      setAdmin({ ...admin, gender: e.target.value })
                    }
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                <TextField
                  select
                  label="Nationality"
                  value={admin.nationality}
                  onChange={(e) =>
                    setAdmin({ ...admin, nationality: e.target.value })
                  }
                  helperText="Please select your nationality"
                >
                  {nationalities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  fullWidth
                  label="Address"
                  margin="normal"
                  onChange={(e) =>
                    setAdmin({ ...admin, address: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Occupation"
                  margin="normal"
                  onChange={(e) =>
                    setAdmin({ ...admin, occupation: e.target.value })
                  }
                />

                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  onChange={(e) =>
                    setAdmin({ ...admin, email: e.target.value })
                  }
                />
                <TextField
                  fullWidth
                  label="Password"
                  margin="normal"
                  type="password"
                  onChange={(e) =>
                    setAdmin({ ...admin, password: e.target.value })
                  }
                />
              </Box>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#00e676",
                  width: "95%",
                  mb: 2,
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default Register;
