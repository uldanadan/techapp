import React, {useEffect, useState} from 'react';
import Button from '../../../../components/UI/Button/Button';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import Modal from '../../../../components/UI/Modal/Modal';
import Input from '../../../../components/UI/Input/Input';
import {axiosAPIClient} from '../../../../config/client';

function CrudModal({ onClose, editItem }) {
    // todo can use form using hook-forms with validations
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [about, setAbout] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSave = () => {
        setLoading(true);
        axiosAPIClient[editItem ? 'put' : 'post'](editItem ? editItem.id : '', {fullName, address, about})
            .then(() => onClose(true))
            .finally(() => setLoading(false))
    };

    useEffect(() => {
        if (editItem) {
            setFullName(editItem.fullName);
            setAddress(editItem.address);
            setAbout(editItem.about);
        }
    }, [editItem])

    return (
        <Modal onClose={onClose}>
            <h2 className="title">
                {editItem ? 'Edit' : 'Create'}
            </h2>
            <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Full Name"
            />
            <Input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Address"
            />
            <Textarea
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                placeholder="About yourself"
            />
            <div className="modal__actions">
                <Button onClick={() => onClose()} className="danger">Cancel</Button>
                <Button
                    onClick={handleSave}
                    className="success"
                    disabled={!fullName || !address || !about || loading}
                >
                    Save
                </Button>
            </div>
        </Modal>
    )
}

export default CrudModal;
