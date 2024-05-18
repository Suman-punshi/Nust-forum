import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../hover.css";
import Layout from "./Layout"; // Import the layout component
const IndividualPost = () => {
  const cardcolor = { backgroundColor: "#EEF7FF" };

  const { postId, userId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [text, setText] = useState("");
  const [p_id, setp_id] = useState("");

  useEffect(() => {
    // Fetch post data using postId
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/post/${userId}/${postId}`
        );
        setPost(response.data.project);
        setComments(response.data.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();
  }, [postId, userId]);

  const handleNewCommentSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4000/comment/${userId}/${postId}`,
        {
          text: text
        }
      );
      // Assuming the server responds with the newly created comment
      setComments([...comments, response.data]);
      setText("");
      setShowCommentForm(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout>
    <div className="w-75 container d-flex justify-content-center mt-5">
      <div className="row">
        <div className="col">
          <div className="">
            <div
              key={post._id}
              className="card rounded-4 mb-3"
              style={cardcolor}
            >
              <div className="card-header">
                <p className="card-subtitle text-muted">{post.username}</p>
                <h5 className="card-title">{post.Title}</h5>
              </div>
              <div className="tags">
                <span
                  className="badge ms-1"
                  style={{ backgroundColor: "#4D869C", color: "white" }}
                >
                  {post.tags}
                </span>
              </div>
              <div className="card-body">
                <p className="card-text">{post.text}</p>
                {post.images && (
                  <img src={post.images} className="card-img-top" alt="" />
                )}
                <span
                  className="badge badge-dark ms-1"
                  style={{ backgroundColor: "#4D869C", color: "white" }}
                >
                  {post.num_comments} comments
                </span>
                <br />
                {comments &&
                  comments.map((com) => (
                    <div
                      key={com._id}
                      className="card mb-2 p-3"
                      style={cardcolor}
                    >
                      <a
                        className=""
                        style={{
                          display: "inline-block",
                          color: "#4D869C",
                        }}
                      >
                        {com.username}
                      </a>
                      <p className="card-subtitle text-muted text-primary">
                        {com.text}
                      </p>
                    </div>
                  ))}
                {showCommentForm ? (
                  <div>
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className="form-control mb-2"
                      placeholder="Write your comment..."
                    ></textarea>
                    <button
                      onClick={handleNewCommentSubmit}
                      className="btn btn-primary"
                    >
                      Submit
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowCommentForm(true)}
                    className="btn btn-primary mt-2"
                  >
                    Add New Comment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
};

export default IndividualPost;