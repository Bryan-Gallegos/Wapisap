import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/api";
import logo from "../../assets/logo.png"; // Asegúrate de que el path sea correcto
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
            const credentials = { username, password };
            const response = await loginUser(credentials);

            localStorage.setItem("accessToken", response.access);
            if (response.role) {
                localStorage.setItem("userRole", response.role);
            }

            if (response.role === "cliente") {
                navigate("/dashboard/user");
            } else if (response.role === "admin") {
                navigate("/dashboard/admin");
            } else {
                navigate("/");
            }
        } catch (err) {
            setError("Invalid credentials");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login-wrapper">
            <div className="login-card">
                <div className="login-left">
                    <h2>Welcome back</h2>
                    <p className="description">
                        Log in to your account to access all system functions.
                    </p>
                    <form onSubmit={handleSubmit} className="login-form">
                        {error && <p className="error-message">{error}</p>}

                        <div className="form-group">
                            <label>User</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="login-button">
                            LOGIN
                        </button>
                    </form>
                </div>

                <div className="login-right">
                    <div className="login-bg">
                        <img src={logo} alt="Golden Shark Logo" className="login-logo" />
                        <h3>Golden Shark</h3>
                        <p>Automate, manage and scale your business with our platform.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
