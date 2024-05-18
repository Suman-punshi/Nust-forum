import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const UserProfileComponent = () => {
    const { username } = useParams(); // Get the username from the URL
    const { user: loggedInUser } = useAuthContext(); // Get the logged-in user
    const [user, setUser] = useState(null); // State to hold the user's profile
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (username) {
            setLoading(true);
            // Fetch the user profile and posts based on the username in the URL
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
        return <div>Loading user data...</div>;
    }

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={user.avatarUrl || "default-avatar.png"} alt="user avatar" />
                <h1>{user.username}</h1>
                <p>Joined on: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="container mt-5">
                <div className="row">
                    {posts.length > 0 ? posts.map((post) => (
                        <div key={post._id} className="col-12 mb-3">
                            <div className="card rounded-4" style={{ backgroundColor: "#EEF7FF" }}>
                                <div className="card-header">
                                    <Link to={`/group/${post.group}`} style={{ textDecoration: "none" }}>
                                        <p className="card-subtitle text-success">{post.group}</p>
                                    </Link>
                                    <p className="card-subtitle text-muted">{post.username}</p>
                                    <h5 className="card-title">{post.title}</h5>
                                </div>
                                <Link to={`/tags/${post.tags}/${post.group}`} style={{ textDecoration: "none" }}>
                                    <div className="tags">
                                        <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
                                            {post.tags}
                                        </span>
                                    </div>
                                </Link>
                                <Link to={`/post/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                    <div className="card-body">
                                        <p className="card-text">{post.text}</p>
                                        <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
                                            {post.num_comments} comments
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    )) : <p>No posts found.</p>}
                </div>
            </div>
        </div>
    );
};

export default UserProfileComponent;
