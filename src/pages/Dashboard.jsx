import React, { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import Cards from "../components/Cards/Cards";
import AddExpenseModal from "../components/Modals/AddExpense";
import AddIncomeModal from "../components/Modals/AddIncome";
import { toast } from "react-toastify";
import { auth, db } from "../firebase";
import { addDoc, collection, getDocs, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import TransactionsTables from "../components/TransactionsTables/TransactionsTables"


const Dashboard = () => {
  // const transaction = [
  //   {
  //     type:"income",
  //     amount:1200,
  //     tag:"salary",
  //     name:"income 1",
  //     date: "2023-05-23",
  //   },
  //   {
  //     type:"expense",
  //     amount:200,
  //     tag:"food",
  //     name:"expense 1",
  //     date: "2023-05-13",
  //   },
  // ]

  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const [user] = useAuthState(auth);

  const [isExpenseModalVisible, setIsExpenseModalVisible] = useState(false);
  const [isIncomeModalVisible, setIncomeModalVisible] = useState(false);

  const [income, setIncome] = useState(0);
  const [expense, setEexpense] = useState(0);
  const [totalBalance, setTotalBalance] = useState(0);

  const showExpenseModal = () => {
    setIsExpenseModalVisible(true);
  };

  const showIncomeModal = () => {
    setIncomeModalVisible(true);
  };

  const handleExpenseCancel = () => {
    setIsExpenseModalVisible(false);
  };

  const handleIncomeCancel = () => {
    setIncomeModalVisible(false);
  };

  const onFinish = (values, type) => {
    const newTransaction = {
      type: type,
      date: moment(values.date).format("YYYY-MM-DD"),
      amount: parseFloat(values.amount),
      tag: values.tag,
      name: values.name,
    };
    addTransaction(newTransaction);
  };

  async function addTransaction(transaction) {
    try {
      const docRef = await addDoc(
        collection(db, `users/${user.uid}/transaction`),
        transaction
      );
      console.log("Document written with ID: ", docRef.id);
      toast.success("Tranction Added!");

      let newArr = transactions;
      newArr.push(transaction);
      setTransactions(newArr);
      calculateBalance();
    } catch (e) {
      console.error("Error adding document", e);
      toast.error("Couldn't Add Transaction");
    }
  }

  useEffect(() => {
    //get all docs from collection
    fetchTransactions();
  }, [user]);

  useEffect(() => {
    calculateBalance();
  }, [transactions]);

  function calculateBalance() {
    let incomeToatal = 0;
    let expenseTotal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        incomeToatal += transaction.amount;
      } else {
        expenseTotal += transaction.amount;
      }
    });
    setIncome(incomeToatal);
    setEexpense(expenseTotal);
    setTotalBalance(incomeToatal - expenseTotal);
  }

  async function fetchTransactions() {
    setLoading(true);
    if (user) {
      const q = query(collection(db, `users/${user.uid}/transaction`));

      const querySnapshot = await getDocs(q);
      let transactionsArray = [];
      querySnapshot.forEach((doc) => {
        //doc/data() is never undefined for query doc snapshots
        transactionsArray.push(doc.data());
      });

      setTransactions(transactionsArray);
      console.log("transaction Array ", transactionsArray);
      toast.success("Transaction Fetched!");
    }
    setLoading(false);
  }

  return (
    <div>
      <Header />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Cards
            showExpenseModal={showExpenseModal}
            showIncomeModal={showIncomeModal}
            income={income}
            expense={expense}
            totalBalance={totalBalance}
          />
          <AddExpenseModal
            isExpenseModalVisible={isExpenseModalVisible}
            handleExpenseCancel={handleExpenseCancel}
            onFinish={onFinish}
          />

          <AddIncomeModal
            isIncomeModalVisible={isIncomeModalVisible}
            handleIncomeCancel={handleIncomeCancel}
            onFinish={onFinish}
          />
        </>
      )}
      <TransactionsTables transactions={transactions}/>
    </div>
  );
};

export default Dashboard;
