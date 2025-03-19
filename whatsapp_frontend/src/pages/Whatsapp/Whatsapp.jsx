import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Topbar from "../../components/Topbar/Topbar";
import WhatsappMenu from "../../components/WhatsAppMenu/WhatsAppMenu";
import { Container } from "react-bootstrap";
import "./WhatsApp.css";  // Archivo de estilos

const WhatsApp = () => {
    return (
        <div className="whatsapp-page">
            {/* Sidebar */}
            <Sidebar />

            {/* WhatsApp Menu */}
            <div className="whatsapp-menu-container">
                <WhatsappMenu />
            </div>

            {/* Contenido Principal */}
            <div className="content">
                <Topbar />
                <Container fluid className="p-4">
                    <h2>WhatsApp Dashboard</h2>
                    <p>WhatsApp statistics and tools will be displayed here.</p>
                </Container>
            </div>
        </div>
    );
};

export default WhatsApp;
