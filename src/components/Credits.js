/*==================================================
src/components/Credits.js
==================================================*/
// Import React and the "useState" Hook for managing input later
import React, { useState } from "react";
// Import Link to move between pages without reloading the app
import { Link } from "react-router-dom";

function Credits({ credits, addCredit, accountBalance }) {
  
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    // Create a new credit object with user input
    const newCredit = {
      id: credits.length + 1,
      description: description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    // calls addCredit() from App.js 
    addCredit(newCredit);

    // Reset input fields back to empty
    setDescription("");
    setAmount("");
  };

  
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Credits</h1>

      {/* back to home page */ }
      <Link to="/">Home</Link>
      <br /><br />

      {/* displays the current account balance */}
      <h3>Account Balance: {accountBalance.toFixed(2)}</h3>

      {/* ✏️ Form for adding a new credit */}
      <form onSubmit={handleSubmit}>
        {/* Input for description */}
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} 
          required
        />

        {/* Input for amount */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Update local state
          required
        />

        {/* Submit button */}
        <button type="submit">Add Credit</button>
      </form>

      {/* Listing all credit transactions */}
      <h2>Credit Transactions</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {credits.map((credit) => (
          <li key={credit.id}>
            <strong>{credit.description}</strong> – ${credit.amount.toFixed(2)}{" "}
            on {new Date(credit.date).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Credits;