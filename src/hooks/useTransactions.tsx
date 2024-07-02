import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore } from "../firebase/firebaseAppConfig";

interface Transaction {
  id: string; // Firestore usa IDs como strings
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transactionInput: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const querySnapshot = await getDocs(collection(firestore, "transactions"));
      const loadedTransactions: Transaction[] = [];
      querySnapshot.forEach((doc) => {
        loadedTransactions.push({ id: doc.id, ...doc.data() } as Transaction);
      });
      setTransactions(loadedTransactions);
    };

    fetchTransactions();
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
    try {
      const docRef = await addDoc(collection(firestore, "transactions"), {
        ...transactionInput,
        createdAt: new Date().toISOString(), // Firestore requer ISO string para datas
      });
      const newTransaction: Transaction = {
        id: docRef.id,
        ...transactionInput,
        createdAt: new Date().toISOString(),
      };
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error("Error creating transaction:", error);
      // Tratar erro conforme necessário
    }
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (!context) {
    throw new Error("useTransactions must be used within a TransactionsProvider");
  }
  return context;
}
