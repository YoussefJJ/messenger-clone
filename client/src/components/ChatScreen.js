import { Box, AppBar, Toolbar, Avatar, Typography, TextField } from '@mui/material'
import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import MessageCard from './MessageCard'

function ChatScreen() {

  const {id, name } = useParams()


  const getAllMessages = () => {
    fetch('http://localhost:4000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlhdCI6MTY0ODk5NzM4OX0._ermi9LSQkHPL8_rfIEXCq29DWlkmX9wYwMurUQauUQ"
      },
      body: JSON.stringify({
        query: `
          query MessagesByUser($receiverId: Int) {
            messagesByUser(receiverId: $receiverId) {
              id
              text
              receiverId
              senderId
              createdAt
            }
          }
        `,
        variables: {
          receiverId: 2
        }
    })
    }).then(res => res.json())
    .then(data => {
      console.log(data)
      //update state

    })
  }
  
  return (
    <Box
      flexGrow={1}
    >
      <AppBar position="static"
        sx={{
          backgroundColor: 'white', boxShadow: 0
        }}
      >
        <Toolbar>
          <Avatar
            src={`https://avatars.dicebear.com/api/initials/${name}.svg`}
            sx={{
              width:"32px", height:"32px", mr: 2
            }}
          />
          <Typography variant='h6' color="black">{name}</Typography>
        </Toolbar>
      </AppBar>
      <Box backgroundColor="#f5f5f5" height="80vh" padding="10px" sx={{overflowY: "auto" }}>
        <MessageCard text="Hi Youssef" date="123" direction="start"/>
        <MessageCard text="Hi Youssef" date="123" direction="end"/>
        <MessageCard text="Hi Youssef" date="123" direction="start"/>
      </Box>
      <TextField placeholder='Enter a message' variant='standard' fullWidth multiline rows={2}/>
    </Box>
  )
}

export default ChatScreen