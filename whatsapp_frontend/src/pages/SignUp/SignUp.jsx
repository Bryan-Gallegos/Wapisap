import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api";
import logo from "../../assets/logo.png";
import "./SignUp.css";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        timezone: "UTC",
    });

    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            const newUser = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                username: formData.username,
                email: formData.email,
                password: formData.password,
                timezone: formData.timezone,
            };

            const response = await registerUser(newUser);

            if (response?.id) {
                setSuccess(true);
                navigate("/login");
            } else {
                setError("Unexpected error when registering.");
            }
        } catch (err) {
            setError("The user could not be created. Verify your data.");
            console.error("SignUp error:", err);
        }
    };

    return (
        <div className="signup-wrapper">
            <div className="signup-card">
                <div className="signup-left">
                    <h2>Create your account</h2>
                    <p className="description">Register to start using our platform.</p>

                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">✅ You were successfully registered!</p>}

                    <form onSubmit={handleSubmit} className="signup-form">
                        <div className="input-group">
                            <input
                                type="text"
                                name="first_name"
                                placeholder="First Name"
                                value={formData.first_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Last Name"
                                value={formData.last_name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="text"
                                name="username"
                                placeholder="Username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input
                                type="password"
                                name="confirmPassword"
                                placeholder="Confirm Password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <select
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                            >
                                <option value="UTC">UTC</option>
                                <option value="America/Lima">America/Lima</option>
                                <option value="America/Bogota">America/Bogota</option>
                                <option value="America/Mexico_City">America/Mexico_City</option>
                                <option value="Europe/Madrid">Europe/Madrid</option>
                            </select>
                        </div>

                        <button type="submit" className="signup-button">
                            CREATE ACCOUNT
                        </button>

                        <p className="login-redirect">
                            Already have an account?{" "}
                            <span onClick={() => navigate("/login")}>Login</span>
                        </p>
                    </form>
                </div>

                <div className="signup-right">
                    <img src={logo} alt="Logo" className="signup-logo" />
                    <h3>Golden Shark</h3>
                    <p>Manage, scale and automate your business with us.</p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
