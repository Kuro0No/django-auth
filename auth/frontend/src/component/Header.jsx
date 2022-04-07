import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
const Header = () => {
    const {user } = useAuth()
  return (
    <div>
        <nav>
            <ul>
                <li>
                    <Link to='/login'> Login</Link>
                </li>
                <li>
                    <Link to='/'> Home</Link>
                </li>
            </ul>
        </nav>
        
    </div>
  )
}

export default Header