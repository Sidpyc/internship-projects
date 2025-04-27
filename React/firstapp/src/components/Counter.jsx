import React from 'react'
import { useState } from 'react'
const Counter = () => {
    const [count, setCount]=useState(0)
    function increment() {
        setCount(prevCount => prevCount + 1)
    }
    function decrement(){
        setCount(prevCount => prevCount - 1)
    }
  return (
    <>
        <button 
        onClick={increment}
        className=' bg-blue-400'>plus</button>

        <p>{count}</p>
        <button 
        onClick={decrement}
        className='bg-red-400'>minus</button> 


        
    </>
  )
}

export default Counter