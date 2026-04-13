import axios from "axios"


export async function register({ username, email, password }) {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/register", {
            username,
            email,
            password
        }, {
            withCredentials: true
        })
        return { success: true, data: response.data };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
}

export async function login({ email, password }) {
    try {
        const response = await axios.post("http://localhost:8000/api/auth/login", {
            email,
            password
        }, {
            withCredentials: true
        })
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
}

export async function logout() {
    try {
        const response = await axios.get("http://localhost:8000/api/auth/logout", { withCredentials: true });
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
}

export async function getme() {
    try {
        const response = await axios.get("http://localhost:8000/api/auth/get_me", {
            withCredentials: true
        });
        return {
            success: true,
            data: response.data
        }
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
}