import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'

export default function App(){
  return (
    <div className='min-h-screen'>
      <Navbar />
      <main className='max-w-6xl mx-auto p-6'>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/reports' element={<Reports />} />
        </Routes>
      </main>
    </div>
  )
}
