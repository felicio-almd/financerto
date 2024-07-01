import Image from "next/image";
import LogoImg from "../../../public/assets/logo.svg"

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {

    return (
        <header className="bg-blue-800 max-sm:h-[180px]">
            <div className="max-w-5xl mx-auto p-8 pt-8 pb-40 flex items-center justify-between sm:flex-col sm:gap-6">
                <Image src={LogoImg} alt="dt money" />
                <button className="text-white bg-blue-500 border-0 px-8 rounded-sm h-12 transition-filter duration-200 hover:brightness-90" type="button" onClick={onOpenNewTransactionModal}>
                    Nova Transação
                </button>
            </div>
        </header>
    )
};
