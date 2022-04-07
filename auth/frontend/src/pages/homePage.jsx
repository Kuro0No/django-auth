import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'

const HomePage = () => {
    let [note, setNotes] = useState([])
    const {authTokens, logOut} = useAuth()
    useEffect( () => {
        async function getNotes (){
            const res = await axios.get('http://localhost:8000/api/notes',{
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access)
                }
            })
            if (res.status ===200){
                setNotes(res.data)
            } else if(res.statusText ==='Unauthorized'){
                logOut()
            }
            
        }
        getNotes()
    },[])

 
    return (
        <div>
            <h3>You are logged to the home page</h3>
            <ul>
                {note.map(note=>{
                    return (
                        <li key={note.id}>{note?.body}</li>
                    )
                })}
            </ul>
        </div>
    )
}

export default HomePage