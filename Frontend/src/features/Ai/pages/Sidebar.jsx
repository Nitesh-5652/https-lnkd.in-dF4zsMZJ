import "../style/Sidebar.css"
import { ChatContext } from "../prompt.context";
import { useContext, useEffect } from "react";
import { useAuth } from "../../userAuth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
import { DeleteThreasd, AllThread, ThreadById } from "../service/chat.api"


function Sidebar() {
    const { allThreads, setcurrnentId, setPrompt, setReply, setPrevChats, setAllThreads, setNewChat, currnentId, openSidebar, setOpenSidebar } = useContext(ChatContext);
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    //   done

    //show all thread
    const getAllThread = async () => {
        try {
            const response = await AllThread();
            const res = response.data;
            const filteredData = res.map(thread => ({ threadId: thread.threadId, title: thread.title }));
            // console.log(filteredData);
            setAllThreads(filteredData);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllThread();
    }, [currnentId]);


    //creare new Chat
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setcurrnentId(uuidv1());
        setPrevChats([]);
    }

    //show prev Chat
    const changeThread = async (newthreadId) => {
        setcurrnentId(newthreadId);

        try {
            const response = await ThreadById(newthreadId);
            const res = response.data;
            //  console.log(res);
            setPrevChats(res);
            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log(err);
        }
    }

    // logout
    const handlelogout = async () => {
        try {
            await handleLogout();
            navigate("/login");
        } catch (err) {
            console.log(err);
        }
    }

    //delete api call
    const deleteThread = async (threadId) => {
        try {
            const response = await DeleteThreasd(threadId);
            // console.log(res);

            //re-load chat
            setAllThreads(prev => prev.filter(thread => thread.threadId !== threadId));

            if (threadId === currnentId) {
                createNewChat();
            }
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            {
                openSidebar && (
                    <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setOpenSidebar(false)}></div>
                )
            }
            <div className={`fixed md:static top-0 left-0 h-screen w-70 bg-[#171717] p-3 flex flex-col z-50  transition-transform duration-300 ${openSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
                {/* GPT logo */}

                <div className="w-60 px-2 py-2 bg-[rgba(180,180,180,0.05)] hover:bg-[rgba(180,180,180,0.09)] rounded-2xl">
                    <button className="flex justify-between items-center w-full">
                        <img className="w-6 h-6 rounded-full" src="src/assets/images.png" alt="GPT Logo" />
                        <i className="fa-solid fa-pen-to-square cursor-pointer text-white text-xl" onClick={createNewChat}></i>
                    </button>
                </div>

                {/* history */}

                <div className="flex-grow mt-6 overflow-auto sidebar">
                    <ul className="space-y-3 text-white text-sm">
                        {
                            allThreads?.map((thread, idx) => (
                                <li className="flex justify-between items-center group hover:bg-[rgba(180,180,180,0.05)] rounded-md p-2 cursor-pointer wrap-break-word" key={idx} onClick={(e) => { changeThread(thread.threadId); setOpenSidebar(false); }}>{thread.title} <span className="hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><i className=" fa-solid fa-trash" onClick={(e) => {
                                    e.stopPropagation();
                                    deleteThread(thread.threadId)
                                }}></i></span></li>
                            ))
                        }
                    </ul>
                </div>

                {/* logout */}

                <div className="text-white text-center mt-4">
                    <div className=" p-2 hover:bg-[#313131] rounded-2xl">
                        <button className="text-sm md:text-lg cursor-pointer" onClick={handlelogout}>Log out</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Sidebar;