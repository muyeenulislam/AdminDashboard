"use client";

import { createContext, useState } from "react";

const TransactionContext = createContext({
  transactions: [],
  addTransaction: (transaction) => {},
  addAllTransaction: (transactions) => {},
  removeTransaction: (transactionId) => {},
  getTransaction: (transactionId) => {},
  getAllTransactions: () => {},
  editEmpoyee: (transaction, transactionId) => {},
});

export function TransactionContextProvider(props) {
  const loadedTransactions = props.value;
  const [transactions, setTransaction] = useState(loadedTransactions);

  function addTransactionContext(transaction) {
    setTransaction((transactionOldValue) => {
      return [...transactionOldValue, transaction];
    });
  }

  function addAllTransactionContext(transactions) {
    setTransaction(transactions);
  }
  function editTransactionContext(transaction, transactionId) {
    const findIndex = transactions.findIndex((employeElement) => {
      return employeElement.id === transactionId;
    });

    setTransaction((transactionOldValue) => {
      transactionOldValue[findIndex] = product;
      return [...transactionOldValue];
    });
  }
  function removeTransactionContext(transactionId) {
    const newTransactionCollection = transactions.filter(
      (prod) => prod.id !== transactionId
    );

    setTransaction(newTransactionCollection);
  }

  function getTransactionContext(transactionId) {
    const findIndex = transactions.findIndex((transaction) => {
      return transaction.id === transactionId;
    });

    if (findIndex > -1) {
      return transactions[findIndex];
    } else {
      return {
        id: "",
        transactionId: "",
        employeeId: "",
        amount: "",
        date: "",
        time: "",
      };
    }
  }
  function getAllTransactionsContext(transactionId) {
    return transactions;
  }

  const context = {
    addTransaction: addTransactionContext,
    removeTransaction: removeTransactionContext,
    getTransaction: getTransactionContext,
    editEmpoyee: editTransactionContext,
    addAllTransaction: addAllTransactionContext,
    getAllTransactions: getAllTransactionsContext,
    transactions: transactions,
  };
  return (
    <TransactionContext.Provider value={context}>
      {props.children}
    </TransactionContext.Provider>
  );
}

export default TransactionContext;
