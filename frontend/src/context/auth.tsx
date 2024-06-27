import { createContext, useEffect,ReactNode, useState } from "react";
import {useNavigate} from 'react-router-dom'
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
  isAuth: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData | undefined>({} as AuthContextData);


export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
    }
  }, []);

  async function signup({name,email,password}: createUser) {
    try {
      const response = await api.post('/users/create', { name, email, password });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during signup:', error);
    }
    
  }

  async function signIn({email,password}: login) {
    const response = await api.post('/users/login', {email,password});
    const { token } = response.data;
    localStorage.setItem('token', token);
    setIsAuth(true);
  }
  async function getUser() {
    const response = await api.get('/users',{headers: {authorization: `Bearer ${localStorage.getItem('token')}`}});
    const {id, name, email} = response.data;
    localStorage.setItem('id', id);
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
  }

  return (
    <AuthContext.Provider value={{isAuth, getUser,signup, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}