import { useEffect, useState } from "react";

export default function useTransaction() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const localData = localStorage.getItem("transactions");
    if (localData) {
      setTransactions(JSON.parse(localData));
    } else {
      fetch("/data.json")
        .then((res) => res.json())
        .then((data) => {
          setTransactions(data);
          localStorage.setItem("transactions", JSON.stringify(data));
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const addTransaction = (tx) => {
    const newTx = { ...tx, id: Date.now() };
    setTransactions([...transactions, newTx]);
  };

  const deleteTransaction = (id) => {
    const newData = transactions.filter((tx) => tx.id !== id);
    setTransactions(newData);
  };

  const updateTransaction = (id, updatedTx) => {
    const newData = transactions.map((tx) =>
      tx.id === id ? { ...tx, ...updatedTx } : tx
    );
    setTransactions(newData);
  };

  return {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
  };
}
