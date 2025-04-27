import React, { useState } from 'react'
const InputName = () => {
    const [name, setName] = useState('')
    function handleChange(e){
        setName(e.target.value)
  
    }
  return (
    <>

        <input type="text"
        className='border-2 border-black' 
        onChange={handleChange}/>
       <p className=''>Hello {name}</p>
    </>
  )
}
export default InputName