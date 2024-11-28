import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../../providers/AuthProvider';

export default function RoleGuard() {
    const { isAuth, isManager } = useContext(AuthContext);
    const { pathname } = useLocation();

    if (isManager && pathname.startsWith('/application')) return <Navigate to="/dashboard" />;
    else if (!isManager && pathname.startsWith('/dashboard')) return <Navigate to="/application" />;
    else return <Outlet/>;
}
