import { useTransactions } from "../../hooks/useTransactions";

export function TransactionsTable() {
    const { transactions } = useTransactions();

    return (
        <div className="mt-16">
            <table className="w-full border-separate border-spacing-y-2">
                <thead>
                    <tr>
                        <th className="text-left font-normal p-4 text-gray-600">Título</th>
                        <th className="text-left font-normal p-4 text-gray-600">Valor</th>
                        <th className="text-left font-normal p-4 text-gray-600 hidden sm:table-cell">Categoria</th>
                        <th className="text-left font-normal p-4 text-gray-600 hidden sm:table-cell md:hidden">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="bg-white">
                            <td className="p-4 text-gray-800 rounded-l-md">{transaction.title}</td>
                            <td
                                className={`p-4 rounded-md ${
                                    transaction.type === "deposit" ? "text-green-500" : "text-red-500"
                                }`}
                            >
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(transaction.amount)}
                            </td>
                            <td className="p-4 text-gray-800 hidden sm:table-cell">
                                {transaction.category}
                            </td>
                            <td className="p-4 text-gray-800 hidden sm:table-cell md:hidden">
                                {new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.createdAt))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
