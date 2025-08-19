import React from 'react'
import { format } from 'date-fns'

export default function TransactionTable({ items, onEdit, onDelete }){
  return (
    <div className='overflow-x-auto'>
      <table className='min-w-full divide-y divide-gray-200'>
        <thead className='bg-gray-50'>
          <tr>
            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500'>Date</th>
            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500'>Desc</th>
            <th className='px-4 py-2 text-left text-xs font-medium text-gray-500'>Category</th>
            <th className='px-4 py-2 text-right text-xs font-medium text-gray-500'>Amount</th>
            <th className='px-4 py-2 text-center text-xs font-medium text-gray-500'>Type</th>
            <th className='px-4 py-2 text-center text-xs font-medium text-gray-500'>Actions</th>
          </tr>
        </thead>
        <tbody className='bg-white divide-y divide-gray-100'>
          {items.map(tx=> (
            <tr key={tx.id}>
              <td className='px-4 py-3 text-sm text-gray-600'>{format(new Date(tx.date), 'yyyy-MM-dd')}</td>
              <td className='px-4 py-3 text-sm text-gray-800'>{tx.description}</td>
              <td className='px-4 py-3 text-sm text-gray-600'>{tx.category}</td>
              <td className={`px-4 py-3 text-sm font-medium text-right ${tx.type==='income' ? 'text-green-600' : 'text-red-600'}`}>₹ {tx.amount.toLocaleString()}</td>
              <td className='px-4 py-3 text-center text-sm'>{tx.type}</td>
              <td className='px-4 py-3 text-center text-sm'>
                <button className='text-indigo-600 mr-2' onClick={()=>onEdit(tx)}>Edit</button>
                <button className='text-red-600' onClick={()=>onDelete(tx.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
