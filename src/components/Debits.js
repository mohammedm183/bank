/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/

// import react usestate
import React, { useState } from "react";
// import Link for navigation between pages
import { Link } from "react-router-dom";

// debits component receives debits, add debits and account balance

function Debits({ debits, addDebit, accountBalance }){
  const [description, setDescription ] = useState("");
  const [amount, setAmount] = useState("");

  // function to handle new debit entry
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!description || !amount) return;

    // Creates a new debit object with today's date
    const newDebit = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(), 
    };

    addDebit(newDebit);

    // Clears input boxes
    setDescription("");
    setAmount("");
  };

  return (
    <div style={{textAlign: "center"}}>
      <h1>Debits</h1>
      <Link to="/">Home</Link>
      <br /><br />

      {/* Display the current account balance */}
      <h3>Account Balance: {accountBalance.toFixed(2)}</h3>

      {/* Form for adding new debit */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Debit</button>
      </form>

      {/* List all debit transactions */}
      <h3>Debit Transactions</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {debits.map((debit) => (
          <li key={debit.id}>
            <strong>{debit.description}</strong> – ${debit.amount.toFixed(2)} on{" "}
            {debit.date.slice(0, 10)}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Debits;