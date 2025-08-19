import React, { useEffect, useMemo, useState } from 'react'
import { loadTransactions, saveTransactions } from '../utils/storage'
import { CategoryPie, MonthlyLine } from '../components/Charts'
import { motion } from 'framer-motion'

export default function Dashboard(){
  const [data, setData] = useState([])
  useEffect(()=>{ setData(loadTransactions()) },[])
  useEffect(()=>{ saveTransactions(data) },[data])

  const totals = useMemo(()=>{
    const income = data.reduce((s,i)=> s + (i.type==='income'? i.amount:0), 0)
    const expense = data.reduce((s,i)=> s + (i.type==='expense'? i.amount:0), 0)
    return { income, expense, balance: income - expense }
  },[data])

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-3 gap-6'>
        <motion.div initial={{y:20, opacity:0}} animate={{y:0,opacity:1}} className='p-4 bg-white rounded shadow'>
          <div className='text-sm text-gray-500'>Balance</div>
          <div className='text-2xl font-semibold'>₹ {totals.balance.toLocaleString()}</div>
        </motion.div>
        <motion.div initial={{y:20, opacity:0}} animate={{y:0,opacity:1}} className='p-4 bg-white rounded shadow'>
          <div className='text-sm text-gray-500'>Income</div>
          <div className='text-2xl font-semibold text-green-600'>₹ {totals.income.toLocaleString()}</div>
        </motion.div>
        <motion.div initial={{y:20, opacity:0}} animate={{y:0,opacity:1}} className='p-4 bg-white rounded shadow'>
          <div className='text-sm text-gray-500'>Expense</div>
          <div className='text-2xl font-semibold text-red-600'>₹ {totals.expense.toLocaleString()}</div>
        </motion.div>
      </div>

      <div className='grid grid-cols-2 gap-6'>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-medium mb-2'>Category distribution</h3>
          <CategoryPie data={data} />
        </div>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-medium mb-2'>Monthly trends</h3>
          <MonthlyLine data={data} />
        </div>
      </div>
    </div>
  )
}
