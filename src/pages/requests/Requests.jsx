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
  useTheme,
  IconButton, } from '@mui/material';
import Header from '../../components/Header'
import { MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MRT_ShowHideColumnsButton } from 'material-react-table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMemo, useState, useEffect } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { spGetAllItemsToList, spAddEntryToList, spEditStatus, spDeleteItemToList, spEditEntryToList } from '../../sp/list-items';
import { getCurrentDetails } from '../../sp/user-profile';
import DialogRequest from '../../components/Dialog';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import { tokens } from '../../theme';

const LIST_NAME = "Requests";
const LIST_NAME_2 = "Dictionary";
const LIST_NAME_3 = "OfficialDatabase";

const Body = () => {
  const [allItems, setAllItems] = useState([]);
  const [entries, setEntries] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [request, setRequest] = useState([]);
  
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

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
      LIST_NAME_3,
      selectedItem.Term,
      selectedItem.Acronym,
      selectedItem.Additional,
      selectedItem.Definition,
      selectedItem.DocuTitle,
      selectedItem.DocuCode,
      selectedItem.DocuLink,
    );
    
    await spEditStatus(LIST_NAME, id, "Approved");
    getAllItemsFunc();
  };

  const editEntryFunc = async (id) => {
    const selectedItem = data.find(item => item.ID === id);
    const entry = await spEditEntryToList(
      LIST_NAME_3,
      selectedItem.DictionaryID,
      selectedItem.Term,
      selectedItem.Acronym,
      selectedItem.Additional,
      selectedItem.Definition,
      selectedItem.DocuTitle,
      selectedItem.DocuCode,
      selectedItem.DocuLink,
    );
    
    await spEditStatus(LIST_NAME, id, "Approved");
    getAllItemsFunc();
  };

  const deleteEntryFunc = async (id) => {
    const selectedItem = data.find(item => item.ID === id);
    const entry = await spDeleteItemToList(
      LIST_NAME_3,
      selectedItem.DictionaryID
    );
    
    await spEditStatus(LIST_NAME, id, "Approved");
    getAllItemsFunc();
  };

  const columns = useMemo(
    () => [
          {
            accessorKey: 'Term',
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
            // filterVariant: 'range',
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
            accessorFn: (item) => new Date(item.Created),
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
            accessorKey: 'Status',
            // filterVariant: 'range',
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
                      ? theme.palette.info.dark
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
            accessorKey: 'ID',
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
            accessorKey: 'Name',
            filterVariant: 'autocomplete',
            header: 'Name',
            // layoutMode: 'grid',
            // size: '200vh',
            size: 10,
            minSize: 10,
          },
          {
            accessorKey: 'Office',
            header: 'Office',
            // layoutMode: 'grid',
            filterVariant: 'autocomplete',
            size: 10,
            minSize: 10,
          },
          {
            accessorKey: 'Email',
            filterVariant: 'autocomplete',
            header: 'Email',
            // layoutMode: 'grid',
            size: 10,
            minSize: 10,
          },
          
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
    enableStickyHeader: true,
    enableFacetedValues: true,
    enableRowActions: true,
    displayColumnDefOptions: {
      'mrt-row-actions': {
        header: 'Actions', //change header text
        size: 100, //make actions column wider
      },
    },
    enableColumnActions: false,
    columnFilterDisplayMode: 'popover',
    // enableRowSelection: (row) => row.original.Status === "Pending",
    initialState: {
      showGlobalFilter: false,
      density: 'compact',
      showColumnFilters: false,
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
      columnVisibility: { ID: false, Created: false },
      sorting: [
        { id: 'Created', desc: true },
        // { id: 'Status', desc: true },
      ],
      pagination: { pageSize: 15 },
    },
    // isMultiSortEvent: () => true,
    // enableColumnVirtualization: true,
    enablePagination: false,
    paginationDisplayMode: 'pages',
    enableBottomToolbar: false,
    // positionToolbarAlertBanner: 'bottom',
    muiTableContainerProps: { sx: { maxHeight: '75vh' } },
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
    muiTableHeadCellProps: {
      sx: {
        '& .MuiTableCell-head': {
          justifyContent: 'space-between !important',
        },
      },
    },
    renderRowActions: ({ row }) => [
      <Box>
        <IconButton
          color="info"
          key={0}
          onClick={async () => {
            // Send email logic...
            const selectedItem = data.find(item => item.ID === row.getValue('ID'));
            // console.log(selectedItem);
            setRequest(selectedItem);
            setOpenDialog(true);
          }}
          sx={{ m: 0 }}
        >
          <InfoOutlinedIcon />
        </IconButton>
        <IconButton
          color="success"
          key={1}
          onClick={async () => {
            // Go to Request logic...
            if (row.getValue('Status') === "Pending") {
              await performCUD(row.getValue('ID'), row.getValue('CUD'));
              // setOpen(true);
              return;
            };
          }}
          sx={{ m: 0 }}
        >
          <CheckIcon />
        </IconButton>
        <IconButton
          color="error"
          key={2}
          onClick={async () => {
            // Send email logic...
            if (row.getValue('Status') === "Pending") {
              await spEditStatus(LIST_NAME, row.getValue('ID'), "Returned");
              getAllItemsFunc();
              // setOpen(true);
              return;
            };
          }}
          sx={{ m: 0 }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton
            color="info"
            onClick={async () => {
              if (row.getValue('Status') === "Pending") {
                const selectedItem = data.find(item => item.ID === row.getValue('ID'));
                const body = `Hi ${selectedItem.Name},%0D%0A%0D%0ATerm: ${selectedItem.Term}%0D%0ACUD Type: ${selectedItem.CUD}%0D%0AStatus: ${selectedItem.Status}%0D%0A%0D%0ARemarks:%0D%0A`
                window.open(
                  // Should include CC to Owners
                  `mailto:${selectedItem.Email}
                  ?subject=Your DictioNetworks Request for the Term "${selectedItem.Term}"
                  &body=${body}`, '_self'
                )
                return;
              };
            }}
          >
            <EmailOutlinedIcon />
          </IconButton>
      </Box>
    ],
    renderTopToolbarCustomActions: ({ table }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        <Button 
          // sx={{
          //   backgroundColor: colors.blueAccent[500],
          //   color: colors.primary[400]
          // }}
          onClick={() => table.reset(true)} 
          variant="contained"
        >
          Clear All Sorting
        </Button>
        {/* <Button
          color="secondary"
          onClick={() => {
            alert('Create New Account');
          }}
          variant="contained"
        >
          Create Account
        </Button>
        <Button
          color="error"
          disabled={!table.getIsSomeRowsSelected()}
          onClick={() => {
            alert('Delete Selected Accounts');
          }}
          variant="contained"
        >
          Delete Selected Accounts
        </Button>
        <MRT_GlobalFilterTextField table={table} /> */}
      </Box>
    ),
    //customize built-in buttons in the top-right of top toolbar
    renderToolbarInternalActions: ({ table }) => (
      <Box>
        <MRT_ShowHideColumnsButton table={table} />
      </Box>
    ),
  });

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

const Requests = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box m="10px">
      <Header title="REQUESTS" subtitle="View Requests" />
      <Box
        m="0 0 0 0"
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

export default Requests;