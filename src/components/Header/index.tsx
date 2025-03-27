import Image from "next/image";
import LogoImg from "../../../public/assets/dollar.png"
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

interface HeaderProps {
    onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
    const { userAuth, logout } = useAuthContext();
    const router = useRouter();

    function handleLogout () {
        logout();
        if (userAuth == null) {
            router.push("/sign-in");
        }
    }

    return (
        <header className="bg-blue-800 w-full max-sm:h-[180px]">
            <div className="max-w-5xl mx-auto p-8 pt-8 pb-40 flex items-center justify-between max-md:flex-col max-md:gap-6">
                <div className="flex gap-3 items-center ">
                    <Image src={LogoImg} alt="dt money" width={50} height={50} />
                    <h1 className="text-white font-extrabold text-2xl">Financerto</h1>
                </div>
                <div className="flex gap-3">
                    <button className="text-white bg-blue-500 border-0 px-8 rounded-sm h-12 transition-filter duration-200 hover:brightness-90" type="button" onClick={onOpenNewTransactionModal}>
                        Nova Transação
                    </button>
                    <button className="text-white bg-red-500 border-0 px-8 rounded-sm h-12 transition-filter duration-200 hover:brightness-90" type="button" onClick={handleLogout}>
                        Sair
                    </button>
                </div>
            </div>
        </header>
    )
};
