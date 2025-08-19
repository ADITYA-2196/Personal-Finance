import React, { useState, useEffect } from 'react'

const defaultCategories = ['Salary','Food','Transport','Entertainment','Bills','Others']

export default function TransactionForm({ onSave, initial }){
  const [form, setForm] = useState(initial || {
    id: null, description:'', amount:'', type:'expense', category:'Others', date: new Date().toISOString().slice(0,10)
  })

  useEffect(()=>{
    if(initial) setForm(initial)
  },[initial])

  function submit(e){
    e.preventDefault()
    const payload = { ...form, amount: Number(form.amount) }
    if(!payload.description || !payload.amount) return alert('Provide description and amount')
    onSave(payload)
    setForm({ id:null, description:'', amount:'', type:'expense', category:'Others', date: new Date().toISOString().slice(0,10) })
  }

  return (
    <form onSubmit={submit} className='space-y-3'>
      <div className='grid grid-cols-2 gap-3'>
        <input className='p-2 border rounded' placeholder='Description' value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <input className='p-2 border rounded' placeholder='Amount' type='number' value={form.amount} onChange={e=>setForm({...form, amount:e.target.value})} />
      </div>
      <div className='grid grid-cols-3 gap-3'>
        <select className='p-2 border rounded' value={form.type} onChange={e=>setForm({...form, type:e.target.value})}>
          <option value='expense'>Expense</option>
          <option value='income'>Income</option>
        </select>
        <select className='p-2 border rounded' value={form.category} onChange={e=>setForm({...form, category:e.target.value})}>
          {defaultCategories.map(c=> <option key={c} value={c}>{c}</option>)}
        </select>
        <input className='p-2 border rounded' type='date' value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
      </div>
      <div className='flex gap-2'>
        <button className='px-4 py-2 bg-indigo-600 text-white rounded'>Save</button>
        <button type='button' className='px-4 py-2 border rounded' onClick={()=>{ setForm({ id:null, description:'', amount:'', type:'expense', category:'Others', date: new Date().toISOString().slice(0,10) }) }}>Reset</button>
      </div>
    </form>
  )
}
