import React, { useState } from 'react';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(
<<<<<<< HEAD
        'https://3973-2409-4072-6e8f-befe-7c12-7ad2-88f1-629a.ngrok-free.app/building/login/',
=======
        'https://5c55-2409-408d-1e08-1bc8-9c9d-bdc6-29a1-7760.ngrok-free.app/building/login/',
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
        {
          username,
          password,
        },
        {
          headers: {
            Accept: 'application/json',
            'ngrok-skip-browser-warning': '98547',
          },
        }
      );
<<<<<<< HEAD
      console.log('API Response:', response.data);
=======
      console.log('API Response:', response.data); // Log the entire response data for debugging
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
      if (response.data && response.data.Success === 'login successfully') {
        setSuccess('Login successful!');
        onLoginSuccess();
      } else {
        setError('Invalid username or password. Please try again.');
      }
    } catch (error) {
<<<<<<< HEAD
      setError('Failed to connect to the server. Please try again later.');
=======
      setError('Failed to connect to the server. Please try again later.'); // Generic error message for network issues
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
      console.error('Login error:', error);
    }
  };

  return (
<<<<<<< HEAD
    <div className="login-page">
      <header className="login-header">
        <div className="login-header-content">
          <h1>We Build It <img src="Device---Macbook-Air.webp" style={{maxHeight: '35px' ,paddingTop: '10px'}} /></h1>
          <nav className="login-nav"  style={{paddingRight: '22%'}}>
            <a href="/">Resources</a>
            <a href="/">About Us</a>
            <a href="/">Sign Up</a>
            <a href="/">Sign In</a>
          </nav>
        </div>
      </header>
      <div className="login-content">
        <div className="login-container">
          <div className="login-card">
            <div className="login-form">
              <h2>Welcome Back <img src="architect_2942499.png" style={{maxHeight: '40px'}} /></h2>
              {/* <p>Enter your User name and password to sign in</p> */}
              {error && <p className="error-message" style={{ color: 'red ', fontSize: '19px'}}>{error}</p>}
              {success && <p className="success-message">{success}</p>}
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="username" style={{paddingBottom: '10px'}}>User Name</label>
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="User Name"
                    required
                  />
                </div>
                <div className="input-group">
                  <label htmlFor="password" style={{paddingBottom: '10px'}}>Password</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                  />
                </div>
                <div className="remember-me" style={{color: 'white'}}>
                  <label>
                    <input type="checkbox" />
                    Remember me
                  </label>
                </div>
                <button type="submit">Sign In</button>
              </form>
              <p className="signup-link">
                Don't have an account? <a href="/signup">Sign up</a>
              </p>
            </div>
          </div>
        </div>
=======
    <div className="login-container">
      <div className="login-form">
        <h2>Login Page</h2>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="User Name"
              required
            />
          </label>
          <label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </label>
          <button className='btn'  type="submit">Login</button>
        </form>
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
      </div>
    </div>
  );
};

<<<<<<< HEAD
export default LoginPage;
=======
export default LoginPage;
>>>>>>> fa8b5c009bcd0edbbced772cb7835d5a6dcd7738
