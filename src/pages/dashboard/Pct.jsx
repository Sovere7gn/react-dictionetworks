import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Pct() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="PCT" subtitle="View your Dashboard" />
      </Box>
    </Box>
  )
}

export default Pct