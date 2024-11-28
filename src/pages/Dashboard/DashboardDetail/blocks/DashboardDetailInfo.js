import React, {memo} from 'react';
import {DashboardDetailValue} from '../components/DashboardDetailValue';

export const DashboardDetailInfo = memo(({application}) => {
    return (
        <>
            <DashboardDetailValue label="Email" value={application?.email} />
            <DashboardDetailValue label="Status" value={application?.status} />
            {application?.status !== 'Pending' && application?.comment && (
                <DashboardDetailValue label="Comment" value={application?.comment} />
            )}
            <DashboardDetailValue label="Description" value={application?.description} />
            <DashboardDetailValue label="File" value={application?.file || 'No file uploaded'} />
        </>
    )
})
