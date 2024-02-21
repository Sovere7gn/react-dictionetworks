import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Extra() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="EXTRA" subtitle="Extra Things" />
      </Box>
    </Box>
  )
}

export default Extra