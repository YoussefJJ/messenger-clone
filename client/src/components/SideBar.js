import { Box, Typography, Divider, Stack } from '@mui/material'
import React, { useContext } from 'react'
import UserCard from './UserCard'
import LogoutIcon from '@mui/icons-material/Logout';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../graphql/queries';
import AuthContext from '../context/AuthContext';

function SideBar() {

  const {loading, data, error} = useQuery(GET_ALL_USERS, {
    onCompleted: (data) => {
      console.log(data)
    }
  })

  const {setAuthenticated} = useContext(AuthContext)

  if (loading) {
    return (<Typography variant="h6">Loading chat...</Typography>)
  }

  if (error) {
    console.log(error.message)
  }



  // if (data) {
  //   console.log(data)
  // }

  return (
    <Box 
      backgroundColor="#f7f7f7"
      height="100vh"
      width="250px"
      padding="10px"
    >
        <Stack direction="row" justifyContent="space-between">
          <Typography variant='h6'>Messaging App</Typography>
          <Stack 
            className='logout-icon'
            onClick={() => {
              localStorage.removeItem('jwt')
              setAuthenticated(false)
            }}
          >
            <LogoutIcon
              />
          </Stack>
        </Stack>
        <Divider />
        { data.users.map(item => {
            return (<UserCard key={item.id} item={item}/>)
        })}

    </Box>
  )
}

export default SideBar