import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box 
      display="flex" 
      justifyContent="space-between" 
      height="60px" 
      py={2}
      pr={2}
      backgroundColor={colors.primary[400]} 
      position="sticky"
    >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          textAlign="center"
          justifyContent="center"
          width="75px"
        >
          {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}> */}
          <IconButton>
            <MenuOutlinedIcon
              sx={{ fontSize: 25 }} 
            />
          </IconButton>
        </Box>
        <Box
          display="flex"
          textAlign="center"
          justifyContent="center"
          marginRight="30px"
        >
          <Typography variant="h3" fontWeight="bold">DictioNetworks</Typography>
        </Box>
        <Box
          marginLeft="30px"
          border={1}
          backgroundColor={colors.primary[400]}
          borderRadius="30px"
          sx = {{
            borderColor: "#aaaaaa"
          }}
        >
          <InputBase sx={{ ml: 2 }} placeholder="Search" />
          <IconButton type="button" sx={{ p: 1, color: "#aaaaaa" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;