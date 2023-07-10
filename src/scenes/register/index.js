import * as React from "react";
// import Avatar from '@mui/material/Avatar';
import Button from "@mui/material/Button";
// import CssBaseline from '@mui/material/CssBaseline';
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../components/Header";

export default function Register() {
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  // };
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    receiveEmails: "false",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3003/admins", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Data stored successfully");
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            receiveEmails: false,
          });
          window.location.href = "/";
        } else {
          throw new Error("Failed to store data");
        }
      })
      .catch((error) => {
        console.error("Error storing data:", error);
      });
  };
  return (
    <Container component="main" maxWidth="lg">
      <Header title="REGISTER" subtitle="Create a new account" />
      <Box
        sx={{
          padding: 3,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#1f2a40",
          width: "600px",
          borderRadius: "10px",
        }}
      >
        {/* <Avatar sx={{ m: 1, bgcolor: '#6870fa', color: '#fff' }}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h3" padding="10px">
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
          className="textfield-form"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                InputLabelProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                  style: {
                    color: "#fff",
                  },
                }}
                InputProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                }}
                value={formData.firstName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
                InputLabelProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                  style: {
                    color: "#fff",
                  },
                }}
                InputProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                }}
                value={formData.lastName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                InputLabelProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                  style: {
                    color: "#fff",
                  },
                }}
                InputProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                }}
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                InputLabelProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                  style: {
                    color: "#fff",
                  },
                }}
                InputProps={{
                  classes: {
                    focused: "Mui-focused",
                  },
                }}
                value={formData.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="receiveEmails"
                    color="primary"
                    checked={formData.receiveEmails}
                    onChange={handleChange}
                  />
                }
                label="I want to receive inspiration, marketing promotions, and updates via email."
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2, bgcolor: "#6870fa" }}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2" style={{ color: "#6870fa" }}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
