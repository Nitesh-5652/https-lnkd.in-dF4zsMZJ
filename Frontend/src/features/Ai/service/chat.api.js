import axios from "axios"

export async function Prompt({ threadId, message }) {
    try {
        const response = await axios.post("http://localhost:8000/api/chat", {
            threadId,
            message
        },
            {
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

export async function ThreadById(threadId) {
    try {
        const response = await axios.get(`http://localhost:8000/api/thread/${threadId}`,{withCredentials:true});
        return { success: true, data: response.data };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
}

export async function DeleteThreasd(threadId) {
    try {
        const response = await axios.delete(`http://localhost:8000/api/thread/${threadId}`,{withCredentials:true});
        return { success: true };
    } catch (err) {
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
};

export async function AllThread() {
    try{
        const response=await axios.get("http://localhost:8000/api/thread",{withCredentials:true});
        return { success: true, data: response.data };
    }catch(err){
        console.log(err);
        return {
            success: false,
            message: err.response?.data?.message || "Something went wrong"
        }
    }
}