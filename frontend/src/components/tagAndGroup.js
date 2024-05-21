import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import Sidebar from "./Sidebar";
import CommunitySidebar from './community';



const TagPosts = () => {
  const { group } = useParams();
  const { userId } = useParams();
  const { tag_name } = useParams();
  const cardcolor = { backgroundColor: "#EEF7FF" };
  const [tagPosts, setTagPosts] = useState([]);

  useEffect(() => {
    const fetchtagPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tags/${userId}/${tag_name}/${group}`);
        setTagPosts(response.data);
      } catch (error) {
        console.error('Error fetching group posts:', error);
      }
    };
    

    fetchtagPosts();
  }, [group]);

  return (
    <div className="w-75 container d-flex justify-content-center mt-5">
      <div className="row">
        <div className="col-lg-3">
          <Sidebar id={userId} /> {/* Assume Sidebar contains tag elements */}
        </div>
        <div className="col-12">
          <div className="">
            {tagPosts.map(post => (
              <div key={post._id} className="card rounded-4 mb-3" style={cardcolor}>
                <div className="card-header" style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', color: '#FFFFFF', fontWeight: 'bold' }}>
                <Link to={`/profile/${post.username}`} style={{ color: '#e6e6e4', textDecoration: 'none' }}>
                          <p className="card-subtitle" style={{ color: "#e6e6e4", fontSize: "small", fontFamily: "'Roboto', sans-serif" }}>
                            {"u/" + post.username}
                          </p>
                </Link>
                  <h5 className="card-title">{post.Title}</h5>
                </div>
                <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                <div className="card-body">
                  <p className="card-text">{post.text}</p>
                  {post.images && <img src={post.images} className="card-img-top" alt="" />}
                  <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                    {post.num_comments} comments
                  </span>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="col-lg-3">
          <CommunitySidebar id={userId} /> {/* Assume Sidebar contains tag elements */}
        </div>
      </div>
    </div>
  );
};

export default TagPosts;