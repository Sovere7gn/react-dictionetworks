import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { BrowserRouter as useNavigate } from 'react-router-dom';

export default function SearchEngine(tableData) {
  
  const terms = tableData.tableData.map(row => row.Title) //change field_1 to the column name
  // const navigate = useNavigate();

  //https://stackoverflow.com/questions/68911432/how-to-pass-parameters-with-react-router-dom-version-6-usenavigate-and-typescrip
  // const handleSelect = (term) => {
  //   navigate('/result', {
  //     state: {
  //       term: term,
  //     }
  //   });
  // };

  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={terms}
      sx={{ width: 600 }}
      renderInput={(params) => <TextField {...params} label="Term" />}
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          event.defaultMuiPrevented = true;
          console.log(event.target.value)
          // handleSelect(event.target.value);
        }
      }}
    />
  );
}

