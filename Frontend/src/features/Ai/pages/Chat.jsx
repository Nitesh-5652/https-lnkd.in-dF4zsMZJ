import { useContext, useState, useEffect } from "react"
import { ChatContext } from "../prompt.context"
import "../style/Sidebar.css"
import ReactMarkdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"

function Chat() {
    const { newChat, prevChats, reply } = useContext(ChatContext);
    const [latestReply, setlatestReply] = useState(null)

    useEffect(() => {
        if (reply === null) {
            setlatestReply(null);
            return;
        }

        // if (!reply) {
        //     setlatestReply(null);
        //     return;
        // }

        if (!prevChats?.length) return;

        const content = reply.split(" ");

        let idx = 0;
        const interval = setInterval(() => {
            setlatestReply(content.slice(0, idx + 1).join(" "));

            idx++;
            if (idx >= content.length) clearInterval(interval);
        }, 40);

        return () => clearInterval(interval);

    }, [prevChats, reply])

    return (
        <>

            <div className="w-full max-w-[700px] mx-auto px-3 py-6 space-y-4">

                {
                    newChat && <h1 className="text-xl text-[#b4b4b4] text-center">What’s on the agenda today?</h1>
                }

                {
                    prevChats?.slice(0, -1).map((chat, idx) =>
                        <div key={idx} className={chat.role === "user" ? "flex justify-end text-[0.9rem]" : "text-left text-[0.9rem]"}>
                            {
                                chat.role === "user" ? <p className="bg-[#323232]  py-[10px] px-[20px] rounded-2xl w-fit max-w-[80%] sm:max-w-[500px] wrap-break-word">{chat.content}</p> : <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )
                }


                {
                    prevChats.length > 0 && (
                        <>
                            {
                                latestReply === null ? (
                                    <div className="text-left text-[0.9rem] " key={"non-typing"} >
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length - 1].content}</ReactMarkdown>
                                    </div>
                                ) : (
                                    <div className="text-left text-[0.9rem]" key={"typing"} >
                                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                                    </div>
                                )

                            }
                        </>
                    )
                }



                {/* <div className="flex justify-end text-[0.9rem]">
                    <p className="bg-[#323232] py-[10px] px-[20px] rounded-2xl ml-[15rem]  max-w-full w-fit">User message</p>
                </div>
                <div className="text-left text-[0.9rem]">
                    <p>gpt generated message</p>
                </div> */}
            </div>
        </>
    )
}
export default Chat