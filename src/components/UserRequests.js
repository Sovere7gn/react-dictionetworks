import { useMemo } from 'react';

//MRT Imports
import {
  MaterialReactTable,
  useMaterialReactTable,
  MRT_GlobalFilterTextField,
  MRT_ToggleFiltersButton,
} from 'material-react-table';

//Material UI Imports
import {
  Box,
  ListItemIcon,
  MenuItem,
  lighten,
} from '@mui/material';


//Date Picker Imports - these should just be in your Context Provider
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const RequestHandler = ({data}) => {
  const columns = useMemo(
    () => [
      {
        id: 'ID', //id used to define `group` column
        columns: [
          {
            accessorKey: 'Title', //hey a simple column for once
            header: 'Term',
            size: 20,

          },
          {
            accessorKey: 'requestType', //hey a simple column for once
            header: 'Request Type',
            size: 20,
          },
          {
            accessorKey: 'status', //hey a simple column for once
            header: 'Status',
            size: 20,
          },
          {
            accessorKey: 'approverID', //hey a simple column for once
            header: 'Approver',
            size: 20,
          },
        ],
      },
    ],
    [],
  );
  const table = useMaterialReactTable({
    columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnFilterModes: true,
    enableColumnOrdering: false, 
    enableColumnActions: false,
    enableGrouping: true,
    enableColumnPinning: true,
    enableFacetedValues: true,
    enableRowActions: true,
    enableRowSelection: false , // false
    initialState: {
      showColumnFilters: false, // false
      showGlobalFilter: true,
      pagination: { pageSize: 5},
      columnPinning: {
        right: ['mrt-row-actions'],
      },
    },
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    muiSearchTextFieldProps: {
      size: 'small',
      variant: 'outlined',
    },
    muiPaginationProps: {
      color: 'secondary',
      shape: 'rounded',
      variant: 'outlined',
    },
    renderRowActionMenuItems: ({ closeMenu }) => [ // for actions per row
      <MenuItem
        key={1}
        onClick={() => {
          // Send email logic...
          closeMenu();
        }}
        sx={{ m: 0 }}
      >
        <ListItemIcon>
          {/* <Send /> */}
        </ListItemIcon>
        Send Follow Up
      </MenuItem>,
    ],
    
    renderTopToolbar: ({ table }) => {
      return (
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
              <MRT_GlobalFilterTextField table={table} />
              <MRT_ToggleFiltersButton table={table} />
            </Box>
          </Box>
      );
    },
  });
  console.log(table);
  return <MaterialReactTable table={table} />;
};


const DashboardTest = ({tableData}) => (
  //App.tsx or AppProviders file
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <RequestHandler data={tableData}/>
    </LocalizationProvider>
);

export default DashboardTest;