// import React, { useState, useEffect } from 'react';
// import { spGetAllItemsToList } from '../sp/networks-terms';
// import Terminologies from '../components/Terminologies';
// import { getCurrentDetails } from '../sp/user-profile2';

// const Browse = () => {
//     const [name, setName] = useState("");
//     const [allItems, setAllItems] = useState([]);
//     useEffect(() => {
//         getUserProfile();
//     }, []);

//     useEffect(() => {
//         getAllItemsFunc();
//     }, []);

//     const getUserProfile = async () => {   
//         const user = await getCurrentDetails();
//         setName(user.userProps.NewName)     
//     }      

//     //-----------------   button functions ---------------------------
//     const getAllItemsFunc = async () => {
//         const listItems = await spGetAllItemsToList();
//         setAllItems(listItems);
//     }

//     return (
//         <div>
//             <Terminologies tableData={allItems}/>
//         </div>
//     )
// }

// export default Browse;
