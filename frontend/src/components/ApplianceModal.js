import React from 'react';

function ApplianceModal({ appliance, onClose }) {
    if (!appliance) return null;

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <h2>{appliance.name}</h2>
                <p><strong>Status:</strong> {appliance.status ? 'On' : 'Off'}</p>
                <p><strong>Type:</strong> {appliance.type}</p>
                <p><strong>Location:</strong> {appliance.location}</p>
                <p><strong>Power Consumption:</strong> {appliance.powerConsumption} W</p>
                <p><strong>Control Mode:</strong> {appliance.controlMode}</p>
            </div>
        </div>
    );
}

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        width: '300px',
        maxWidth: '90%',
        position: 'relative',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#888',
    },
};

export default ApplianceModal;
