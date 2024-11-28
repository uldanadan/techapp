import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import './Auth.scss';

function Register() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [fullNameError, setFullNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const navigate = useNavigate();

    const handleRegister = () => {
        setFullNameError('');
        setEmailError('');
        setPasswordError('');

        let isValid = true;

        if (!fullName) {
            setFullNameError('*Full Name is required.');
            isValid = false;
        }

        if (!email) {
            setEmailError('*Email is required.');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('*Invalid email.');
            isValid = false;
        }

        if (!password) {
            setPasswordError('*Password is required.');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('*Password must be at least 8 characters.');
            isValid = false;
        }

        if (!isValid) return;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            setEmailError('User with this email already exists');
            return;
        }

        const newUser = { fullName, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        navigate('/');
    };

    return (
        <div className="register centered">
            <div className="form-container">
                <h2 className="title">Register</h2>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                />
                {fullNameError && <p className="error-message">{fullNameError}</p>} {}

                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                {emailError && <p className="error-message">{emailError}</p>} {}

                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                />
                {passwordError && <p className="error-message">{passwordError}</p>} {}

                <Button onClick={handleRegister} className="primary sign">
                    Register
                </Button>
                <div className="login__prompt">
                    <p className="text">Have an account?</p>
                    <Link to="/">
                        <Button className="transparent">Sign in</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
