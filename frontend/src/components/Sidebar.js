import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Sidebar = () => {
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
        {tags.map((tag, index) => (
          <li key={index} className="list-group-item">
            <button className="btn btn-link" onClick={() => handleTagClick(tag)}>
              {tag}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
