import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import WhatsappMenu from "../../components/WhatsAppMenu/WhatsAppMenu";
import { Container, Row, Col, Card, ProgressBar } from "react-bootstrap";
import { getUserProfile, getPlanDetails, getWhatsAppAccounts } from "../../services/api";
import { FaPaperPlane, FaWhatsapp, FaClipboardList } from "react-icons/fa";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import "./WhatsApp.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const WhatsApp = () => {

    const [chatbotSent, setChatbotSent] = useState(214);
    const [messageLimit, setMessageLimit] = useState(100000);
    const [apiMessages, setApiMessages] = useState(1);
    const [sentBulkMessages, setSentBulkMessages] = useState(2);
    const [failedBulkMessages, setFailedBulkMessages] = useState(0);
    const [messagesSent, setMessagesSent] = useState(chatbotSent + apiMessages);
    const [autoResponderSent, setAutoResponderSent] = useState(0);
    const [user, setUser] = useState(null);
    const [whatsAppAccounts, setWhatsAppAccounts] = useState([]);
    const [totalBulkMessages, setTotalBulkMessages] = useState(sentBulkMessages + failedBulkMessages);
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

                const accounts = await getWhatsAppAccounts();
                const userAccounts = accounts.filter(acc => acc.user === userProfile.id);
                setWhatsAppAccounts(userAccounts);

            } catch (error) {
                console.error("Error obtaining whatsapp accounts", error);
            }
        };

        fetchData();
    }, [navigate]);

    const percentUsed = Math.min((messagesSent / messageLimit) * 100, 100).toFixed(2);

    // GRAPHICS 
    const used = messagesSent;
    const remaining = messageLimit - messagesSent;

    const donutData = {
        labels: ["Chatbot", "API"],
        datasets: [
            {
                data: [messagesSent, apiMessages],
                backgroundColor: ["#28a745", "#e9ecef"],
                borderWidth: 0,
            },
        ],
    };

    const donutOptions = {
        cutout: "70%",
        plugins: {
            legend: { display: false },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        const label = context.label || "";
                        const value = context.raw || 0;
                        return `${label}: ${value}`;
                    },
                },
            },
        },
    };

    // CAMPAIGNS
    const campaigns = [
        { name: "Test Campaign", sent: 1, failed: 0 }
    ];
    const apiSent = apiMessages;


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
                                            <h3 className="mt-2" style={{ color: "#50C870" }}>
                                                {messagesSent}/{messageLimit}
                                            </h3>
                                        </div>
                                        <FaPaperPlane size={50} />
                                    </div>
                                    <ProgressBar
                                        now={parseFloat(percentUsed)}
                                        variant="success"
                                        className="mt-4"
                                    />
                                    <div className="group-text-percent text-white mt-3">
                                        <span>Percent:</span>
                                        <span>{percentUsed}%</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={6}>
                            <Card className="bg-white shadow p-3">
                                <Card.Body className="d-flex align-items-center justify-content-between">
                                    <div>
                                        <div className="bg-success bg-opacity-10 rounded p-2 d-inline-block mb-2">
                                            <FaClipboardList size={30} className="text-success" />
                                        </div>
                                        <h6 className="fw-bold text-dark">Total messages sent</h6>
                                        <p className="text-muted mb-1">
                                            The complete messages that have been successfully sent
                                        </p>
                                        <h3 className="text-success fw-bold mb-0">{messagesSent}</h3>
                                        <small className="text-muted" style={{ color: "#50C356" }}>Messages</small>
                                    </div>
                                    <div style={{ width: "120px", height: "120px" }}>
                                        <Doughnut data={donutData} options={donutOptions} />
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    <hr className="my-5" />
                    <h4><FaWhatsapp color="green" /> Bulk messaging</h4>

                    <Row className="mb-4">
                        <Col md={4}>
                            <Card className="text-center border-0 shadow-sm">
                                <Card.Body>
                                    <h6>Total</h6>
                                    <h5 className="text-primary">{totalBulkMessages} <small>Messages</small></h5>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="text-center border-0 shadow-sm">
                                <Card.Body>
                                    <h6>Sent</h6>
                                    <h5 className="text-success">{sentBulkMessages} <small>Messages</small></h5>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4}>
                            <Card className="text-center border-0 shadow-sm">
                                <Card.Body>
                                    <h6>Failed</h6>
                                    <h5 className="text-danger">{failedBulkMessages} <small>Messages</small></h5>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    {/* Tabla de campañas */}
                    <h6 className="mt-4 fw-bold">Campaign name</h6>
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Name</th>
                                <th className="text-success">Sent</th>
                                <th className="text-danger">Failed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {campaigns.map((c, i) => (
                                <tr key={i}>
                                    <td>{c.name}</td>
                                    <td className="text-success">{c.sent}</td>
                                    <td className="text-danger">{c.failed}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Secciones: API, Autoresponder, Chatbot */}
                    {[
                        { title: "Send via API", sent: apiSent },
                        { title: "Autoresponder", sent: autoResponderSent },
                        { title: "Chatbot", sent: chatbotSent }
                    ].map((item, i) => (
                        <Card className="mb-4" key={i}>
                            <Card.Body>
                                <h6 className="text-success fw-bold"><FaPaperPlane className="me-2" />{item.title}</h6>
                                <p className="text-muted mb-1">Sent</p>
                                <h5 className="text-success">{item.sent} <small>Messages</small></h5>
                            </Card.Body>
                        </Card>
                    ))}

                    <h6 className="mt-4 fw-bold">Account</h6>
                    <table className="table table-bordered">
                        <thead className="table-light">
                            <tr>
                                <th>Account</th>
                                <th className="text-success">Sent</th>
                                <th className="text-danger">Failed</th>
                            </tr>
                        </thead>
                        <tbody>
                            {whatsAppAccounts.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center">No WhatsApp accounts linked.</td>
                                </tr>
                            ) : (
                                whatsAppAccounts.map((acc, index) => (
                                    <tr key={index}>
                                        <td>{acc.name} ({acc.phone_number})</td>
                                        <td className="text-success">{acc.sent_messages || 0}</td>
                                        <td className="text-danger">{acc.failed_messages || 0}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </Container>
            </div>
        </div>
    );
};

export default WhatsApp;
