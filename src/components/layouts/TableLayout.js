import React from 'react';

export default function TableLayout({ columns, children, loading = false, onlyTable = false }) {
    return (
        <div className="table-responsive">
            <table className={`table nowrap ${loading && 'hidden'}`}>
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </div>
    )
}