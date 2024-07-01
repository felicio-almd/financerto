import Image from "next/image";
import incomeImg from "../../../public/assets/income.svg";
import outcomeImg from "../../../public/assets/outcome.svg";
import totalImg from "../../../public/assets/total.svg";
import { useTransactions } from "../../hooks/useTransactions";

export function Summary() {
  const { transactions } = useTransactions();

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "deposit") {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }

      return acc;
    },
    {
      deposits: 0,
      withdraws: 0,
      total: 0,
    }
  );

  return (
    <div className="grid max-md:grid-cols-1 grid-cols-3 gap-8 sm:-mt-32 -mt-30">
      <div className="bg-shape p-6 rounded-md text-text-title">
        <header className="flex items-center justify-between">
          <p>Entradas</p>
          <Image src={incomeImg} alt="Entradas" />
        </header>
        <strong className="block mt-4 text-2xl font-medium leading-12">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.deposits)}
        </strong>
      </div>
      <div className="bg-shape p-6 rounded-md text-text-title">
        <header className="flex items-center justify-between">
          <p>Saídas</p>
          <Image src={outcomeImg} alt="Saídas" />
        </header>
        <strong className="block mt-4 text-2xl font-medium leading-12">
          -{new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.withdraws)}
        </strong>
      </div>
      <div className="bg-green text-white p-6 rounded-md">
        <header className="flex items-center justify-between">
          <p>Total</p>
          <Image src={totalImg} alt="Total" />
        </header>
        <strong className="block mt-4 text-2xl font-medium leading-12">
          {new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(summary.total)}
        </strong>
      </div>
    </div>
  );
}
