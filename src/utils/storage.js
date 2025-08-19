const KEY = 'pft_transactions_v1'

export function loadTransactions(){
  try{
    const raw = localStorage.getItem(KEY)
    if(!raw) return []
    return JSON.parse(raw)
  }catch(e){
    console.error('loadTransactions', e)
    return []
  }
}

export function saveTransactions(list){
  try{
    localStorage.setItem(KEY, JSON.stringify(list))
  }catch(e){ console.error('saveTransactions', e) }
}
