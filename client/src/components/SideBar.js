import { Box, Typography, Divider, Stack } from '@mui/material'
import React from 'react'
import UserCard from './UserCard'
import LogoutIcon from '@mui/icons-material/Logout';

function SideBar() {

  const users = [
    {id: 1, firstName: "Youssef", lastName: "Jerbi"},
    {id: 2, firstName: "Alaa", lastName: "Jerbi"},
    {id: 3, firstName: "Nour", lastName: "Belmabrouk"},
  ]
  return (
    <Box 
      backgroundColor="#f7f7f7"
      height="100vh"
      width="250px"
      padding="10px"
    >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant='h6'>Chat</Typography>
          <LogoutIcon/>
        </Stack>
        <Divider />
        { users.map(item => {
            return (<UserCard ket={item.id} item={item}/>)
        })}

    </Box>
  )
}

export default SideBar