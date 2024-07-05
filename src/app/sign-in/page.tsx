"use client"

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn, { signInWithGoogle } from "../../firebase/auth/signIn";
import { useRouter } from 'next/navigation';
import  LogoGoogle  from '../../../public/assets/Google.svg';
import Image from "next/image";

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    const handleForm = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const { result, error } = await signIn(email, password);

            if (error) {
                const firebaseError = error as FirebaseError;
                console.error('Erro ao fazer login:', firebaseError);
                setError('Erro ao logar. Tente novamente.');
                setLoading(false);
                return;
            }

            router.push("/"); 
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao logar. Tente novamente.');
        } finally {
            setLoading(false); 
        }
    }

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const { result, error } = await signInWithGoogle();

            if (error) {
                console.error('Erro ao fazer login com o Google:', error);
                setError('Erro ao logar com o Google. Tente novamente.');
                setLoading(false);
                return;
            }

            router.push("/"); 
        } catch (error) {
            console.error('Erro ao fazer login com o Google:', error);
            setError('Erro ao logar com o Google. Tente novamente.');
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="flex flex-col justify-center max-lg:px-10 max-lg:py-20 min-h-screen w-full bg-gradient-to-b from-blue-800 to-blue-300 h-screen">
            <section className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-white">
                <h1 className="text-3xl font-bold text-green py-4">Seja bem vindo!</h1>
                <h1 className="text-md py-2 mb-4">Por favor entre com suas credenciais.</h1>
                {error && <div className="text-red-500 mb-5">{error}</div>}
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
                    <button type="submit" className="flex justify-center items-center gap-4 p-2 bg-green text-white rounded mb-3 hover:bg-opacity-80 hover:scale-105 transition-transform duration-200 ease-in-out" disabled={loading}>Login {loading && <div className="spinner ml-2"></div>}</button>
                    <div className="flex items-center pb-4">
                        <p className="text-xs mr-2">Ainda não tem conta?</p>
                        <button type="button" className="text-xs p-1 text-blue-600 font-bold rounded hover:bg-blue-800 hover:text-white" onClick={() => router.push("/sign-up")} disabled={loading}>Cadastrar</button>
                    </div>
                    <hr />
                    <button className="mt-3 border rounded text-sm p-2 flex items-center justify-center gap-3 hover:scale-105 transition-transform duration-200 ease-in-out" onClick={handleGoogleLogin} disabled={loading}>
                        <Image src={LogoGoogle} alt="google" width={22} />
                        Login com Google
                        {loading && <div className="spinner ml-2"></div>}
                    </button>
                </form>
            </section>
        </div>
    );
}

export default SignIn;
