// src/components/ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, { password, confirmPassword });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.heading}>Reset Password</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <label style={styles.label}>New Password</label>
                    <input
                        style={styles.input}
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label style={styles.label}>Confirm Password</label>
                    <input
                        style={styles.input}
                        type="password"
                        value={confirmPassword}
                        placeholder='Confirm Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" disabled={loading} style={styles.button}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {message && <p style={styles.error}>{message}</p>}
            </div>
        </div>
    );
}


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f7f8fc',
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '30px 40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        width: '100%',
    },
    heading: {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        marginBottom: '15px',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        outline: 'none',
        transition: 'border-color 0.2s',
    },
    button: {
        padding: '12px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
    },
    error: {
        color: 'red',
        marginTop: '10px',
        textAlign: 'center',
    },
    label: {
        padding: '10px 10px 10px 2px',
    },
};



export default ResetPassword;
