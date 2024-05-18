import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import useDebounce from '../hooks/useDebounce';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const navigate = useNavigate();
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const ref = useRef(null);

    useEffect(() => {
        if (debouncedSearchTerm) {
            const fetchSuggestions = async () => {
                try {
                    const response = await axios.get(`http://localhost:4000/search/${debouncedSearchTerm}`);
                    setSuggestions(response.data);
                } catch (error) {
                    console.error('Error fetching suggestions:', error);
                    setSuggestions([]);
                }
            };
            fetchSuggestions();
        } else {
            setSuggestions([]);
        }
    }, [debouncedSearchTerm]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setSuggestions([]);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSelection = (item) => {
        if (item.type === 'group') {
            navigate(`/search/${item.label}`);
        } else if (item.type === 'user') {
            navigate(`/profile/${item.label.slice(2)}`);  // Removes 'u/' prefix
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) {
        return null;  // Don't render anything if there's no user logged in
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark fixed-top" style={{ backgroundColor: '#4D869C' }}>
            <div className="container-fluid">
                <Link className="navbar-brand" to={`/cards/${user.id}`}>NUST Forums</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNavDropdown">
                    <div className="d-flex" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} ref={ref}>
                        <input className="form-control me-2" type="search" placeholder="Search by group or user" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        {suggestions.length > 0 && (
                            <ul className="list-group position-absolute w-100" style={{ top: '38px', zIndex: 1000 }}>
                                {suggestions.map((item, index) => (
                                    <li key={index} className="list-group-item list-group-item-action" onClick={() => handleSelection(item)}>
                                        {item.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Account
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to={`/profile/${user.username}`}>Profile</Link></li>
                                <li><hr className="dropdown-divider"/></li>
                                <li><a className="dropdown-item" onClick={handleLogout}>Log out</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
