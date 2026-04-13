import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom"


function Protected({ children }) {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-6 bg-white rounded-lg shadow-lg animate-pulse">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">Loading.....</h1>
                </div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/login"}/>
    }
    return children
}

export default Protected