// DisplaySearchResults.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Layout from "./Layout"; // Import the layout component
const DisplaySearchResults = () => {
    const { groupName } = useParams();
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/search/group/${groupName}`);
                setSearchResults(response.data);
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };
        fetchData();
    }, [groupName]);

    const cardcolor = { backgroundColor: "#EEF7FF" };

    return (
        <Layout>
        <div className="w-75 container d-flex justify-content-center mt-5">
            <div className="row">
                <div className="col">
                    <div className="">
                        {searchResults.map(post => (
                            <div key={post._id} className="card rounded-4 mb-3" style={cardcolor}>
                                <div className="card-header">
                                    <p className="card-subtitle text-muted">{post.username}</p>
                                    <h5 className="card-title">{post.title}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{post.text}</p>
                                    {post.images && <img src={post.images} className="card-img-top" alt="" />}
                                    <span className="badge badge-dark ms-1" style={{ backgroundColor: '#4D869C', color: 'white' }}>
                                        {post.num_comments} comments
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        </Layout>
    );
};

export default DisplaySearchResults;
