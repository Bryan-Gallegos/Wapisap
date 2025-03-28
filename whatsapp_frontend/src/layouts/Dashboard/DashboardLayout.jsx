import React from "react";
import { Navbar, Container } from "react-bootstrap";
import Sidebar from "../../components/Sidebar/Sidebar"; // Importamos el Sidebar
import Topbar from "../../components/Topbar/Topbar"; // Importamos el Topbar

import "./DashboardLayout.css"

const DashboardLayout = ({ children }) => {
    return (
        <div className="dashboard-container">
            
            <Sidebar />
            <div className="content">
            <Topbar />
                <Container className="mt-4">{children}</Container>
            </div>
        </div>
    );
};

export default DashboardLayout;
