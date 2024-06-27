import {Navigate, Outlet} from 'react-router-dom'
import {useAuth} from '../hooks/useAuth'

interface IProtectedRoutes {
    redirectTo: string;
}
export function ProtectedRoutes({redirectTo}: IProtectedRoutes) {
    const {isAuth} = useAuth();
        if(!isAuth) {
        return <Navigate to={redirectTo} replace={true} />
    }
    return <Outlet />

}