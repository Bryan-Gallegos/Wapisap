import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
    FaPlug, FaRobot, FaComments, FaUsers, FaKey, FaDatabase, FaUserShield, FaCogs, FaServer   
} from "react-icons/fa";
import "./AdminMenu.css";

const menuItems = [
    { icon: <FaUsers className="icon users-icon" />, title: "Users", desc: "View and manage users", link: "/administration/users" },
    { icon: <FaUserShield className="icon roles-icon" />, title: "Roles", desc: "Manage user roles", link: "/administration/roles" },
    { icon: <FaDatabase className="icon plans-icon" />, title: "Plans", desc: "Manage subscription plans", link: "/administration/plans" },
    { icon: <FaRobot className="icon chatbot-icon" />, title: "Chatbots", desc: "Manage chatbot messages", link: "/administration/chatbots" },
    { icon: <FaCogs className="icon whatsapp-icon" />, title: "WhatsApp Accounts", desc: "Manage linked accounts", link: "/administration/whatsapp_accounts" },
    { icon: <FaComments className="icon messages-icon" />, title: "Messages", desc: "Review chatbot messages", link: "/administration/messages" },
    { icon: <FaKey className="icon permissions-icon" />, title: "Permissions", desc: "Set user access levels", link: "/administration/permissions" }, 
    { icon: <FaServer className="icon instances-icon"   />, title: "Instances", desc: "Manage instances", link: "/administration/instances"},
    { icon: <FaPlug className="icon api-icon" />, title: "API", desc: "Manage system integrations", link: "/administration/api" },
];

const AdminMenu = () => {
    const navigate = useNavigate();

    return (
        <div className="admin-menu-container">
            {/* Título y Botón de regreso */}
            <div className="admin-header">
                <h5 className="admin-menu-title">ADMINISTRATION</h5>
                <Button
                    variant="success"
                    size="sm"
                    className="w-100 admin-back-button"
                    onClick={() => navigate(-1)}
                >
                    Back to Dashboard
                </Button>
            </div>

            {/* Lista de opciones con títulos y descripciones */}
            <ListGroup variant="flush" className="admin-menu">
                {menuItems.map((item, index) => (
                    <ListGroup.Item key={index} action onClick={() => navigate(item.link)} className="admin-menu-item">
                        {item.icon}
                        <div>
                            <span className="menu-title">{item.title}</span>
                            <p className="menu-desc">{item.desc}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default AdminMenu;
