import { Box, IconButton, useTheme, Typography } from "@mui/material";
// import { useContext } from "react";
import { tokens } from "../../theme";
import { logout } from "../../redux/loginSlice"; // 確保路徑正確
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import InputBase from "@mui/material/InputBase";
// import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
// import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
// import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
// import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
//import SearchIcon from "@mui/icons-material/Search";
// import { useSelector } from "react-redux";
const Topbar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const colors = tokens(theme.palette.mode);
  // const colorMode = useContext(ColorModeContext);
  const role = localStorage.getItem("role");
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // 重定向到登入頁面
  };
  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          {/* <SearchIcon /> */}
        {/* </IconButton> */}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {/* <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton> */}
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#121B28",
            marginLeft: 1,
            marginTop: 1,
          }}
        >
          Hi, {role}
        </Typography>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
      </Box>
    </Box>
  );
};

export default Topbar;
