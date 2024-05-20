import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../hover.css";
import Layout from "./Layout"; // Import the layout component
import Sidebar from "./Sidebar";
import CommunitySidebar from "./community";

export const GroupPosts = () => {
  const { group } = useParams();
  const { userId } = useParams();
  const cardcolor = { backgroundColor: "#EEF7FF" };
  const [groupPosts, setGroupPosts] = useState([]);
  const [isMember, setIsMember] = useState(false);


  useEffect(() => {
    const fetchGroupPosts = async () => {
      try {
        console.log(
          `In groupss.js, Sending get request with userId: ${userId} and group: ${group}`
        );
        const response = await axios.get(
          `http://localhost:4000/group/${userId}/${group}`
        );
        setGroupPosts(response.data);
      } catch (error) {
        console.error("Error fetching group posts:", error);
      }
    };
    const checkMembership = async () => {
      try {
          const response = await axios.get(`http://localhost:4000/join-group/check-membership/${userId}/${group}`);
          setIsMember(response.data.isMember);
      } catch (error) {
          console.error("Error checking group membership:", error);
      }
  };
    fetchGroupPosts();
    checkMembership();

  }, [group, userId]);

  const handleJoinGroup = async () => {
    try {
      await axios.post(`http://localhost:4000/join-group`, { userId, group });
      alert("Successfully joined the group!");
    } catch (error) {
      console.error("Error joining group:", error);
      alert("Failed to join the group.");
    }
  };

  return (
    <Layout>
      <div className="d-flex justify-content-left mt-5" style = {{overflowX : 'hidden', left : '0'}}>
        <div className="row" style = {{overflowX : 'hidden'}}>
          <div className="mt-4 w-75 d-flex justify-content-center" style = {{overflowX : 'hidden'}}>
            <Link to={`/create/${userId}/${group}`} className="btn btn-success col" style={{marginBottom: '20px'}}>
              New Post
            </Link>
            {
    !isMember && (
        <button onClick={handleJoinGroup} className="btn btn-primary col" style={{marginLeft: "10px", marginBottom: '20px'}}>
            Join
        </button>
    )
}

          </div>
          <div className="col">
            <Sidebar id={userId} />
          </div>
          <div className="col-12 overflow-hidden" style = {{overflowX : 'hidden'}}>
            {groupPosts.map((post) => (
              <div
                key={post._id}
                className="card w-100 rounded-4 mb-3"
                style={cardcolor}
              >
                <div className="card-header">
                  <Link to={`/profile/${post.username}`}><p className="card-subtitle text-muted">{post.username}</p></Link>
                  
                  <h5 className="card-title">{post.Title}</h5>

                  <Link to={`/tags/${userId}/${post.tags}/${group}`} style={{ color: "inherit", textDecoration: "none" }}>
                  <div className="tags">
                    <span className="badge badge-dark ms-1" style={{ background: 'linear-gradient(45deg, #1e90ff, #00bfff)', color: 'white', borderRadius: '12px', padding: '5px 15px' }}>
                      {post.tags}
                    </span>
                  </div>
                </Link>
                </div>
                <Link to={`/post/${userId}/${post._id}`} style={{ color: "inherit", textDecoration: "none" }}>
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
                </div>
                </Link>
              </div>
            ))}
          </div>
          <div className="col-lg-3">
            <CommunitySidebar id={userId} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GroupPosts;
