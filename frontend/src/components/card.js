
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
                  <div className="card rounded-4" style={cardcolor}>
                    <div className="card-header">
                      <Link to={`/group/${userId}/${post.group}`} style={text_decor}>
                        <p className="card-subtitle text-success">{post.group}</p>
                      </Link>
                      <p className="card-subtitle text-muted">{post.username}</p>
                      <h5 className="card-title">{post.Title}</h5>
                    </div>
                    <Link to={`/tags/${userId}/${post.tags}/${post.group}`} style={text_decor}>
                      <div className="tags">
                        <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
                          {post.tags}
                        </span>
                      </div>
                    </Link>
                    <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                      <div className="card-body">
                        <span>
                          <p className="card-text">{post.text}</p>
                        </span>
                        <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
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