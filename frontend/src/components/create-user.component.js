import React, { useCallback, useContext, useState } from "react";
import axios from "axios";
import { authContext } from "../context/AuthContext";
import styles from '../components/modules/CreateUser.module.css'; // Import the CSS module
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const { dispatch } = useContext(authContext);

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
      password: password,
    };

    console.log("Sending user data:", user);

    axios
      .post("http://localhost:4000/users", user)
      .then((res) => {
        console.log("Response from server:", res.data);
        dispatch({
          // setting authContext state to user that just signed in
          type: "LOGIN",
          payload: res.data.userdata,
        });
        // Save token and user data to local storage for persistence across sessions
        localStorage.setItem("token", res.data.token); // Save the JWT token
        localStorage.setItem("user", JSON.stringify(res.data.userdata)); // Save user data
        
        setAlertMessage("User created successfully!");
        // You can also redirect the user or perform any other action here
      })
      .catch((err) => {
        console.error("Error sending request:", err);
        setAlertMessage("Error creating user. Please try again later.");
      });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h3>Create New User</h3>
        {alertMessage && <div className={styles.alert}>{alertMessage}</div>}
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Username:</label>
            <input type="text" required className={styles.input} value={username} onChange={onChangeUsername} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Email:</label>
            <input type="email" required className={styles.input} value={email} onChange={onChangeEmail} />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Password:</label>
            <input type="password" required className={styles.input} value={password} onChange={onChangePassword} />
          </div>
          <div className={styles.formGroup}>
            <button type="submit" className={styles.button}>Create User</button>
          </div>
        </form>
        <div className={styles.linkText}>
          Already registered? <span className={styles.textDecorationUnderline} onClick={() => navigate('/')}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
