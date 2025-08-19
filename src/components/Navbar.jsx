import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

function NavLink({to, children}){
  const loc = useLocation()
  const active = loc.pathname === to
  return (
    <Link to={to} className={`px-3 py-2 rounded-md ${active ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}>
      {children}
    </Link>
  )
}

export default function Navbar(){
  return (
    <motion.header initial={{y:-20, opacity:0}} animate={{y:0, opacity:1}} className='bg-white shadow-sm'>
      <div className='max-w-6xl mx-auto flex items-center justify-between p-4'>
        <div className='flex items-center gap-3'>
          <div className='w-10 h-10 bg-indigo-600 text-white rounded-md flex items-center justify-center font-bold'>PF</div>
          <div>
            <div className='font-semibold'>Personal Finance</div>
            <div className='text-xs text-gray-500'>Track your income & expenses</div>
          </div>
        </div>
        <nav className='flex items-center gap-2'>
          <NavLink to='/'>Dashboard</NavLink>
          <NavLink to='/transactions'>Transactions</NavLink>
          <NavLink to='/reports'>Reports</NavLink>
        </nav>
      </div>
    </motion.header>
  )
}
