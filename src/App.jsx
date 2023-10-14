import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <BrowserRouter>
      <ToastContainer/>
      <Routes>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
