import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Table, Spinner } from "react-bootstrap";
import { getUserProfile, getWhatsAppAccounts, getInstances, getMessages } from "../../../services/api";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import empty from "../../../assets/empty.png";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import "./History.css";

const History = () => {
    const [user, setUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [instances, setInstances] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const today = new Date();
                const expireDate = new Date(userData.expire_date);
                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }

                const accounts = await getWhatsAppAccounts();
                const userAccount = accounts.find(acc => acc.user === userData.id);

                if (!userAccount) return;

                const instances = await getInstances();
                setInstances(instances);
                const instance = instances.find(inst => inst.account === userAccount.ID);

                if (!instance) return;

                const allMessages = await getMessages();
                const userMessages = allMessages.filter(
                    msg => msg.instance === instance.id
                );
                setMessages(userMessages);

            } catch (error) {
                console.error("Error fetching user/accounts:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [navigate]);

    const getInstanceKeyById = (id) => {
        const inst = instances.find(i => i.id === id);
        return inst ? inst.instance_key : "Unknown";
    };

    const formatDateTime = (isoDate) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
    
        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12;
    
        return `${day}/${month}/${year}\n${hours}:${minutes} ${ampm}`;
    };

    return (
        <div className="whatsapp-history-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsaap-history-content">
                <Topbar />
                <Container className="p-4">
                    <h5 className="fw-boldtext-primary">
                        <FaClock color="#B71C1C" className="me-2 text-purple" /> Message History
                    </h5>
                    <p className="text-muted mb-4">Message history from bulk, chatbot and autoresponder</p>

                    {loading ? (
                        <div className="text-center mt-5">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="text-center mt-5">
                            <img src={empty} alt="No istory" width={370} />
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <Table bordered hover className="text-center bg-white shadow-sm fixed-size-table">
                                <colgroup>
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "10%" }} />
                                    <col style={{ width: "9%" }} />
                                    <col style={{ width: "5%" }} />
                                    <col style={{ width: "43%" }} />
                                    <col style={{ width: "9%" }} />
                                </colgroup>
                                <thead className="table-light">
                                    <tr>
                                        <th>Status</th>
                                        <th>Instance ID</th>
                                        <th>Phone Number</th>
                                        <th>Type</th>
                                        <th>Message</th>
                                        <th>Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {messages.map((msg, idx) => (
                                        <tr key={idx}>
                                            <td><FaCheckCircle className="text-success" /></td>
                                            <td>{getInstanceKeyById(msg.instance)}</td>
                                            <td>{msg.receiver.replace("+", "")}</td>
                                            <td>{msg.message_type}</td>
                                            <td>{msg.message}</td>
                                            <td style={{ whiteSpace: "pre-line" }}>{formatDateTime(msg.created_at)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )}



                </Container>
            </div>
        </div>
    );
};

export default History;