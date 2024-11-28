import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from '../App';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DashboardList from '../pages/Dashboard/DashboardList/DashboardList';
import DashboardDetail from '../pages/Dashboard/DashboardDetail/DashboardDetail';
import ApplicationList from '../pages/Application/ApplicationList/ApplicationList';
import ApplicationSubmit from '../pages/Application/ApplicationSubmit/ApplicationSubmit';
import AuthGuard from './guards/AuthGuard';
import RoleGuard from './guards/RoleGuard';
import CrudList from '../pages/Crud/CrudList/CrudList';

export default createBrowserRouter([
    {
        element: <App />,
        children: [
            {
                path: '/',
                element: <AuthGuard />,
                children: [
                    {
                        path: '',
                        element: <Login />,
                    },
                    {
                        path: '/register',
                        element: <Register />,
                    },
                    {
                        path: '/application',
                        element: <RoleGuard />,
                        children: [
                            {
                                path: '',
                                element: <ApplicationList />,
                            },
                            {
                                path: 'form',
                                element: <ApplicationSubmit />,
                            }
                        ]
                    },
                    {
                        path: '/dashboard',
                        element: <RoleGuard />,
                        children: [
                            {
                                path: '',
                                element: <DashboardList />,
                            },
                            {
                                path: ':id',
                                element: <DashboardDetail />,
                            }
                        ]
                    },
                ]
            },
            {
                path: '/crud',
                element: <CrudList />,
            },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" />, // todo 4o4 page
    },
]);
