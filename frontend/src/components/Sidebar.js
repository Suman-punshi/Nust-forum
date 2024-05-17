// Sidebar Component
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
    <div className="sidebar-container">
      <div className="sidebar" style={{ backgroundColor: '#4D869C', padding: '20px', position: 'fixed', left: '0', top: '0', bottom: '0', overflowY: 'auto', width: '250px' }}>
        <h3 style={{ color: '#fff' }}>Tags</h3>
        <ul className="list-group" style={{ listStyle: 'none', padding: '0' }}>
          {tags.map((tag) => (
            <Link to={`/tag/${props.id}/${tag.text}`} key={tag._id} style={{ textDecoration: 'none', color: '#fff' }}>
              <li className="list-group-item tag-item" style={{ marginBottom: '5px', borderRadius: '5px', backgroundColor: 'transparent', transition: 'background-color 0.3s' }}>{tag.text}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="lines">
        <div className="horizontal-line"></div>
        <div className="vertical-line"></div>
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

