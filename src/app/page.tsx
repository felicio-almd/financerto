'use client'

import Modal from "react-modal";
import { useState } from "react";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { DashBoard } from "../components/Dashboard";
import { Header } from "../components/Header/";
import { TransactionsProvider } from "@/hooks/useTransactions";


export default function Home() {
  const[isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false)

    function handleOpenNewTransactionsModal() {
        setIsNewTransactionsModalOpen(true)
    }
    
    function handleCloseNewTransactionsModal() {
        setIsNewTransactionsModalOpen(false)
    }
  
  return (
    <TransactionsProvider>
      <Header onOpenNewTransactionModal={handleOpenNewTransactionsModal}/>
      <DashBoard />
      <NewTransactionModal isOpen={isNewTransactionsModalOpen} onRequestClose={handleCloseNewTransactionsModal}/>
    </TransactionsProvider>
  );
}
