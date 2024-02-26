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
              >
                <Typography variant="h4"
                sx={(theme) => ({
                  fontWeight: "bold",
                  width: "50vw",
                })}>
                  {cell.getValue()}
                </Typography>
              </Box>
            ),
          },
          {
            accessorKey: 'field_2',
            header: 'Acronym',
            enableClickToCopy: true,
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
          // {
          //   accessorKey: 'field_4',
          //   filterVariant: 'autocomplete',
          //   header: 'Document Title',
          //   layoutMode: 'grid',
          //   Cell: ({ cell }) => (
          //     <Box
          //       // component="span"
          //       sx={(theme) => ({
          //         fontWeight: "bold",
          //         width: "10vw",
          //         whiteSpace: "nowrap",
          //         overflow: "hidden",
          //         textOverflow: "ellipsis",
          //       })}
          //     >
          //       {cell.getValue()}
          //     </Box>
          //   ),
          // },
          // {
          //   accessorKey: 'field_5',
          //   filterVariant: 'autocomplete',
          //   header: 'Document Code',
          //   layoutMode: 'grid',
          //   Cell: ({ cell }) => (
          //     <Box
          //       // component="span"
          //       sx={(theme) => ({
          //         fontWeight: "bold",
          //         width: "10vw",
          //         whiteSpace: "nowrap",
          //         overflow: "hidden",
          //         textOverflow: "ellipsis",
          //       })}
          //     >
          //       {cell.getValue()}
          //     </Box>
          //   ),
          // },
          // {
          //   accessorKey: 'field_6',
          //   filterVariant: 'autocomplete',
          //   header: 'Document Link',
          //   layoutMode: 'grid',
          //   Cell: ({ cell }) => (
          //     <Box
          //       // component="span"
          //       sx={(theme) => ({
          //         fontWeight: "bold",
          //         width: "10vw",
          //         whiteSpace: "nowrap",
          //         overflow: "hidden",
          //         textOverflow: "ellipsis",
          //       })}
          //     >
          //       {cell.getValue()}
          //     </Box>
          //   ),
            
          // },
          // {
          //   accessorKey: 'ID',
          //   header: 'Dictionary ID',
          //   // layoutMode: 'grid',
          //   size: 10,
          //   minSize: 10,
          //   Cell: ({ cell }) => (
          //     <Box
          //       // component="span"
          //       sx={(theme) => ({
          //         fontWeight: "bold"
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
    enableStickyHeader: true,
    enableStickyFooter: true,
    enableTopToolbar: true,
    enableTableHead: false,
    enableBottomToolbar: false,
    enableExpandAll: true,
    positionPagination: "top",
    positionGlobalFilter: "left",
    initialState: {
      // expanded: true,
      showGlobalFilter: true,
      // density: 'compact',
      pagination: { pageSize: 100 },
      sorting: [
        { id: 'Title', desc: false },
        // { id: 'Status', desc: true },
      ],
    },
    state: {
      columnPinning: { right: ['mrt-row-expand'] },
    },
    paginationDisplayMode: 'pages',
    muiTableContainerProps: { sx: { maxHeight: '76.7vh' } },
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
    renderDetailPanel: ({ row }) => (
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          position: 'sticky',
          left: '10%',
          width: '80%',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4">
            {row.original.field_1}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'left',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexDirection: 'row'
            }}
          >
            <Typography variant="h6">Document Title: {row.original.field_4}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexDirection: 'row'
            }}
          >
            <Typography variant="h6">Document Code: {row.original.field_5}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'left',
              flexDirection: 'row'
            }}
          >
            <Typography variant="h6">Document Link: {row.original.field_6}</Typography>
          </Box>
        </Box>
        
      </Box>
    ),
    renderToolbarInternalActions: ({ table }) => (
      <Box>
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

const Browse = () => (
  //App.tsx or AppProviders file
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Box m="0px 1px 0px 1px">
      <Header title="BROWSE" subtitle="Browse DictioNetworks" />
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

export default Browse;
