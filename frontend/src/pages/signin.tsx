import {useForm, SubmitHandler} from 'react-hook-form'
import {useAuth} from '../hooks/useAuth'
import {Lock} from 'lucide-react'

interface IFormInput {
    email: string;
    password: string;
}
export  function SignIn(){
    const {signIn} = useAuth();
    const {register, handleSubmit} = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = data => signIn(data);
    return (
        <div className='min-h-screen w-full flex flex-col items-center justify-center'>
            <Lock size={100} />
            <h1 className='text-5xl my-2 font-bold'>Login</h1>
        <form className='flex flex-col items-center justify-center' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col mb-4'>
                <label className='text-left mb-1' htmlFor="email">Email</label>
                <input
                    id='email'
                    type='email' 
                    className='w-80 text-slate-900 p-2 outline-2 outline-slate-900 rounded placeholder:bg-white placeholder:text-slate-500' 
                    {...register('email')} 
                    placeholder="Informe seu Email"
                />
            </div>
            <div className='flex flex-col mb-8'>
                <label className='text-left mb-1' htmlFor="password">Password</label>
                <input 
                    id='password'
                    type='password' 
                    className='w-80 text-slate-900 p-2 outline-2 outline-slate-900 rounded placeholder:bg-white placeholder:text-slate-500' 
                    {...register('password')} 
                    placeholder="Informe sua senha" 
                />
            </div>
            <button 
                type="submit"
                className='w-80 bg-zinc-500 p-2 rounded hover:bg-zinc-800 font-bold'
            >
                Enviar
            </button>
        </form>
        </div>
    )
}