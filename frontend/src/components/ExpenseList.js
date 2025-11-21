
import React from 'react';

export default function ExpenseList({ expenses, onRemove }){
  return (
    <div className="table">
      <h3>Despesas</h3>
      <table>
        <thead>
          <tr><th>Descrição</th><th>Valor</th><th>Categoria</th><th>Data</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {expenses.length===0 && <tr><td colSpan="5">Nenhuma despesa</td></tr>}
          {expenses.map(e=>{
            const formatCurrency = (value) => {
              return Number(value).toFixed(2).replace('.', ',');
            };
            const formatDate = (dateStr) => {
              const date = new Date(dateStr);
              const day = String(date.getDate()).padStart(2, '0');
              const month = String(date.getMonth() + 1).padStart(2, '0');
              const year = date.getFullYear();
              return `${day}-${month}-${year}`;
            };
            return (
              <tr key={e.id}>
                <td>{e.description}</td>
                <td>R$ {formatCurrency(e.amount)}</td>
                <td>{e.category}</td>
                <td>{formatDate(e.date)}</td>
                <td><button onClick={()=>onRemove(e.id)}>Excluir</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
