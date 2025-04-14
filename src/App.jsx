import React, { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

function App() {
  const [expenseName, setExpenseName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (expenseName && description && category && amount && date) {
      const newExpense = { expenseName, description, category, amount, date };
      setExpenses([...expenses, newExpense]);
      setExpenseName("");
      setDescription("");
      setCategory("");
      setAmount("");
      setDate("");
    }
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const filteredExpenses = expenses.filter((expense) =>
    Object.values(expense).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <>
      {/* Header */}
          <div className="px-6 pt-6">
            <h1 className="text-3xl font-bold mb-2">Expense Tracker</h1>
            <p className="text-gray-600 mb-1">
              Start taking control of your finances and life. Record,
            </p>
            <p className="text-gray-600 mb-4">
              categorize and analyze your spending.
            </p>
          </div>

          <div className="flex flex-col md:flex-row px-6 pb-6 gap-6">
            {/* Left Panel - Form as a card */}
            <div className="bg-gray-50 shadow-lg shadow-gray-400  rounded-md p-4 md:w-1/3 w-full">
              <h2 className="text-xl font-bold mb-2">Add Expense</h2>
              <p className="text-sm text-gray-500 mb-4">
                Enter your expense details below
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter expense name"
                  value={expenseName}
                  onChange={(e) => setExpenseName(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Enter expense description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Enter expense category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-2 border rounded-md"
                />
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* Right Panel - Table and Search */}
            <div className="bg-white w-full md:w-2/3">
              {/* Search Bar */}
              <div className="flex justify-start mb-4">
                <div className="relative w-full max-w-sm">
                  <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search expenses"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black text-white text-left">
                      <th className="p-2">Expense</th>
                      <th className="p-2">Description</th>
                      <th className="p-2">Category</th>
                      <th className="p-2">Amount</th>
                      <th className="p-2">Date</th>
                      <th className="p-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.length > 0 ? (
                      filteredExpenses.map((expense, index) => (
                        <tr
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-100" : "bg-white"
                          } hover:bg-gray-200 transition`}
                        >
                          <td className="p-2">{expense.expenseName}</td>
                          <td className="p-2">{expense.description}</td>
                          <td className="p-2">{expense.category}</td>
                          <td className="p-2">{expense.amount}</td>
                          <td className="p-2">{expense.date}</td>
                          <td className="p-2">
                            <button
                              onClick={() => handleDelete(index)}
                              className="text-red-500 hover:underline text-sm"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center text-gray-500 p-4"
                        >
                          No expenses found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
    </>
  );
}

export default App;