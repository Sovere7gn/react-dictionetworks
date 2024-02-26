import { Box, IconButton, useTheme, Typography, Link } from "@mui/material";
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
import MeralcoLogo from "../../assets/MeralcoLogo.png";
import DictioNetworksLogo from "../../assets/Logo.png";
import { useLocation } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const pathname = useLocation();

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
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="75px"
        >
          {/* <Link href=""> */}
          <Box
            component="img"
            sx={{
              height: 35, 
              width: 35,
            }}
            alt="Logo"
            src={MeralcoLogo}
          />
          {/* </Link> */}
        </Box>
        
        {/* <Box
          display="flex"
          textAlign="center"
          justifyContent="center"
          width="75px"
        > */}
          {/* <IconButton onClick={() => setIsCollapsed(!isCollapsed)}> */}
          {/* <IconButton>
            <MenuOutlinedIcon
              sx={{ fontSize: 25 }} 
            />
          </IconButton>
        </Box> */}
        <Box
          display="flex"
          textAlign="center"
          justifyContent="center"
          marginRight="30px"
        >
          <Link href="/" underline="none" variant="h3" fontWeight="bold" color={colors.primary[900]}>
          {pathname.pathname === "/" ? "" : "DictioNetworks"}
          </Link>
        </Box>
        {pathname.pathname === "/" 
          ? "" 
          : 
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
        }
        
      </Box>

      {/* ICONS */}
      <Box 
          display="flex"
          justifyContent="center"
          alignItems="center"
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          component="img"
          sx={{
            height: 25, 
            width: 25,
            borderRadius: 10,
            mx: 1,
          }}
          alt="Logo"
          src={DictioNetworksLogo}
          
        >
          
        </Box>
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton> */}
        {/* <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
