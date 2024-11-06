import React, { useState } from 'react';

function AddApplianceModal({ onClose, onAdd }) {
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        type: '',
        location: '',
        powerConsumption: '',
        controlMode: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAdd(formData);
        onClose();
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>×</button>
                <h2 style={styles.heading}>Add New Appliance</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Appliance Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        style={styles.input} 
                        required 
                    />
                    <input 
                        type="text" 
                        name="type" 
                        placeholder="Appliance Type" 
                        value={formData.type} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    <input 
                        type="text" 
                        name="location" 
                        placeholder="Location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    <input 
                        type="number" 
                        name="powerConsumption" 
                        placeholder="Power Consumption (W)" 
                        value={formData.powerConsumption} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    <input 
                        type="text" 
                        name="controlMode" 
                        placeholder="Control Mode" 
                        value={formData.controlMode} 
                        onChange={handleChange} 
                        style={styles.input} 
                    />
                    <button type="submit" style={styles.submitButton}>Add Appliance</button>
                </form>
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
        padding: '30px',
        borderRadius: '8px',
        width: '300px',
        maxWidth: '90%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
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
    heading: {
        margin: '0 0 20px',
        textAlign: 'center',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    submitButton: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        textAlign: 'center',
        marginTop: '10px',
    },
};

export default AddApplianceModal;
