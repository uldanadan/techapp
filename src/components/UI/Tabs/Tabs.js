import React from 'react';
import './Tabs.scss';

function Tabs({ tabs = [], selectedTab, onChange }) {

    return (
        <div className="tab">
            {tabs.map(tab => (
                <button
                    key={`tab-item-${tab.value}`}
                    className={`tab-item ${selectedTab === tab.value ? 'active' : ''}`}
                    onClick={() => onChange(tab.value)}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
}

export default Tabs;
