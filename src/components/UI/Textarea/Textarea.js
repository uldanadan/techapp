import React from 'react';
import './Textarea.scss';

function Textarea({ value, placeholder, onChange, className }) {
    return (
        <textarea
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`textarea ${className}`}
        />
    );
}

export default Textarea;
