import { Typography, Box, useTheme, TextField, unstable_createMuiStrictModeTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import { getCurrentDetails } from "../sp/user-profile";

const Header = ({ title, subtitle }) => {
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  useEffect(() => {
    getUserProfile();
  }, []);

  const getUserProfile = async () => {
    const user = await getCurrentDetails();
    setName(user.userProps.NewName);
    setOffice(user.userProps.Office);
    setEmail(user.userProps.Email);
    setPosition(user.userProps.Position);
  };
  return (
    
    <Box 
      display="flex" 
      justifyContent="space-between"
      sx={{ m: "0 20px 0 20px" }}
    >
      <Box>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ m: "0 0 0 0" }}
        align="center"
      >
        {title}
      </Typography>
      {/* <Typography variant="h5" color={colors.greenAccent[400]} align="center">
        {subtitle}
      </Typography> */}
      </Box>
      <Box>
      <Typography
        variant="h2"
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
        align="center"
      >
        NAME OF THE USER
      </Typography>
      {/* <Typography variant="h5" color={colors.greenAccent[400]} align="center">
        {office} - {position} - {email}
      </Typography> */}
      </Box>
    </Box>
  );
};

export default Header;