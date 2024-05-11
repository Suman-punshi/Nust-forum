import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from './components/card';
import IndividualPost from './components/individualpost'; 
import Navbar from './components/navbar'; 
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/create-user" className="nav-link">Create User</Link>
              </li>
              <li className="nav-item">
                <Link to="/login-user" className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/post/:postId" element={<IndividualPost />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/cards/:userId" element={<Card />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
