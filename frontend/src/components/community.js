import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const CommunitySidebar = (props) => {
  const text_decor = { textDecoration: "none", color: '#FFFFFF' }; // Default text color
  const [communities, setCommunities] = useState([]);
  const [groups, setGroups] = useState({});
  const [selectedCommunity, setSelectedCommunity] = useState(null);

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

  return (
    <div className="community-sidebar" style={{
      background: 'linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)',
      color: '#FFFFFF',
      width: '300px',
      marginRight: '20px',
      padding: '20px',
      fontSize: '1.2rem',
      fontFamily: 'Arial, sans-serif',
      position: 'fixed',
      right: '0',
      top: '80px',
      bottom: '0',
      overflowY: 'auto',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow effect
      transition: 'box-shadow 0.3s ease-in-out' // Smooth transition for shadow
    }}>
      <h2 style={{ borderBottom: '2px solid white', paddingBottom: '10px', color: 'white' }}>Communities</h2>
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
                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Subtle background
                        transition: 'background-color 0.2s, color 0.2s, box-shadow 0.2s ease-in-out',
                        cursor: 'pointer',
                      }}
                      onMouseOver={({ target }) => {
                        target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)'; // More visible background on hover
                        target.style.color = 'black'; // Change font color to black on hover
                        target.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'; // Add shadow on hover
                      }}
                      onMouseOut={({ target }) => {
                        target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'; // Return to normal background
                        target.style.color = 'white'; // Return to normal text color
                        target.style.boxShadow = 'none'; // Remove shadow on hover out
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
  );
};

export default CommunitySidebar;
