import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import ss from '../components/modules/indiv_posts.module.css';
import { authContext } from "../context/AuthContext";
import { Dropdown } from 'react-bootstrap';
import CommunitySidebar from "./community";

const IndividualPost = () => {
  const { postId, userId } = useParams();
  const { user } = useContext(authContext);
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [text, setText] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);

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

  const handleEditPost = () => {
    setEditTitle(post.Title);
    setEditContent(post.text);
    setShowEditForm(true);
  };

  const handleDeletePost = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/posts/${userId}/${postId}`);
      console.log(response.data); // This will log the successful deletion message
      setAlertMessage("Post deleted successfully!");
     
      window.location.href = `/cards/${userId}`; 
    } catch (error) {
      console.error("Error deleting post:", error);
      setAlertMessage("Failed to delete post.");
    }
  };
  

  const handleEditSubmit = async () => {
    try {
      console.log(`Sending Title: ${editTitle} and text: ${editContent}`);
      const response = await axios.put(`http://localhost:4000/posts/${userId}/${postId}`, {
        Title: editTitle,
        text: editContent
      });
      console.log(response.data); // Add this line for debugging
      setPost(response.data);
      setShowEditForm(false);
      setAlertMessage("Post updated successfully!");
    } catch (error) {
      setAlertMessage("Failed to update post.");
      console.error("Error updating post:", error);
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
            {alertMessage && (
              <div className={`alert ${alertMessage.includes("successfully") ? "alert-success" : "alert-danger"}`} role="alert">
                {alertMessage}
              </div>
            )}
            <div key={post._id} className="card rounded-4 mb-3" style={{
              backgroundColor: '#e0f7ff',
              border: '1px solid #1e90ff',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}>
              <div className="card-header d-flex justify-content-between align-items-center" style={{
                backgroundColor: '#035b69',
                color: '#e6e6e4',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px'
              }}>
                <div>
                <Link to={`/group/${userId}/${post.group}`} style={{ color: '#FFFFFF', textDecoration: 'none' }}>
                    <p className="card-subtitle" style={{ color: "#8ee5ee", fontSize: "large", fontFamily: "'Roboto', sans-serif" }}>
                      {"r/" + post.group}
                    </p>
                  </Link>
                  <p className="card-subtitle" style={{ fontSize: "medium" }}>{"u/" + post.username}</p>
                  <h5 className="card-title" style={{ fontSize: "x-large", fontStyle: "italic", fontFamily: "'Lobster', cursive" }}>{post.Title}</h5>
                </div>
                {user && user.username === post.username && (
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic">
                      <i className="bi bi-three-dots"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleEditPost}>Edit Post</Dropdown.Item>
                      <Dropdown.Item onClick={handleDeletePost}>Delete Post</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                )}
              </div>
              <div className="tags">
                <span className={`badge ${ss.customBadge} ms-1`}>{post.tags}</span>
              </div>
              <div className="card-body">
                {showEditForm ? (
                  <div>
                    <div className="mb-3">
                      <label htmlFor="editTitle" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="editTitle"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editContent" className="form-label">Content</label>
                      <textarea
                        className="form-control"
                        id="editContent"
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-between">
                      <button onClick={() => setShowEditForm(false)} className="btn btn-primary me-2" style={{backgroundColor: 'gray'}}>Cancel</button>
                      <button onClick={handleEditSubmit} className="btn btn-primary">Save</button>
                    </div>
                  </div>
                ) : (
                  <>
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
                  </>
                )}
              </div>
            </div>
            <div className="col-lg-3">
            <CommunitySidebar id={userId} />
          </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndividualPost;
