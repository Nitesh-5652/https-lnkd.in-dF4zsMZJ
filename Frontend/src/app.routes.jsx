import { createBrowserRouter } from "react-router-dom"
import Login from "./features/userAuth/pages/Login"
import SignUp from "./features/userAuth/pages/SignUp"
import Home from "./features/Ai/pages/Home"
import Protected from "./features/userAuth/components/Protected"

export const router=createBrowserRouter([
    {
        path:"/login",element:<Login/>
    },
    {
        path:"/register", element:<SignUp/>
    },
    {
        path:"/", element:<Protected><Home/></Protected>
    }
])