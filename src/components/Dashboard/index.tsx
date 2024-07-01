import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";

export function DashBoard() {
    return (
        <main className="max-w-[1120px] m-0 px-4 py-10">
            <Summary />
            <TransactionsTable />
        </main>
    )
}