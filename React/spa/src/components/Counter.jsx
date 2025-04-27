import React from 'react'
import { useState, useEffect } from 'react'
const Counter = () => {
  
  const [count, setCount ] = useState(0)
  useEffect((() => {
      console.log(` Count Value has been updated to ${count} `)
  }
))
    return (

    <div className='flex justify-center items-center'>
        <div>
        <p className='text-center text-xl p-5'>{count}</p>
        <button className='bg-blue-400 p-5 rounded-md ' onClick={() => setCount(count + 1)}>Increment</button>
        <button className='bg-red-400 p-5 rounded-md m-2' onClick={() => setCount(count - 1)}>Decrement</button>
        <button className='bg-gray-500 p-5 rounded-md' onClick={() => setCount(0)}>Reset</button>
        </div>
      
    </div>

  )
}

export default Counter