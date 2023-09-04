import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { AuthContext } from "../../context/authContext/AuthContext";
import { useState, useContext } from "react";
import { login } from "../../context/authContext/apiCalls";
import { useNavigate } from "react-router-dom";
import NotificationAlert from "../../components/NotificationAlert";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, dispatch } = useContext(AuthContext);

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleCloseAlert = () => {
    setShowSuccessAlert(false);
    setShowErrorAlert(false);
  };

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    // Reset previous error messages
    setEmailError("");
    setPasswordError("");

    // Validate email and password
    if (!email.trim()) {
      setEmailError("Email is required");
    }
    if (!password.trim()) {
      setPasswordError("Password is required");
    }

    // If either the email or password is empty, don't proceed with login
    if (!email.trim() || !password.trim()) {
      return;
    }

    try {
      const userData = await login({ email, password }, dispatch);

      if (userData && userData.data.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/supervisor-dashboard");
      }
    } catch (error) {
      setShowErrorAlert(true);
      console.error("Login failed", error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 6,
          py: 5,
          marginTop: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <img
          src="/aamustedlogo1.jpg"
          alt="logo"
          width="100"
          height="100"
          style={{ marginTop: "20px" }}
        />
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
            error={!!emailError}
            helperText={emailError}
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
            onChange={(e) => setPassword(e.target.value)}
            error={!!passwordError}
            helperText={passwordError}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleLogin}
            disabled={isFetching}
            style={{ backgroundColor: "#570030" }}
          >
            Sign In
          </Button>
          {/* Error Alert */}
          <NotificationAlert
            open={showErrorAlert}
            message="Authentication Failed!"
            severity="error"
            onClose={handleCloseAlert}
          />
        </Box>
      </Box>
    </Container>
  );
}
