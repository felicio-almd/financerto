'use client';

import { useRouter } from 'next/navigation';
import { FirebaseError } from "firebase/app";
import signUp from "@/firebase/auth/signUp";
import { useState } from 'react';

// bg-blue-800
// bg-green


function Page() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false); 

    const handleForm = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null); // Reinicia error state antes de tentar cadastrar

        try {
            const { result, error } = await signUp(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                if (firebaseError.message) {
                    setError(firebaseError.message);
                } else {
                    setError('Erro...');
                }
                return;
            }

            console.log(result);
            return router.push("/sign-in");
        } catch (error) {
            console.error('Error: ', error);
            setError('An error occurred during sign-up. Please try again.');
        }
    };

    return (
        <div className="flex w-full flex-col justify-between items-center px-14 py-24 max-lg:px-10 max-lg:py-20 min-h-screen bg-gradient-to-b from-blue-800 to-blue-300 h-screen">
            <section className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-white">
                <h1 className="text-3xl font-bold text-green py-3">Cadastre-se</h1>
                <h1 className="text-md py-2 mb-4">Digite suas novas credenciais.</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleForm} className="flex flex-col">
                <div className="relative mb-5">
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="p-2 border border-gray-300 rounded w-full" 
                            placeholder="email@mail.com" 
                        />
                        <label htmlFor="email" className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white px-1 text-gray-500">Email</label>
                    </div>
                    <div className="relative mb-4">
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            type="password" 
                            name="password" 
                            id="password" 
                            className="p-2 border border-gray-300 rounded w-full" 
                            placeholder="senha" 
                        />
                        <label htmlFor="password" className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-white px-1 text-gray-500">Senha</label>
                    </div>
                    <button type="submit" 
                    className="flex justify-center items-center gap-4 p-2 bg-blue-600 text-white rounded mb-3 hover:bg-blue-800 hover:scale-105 transition-transform duration-200 ease-in-out" disabled={loading}>Cadastrar {loading && <div className="spinner ml-2"></div>}</button>
                    
                    <div className='flex items-center gap-2'>
                    <p className='text-xs'>Já tem uma conta?</p>
                    <a
                        className="self-center text-xs font-bold px-2 py-1 text-lime-900 hover:bg-green rounded hover:cursor-pointer hover:text-white"
                        onClick={() => router.push("/sign-in")}
                        >
                        Voltar ao login
                    </a>
                        </div>
                </form>
            </section>
        </div>
    );
}

export default Page;
