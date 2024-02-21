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
    const [term, setTerm] = useState("");
    const [cud, setCUD] = useState("");
    const [office, setOffice] = useState("");
    const [id, setId] = useState();

    useEffect(() => {
        getAllItemsFunc();
        getUserProfile();
    }, []);
    
    //-----------------   button functions ---------------------------
    const getAllItemsFunc = async () => {
        const listItems = await spGetAllItemsToList();
        setAllItems(listItems);
    }

    const addItemFunc = async () => {
        const item = await spAddItemToList(name, term ,cud ,office);

        setAllItems([
            ...allItems,
            item.data
        ])

        //clear text values
        setTerm("");
        setCUD("");
        setOffice("");
    }

    const editItemFunc = async () => {
        const item = await spEditItemToList(id, name, term ,cud ,office);

        getAllItemsFunc();
        //clear text values
        setTerm("");
        setCUD("");
        setOffice("");
    }

    const deleteItemFunc = async () => {
        const item = await spDeleteItemToList(id);

        getAllItemsFunc();
        
    }

    const getUserProfile = async () => {
        const user = await getCurrentDetails();
        setName(user.userProps.NewName);
    };

    //-----------------  text input functions ---------------------------

    const handleIdInput = async (e) => {
        setId(e.target.value)
    }
    const handleTermInput = async (e) => {
       setTerm(e.target.value)
    }
    const handleCUDInput = async (e) => {
        setCUD(e.target.value)
    }
    const handleOfficeInput = async (e) => {
        setOffice(e.target.value)
    }



    return (
        <div>
            <ButtonGroup size="lg" className="mb-2">
                <Button variant="primary" onClick={addItemFunc}>Add Item</Button>
                <Button variant="success" onClick={editItemFunc}>Edit Item</Button>
                <Button variant="danger" onClick={deleteItemFunc}>Delete Item</Button>
            </ButtonGroup>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Form.Control type="text" value={name} placeholder={name} disabled readonly/>
                    <Form.Control type="text" value={id} onChange={handleIdInput} placeholder="ID" />
                    <Form.Control type="text" value={term ? term : ""} onChange={handleTermInput} placeholder="Term" />
                    <Form.Control type="text" value={cud} onChange={handleCUDInput} placeholder="CUD" />
                    <Form.Control type="text" value={office} onChange={handleOfficeInput} placeholder="Office" />
                </Card.Body>
            </Card>
            <br />

            <CustomTable tableData={allItems} setId={setId} setCUD={setCUD} setTerm={setTerm} setOffice={setOffice} />
        </div>
    )
}

export default SamplePage;