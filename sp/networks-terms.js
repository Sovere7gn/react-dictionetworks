import sp from '../environment/configSPConnection';

const LIST_NAME = "OfficialDatabase";


//get All items
export const spGetAllItemsToList = async () => {
   const items = await sp.web.lists.getByTitle(LIST_NAME).items.getAll();
   return items;
};

export const spGetItemToList = async (id) => {
    const items = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id)();
    return items;
 };

export const spAddItemToList = async (term, definition, acronym, docuCode, docuTitle, docuLink, effDate) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.add({field_1: term, field_2: definition, field_4: acronym, field_8: docuCode, field_9: docuTitle, field_10: docuLink, field_11: effDate});
    return item;
};

export const spEditItemToList = async (id, term, definition, acronym, docuCode, docuTitle, docuLink, effDate) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).update({field_1: term, field_2: definition, field_4: acronym, field_8: docuCode, field_9: docuTitle, field_10: docuLink, field_11: effDate});
    return item;
};
export const spDeleteItemToList = async (id) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).recycle();
    return item;
};

