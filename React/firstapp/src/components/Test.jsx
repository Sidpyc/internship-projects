import React, { useState } from 'react'

const Test = () => {
    const [name, setName] = useState('none');
  return (
    <>
        {name}
        <button onClick={() => setName('Sidd')}>Click Me</button>
    
    </>
  )
}

export default Test