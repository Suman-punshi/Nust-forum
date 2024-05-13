import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from './components/card';
import GroupPosts from "./components/groupss";
import IndividualPost from './components/individualpost'; 
import Navbar from './components/navbar'; 
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import CreatePostDialog from "./components/createPostDialog";
import TagPosts from "./components/tags";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {

  return (
    <Router>
      <div className="container">
        <Navbar />
        <nav className="navbar"></nav>

        <Routes>
          <Route path="/" element={<LoginUser />} />
          <Route path="/post/:userId/:postId" element={<IndividualPost />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/cards/:userId" element={<Card />} />
          <Route path="/group/:userId/:group" element={<GroupPosts />} />
          <Route path="/tags/:userId/:tag_name/:group" element={<TagPosts />} />
          <Route path="/create/:userId/:group" element={<CreatePostDialog />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
