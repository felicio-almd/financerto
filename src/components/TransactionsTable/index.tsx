import { useTransactions } from "../../hooks/useTransactions";

export function TransactionsTable() {
    const { transactions } = useTransactions();

    return (
        <div className="mt-16">
            <table className="w-full border-separate border-spacing-y-2">
                <thead className="border border-1">
                    <tr className="border border-1">
                        <th className="text-left font-normal p-4 text-gray-600 border border-1">Título</th>
                        <th className="text-left font-normal p-4 text-gray-600 border border-1">Valor</th>
                        <th className="text-left font-normal p-4 text-gray-600 max-sm:hidden border border-1">Categoria</th>
                        <th className="text-left font-normal p-4 text-gray-600 border border-1">Data</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id} className="bg-white">
                            <td className="p-4 text-gray-800 rounded-md border border-1">{transaction.title}</td>
                            <td
                                className={`p-4 rounded-md border border-1 ${
                                    transaction.type === "deposit" ? "text-green" : "text-red-500"
                                }`}
                            >
                                {new Intl.NumberFormat("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                }).format(transaction.amount)}
                            </td>
                            <td className="p-4 text-gray-800 border border-1 max-sm:hidden rounded-md">
                                {transaction.category}
                            </td>
                            <td className="p-4 text-gray-800 max-sm:table-cell max-md:hidden border border-1 rounded-md">
                                {transaction.createdAt ? (
                                    new Intl.DateTimeFormat("pt-BR").format(new Date(transaction.createdAt))
                                ) : (
                                    "Sem data"
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
