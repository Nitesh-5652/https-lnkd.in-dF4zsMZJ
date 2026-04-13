import { createContext, useEffect, useState } from "react";
import {getme} from "../userAuth/service/Auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);
 

    useEffect(() => {
        const getAndSetUser = async () => {
            try {
                const data = await getme();
                // console.log(data.data.user);
                setuser(data.data.user);
            } catch (err) {
                console.log(err);
                setuser(null)
            }finally{
                setLoading(false)
            }
        }
        getAndSetUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setuser,loading,setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}