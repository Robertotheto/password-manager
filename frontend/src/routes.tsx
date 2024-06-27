import {Routes, Route, useNavigate} from 'react-router-dom'
import {Home} from './pages/home'
import {SignIn} from './pages/signin'
import {SignUp} from './pages/signup'
import {ProtectedRoutes} from './components/protectedRoutes'
import {Passwords} from './pages/passwords'
import {useAuth} from './hooks/useAuth'
import { useEffect } from 'react'

export default function MainRouter() {
    const {isAuth} = useAuth();
    const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate('/passwords');
    }
  }, [isAuth, navigate]);
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/create" element={<SignUp />} />
            <Route element={<ProtectedRoutes redirectTo='/login'/>}>
                <Route path="/passwords" element={<Passwords />} />
            </Route>
        </Routes>
    )
}