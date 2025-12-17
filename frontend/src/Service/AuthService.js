import axios from 'axios';
import { BASE_URL } from "../Util/util";

let currentUser = null;

const registerUser = async (registration) => {
    const response = await axios.post(`${BASE_URL}/api/auth/register`, registration);
    return response.data;
};

const loginUser = async (loginDetails) => {
    const response = await axios.post(`${BASE_URL}/api/auth/login`, loginDetails);
    const data = response.data;

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.customerId); // store ID
        currentUser = { id: data.customerId }; // basic user object
    }

    return data;
};

const getCurrentUser = () => currentUser;

const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    currentUser = null;
};

const isAuthenticated = () => !!localStorage.getItem("token");
const isAdmin = () => localStorage.getItem("role") === "ADMIN";

export default { registerUser, loginUser, logoutUser, isAuthenticated, isAdmin, getCurrentUser };
