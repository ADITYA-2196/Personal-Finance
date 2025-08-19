import React from 'react'
import { CategoryPie, IncomeExpenseBar } from '../components/Charts'
import { loadTransactions } from '../utils/storage'

export default function Reports(){
  const data = loadTransactions()
  return (
    <div className='space-y-6'>
      <div className='bg-white p-4 rounded shadow'>
        <h3 className='font-medium mb-2'>Category Breakdown</h3>
        <CategoryPie data={data} />
      </div>

      <div className='bg-white p-4 rounded shadow'>
        <h3 className='font-medium mb-2'>Income vs Expense</h3>
        <IncomeExpenseBar data={data} />
      </div>
    </div>
  )
}
