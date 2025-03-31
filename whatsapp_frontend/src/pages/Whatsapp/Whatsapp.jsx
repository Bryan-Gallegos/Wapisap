import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import WhatsappMenu from "../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { getUserProfile, getWhatsAppAccounts, getPlanDetails } from "../../services/api";
import { FaPaperPlane, FaWhatsapp, FaClipboardList } from "react-icons/fa";
import "./WhatsApp.css";

const WhatsApp = () => {
    const [messagesSent, setMessagesSent] = useState(219);
    const [messageLimit, setMessageLimit] = useState(100000);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await getUserProfile();
                setUser(userProfile);

                const expireDate = new Date(userProfile.expire_date);
                const today = new Date();

                if (expireDate < today) {
                    navigate("/dashborad/user"); // Expired
                    return;
                }

                // Obtener plan por usuario
                const plan = await getPlanDetails(userProfile.plan);
                setMessageLimit(plan.message_limit);

            } catch (error) {
                console.error("Error obtaining whatsapp accounts", error);
            }
        };

        fetchData();
    }, [navigate]);

    const percentUsed = Math.min((messagesSent / messageLimit) * 100, 100).toFixed(2);

    return (
        <div className="whatsapp-page">
            <Sidebar />

            <div className="user-menu-container">
                <WhatsappMenu />
            </div>

            <div className="user-content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2 className="mb-4">
                        <FaWhatsapp color="green" /> WhatsApp Report
                    </h2>

                    <Row className="g-4">
                        <Col md={6}>
                            <Card className="text-white bg-dark shadow">
                                <Card.Body>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5>Message by month</h5>
                                            <p>Limit messages by month</p>
                                            <h3 className="text-success">
                                                {messagesSent}/{messageLimit}
                                            </h3>
                                        </div>
                                        <FaPaperPlane size={50} />
                                    </div>
                                    <ProgressBar
                                        now={percentUsed}
                                        label={`${percentUsed}%`}
                                        className="mt-3"
                                    />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="text-white bg-light shadow">
                                <Card.Body className="text-center">
                                    <FaClipboardList size={40} className="mb-2 text-success" />
                                    <h5>Total messages sent</h5>
                                    <p>The complete messages that have been successfully sent</p>
                                    <h3 className="text-success">{messagesSent}</h3>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
};

export default WhatsApp;
