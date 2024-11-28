import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!email || !password) {
            setError("Please fill in both fields.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (email === 'manager_123@gmail.com' && password === 'manager123') {
            localStorage.setItem('currentUser', JSON.stringify({ email, role: 'manager' }));
            navigate('/dashboard');
            window.location.reload();
            return;
        }

        if (!user) {
            setError("Invalid email or password.");
            return;
        }

        localStorage.setItem('currentUser', JSON.stringify(user));
        setError('');
        navigate('/application');
        window.location.reload();
    };

    return (
        <div className="login centered">
            <div className="form-container">
                <h2 className="title">Login</h2>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={handleLogin} className="primary sign">Sign in</Button>
                <div className="login__prompt">
                    <p className="text">Don't have an account?</p>
                    <Link to="/register">
                        <Button className="transparent">Sign up</Button>
                    </Link>
                </div>
                {error && <p className="error-message center">{error}</p>}
            </div>
        </div>
    );
}

export default Login;
