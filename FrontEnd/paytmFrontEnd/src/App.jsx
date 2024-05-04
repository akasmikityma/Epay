import React from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import SignUP from '../Pages/SignUP'
import Dashboard from '../Pages/Dashboard'
import SendMoney from '../Pages/SendMoney'
import SignIN from '../Pages/SignIN'
export default function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<SignIN/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/send' element={<SendMoney/>}/>
        <Route path='/signUP' element={<SignUP/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}
