import { createContext, useEffect,ReactNode } from "react";
import {api} from '../lib/axios'

interface createUser {
  name: string;  
  email: string;
  password: string;
}
interface login{
  email: string;
  password: string;
}

export interface AuthContextData {
  signup: (data: createUser) => void;
  signIn: (data: login) => void;
  getUser: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData | undefined>({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }, []);

  async function signup({name,email,password}: createUser) {
    const response = await api.post('/users', {name,email,password});
    console.log(response.data);
  }

  async function signIn({email,password}: login) {
    const response = await api.post('/users/login', {email,password});
    const { token } = response.data;
    localStorage.setItem('token', token);
  }
  async function getUser() {
    const response = await api.get('/users',{headers: {authorization: `Bearer ${localStorage.getItem('token')}`}});
    const {id, name, email} = response.data;
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
  }

  return (
    <AuthContext.Provider value={{ getUser,signup, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}