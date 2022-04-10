import React, {useState, useRef} from 'react'
import { Box, Stack, Typography, Button, TextField, Card } from '@mui/material'

const  AuthScreen = () =>  {

    const [showLogin, setshowLogin] = useState(true)
    const [formData, setformData] = useState({})
    const authForm = useRef(null)

    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <Box
            ref={authForm}
            component="form"
            spacing={2}
            onSubmit={handleSubmit}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
        >   
            <Card
                variant='outlined'
                sx={{
                    padding: '10px'
                }}
            >
                <Stack 
                    direction="column"
                    sx={{
                        width: '400px'
                    }}
                >
                    <Typography variant='h5'>Please {showLogin ? 'Login' : 'Sign up'}</Typography>
                    {!showLogin && 
                    <>
                        <TextField 
                        label='First Name'
                        variant='standard'
                        name='firstName'
                        onChange={handleChange}
                        />
                        <TextField 
                        label='Last Name'
                        variant='standard'
                        name='lastName'
                        onChange={handleChange}
                        />
                    </>}
                    
                    <TextField 
                    type="email"
                    label='Email'
                    variant='standard'
                    name='email'
                    onChange={handleChange}
                    />
                    <TextField 
                    type="password"
                    label='Password'
                    variant='standard'
                    name='password'
                    onChange={handleChange}
                    />
                    <Typography textAlign="center" variant='subtitle1' onClick={() => {
                        setshowLogin((previousValue) => !previousValue)
                        setformData({})
                        authForm.current.reset()
                    }}> {showLogin ? "Sign up?" : "Login?"} </Typography>
                    <Button variant='outlined' type='submit'>{showLogin ? 'Login' : 'Sign up'}</Button>
                </Stack>
            </Card>
        </Box>
    )
}

export default AuthScreen