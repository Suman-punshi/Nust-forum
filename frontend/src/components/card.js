import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../hover.css";

export const Card = () => {
  const { userId } = useParams();

  const cardcolor = { backgroundColor: "#EEF7FF" };
  const tagcolor = { backgroundColor: "#547aeb" };

  const text_decor = { textDecoration: "none" };

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/cards/${userId}`
        );
        setPosts(response.data);
        console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="w-75 container d-flex justify-content-center mt-5">
      <div className="row">
        {" "}
        {/* Using Bootstrap's row class */}
        <div className="col">
          {" "}
          {/* Using Bootstrap's column class */}
          <div className="">
            {posts.map((post) => (
              <div
                key={post._id}
                className="card rounded-4 mb-3"
                style={cardcolor}
              >
                <div className="card-header">
                  <Link
                    to={`/group/${userId}/${post.group}`}
                    style={text_decor}
                  >
                    <p className="card-subtitle text-success">{post.group}</p>
                  </Link>
                  <p className="card-subtitle text-muted">{post.username}</p>
                  <h5 className="card-title">{post.Title}</h5>
                </div>
                {/* <span
                  key={index}
                  className="badge badge-dark ms-1"
                  style={{ backgroundColor: "#4D869C", color: "white" }}
                >
                  {post.tag}
                </span> */}
             <Link
                    to={`/tags/${userId}/${post.tags}/${post.group}`}
                    style={text_decor}
                  >
                  <div className="tags">
                      <span
  
                        className="badge badge-dark ms-1"
                        style={{ backgroundColor: "#4D869C", color: "white" }}
                      >
                        {post.tags}
                      </span>
                  </div>
              </Link>
                <Link
                  to={`/post/${userId}/${post._id}`}
                  style={{ color: "inherit", textDecoration: "none" }}
                >
                  <div className="card-body">
                    <span>
                      <p className="card-text">{post.text}</p>
                    </span>
                    <span
                      className="badge badge-dark ms-1"
                      style={{ backgroundColor: "#4D869C", color: "white" }}
                    >
                      {post.num_comments} comments {/* Add your logo here */}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;