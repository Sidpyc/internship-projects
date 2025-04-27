import React from 'react'
import {useState } from 'react'

const Welcome = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false)

  
    if(!isLoggedIn){
        return (
            <>  

            <p className='text-3xl text-center'>Please Login To Continue</p>
            <div className='flex justify-center items-center p-10'>
            <button className=' bg-gray-500 p-5 rounded-md' onClick={() => setIsLoggedIn(!isLoggedIn)}>Login</button>
            </div>
            </>
        )
    }

    else {
        return (
            <>
            <p className='text-3xl text-center'>Welcome User</p>
            <div className='flex justify-center items-center p-10'>
            <button className=' bg-gray-500  p-5 rounded-md ' onClick={() => setIsLoggedIn(!isLoggedIn)}>Logout</button>
            </div>
            </>
        )
    }
    
    
    


}

export default Welcome