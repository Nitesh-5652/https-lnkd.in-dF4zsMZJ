import { createContext, useContext, useEffect, useState } from "react";
import { Prompt } from "./service/chat.api";
import { v1 as uuidv1 } from "uuid";


export const ChatContext = createContext()

export const ChatProvider = ({ children }) => {
    const [prompt, setPrompt] = useState("");
    const [reply, setReply] = useState(null);
    const [currnentId, setcurrnentId] = useState(uuidv1());
    const [loading, setloading] = useState(false);
    const [prevChats, setPrevChats] = useState([]);
    const [newChat, setNewChat] = useState(true);
    const [allThreads, setAllThreads] = useState([]);
    const [openSidebar,setOpenSidebar]=useState(false);

    const value = {
        prompt, setPrompt,
        reply, setReply,
        currnentId, setcurrnentId,
        loading, setloading,
        newChat, setNewChat,
        prevChats, setPrevChats,
        allThreads, setAllThreads,
        openSidebar,setOpenSidebar
    };

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

