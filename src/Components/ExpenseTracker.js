import { validateCLIOptions } from "jest-validate";
import { useEffect, useState } from "react";
import "./ExpensesTracker.css";
function ExpenseTracker() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState("");
  const [allExpenses, setAllExpenses] = useState([]);
  const [id, setId] = useState(5);
  const [totalExpense, setTotalExpense] = useState(40);
  const cat = { food: 10, travel: 10, other: 10, shopping: 10 };
  const [catWiseExpense, setCatWiseExpense] = useState(cat);

  //   const getFormData = async (event) => {
  //     event.preventDefault();
  //     const formValues = new FormData(event.target);
  //     await setName(formValues.get("name"));
  //     await setAmount(Number(formValues.get("amount")));
  //     await setCategory(formValues.get("category"));
  //     if (validationsCheck() === true) {
  //       addExpense();
  //     }
  //   };
  const amountCheck = (amount) => {
    const num = Number(amount);
    if (num <= 0) {
      alert("Amount should be greater than 0");
      return false;
    }
    setAmount(num);
    return true;
  };
  const nameCheck = (name) => {
    if (name === "") {
      alert("Expense Name is required!");
      return false;
    }
    console.log(name + " here");
    setName(name);
    return true;
  };
  const categoryCheck = (category) => {
    console.log(category + " here");
    if (category === "") {
      alert("category is required!");
      return false;
    }
    console.log(category + " here");
    setCategory(category);
    return true;
  };
  const validationsCheck = (event) => {
    event.preventDefault();
    if (amountCheck(amount) && nameCheck(name) && categoryCheck(category)) {
      addExpense();
    } else console.log("error");
  };
  const addExpense = () => {
    const newExpense = {
      id: id,
      name: name,
      amount: amount,
      category: category,
    };

    setAllExpenses((expenses) => [...expenses, newExpense]);
  };
  useEffect(() => {
    setTotalExpense((total) => total + amount);
    setCatWiseExpense(() => {
      catWiseExpense[category.toLowerCase()] =
        catWiseExpense[category.toLowerCase()] + amount;
      return catWiseExpense;
    });
    setId(id + 1);
  }, [allExpenses]);
  return (
    <>
      <h1> Expense Tracker</h1>
      <form>
        <input
          type="text"
          placeholder="New Expense"
          name="name"
          onChange={(event) => nameCheck(event.target.value)}
        />
        <input
          type="number"
          placeholder="Enter Amount"
          name="amount"
          onChange={(event) => amountCheck(event.target.value)}
        />
        <select
          className="ml-2"
          name="category"
          onChange={(event) => categoryCheck(event.target.value)}
        >
          <option value="">Select Type</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" onClick={(event) => validationsCheck(event)}>
          Add Expense
        </button>
      </form>
      <div className="mx-5 m-10 card">
        <p className="title">Expense List</p>
        <table>
          <thead className="table-header">
            <tr>
              <td>Sr No</td>
              <td>Expense</td>
              <td>Amount</td>
              <td>Catagory</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Expense 1</td>
              <td>10</td>
              <td>Food</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Expense 2</td>
              <td>10</td>
              <td>Travel</td>
            </tr>
            <tr>
              <td>3</td>
              <td>Expense 3</td>
              <td>10</td>
              <td>Shopping</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Expense 4</td>
              <td>10</td>
              <td>Other</td>
            </tr>
            {allExpenses.map((ex, id) => {
              return (
                <tr key={id}>
                  <td>{ex.id}</td>
                  <td>{ex.name}</td>
                  <td>{ex.amount}</td>
                  <td>{ex.category}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="card ml-5 m-10" style={{ width: "80%", margin: "auto" }}>
        <p className="title">Expenses Breakdown</p>
        <div style={{ display: "flex" }}>
          <div
            data-testid="expense-distribution-food"
            style={{
              width:
                Math.ceil((catWiseExpense.shopping / totalExpense) * 100) + "%",
            }}
            className="lightblue"
          ></div>
          <div
            data-testid="expense-distribution-travel"
            style={{
              width:
                Math.ceil((catWiseExpense.other / totalExpense) * 100) + "%",
            }}
            className="red"
          ></div>
          <div
            data-testid="expense-distribution-shopping"
            style={{
              width:
                Math.ceil((catWiseExpense.food / totalExpense) * 100) + "%",
            }}
            className="lightgreen"
          ></div>
          <div
            data-testid="expense-distribution-other"
            style={{
              width:
                Math.ceil((catWiseExpense.shopping / totalExpense) * 100) + "%",
            }}
            className="orange"
          ></div>
        </div>
        <div className="flex">
          <div className="lightblue"></div>
          <span>Food</span>
        </div>
        <div className="flex ml-10 mb-2">
          <div className="red"></div>
          <span>Travel</span>
        </div>
        <div className="flex ml-10 mb-10">
          <div className="lightgreen"></div>
          <span>Shopping</span>
        </div>
        <div className="flex ml-10 mb-10">
          <div className="orange"></div>
          <span>Other</span>
        </div>
      </div>
    </>
  );
}

export default ExpenseTracker;
