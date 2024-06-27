import { Link } from "react-router-dom";
import {Lock} from 'lucide-react'

export function Home() {
    return (
        <main className="min-h-screen w-full flex flex-col items-center justify-center">
            <section className="flex flex-col gap-2 px-4 items-center justify-center">
                <Lock size={100} />
                <h1 className="text-4xl font-bold text-center">Bem vindo ao sistema de cofre de senha</h1>
                <p className="text-lg">Para acessar as funcionalidades do sistema, faça o login ou crie uma conta</p>
            </section>
            <section className="flex mt-5">
                <div className="flex gap-4 px-4 items-center justify-around">
                    <Link className="bg-zinc-500 p-4 rounded hover:bg-zinc-800 font-bold" to="/login">Login</Link>
                    <Link className="bg-zinc-500 p-4 rounded hover:bg-zinc-800 font-bold" to="/create">Create User</Link>
                </div>
            </section>
        </main>
    )
}