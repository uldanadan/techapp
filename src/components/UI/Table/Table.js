import React from 'react';
import './Table.scss';

function Table({ headers, rows }) {

    return (
        <table className="table">
            <thead>
            <tr>
                {headers.map((header, index) => (
                    <th key={`table-head-${index}`}>{header}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.length ? (
                rows.map((row, rowIndex) => (
                    <tr key={`table-row-${rowIndex}`}>
                        {headers.map((header, colIndex) => (
                            <td
                                key={colIndex}
                                className={header === 'Status' ? `status-${row[header].toLowerCase()}` : ''}
                            >
                                {row[header]}
                            </td>
                        ))}
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={headers.length}>
                        <span className="no-data">No data available.</span>
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default Table;
