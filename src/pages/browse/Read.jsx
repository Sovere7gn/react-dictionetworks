import React from 'react';
import { Box, Button, ListItemIcon, MenuItem, Typography, lighten, useTheme } from '@mui/material';
import Header from '../../components/Header'
import { MaterialReactTable, useMaterialReactTable, MRT_GlobalFilterTextField, MRT_ToggleFiltersButton } from 'material-react-table';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useMemo, useState, useEffect } from 'react';
import { AccountCircle, Send } from '@mui/icons-material';
import { spGetAllItemsToList, spAddEntryToList } from '../../sp/list-items';
import { getCurrentDetails } from '../../sp/user-profile';
import { useNavigate } from "react-router-dom";

const LIST_NAME = "Requests";
const LIST_NAME_3 = "OfficialDatabase";
const LIST_NAME_2 = "Dictionary";

const Example = () => {
  const [allItems, setAllItems] = useState([]);
  const [entries, setEntries] = useState([]);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("");


  useEffect(() => {
      getAllItemsFunc();
      getUserProfile();
      setData(allItems);
  }, []);

  const getAllItemsFunc = async () => {
      const listItems = await spGetAllItemsToList(LIST_NAME_2);
      setAllItems(listItems);
      setData(listItems);
  }

  const getUserProfile = async () => {
      const user = await getCurrentDetails();
      setName(user.userProps.NewName);
      setOffice(user.userProps.Office);
      setEmail(user.userProps.Email);
  };

  const navigate = useNavigate();

  const requestFunc = async (id, cud) => {
    const selectedItem = data.find(item => item.ID === id);
    const valuesToPass = {
      term: selectedItem.Term,
      acronym: selectedItem.Acronym,
      additional: selectedItem.Additional,
      definition: selectedItem.Definition,
      docutitle: selectedItem.DocuTitle,
      docucode: selectedItem.DocuCode,
      doculink: selectedItem.DocuLink,
      note: selectedItem.Note,
      dictionaryid: selectedItem.ID,
    };
    cud === "Delete" 
        ? navigate("/edit/delete", { state: { valuesToPass } } )
        : navigate("/edit/update", { state: { valuesToPass } } )
  }

  const columns = useMemo(
    () => [
          {
            accessorKey: 'ID', //hey a simple column for once
            header: 'Item ID',
            layoutMode: 'grid',
            enableClickToCopy: true,
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
            accessorKey: 'Term', //hey a simple column for once
            header: 'Term',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            layoutMode: 'grid',
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
            accessorKey: 'Definition', //accessorFn used to join multiple data into a single cell
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Definition',
            layoutMode: 'grid',
            // size: '200vh',
          },
          {
            accessorKey: 'Acronym', //hey a simple column for once
            header: 'Acronym',
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            layoutMode: 'grid',
          },
          {
            accessorKey: 'Additional', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Additional Information',
            layoutMode: 'grid',
          },
          {
            accessorKey: 'DocuTitle', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Document Title',
            layoutMode: 'grid',
          },
          {
            accessorKey: 'DocuCode', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Document Code',
            layoutMode: 'grid',
          },
          {
            accessorKey: 'DocuLink', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Document Link',
            layoutMode: 'grid',
            
          },
          {
            accessorKey: 'Note', //accessorKey used to define `data` column. `id` gets set to accessorKey automatically
            enableClickToCopy: true,
            filterVariant: 'autocomplete',
            header: 'Note',
            layoutMode: 'grid',
          },
        ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: true,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: true,
    initialState: {
      showGlobalFilter: true,
      density: 'compact',
      columnPinning: {
        left: ['mrt-row-expand', 'mrt-row-select'],
        right: ['mrt-row-actions'],
      },
      pagination: { pageSize: 50 },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      rowsPerPageOptions: [10, 25, 50, 100, 500],
      color: 'secondary',
      shape: 'rounded',
      variant: 'outlined',
    },
    renderRowActionMenuItems: ({ row, closeMenu }) => [
      <MenuItem
      key={0}
        onClick={() => {
          // Go to Request logic...
          console.log(row.getValue('ID'))
          requestFunc(row.getValue('ID'), "Update")
          
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Update Entry
      </MenuItem>,
      <MenuItem
        key={1}
        onClick={() => {
          // Go to Request logic...
          console.log(row.getValue('ID'))
          requestFunc(row.getValue('ID'), "Delete")
          
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          <Send />
        </ListItemIcon>
        Delete Entry
      </MenuItem>,
    ],
    renderTopToolbar: ({ table }) => {

      const handleApprove = () => {
        table.getSelectedRowModel().flatRows.map(async (row) => {
          alert('activating ' + row.getValue('name'));
        });
      };

      const handleReturn = () => {
        table.getSelectedRowModel().flatRows.map((row) => {
          alert('deactivating ' + row.getValue('name'));
        });
      };


      return (
        <>
          <Box
            sx={(theme) => ({
              backgroundColor: lighten(theme.palette.background.default, 0.05),
              display: 'flex',
              gap: '0.5rem',
              p: '8px',
              justifyContent: 'space-between',
            })}
          >
            <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
              {/* import MRT sub-components */}
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
            <Box>
              <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                  color="success"
                  disabled={!table.getIsSomeRowsSelected()}
                  onClick={handleApprove}
                  variant="contained"
                >
                  Approve
                </Button>
                <Button
                  color="error"
                  disabled={!table.getIsSomeRowsSelected()}
                  onClick={handleReturn}
                  variant="contained"
                >
                  Return
                </Button>
              </Box>
            </Box>
          </Box>

        </>

      );
    },
  });

  return (
    <Box sx={{
      // maxWidth: 'calc(1200px)',
    }}>
      <MaterialReactTable table={table} />
    </Box>
  );
};

const Read = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box m="20px">
      <Header title="READ" subtitle="Read DictioNetworks" />
      <Box
        m="20px 0 0 0"
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

export default Read;