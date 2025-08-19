import React, { useMemo } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, BarChart, Bar, Legend } from 'recharts'

const COLORS = ['#6366F1', '#EF4444', '#F59E0B', '#10B981', '#8B5CF6', '#06B6D4']

export function CategoryPie({ data }){
  const pie = useMemo(()=>{
    const map = {}
    data.forEach(d=>{ if(d.type==='expense'){ map[d.category] = (map[d.category]||0) + d.amount } })
    return Object.entries(map).map(([k,v])=>({ name:k, value:v }))
  },[data])
  if(pie.length===0) return <div className='text-sm text-gray-500'>No expense data</div>
  return (
    <ResponsiveContainer width='100%' height={250}>
      <PieChart>
        <Pie data={pie} dataKey='value' nameKey='name' cx='50%' cy='50%' outerRadius={80} label />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export function MonthlyLine({ data }){
  const months = useMemo(()=>{
    const map = {}
    data.forEach(d=>{
      const m = new Date(d.date).toISOString().slice(0,7)
      map[m] = map[m] || { month:m, income:0, expense:0 }
      map[m][d.type === 'income' ? 'income' : 'expense'] += d.amount
    })
    return Object.values(map).sort((a,b)=>a.month.localeCompare(b.month)).slice(-12)
  },[data])
  if(months.length===0) return <div className='text-sm text-gray-500'>No monthly data</div>
  return (
    <ResponsiveContainer width='100%' height={240}>
      <LineChart data={months}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Line type='monotone' dataKey='income' stroke='#10B981' />
        <Line type='monotone' dataKey='expense' stroke='#EF4444' />
      </LineChart>
    </ResponsiveContainer>
  )
}

export function IncomeExpenseBar({ data }){
  const months = useMemo(()=>{
    const map = {}
    data.forEach(d=>{
      const m = new Date(d.date).toISOString().slice(0,7)
      map[m] = map[m] || { month:m, income:0, expense:0 }
      map[m][d.type === 'income' ? 'income' : 'expense'] += d.amount
    })
    return Object.values(map).sort((a,b)=>a.month.localeCompare(b.month)).slice(-6)
  },[data])
  if(months.length===0) return <div className='text-sm text-gray-500'>No data</div>
  return (
    <ResponsiveContainer width='100%' height={240}>
      <BarChart data={months}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='month' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='income' fill='#10B981' />
        <Bar dataKey='expense' fill='#EF4444' />
      </BarChart>
    </ResponsiveContainer>
  )
}
