import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { authContext } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
//import styles from '../components/modules/LoginUser.module.css';
import '../components/css/LoginUser.css';

const LoginUser = () => {
  const navigate = useNavigate();

  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null); // State to handle login error
  const [loginSuccess, setLoginSuccess] = useState(false); // State to handle login success
  const { dispatch } = useContext(authContext);


  const onChangeLoginIdentifier = (e) => {
    setLoginIdentifier(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
  
    // Determine if the entered identifier is an email or username
    const loginMethod = loginIdentifier.includes('@') ? 'email' : 'username';
  
    // Define the user object
    let user = {};
  
    // If login method is email, set the email field in the user object
    if (loginMethod === 'email') {
      user = {
        email: loginIdentifier,
        password: password
      };
    } else { // Otherwise, set the username field
      user = {
        loginIdentifier: loginIdentifier,
        password: password
      };
    }
  
    console.log('Sending user data:', user);
  
    axios.post('http://localhost:4000/users/login', user)
      .then(res => {
        console.log('Response from server:', res.data);
        if (res.data.message === 'Login successful') {
          // Clear any previous error message
          setLoginError(null);
          // Set login success message
          setLoginSuccess(true);
          // Reset form fields
          setLoginIdentifier('');
          setPassword('');
          // Redirect to home after successful login
          console.log(res.data.userdata._id);
          dispatch({ // setting authContext state to user that just signed in
            type: 'LOGIN',
            payload: res.data.userdata 
        });
        // Save token and user data to local storage for persistence across sessions
      localStorage.setItem('token', res.data.token); // Save the JWT token
      localStorage.setItem('user', JSON.stringify(res.data.userdata)); // Save user data
          navigate(`/cards/${res.data.userdata.id}`);
        } })
      .catch(err => {
        console.error('Error sending request:', err);
        // Display error message if login fails
        setLoginError('Invalid username/email or password');
      });
  };
  
  return (
    <div className="container">
        <div className="typed-text-container">
          <div className="typing-animation">Welcome to NUST Forums!</div>
        </div>
        <div className="login-container">
            <div className="card">
                <div className="card-body">
                    <h3 className="card-title text-center">Sign In</h3>
                    {loginError && <div className="alert alert-danger">{loginError}</div>}
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label htmlFor="usernameEmail">Username or Email</label>
                            <input
                                id="usernameEmail"
                                type="text"
                                className="form-control"
                                placeholder="Enter your username or email"
                                value={loginIdentifier}
                                onChange={onChangeLoginIdentifier}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                value={password}
                                onChange={onChangePassword}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Login</button>
                    </form>
                    <div className="mt-3">
                        <p className="text-muted text-center">
                            New to the NUST Forums? <a href="/create-user" className="text-decoration-underline">Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};



export default LoginUser;