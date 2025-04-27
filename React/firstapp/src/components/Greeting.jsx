import React from 'react'

const Greeting = (props) => {

   
  return (
    <>
          <h1 className='text-3xl flex justify-center '>
          Hello { props.name }
          </h1>

    </>
  )
}

export default Greeting