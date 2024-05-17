import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {
    const [groupName, setGroupName] = useState('');
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useAuthContext();

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

    const handleLogout = () => {
        logout(); // deletes token from local storage
        navigate('/');
    }

    return (
        <nav className="navbar navbar-dark fixed-top" style={{ right:0,backgroundColor: '#4D869C' }}>
            <div className="container-fluid">
                <div className="d-flex justify-content-end flex-grow-1">
                    <form className="d-flex" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" placeholder="Search by group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        <button className="btn btn-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
            {user && (
            <div>
                <button className='btn btn-light' onClick={ handleLogout }>Log out</button>
            </div>
            )}
            {!user && (
                <div>
                    <Link to = "/" className='btn btn-light'>Login</Link>
                    <Link to = "/create-user" className='btn btn-light'>Sign Up</Link>
                </div>
            )}

        </nav>
    );
};

export default Navbar;
