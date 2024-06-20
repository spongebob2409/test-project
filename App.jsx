import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './Signup'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from './Login'
import ResetPassword from './ResetPassword';  
import NewPassword from './NewPassword';  
function App() {
  

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/reset' element={<ResetPassword />}></Route>
          <Route path='/reset/:token' element={<NewPassword />}></Route>
        </Routes>
      </BrowserRouter>

    </div>

  )
}

export default App
