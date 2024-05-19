import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout"; // Import the layout component
import "../hover.css";
import ss from '../components/modules/indiv_posts.module.css'; // Import custom styles

const IndividualPost = () => {
  const { postId, userId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

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
      let response;
      if (editingCommentId) {
        response = await axios.put(
          `http://localhost:4000/api/comment/${postId}/${editingCommentId}`,
          { text }
        );
        setComments(comments.map((com) => (com._id === editingCommentId ? response.data : com)));
      } else {
        response = await axios.post(
          `http://localhost:4000/comment/${userId}/${postId}`,
          { text }
        );
        setComments([...comments, response.data]);
      }
      setText("");
      setShowCommentForm(false);
      setEditingCommentId(null);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleEditComment = (comment) => {
    setText(comment.text);
    setEditingCommentId(comment._id);
    setShowCommentForm(true);
  };

  const deleteComment = async (id) => {
    try {
      const res2 = await fetch(`/api/deleteComment/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res2.status === 200 || res2.status === 201) {
        setComments(comments.filter(comment => comment._id !== id));
        console.log("Comment deleted");
      } else {
        console.log("Error deleting comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
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
              backgroundColor: '#e0f7ff', // Light blue background
              border: '1px solid #1e90ff', // Dodger blue border
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              transition: 'transform 0.2s, background-color 0.2s'
            }}>
              <div className="card-header" style={{
                backgroundColor: '#035b69',
                color: '#e6e6e4',
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px'
              }}>
                <p className="card-subtitle" style={{ fontSize: "medium" }}>{"u/" + post.username}</p>
                <h5 className="card-title" style={{ fontSize: "x-large", fontStyle: "italic", fontFamily: "'Lobster', cursive" }}>{post.Title}</h5>
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
                      <span className="d-flex justify-content-end" style={{ gap: "5px" }}>
                        <button className="btn btn-success" onClick={() => handleEditComment(com)} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="fa-solid fa-pen" style={{ fontSize: "16px" }}></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteComment(com._id)} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="fa-solid fa-trash" style={{ fontSize: "16px" }}></i>
                        </button>
                      </span>
                    </div>
                  ))}
                  {/* {comments.map((com) => (
                    <div key={com._id} className="card mb-2 p-3" style={cardcolor}>
                      <a style={{ display: "inline-block", color: "#4D869C" }}>{com.username}</a>
                      <p className="card-subtitle text-muted text-primary">{com.text}</p>
                      <span className="d-flex justify-content-end" style={{ gap: "5px" }}>
                        <button className="btn btn-success" onClick={() => handleEditComment(com)} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="fa-solid fa-pen" style={{ fontSize: "16px" }}></i>
                        </button>
                        <button className="btn btn-danger" onClick={() => deleteComment(com._id)} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <i className="fa-solid fa-trash" style={{ fontSize: "16px" }}></i>
                        </button>
                      </span>
                    </div>
                  ))} */}

                </div>
                {showCommentForm && (
                    <div>
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="form-control mb-2"
                        placeholder="Write your comment..."
                      ></textarea>
                      <button onClick={handleNewCommentSubmit} className="btn btn-primary">
                        {editingCommentId ? 'Update' : 'Submit'}
                      </button>
                    </div>
                  )}
                  {!showCommentForm && (
                    <button onClick={() => setShowCommentForm(true)} className="btn btn-primary mt-2">
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
