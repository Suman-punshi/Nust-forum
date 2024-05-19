import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../hover.css";
import Sidebar from "./Sidebar";
import CommunitySidebar from "./community";
import { authContext } from "../context/AuthContext";
import "./css/Card.css"; // Import custom CSS

export const Card = () => {
  const { userId } = useParams();
  const { user } = useContext(authContext); // Get the logged-in user's information

  const cardcolor = { 
    backgroundColor: '#e0f7ff', // Light blue background
    border: '1px solid #1e90ff', // Dodger blue border
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, background-color 0.2s'
  };

  const text_decor = { textDecoration: "none" };

  const [posts, setPosts] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log(`Sending request to fetch all posts at: /cards/${userId}`);
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

  return (
    <div className="d-flex justify-content-center mt-5 no-scrollbar" style={{ marginTop: "80px", overflowX: 'hidden'}}>
      <div className="row">
        <div className="col-lg-3">
          <Sidebar id={userId} /> {/* Assume Sidebar contains tag elements */}
        </div>
        <div className="col-lg-6">
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
                      <Link to={`/users/${"u/"+post.username}`}>
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
        <div className="col-lg-3">
          <CommunitySidebar id={userId} className="community-sidebar" /> {/* Assume CommunitySidebar contains tag elements */}
        </div>
      </div>
    </div>
  );
};

export default Card;
