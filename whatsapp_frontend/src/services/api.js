import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/";

// Crear una instancia de Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// ✅ Interceptor para refrescar el token automáticamente
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // Si el error es 401 (Unauthorized) y no hemos intentado ya refrescar el token
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = localStorage.getItem("refresh_token");
                if (!refreshToken) throw new Error("No hay refresh token disponible");

                // Pedir un nuevo access token
                const res = await axios.post(`${API_BASE_URL}token/refresh/`, {
                    refresh: refreshToken,
                });

                const newAccessToken = res.data.access;
                localStorage.setItem("access_token", newAccessToken);

                // Actualizar headers y repetir la petición original
                api.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                console.error("Error al refrescar el token", refreshError);
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login"; // Redirigir a login si el refresh token también expiró
            }
        }
        return Promise.reject(error);
    }
);

// ✅ Función para iniciar sesión
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_BASE_URL}token/`, credentials);

        const { access, refresh, user_id } = response.data;

        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);

        if (user_id) {
            localStorage.setItem("user_id", user_id);
        } else {
            console.error("Error: user_id no está presente en la respuesta.");
        }

        return response.data;
    } catch (error) {
        console.error("Error en el inicio de sesión", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Función para obtener el perfil del usuario autenticado
export const getUserProfile = async () => {
    try {
        const token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");

        if (!token || !userId) {
            throw new Error("No hay usuario autenticado");
        }

        const response = await api.get(`users/${userId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener perfil de usuario", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Función para obtener los detalles de un plan por ID
export const getPlanDetails = async (planId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token || !planId) {
            throw new Error("No hay usuario autenticado o el plan no existe");
        }

        const response = await api.get(`plans/${planId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener los detalles del plan", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtener todos los billing registrados
export const getBillingDetails = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) {
            throw new Error("No hay usuario autenticado.");
        }

        const response = await api.get(`billing/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener los detalles del billing", error.response?.data || error.message);
        throw error;
    }
};


// ✅ Obtener total de usuarios
export const getTotalUsers = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get(`users/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.count; // Retorna la cantidad total de usuarios
    } catch (error) {
        console.error("Error al obtener el total de usuarios", error.response?.data || error.message);
        return 0;  // Retorna 0 en caso de error
    }
};


// ✅ Obtener total de planes
export const getTotalPlans = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("plans/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.count;
    } catch (error) {
        console.error("Error al obtener el total de planes", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtener total de cuentas de WhatsApp vinculadas
export const getTotalWhatsAppAccounts = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("whatsapp-accounts/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.count;
    } catch (error) {
        console.error("Error al obtener las cuentas de WhatsApp", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtener total de chatbots creados
export const getTotalChatbots = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("chatbots/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.count;
    } catch (error) {
        console.error("Error al obtener el total de chatbots", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtener últimas facturas generadas
export const getRecentInvoices = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("billing/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Verificar si response.data.results es un array antes de usar slice
        if (Array.isArray(response.data.results)) {
            return response.data.results.slice(-5); // Devuelve las últimas 5 facturas
        } else {
            console.error("Formato inesperado en getRecentInvoices:", response.data);
            return []; // Retorna un array vacío si no es el formato esperado
        }
    } catch (error) {
        console.error("Error al obtener las últimas facturas", error.response?.data || error.message);
        return [];
    }
};

// ✅ Obtener los últimos usuarios registrados
export const getRecentUsers = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("users/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        // Verificar si response.data.results es un array antes de usar slice
        if (Array.isArray(response.data.results)) {
            return response.data.results.slice(-5); // Devuelve los últimos 5 usuarios
        } else {
            console.error("Formato inesperado en getRecentUsers:", response.data);
            return []; // Retorna un array vacío si no es el formato esperado
        }
    } catch (error) {
        console.error("Error al obtener los últimos usuarios", error.response?.data || error.message);
        return [];
    }
};

// ✅ Obtener lista de usuarios
export const getUsers = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("users/", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error al obtener usuarios", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Eliminar usuario
export const deleteUser = async (userId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.delete(`users/${userId}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch (error) {
        console.error("Error al eliminar usuario", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Crear un Usuario
export const createUser = async (userData) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.post("users/", userData, {
             headers: { Authorization: `Bearer ${token}` } 
        });

        return response.data;
    } catch (error) {
        console.error("Error al crear al usuario", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Editar un usuario
export const updateUser = async(userId, userData) => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.put(`users/${userId}/`, userData, { 
            headers: { Authorization: `Bearer ${token}` } 
        });

        return response.data;
    }catch(error){
        console.error("Error al editar al usuario:", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Función para obtener los detalles de un rol por ID
export const getRoleDetails = async (roleId) => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token || !roleId) {
            throw new Error("No hay usuario autenticado o el rol no existe");
        }

        const response = await api.get(`roles/${roleId}/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Devuelve la información del rol
    } catch (error) {
        console.error("Error al obtener los detalles del rol", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtener todos los roles
export const getRoles = async () => {
    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get(`roles/`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data; // Devuelve la lista de roles
    } catch (error) {
        console.error("Error al obtener los roles", error.response?.data || error.message);
        throw error;
    }
};

// ✅ Obtener todos los planes
export const getPlans = async () => {
    try{
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error("No hay usuario autenticado.");

        const response = await api.get("plans/", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        console.error("Error al obtener todos los planes", error.response?.data || error.message);
    }
};

// ✅

export default api;
