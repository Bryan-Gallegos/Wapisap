import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

// Create an instance of Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Interceptor to automatically refresh the token
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If the error is 401 (Unauthorized) and we have not already tried to refresh the token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) throw new Error("No refresh token available");

                // Request a new access token
                const res = await axios.post(`${API_BASE_URL}token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = res.data.access;
                localStorage.setItem("access_token", newAccessToken);

                const isValid  = await verifyToken(newAccessToken);
                if(!isValid) throw new Error("Invalid token after refresh");

                // Update headers and repeat original request
                api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Error refreshing token", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login"; // Redirect to login if refresh token also expired
            }
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("access_token");
        if(token){
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ✅ Verify token
export const verifyToken = async (token) => {
    try{
        const response = await axios.post(`${API_BASE_URL}token/verify`,{
            token,
        });

        return response.status === 200 || response.status === 201;
    }catch (error){
        console.error("Token verification failed", error.response?.data || error.message);
        return false;
    }
};

// ✅ Login function
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}token/`, credentials);

        const { access, refresh, user_id } = response.data;
        
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        if (user_id) {
            localStorage.setItem("user_id", user_id);
        } else {
            console.error("Error: user_id is not present in the response.");
        }

        return response.data;
    } catch (error) {
        console.error("Login error", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Register new user (Sign Up)
export const registerUser = async (userData) => {
    try {
        const response = await api.post("users/", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Function for obtaining the authenticated user profile
export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) {
            throw new Error("No authenticated user");
        }

        const response = await api.get(`users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting user profile", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Function to obtain the details of a plan per ID
export const getPlanDetails = async (planId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token || !planId) {
            throw new Error("No authenticated user or plan does not exist");
        }

        const response = await api.get(`plans/${planId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error obtaining plan details", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get all registered billings
export const getBillingDetails = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("No authenticated user");
        }

        const response = await api.get(`billing/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error obtaining billing details", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get total users
export const getTotalUsers = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get(`users/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.length; 
    } catch (error) {
        console.error("Error in obtaining the total number of users", error.response?.data || error.message);
        return 0;  
    }
};


// ✅ Obtain total plans
export const getTotalPlans = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("plans/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.length;
    } catch (error) {
        console.error("Error in obtaining the total number of plans", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get total of linked WhatsApp accounts.
export const getTotalWhatsAppAccounts = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("whatsapp-accounts/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.length;
    } catch (error) {
        console.error("Error when obtaining WhatsApp accounts", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get total number of chatbots created
export const getTotalChatbots = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("chatbots/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.length;
    } catch (error) {
        console.error("Error in obtaining the total number of chatbots", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get last instances
export const getRecentInstances = async() => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("instances/",{
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.slice(-5);
    }catch(error){
        console.error("Error obtaining the latest instances", error.response?.data || error.message);
        return [];
    }
};

// ✅ Get the latest registered users
export const getRecentUsers = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("users/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.slice(-5);
    } catch (error) {
        console.error("Error getting the last users", error.response?.data || error.message);
        return [];
    }
};

// ✅ Get list of users
export const getUsers = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("users/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting users", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete user
export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`users/${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting user", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a User
export const createUser = async (userData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("users/", userData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error creating user", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Edit a user
export const updateUser = async (userId, userData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`users/${userId}/`, userData, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data;
    } catch (error) {
        console.error("Error when editing the user", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Function to obtain the details of a role by ID
export const getRoleDetails = async (roleId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token || !roleId) {
            throw new Error("No authenticated user or role does not exist");
        }

        const response = await api.get(`roles/${roleId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error obtaining role details", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get all roles
export const getRoles = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get(`roles/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when obtaining roles", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a new role
export const createRole = async (roleData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("roles/", roleData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error when creating the role", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Updating an existing role
export const updateRole = async (roleId, roleData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`roles/${roleId}/`, roleData, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data; 
    } catch (error) {
        console.error("Error updating the role", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete a role
export const deleteRole = async (roleId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`roles/${roleId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting role", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get all plans
export const getPlans = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("plans/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error obtaining all plans", error.response?.data || error.message);
    }
};

// ✅ Create a new Plan
export const createPlan = async (planData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("plans/", planData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when creating the plan", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Updating an existing Plan
export const updatePlan = async (planId, planData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`plans/${planId}/`, planData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating the plan", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete a Plan
export const deletePlan = async (planId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`plans/${planId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting plan", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtaining Chatbots
export const getChatbots = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("chatbots/", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when obtaining chatbots", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a Chatbot
export const createChatbot = async (chatbotData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("chatbots/", chatbotData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating chatbot", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Upgrading an existing chatbot
export const updateChatbot = async (chatbotId, chatbotData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`chatbots/${chatbotId}/`, chatbotData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating chatbot", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete a chatbot
export const deleteChatbot = async (chatbotId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`chatbots/${chatbotId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    } catch (error) {
        console.error("Error deleting chatbot", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get all Whatsapp Accounts
export const getWhatsAppAccounts = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("whatsapp-accounts/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error when obtaining WhatsApp accounts", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a Whatsapp Account
export const createWhatsAppAccount = async (accountData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("whatsapp-accounts/", accountData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when creating WhatsApp account", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Updating an existing Whatsapp Account
export const updateWhatsAppAccount = async (accountId, accountData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`whatsapp-accounts/${accountId}/`, accountData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating WhatsApp account", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete a Whatsapp Accounts
export const deleteWhatsAppAccount = async (accountId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`whatsapp-accounts/${accountId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when deleting WhatsApp account", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Get all messages
export const getMessages = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("messages/", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting all messages", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete a message
export const deleteMessage = async (messageId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`messages/${messageId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting a message", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtain all permissions assigned to plans (PlanPermission)
export const getPermissions = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("plan-permissions/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error obtaining all permits per plan", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a permit assigned to a plan (requires the permit to already exist)
export const createPermission = async (data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("plan-permissions/", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when creating the plan-permission relationship", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Removing a Plan-Permission relationship
export const deletePermission = async (permissionId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`plan-permissions/${permissionId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting the plan permit", error.response?.data || error.message);
        throw error;
    }
};

// 🟡 Optional: if you want to edit the ratio (uncommon)
export const updatePermission = async (permissionId, data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`permissions/${permissionId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error when updating the plan-permission relationship", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a new license (no plan yet)
export const createNewPermission = async (data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("permissions/", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating a new permit", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtain all instances
export const getInstances = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("instances/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error getting all instances", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Create a new instance
export const createInstance = async (instanceData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("instances/", instanceData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating a new instance", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Delete a instance
export const deleteInstance = async (instanceId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.delete(`instances/${instanceId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error deleting instance", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtaining all chatbot items
export const getChatbotItems = async () => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("chatbot-items",{
            headers:{
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    }catch(error){
        console.error("Error getting chatbot items", error.response?.data || error.message);
    }
};

// ✅ Obtaining all chatbot settings
export const getChatbotSettings = async () => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("chatbot-settings",{
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    }catch(error){
        console.error("Error getting chatbot settings", error.response?.data || error.message);
    }
};

// ✅ Obtaining all contact groups
export const getContactGroups = async () => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("contact-groups", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    }catch(error){
        console.error("Error getting contact groups", error.response?.data || error.message);
    }
};

// ✅ Create contact group
export const createContactGroup = async (data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("contact-groups/", data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating contact group", error.response?.data || error.message);
    }
};

// ✅ Get Contact group by id
export const getContactGroupById = async (id) => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get(`contact-groups/${id}/`,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    }catch(error){
        console.error("Error getting contact group by id:", error.response?.data || error.message);
    }
};

// ✅ Updating an existing contact group
export const updateContactGroup = async (groupId, data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`contact-groups/${groupId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating contact group", error.response?.data || error.message);
    }
};

// ✅ Deleting a contact group
export const deleteContactGroup = async (groupId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        await api.delete(`contact-groups/${groupId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return true;
    } catch (error) {
        console.error("Error deleting contact group", error.response?.data || error.message);
        return false;
    }
};

// ✅ Obtaining all contacts
export const getContacts = async () => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.get("contacts", {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch(error){
        console.error("Error getting contacts", error.response?.data || error.message);
    }
}

// ✅ Create a contact
export const createContact = async (data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.post("contacts/", data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error creating contact", error.response?.data || error.message);
    }
};

// ✅ Updating and existing contact
export const updateContact = async (contactId, data) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        const response = await api.put(`contacts/${contactId}/`, data, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error updating contact", error.response?.data || error.message);
    }
};

// ✅ Delete a contact
export const deleteContact = async (contactId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No authenticated user");

        await api.delete(`contacts/${contactId}/`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });

        return true;
    } catch (error) {
        console.error("Error deleting contact", error.response?.data || error.message);
        return false;
    }
};


export default api;
