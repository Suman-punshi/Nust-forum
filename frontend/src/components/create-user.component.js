import React, { useState } from 'react';
import axios from 'axios';

const CreateUser = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: username,
            email: email,
            password: password
        };

        console.log('Sending user data:', user);

        axios.post('http://localhost:4000/users', user)
            .then(res => {
                console.log('Response from server:', res.data);
                setAlertMessage('User created successfully!');
                // You can also redirect the user or perform any other action here
            })
            .catch(err => {
                console.error('Error sending request:', err);
                setAlertMessage('Error creating user. Please try again later.');
            });

        setUsername('');
        setEmail('');
        setPassword('');
    };

    return (
        <div>
            <h3>Create New User</h3>
            {alertMessage && <div className="alert alert-info">{alertMessage}</div>}
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <label>Email: </label>
                    <input
                        type="email"
                        required
                        className="form-control"
                        value={email}
                        onChange={onChangeEmail}
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
                    <input type="submit" value="Create User" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
};

export default CreateUser;
