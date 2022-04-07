import React from 'react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    const {loginUser} = useAuth()


   
    return (
        
        <form onSubmit={loginUser}>
            <div>
                <label htmlFor="">User Name</label>
                <input type='text' name='username' />

            </div>

            <div>
                <label htmlFor="">Password</label>
                <input type='password' name='password' />

            </div>
            <input type='submit'  />
        </form>
    )
}

export default Login