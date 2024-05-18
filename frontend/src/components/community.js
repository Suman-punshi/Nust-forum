import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

const CommunitySidebar = (props) => {
  const text_decor = { textDecoration: "none" };
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
    <div className="community-sidebar">
      <h2>Communities</h2>
      <ul>
        {communities.map((community) => (
          <li key={community._id}>
            <button onClick={() => handleCommunityClick(community._id)}>
              {community.community_name}
            </button>
            {selectedCommunity === community._id && (
              <ul>
                {groups[community._id] ? (
                  groups[community._id].map((group) => (
                    
                    <Link to={`/group/${props.id}/${group.name}`} style={text_decor}>
                       <li key={group._id}>{group.name}</li>
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
