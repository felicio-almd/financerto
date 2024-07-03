'use client';

import React from "react";
import { useRouter } from 'next/navigation';
import { FirebaseError } from "firebase/app";
import signUp from "@/firebase/auth/signUp";

function Page() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const router = useRouter();

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
            return router.push("/signIn");
        } catch (error) {
            console.error('Error: ', error);
            setError('An error occurred during sign-up. Please try again.');
        }
    };

    return (
        <div className="flex flex-col justify-between items-center p-24 min-h-screen">
            <section className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-white">
                <h1 className="text-2xl mb-5">Cadastrar</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleForm} className="flex flex-col">
                    <label htmlFor="email" className="mb-3">
                        <p>Email</p>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            type="email"
                            name="email"
                            id="email"
                            className="p-2 mt-4 mb-4 border border-gray-300 rounded w-full"
                            placeholder="example@mail.com"
                        />
                    </label>
                    <label htmlFor="password" className="mb-3">
                        <p>Senha</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            type="password"
                            name="password"
                            id="password"
                            className="p-2 mt-4 mb-4 border border-gray-300 rounded w-full"
                            placeholder="Senha"
                        />
                    </label>
                    <button type="submit" className="p-2 bg-red-500 text-white rounded mb-3 hover:bg-red-700">
                        Cadastrar
                    </button>
                    <button
                        type="button"
                        className="p-2 bg-blue-500 text-white rounded mb-3 hover:bg-blue-700"
                        onClick={() => router.push("/signIn")}
                    >
                        Voltar ao login
                    </button>
                </form>
            </section>
        </div>
    );
}

export default Page;
