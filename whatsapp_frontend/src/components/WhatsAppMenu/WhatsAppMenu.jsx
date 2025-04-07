import React from "react";
import { ListGroup, Form, Button } from "react-bootstrap";
import {
    FaChartPie, FaUser, FaEnvelope, FaClock, FaRobot, FaCheckCircle,
    FaUsers, FaLink, FaHistory, FaCogs, FaPlus, FaPoll, FaAddressBook
} from "react-icons/fa";
import "./WhatsAppMenu.css"; // Asegúrate de modificar este CSS

const menuItems = [
    { icon: <FaChartPie className="icon report-icon" />, text: "Report", desc: "Customize system interface", link: "/whatsapp" },
    { icon: <FaUser className="icon profile-icon" />, text: "Profile", desc: "Information WhatsApp Account", link: "/whatsapp_profile" },
    { icon: <FaEnvelope className="icon bulk-icon" />, text: "Bulk Messaging", desc: "Send to multiple recipients", link: "/whatsapp_bulk" },
    { icon: <FaClock className="icon history-icon" />, text: "Message History", desc: "Message history from bulk, chatbot...", link: "/whatsapp_history" },
    { icon: <FaRobot className="icon autoresponder-icon" />, text: "Autoresponder", desc: "Send a pre-written message", link: "/whatsapp_autoresponder" },
    { icon: <FaCheckCircle className="icon quick-icon" />, text: "Quick Response", desc: "Quick Response", link: "/whatsapp_send_message" },
    { icon: <FaUsers className="icon chatbot-icon" />, text: "Chatbot", desc: "Communicate with users", link: "/whatsapp_chatbot" },
    { icon: <FaLink className="icon link-icon" />, text: "Link Generator", desc: "Create QR and links for WhatsApp", link: "/whatsapp_link_generator" },
    { icon: <FaCogs className="icon api-icon" />, text: "API", desc: "API WhatsApp REST", link: "/whatsapp_api" }
];

const templateItems = [
    { icon: <FaPoll className="icon poll-icon" />, text: "Poll Template", desc: "Create Poll messages", link: "/whatsapp_poll_template" },
    { icon: <FaHistory className="icon list-icon" />, text: "List Message Template", desc: "Create list of items/options", link: "/whatsapp_list_message_template" }
];

const contactItems = [
    { icon: <FaAddressBook className="icon contact-icon" />, text: "Contacts", desc: "Create, edit your contacts", link: "/whatsapp_contact" }
];

const WhatsAppMenu = () => {
    return (
        <div className="whatsapp-menu-container">
            {/* Search Bar */}
            <Form.Control type="text" placeholder="Search" className="whatsapp-search mb-3" />

            {/* Title and Add Account Button */}
            <div className="whatsapp-header">
                <h5 className="whatsapp-menu-title">Report</h5>
                <Button variant="success" size="sm" className="w-100 whatsapp-add-account" href="/whatsapp_profiles">
                    <FaPlus /> Add Account
                </Button>
            </div>

            {/* Features Section */}
            <p className="whatsapp-section-title">FEATURES</p>
            <ListGroup variant="flush" className="whatsapp-menu">
                {menuItems.map((item, index) => (
                    <ListGroup.Item key={index} action href={item.link} className="whatsapp-menu-item">
                        {item.icon}
                        <div>
                            <span className="menu-title">{item.text}</span>
                            <p className="menu-desc">{item.desc}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Template Section */}
            <p className="whatsapp-section-title">TEMPLATE</p>
            <ListGroup variant="flush" className="whatsapp-menu">
                {templateItems.map((item, index) => (
                    <ListGroup.Item key={index} action href={item.link} className="whatsapp-menu-item">
                        {item.icon}
                        <div>
                            <span className="menu-title">{item.text}</span>
                            <p className="menu-desc">{item.desc}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Contact Section */}
            <p className="whatsapp-section-title">CONTACT</p>
            <ListGroup variant="flush" className="whatsapp-menu">
                {contactItems.map((item, index) => (
                    <ListGroup.Item key={index} action href={item.link} className="whatsapp-menu-item">
                        {item.icon}
                        <div>
                            <span className="menu-title">{item.text}</span>
                            <p className="menu-desc">{item.desc}</p>
                        </div>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default WhatsAppMenu;
