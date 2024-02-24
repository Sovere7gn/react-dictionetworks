import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AppSearchBar from '../components/AppSearchBar';
import { useLocation } from "react-router-dom";
import { spGetAllItemsToList } from '../sp/networks-terms';


export default function Result() {
    const [allItems, setAllItems] = useState([]);
    
    const term = {
        Title: "As-Built Plan",
        field_1: "Revised design plans reflecting the actual work done in the field based on the submitted as-built sketch.\nAn updated design plan based on the actual construction of the work order to reflect any deviations from the original design.",
        field_4: "Guidelines and Procudures on Network Model Promotion\nProcedures for Protection and Controls Design - EM Protection and Controls Design",
        field_5: "GP-DNO-402.000\nGP-DTD-301-000",
        field_6: "https://meralco.sharepoint.com/sites/networksdcc/Libraries/Guidelines and Procedures on Network Model Promotion.pdf\nhttps://meralco.sharepoint.com/sites/networksdcc/Libraries/Procedures for Protection and Controls Design - EM Protection and Controls Design.pdf",
        field_7: "2019-11-01\n2020-01-13",
    }
    const definitions = term.field_1.split('\n');
    
    useEffect(() => {
        getAllItemsFunc();
    }, []);
    
    
    const getAllItemsFunc = async () => {
        const listItems = await spGetAllItemsToList();
        setAllItems(listItems);
    }

    // const { state } = useLocation();
    // const test2 = state.term;
    // console.log(test2);
    
    console.log(term);
    return (
        <Box>
            <Box>
                <AppSearchBar/>
            </Box> 
            <Box>
                <Box   
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '99%'},
                        }}
                    noValidate
                    autoComplete="off"
                    
                >
            
                    
            <TextField
                id="outlined-read-only-input"
                label="Term"
                value={term.Title}
                variant="outlined"
                InputProps={{
                    readOnly: true,
                    style: { fontFamily: 'Arial', fontSize: '20px', fontWeight: 'bold', borderWidth: '10px' },
                }}
                style={{ backgroundColor: 'RGB(185, 235, 255, 1)' }}
            />
                
                {definitions.map((definition, index) => (
                    <TextField
                        key={index}
                        id={`outlined-textarea-${index}`}
                        label={`Definition ${index+1}`}
                        placeholder="Placeholder"
                        multiline
                        value={definition}
                        InputProps={{
                        readOnly: true,
                        }}
                    />
                    ))}
                </Box>  
                
            </Box>
        </Box>
    );
}