import React, {useState, useRef} from 'react'
import { Box, Stack, Typography, Button, TextField, Card, CircularProgress, Alert } from '@mui/material'
import { useMutation } from '@apollo/client'
import { SIGN_UP_USER, LOGIN_USER } from '../graphql/mutations'

const  AuthScreen = ({ setLoggedIn }) =>  {

    const [showLogin, setshowLogin] = useState(true)
    const [formData, setformData] = useState({})
    const authForm = useRef(null)

    const [signupUser, { data: signUpData, loading: l1, error: e1 }] = useMutation(SIGN_UP_USER)

    const [loginUser, { data: loginData, loading: l2, error: e2 }] = useMutation(LOGIN_USER, {
        onCompleted(data) {
            localStorage.setItem('jwt', data.signinUser.token)
            setLoggedIn(true)
        }
    })

    if (l1 || l2) {
        return (
        <Box display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        >
            <Box textAlign="center">
                <CircularProgress />
                <Typography variant="h6">Authenticating...</Typography>
            </Box>
        </Box>)
    }



    const handleChange = (e) => {
        setformData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (showLogin) {
            loginUser({
                variables: {
                    userLogin: formData
                }
            })
        } else {
            signupUser({
                variables: {
                    userNew: formData
                }
            })
        }
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
                    {signUpData && <Alert severity="success">{signUpData.signupUser.firstName} Signed Up</Alert>}
                    {e1 && <Alert severity="error">{e1.message}</Alert>}
                    {e2 && <Alert severity="error">{e2.message}</Alert>}
                    <Typography variant='h5'>Please {showLogin ? 'Login' : 'Sign up'}</Typography>
                    {!showLogin && 
                    <>
                        <TextField 
                        label='First Name'
                        variant='standard'
                        name='firstName'
                        onChange={handleChange}
                        required
                        />
                        <TextField 
                        label='Last Name'
                        variant='standard'
                        name='lastName'
                        onChange={handleChange}
                        required
                        />
                    </>}
                    
                    <TextField 
                    type="email"
                    label='Email'
                    variant='standard'
                    name='email'
                    onChange={handleChange}
                    required
                    />
                    <TextField 
                    type="password"
                    label='Password'
                    variant='standard'
                    name='password'
                    onChange={handleChange}
                    required
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