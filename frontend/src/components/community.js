import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const CommunitySidebar = (props) => {
  const text_decor = { textDecoration: "none", color: '#FFFFFF' }; // Default text color
  const [communities, setCommunities] = useState([]);
  const [groups, setGroups] = useState({});
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    const fetchCommunities = async () => {
      try {
        const response = await axios.get('http://localhost:4000/communities');
        setCommunities(response.data);
      } catch (error) {
        console.error('Error fetching communities:', error);
      }
    };

    fetchCommunities();
  }, []);

  const fetchGroups = async (communityId) => {
    try {
      const response = await axios.get(`http://localhost:4000/communities/${props.id}/${communityId}`);
      setGroups((prevGroups) => ({
        ...prevGroups,
        [communityId]: response.data,
      }));
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  const handleCommunityClick = (communityId) => {
    setSelectedCommunity(communityId);
    if (!groups[communityId]) {
      fetchGroups(communityId);
    }
  };

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <div className="community-sidebar-container" style={{ marginTop: "80px" }}>
      <div className={`community-sidebar ${showSidebar ? 'show' : ''}`} style={{
        background: '#7AB2B2',
        color: '#034752',
        width: '300px',
        marginRight: '0',
        padding: '20px',
        fontSize: '1.2rem',
        fontFamily: 'Arial, sans-serif',
        position: 'fixed',
        right: '0',
        top: '50px',
        bottom: '0',
        overflowY: 'auto',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow effect
        transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for shadow
      }}>
        <h2 style={{ borderBottom: '2px solid white', paddingBottom: '10px', color: '#034752' }}>Communities</h2>
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {communities.map((community) => (
            <li key={community._id} style={{ marginBottom: '10px' }}>
              <button style={{
                backgroundColor: 'transparent',
                border: 'none',
                color: 'inherit',
                fontSize: '1.1rem',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'left'
              }} onClick={() => handleCommunityClick(community._id)}>
                {community.community_name}
              </button>
              {selectedCommunity === community._id && (
                <ul style={{ marginTop: '10px' }}>
                  {groups[community._id] ? (
                    groups[community._id].map((group) => (
                      <Link to={`/group/${props.id}/${group.name}`} style={text_decor} key={group._id}>
                        <li style={{
                          padding: '5px',
                          fontSize: '0.9rem', // Smaller font size for dropdown items
                          backgroundColor: '#034752', // Subtle background
                          borderRadius: '10px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.3s ease-in-out'
                        }}
                          onMouseOver={({ target }) => {
                            target.style.backgroundColor = '#036b79'; // Darker on hover
                            target.style.transform = 'scale(1.05)'; // Grow in size on hover
                            target.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)'; // Larger shadow on hover
                          }}
                          onMouseOut={({ target }) => {
                            target.style.backgroundColor = '#035b69'; // Return to normal
                            target.style.transform = 'scale(1)'; // Return to normal size
                            target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Return to normal shadow
                          }}
                        >
                          {group.name}
                        </li>
                      </Link>
                    ))
                  ) : (
                    <li>Loading...</li>
                  )}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <button className="community-sidebar-toggle-btn" onClick={toggleSidebar}>Toggle Community Sidebar</button>
    </div>
  );
};

export default CommunitySidebar;
