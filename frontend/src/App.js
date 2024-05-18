import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Card from './components/card';
import GroupPosts from "./components/groupss";
import IndividualPost from './components/individualpost'; 
import Navbar from './components/navbar'; 
import CreateUser from "./components/create-user.component";
import LoginUser from "./components/login-user.component";
import CreatePostDialog from "./components/createPostDialog";
import TagPosts from "./components/tagAndGroup";
import JustTagPosts from "./components/justTags";
import DisplaySearchResults from "./components/DisplaySearchResults";
import Sidebar from "./components/Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import UserProfileComponent from "./components/userProfile.component";

function App() {

  return (
    <Router>
      <div className="container">
        <Navbar />
        {/* <Sidebar/> */}
        
        <nav className="navbar"></nav>

        <Routes>
          <Route path="/" element={<LoginUser />} />
          
          <Route path="/post/:userId/:postId" element={<IndividualPost />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/cards/:userId" element={<Card />} />
          <Route path="/group/:userId/:group" element={<GroupPosts />} />
          <Route path="/tags/:userId/:tag_name/:group" element={<TagPosts />} />
          <Route path="/create/:userId/:group" element={<CreatePostDialog />} />
          <Route path="/tag/:userID/:tag_name" element={<JustTagPosts />} />
          {/* Pass searchResults as a prop to DisplaySearchResults */}
          <Route path="/search/:groupName" element={<DisplaySearchResults />} />
          <Route path = "/profile/:username" element={< UserProfileComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
