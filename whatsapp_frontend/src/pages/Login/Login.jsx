import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
    
        try {
            const credentials = {
                username,
                password,
            };
    
            const response = await loginUser(credentials);
    
            // Guardar el token
            localStorage.setItem("accessToken", response.access);
    
            // Verificar si la respuesta tiene un campo 'role' antes de guardarlo
            if (response.role) {
                localStorage.setItem("userRole", response.role);
            } else {
                console.warn("No se encontró 'role' en la respuesta de la API.");
            }
            if(response.role === "cliente"){
                navigate("/dashboard/user");
                console.log("Ingresaste como USER")
            }else if(response.role === "admin"){
                navigate("/dashboard/admin");
                console.log("Ingresaste como ADMIN")
            } else{
                navigate("");
                console.log("NO DETECTA EL ROLE")
            }
        } catch (err) {
            console.error("Error en login:", err);
        }
    };
    

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="login-input-group">
                    <label>Usuario</label> {/* Cambia "Email" por "Usuario" */}
                    <input
                        type="text"
                        value={username} // El campo se llama "username", no "email"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="login-input-group">
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className="login-button" type="submit">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;