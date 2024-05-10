import React, { useEffect, useState } from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getTransactions = () => {
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

    setTransactions((prevTransactions) => {
      return transactions.filter((transaction) =>
        transaction.description.toLowerCase().includes(term.toLowerCase())
      );
    });
  };

  return (
    <div>
      <Search searchTerm={searchTerm} setSearchTerm={handleSearch} />
      <AddTransactionForm onFormSubmit={handleFormSubmit} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;