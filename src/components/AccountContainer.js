import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer(
) {
  const [transactions, setTransactions] = useState([]);

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

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div>
      <Search />
      <AddTransactionForm
        onFormSubmit={handleFormSubmit}
      />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;
