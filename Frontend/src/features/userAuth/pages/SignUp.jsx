import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";



function SignUp() {

    const { handleRegister, loading } = useAuth();
    const navigate = useNavigate();
    const [user, setuser] = useState({
        username: "",
        email: "",
        password: ""
    });
    const [error, seterror] = useState({});

    const handleform = (e) => {
        setuser({
            ...user,
            [e.target.name]: e.target.value
        })

        seterror({
            ...error,
            [e.target.name]: ""
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);
        const newError = {};
        if (!user.username) {
            newError.username = "Username is required"
        }
        if (!user.email) {
            newError.email = "Email is required"
        }
        if (!user.password) {
            newError.password = "Password is required"
        }
        seterror(newError);

        if (Object.keys(newError).length > 0) {
            return
        }
        try {
            await handleRegister(user);
            setuser({
                username: "",
                email: "",
                password: ""
            });
            navigate("/");
        } catch (err) {
            console.log(err);
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center p-6 bg-white rounded-lg shadow-lg animate-pulse">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
                        Loading.....
                    </h1>
                </div>
            </div>
        )
    }
    return (
        <main className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-gray-900  px-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl flex flex-col gap-5">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800">Register</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="username" className="font-medium text-gray-700">Username</label>
                        <input onChange={handleform} value={user.username} type="text" id='username' name='username' placeholder='Enter your username' className="px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base" />
                        {
                            error.username && (
                                <p className="text-red-500 text-sm">{error.username}</p>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="email" className="font-medium text-gray-700">Email</label>
                        <input onChange={handleform} value={user.email} type="email" id='email' name='email' placeholder='Enter your email' className="px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base" />
                        {
                            error.email && (
                                <p className="text-red-500 text-sm">{error.email}</p>
                            )
                        }
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="password" className="font-medium text-gray-700">Password</label>
                        <input onChange={handleform} value={user.password} type="password" id='password' name='password' placeholder='Enter your password' className="px-4 py-3 rounded-xl border border-gray-300 outline-none focus:ring-1 focus:ring-blue-500 text-sm sm:text-base" />
                        {
                            error.password && (
                                <p className="text-red-500 text-sm">{error.password}</p>
                            )
                        }
                    </div>
                    <button className="mt-2 px-6 py-3 rounded-2xl bg-blue-500 text-white cursor-pointer text-base sm:text-lg font-bold hover:bg-blue-400 transition-all duration-300"> SignUp </button>
                </form>
                <p className=" text-center text-gray-800">Already have an account? <Link className="text-red-600" to={"/login"}>login</Link></p>
            </div>
        </main>
    )
}

export default SignUp;