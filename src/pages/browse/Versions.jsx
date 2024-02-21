import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Versions() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="VERSIONS" subtitle="View Past Versions of Entries" />
      </Box>
    </Box>
  )
}

export default Versions