import axios from "axios";

const BASE_URL = "http://localhost:8000";

export async function register({ username, email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/register`,
            {
                username,
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return {
            success: true,
            data: response.data
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        };
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/login`,
            {
                email,
                password
            },
            {
                withCredentials: true
            }
        );

        return {
            success: true,
            data: response.data
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        };
    }
}

export async function logout() {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/auth/logout`,
            {
                withCredentials: true
            }
        );

        return {
            success: true,
            data: response.data
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        };
    }
}

export async function getme() {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/auth/get_me`,
            {
                withCredentials: true
            }
        );

        return {
            success: true,
            data: response.data
        };
    } catch (err) {
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        };
    }
}