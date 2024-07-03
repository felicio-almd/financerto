"use client"

import { useState, FormEvent } from "react";
import { FirebaseError } from "firebase/app";
import signIn, { signInWithGoogle } from "../../firebase/auth/signIn";
import { useRouter } from 'next/navigation';

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
        <div className="flex flex-col justify-between items-center p-24 min-h-screen">
            <section className="max-w-md mx-auto p-5 border border-gray-300 rounded-lg bg-white">
                <h1 className="text-2xl mb-5">Entrar</h1>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleForm} className="flex flex-col">
                    <label htmlFor="email" className="mb-3">
                        <p>Email</p>
                        <input onChange={(e) => setEmail(e.target.value)} required type="email" name="email" id="email" className="p-2 mt-4 mb-4 border border-gray-300 rounded w-full" placeholder="example@mail.com" />
                    </label>
                    <label htmlFor="password" className="mb-3">
                        <p>Senha</p>
                        <input onChange={(e) => setPassword(e.target.value)} required type="password" name="password" id="password" className="p-2 mt-4 mb-4 border border-gray-300 rounded w-full" placeholder="senha" />
                    </label>
                    <button type="submit" className="p-2 bg-blue-500 text-white rounded mb-3 hover:bg-blue-700" disabled={loading}>Login</button>
                    <button type="button" className="p-2 bg-red-500 text-white rounded mb-3 hover:bg-red-700" onClick={() => router.push("/signUp")} disabled={loading}>Cadastrar</button>
                    <button onClick={handleGoogleLogin} disabled={loading}>Login with Google</button>
                </form>
                {loading && <p>Carregando...</p>}
            </section>
        </div>
    );
}

export default SignIn;
