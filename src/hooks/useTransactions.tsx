import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebaseAppConfig";
import { useAuthContext } from "@/context/AuthContext";

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
  const { userAuth } = useAuthContext();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!userAuth) return;

      const userTransactionsRef = collection(firestore, "users", userAuth.uid, "transactions"); //relação do usuario autenticado com a tabela de usuarios
      const querySnapshot = await getDocs(userTransactionsRef); // coleta os dados apenas do usuario autenticado
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
      const userTransactionsRef = collection(firestore, "users", userAuth.uid, "transactions"); //busca as transactions do usuario
      const docRef = await addDoc(userTransactionsRef, { // e cria uma nova
        ...transactionInput,
        createdAt: new Date().toISOString(),
      });
      const newTransaction: Transaction = { //coloca uma nova no array
        id: docRef.id,
        ...transactionInput,
        createdAt: new Date().toISOString(),
      };
      setTransactions([...transactions, newTransaction]);
    } catch (error) {
      console.error("Error creating transaction:", error);
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
    throw new Error("useTransactions precisa ser usado dentro do contexto TransactionsProvider");
  }
  return context;
}
