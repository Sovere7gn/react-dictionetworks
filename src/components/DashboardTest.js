import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import ResponsiveChartContainer from '@mui/x-charts/ResponsiveChartContainer';

const yAxis = {
  scaleType: 'band',
  data: [
    'Create',
    'Update',
    'Delete',
  ],
};


export default function BasicStacking({tableData}) {
  let countApprovedCreate = tableData.reduce((acc, row) => {
    if (row.status === 'Approved' && row.requestType === 'Create') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  
  let countApprovedUpdate = tableData.reduce((acc, row) => {
    if (row.status === 'Approved' && row.requestType === 'Update') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let countApprovedDelete = tableData.reduce((acc, row) => {
    if (row.status === 'Approved' && row.requestType === 'Delete') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const approved = {
    data: [countApprovedCreate, countApprovedUpdate, countApprovedDelete], //Approved Create, Update, Delete
    label: 'Approved',
  };


  let countPendingCreate = tableData.reduce((acc, row) => {
    if (row.status === 'Pending' && row.requestType === 'Create') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  
  let countPendingUpdate = tableData.reduce((acc, row) => {
    if (row.status === 'Pending' && row.requestType === 'Update') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let countPendingDelete = tableData.reduce((acc, row) => {
    if (row.status === 'Pending' && row.requestType === 'Delete') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const pending = { //Pending Create, Update, Delete
    data: [countPendingCreate, countPendingUpdate, countPendingDelete],
    label: 'Pending',
  };

  let countNewCreate = tableData.reduce((acc, row) => {
    if (row.status === 'New' && row.requestType === 'Create') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);
  
  let countNewUpdate = tableData.reduce((acc, row) => {
    if (row.status === 'New' && row.requestType === 'Update') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  let countNewDelete = tableData.reduce((acc, row) => {
    if (row.status === 'New' && row.requestType === 'Delete') {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);


  const newCUD = { //New Create, Update, Delete
    data: [countNewCreate, countNewUpdate, countNewDelete],
    label: 'New',
  };

  return (
      <BarChart
        width={window.innerWidth * 0.5}
        height={window.innerHeight * 0.55}
        layout={'horizontal'}
        series={[
          { ...approved, stack: 'total' },
          { ...pending, stack: 'total' },
          { ...newCUD, stack: 'total' }, 
        ]}
        yAxis={[{...yAxis,},]}
      />
  );
}