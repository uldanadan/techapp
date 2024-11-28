import React, { useState } from 'react';
import Button from '../../../../components/UI/Button/Button';
import Textarea from '../../../../components/UI/Textarea/Textarea';
import Modal from '../../../../components/UI/Modal/Modal';
import {useParams} from 'react-router-dom';

function ReviewModal({ onClose, onSave, actionType }) {
    const { id } = useParams();
    const [comment, setComment] = useState('');

    const handleSave = () => {
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        const idx = applications.findIndex(a => a.id === id);
        applications[idx].status = actionType;
        applications[idx].comment = comment;
        localStorage.setItem('applications', JSON.stringify(applications));
        onSave(applications[idx]);
    };

    return (
        <Modal onClose={onClose}>
            <h2 className="title">
                {actionType === 'Approved' ? 'Approve Application' : 'Reject Application'}
            </h2>
            <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment..."
            />
            <div className="modal__actions">
                <Button onClick={onClose} className="danger">Cancel</Button>
                <Button onClick={handleSave} className="success">Save</Button>
            </div>
        </Modal>
    )
}

export default ReviewModal;
