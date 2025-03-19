import React, { useState, useEffect } from "react";
import { Navbar, Container, Button, Dropdown, Image } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { getUserProfile } from "../../services/api"; // Importa la función de la API
import "./Topbar.css";

const Topbar = () => {
    const [language, setLanguage] = useState(localStorage.getItem("language") || "es");
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        localStorage.setItem("language", language);
    }, [language]);

    // Obtener datos del usuario al cargar el componente
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const userData = await getUserProfile();
                setUserProfile(userData);
            } catch (error) {
                console.error("Error al obtener el perfil del usuario", error);
            }
        };
        
        fetchUserProfile();
    }, []);

    const handleLanguageChange = () => {
        const newLanguage = language === "es" ? "en" : "es";
        setLanguage(newLanguage);
        window.location.reload();
    };

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_id");
        window.location.href = "/login";
    };

    // Obtener iniciales correctamente usando first_name y last_name
    const getUserInitials = () => {
        if (!userProfile) return "NN"; // En caso de que no haya usuario autenticado
        const { first_name, last_name } = userProfile;
        if (!first_name || !last_name) return "NN";

        return `${first_name.charAt(0)}${last_name.charAt(0)}`.toUpperCase();
    };

    return (
        <Navbar bg="light" expand="lg" className="topbar shadow-sm px-3">
            <Container fluid className="d-flex align-items-center justify-content-end text-end">
                
                {/* Selector de idioma */}
                <Dropdown className="me-2">
                    <Dropdown.Toggle variant="light" id="dropdown-language" className="d-flex align-items-center small-text">
                        <img
                            src={language === "es"
                                ? "https://upload.wikimedia.org/wikipedia/commons/9/9a/Flag_of_Spain.svg"
                                : "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg"}
                            alt={language === "es" ? "Spanish" : "English"}
                            width="20"
                            height="13"
                            className="me-1"
                        />
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item onClick={handleLanguageChange}>
                            {language === "es" ? "English" : "Spanish"}
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                {/* 📌 Mostrar Fecha de Expiración del Plan */}
                <span className="me-2 big-text">
                    Expire date: <strong>{userProfile?.expire_date || "Forever"}</strong>
                </span>

                {/* Botón Upgrade */}
                <Button variant="primary" className="me-2 small-btn">Upgrade</Button>

                {/* Botón de perfil con Dropdown */}
                <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-profile" className="small-btn d-flex align-items-center">
                        {userProfile?.profile_picture ? (
                            <Image 
                                src={userProfile.profile_picture} 
                                alt="User Profile" 
                                roundedCircle 
                                width="30" 
                                height="30"
                                className="me-1"
                            />
                        ) : (
                            <div className="user-initials">{getUserInitials()}</div>
                        )}
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Item href="/profile">My Account</Dropdown.Item>
                        <Dropdown.Item href="/settings">Configuration</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item href="#" onClick={handleLogout} className="text-danger">
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Navbar>
    );
};

export default Topbar;
