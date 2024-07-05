"use client"

import { Summary } from "../Summary";
import { TransactionsTable } from "../TransactionsTable";
import { Footer } from "../Footer";

export function DashBoard() {
    return (
            <main className="flex flex-col max-w-[1120px] min-h-[70vh] self-center w-full flex-grow m-0 px-4 py-10 pb-2">
                <Summary />
                <TransactionsTable />
            </main>
    )
}