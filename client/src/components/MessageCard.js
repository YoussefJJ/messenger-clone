import { Box, Typography } from '@mui/material'
import React from 'react'

function MessageCard({text, date, direction}) {
  return (
      <Box
        display="flex"
        justifyContent={direction}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: direction === "start" ? 'flex-start' : 'flex-end',
        }}>
            <Typography 
            sx={{
              borderRadius: '5px',
            }}
            variant='subtitle2' 
            backgroundColor={direction == "start" ? "white" : "#64b362"}
            color={direction == "start" ? "black" : "white"}
            padding="5px"
            >{text}</Typography>
            <Typography 
            variant='caption' 
            title={new Date(date).toLocaleString()}
            >{new Date(date).toLocaleTimeString(
              navigator.language,
              {
                hour: '2-digit',
                minute: '2-digit',
            })}</Typography>
        </Box>
      </Box>

  )
}

export default MessageCard