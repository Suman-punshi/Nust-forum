import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import CommunitySidebar from "./community";
import { authContext } from "../context/AuthContext";
import Navbar from "./navbar";
import "./css/Card.css"; // Import custom CSS
import "./css/Responsive.css"; // Import responsive CSS

export const Card = () => {
  const { userId } = useParams();
  const { user } = useContext(authContext); // Get the logged-in user's information

  const [posts, setPosts] = useState([]);
  const [greeting, setGreeting] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedSidebar, setSelectedSidebar] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cards/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  const handleSidebarSelect = (sidebar) => {
    setSelectedSidebar(sidebar);
    setShowSidebar(!showSidebar);
  };

  return (
    <div>
      <Navbar onSidebarSelect={handleSidebarSelect} />
      <div className="d-flex justify-content-center mt-5" style={{ marginTop: "80px", overflowX: "hidden" }}>
        <div className="row">
          <div className="col-lg-3 sidebar-container">
            <Sidebar id={userId} />
          </div>
          <div className="col-lg-6 card-wrapper">
            <div className="container mt-5">
              <div className="row">
                <div className="col-12 mb-3">
                  <h3 style={{ color: "#041e3d" }}>
                    <b>{greeting}, {user ? user.username : 'User'}!</b>
                  </h3>
                </div>
                {posts.map((post) => (
                  <div key={post._id} className="col-12 mb-3">
                    <div className="card rounded-4" style={{ backgroundColor: '#8aa7bf', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                      <div className="card-header" style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', color: '#FFFFFF', fontWeight: 'bold' }}>
                        <Link to={`/group/${userId}/${post.group}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                          <p className="card-subtitle" style={{ color: "#8ee5ee", fontSize: "large", fontFamily: "'Roboto', sans-serif" }}>
                            {"r/" + post.group}
                          </p>
                        </Link>
                        <Link to={`/profile/${post.username}`} style={{ color: '#e6e6e4', textDecoration: 'none' }}>
                          <p className="card-subtitle" style={{ color: "#e6e6e4", fontSize: "small", fontFamily: "'Roboto', sans-serif" }}>
                            {"u/" + post.username}
                          </p>
                        </Link>
                        <h5 className="card-title" style={{ color: "#e6e6e4", fontSize: "large" }}>
                          {post.Title}
                        </h5>
                      </div>
                      <Link to={`/tags/${userId}/${post.tags}/${post.group}`} style={{ color: "inherit", textDecoration: "none" }}>
                        <div className="tags" style={{ backgroundColor: 'white' }}>
                          <span className="badge badge-dark ms-1" style={{ background: 'linear-gradient(45deg, #1e90ff, #00bfff)', color: 'white', borderRadius: '12px', padding: '5px 15px' }}>
                            {post.tags}
                          </span>
                        </div>
                      </Link>
                      <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                        <div className="card-body" style={{ backgroundColor: 'white', borderRadius: '0 0 16px 16px' }}>
                          <span>
                            <p className="card-text">{post.text}</p>
                          </span>
                          {post.images && <img src={`http://localhost:4000${post.images}`} className="card-img-top" alt="Post image" />}
                          <span className="badge badge-dark ms-1" style={{ background: 'linear-gradient(45deg, #1e90ff, #00bfff)', color: 'white', borderRadius: '12px', padding: '5px 15px' }}>
                            comments
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-lg-3 community-sidebar-container">
            <CommunitySidebar id={userId} />
          </div>
        </div>
        {showSidebar && (
          <div className="dropdown-menu sidebar-dropdown">
            {selectedSidebar === "tags" && <Sidebar id={userId} />}
            {selectedSidebar === "community" && <CommunitySidebar id={userId} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
