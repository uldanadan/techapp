import React, { useState} from 'react';
import Button from '../../../../components/UI/Button/Button';
import Modal from '../../../../components/UI/Modal/Modal';
import {axiosAPIClient} from '../../../../config/client';

function DeleteModal({ onClose, id }) {
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        axiosAPIClient.delete(`${id}`)
            .then(() => onClose(true))
            .finally(() => setLoading(false))
    };

    return (
        <Modal onClose={onClose}>
            <h2 className="title">
                Are sure want to delete?
            </h2>
            <div className="modal__actions">
                <Button onClick={() => onClose()} className="danger">Cancel</Button>
                <Button onClick={handleDelete} className="success" disabled={loading}>Yes</Button>
            </div>
        </Modal>
    )
}

export default DeleteModal;
