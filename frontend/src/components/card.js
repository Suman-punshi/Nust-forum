import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import '../hover.css';

const Card = () => {
  const { userId } = useParams();
  const cardcolor = { backgroundColor: "#EEF7FF" };
  const text_decor = { textDecoration: "none" };
 
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate(); // Initialize navigate
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cards/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    fetchPosts();
  }, [userId]); // Include userId in the dependency array

  const handleClick = async (group) => {
    try {
      const response = await axios.get(`http://localhost:5000/cards/group/${group}`);
      setPosts(response.data);
      navigate(`/group/${group}`); // Redirect to GroupPosts component with group ID
    } catch (error) {
      console.error('Error fetching group posts:', error);
      // Handle error, for example, by showing an error message to the user
    }
  };

  return (
    <div className="w-75 container d-flex justify-content-center mt-5">
      <div className="row">
        <div className="col">
          <div className="">
            {posts.map(post => (
              <div key={post._id}>
                <div onClick={() => handleClick(post.group)} className="card rounded-4 mb-3" style={cardcolor}>
                  <div className="card-header">
                    <p className="card-subtitle text-muted">{post.username}</p>
                    <h5 className="card-title">{post.Title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text">{post.text}</p>
                    <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                      {post.num_comments} comments
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
