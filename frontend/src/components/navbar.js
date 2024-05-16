// Navbar.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/search/${groupName}`);
            if (response.data.length > 0) {
                navigate(`/search/${groupName}`);
            } else {
                alert('No such group found!');
            }
        } catch (error) {
            console.error('Error searching posts:', error);
        }
    };

    return (
        <nav className="navbar navbar-expand-lg fixed-top" style={{ backgroundColor: '#4D869C', color: 'white' }}>
            <div className="container">
                <form className="d-flex" onSubmit={handleSearch}>
                    <input className="form-control me-2" type="search" placeholder="Search by group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                    <button className="btn btn-light" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
};

export default Navbar;
