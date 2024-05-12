import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import '../hover.css'; 



export const Card = () => {

  const { userId } = useParams();

  const cardcolor = {backgroundColor: "#EEF7FF"}
  const tagcolor = {backgroundColor: "#547aeb"}

  const text_decor = {textDecoration: "none"}








  const [posts, setPosts] = useState([]);
  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/cards/${userId}`);
        setPosts(response.data);
        console.log(posts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);


return (
<div className="w-75 container d-flex justify-content-center mt-5">
  <div className="row"> {/* Using Bootstrap's row class */}
    <div className="col"> {/* Using Bootstrap's column class */}
      <div className="">
        {posts.map(post => (
          <Link to={`/post/${post._id}`} style = {text_decor}>
          <div key={post._id} className="card rounded-4 mb-3" style={cardcolor}>
            <div className="card-header">
              <p className="card-subtitle text-muted">{post.username}</p>
              <h5 className="card-title">{post.Title}</h5>
            </div>
            {post.tags && (
              <div className="tags">
                {JSON.parse(post.tags).map((tag, index) => (
                  <span key={index} className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="card-body">
              <p className="card-text">{post.text}</p>
              <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
             {post.num_comments} comments {/* Add your logo here */}
              </span>




              
              {/* {post.images && <img src={post.images} className="card-img-top" alt="Post Image" />} */}
              {/* <Link to={`/post/${post._id}`} className="btn btn-primary mt-2">View Post</Link> */}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
</div>


  );
};

 export default Card;
