import React, { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import { spGetAllItemsToList } from '../sp/networks-terms';
import { getCurrentDetails } from '../sp/user-profile';
import SearchEngine from '../components/SearchEngine';
import AppSearchBar from '../components/AppSearchBar';


const SamplePage = () => {
    const [allItems, setAllItems] = useState([]);
    
    useEffect(() => {
        getAllItemsFunc();
    }, []);

    const getAllItemsFunc = async () => {
        const listItems = await spGetAllItemsToList();
        setAllItems(listItems);
    }
    console.log(allItems)
    return (
        <div>
            <div style={{position: 'fixed', top: 0, left: 0, width: '100%'}}>
                <AppSearchBar/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%', marginTop: '300px'}}>
                <div>
                    <Typography variant="h1" color="primary" align="center" style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
                        DictioNetworks
                    </Typography>
                </div>
                
                <SearchEngine tableData={allItems} />
            </div>
        </div>
    )
}

export default SamplePage;