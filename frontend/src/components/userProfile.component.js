import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

const UserProfileComponent = () => {
    const { user } = useAuthContext();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        if (user && user.username) { 
            axios.get(`http://localhost:4000/posts/user/${user.username}`)
                .then(response => {
                    setPosts(response.data);
                })
                .catch(error => {
                    console.error('Error fetching posts:', error);
                });
        }
    }, [user]); // Re-fetch when user changes

    if (!user) {
        return <div>Loading user data...</div>;
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
                    {posts.map((post) => (
                        <div key={post._id} className="col-12 mb-3">
                            <div className="card rounded-4" style={{ backgroundColor: "#EEF7FF" }}>
                                <div className="card-header">
                                    <Link to={`/group/${user.username}/${post.group}`} style={{ textDecoration: "none" }}>
                                        <p className="card-subtitle text-success">{post.group}</p>
                                    </Link>
                                    <p className="card-subtitle text-muted">{post.username}</p>
                                    <h5 className="card-title">{post.title}</h5>
                                </div>
                                <Link to={`/tags/${user.username}/${post.tags}/${post.group}`} style={{ textDecoration: "none" }}>
                                    <div className="tags">
                                        <span className="badge badge-dark ms-1" style={{ backgroundColor: "#4D869C", color: "white" }}>
                                            {post.tags}
                                        </span>
                                    </div>
                                </Link>
                                <Link to={`/post/${user.username}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
                                    <div className="card-body">
                                        <p className="card-text">{post.text}</p>
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
    );
};

export default UserProfileComponent;
