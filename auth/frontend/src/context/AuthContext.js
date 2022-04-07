import { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext()
export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    const [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)

    async function loginUser(e) {
        e.preventDefault()
        let res = await axios.post(`http://localhost:8000/api/token/`, {
            username: e.target.username.value,
            password: e.target.password.value,
        })


        if (res.status === 200) {
            setAuthTokens(res.data)
            setUser(jwt_decode(res.data.access))
            localStorage.setItem('authTokens', JSON.stringify(res.data))
            navigate('/')
        } else {
            alert('Wrong ')
        }
    }
    function logOut() {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/')
    }
    async function updateTokens() {
        let res = await axios.post(`http://localhost:8000/api/token/refresh/`, {
            refresh: authTokens.refresh
        })
        if (res.status === 200) {
            setAuthTokens(res.data)
            setUser(jwt_decode(res.data.access))
            localStorage.setItem('authTokens', JSON.stringify(res.data))

        } else {
            setAuthTokens(null)
            setUser(null)
            localStorage.removeItem('authTokens')
            navigate('/')
        }
    }

    useEffect(() => {
        const fourMinutes = 1000 * 4 * 60
        const a = setInterval(() => {
            if (authTokens) {
                updateTokens()
            }
        }, fourMinutes)

        return () => {
            clearInterval(a)
        }
    }, [authTokens])

    const value = {
        loginUser,
        user,
        authTokens,
        logOut

    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider