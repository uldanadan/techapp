import React, {useEffect, useRef} from 'react';
import './Modal.scss';

function Modal({ children, onClose }) {
    const modalRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (modalRef.current && !modalRef.current?.contains(e.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="modal">
            <div className="modal__content" ref={modalRef}>
                {children}
            </div>
        </div>
    );
}

export default Modal;
