import React, { useState, useEffect } from 'react';
import { spGetAllItemsToList } from '../sp/networks-terms';
import { getCurrentDetails } from '../sp/user-profile2';

const RequestsData = () => {
  const [name, setName] = useState("");
  const [allItems, setAllItems] = useState([]);

  useEffect(() => {
      getUserProfile();
  }, []);
  console.log(name);

  useEffect(() => {
      getAllItemsFunc();
  }, []);

  const getUserProfile = async () => {   
      const user = await getCurrentDetails();
      setName(user.userProps.NewName)
  }      

  //-----------------   button functions ---------------------------
  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList();
      setAllItems(listItems);
  }
  console.log(allItems);
  return allItems
}
const numbers = [1, 2, 3, 4, 5];
<RequestsData/>
const processedNumbers = numbers.map(number => number * 2);

export const requestsdata = processedNumbers;