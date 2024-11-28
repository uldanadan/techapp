import React, {useState} from 'react';
import './Input.scss';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

function Input({ type, placeholder, value, onChange }) {
    const [showPassword, setShowPassword] = useState(false);

    const renderInput = <input
        type={showPassword ? 'text' : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input-field"
    />

    return type === 'password' ? <div className="password">
        {renderInput}
        <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(prevState => !prevState)}
        >
            {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </button>
    </div> : renderInput;
}

export default Input;
