import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import AddExpense from './Pages/AddExpense'
import { Toaster } from 'react-hot-toast';
export default function App() {
  return (
    <div>

      <Router>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/add' element={<AddExpense />} />
        </Routes>
      </Router>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </div>
  )
}
