import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import { spGetAllItemsToList , spAddItemToList , spEditItemToList,spDeleteItemToList } from '../sp/list-items';
import CustomTable from '../components/CustomTable';
import { getCurrentDetails } from '../sp/user-profile';



const SamplePage = () => {
    const [name, setName] = useState("");
    const [allItems, setAllItems] = useState([]);
    const [title, setTitle] = useState("");
    const [firstname, setFirstName] = useState("");
    const [id, setId] = useState();

    useEffect(() => {
        getUserProfile();
    }, []);

    useEffect(() => {
        getAllItemsFunc();
    }, []);

    const getUserProfile = async () => {   
        const user = await getCurrentDetails();
        setName(user.userProps.NewName)
        console.log(name);        
    }      

    //-----------------   button functions ---------------------------
    const getAllItemsFunc = async () => {
        const listItems = await spGetAllItemsToList();
        setAllItems(listItems);
    }

    const addItemFunc = async () => {
        const item = await spAddItemToList(title ,firstname );

        setAllItems([
            ...allItems,
            item.data
        ])

        //clear text values
        setTitle("");
        setFirstName("");
    }

    const editItemFunc = async () => {
        const item = await spEditItemToList(id, title ,firstname);

        getAllItemsFunc();
        //clear text values
        setTitle("");
        setFirstName("");
    }

    const deleteItemFunc = async () => {
        const item = await spDeleteItemToList(id);

        getAllItemsFunc();
    }


    //-----------------  text input functions ---------------------------

    const handleTitleInput = async (e) => {
       setTitle(e.target.value)
    }
    const handleFirstnameInput = async (e) => {
        setFirstName(e.target.value)
    }



    return (
        <div>
            {name}
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="success" onClick={getAllItemsFunc}>Get All Items</Button>
                <Button variant="primary" onClick={addItemFunc}>Add Item</Button>
                <Button variant="info" onClick={editItemFunc}>Edit Item</Button>
                <Button variant="danger" onClick={deleteItemFunc}>Delete Item</Button>
            </ButtonGroup>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Form.Control type="text" value={title ? title : ""} onChange={handleTitleInput} placeholder="Personnel" />
                    <Form.Control type="text" value={firstname} onChange={handleFirstnameInput} placeholder="Access" />
                </Card.Body>
            </Card>
            <br />

            <CustomTable tableData={allItems} setTitle={setTitle} setFirstName={setFirstName} setId={setId} />
        </div>
    )
}

export default SamplePage;