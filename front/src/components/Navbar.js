import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({ userEmail, setUserEmail }) => {
  const navigate = useNavigate();

  const links = [
    { label: "Home", path: "/" },
    { label: "Menu", path: "/menu" },
    { label: "Book My Table", path: "/book-table" },
    { label: "About", path: "/about" },
    { label: "Contact", path: "/contact" },
  ];

  const [hoveredLink, setHoveredLink] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [dropdownHover, setDropdownHover] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    setUserEmail("");
    setShowDropdown(false);
    navigate("/");
  };

  const goToProfile = () => {
    setShowDropdown(false);
    navigate("/profile");
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>
        <Link to="/" style={styles.link}>
          🍽️ Food Corner
        </Link>
      </div>

      <div style={styles.links}>
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              ...styles.link,
              ...(hoveredLink === link.path ? styles.linkHover : {}),
            }}
            onMouseEnter={() => setHoveredLink(link.path)}
            onMouseLeave={() => setHoveredLink(null)}
          >
            {link.label}
          </Link>
        ))}

        {userEmail ? (
          <div style={styles.profile} tabIndex={0} onBlur={() => setShowDropdown(false)}>
            <FaUserCircle
              size={28}
              style={{ cursor: "pointer" }}
              onClick={() => setShowDropdown((prev) => !prev)}
              title={userEmail}
            />

            {showDropdown && (
              <div style={styles.dropdown}>
                <div
                  style={{
                    ...styles.dropdownItem,
                    ...(dropdownHover === "profile" ? styles.dropdownHover : {}),
                  }}
                  onMouseEnter={() => setDropdownHover("profile")}
                  onMouseLeave={() => setDropdownHover(null)}
                  onClick={goToProfile}
                >
                  Profile
                </div>
                <div
                  style={{
                    ...styles.dropdownItem,
                    ...(dropdownHover === "logout" ? styles.dropdownHover : {}),
                  }}
                  onMouseEnter={() => setDropdownHover("logout")}
                  onMouseLeave={() => setDropdownHover(null)}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/auth"
            style={{
              ...styles.link,
              fontWeight: "700",
              fontSize: "1.1rem",
              border: "2px solid #fff",
              padding: "0.3rem 0.7rem",
              borderRadius: "8px",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "rgba(255,255,255,0.2)")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          >
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 3rem",
    backgroundColor: "#b22222", // Firebrick red
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  logo: {
    fontSize: "1.8rem",
    fontWeight: "900",
    cursor: "pointer",
    userSelect: "none",
    letterSpacing: "2px",
    color: "#fff",
    textShadow: "1px 1px 3px rgba(0,0,0,0.6)",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    position: "relative",
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    cursor: "pointer",
    padding: "0.4rem 0.6rem",
    borderRadius: "6px",
    transition: "background-color 0.3s ease, color 0.3s ease",
  },
  linkHover: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    color: "#ffe4e1",
  },
  profile: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    outline: "none",
  },
  dropdown: {
    position: "absolute",
    top: "38px",
    right: 0,
    backgroundColor: "#fff",
    color: "#b22222",
    borderRadius: "8px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.15)",
    overflow: "hidden",
    minWidth: "120px",
    userSelect: "none",
    zIndex: 1001,
  },
  dropdownItem: {
    padding: "0.7rem 1rem",
    cursor: "pointer",
    fontWeight: "700",
    borderBottom: "1px solid #b22222",
    transition: "background-color 0.25s ease",
  },
  dropdownHover: {
    backgroundColor: "#b22222",
    color: "#fff",
  },
};

export default Navbar;
