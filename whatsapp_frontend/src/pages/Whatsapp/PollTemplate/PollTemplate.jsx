import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Topbar from "../../../components/Topbar/Topbar";
import WhatsappMenu from "../../../components/WhatsAppMenu/WhatsAppMenu";
import emptyBox from "../../../assets/empty.png";
import { FaSearch, FaPlus, FaPoll } from "react-icons/fa";
import { getUserProfile } from "../../../services/api";
import "./PollTemplate.css";

const PollTemplate = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            try{
                const userData = await getUserProfile();
                setUser(userData);

                const expireDate = new Date(userData.expire_date);
                const today = new Date();

                if(expireDate < today){
                    navigate("/dashboard/user");
                    return;
                }

            }catch(error){
                console.error("Error getting user data:", error);
            }
        };

        fetchUserData();
    },[navigate]);

    return (
        <div className="whatsapp-polltemplate-page">
            <Sidebar />
            <div className="user-menu-container">
                <WhatsappMenu />
            </div>
            <div className="whatsapp-polltemplate-content">
                <Topbar />
                <div className="poll-template-header">
                    <h2 className="poll-template-title"><FaPoll color="#1976D2" /> Poll Template</h2>
                    <div className="poll-template-actions">
                        <div className="search-bar">
                            <FaSearch className="search-icon" />
                            <input type="text" placeholder="Search" />
                        </div>
                        <button className="add-button">
                            <FaPlus />
                        </button>
                    </div>
                </div>

                <div className="empty-container">
                    <img src={emptyBox} alt="No Data" className="empty-image" />
                </div>
            </div>
        </div>
    );
};

export default PollTemplate;