import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "../firebase/firebaseAppConfig";
import { useAuthContext } from "@/context/AuthContext";
import { Transaction } from "@/types/Transaction";


type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transactionInput: TransactionInput) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>; // Adicionando a função de deletar
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const { userAuth } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userAuth) return;

      const userTransactionsRef = collection(firestore, "users", userAuth.uid, "transactions");
      const querySnapshot = await getDocs(userTransactionsRef);
      const loadedTransactions: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        loadedTransactions.push({ id: doc.id, ...doc.data() } as Transaction);
      });
      setTransactions(loadedTransactions);
    };

    fetchTransactions();
  }, [userAuth]);

  async function createTransaction(transactionInput: TransactionInput) {
    if (!userAuth) return;

    try {
      const userTransactionsRef = collection(firestore, "users", userAuth.uid, "transactions");
      const docRef = await addDoc(userTransactionsRef, {
        ...transactionInput,
        createdAt: new Date().toISOString(),
      });
      const newTransaction: Transaction = {
        id: docRef.id,
        ...transactionInput,
        createdAt: new Date().toISOString(),
      };
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  }

  async function deleteTransaction(id: string) {
    if (!userAuth) return;

    try {
      const transactionDocRef = doc(firestore, "users", userAuth.uid, "transactions", id);
      await deleteDoc(transactionDocRef);
      setTransactions(transactions.filter(transaction => transaction.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions precisa ser usado dentro do contexto TransactionsProvider");
  }
  return context;
}
