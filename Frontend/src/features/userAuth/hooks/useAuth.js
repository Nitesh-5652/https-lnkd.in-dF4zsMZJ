import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, logout, register, getme } from "../service/Auth.api";

export const useAuth = () => {
    const context = useContext(AuthContext);

    const { user, setuser, loading, setLoading } = context;

    
    const handleRegister = async ({ username, email, password }) => {
        try {
            setLoading(true);
            const data = await register({ username, email, password });
            console.log(data.data.user)
            setuser(data.data.user);
            return data;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false)
        }
    }

    const handleLogin = async ({ email, password }) => {
        try {
            setLoading(true);
            const data = await login({ email, password });
            setuser(data.data.user);
            return data;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        try {
            setLoading(true);
            const data = await logout();
            setuser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return { user, loading, handleRegister, handleLogin, handleLogout };
}