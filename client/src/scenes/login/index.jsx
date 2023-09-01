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

  const [showSuccessAlert, setShowSuccessAlert] = useState(null);
  const [showErrorAlert, setShowErrorAlert] = useState(null);

  const handleCloseAlert = () => {
    setShowSuccessAlert(null); // Clear the success message when the alert is closed
    setShowErrorAlert(null); // Clear the error message when the alert is closed
  };

  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userData = await login({ email, password }, dispatch);

      if (userData && userData.data.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/supervisor-dashboard");
      }
    } catch (error) {
      setShowErrorAlert(error.response.data.message);
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
            open={showErrorAlert !== null}
            message={showErrorAlert}
            severity="error"
            onClose={handleCloseAlert}
          />
        </Box>
      </Box>
    </Container>
  );
}
