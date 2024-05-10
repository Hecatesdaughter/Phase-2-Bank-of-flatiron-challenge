import React, {useEffect, useState} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  const [transactions, setTransactions] =  useState([]);
  const getTransactions = () => {
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };

    fetch("http://localhost:8001/transactions", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        setTransactions(result)})
      .catch((error) => console.error(error));
  } 

  useEffect(() => {
    getTransactions()
  }, [])

  return (
    <div>
      <Search />
      <AddTransactionForm />
      <TransactionsList transactions={transactions}/>
    </div>
  );
}

export default AccountContainer;
