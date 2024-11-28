import React from 'react';
import './Button.scss';

function Button({ onClick, children, className, disabled }) {
    return (
        <button onClick={onClick} className={`button ${className}`} disabled={disabled}>
            {children}
        </button>
    );
}

export default Button;
