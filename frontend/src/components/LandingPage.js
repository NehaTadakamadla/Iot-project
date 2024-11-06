import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Welcome to Home Appliance Control</h1>
                <p style={styles.subtitle}>Manage your home appliances remotely with ease!</p>
            </header>

            <div style={styles.featuresContainer}>
                <h2 style={styles.featuresTitle}>Features</h2>
                <div style={styles.features}>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Remote Control</h3>
                        <p>Control appliances from anywhere at any time.</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Real-Time Status</h3>
                        <p>Get instant updates on the status of each device.</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>Multi-Appliance Support</h3>
                        <p>Easily add and manage multiple devices.</p>
                    </div>
                    <div style={styles.card}>
                        <h3 style={styles.cardTitle}>User-Friendly Dashboard</h3>
                        <p>Enjoy an intuitive, easy-to-navigate interface.</p>
                    </div>
                </div>
            </div>

            <div style={styles.actions}>
                <Link to="/signup">
                    <button style={styles.button}>Register</button>
                </Link>
                <Link to="/login">
                    <button style={styles.button}>Log In</button>
                </Link>
            </div>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        padding: '40px',
        fontFamily: 'Arial, sans-serif',
        animation: 'fadeIn 1s ease-in-out',
    },
    header: {
        marginBottom: '30px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
        color: '#333',
    },
    subtitle: {
        fontSize: '1.2em',
        color: '#555',
    },
    featuresContainer: {
        marginTop: '40px',
        marginBottom: '40px',
    },
    featuresTitle: {
        fontSize: '1.8em',
        marginBottom: '20px',
        color: '#333',
    },
    features: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '20px',
    },
    card: {
        width: '250px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease',
        textAlign: 'center',
    },
    cardTitle: {
        fontSize: '1.4em',
        marginBottom: '10px',
        color: '#4CAF50',
    },
    actions: {
        marginTop: '40px',
    },
    button: {
        margin: '0 15px',
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        transition: 'transform 0.2s, box-shadow 0.2s',
    },

    '@keyframes fadeIn': {
        '0%': { opacity: 0 },
        '100%': { opacity: 1 },
    },
};

styles.card[':hover'] = {
    transform: 'translateY(-10px)',
};

styles.button[':hover'] = {
    transform: 'scale(1.05)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
};

export default LandingPage;
