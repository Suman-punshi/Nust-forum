import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./style.css"; // Importing style.css from the src folder

const Sidebar = (props) => {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/tags`);
        setTags(response.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  return (
    <div className="sidebar-container" style={{ marginTop: "80px" }}>
  <div
    className="sidebar"
    style={{
      backgroundColor: "white", // White background for the sidebar
      padding: "20px",
      position: "fixed",
      left: "0",
      top: "0",
      bottom: "0",
      overflowY: "auto",
      width: "280px",
      marginTop: "50px",
      textAlign: "center",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)", // Stronger shadow effect
      border: "2px solid #1a1a2e", // Dark blue border
      transition: "box-shadow 0.3s ease-in-out", // Smooth transition for shadow
    }}
  >
    <h3 style={{ color: "#1a1a2e", margin: "10px 0" }}>Tags</h3> {/* Dark blue text color */}
    <ul className="list-group" style={{ listStyle: "none", padding: "0" }}>
      {tags.map((tag) => (
        <Link
          to={`/tag/${props.id}/${tag.text}`}
          key={tag._id}
          style={{ textDecoration: "none" }}
        >
          <li
            className="list-group-item tag-item"
            style={{
              marginBottom: "10px",
              borderRadius: "10px",
              background: "linear-gradient(to bottom, #1a1a2e, #16213e)", // Dark blue gradient background
              color: "#fff", // White text color
              padding: "10px",
              transition: "all 0.3s ease-in-out",
              cursor: "pointer",
              textAlign: "center",
            }}
            onMouseOver={({ target }) => {
              target.style.background = "linear-gradient(to bottom, #16213e, #1a1a2e)"; // Slightly different gradient on hover
              target.style.transform = "scale(1.05)"; // Grow in size on hover
              target.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.3)"; // Larger shadow on hover
            }}
            onMouseOut={({ target }) => {
              target.style.background = "linear-gradient(to bottom, #1a1a2e, #16213e)"; // Return to normal gradient
              target.style.transform = "scale(1)"; // Return to normal size
              target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)"; // Return to normal shadow
            }}
          >
            {tag.text}
          </li>
        </Link>
      ))}
    </ul>
  </div>
</div>

  );
};

export default Sidebar;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from "react-router-dom";

// const Sidebar = (props) => {
//   const [tags, setTags] = useState([]);

//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/tagS`);
//         setTags(response.data);
//       } catch (error) {
//         console.error('Error fetching tags:', error);
//       }
//     };
//     fetchTags();
//   }, []);

//   return (
//     <div className="sidebar col-4 p-3 rounded-4 mt-5 mb-3 ml-3" style={{ backgroundColor: "#CDE8E5", height: "100vh" }}>
//       {tags.map((tag) => (
//         <Link to={`/tag/${props.id}/${tag.text}`} key={tag._id}>
//           <li className="list-group-item">{tag.text}</li>
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;

