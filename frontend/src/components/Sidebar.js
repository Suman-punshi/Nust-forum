import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

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

  const handleTagClick = async (tag) => {
    try {
      const response = await axios.get(`http://localhost:4000/tags/${tag}`);
      // Handle the fetched posts (display or store in state)
    } catch (error) {
      console.error('Error fetching posts by tag:', error);
    }
  };

  return (
    <div className="sidebar" style={{ width: '100px' }}>
      <h3>Tags</h3>
      <ul className="list-group">
        {tags.map((tag) => (
           <Link to={`/tags/${props.id}/${tag.text}`}>
          <li key={tag._id} className="list-group-item">
            {/* <button className="btn btn-link" onClick={() => handleTagClick(tag.text)}> */}
              {tag.text}
            {/* </button> */}
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
