import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import 'bootstrap/dist/js/bootstrap';

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
        logout();
        navigate('/');
    };

    const homePath = user ? `/cards/${user.id}` : '/'; 

    if (!user) {
        return null; // Don't render anything if there's no user logged in
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#4D869C' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to = {homePath} >NUST Forums</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                    <form className="d-flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" placeholder="Search by group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                        <button className="btn btn-outline-light" type="submit">Search</button>
                    </form>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to={`/profile/${user.username}`}>Profile</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" href="#" onClick={handleLogout}>Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
