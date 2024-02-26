import React, { useState, useEffect } from 'react';
import { Box, TextField, Autocomplete, useTheme, InputAdornment, IconButton } from '@mui/material'
import Header from '../../components/Header'
import { BrowserRouter as useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { spGetAllItemsToList } from '../../sp/networks-terms';
import { getCurrentDetails } from '../../sp/user-profile';
import { tokens } from '../../theme';
import SearchIcon from "@mui/icons-material/Search";
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

// import SearchEngine from '../components/SearchEngine';

function Home() {
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
      getAllItemsFunc();
  }, []);

  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList();
      setAllItems(listItems);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const terms = allItems.map(row => row.Title)
  const [value, setValue] = useState("");
  return (
    <Box m="20px">
      {/* <Header title="HOME" subtitle="Welcome to Home" /> */}
      {/* <Box mt="30px" /> */}
      <Box 
        display="flex" 
        // justifyContent="center" 
        alignItems="center"
        width="100%"
        height="69vh"
        flexDirection="column"
        paddingTop="24vh"
      >
        <Typography 
          variant="h1" 
          fontWeight="bold"
          sx={{ fontSize: "75px" }}
        >
          DictioNetworks
        </Typography>
        <Autocomplete
          disablePortal
          options={terms}
          forcePopupIcon={false}
          id="combo-box-demo"
          sx={{ 
            width: 700, 
            '& TextField': {
              borderRadius: 20,
              fontSize: 20,
            },
          }}
          renderInput={(params) => 
            <TextField 
              {...params} 
              placeholder="Search"
              // InputProps={{ 
              //   sx: { 
              //     "&:hover": {
              //       border: "2px solid white"
              //     },
              //     borderRadius: 20, 
              //     fontSize: 20 }
              // }}
              onChange={(e) => setValue(e.target.value)}
              value = {value}
              paddingRight={1.5}
              InputProps={{
                ...params.InputProps,
                sx: {
                  borderRadius: 20, 
                  fontSize: 20,
                },
                startAdornment: (
                  <Box ml={1.3}>
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  </Box>
                ),
                endAdornment: (
                  <Box>
                  </Box>
                    // <IconButton><ClearOutlinedIcon /></IconButton>
                ),
              }}
              />
          }
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.defaultMuiPrevented = true;
              console.log(event.target.value)
              // handleSelect(event.target.value);
            }
          }}
        />
        
      </Box>
    </Box>
  )
}


export default Home
