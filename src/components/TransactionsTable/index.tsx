import { Transaction } from "@/types/Transaction";
import { useTransactions } from "../../hooks/useTransactions";
import { useState } from "react";
import Modal from 'react-modal'

export function TransactionsTable() {
    const { transactions, deleteTransaction } = useTransactions();
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

    // Ordenar as transações por data em ordem decrescente
    const sortedTransactions = [...transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const handleTransactionClick = (transaction: Transaction) => {
        // Apenas abrir o modal em dispositivos móveis
        if (window.innerWidth <= 640) {
            setSelectedTransaction(transaction);
        }
    };

    const closeModal = () => {
        setSelectedTransaction(null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return dateString
            ? new Intl.DateTimeFormat("pt-BR").format(new Date(dateString))
            : "Sem data";
    };

    return (
        <div className="mt-16">
            <table className="w-full border-separate border-spacing-y-2">
                <thead className="border border-1">
                    <tr className="border border-1">
                        <th className="text-left font-normal p-4 text-gray-600 border border-1">Título</th>
                        <th className="text-left font-normal p-4 text-gray-600 border border-1">Valor</th>
                        <th className="text-left font-normal p-4 text-gray-600 border border-1 max-sm:hidden">Categoria</th>
                        <th className="text-left font-normal p-4 text-gray-600 border border-1 max-md:hidden">Data</th>
                        <th className="text-left font-normal p-4 text-gray-600 border border-1 max-sm:hidden">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTransactions.map((transaction) => (
                        <tr
                            key={transaction.id}
                            className="bg-white cursor-pointer sm:cursor-default"
                        >
                            <td
                                className="p-4 text-gray-800 rounded-md border border-1 max-sm:text-sm"
                                onClick={() => handleTransactionClick(transaction)}
                            >
                                {transaction.title}
                            </td>
                            <td
                                className={`p-4 rounded-md border border-1 max-sm:text-sm ${transaction.type === "deposit" ? "text-green" : "text-red-500"
                                    }`}
                                onClick={() => handleTransactionClick(transaction)}
                            >
                                {formatCurrency(transaction.amount)}
                            </td>
                            <td
                                className="p-4 text-gray-800 border border-1 max-sm:hidden rounded-md max-sm:text-sm"
                                onClick={() => handleTransactionClick(transaction)}
                            >
                                {transaction.category}
                            </td>
                            <td
                                className="p-4 text-gray-800 max-sm:table-cell max-md:!hidden border border-1 rounded-md"
                                onClick={() => handleTransactionClick(transaction)}
                            >
                                {formatDate(transaction.createdAt)}
                            </td>
                            <td className="p-4 text-gray-800 border border-1 rounded-md max-sm:hidden">
                                <button
                                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                                    onClick={() => deleteTransaction(transaction.id)}
                                >
                                    Apagar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={!!selectedTransaction}
                onRequestClose={closeModal}
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                className="bg-white rounded-lg p-8 relative w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
                contentLabel="Detalhes da Transação"
                ariaHideApp={false}
            >
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-4 right-4"
                    aria-label="Fechar modal"
                >
                </button>

                {selectedTransaction && (
                    <div className="space-y-4">
                        <h2 className="text-xl font-bold mb-4">Detalhes da Transação</h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-600">Título</p>
                                <p className="font-medium break-words">{selectedTransaction.title}</p>
                            </div>

                            <div>
                                <p className="text-gray-600">Valor</p>
                                <p className={`font-medium ${selectedTransaction.type === "deposit"
                                        ? "text-green"
                                        : "text-red-500"
                                    }`}>
                                    {formatCurrency(selectedTransaction.amount)}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600">Categoria</p>
                                <p className="font-medium">{selectedTransaction.category}</p>
                            </div>

                            <div>
                                <p className="text-gray-600">Data</p>
                                <p className="font-medium">
                                    {formatDate(selectedTransaction.createdAt)}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-600">Tipo</p>
                                <p className="font-medium">
                                    {selectedTransaction.type === 'deposit'
                                        ? 'Entrada'
                                        : 'Saída'}
                                </p>
                            </div>
                        </div>

                        <div className="flex space-x-4 mt-6">
                            <button
                                className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md"
                                onClick={() => {
                                    deleteTransaction(selectedTransaction.id);
                                    closeModal();
                                }}
                            >
                                Apagar Transação
                            </button>
                            <button
                                className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
                                onClick={closeModal}
                            >
                                Fechar
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
}
