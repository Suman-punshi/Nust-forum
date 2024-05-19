import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import useDebounce from "../hooks/useDebounce";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Responsive.css";

const Navbar = ({ onSidebarSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
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
          const response = await axios.get(
            `http://localhost:4000/search/${debouncedSearchTerm}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
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
    if (item.type === "group") {
      navigate(`/search/${item.label}`);
    } else if (item.type === "user") {
      navigate(`/profile/${item.label.slice(2)}`);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top"
      style={{
        background:
          "linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)",
        fontFamily: "Arial, sans-serif",
        fontSize: "1rem",
      }}
    >
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          to={`/cards/${user.id}`}
          style={{
            color: "#FFFFFF",
            fontSize: "1.5rem",
            fontFamily: "Helvetica Neue, Arial, sans-serif",
            fontWeight: "bold",
          }}
        >
          NUST Forums
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNavDropdown"
        >
          <div
            className="d-flex"
            style={{ position: "relative", width: "50%" }}
            ref={ref}
          >
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by group or user"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                fontSize: "1rem",
                padding: "10px",
              }}
            />
            {suggestions.length > 0 && (
              <ul
                className="list-group position-absolute w-100"
                style={{
                  top: "38px",
                  zIndex: 1000,
                  backgroundColor: "#e0f7ff",
                }}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={index}
                    className="list-group-item list-group-item-action"
                    onClick={() => handleSelection(item)}
                    style={{
                      backgroundColor: "#FFFFFF",
                      color: "#333",
                      "&:hover": {
                        backgroundColor: "#a6c0fe",
                        color: "#000000",
                      },
                    }}
                  >
                    {item.label}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle"
                type="button"
                id="sidebarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{
                  color: "#FFFFFF",
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                }}
              >
                Sidebar
              </button>
              <ul className="dropdown-menu" aria-labelledby="sidebarDropdown">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => onSidebarSelect("tags")}
                  >
                    Tags Sidebar
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => onSidebarSelect("community")}
                  >
                    Community Sidebar
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


