import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Send the email to the backend to initiate the forgot password process
      // const response = await axios.post('/api/auth/forgot-password', { email });
      const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });

      setMessage(response.data.message); // Success message
    } catch (error) {
      setMessage(error.response.data.message); // Error message
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Forgot Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>

            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              style={styles.input}
              type="email"
              id="email"
              name="email"
              value={email}
              placeholder='Email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
 {/* Floating label effect  .input-box:focus + label*/}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && <div style={styles.error}>{message}</div>}
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


export default ForgotPassword;

