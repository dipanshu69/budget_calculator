import { useEffect, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";
import uuid from "react-uuid";
import "./App.css";

// const intialExpense = [
//   {
//     id: uuid(),
//     charge: "rent",
//     amount: 1600,
//   },
//   {
//     id: uuid(),
//     charge: "car payment",
//     amount: 400,
//   },
//   {
//     id: uuid(),
//     charge: "credit card bill",
//     amount: 1200,
//   },
// ];

const intialExpense = localStorage.getItem("expenses") ? JSON.parse(localStorage.getItem("expenses")) : [];


function App() {
  const [expenses, setExpenses] = useState(intialExpense);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState("");
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    localStorage.setItem("expenses" , JSON.stringify(expenses));
  } ,[expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map(expense => {
          return expense.id === id ? { ...expense, charge, amount } : expense;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = {
          id: uuid(),
          charge,
          amount,
        };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "charge can't be empty value amount value cant'be zero",
      });
    }
  };

  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleDeleteAll = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All items deleted" });
  };

  const handleEdit = (id) => {
    let editableExapnse = expenses.find(item => item.id === id);
    let { charge, amount } = editableExapnse;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };


  const handleDelete = (id) => {
    const newExpenses = [...expenses];
    newExpenses.map((expense, index) => {
      if (expense.id === id) {
        return newExpenses.splice(index, 1);
      }
    });
    setExpenses(newExpenses);
    handleAlert({ type: "danger", text: "item deleted" });
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <h1>Budget Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          handleDeleteAll={handleDeleteAll}
        />
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
