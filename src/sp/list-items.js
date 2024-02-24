import sp from '../environment/configSPConnection';

const LIST_NAME = "Admin List";


//get All items
export const spGetAllItemsToList = async () => {
   const items = await sp.web.lists.getByTitle(LIST_NAME).items.getAll();
   return items;
};

export const spGetItemToList = async (id) => {
    const items = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id)();
    return items;
 };

export const spAddItemToList = async (title, firstname) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.add({Personnel_T    : title, Access: firstname});
    return item;
};

export const spEditItemToList = async (id, title, firstname , lastname) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).update({Title: title, Firstname: firstname, Lastname: lastname});
    return item;
};
export const spDeleteItemToList = async (id) => {
    const item = await sp.web.lists.getByTitle(LIST_NAME).items.getById(id).recycle();
    return item;
};

