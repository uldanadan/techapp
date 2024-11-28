import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReviewModal from './modals/ReviewModal';
import Button from '../../../components/UI/Button/Button';
import './DashboardDetail.scss';
import {DashboardDetailInfo} from './blocks/DashboardDetailInfo';

function DashboardDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [application, setApplication] = useState();
    const [actionType, setActionType] = useState('');

    const fetchApplication = () => {
        const applications = JSON.parse(localStorage.getItem('applications')) || [];
        const app = applications.find(a => a.id === id);
        if (app) setApplication(app);
    }

    const handleSave = (updatedApplication) => {
        setApplication(updatedApplication);
        setActionType('');
        fetchApplication();
    };

    useEffect(() => {
        fetchApplication();
    }, [id]);

    return (
        <div className="detail-dashboard">
            {application ? (
                <div className="container">
                    <h2 className="title">
                        {application?.status === 'Pending' ? 'Review Application' : 'Reviewed'}
                    </h2>
                    <DashboardDetailInfo application={application} />
                    <div className="actions">
                        <Button
                            onClick={() => navigate('/dashboard')}
                            className="primary"
                        >
                            Back
                        </Button>
                        {application?.status === 'Pending' && (
                            <>
                                <Button
                                    onClick={() => setActionType('Rejected')}
                                    className="danger"
                                >
                                    Reject
                                </Button>
                                <Button
                                    onClick={() => setActionType('Approved')}
                                    className="success"
                                >
                                    Approve
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    <p className="title">Application with id: {id} is not found</p>
                    <Button onClick={() => navigate('/dashboard')} className="primary">
                        Go to dashboard
                    </Button>
                </>
            )}

            {!!actionType && (
                <ReviewModal
                    onClose={() => setActionType('')}
                    onSave={handleSave}
                    actionType={actionType}
                />
            )}
        </div>
    )
}

export default DashboardDetail;
