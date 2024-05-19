import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";
import Card from './card';
import Layout from "./Layout"; // Import the layout component
import CommunitySidebar from './community';

const JustTagPosts = () => {
  const { userId, tag_name } = useParams(); // Destructure all parameters
  const cardcolor = { backgroundColor: "#EEF7FF" };
  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    const fetchtagPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tag/${userId}/${tag_name}`);
        setTagPosts(response.data);
      } catch (error) {
        console.error('Error fetching group posts:', error);
      }
    };
    fetchtagPosts();
  }, [userId, tag_name]); // Include userId and tag_name in the dependency array

  return (
    <Layout>
<div className="d-flex justify-content-left mt-5" style = {{overflowX : 'hidden', left : '0'}}>
        <div className="row" style = {{overflowX : 'hidden'}}>
        <div className="col-lg-3">
            <Sidebar id={userId} />
          </div>
          <div className="col-12">
            <div className="w-100">
              {tagPosts.map(post => (
                <div key={post._id} className="card w-100 rounded-4 mb-3" style={cardcolor}>
                  <div className="card-header">
                    <p className="card-subtitle text-muted">{post.username}</p>
                    <h5 className="card-title">{post.Title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{post.text}</p>
                    {post.images && <img src={post.images} className="card-img-top" alt="" />}
                    <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                      {post.num_comments} comments
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-lg-3">
          <CommunitySidebar id={userId} /> {/* Assume Sidebar contains tag elements */}
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default JustTagPosts;
