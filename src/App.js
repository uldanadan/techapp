import React, {useContext} from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import {AuthContext} from './providers/AuthProvider';

function App() {
    const { isAuth } = useContext(AuthContext);

    return (
        <>
            {isAuth && <NavBar/>}
            <Outlet />
        </>
    )
}

export default App;
