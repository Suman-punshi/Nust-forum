import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import "../hover.css";
import Sidebar from "./Sidebar";
import CommunitySidebar from "./community";
import { authContext } from "../context/AuthContext";

export const Card = () => {
  const { userId } = useParams();
  const { user } = useContext(authContext); // Get the logged-in user's information


  const cardcolor = { 
    backgroundColor: '#e0f7ff', // Light blue background
    border: '1px solid #1e90ff', // Dodger blue border
    borderRadius: '16px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.2s, background-color 0.2s'
  };

  const text_decor = { textDecoration: "none" };

  const [posts, setPosts] = useState([]);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cards/${userId}`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [userId]);

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, []);

  return (
    <div className="container-fluid" style={{ marginTop: "80px" }}>
      <div className="row">
        <div className="col-lg-3">
          <Sidebar id={userId} /> {/* Assume Sidebar contains tag elements */}
        </div>
        <div className="col-lg-6">
          <div className="container mt-5">
            <div className="row">
              <div className="col-12 mb-3">
                <h3 style={{ fontFamily: "'Lobster', cursive", fontStyle: "italic", color: "#035b69" }}>
                {greeting}, {user ? user.username : 'User'}!
                </h3>
              </div>
              {posts.map((post) => (
                <div key={post._id} className="col-12 mb-3">
                  <div className="card rounded-4" style={cardcolor}>
                    <div className="card-header" style={{
                      backgroundColor: '#CDE8E5',
                      borderTopLeftRadius: '16px',
                      borderTopRightRadius: '16px',
                      color: '#1e90ff',
                      fontWeight: 'bold'
                    }}>
                      <Link to={`/group/${userId}/${post.group}`} style={text_decor}>
                        <p className="card-subtitle" style={{ color: "#112D4E", fontSize: "large", fontFamily: "'Roboto', sans-serif" }}>
                          {"r/" + post.group}
                        </p>
                      </Link>
                      <p className="card-subtitle" style={{ color: "#112D4E", fontSize: "small", fontFamily: "'Roboto', sans-serif" }}>
                        {"u/" + post.username}
                      </p>
                      <h5 className="card-title" style={{ color: "#112D4E", fontSize: "x-large", fontStyle: "italic", fontFamily: "'Lobster', cursive" }}>
                        {post.Title}
                      </h5>
                    </div>

                    <Link to={`/tags/${userId}/${post.tags}/${post.group}`} style={text_decor}>
                      <div className="tags">
                        <span className="badge badge-dark ms-1" style={{
                          background: 'linear-gradient(45deg, #1e90ff, #00bfff)',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '5px 15px'
                        }}>
                          {post.tags}
                        </span>
                      </div>
                    </Link>
                    <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                      <div className="card-body" style={{ backgroundColor: '#e0f7ff', borderRadius: '0 0 16px 16px' }}>
                        <span>
                          <p className="card-text">{post.text}</p>
                        </span>
                        {post.images && <img src={`http://localhost:4000${post.images}`} className="card-img-top" alt="Post image" />}
                        <span className="badge badge-dark ms-1" style={{
                          background: 'linear-gradient(45deg, #1e90ff, #00bfff)',
                          color: 'white',
                          borderRadius: '12px',
                          padding: '5px 15px'
                        }}>
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
        <div className="col-lg-3">
          <CommunitySidebar id={userId} className="community-sidebar" /> {/* Assume CommunitySidebar contains tag elements */}
        </div>
      </div>
    </div>
  );
};

export default Card;



// const handleJoinClick = async () => {
//   try {
//     const response = await axios.post(
//       `http://localhost:4000/comment/${userId}/${postId}`,
//       {
//         comment_text: comment_text,
//       }
//     );
//     // Assuming the server responds with the newly created comment
//     setComments([...comments, response.data]);
//     setcomment_text("");
//     setShowCommentForm(false);
//   } catch (error) {
//     console.error("Error submitting comment:", error);
//   }
// };

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import "../hover.css";
// import "./style.css"; // Importing style.css from the src folder
// import Sidebar from "./Sidebar";
// import Sidebar2 from "./community";

// import Layout from "./Layout"; // Import the layout component
// export const Card = () => {
//   const { userId } = useParams();

//   const cardcolor = { backgroundColor: "#EEF7FF" };

//   const text_decor = { textDecoration: "none" };

//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/cards/${userId}`
//         );
//         // Initialize joined status for each post
//         const postsWithJoinStatus = response.data.map((post) => ({
//           ...post,
//           joined: false,
//         }));
//         setPosts(postsWithJoinStatus);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);
//   const handleJoinClick = async (groupsjoined) => {
//     try{
//       const response = await axios.post(
//         `http://localhost:4000/joined/${userId}/${groupsjoined}`,
//         {
//           groupsjoind: groupsjoined
//         }
//       );
//     }
//     catch (error) {
//       console.error("cannot join group:", error);
//     }
    
//   };

//   return (
//     <Layout>
//     <div className="container mt-5">
//       <div className="row">
//         {/* Left Sidebar */}
//         <div className="col-lg-2">
         
//         </div>
//         {/* Main Content */}
//         <div className="col-lg-7">
//           {posts.map((post) => (
//             <div key={post._id} className="col-12 mb-3">
//               <div className="card rounded-4" style={cardcolor}>
//                 <div className="card-header">
//                   <Link to={`/group/${userId}/${post.group}`} style={text_decor}>
//                     <p className="card-subtitle text-success">{post.group}</p>
//                   </Link>
//                   <p className="card-subtitle text-muted">{post.username}</p>
//                   <h5 className="card-title">{post.Title}</h5>
//                 </div>
//                 <Link to={`/tags/${userId}/${post.tags}/${post.group}`} style={text_decor}>
//                   <div className="tags">
//                     <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
//                       {post.tags}
//                     </span>
//                   </div>
//                 </Link>
//                 <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
//                   <div className="card-body">
//                     <span>
//                       <p className="card-text">{post.text}</p>
//                     </span>
//                     <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
//                       {post.num_comments} comments
//                     </span>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//         {/* Right Sidebar */}
//         <div className="col-lg-3">
//           <Sidebar id={userId} />
//         </div>
//       </div>
//     </div>
//     </Layout>
//   );
// };

// export default Card;







// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { Link } from "react-router-dom";
// // import { useParams } from "react-router-dom";
// // import "../hover.css";
// // import Sidebar from "./Sidebar";

// // export const Card = () => {
// //   const { userId } = useParams();

// //   const cardcolor = { backgroundColor: "#EEF7FF" };
// //   const tagcolor = { backgroundColor: "#547aeb" };

// //   const text_decor = { textDecoration: "none" };

// //   const [posts, setPosts] = useState([]);
// //   const [sidebarVisible, setSidebarVisible] = useState(true);

// //   useEffect(() => {
// //     const fetchPosts = async () => {
// //       try {
// //         const response = await axios.get(
// //           `http://localhost:4000/cards/${userId}`
// //         );
// //         setPosts(response.data);
// //       } catch (error) {
// //         console.error("Error fetching posts:", error);
// //       }
// //     };

// //     fetchPosts();
// //   }, []);

// //   const toggleSidebar = () => {
// //     setSidebarVisible(sidebarVisible);
// //   };

// //   return (
// //     <div className="container-fluid">
// //       <div className="row">
// //         {/* Sidebar */}
// //         {sidebarVisible && (
// //           <div className="col-lg-3 d-none d-lg-block">
// //             <Sidebar id={userId} />
// //           </div>
// //         )}

// //         {/* Main Content */}
// //         <div className={`col ${sidebarVisible ? "col-lg-9" : "col-lg-12"}`}>
// //           <nav className="navbar navbar-expand-lg navbar-light bg-light">
// //             <div className="container-fluid">
// //               <button
// //                 className="navbar-toggler"
// //                 type="button"
// //                 onClick={toggleSidebar}
// //               >
// //                 <span className="navbar-toggler-icon"></span>
// //               </button>
// //               <Link className="navbar-brand" to="#">
// //                 Your App Name
// //               </Link>
// //             </div>
// //           </nav>
// //           <div className="container mt-5">
// //             <div className="row">
// //               {posts.map((post) => (
// //                 <div key={post._id} className="col-12 mb-3">
// //                   <div className="card rounded-4" style={cardcolor}>
// //                     <div className="card-header">
// //                       <Link
// //                         to={`/group/${userId}/${post.group}`}
// //                         style={text_decor}
// //                       >
// //                         <p className="card-subtitle text-success">
// //                           {post.group}
// //                         </p>
// //                       </Link>
// //                       <p className="card-subtitle text-muted">
// //                         {post.username}
// //                       </p>
// //                       <h5 className="card-title">{post.Title}</h5>
// //                     </div>
// //                     <Link
// //                       to={`/tags/${userId}/${post.tags}/${post.group}`}
// //                       style={text_decor}
// //                     >
// //                       <div className="tags">
// //                         <span
// //                           className="badge badge-dark ms-1"
// //                           style={{
// //                             backgroundColor: "#4D869C",
// //                             color: "white",
// //                           }}
// //                         >
// //                           {post.tags}
// //                         </span>
// //                       </div>
// //                     </Link>
// //                     <Link
// //                       to={`/post/${userId}/${post._id}`}
// //                       style={{ color: "inherit", textDecoration: "none" }}
// //                     >
// //                       <div className="card-body">
// //                         <span>
// //                           <p className="card-text">{post.text}</p>
// //                         </span>
// //                         <span
// //                           className="badge badge-dark ms-1"
// //                           style={{
// //                             backgroundColor: "#4D869C",
// //                             color: "white",
// //                           }}
// //                         >
// //                           {post.num_comments} comments
// //                         </span>
// //                       </div>
// //                     </Link>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Card;
