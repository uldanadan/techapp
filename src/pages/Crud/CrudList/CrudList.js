import React, {useState, useEffect, useContext} from 'react';
import './CrudList.scss';
import Table from '../../../components/UI/Table/Table';
import Tabs from '../../../components/UI/Tabs/Tabs';
import {AuthContext} from '../../../providers/AuthProvider';
import {axiosAPIClient} from '../../../config/client';
import Button from '../../../components/UI/Button/Button';
import ReviewModal from '../../Dashboard/DashboardDetail/modals/ReviewModal';
import {useModal} from '../../../hooks/useModal';
import CrudModal from './modals/CrudModal';
import DeleteModal from './modals/DeleteModal';

const headers = ['№', 'Full Name', 'Address', 'About', 'Actions'];

function CrudList() {
    const createModal = useModal();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [idToDelete, setIdToDelete] = useState();
    const [editItem, setEditItem] = useState();

    const getUsers = () => {
        axiosAPIClient.get('').then(r => {
            setRows(r.data?.map((data, index) => ({
                '№': index + 1,
                'Full Name': data.fullName,
                'Address': data.address,
                'About': data.about,
                'Actions':
                    <div className="actions">
                        <Button className="primary" onClick={() => setEditItem(data)}>Edit</Button>
                        <Button className="danger" onClick={() => setIdToDelete(data.id)}>Delete</Button>
                    </div>,
            })));
        }).finally(() => setLoading(false))
    };

    useEffect(() => {
        setLoading(true);
        getUsers();
    }, []);

    return (
        <>
            <div className="app-list">
                <div className="container">
                    <div className="app-list__box">
                        <div className="app-list__box-header">
                            <h2 className="title">Crud</h2>
                            <Button className="success" onClick={() => createModal.open()}>Create</Button>
                        </div>

                        {loading ? 'Loading...' : <Table headers={headers} rows={rows} />}
                    </div>
                </div>
            </div>

            {(createModal.modalOpen || editItem) && (
                <CrudModal
                    onClose={(isSuccess) => {
                        if (isSuccess) getUsers();
                        createModal.close();
                        setEditItem(undefined);
                    }}
                    editItem={editItem}
                />
            )}

            {!!idToDelete && (
                <DeleteModal
                    id={idToDelete}
                    onClose={(isSuccess) => {
                        if (isSuccess) getUsers();
                        setIdToDelete(undefined)
                    }}
                />
            )}
        </>
    );
}

export default CrudList;
