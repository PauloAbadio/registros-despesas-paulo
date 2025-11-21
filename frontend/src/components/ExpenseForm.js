
import React, { useState } from 'react';

export default function ExpenseForm({ onAdd }){
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Alimentação');
  const [date, setDate] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if(!description || !amount || !date) return alert('Preencha todos os campos');
    await onAdd({
      description,
      amount: Number(amount),
      category,
      date
    });
    setDescription(''); setAmount(''); setDate('');
  };

  return (
    <form className="form" onSubmit={submit}>
      <h3>Adicionar Despesa</h3>
      <input placeholder="Descrição" value={description} onChange={e=>setDescription(e.target.value)} />
      <input placeholder="Valor (ex: 150.50)" value={amount} onChange={e=>setAmount(e.target.value)} />
      <select value={category} onChange={e=>setCategory(e.target.value)}>
        <option>Alimentação</option>
        <option>Transporte</option>
        <option>Lazer</option>
        <option>Saúde</option>
        <option>Outros</option>
      </select>
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <button type="submit" className="secondary">Adicionar Despesa</button>
    </form>
  );
}
