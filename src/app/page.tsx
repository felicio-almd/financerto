'use client'

import Modal from "react-modal";
import { useState, useEffect } from "react";
import { NewTransactionModal } from "../components/NewTransactionModal";
import { DashBoard } from "../components/Dashboard";
import { Header } from "../components/Header/";
import { TransactionsProvider } from "@/hooks/useTransactions";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Footer } from "@/components/Footer";
import { InstallPWAButton } from "@/components/installPWAButton";

export default function Home() {
    const [isNewTransactionsModalOpen, setIsNewTransactionsModalOpen] = useState(false);

    const { userAuth, logout } = useAuthContext();
    const router = useRouter();

    useEffect(() => {
        if (userAuth == null) {
            router.push("/sign-in");
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
                    <InstallPWAButton />
                    <Footer />
                    <NewTransactionModal isOpen={isNewTransactionsModalOpen} onRequestClose={handleCloseNewTransactionsModal} />
                </TransactionsProvider>
            )}
        </>
    );
}
