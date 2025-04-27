import React, { useState } from 'react'
import ClickButton from './components/ClickButton'
import Counter from './components/Counter'
import Greeting from './components/Greeting'
import InputName from './components/InputName'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Test from './components/test'



const App = () => {
  return (
    <>
      <Navbar/>
      <Login/>  

      <div className = 'text-center'>
      <Greeting 
      name="Siddarth"/>
      
      <ClickButton/>
      <InputName/>  
      <Counter/>
      <Test/>
      </div>
    </>
  )
}

export default App