import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImCross } from "react-icons/im";
import { BsChatDots } from "react-icons/bs";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const Chatbot = () => {

    const { chatShow, setChatShow } = useContext(AuthContext)

    const [messages, setMessages] = useState([])
    const [input, setInput] = useState("")
    const [loading, setLoading] = useState(false)

    const chatEndRef = useRef(null)
    const api_base = "https://e-commerce-project-3365.onrender.com/public"

    // ✅ auto scroll fix
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading])

    // ✅ SEND MESSAGE
    const askChat = async () => {

        // stop empty + spam
        if (!input.trim() || loading) return;

        const userMessage = { text: input, sender: "user" }

        setMessages(prev => [...prev, userMessage])
        setInput("")
        setLoading(true)

        try {
            const response = await axios.post(`${api_base}/support`, {
                message: input
            })

            const botReply = {
                text: response.data.reply,
                sender: "bot"
            }

            setMessages(prev => [...prev, botReply])

        } catch (error) {
            setMessages(prev => [
                ...prev,
                { text: "Server error 😢", sender: "bot" }
            ])
        }

        setLoading(false)
    }

    // enter key
    const keyHandler = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            askChat()
        }
    }

    return (
        <div className={chatShow
            ? 'fixed z-10 p-2 right-0 bottom-0 w-[30%] h-[55%] border rounded-2xl bg-[#d1f0f4]'
            : 'hidden'}>

            <ImCross
                onClick={() => setChatShow(false)}
                className='absolute right-3 top-3 text-red-500 cursor-pointer'
            />

            {/* CHAT BOX */}
            <div className="chatBox h-[80%] overflow-y-auto p-2 space-y-2">

                {messages.map((chat, i) => (
                    <div key={i}
                        className={
                            chat.sender === "user"
                                ? "ml-auto bg-[#ffd6d6] p-2 rounded-xl max-w-[80%]"
                                : "mr-auto bg-white p-2 rounded-xl max-w-[80%]"
                        }>
                        {chat.text}
                    </div>
                ))}

                {/* 🤖 typing indicator */}
                {loading && (
                    <div className="flex items-center gap-2 text-gray-500">
                        <BsChatDots /> AI is typing...
                    </div>
                )}

                <div ref={chatEndRef}></div>
            </div>

            {/* INPUT */}
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={keyHandler}
                placeholder='Ask with AI 🤖'
                className='border p-2 w-full rounded mt-2'
            />
        </div>
    )
}

export default Chatbot