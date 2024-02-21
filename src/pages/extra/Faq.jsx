import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'

function Faq() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="FAQ" subtitle="List of Frequently Asked Questions" />
      </Box>
    </Box>
  )
}

export default Faq