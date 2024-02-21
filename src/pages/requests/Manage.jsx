import React from 'react';
import { 
  Box, 
  Button, 
  ListItemIcon, 
  MenuItem, 
  Typography, 
  lighten, 
  Alert, 
  Snackbar, 
  AlertTitle, 
  TextField,
  useTheme, } from '@mui/material';
import Header from '../../components/Header'
import { MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton } from 'material-react-table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMemo, useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { spGetAllItemsToList, spAddEntryToList, spEditStatus, spDeleteItemToList, spEditEntryToList } from '../../sp/list-items';
import { getCurrentDetails } from '../../sp/user-profile';
import DialogRequest from '../../components/Dialog';

const LIST_NAME = "Requests";
const LIST_NAME_2 = "Dictionary";

const Body = () => {
  const [allItems, setAllItems] = useState([]);
  const [entries, setEntries] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [request, setRequest] = useState([]);

  useEffect(() => {
      getAllItemsFunc();
      getUserProfile();
      setData(allItems);
  }, []);

  // const refreshPage = async () => {
  //   await new Promise((resolve) => setTimeout(resolve, 3000));
  //   window.location.reload(false);
  // }

  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList(LIST_NAME);
      setAllItems(listItems);
      setData(listItems);
  }

  const getUserProfile = async () => {
      const user = await getCurrentDetails();
      setName(user.userProps.NewName);
      setOffice(user.userProps.Office);
      setEmail(user.userProps.Email);
  };

  const performCUD = async (id, cud) => {
    cud === "Create" 
        ? addEntryFunc(id)
        : cud === "Update"
            ? editEntryFunc(id)
            : deleteEntryFunc(id);
  }

  const addEntryFunc = async (id) => {
    const selectedItem = data.find(item => item.ID === id);
    const entry = await spAddEntryToList(
      LIST_NAME_2,
      selectedItem.Term,
      selectedItem.Acronym,
      selectedItem.Additional,
      selectedItem.Definition,
      selectedItem.DocuTitle,
      selectedItem.DocuCode,
      selectedItem.DocuLink,
      selectedItem.Note,
    );
    
    await spEditStatus(LIST_NAME, id, "Approved");
    getAllItemsFunc();
  };

  const editEntryFunc = async (id) => {
    const selectedItem = data.find(item => item.ID === id);
    const entry = await spEditEntryToList(
      LIST_NAME_2,
      selectedItem.DictionaryID,
      selectedItem.Term,
      selectedItem.Acronym,
      selectedItem.Additional,
      selectedItem.Definition,
      selectedItem.DocuTitle,
      selectedItem.DocuCode,
      selectedItem.DocuLink,
      selectedItem.Note,
    );
    
    await spEditStatus(LIST_NAME, id, "Approved");
    getAllItemsFunc();
  };

  const deleteEntryFunc = async (id) => {
    const selectedItem = data.find(item => item.ID === id);
    const entry = await spDeleteItemToList(
      LIST_NAME_2,
      selectedItem.DictionaryID
    );
    
    await spEditStatus(LIST_NAME, id, "Approved");
    getAllItemsFunc();
  };

  const columns = useMemo(
    () => [
          {
            accessorFn: (item) => new Date(item.Created), //convert to Date for sorting and filtering
            id: 'Created',
            header: 'Date',
            filterVariant: 'date',
            filterFn: 'lessThan',
            sortingFn: 'datetime',
            size: 10,
            minSize: 10,
            sortDescFirst: true,
            Cell: ({ cell }) => cell.getValue()?.toLocaleDateString(), //render Date as a string
            Header: ({ column }) => <em>{column.columnDef.header}</em>, //custom header markup
            // layoutMode: 'grid',
            muiFilterTextFieldProps: {
              sx: {
                minWidth: '100px',
              },
            },
          },
          {
            accessorKey: 'ID', //hey a simple column for once
            header: 'Req ID',
            // layoutMode: 'grid',
            size: 10,
            minSize: 10,
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold"
                })}
              >
                {cell.getValue()}
              </Box>
            ),
          },
          {
            accessorKey: 'Status',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterSelectOptions: ['Pending', 'Approved', 'Returned'],
            filterVariant: 'select',
            sortDescFirst: true,
            header: 'Status',
            // layoutMode: 'grid',
            size: 10,
            minSize: 10,
            sortingFn: (rowA, rowB, columnId) => {
              // Custom sorting logic for status
              const statusOrder = {
                "Pending": 2,
                "Approved": 1,
                "Returned": 0,
              };
              const statusA = rowA.getValue(columnId);
              const statusB = rowB.getValue(columnId);
              return statusOrder[statusA] - statusOrder[statusB];
            },
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === "Pending"
                      ? theme.palette.warning.dark
                      : cell.getValue() === "Approved"
                        ? theme.palette.success.dark
                        : theme.palette.error.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  width: '75px',
                  textAlign: 'center',
                  p: '0.25rem',
                })}
              >
                {cell.getValue()}
              </Box>
            ),
          },
          {
            accessorKey: 'Term', //hey a simple column for once
            header: 'Term',
            // layoutMode: 'grid-no-grow',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',

            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "20vw",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                })}
              >
                {cell.getValue()}
              </Box>
            ),
          },
          {
            accessorKey: 'CUD',
            // filterVariant: 'range', //if not using filter modes feature, use this instead of filterFn
            filterVariant: 'select',
            filterSelectOptions: ['Create', 'Update', 'Delete'],
            header: 'CUD Type',
            size: 10,
            minSize: 10,
            // layoutMode: 'grid',
            //custom conditional format and styling
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  backgroundColor:
                    cell.getValue() === "Create"
                      ? theme.palette.info.dark
                      : cell.getValue() === "Update"
                        ? theme.palette.success.dark
                        : theme.palette.error.dark,
                  borderRadius: '0.25rem',
                  color: '#fff',
                  width: '75px',
                  textAlign: 'center',
                  p: '0.25rem',
                })}
              >
                {cell.getValue()}
              </Box>
            ),
          },
          {
            accessorKey: 'Name', //accessorFn used to join multiple data into a single cell
            filterVariant: 'autocomplete',
            header: 'Name',
            // layoutMode: 'grid',
            // size: '200vh',
            size: 10,
            minSize: 10,
          },
          {
            accessorKey: 'Office', //hey a simple column for once
            header: 'Office',
            // layoutMode: 'grid',
            filterVariant: 'autocomplete',
            size: 10,
            minSize: 10,
          },
          // {
          //   accessorKey: 'Email', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
          //   enableClickToCopy: true,
          //   filterVariant: 'autocomplete',
          //   header: 'Email',
          //   // layoutMode: 'grid',
          //   size: 10,
          //   minSize: 10,
          // },
          
        ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: false, //true
    enableColumnOrdering: false,//true
    enableGrouping: false, //true
    enableColumnPinning: true, //true
    enableFacetedValues: true,
    enableRowActions: true,
    // enableRowSelection: (row) => row.original.Status === "Pending",
    initialState: {
      showGlobalFilter: true,
      density: 'compact',
      showColumnFilters: true,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
      columnVisibility: { ID: false },
      sorting: [
        { id: 'Created', desc: true },
        // { id: 'Status', desc: true },
      ],
      pagination: { pageSize: 15 },
    },
    // isMultiSortEvent: () => true,
    enablePagination: true,
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      rowsPerPageOptions: [5, 10, 15, 20, 25],
      color: 'secondary',
      shape: 'rounded',
      variant: 'outlined',
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
        key={0}
        onClick={async () => {
          // Send email logic...
          const selectedItem = data.find(item => item.ID === row.getValue('ID'));
          // console.log(selectedItem);
          setRequest(selectedItem);
          setOpenDialog(true);
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <VisibilityIcon />
        </ListItemIcon>
        View Request
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={async () => {
          // Go to Request logic...
          if (row.getValue('Status') === "Pending") {
            await performCUD(row.getValue('ID'), row.getValue('CUD'));
            closeMenu();
            // setOpen(true);
            return;
          };
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <CheckIcon />
        </ListItemIcon>
        Approve Request
      </MenuItem>,
      <MenuItem
        key={2}
        onClick={async () => {
          // Send email logic...
          if (row.getValue('Status') === "Pending") {
            await spEditStatus(LIST_NAME, row.getValue('ID'), "Returned");
            getAllItemsFunc();
            closeMenu();
            // setOpen(true);
            return;
          };
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <CloseIcon />
        </ListItemIcon>
        Return Request
      </MenuItem>,
        
    ],
  });

  const theme = useTheme();

  return (
    <Box sx={{
      // maxWidth: 'calc(1200px)',
    }}>
      {/* <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={5000} open={open} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity="success"
        variant="filled"
        sx={{ width: '100%' }}
      >
        <AlertTitle>Success</AlertTitle>
        Request is Approved!
      </Alert>
      </Snackbar>   */}
      <DialogRequest 
          title="View Request"
          openDialog={openDialog}
          request={request}
          setOpenDialog={setOpenDialog}
      />
      <MaterialReactTable table={table} />
    </Box>
  );
};

const Manage = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box m="20px">
      <Header title="MANAGE" subtitle="Manage Requests" />
      <Box
        m="20px 0 0 0"
        sx={{
          "& .MuiBox-root": {
          },
        }}
      >
  
        <Body />
      </Box>
    </Box>
    
  </LocalizationProvider>
);

export default Manage;