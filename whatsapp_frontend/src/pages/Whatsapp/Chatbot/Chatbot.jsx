import React, { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import { getUserProfile, getWhatsAppAccounts, getChatbots, getChatbotItems, getChatbotSettings } from "../../../services/api";
import { FaPaperPlane, FaRobot, FaUsers } from "react-icons/fa";
import empty from "../../../assets/empty.png";
import "./Chatbot.css";

const Chatbot = () => {
    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [chatbots, setChatbots] = useState([]);
    const [items, setItems] = useState([]);
    const [itemsByBotId, setItemsByBotId] = useState({});
    const [chatbotSettings, setChatbotSettings] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expire_date);
                const today = new Date();
                if (expireDate < today) {
                    navigate("/dashboard/user");
                    return;
                }

                const allAccounts = await getWhatsAppAccounts();
                const filteredAccounts = allAccounts.filter(acc => acc.user === userData.id);
                setAccounts(filteredAccounts);

                const allChatbots = await getChatbots();
                const filteredChatbots = allChatbots.filter(bot => bot.whatsapp.user === userData.id);
                setChatbots(filteredChatbots);

                const allItems = await getChatbotItems();
                const itemsMap = {};
                allItems.forEach(item => {
                    if (itemsMap[item.chatbot]) {
                        itemsMap[item.chatbot].push(item);
                    } else {
                        itemsMap[item.chatbot] = [item];
                    }
                });
                setItemsByBotId(itemsMap);

                const settingsMap = {};
                const allSettings = await getChatbotSettings();
                allSettings.forEach(setting => {
                    settingsMap[setting.chatbot] = setting;
                });
                setChatbotSettings(settingsMap);

            } catch (error) {
                console.error("Error fetching accounts or chatbots:", error);
            }
        };

        fetchData();
    }, [navigate]);

    return (
        <div className="whatsapp-chatbot-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-chatbot-content">
                <Topbar />
                <Container className="p-4">
                    <h5 className="fw-bold"><FaUsers color="#0091EA" /> Chatbot</h5>
                    <p className="text-muted mb-4">Communicate with users</p>

                    <div className="d-flex flex-wrap gap-4">
                        {chatbots.map(bot => (
                            <div className="chatbot-account-card shadow" key={bot.id}>
                                {/* Header */}
                                <div className="chatbot-header">
                                    <div className="d-flex align-items-center gap-3">
                                        <img
                                            src={bot.whatsapp.profile_picture || "https://i.imgur.com/JkW7Zxw.png"}
                                            alt="Profile"
                                            className="profile-img"
                                        />
                                        <div className="text-white">
                                            <h6 className="mb-0 fw-bold">{bot.name}</h6>
                                            <small className="text-white">
                                                {bot.whatsapp.phone_number.replace(/\+|\s/g, "")}
                                            </small>

                                        </div>
                                    </div>
                                    <i className="bi bi-robot fs-2 text-white opacity-25"></i>
                                </div>

                                {/* Metrics */}
                                <div className="card-metrics d-flex justify-content-between">
                                    <div className="metric-box">
                                        <i className="mb-1" style={{ fontSize: "16px" }}>
                                            <FaPaperPlane color="#50CD89" />
                                        </i>
                                        <h4 className="fw-bold m-0">{bot.sent || 0}</h4>
                                        <small className="text-muted">Sent</small>
                                    </div>
                                    <div className="metric-box">
                                        <i className="mb-1" style={{ fontSize: "16px" }}>
                                            <FaRobot color="#F1416C" />
                                        </i>
                                        <h4 className="fw-bold m-0">{itemsByBotId[bot.id]?.length || 0}</h4>
                                        <small className="text-muted">Items</small>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="card-footer">
                                    {!itemsByBotId[bot.id] || itemsByBotId[bot.id].length === 0 ? (
                                        <div className="bot-message-box small mb-3">
                                            Please add at least a chatbot item and enable it to start
                                        </div>
                                    ) : (
                                        <div className="status-box d-flex justify-content-between align-items-center mb-3">
                                            <span>Status</span>
                                            <div className="form-check form-switch m-0">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={bot.status === "active"}
                                                    readOnly
                                                />
                                            </div>
                                        </div>
                                    )}

                                    {/* OPENAI API KEY STATUS visual */}
                                    {!chatbotSettings[bot.id] ? (
                                        <div className="bot-message-box small mt-3">
                                            AI System not Configured
                                        </div>
                                    ) : (
                                        <div
                                            className="api-status small mt-1 alert alert-light border d-flex align-items-center justify-content-between mt-3"
                                        >
                                            <span>OPENAI API KEY STATUS:</span>
                                            <span className="badge bg-warning text-dark">UNKNOWN</span>
                                        </div>
                                    )}

                                    <div className="d-flex justify-content-between mt-3">
                                        <button
                                            className="btn btn-light w-50 me-2"
                                            onClick={() => navigate(`/chatbot/${bot.id}/add-item`)}
                                        >
                                            <i className="bi bi-plus-lg me-1"></i> Add item
                                        </button>
                                        <button
                                            className="btn btn-light w-50"
                                            onClick={() => navigate(`/chatbot/${bot.id}/items`)}
                                        >
                                            <i className="bi bi-list-ul me-1"></i> Item list
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </Container>
            </div>
        </div>
    );
};

export default Chatbot;