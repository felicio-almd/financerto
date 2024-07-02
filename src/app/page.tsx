'use client'

import Modal from "react-modal";
import { useState, useEffect } from "react";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { DashBoard } from "../components/Dashboard";
import { Header } from "../components/Header/";
import { TransactionsProvider } from "@/hooks/useTransactions";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

    const { userAuth, logout } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (userAuth == null) {
            router.push("/signIn");
        }
    }, [userAuth, router]);

    function handleOpenNewTransactionsModal() {
        setIsNewTransactionsModalOpen(true);
    }
    
    function handleCloseNewTransactionsModal() {
        setIsNewTransactionsModalOpen(false);
    }

    return (
        <>
            {userAuth && (
                <TransactionsProvider>
                    <Header onOpenNewTransactionModal={handleOpenNewTransactionsModal} />
                    <DashBoard />
                    <NewTransactionModal isOpen={isNewTransactionsModalOpen} onRequestClose={handleCloseNewTransactionsModal} />
                </TransactionsProvider>
            )}
        </>
    );
}
