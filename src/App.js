import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import uuid from "react-uuid";
import "./App.css";

const intialExpense = [
  {
    id: uuid(),
    charge: "rent",
    amount: 1600,
  },
  {
    id: uuid(),
    charge: "car payment",
    amount: 400,
  },
  {
    id: uuid(),
    charge: "credit card bill",
    amount: 1200,
  },
];

function App() {
  const [expenses, setExpenses] = useState(intialExpense);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      const singleExpense = {
        id: uuid(),
        charge,
        amount
      }
      setExpenses([...expenses, singleExpense]);
    } else {
      //handle alert error
    }
  };

  //console.log(expenses);

  return (
    <>
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
        />
        <ExpenseList expenses={expenses} />
      </main>
      <h1>
        Total Spending ={" "}
        <span className="total">
          $
          {expenses.reduce((total, amount) => {
            return total + parseInt(amount.amount);
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
