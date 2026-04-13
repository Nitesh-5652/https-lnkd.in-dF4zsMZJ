import { RouterProvider } from "react-router-dom"
import { router } from "./app.routes";
import { AuthProvider } from "./features/userAuth/auth.context";
import { ChatProvider } from "./features/Ai/prompt.context";


function App(){
  return(
    <AuthProvider>
     <ChatProvider>
       <RouterProvider router={router}/>
     </ChatProvider>
    </AuthProvider>
  )
}

export default App;