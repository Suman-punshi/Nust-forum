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
              <div key={post._id} className="card rounded-4 mb-3" style={cardcolor}>
                <div className="card-header">
                  <Link to={`/group/${post.group}`} style={text_decor}>
                    <p className="card-subtitle text-success">{post.group}</p>
                  </Link>
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
                <Link to={`/post/${post._id}`} style={{color: 'inherit', textDecoration: "none"}}>
                  <div className="card-body">
                  <span >
                    <p className="card-text">{post.text}</p>
                  </span>
                    <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                      {post.num_comments} comments {/* Add your logo here */}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    );
};

 export default Card;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
// import '../hover.css';

// const Card = () => {
//   const { userId } = useParams();
//   const cardcolor = { backgroundColor: "#EEF7FF" };
//   const text_decor = { textDecoration: "none" };
//   const navigate = useNavigate(); // Initialize navigate
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/cards/${userId}`);
//         setPosts(response.data);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };
//     fetchPosts();
//   }, [userId]); // Include userId in the dependency array

//   const handleClick = async (group) => {
//     try {
//       const response = await axios.get(`http://localhost:5000/cards/group/${group}`);
//       setPosts(response.data);
//       navigate(/group/${group}); // Use navigate for navigation
//     } catch (error) {
//       console.error('Error fetching group posts:', error);
//       // Handle error, for example, by showing an error message to the user
//     }
//   };

//   return (
//     <div className="w-75 container d-flex justify-content-center mt-5">
//       <div className="row">
//         <div className="col">
//           <div className="">
//             {posts.map(post => (
//               <div key={post._id}>
//                 <div onClick={() => handleClick(post.group)} className="card rounded-4 mb-3" style={cardcolor}>
//                   <div className="card-header">
//                     <p className="card-subtitle text-muted">{post.username}</p>
//                     <h5 className="card-title">{post.Title}</h5>
//                   </div>
//                   <div className="card-body">
//                     <p className="card-text">{post.text}</p>
//                     <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
//                       {post.num_comments} comments
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;
