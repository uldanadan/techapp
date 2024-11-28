import React, {useState, useEffect, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import Textarea from '../../../components/UI/Textarea/Textarea';
import { FaFileUpload, FaTrashAlt } from 'react-icons/fa';
import './ApplicationSubmit.scss';
import {AuthContext} from '../../../providers/AuthProvider';

function AppSubmit() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        setFullName(user.fullName || '');
        setEmail(user.email || '');
    }, [user]);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
        }
    };

    const handleSubmitApplication = () => {
        if (!fullName || !email || !description) {
            setError('All fields are required');
            return;
        }

        const applicationData = {
            fullName,
            email,
            description,
            file: file ? file.name : null,
            status: 'Pending',
            submissionDate: new Date().toISOString(),
            id: `id_${new Date().getTime()}`
        };

        const allApplications = JSON.parse(localStorage.getItem('applications')) || [];

        allApplications.push(applicationData);
        localStorage.setItem('applications', JSON.stringify(allApplications));

        navigate('/application');
    };

    return (
        <div className="application">
            <div className="application__form">
                <h2 className="title">Submit Application</h2>
                <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Full Name"
                />
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                />
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                />
                <div className="application__file-upload">
                    {!file ? (
                        <>
                            <input type="file" id="file" onChange={handleFileChange} style={{display: 'none'}}/>
                            <label htmlFor="file" className="application__file-label">
                                <FaFileUpload/> Upload File
                            </label>
                        </>
                    ) : (
                        <label className="application__file-label">
                            <span className="application__file-label">{file.name}</span>
                            <FaTrashAlt className="delete-icon" onClick={() => setFile(null)} />
                        </label>
                    )}
                </div>

                <Button onClick={handleSubmitApplication} className="primary">
                    Submit
                </Button>
                {error && <p className="error-message center">{error}</p>}
            </div>
        </div>
    );
}

export default AppSubmit;
