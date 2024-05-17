import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Card from './card';
import Layout from "./Layout"; // Import the layout component

const JustTagPosts = () => {
  const { group, userId, tag_name } = useParams(); // Destructure all parameters
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
      <div className="w-75 container d-flex justify-content-center mt-5">
        <Link to={`/create/${userId}/${group}`}>New Post</Link> {/* Use userId and group parameters */}
        <div className="row">
          <div className="col">
            <div className="">
              {tagPosts.map(post => (
                <div key={post._id} className="card rounded-4 mb-3" style={cardcolor}>
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
        </div>
      </div>
    </Layout>
  );
};

export default JustTagPosts;
