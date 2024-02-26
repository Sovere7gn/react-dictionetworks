import { Typography, Box, useTheme, TextField, unstable_createMuiStrictModeTheme } from "@mui/material";
import { useState, useEffect } from "react";
import { tokens } from "../theme";
import { getCurrentDetails } from "../sp/user-profile";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from "@mui/material/CardMedia";
import BackgroundImage from "../assets/dictionarybackground.jpg";

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
    <Card sx={{ maxWidth: "100vw" }}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="58px"
          image={BackgroundImage}
          
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            bgcolor: 'rgba(0, 0, 0, 0.54)',
            color: 'white',
            padding: '10px',
          }}
        >
          <Typography variant="h2">{title}</Typography>
        </Box>
      </Box>
    </Card>
    // <Box 
    //   display="flex" 
    //   justifyContent="space-between"
    //   sx={{ 
    //     m: "0 20px 0 20px",
    //     backgroundImage: `url("../assets/dictionarybackground.jpg")`,
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: `300px 300px`,
    //   }}
    // >
    //   <Box>
    //   <Typography
    //     variant="h2"
    //     fontWeight="bold"
    //     sx={{ m: "0 0 0 0" }}
    //     align="center"
    //   >
    //     {title}
    //   </Typography>
    //   {/* <Typography variant="h5" color={colors.greenAccent[400]} align="center">
    //     {subtitle}
    //   </Typography> */}
    //   </Box>
    //   <Box>
    //   <Typography
    //     variant="h2"
    //     fontWeight="bold"
    //     sx={{ m: "0 0 5px 0" }}
    //     align="center"
    //   >
    //     NAME OF THE USER
    //   </Typography>
    //   {/* <Typography variant="h5" color={colors.greenAccent[400]} align="center">
    //     {office} - {position} - {email}
    //   </Typography> */}
    //   </Box>
    // </Box>
  );
};

export default Header;
