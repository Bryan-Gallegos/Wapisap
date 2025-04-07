import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import QRCodeStyling from "qr-code-styling";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import { getUserProfile, getWhatsAppAccounts } from "../../../services/api";
import emptyBox from "../../../assets/empty.png";
import "./LinkGenerator.css";

const WhatsAppLinkGenerator = () => {
    const [user, setUser] = useState(null);
    const [accounts, setAccounts] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [message, setMessage] = useState("");
    const [qrCode, setQrCode] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAccountAndProfile = async () => {
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
                const filtered = allAccounts.filter(acc => acc.user === userData.id);
                setAccounts(filtered);
            } catch (error) {
                console.error("Error getting accounts and profile:", error);
            }
        };
        fetchAccountAndProfile();
    }, [navigate]);

    const generateLink = () => {
        const number = selectedAccount?.phone_number?.replace(/\+|\s/g, "");
        return `https://api.whatsapp.com/send?phone=${number}&text=${encodeURIComponent(message)}`;
    };

    useEffect(() => {
        if (!selectedAccount) return;

        const qr = new QRCodeStyling({
            width: 300,
            height: 300,
            data: generateLink(),
            dotsOptions: { color: "#000", type: "square" },
            cornersSquareOptions: { type: "square" },
            cornersDotOptions: { type: "square" },
            imageOptions: { crossOrigin: "anonymous", margin: 10 }
        });

        setQrCode(qr);
    }, [selectedAccount]);

    useEffect(() => {
        if (qrCode && selectedAccount) {
            qrCode.update({ data: generateLink() });
            const qrContainer = document.getElementById("qr-code");
            qrContainer.innerHTML = "";
            qrCode.append(qrContainer);
        }
    }, [qrCode, message]);

    const handleDownload = () => {
        if (qrCode) {
            qrCode.download({ name: "qr_whatsapp", extension: "png" });
        }
    };

    return (
        <div className="whatsapp-linkgenerator-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-linkgenerator-content">
                <Topbar />
                <Container className="p-4">
                    <h4 className="fw-bold mb-2 text-success">📶 Link Generator</h4>
                    <p className="text-muted mb-4">Create QR and links for WhatsApp</p>

                    <select
                        className="form-select mb-4"
                        value={selectedAccount?.id || ""}
                        onChange={(e) =>
                            setSelectedAccount(accounts.find(acc => acc.id === parseInt(e.target.value)))
                        }
                    >
                        <option value="">Select WhatsApp account</option>
                        {accounts.map(account => (
                            <option key={account.id} value={account.id}>
                                {account.name}
                            </option>
                        ))}
                    </select>

                    {!selectedAccount ? (
                        <div className="empty-box text-center">
                            <img src={emptyBox} alt="empty" width={180} />
                        </div>
                    ) : (
                        <div className="link-generator-card p-4 rounded shadow bg-white">
                            <div className="d-flex align-items-center mb-4">
                                <img
                                    src={selectedAccount.profile_picture || "https://i.imgur.com/JkW7Zxw.png"}
                                    className="rounded-circle me-3"
                                    alt="profile"
                                    width={50}
                                    height={50}
                                />
                                <div>
                                    <h6 className="mb-0 fw-bold">{selectedAccount.name}</h6>
                                    <small className="text-muted">
                                        {selectedAccount.phone?.replace(/\+|\s/g, "")}
                                    </small>
                                </div>
                            </div>

                            <textarea
                                className="form-control mb-3"
                                rows={2}
                                placeholder="Write your message here"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />

                            <div className="d-flex mb-3">
                                <input
                                    type="text"
                                    className="form-control me-2"
                                    value={generateLink()}
                                    readOnly
                                />
                                <button
                                    className="btn btn-success"
                                    onClick={() => navigator.clipboard.writeText(generateLink())}
                                >
                                    Copy
                                </button>
                            </div>

                            <div className="text-center mb-3">
                                <div id="qr-code" />
                            </div>

                            <div className="text-center">
                                <button className="btn btn-primary" onClick={handleDownload}>
                                    ⬇️ Download QR
                                </button>
                            </div>
                        </div>
                    )}
                </Container>
            </div>
        </div>
    );
};

export default WhatsAppLinkGenerator;
