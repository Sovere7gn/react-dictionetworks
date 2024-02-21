import { date } from 'yup';
import sp from '../environment/configSPConnection';

//get All items
export const spGetAllItemsToList = async (LIST_NAME) => {
   const items = await sp.web.lists.getByTitle(LIST_NAME).items.getAll();
   return items;
};

export const spGetItemToList = async (LIST_NAME, id) => {
    const items = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id)();
    return items;
 };

export const spAddItemToList = async (
    LIST_NAME,
    name,
    office,
    email,
    statuss,
    term,
    acronym,
    additional,
    definition,
    docutitle,
    docucode,
    doculink,
    note,
    cud,
    dictionaryid,
    ) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.add({
        Name: name,
        Office: office,
        Email: email,
        // Approver1: approver,
        Status: statuss,
        // Remarks1: remarks,
        Term: term,
        Definition: definition,
        Acronym: acronym,
        Additional: additional,
        DocuTitle: docutitle,
        DocuCode: docucode,
        DocuLink: doculink,
        Note: note,
        CUD: cud,
        DictionaryID: dictionaryid,
    });
    return item;
};

export const spAddEntryToList = async (
    LIST_NAME,
    term,
    acronym,
    additional,
    definition,
    docutitle,
    docucode,
    doculink,
    ) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.add({
        Title: term,
        field_1: definition,
        field_2: acronym,
        field_3: additional,
        field_4: docutitle,
        field_5: docucode,
        field_6: doculink,
    });
    return item;
};

export const spEditStatus = async (LIST_NAME, id, value) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).update({
        Status: value
    });
    return item;
};

export const spEditItemToList = async (LIST_NAME, id, name, term, cud, office) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).update({
        Name: name,
        Term: term, 
        CUD: cud, 
        Office: office
    });
    return item;
};

export const spEditEntryToList = async (
    LIST_NAME,
    id,
    term,
    acronym,
    additional,
    definition,
    docutitle,
    docucode,
    doculink,
    ) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).update({
        Title: term,
        field_1: definition,
        field_2: acronym,
        field_3: additional,
        field_4: docutitle,
        field_5: docucode,
        field_6: doculink,
    });
    return item;
};

export const spDeleteItemToList = async (LIST_NAME, id) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).recycle();
    return item;
};

