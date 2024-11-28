import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../../../components/UI/Table/Table';
import './DashboardList.scss';
import Button from '../../../components/UI/Button/Button';

const headers = ['№', 'User', 'Submission Date', 'Status', 'Actions'];

function Dashboard() {
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        setApplications(allApplications);
    };

    useEffect(() => {
        setRows(applications.map((app, index) => ({
            '№': index + 1,
            'User': app.email,
            'Submission Date': new Date(app.submissionDate).toLocaleString(),
            'Status': app.status,
            'Actions': <Button onClick={() => navigate(`/dashboard/${app.id}`)} className="primary">Open</Button>,
        })))
    }, [applications]);

    return (
        <div className="dashboard">
            <div className="container">
                <div className="dashboard__box">
                    <h2 className="title">All Applications</h2>
                    <Table headers={headers} rows={rows} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
