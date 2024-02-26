import React from 'react';
import { Box, Button, ListItemIcon, MenuItem, Typography, lighten, useTheme } from '@mui/material';
import Header from '../../components/Header'
import { MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton, MRT_ShowHideColumnsButton } from 'material-react-table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMemo, useState, useEffect } from 'react';
import { AccountCircle, Send } from '@mui/icons-material';
import { spGetAllItemsToList } from '../../sp/list-items';
import { getCurrentDetails } from '../../sp/user-profile';
import { useNavigate } from "react-router-dom";

const LIST_NAME = "Requests";
const LIST_NAME_2 = "Dictionary";
const LIST_NAME_3 = "OfficialDatabase";

const Example = () => {
  const [allItems, setAllItems] = useState([]);
  const [entries, setEntries] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");
  const [approver, setApprover] = useState("");


  useEffect(() => {
      getAllItemsFunc();
      getUserProfile();
      setData(allItems);
  }, []);

  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList(LIST_NAME_3);
      setAllItems(listItems);
      setData(listItems);
  }

  const getUserProfile = async () => {
      const user = await getCurrentDetails();
      setName(user.userProps.NewName);
      setOffice(user.userProps.Office);
      setEmail(user.userProps.Email);
      setApprover(user.userProps.Approver);
  };

  const navigate = useNavigate();

  const requestFunc = async (id, cud) => {
    const selectedItem = data.find(item => item.ID === id);
    const valuesToPass = {
      term: selectedItem.Title,
      acronym: selectedItem.field_2,
      additional: selectedItem.field_3,
      definition: selectedItem.field_1,
      docutitle: selectedItem.field_4,
      docucode: selectedItem.field_5,
      doculink: selectedItem.field_6,
      // effdate: selectedItem.field_7,
      dictionaryid: selectedItem.ID,
    };
    cud === "Delete" 
        ? navigate("/edit/delete", { state: { valuesToPass } } )
        : navigate("/edit/update", { state: { valuesToPass } } )
  }

  const columns = useMemo(
    () => [
          {
            accessorKey: 'Title',
            header: 'Term',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            layoutMode: 'grid',
            disableSortRemove: true,
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
            accessorKey: 'field_1',
            filterVariant: 'autocomplete',
            header: 'Definition',
            layoutMode: 'grid',
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "10vw",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                })}
              >
                {cell.getValue()}
              </Box>
            ),
            // size: '200vh',
          },
          {
            accessorKey: 'field_2',
            header: 'Acronym',
            filterVariant: 'autocomplete',
            layoutMode: 'grid',
          },
          {
            accessorKey: 'field_3',
            filterVariant: 'autocomplete',
            header: 'Additional Information',
            layoutMode: 'grid',
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "15vw",
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
            accessorKey: 'field_4',
            filterVariant: 'autocomplete',
            header: 'Document Title',
            layoutMode: 'grid',
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "10vw",
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
            accessorKey: 'field_5',
            filterVariant: 'autocomplete',
            header: 'Document Code',
            layoutMode: 'grid',
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "10vw",
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
            accessorKey: 'field_6',
            filterVariant: 'autocomplete',
            header: 'Document Link',
            layoutMode: 'grid',
            Cell: ({ cell }) => (
              <Box
                // component="span"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "10vw",
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
            accessorKey: 'ID',
            header: 'Dictionary ID',
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
          // {
          //   accessorKey: 'field_7', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
          //   enableClickToCopy: true,
          //   filterVariant: 'autocomplete',
          //   header: 'Effectivity Date',
          //   layoutMode: 'grid',
          //   Cell: ({ cell }) => (
          //     <Box
          //       // component="span"
          //       sx={(theme) => ({
          //         fontWeight: "bold",
          //         width: "5.5vw",
          //         whiteSpace: "nowrap",
          //         overflow: "hidden",
          //         textOverflow: "ellipsis",
          //       })}
          //     >
          //       {cell.getValue()}
          //     </Box>
          //   ),
          // },
        ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableGrouping: true,
    enableFacetedValues: true,
    enableRowActions: false,
    enableRowSelection: true,
    enableMultiRowSelection: false,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: {
      showGlobalFilter: false,
      density: 'compact',
      columnPinning: {
        left: ['mrt-row-expand'],
        right: ['mrt-row-actions', 'mrt-row-select'],
      },
      pagination: { pageSize: 20 },
      sorting: [
        { id: 'Title', desc: false },
        // { id: 'Status', desc: true },
      ],
    },
    paginationDisplayMode: 'pages',
    muiTableContainerProps: { sx: { maxHeight: '69vh' } },
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      rowsPerPageOptions: [10, 20, 50, 100, 500],
      shape: 'rounded',
      variant: 'outlined',
    },
    // renderRowActionMenuItems: ({ row, closeMenu }) => [
    //   <MenuItem
    //   key={0}
    //     onClick={() => {
    //       // Go to Request logic...
    //       console.log(row.getValue('ID'))
    //       requestFunc(row.getValue('ID'), "Update")
          
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <AccountCircle />
    //     </ListItemIcon>
    //     Update Entry
    //   </MenuItem>,
    //   <MenuItem
    //     key={1}
    //     onClick={() => {
    //       // Go to Request logic...
    //       console.log(row.getValue('ID'))
    //       requestFunc(row.getValue('ID'), "Delete")
          
    //       closeMenu();
    //     }}
    //     sx={{ m: 0 }}
    //   >
    //     <ListItemIcon>
    //       <Send />
    //     </ListItemIcon>
    //     Delete Entry
    //   </MenuItem>,
    // ],
    // renderTopToolbar: ({ table }) => {
    //   const handleApprove = () => {
    //     table.getSelectedRowModel().flatRows.map(async (row) => {
    //       alert('activating ' + row.getValue('name'));
    //     });
    //   };

    //   const handleReturn = () => {
    //     table.getSelectedRowModel().flatRows.map((row) => {
    //       alert('deactivating ' + row.getValue('name'));
    //     });
    //   };


    //   return (
    //     <>
    //       <Box
    //         sx={(theme) => ({
    //           backgroundColor: lighten(theme.palette.background.default, 0.05),
    //           display: 'flex',
    //           gap: '0.5rem',
    //           p: '8px',
    //           justifyContent: 'space-between',
    //         })}
    //       >
    //         <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
    //           {/* import MRT sub-components */}
    //           <MRT_GlobalFilterTextField table={table} />
    //           <MRT_ToggleFiltersButton table={table} />
    //         </Box>
    //         <Box>
    //           <Box sx={{ display: 'flex', gap: '0.5rem' }}>
    //           <Button
    //               color="success"
    //               disabled={!table.getIsSomeRowsSelected()}
    //               onClick={handleApprove}
    //               variant="contained"
    //             >
    //               Approve
    //             </Button>
    //             <Button
    //               color="error"
    //               disabled={!table.getIsSomeRowsSelected()}
    //               onClick={handleReturn}
    //               variant="contained"
    //             >
    //               Return
    //             </Button>
    //           </Box>
    //         </Box>
    //       </Box>

    //     </>

    //   );
    // },
    renderTopToolbarCustomActions: ({ table, row }) => (
      <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
        <Button 
          // sx={{
          //   backgroundColor: colors.blueAccent[500],
          //   color: colors.primary[400]
          // }}
          onClick={() => navigate('/edit/create')} 
          variant="contained"
          color="success"
        >
          Create New Term
        </Button>
        <Button 
          // sx={{
          //   backgroundColor: colors.blueAccent[500],
          //   color: colors.primary[400]
          // }}
          onClick={() => {
            navigate('/edit/update');
            table.getSelectedRowModel().flatRows.map((row) => {
              requestFunc(row.getValue('ID'), "Update");
            })
          }} 
          variant="contained"
          color="info"
          disabled={!table.getIsSomeRowsSelected()}
        >
          Update Selected Term
        </Button>
        <Button 
          // sx={{
          //   backgroundColor: colors.blueAccent[500],
          //   color: colors.primary[400]
          // }}
          onClick={() => {
            navigate('/edit/delete');
            table.getSelectedRowModel().flatRows.map((row) => {
              requestFunc(row.getValue('ID'), "Delete");
            })
          }} 
          variant="contained"
          color="error"
          disabled={!table.getIsSomeRowsSelected()}
        >
          Delete Selected Term
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
      <MaterialReactTable table={table} />
    </Box>
  );
};

const Edit = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box m="0px 1px 0px 1px">
      <Header title="EDIT" subtitle="Edit DictioNetworks" />
      <Box
        // m="20px 0 0 0"
        m="0 0 0 0"
        sx={{
          "& .MuiBox-root": {
          },
        }}
      >
  
        <Example />
      </Box>
    </Box>
    
  </LocalizationProvider>
);

export default Edit;
