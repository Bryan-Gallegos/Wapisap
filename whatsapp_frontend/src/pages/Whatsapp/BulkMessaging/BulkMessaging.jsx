import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, InputGroup, FormControl, Button } from "react-bootstrap";
import { FaSearch, FaPlus, FaFileExcel, FaEnvelope } from "react-icons/fa";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import empty from "../../../assets/empty.png";
import "./BulkMessaging.css";

const BulkMessaging = () => {
    const [bulkMessages, setBulkMessages] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Aquí puedes cargar los mensajes desde la API si deseas
        // setBulkMessages([...]);
    }, []);

    const handleCreate = () => {
        navigate("/whatsapp_bulk/create");
    };

    return (
        <div className="whatsapp-bulk-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>

            <div className="bulk-messaging-content">
                <Topbar />

                <Container className="p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                            <h5 className="fw-bold text-primary">
                                <FaEnvelope color="#AA00FF" /> Bulk Messaging
                            </h5>
                            <p className="text-muted mb-0">Send to multiple recipients</p>
                        </div>

                        {/* Search + Buttons */}
                        <InputGroup className="w-auto">
                            <InputGroup.Text>
                                <FaSearch />
                            </InputGroup.Text>
                            <FormControl
                                type="search"
                                placeholder="Search"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <Button variant="outline-primary" className="ms-2" onClick={handleCreate}>
                                <FaPlus />
                            </Button>
                            <Button variant="outline-success" className="ms-2">
                                <FaFileExcel />
                            </Button>
                        </InputGroup>
                    </div>

                    {/* Mensajes vacíos */}
                    {bulkMessages.length === 0 ? (
                        <div className="text-center mt-5">
                            <img src={empty} alt="No bulk messages" width={370} />
                        </div>
                    ) : (
                        <div>{/* Lista o tabla de campañas */}</div>
                    )}

                    {/* Paginación */}
                    <div className="d-flex justify-content-center mt-4">
                        <Button variant="light" className="me-2">«</Button>
                        <Button variant="light">»</Button>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default BulkMessaging;
