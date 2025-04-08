import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Row, Col, Table } from "react-bootstrap";
import { FaSearch, FaPlus, FaAddressBook } from "react-icons/fa";
import { getUserProfile, getContactGroups } from "../../../services/api";
import emptyBox from "../../../assets/empty.png";

import "./Contacts.css";

const Contacts = () => {
    const [user, setUser] = useState(null);
    const [contactGroups, setContactGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expire_date);
                const today = new Date();

                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }

                const allContactGroups = await getContactGroups();
                const filtered = allContactGroups.filter(cont => cont.user === userData.id);
                setContactGroups(filtered);

            } catch (error) {
                console.error("Error getting user data:", error);
            }
        };

        fetchUserData();
    }, [navigate]);

    return (
        <div className="whatsapp-contacts-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-contacts-content">
                <Topbar />
                <Container fluid>
                    <Row className="mb-4 align-items-center">
                        <Col md={6}>
                            <h2 className="contacts-title">
                                <FaAddressBook color="#1976D2" /> Contacts
                            </h2>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                            <div className="search-bar me-2">
                                <FaSearch className="search-icon" />
                                <input type="text" placeholder="Search" />
                            </div>
                            <button className="add-button">
                                <FaPlus />
                            </button>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <div className="contacts-table-wrapper">
                                <Table responsive bordered hover size="sm" className="contacts-table">
                                    <thead>
                                        <tr>
                                            <th style={{ width: "40px", textAlign: "center" }}>
                                                <input type="checkbox" />
                                            </th>
                                            <th style={{ width: "220px" }}>NAME</th>
                                            <th><span className="status total">■</span> TOTAL</th>
                                            <th><span className="status valid">✔</span> VALID</th>
                                            <th><span className="status invalid">⚠</span> INVALID</th>
                                            <th><span className="status validating">◌</span> VALIDATING</th>
                                            <th><span className="status duplicate">■</span> DUPLICATE</th>
                                            <th>STATUS</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contactGroups.length === 0 ? (
                                            <tr>
                                                <td colSpan="9" className="no-data-cell">
                                                    <img src={emptyBox} alt="No Contacts" className="empty-image" />
                                                </td>
                                            </tr>
                                        ) : (
                                            contactGroups.map((group) => (
                                                <tr key={group.id}>
                                                    <td>
                                                        <input type="checkbox" />
                                                    </td>
                                                    <td><strong>{group.name}</strong></td>
                                                    <td>0</td> {/* TOTAL */}
                                                    <td>0</td> {/* VALID */}
                                                    <td>0</td> {/* INVALID */}
                                                    <td>0</td> {/* VALIDATING */}
                                                    <td>0</td> {/* DUPLICATE */}
                                                    <td>
                                                        {group.status === "enable" ? (
                                                            <span style={{ background: "#B3E5FC", borderRadius: "50%", padding: "4px 6px" }}>
                                                                <span style={{ color: "#03A9F4", fontWeight: "bold" }}>✔</span>
                                                            </span>
                                                        ) : (
                                                            <span style={{ background: "#E0E0E0", borderRadius: "50%", padding: "4px 6px" }}>
                                                                <span style={{ color: "#424242", fontWeight: "bold" }}>✖</span>
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                                                            <button className="icon-button" title="Edit">
                                                                <i className="fas fa-edit" style={{ color: "#333" }}></i>
                                                            </button>
                                                            <button className="icon-button" title="Contacts">
                                                                <i className="fas fa-list" style={{ color: "#666" }}></i>
                                                            </button>
                                                            <button className="icon-button" title="Delete">
                                                                <i className="fas fa-trash" style={{ color: "crimson" }}></i>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>

                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default Contacts;
