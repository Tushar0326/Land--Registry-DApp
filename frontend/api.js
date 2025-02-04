import axios from "axios";

const API_URL = "http://localhost:5000"; // Make sure this matches your backend URL

// ✅ Register Land
export const registerLand = async (id, location, area) => {
    try {
        const response = await axios.post(`${API_URL}/registerLand`, { id, location, area });
        return response.data;
    } catch (error) {
        console.error("Error registering land:", error);
        return { success: false, error: error.message };
    }
};

// ✅ Get Land Details
export const getLandDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/getLand/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching land details:", error);
        return { success: false, error: error.message };
    }
};
