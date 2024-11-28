import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../providers/AuthProvider';

export default function AuthGuard() {
    const { isAuth, isManager } = useContext(AuthContext);
    const { pathname } = useLocation();

    if (isAuth) {
        if (pathname === '/' || pathname === '/register') {
            return <Navigate to={`/${isManager ? 'dashboard' : 'application'}`} />;
        }
        return <Outlet/>;
    } else if (pathname !== '/') return <Navigate to="/"/>;

    return <Outlet/>;
}