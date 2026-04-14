import Chat from "./Chat";
import { ChatContext } from "../prompt.context";
import { useContext, useState, useEffect } from "react";
import { ScaleLoader } from "react-spinners";
import {Prompt} from "../service/chat.api";



function ChatWindows() {
    const { prompt, setNewChat, setPrompt, reply, setReply, currnentId, loading, setloading, setPrevChats, setOpenSidebar } = useContext(ChatContext);

    // input change
    const handleInput = (e) => {
        setPrompt(e.target.value);
    }

    // press Enter Key
    const handleKeydown = (e) => {
        if (e.key === "Enter") {
            getReply();
        } else {
            ""
        }
    };

    //prompt api call
    const getReply = async () => {
        setloading(true);
        setNewChat(false);

        // console.log(currnentId);
        // console.log(prompt);

        try {
           const response=await Prompt({
             threadId:currnentId,
             message:prompt
           })
        //    console.log(response.data.reply);
            setReply(response.data.reply);
        } catch (err) {
            console.log(err);
        }
        setloading(false);
    }


    useEffect(() => {
        if (prompt && reply) {
            setPrevChats(prevChats => (
                [...prevChats, {
                    role: "user",
                    content: prompt
                }, {
                    role: "assistant",
                    content: reply
                }]
            ));
        }
        setPrompt("");
    }, [reply])




    return (
        //  navbar
        <div className="flex flex-col w-full h-screen bg-[#212121]">
            <div className="flex justify-between items-center px-4 py-3">
                <div className="flex text-xl cursor-pointer items-center gap-3 ">
                    <span className="md:hidden" onClick={() => setOpenSidebar(true)}><i className="fa-solid fa-bars"></i></span>
                    <span className="hidden md:block text-sm  p-2 rounded-xl hover:bg-[#303030] cursor-pointer">SigmaGPT <i className="fa-solid fa-angle-down"></i></span>
                </div>

                <span className="md:hidden absolute left-1/2 -translate-x-1/2 text-sm p-2 rounded-xl hover:bg-[#303030] cursor-pointer">SigmaGPT <i className="fa-solid fa-angle-down"></i></span>
                <div className="my-4 mx-8  rounded-full cursor-pointer bg-blue-500">
                    <span className="text-black text-2xl"><i className=" fa-solid fa-user"></i></span>
                </div>
            </div>
            <div className="flex-1 overflow-auto sidebar px-2 md:px-6">
                <Chat />
            </div>


            {/* loader loading */}
            <ScaleLoader color="#fff" loading={loading} className="flex justify-center items-center w-full min-h-[50px] sm:min-h-[50px] md:min-h-[50px]" />

            {/* input */}
            <div className="p-3">
                <div className="relative max-w-[700px] mx-auto">
                    <input className="w-full outline-none focus:outline-none shadow-lg bg-[rgba(255,255,255,0.05)] p-[15px] rounded-2xl" type="text" placeholder="Ask anything" value={prompt} onChange={handleInput} onKeyDown={handleKeydown} />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer hover:text-[#fff]">
                        <i className="fa-solid fa-paper-plane " onClick={getReply}></i>
                    </div>
                </div>
                <p className="text-xs text-[#b4b4b4] text-center mt-2">ChatGPT can make mistakes. Check important info. See Cookie Preferences.</p>
            </div>
        </div>
    )
}

export default ChatWindows;