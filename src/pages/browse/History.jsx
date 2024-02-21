import * as React from "react";
import Box from "@mui/material/Box";


export default function DataBox() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      top="20vh"
      position="relative"
    >
      <Box
        borderRadius="20px"
        position="absolute"
        sx={{
          width: 500,
          height: 250,
          backgroundColor: "gray"
        }}
      >
        <p style={{ color: "black", alignSelf: "flex-start", position: "absolute", bottom: "30px", marginInlineStart: "20px" }}>test</p>
      </Box>
      <Box
        borderRadius="10px"
        position="relative"
        bottom="50px"
        sx={{
          width: 480,
          height: 200,
          backgroundColor: "blue"
        }}
      />
    </Box>
  );
}