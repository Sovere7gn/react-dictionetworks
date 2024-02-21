import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Admin() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="ADMIN" subtitle="View your Dashboard" />
      </Box>
    </Box>
  )
}

export default Admin