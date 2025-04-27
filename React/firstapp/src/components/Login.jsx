import React from 'react'
import { useState } from 'react'

const Login = () => {
  
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const handleLogin = () => {
        setIsLoggedIn(prevValue => !prevValue)
    }
    if(isLoggedIn){
        return (

            
                <>
                    <p>Welcome User</p>
                    <button className='bg-blue-400 p-5 rounded-md'
                      onClick={handleLogin}>Logout</button>
                </>
        )}
        else{
            return(
            <>
            <p>Click Login to Login</p>
            <button className='bg-blue-400 p-5 rounded-md'
             onClick={handleLogin}>Login</button>
            </>
        )}
           
    }
    
    
  

export default Login