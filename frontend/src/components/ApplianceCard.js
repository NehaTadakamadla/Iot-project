import React from 'react';

function ApplianceCard({ appliance, onToggle, onClick, onDelete }) {
    return (
        <div style={styles.card} onClick={onClick}>
            <button style={styles.deleteButton} onClick={(e) => {
                e.stopPropagation();
                onDelete(appliance._id);
            }}>×</button>
            <h3>{appliance.name}</h3>
            <p>Status: {appliance.status ? 'On' : 'Off'}</p>
            <button style={styles.toggleButton} onClick={(e) => {
                e.stopPropagation();
                onToggle(appliance._id);
            }}>
                {appliance.status ? 'Turn Off' : 'Turn On'}
            </button>
        </div>
    );
}

const styles = {
    card: {
        backgroundColor: '#f9f9f9',
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        textAlign: 'center',
        width: '150px',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        margin: '10px',
        position: 'relative',
    },
    deleteButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        color: '#888',
    },
    toggleButton: {
        padding: '8px 12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ApplianceCard;
