import React, { useState, useEffect } from 'react';
import { TextField } from '@mui/material';
import { spGetAllItemsToList } from '../sp/list-requests';
import DashboardTest from '../components/DashboardTest';
import { getCurrentDetails } from '../sp/user-profile';
import UserRequests from '../components/UserRequests';
import AppSearchBar from '../components/AppSearchBar';


const SamplePage = () => {
    const [name, setName] = useState("");
    const [allItems, setAllItems] = useState([]);
    const [userEmail, setEmail] = useState("");
    const [userOffice, setOffice] = useState("");
    const [userPosition, setPosition] = useState("");

    useEffect(() => {
        getUserProfile();
    }, []);
    
    useEffect(() => {
        getAllItemsFunc();
    }, []);

    const getUserProfile = async () => {   
        const user = await getCurrentDetails();
        setName(user.userProps.NewName);
        setEmail(user.userProps.EMail);
        setOffice(user.userProps.Office);
        setPosition(user.userProps.Position);
    }      

    //-----------------   button functions ---------------------------
    const getAllItemsFunc = async () => {
        const listItems = await spGetAllItemsToList();
        setAllItems(listItems);
    }

    
    return (
       
        <div>
            <AppSearchBar/>
           
            <div style={{ display: 'flex', position: 'relative'}}>
                <div style={{ width: '49%', height: '100%' }}>
                    <UserRequests tableData={allItems} />
                </div>
                <div style={{ width: '49%', height: '100%' }}>
                    <div style={{ width: '100%', height: '100%'}}>
                        <TextField
                            sx={{ width: '100%', color: 'blue'}}
                            size="medium"
                            value={name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ width: '50%' }}
                            size="small"
                            value={userPosition}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ width: '50%' }}
                            size="small"
                            value={userOffice}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                        <TextField
                            sx={{ width: '100%' }}
                            size="small"
                            value={userEmail}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </div>
                    
                    <div>    {/*maximize size of dashboard // changedata of dashboard based on filter*/}               
                       <DashboardTest tableData={allItems} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SamplePage;