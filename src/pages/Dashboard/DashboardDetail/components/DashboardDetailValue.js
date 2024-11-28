import React, {memo} from 'react';
import '../DashboardDetail.scss';

export const DashboardDetailValue = memo(({label, value}) => {

    return (
        <p className="text">
            <strong>{label}:</strong> {value}
        </p>
    )
})
