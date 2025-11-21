
import React, { useEffect, useState } from 'react';
import api from './api';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';

export default function App(){
  const [expenses, setExpenses] = useState([]);
  const load = async () => {
    try{
      const res = await api.get('/expenses');
      setExpenses(res.data);
    }catch(e){
      console.error(e);
      setExpenses([]);
    }
  };
  useEffect(()=>{ load(); }, []);

  const add = async (data) => {
    await api.post('/expenses', data);
    await load();
  };

  const remove = async (id) => {
    await api.delete(`/expenses/${id}`);
    await load();
  };

  const total = expenses.reduce((s,e)=> s + Number(e.amount), 0);
  const formatCurrency = (value) => {
    return value.toFixed(2).replace('.', ',');
  };
  return (
    <div className="container">
      <header>
        <h1>Meu Registrador de Despesas</h1>
        <div className="total">Total de Despesas: R$ {formatCurrency(total)}</div>
      </header>
      <main>
        <ExpenseList expenses={expenses} onRemove={remove} />
        <ExpenseForm onAdd={add} />
      </main>
    </div>
  );
}
