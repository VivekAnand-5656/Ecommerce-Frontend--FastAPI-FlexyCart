import React, { useContext, useState } from 'react'
import { ImCross } from "react-icons/im";
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';


const Chatbot = () => {
    const { chatShow, setChatShow } = useContext(AuthContext)
    const [msg,setMsg] = useState("")
    const api_base = "https://e-commerce-project-3365.onrender.com/public"

    const askChat = async(chat)=>{
        try {
            const response = await axios.post(`${api_base}/support`)
            // ==== Implement chatbot in frontend 
        } catch (error) {
            console.log(`Error:- ${error}`);
        }
    }

    return (
        <>
            <div
                className={chatShow ? 'fixed z-10 p-2 right-0 bottom-0 w-[30%] h-[55%] border-2 rounded-2xl bg-[#d1f0f4] ' : 'fixed hidden z-10 p-2 right-0 bottom-0 w-[30%] h-[55%] border-2 rounded-2xl bg-[#d1f0f4]  '} >
                <ImCross
                    onClick={() => setChatShow(false)}
                    className=' right-1 fixed text-[#ff0303] cursor-pointer ' />
                <div className=' w-full h-[80%] flex sm:flex-col ' >
                    <h1 className='rounded-2xl w-[50%] bg-[#ffffff] p-2' >AI Assistant</h1>
                    <h1 className=' self-end-safe w-[50%]  rounded-2xl bg-[#ffffff] p-2 ' >User</h1>
                </div>
                <input type="text" placeholder='Ask With AI🤖'
                    className=' border p-2 w-full rounded-4xl  ' />
            </div>
        </>
    )
}

export default Chatbot