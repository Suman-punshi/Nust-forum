
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../hover.css";
import Sidebar from "./Sidebar";
import Sidebar2 from "./community";

export const Card = () => {
  const { userId } = useParams();

  const cardcolor = { backgroundColor: "#EEF7FF" };

  const text_decor = { textDecoration: "none" };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/cards/${userId}`
        );
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container-fluid">
  <div className="row">
    <div className="col-lg-3">
      <div className="d-none d-lg-block sidebar ml-0"><Sidebar2 id={userId} /></div>
    </div>
    <div className="col-lg-7">
      <div className="container mt-5">
        <div className="row">
          {posts.map((post) => (
            <div key={post._id} className="col-12 mb-3">
              <div className="card rounded-4" style={{
                backgroundColor: '#e0f7ff', // Light blue background
                border: '1px solid #1e90ff', // Dodger blue border
                borderRadius: '16px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.2s, background-color 0.2s'
              }}>
                <div className="card-header" style={{
                  backgroundColor: '#035b69', // Steel blue background
                  borderTopLeftRadius: '16px',
                  borderTopRightRadius: '16px'
                }}>
                  <Link to={`/group/${userId}/${post.group}`} style={{ textDecoration: 'none', color: '#1e90ff', fontWeight: 'bold' }}>
                    <p className="card-subtitle" style={{ color: '#060d0d' }}>{post.group}</p> {/* Dodger blue */}
                  </Link>
                  <p className="card-subtitle" style={{ color: '#060d0d' }}>{post.username}</p> {/* Cadet blue */}
                  <h5 className="card-title" style={{ color: '#060d0d', fontWeight: 'bold' }}>{post.Title}</h5> {/* Deep sky blue */}
                </div>
                <Link to={`/tags/${userId}/${post.tags}/${post.group}`} style={{ textDecoration: 'none', color: '#4D869C' }}>
                  <div className="tags">
                    <span className="badge ms-1" style={{
                      background: 'linear-gradient(45deg, #1e90ff, #00bfff)', // Gradient of Dodger blue and Deep sky blue
                      color: 'white',
                      borderRadius: '12px',
                      padding: '5px 15px'
                    }}>
                      {post.tags}
                    </span>
                  </div>
                </Link>
                <Link to={`/post/${userId}/${post._id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <div className="card-body" style={{ backgroundColor: '#b0e0e6', borderRadius: '0 0 16px 16px' }}> {/* Powder blue background */}
                    <span>
                      <p className="card-text" style={{ color: '#333', marginTop: '10px' }}>{post.text}</p>
                    </span>
                    <span className="badge ms-1" style={{
                      background: 'linear-gradient(45deg, #1e90ff, #00bfff)', // Gradient of Dodger blue and Deep sky blue
                      color: 'white',
                      borderRadius: '12px',
                      padding: '5px 15px'
                    }}>
                      {post.num_comments} comments
                    </span>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="col-lg-2">
      <div className="d-none d-lg-block sidebar ml-0"><Sidebar id={userId} /></div>
    </div>
  </div>
</div>

  );
};

export default Card;