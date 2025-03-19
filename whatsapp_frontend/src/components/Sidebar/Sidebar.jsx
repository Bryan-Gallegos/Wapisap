import React, { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import logo from "../../assets/logo.png"
import { FaBars, FaUsers, FaCog, FaSignOutAlt, FaWhatsapp, FaUser, FaFileAlt, FaTools } from "react-icons/fa";
import "./Sidebar.css"; // Archivo de estilos

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem("userRole") || "cliente";
        setUserRole(role);
    }, []);


    return (
        <div className={`sidebar ${isExpanded ? "expanded" : ""}`} onMouseEnter={() => setIsExpanded(true)} onMouseLeave={() => setIsExpanded(false)}>
            <div className="sidebar-header">
                <img src={logo} alt="Logo" className="logo" />
            </div>

            <Nav className="flex-column">
                {userRole === "admin" ? (
                    <>
                        <Nav.Link href="/administration">
                            <FaUsers className="icon" /> {isExpanded && "Administration"}
                        </Nav.Link>
                    </>
                ) : (
                    <>
                        <Nav.Link href="/whatsapp">
                            <FaWhatsapp className="icon" /> {isExpanded && "WhatsApp"}
                        </Nav.Link>
                        <Nav.Link href="/account_manager">
                            <FaUser className="icon" /> {isExpanded && "Account Manager"}
                        </Nav.Link>
                        <Nav.Link href="/file_manager">
                            <FaFileAlt className="icon" /> {isExpanded && "File Manager"}
                        </Nav.Link>
                        <Nav.Link href="/tools">
                            <FaTools className="icon" /> {isExpanded && "Tools"}
                        </Nav.Link>
                    </>
                )}

                <hr />
            </Nav>
        </div>
    );
};

export default Sidebar;
