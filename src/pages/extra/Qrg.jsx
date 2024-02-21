import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Qrg() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="QRG" subtitle="Your Quick Reference Guide" />
      </Box>
    </Box>
  )
}

export default Qrg