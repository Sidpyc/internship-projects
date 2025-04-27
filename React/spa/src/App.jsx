import React from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route , Link } from 'react-router-dom'
import About from './components/About'
import Contact from './components/Contact'
import Counter from './components/Counter'
import Welcome from './components/Welcome'
import UserAPI from './components/UserAPI'
import TodosAPI from './components/TodosAPI'
import UserData from './components/UserData'

const App = () => {
  return (
    <>
      <Router>
        
        <div>
          <nav className='bg-gray-600 p-10 '>
            <ul className='flex justify-between items-center text-center'>
              <li className='text-xl text-white hover:text-red-400 '><Link to="/">Home</Link></li>
              <li className='text-xl text-white'><Link to="/about">About</Link></li>
              <li className='text-xl text-white'><Link to="/contact">Contact</Link></li>  
              <li className='text-xl text-white'><Link to ='/welcome'>Welcome</Link></li>
              <li className='text-xl text-white'><Link to ='/counter'>Counter</Link></li>
              <li className='text-xl text-white'><Link to = '/users'>Users</Link></li>
              <li className='text-xl text-white'><Link to = '/todos'>Todos</Link></li>
              <li className='text-xl text-white'><Link to = '/userdata'>User Data</Link></li>  
            </ul>  
          </nav>
        </div>
  
        <div>
          <Routes>
            <Route path = '/' element={<Home/>}/>
            <Route path = '/about' element={<About/>}/>
            <Route path = '/contact' element={<Contact/>}/>
            <Route path = '/welcome' element={<Welcome/>}/>
            <Route path = '/counter' element={<Counter/>}/>
            <Route path = '/users' element={<UserAPI/>}/>
            <Route path = '/todos' element={<TodosAPI/>}/>
            <Route path = '/userdata' element={<UserData/>}/>
          </Routes>
        </div>
      </Router>
    
    </>
  )
}

export default App