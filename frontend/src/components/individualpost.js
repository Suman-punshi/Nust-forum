// import { NavLink } from 'react-router-dom';
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "../hover.css";
// import Layout from "./Layout"; // Import the layout component

// const IndividualPost = () => {
//   const cardcolor = { backgroundColor: "#EEF7FF" };

//   const { postId, userId } = useParams();
//   const [post, setPost] = useState(null);
//   const [comments, setComments] = useState([]);
//   const [showCommentForm, setShowCommentForm] = useState(false);
//   const [text, setText] = useState("");
//   const [editingCommentId, setEditingCommentId] = useState(null);
  

//   useEffect(() => {
//     // Fetch post data using postId
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/post/${userId}/${postId}`
//         );
//         setPost(response.data.project);
//         setComments(response.data.comments);
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       }
//     };

//     fetchPost();
//   }, [postId, userId]);

//   const handleNewCommentSubmit = async () => {
//     try {
//       let response;
//       if (editingCommentId) {
//         response = await axios.put(
//           `http://localhost:4000/comment/${userId}/${postId}/${editingCommentId}`,
//           { text }
//         );
//         setComments(comments.map((com) => (com._id === editingCommentId ? response.data : com)));
//       } else {
//       const response = await axios.post(
//         `http://localhost:4000/comment/${userId}/${postId}`,
//         {
//           text: text
//         }
//       );
//       // Assuming the server responds with the newly created comment
//       setComments([...comments, response.data]);
//     }
//       setText("");
//       setShowCommentForm(false);
//       setEditingCommentId(null);
//     } catch (error) {
//       console.error("Error submitting comment:", error);
//     }
//   };

//   const handleEditComment = (comment) => {
//     setText(comment.text);
//     setEditingCommentId(comment._id);
//     setShowCommentForm(true);
//   };
  
//   const deleteComment =async (id) => {
//     const res2 = await fetch(`/deleteComment/${id}`,{
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json"
//       }
//     });

//     const deletedata = await res2.json();
//     console.log(deletedata);

//     if(res2.status === 422 || !deletedata){
//       console.log("error");
//     }else{
//       console.log("comment deleted");
//     }
//   }

//   if (!post) {
//     return <div>Loading...</div>;
//   }


//   return (
//     <Layout>
//     <div className="w-75 container d-flex justify-content-center mt-5">
//       <div className="row">
//         <div className="col">
//           <div className="">
//             <div
//               key={post._id}
//               className="card rounded-4 mb-3"
//               style={cardcolor}
//             >
//               <div className="card-header">
//                 <p className="card-subtitle text-muted">{post.username}</p>
//                 <h5 className="card-title">{post.post_title}</h5>
//               </div>
//               <div className="tags">
//                 <span
//                   className="badge ms-1"
//                   style={{ backgroundColor: "#4D869C", color: "white" }}
//                 >
//                   {post.tag}
//                 </span>
//               </div>
//               <div className="card-body">
//                 <p className="card-text">{post.post_text}</p>
//                 {post.images && (
//                   <img src={post.images} className="card-img-top" alt="" />
//                 )}
//                 <span
//                   className="badge badge-dark ms-1"
//                   style={{ backgroundColor: "#4D869C", color: "white" }}
//                 >
//                   {post.num_comments} comments
//                 </span>
//                 <br />
//                 {comments &&
//                   comments.map((com) => (
//                     <div
//                       key={com._id}
//                       className="card mb-2 p-3"
//                       style={cardcolor}
//                     >
//                       <a
//                         className=""
//                         style={{
//                           display: "inline-block",
//                           color: "#4D869C",
//                         }}
//                       >
//                         {com.username}
//                       </a>
//                       <p className="card-subtitle text-muted text-primary">
//                         {com.text}
//                       </p>
//                       <span className="d-flex justify-content-between" style={{ width: "70px", height: "30px" }}>
//                       <button className="btn btn-success" onClick={() => handleEditComment(com)} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                       <i className="fa-solid fa-pen" style={{ fontSize: "16px" }}></i>
//                       </button>
//                       <button className="btn btn-danger" onClick={() => deleteComment(com._id)} style={{ width: "30px", height: "30px", display: "flex", alignItems: "center", justifyContent: "center" }}>
//                       <i className="fa-solid fa-trash" style={{ fontSize: "16px" }}></i>
//                       </button></span>
//                     </div>
//                   ))}
//                 {showCommentForm ? (
//                   <div>
//                     <textarea
//                       value={text}
//                       onChange={(e) => setText(e.target.value)}
//                       className="form-control mb-2"
//                       placeholder="Write your comment..."
//                     ></textarea>
//                     <button
//                       onClick={handleNewCommentSubmit}
//                       className="btn btn-primary"
//                     >
//                       {editingCommentId ? 'Update' : 'Submit'}
//                     </button>
//                   </div>
//                 ) : (
//                   <button
//                     onClick={() => setShowCommentForm(true)}
//                     className="btn btn-primary mt-2"
//                   >
//                     Add New Comment
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default IndividualPost;


import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../hover.css";
import Layout from "./Layout";

const IndividualPost = () => {
  const cardcolor = { backgroundColor: "#EEF7FF" };

  const { postId, userId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [text, setText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);

  useEffect(() => {
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
    return <div>Loading...</div>;
  }

  return (
    <Layout>
      <div className="w-75 container d-flex justify-content-center mt-5">
        <div className="row">
          <div className="col">
            <div className="">
              <div key={post._id} className="card rounded-4 mb-3" style={cardcolor}>
                <div className="card-header">
                  <p className="card-subtitle text-muted">{post.username}</p>
                  <h5 className="card-title">{post.post_title}</h5>
                </div>
                <div className="tags">
                  <span className="badge ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
                    {post.tag}
                  </span>
                </div>
                <div className="card-body">
                  <p className="card-text">{post.post_text}</p>
                  {post.images && <img src={post.images} className="card-img-top" alt="" />}
                  <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
                    {post.num_comments} comments
                  </span>
                  <br />
                  {comments.map((com) => (
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
                  ))}
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
      </div>
    </Layout>
  );
};

export default IndividualPost;
