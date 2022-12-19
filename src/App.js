import { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Alert from './components/Alert';
import uuid from 'react-uuid';
import './App.css';

const intialExpense = [
  {
    id: uuid(),
    charge: "rent",
    amount: 1600
  },
  {
    id: uuid(),
    charge: "car payment",
    amount: 400
  },
  {
    id: uuid(),
    charge: "credit card bill",
    amount: 1200
  }
];



function App() {

  const [expenses, setExpenses] = useState(intialExpense);


  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className='App'>
        <ExpenseForm />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending = <span className='total'>
          ${expenses.reduce((total, amount) => {
            return total + amount.amount;
          }, 0)
          }
        </span>
      </h1>
    </>
  );
}

export default App;
