import React from 'react'
import { Box } from '@mui/material'
import Header from '../../components/Header'
import TemporaryDrawer
 from '../global/Drawerbar'
function Home() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="HOME" subtitle="Welcome to Home" />
      </Box>
      <TemporaryDrawer />
    </Box>
  )
}

export default Home