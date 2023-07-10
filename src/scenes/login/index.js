import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Header from "../../components/Header";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch("http://localhost:3003/admins")
      .then((response) => response.json())
      .then((data) => {
        const foundAdmin = data.find(
          (admin) =>
            admin.email === formData.email && admin.password === formData.password
        );
        if (foundAdmin) {
          // Successful login
          console.log("User logged in successfully");
          // Reset the form fields
          setFormData({
            email: "",
            password: "",
          });
          // Redirect the admin to the homepage
          window.location.href = "/";
        } else {
          // Incorrect credentials
          setError("Invalid credentials. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        // Handle the error if needed
      });
  };

  return (
    <Container component="main" maxWidth="lg">
      <Header title="LOGIN " subtitle="Log in to your account" />
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
        <Avatar sx={{ m: 1, bgcolor: "#6870fa", color: "#fff" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h2">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{ mt: 1 }}
          className="textfield-form"
        >
          {error && (
            <Typography
              component="p"
              variant="body2"
              style={{ color: "red", marginBottom: 16 }}
            >
              {error}
            </Typography>
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
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
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleChange}
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
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2, bgcolor: "#6870fa" }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" style={{ color: "#6870fa" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/register"
                variant="body2"
                style={{ color: "#6870fa" }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
