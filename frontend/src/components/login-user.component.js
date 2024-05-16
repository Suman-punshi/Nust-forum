import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { authContext } from '../context/AuthContext';



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
    <div>
      <h3>Login</h3>
      {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
      {loginSuccess && <p style={{ color: 'green' }}>Login successful!</p>}
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username or Email: </label>
          <input
            type="text"
            required
            className="form-control"
            placeholder="Enter your username or email"
            value={loginIdentifier}
            onChange={onChangeLoginIdentifier}
          />
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            required
            className="form-control"
            value={password}
            onChange={onChangePassword}
          />
        </div>
        <div style={{ paddingTop: '20px' }} className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default LoginUser;