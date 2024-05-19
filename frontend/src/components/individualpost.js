import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout"; // Import the layout component
import ss from '../components/modules/indiv_posts.module.css'; // Import custom styles

const IndividualPost = () => {
  const { postId, userId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/post/${userId}/${postId}`);
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
        { text }
      );
      setComments([...comments, response.data]);
      setText("");
      setShowCommentForm(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!post) {
    return (
      <div className={ss.loadingSpinner}>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div key={post._id} className="card rounded-4 mb-3" style={{
              backgroundColor: '#336791', // Light blue background
              border: '1px solid #1e90ff', // Dodger blue border
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}>
              <div className="card-header" style={{
                background: 'linear-gradient(to bottom, #1a1a2e, #16213e)',
                color: '#e6e6e4',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px'
              }}>
                <p className="card-subtitle" style={{ fontSize: "medium" }}>{"u/" + post.username}</p>
                <h5 className="card-title" style={{ fontSize: "x-large" }}>{post.Title}</h5>
              </div>
              <div className="tags">
                <span className={`badge ${ss.customBadge} ms-1`}>{post.tags}</span>
              </div>
              <div className="card-body">
                <p className="card-text">{post.text}</p>
                {post.images && <img src={post.images} className="card-img-top" alt="" />}
                <div className="mt-2">
                  <span className={`badge ${ss.customBadge}`}>{post.num_comments} comments</span>
                </div>
                <div className="mt-3">
                  {comments.map((com) => (
                    <div key={com._id} className={ss.commentCard}>
                      <span className={ss.commentUsername}>{com.username}</span>
                      <p className={ss.commentText}>{com.text}</p>
                    </div>
                  ))}
                </div>
                {showCommentForm ? (
                  <div className="mt-3">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      className={`form-control ${ss.formControl} mb-2`}
                      placeholder="Write your comment..."
                    ></textarea>
                    <button onClick={handleNewCommentSubmit} className={`btn ${ss.btnPrimary}`}>
                      Submit
                    </button>
                  </div>
                ) : (
                  <button onClick={() => setShowCommentForm(true)} className={`btn ${ss.btnPrimary} mt-2`}>
                    Add New Comment
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndividualPost;
