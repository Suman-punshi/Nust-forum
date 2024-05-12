import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from './components/card';
import IndividualPost from './components/individualpost'; 
import Navbar from './components/navbar'; 
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import GroupPosts from "./components/groups";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <nav className="navbar"></nav>

        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/post/:postId" element={<IndividualPost />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/cards/:userId" element={<Card />} />
          <Route path="/group/:group" element={<GroupPosts />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
