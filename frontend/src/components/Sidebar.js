// Sidebar Component
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

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
    <div className="sidebar col-2 p-5 rounded-4 mt-5 ml-3" style={{ backgroundColor: "#CDE8E5", height: "87vh", position: "fixed", overflowY: "auto" }}>
        {tags.map((tag) => (
          <Link to={`/tag/${props.id}/${tag.text}`} key={tag._id}>
            <li className="list-group-item">{tag.text}</li>
          </Link>
        ))}
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

