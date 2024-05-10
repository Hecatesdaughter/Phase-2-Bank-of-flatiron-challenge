/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
/* eslint-enable no-unused-vars */
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import SortTransactions from "./SortTransactions";

function AccountContainer(
) {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getTransactions = (
) => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://localhost:8001/transactions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setTransactions(result);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleFormSubmit = async (newTransaction) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTransaction),
    };

    try {
      const response = await fetch("http://localhost:8001/transactions", requestOptions);
      const result = await response.json();
      setTransactions((prev) => [...prev, result]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);

    setTransactions((transactions) => {
      return transactions.filter(
        (transaction) =>
          transaction.description.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  console.log("Transactions:", transactions);
  
  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <AddTransactionForm onFormSubmit={handleFormSubmit} />
      <SortTransactions
        transactions={transactions}
        setTransactions={setTransactions}
      />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;

