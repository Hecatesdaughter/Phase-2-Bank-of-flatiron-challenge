import React, { useState } from "react";

function SortTransactions({ transactions, setTransactions }) {
  const [sortBy, setSortBy] = useState("category");
  const [sortOrder, setSortOrder] = useState("ascending");

  const sortTransactions = (transactions, sortBy, sortOrder) => {
    if (sortBy === "category" || sortBy === "description") {
      return transactions.sort((a, b) => {
        if (sortOrder === "ascending") {
          return a[sortBy].localeCompare(b[sortBy]);
        } else {
          return b[sortBy].localeCompare(a[sortBy]);
        }
      });
    }
    return transactions;
  };

  const handleSortChange = (event) => {
    if (sortBy !== event.target.value) {
      setSortBy(event.target.value);
      setSortOrder("ascending");
    } else {
      setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
    }
    const sortedTransactions = sortTransactions([...transactions], sortBy, sortOrder);
    setTransactions(sortedTransactions);
  };

  return (
    <label>
      Sort by:
      <select value={sortBy} onChange={handleSortChange}>
        <option value="category">Category</option>
        <option value="description">Description</option>
      </select>
    </label>
  );
}

export default SortTransactions;




