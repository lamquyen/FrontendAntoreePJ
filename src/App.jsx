import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Dashboard from './components/Dashboard'
function App() {


  return (
    <div className='bg-white w-auto'>

      <Router>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Router>

    </div>



  )
}

export default App
