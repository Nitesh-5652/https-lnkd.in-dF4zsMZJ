import ChatWindows from "./ChatWindows"
import Sidebar from "./Sidebar"

function Home(){
    return(
        <div className="text-[#ececec] bg-[#212121] flex h-screen overflow-hidden">
            <Sidebar/>
            <ChatWindows/>
        </div>
    )
}

export default Home