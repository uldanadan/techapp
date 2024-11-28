import React, {useState, useEffect, useContext} from 'react';
import './ApplicationList.scss';
import Table from '../../../components/UI/Table/Table';
import Tabs from '../../../components/UI/Tabs/Tabs';
import {AuthContext} from '../../../providers/AuthProvider';
import Button from '../../../components/UI/Button/Button';
import {useNavigate} from 'react-router-dom';

const tabs = [{label: 'Pending', value: 'Pending'}, {label: 'Reviewed', value: 'Reviewed'}];
const headers = ['№', 'Submission Date', 'Description', 'File', 'Status'];
const reviewedHeaders = [...headers, 'Comment'];

function AppList() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [applications, setApplications] = useState([]);
    const [rows, setRows] = useState([]);
    const [filteredStatus, setFilteredStatus] = useState('Pending');

    const fetchApplications = () => {
        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];
        if (!allApplications.length) return;

        setApplications(
            allApplications.filter(
                (app) =>
                    app.email === user.email &&
                    (filteredStatus === 'Reviewed'
                        ? app.status !== 'Pending'
                        : app.status === 'Pending'),
            ),
        );
    };

    useEffect(() => {
        setRows(applications.map((app, index) => ({
            '№': index + 1,
            'Submission Date': new Date(app.submissionDate).toLocaleString(),
            'Description': app.description,
            'File': app.file ? app.file : 'No file',
            'Status': app.status,
            ...(filteredStatus !== 'Pending' ? {'Comment': app.comment} : {})
        })));
    }, [applications]);

    useEffect(() => {
        fetchApplications();
    }, [filteredStatus]);

    return (
        <div className="app-list">
            <div className="container">
                <div className="app-list__box">
                    <div className="app-list__box-header">
                        <h2 className="title">My Applications</h2>
                        <Button className="success" onClick={() => navigate('/application/form')}>
                            Submit Application
                        </Button>
                    </div>
                    <Tabs tabs={tabs} selectedTab={filteredStatus} onChange={setFilteredStatus} />
                    <Table headers={filteredStatus === 'Pending' ? headers : reviewedHeaders} rows={rows} />
                </div>
            </div>
        </div>
    );
}

export default AppList;