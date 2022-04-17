import { createContext } from "react"

const AuthContext = createContext({
    authenticated: localStorage.getItem('jwt') ? true : false,
    setAuthenticated: () => {},
})

export default AuthContext;
