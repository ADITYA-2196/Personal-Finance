import React, { useEffect, useState } from 'react'
import TransactionForm from '../components/TransactionForm'
import TransactionTable from '../components/TransactionTable'
import { loadTransactions, saveTransactions } from '../utils/storage'
import { IncomeExpenseBar } from '../components/Charts'

function uid(){ return Date.now() + Math.floor(Math.random()*999) }

export default function Transactions(){
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [filter, setFilter] = useState({ q:'', category:'All' })

  useEffect(()=>{ const d = loadTransactions(); setItems(d) },[])
  useEffect(()=>{ saveTransactions(items) },[items])

  function handleSave(tx){
    if(tx.id){
      setItems(prev=> prev.map(p=> p.id===tx.id ? tx : p))
      setEditing(null)
    }else{
      tx.id = uid()
      setItems(prev=> [tx, ...prev])
    }
  }

  function handleEdit(tx){ setEditing(tx) }
  function handleDelete(id){ if(!confirm('Delete?')) return; setItems(prev=> prev.filter(p=> p.id!==id)) }

  const categories = ['All', ...Array.from(new Set(items.map(i=>i.category)))]
  const filtered = items.filter(i=> {
    if(filter.category !== 'All' && i.category !== filter.category) return false
    if(filter.q && !i.description.toLowerCase().includes(filter.q.toLowerCase())) return false
    return true
  })

  return (
    <div className='grid grid-cols-3 gap-6'>
      <div className='col-span-2 space-y-4'>
        <div className='bg-white p-4 rounded shadow'>
          <div className='flex items-center justify-between mb-3'>
            <div className='flex gap-2'>
              <input placeholder='Search description' value={filter.q} onChange={e=>setFilter({...filter, q:e.target.value})} className='p-2 border rounded' />
              <select value={filter.category} onChange={e=>setFilter({...filter, category:e.target.value})} className='p-2 border rounded'>
                {categories.map(c=> <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className='text-sm text-gray-500'>{filtered.length} results</div>
          </div>
          <TransactionTable items={filtered} onEdit={handleEdit} onDelete={handleDelete} />
        </div>
      </div>
      <div className='space-y-4'>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-medium mb-2'>Add / Edit</h3>
          <TransactionForm onSave={handleSave} initial={editing} />
        </div>
        <div className='bg-white p-4 rounded shadow'>
          <h3 className='font-medium mb-2'>Income vs Expense (last 6 months)</h3>
          <IncomeExpenseBar data={items} />
        </div>
      </div>
    </div>
  )
}
