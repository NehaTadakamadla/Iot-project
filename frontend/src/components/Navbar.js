import React from 'react';

function Navbar({ onLogout }) {
    return (
        <div style={styles.navbar}>
            <h1 style={styles.title}>Home Appliance</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
        </div>
    );
}

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        backgroundColor: '#4CAF50',
        color: 'white',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    title: {
        margin: 0,
    },
    logoutButton: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        color: '#4CAF50',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '16px',
    },
};

export default Navbar;
