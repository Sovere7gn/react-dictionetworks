import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Discussions() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DISCUSSIONS" subtitle="Disscuss with Others" />
      </Box>
    </Box>
  )
}

export default Discussions