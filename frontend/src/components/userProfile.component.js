// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { useAuthContext } from '../hooks/useAuthContext';
// import { Link } from 'react-router-dom';

// const UserProfileComponent = () => {
//     const { username } = useParams(); // Get the username from the URL
//     const { user: loggedInUser } = useAuthContext(); // Get the logged-in user
//     const [user, setUser] = useState(null); // State to hold the user's profile
//     const [posts, setPosts] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (username) {
//             setLoading(true);
//             // Fetch the user profile and posts based on the username in the URL
//             axios.get(`http://localhost:4000/users/${username}`)
//                 .then(response => {
//                     setUser(response.data.user);
//                     setPosts(response.data.posts);
//                     setLoading(false);
//                 })
//                 .catch(error => {
//                     console.error('Error fetching user profile and posts:', error);
//                     setLoading(false);
//                 });
//         }
//     }, [username]);

//     if (loading) {
//         return <div>Loading user data...</div>;
//     }

//     if (!user) {
//         return <div>User not found</div>;
//     }

//     return (
//         <div className="profile-container">
//             <div className="profile-header">
//                 <img src={user.avatarUrl || "default-avatar.png"} alt="user avatar" />
//                 <h1>{user.username}</h1>
//                 <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
//             </div>
//             <div className="container mt-5">
//                 <div className="row">
//                     {posts.length > 0 ? posts.map((post) => (
//                         <div key={post._id} className="col-12 mb-3">
//                             <div className="card rounded-4" style={{ backgroundColor: "#EEF7FF" }}>
//                                 <div className="card-header">
//                                     <Link to={`/group/${post.group}`} style={{ textDecoration: "none" }}>
//                                         <p className="card-subtitle text-success">{post.group}</p>
//                                     </Link>
//                                     <p className="card-subtitle text-muted">{post.username}</p>
//                                     <h5 className="card-title">{post.title}</h5>
//                                 </div>
//                                 <Link to={`/tags/${post.tags}/${post.group}`} style={{ textDecoration: "none" }}>
//                                     <div className="tags">
//                                         <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
//                                             {post.tags}
//                                         </span>
//                                     </div>
//                                 </Link>
//                                 <Link to={`/post/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
//                                     <div className="card-body">
//                                         <p className="card-text">{post.text}</p>
//                                         <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
//                                             {post.num_comments} comments
//                                         </span>
//                                     </div>
//                                 </Link>
//                             </div>
//                         </div>
//                     )) : <p>No posts found.</p>}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default UserProfileComponent;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserProfileComponent = () => {
    const cardcolor = { backgroundColor: "#8aa7bfF" };
    const { username } = useParams();
    const { user: loggedInUser } = useAuthContext();
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            setLoading(true);
            axios.get(`http://localhost:4000/users/${username}`)
                .then(response => {
                    setUser(response.data.user);
                    setPosts(response.data.posts);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching user profile and posts:', error);
                    setLoading(false);
                });
        }
    }, [username]);

    if (loading) {
        return <div className="text-center my-5">Loading user data...</div>;
    }

    if (!user) {
        return <div className="text-center my-5">User not found</div>;
    }

    return (
        <div className="container mt-5">
  <div className="overflow-hidden ml-0 w-25 h-100">
    <div className="profile-header rounded mb-4 mt-3 w-25 h-100 text-center overflow-hidden" style={{ backgroundColor: "#16213e", color: "#FFFFFF", position: 'fixed', padding: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)' }}>
      <img src={user.avatarUrl || "/default-avatar.png"} alt="user avatar" className="rounded-circle mb-3" width="150" height="150" style={{ border: '4px solid #1a1a2e' }} />
      <h1 className="display-4" ><b>{user.username}</b></h1>
      <p className="text-muted">Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
    </div>
  </div>
  <div className="row w-50 ml-3" style={{ marginLeft: '300px' }}>
    {posts.length > 0 ? posts.map((post) => (
      <div key={post._id} className="col-12 mb-3 mt-3 ml-5">
        <div className="card shadow-sm" style={{ backgroundColor: "#FFFFFF", color: "#000000", borderRadius: '16px' }}>
          <div className="card-header" style={{ background: 'linear-gradient(to bottom, #1a1a2e, #16213e)', borderTopLeftRadius: '16px', borderTopRightRadius: '16px', padding: '10px', color: '#FFFFFF' }}>
            <div className="d-flex justify-content-between align-items-center">
              <Link to={`/group/${user._id}/${post.group}`} className="text-decoration-none" style={{ color: '#8ee5ee' }}>
                <span className="badge" style={{ backgroundColor: '#1e90ff', color: '#FFFFFF' }}>{post.group}</span>
              </Link>
              <span className="text-muted" style={{ color: '#8ee5ee' }}>{post.username}</span>
            </div>
            <h5 className="mt-2 mb-0" style={{ color: '#FFFFFF' }}>{post.title}</h5>
          </div>
          <Link to={`/post/${user._id}/${post._id}`} className="stretched-link">
          <div className="card-body" style={{ backgroundColor: '#e0f7ff', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', padding: '20px' }}>
            <Link to={`/tags/${post.tags}/${post.group}`} className="text-decoration-none">
              <span className="badge bg-dark me-1" style={{ backgroundColor: '#1e90ff', color: '#FFFFFF' }}>{post.tags}</span>
            </Link>
            <p className="card-text mt-2 text-decoration-none" style={{ color: '#000000' }}>{post.text}</p>
      
          </div>
          </Link>
          <div className="card-footer" style={{ backgroundColor: '#16213e', borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px', padding: '10px' }}>
          {post.images && <img src={`http://localhost:4000${post.images}`} className="card-img-top" alt="Post image" />}
            <span className="badge bg-primary" style={{ backgroundColor: '#1e90ff', color: '#FFFFFF' }}>{post.num_comments} comments</span>
          </div>
        </div>
      </div>
    )) : <p className="text-center" style={{ color: '#FFFFFF' }}>No posts found.</p>}
  </div>
</div>

    );
};

export default UserProfileComponent;
