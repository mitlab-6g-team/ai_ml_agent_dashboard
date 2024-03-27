import * as React from "react";
import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ReactComponent as MitlabLogo } from "../../img/mitlab_logo_black 4.svg";
import { login } from "../../redux/loginSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const defaultTheme = createTheme();

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, role, status } = useSelector((state) => state.login);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      login({
        roleName: data.get("email"),
        password: data.get("password"),
      })
    );
  };
  useEffect(() => {
    if (isLoggedIn === true) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F5F5F5",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
            px: "43px",
            py: "20px",
            width: "100%", // 確保盒子寬度符合 Container
            maxWidth: 400, // 限制最大寬度
          }}
        >
          <Box sx={{ alignSelf: "flex-start" }}>
            <MitlabLogo style={{ width: "105px", height: "98px" }} />
          </Box>
          <Typography component="h1" variant="h5" sx={{ fontWeight: "bold" }}>
            Agent User Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width: "100%" }}
          >
            {status === "loading" ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
                <CircularProgress color="inherit" />
              </Box>
            ) : (
              <>
                <TextField
                  margin="normal"
                  fullWidth
                  id="role-name"
                  label="Role Name"
                  name="email"
                  autoFocus
                  variant="standard"
                  error={status === "failed"}
                  helperText={
                    status === "failed" ? "Login failed. Please try again." : ""
                  }
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  variant="standard"
                  error={status === "failed"}
                  helperText={
                    status === "failed" ? "Login failed. Please try again." : ""
                  }
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, backgroundColor: "#000000" }}
                >
                  Sign In
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
