import React, { useContext, useEffect, useState } from 'react'

import price from '../images/price.png'
import wide from '../images/wide.png'
import smooth from '../images/smooth.png'
import secure from '../images/secure.png'
import acc from '../images/acc.png'
import ad from '../images/ad.png'
import ect from '../images/ect.png'
import fsh from '../images/fsh.png'
import hm from '../images/hm.png'
import sh from '../images/sh.png'
import { AuthContext } from '../context/AuthContext'
import Hero from './Hero'
import axios from 'axios'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify'
import mobile from '../images/mobile.png'
import combo from '../images/combo.png'
import chasma from '../images/chasma.png'
import watch from '../images/watch.png'
import Mens from '../catagories/Mens'
import Chatbot from '../ChatBot/Chatbot'
import { FcAssistant } from "react-icons/fc";

const Home = () => {
    const { isLoggedIn, token, catagories, setAllProducts, chatShow,setChatShow } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const api_base = "https://e-commerce-project-3365.onrender.com/public"
    const BASE_URL = "https://e-commerce-project-3365.onrender.com"
    const fetchProducts = async () => {
        try {
            console.log("Started")
            setLoading(true)
            const productRes = await axios.get(`${api_base}/products`)
            console.log("Products:- ", productRes.data)
            setLoading(false)
            console.log("APi Succed");

            setProducts(productRes.data)
            setAllProducts(productRes.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
            setLoading(false)

        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

    // === Cart not valid ====
    const addCart = async (id) => {
        if (!token) {
            return toast.error("Please login❗", {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
        }
        try {
            console.log("Cart Adding.....")
            const cartRes = await axios.post(`${api_base}/addtocart/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Cart Added Successfully :- ", cartRes.data)

            toast.success("Cart Added Successfully 🎉", {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
            await cartSize()
        } catch (error) {
            console.log(`Error:- ${error}`)
            toast.error("Cart not added !", {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
        }
    }

    return (
        <>
            {
                isLoggedIn && catagories === "/" ? (
                    <>
                        <Hero />
                    </>
                ) : catagories === "mens" ? (
                    <Mens />
                ) : (
                    <>
                        <div className="min-w-screen flex flex-col  lg:gap-10 gap-3 p-2 bg-slate-100">
                            {/* ---- ChatBot ---- */}
                            <FcAssistant 
                            onClick={()=>setChatShow(true)}
                            className={chatShow?' fixed hidden z-10 right-5 bottom-0':'text-5xl fixed z-10 right-5 bottom-5 cursor-pointer'} />
                            <Chatbot/>

                            {/* HERO */}
                            <section className=" w-full  lg:h-[75vh] h-screen bg-linear-to-br from-[#000000] relative to-[#010447]  text-white lg:rounded-3xl rounded-br-4xl shadow-xl lg:flex-row flex flex-col lg:justify-center justify-between items-center text-center p-2">
                                <div className='lg:w-[40%] w-full h-[40%] lg:text-start text-justify flex flex-col  justify-center ' >
                                    <h1 className="lg:text-5xl text-xl font-extrabold leading-tight lg:max-w-xl ">
                                        Shop Smarter. Live Better with <span className='text-[#FB7513]' >Flexycart</span>
                                    </h1>

                                    <p className="lg:mt-5 text-xl lg:text-lg  lg:max-w-2xl text-blue-100">
                                        Your one-stop eCommerce destination for electronics, fashion, gadgets and daily essentials.
                                    </p>

                                    {/* <div className="flex gap-4 mt-8">
                                        <button className="px-6 py-3 bg-white text-blue-700 rounded-xl font-semibold hover:scale-105 transition">
                                            🛍️ Start Shopping
                                        </button>
                                        <button className="px-6 py-3 border border-white rounded-xl hover:bg-white hover:text-blue-700 transition">
                                            🔍 Explore Products
                                        </button>
                                    </div> */}

                                    <p className="lg:mt-6 mt-0 text-sm text-blue-100">
                                        Fast delivery • Best prices • Trusted quality
                                    </p>
                                </div>
                                <div className="  lg:w-[50%] w-full lg:h-full h-[55%] relative flex justify-center items-center">

                                    {/* Glow background */}
                                    <div className="  absolute w-[420px] h-[420px] bg-blue-500/20 blur-3xl rounded-full"></div>

                                    {/* Main phone card */}
                                    <div className="absolute top-5 left-35 lg:w-48 w-40 lg:h-60 h-36 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-4 rotate-[-10deg] hover:z-50 hover:scale-110 ease-linear cursor-pointer hover:rotate-0 transition duration-200">
                                        <img src={mobile} className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>

                                    {/* Watch card */}
                                    <div className="absolute bottom-30 left-5 lg:w-48 w-40 lg:h-60 h-36 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 lg:p-4 p-2 rotate-12 hover:z-50 hover:scale-110 ease-linear cursor-pointer  hover:rotate-0 transition duration-500">
                                        <img src={watch} className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>

                                    {/* Glasses card */}
                                    <div className="absolute top-25 right-25 lg:w-48 w-40 lg:h-60 h-36 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-4 rotate-[8deg] hover:z-50 hover:scale-110 ease-linear cursor-pointer hover:rotate-0 transition duration-500">
                                        <img src={chasma} className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>

                                </div>
                            </section>



                            {/* CATEGORIES
                            // <section className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
                            //     <h2 className="text-3xl font-bold mb-10 text-slate-800">Shop by Categories</h2>

                            //     <div className="flex flex-wrap justify-center gap-10">
                            //         {[ect, fsh, sh, acc, hm, ad].map((img, i) => (
                            //             <div key={i} className="w-40 flex flex-col items-center cursor-pointer hover:scale-110 transition">
                            //                 <img src={img} className="h-24" />
                            //                 <p className="mt-3 font-semibold text-blue-700 text-center">Category</p>
                            //             </div>
                            //         ))}
                            //     </div>
                            // </section> */}

                            {/* PRODUCTS */}
                            <section className="flex flex-col items-center bg-[#f4f6fb] py-2 rounded-3xl">

                                <h2 className="lg:text-3xl text-xl font-bold lg:mb-5 mb-2 tracking-wide text-slate-800">
                                    Trending Products
                                </h2>

                                <div className="flex flex-wrap justify-center lg:gap-10 gap-5 ">
                                    {products.map((item) => (
                                        <div
                                            key={item.id}
                                            className="lg:w-[240px] w-48 bg-white p-4 rounded-3xl flex flex-col shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                                        >
                                            <img
                                                src={item.image}
                                                className="h-[190px] w-full object-cover rounded-2xl"
                                            />

                                            <h3 className="font-semibold mt-4 line-clamp-1">{item.name}</h3>

                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-xl font-bold text-green-600">
                                                    ₹{item.disc_price}
                                                </span>
                                                <span className="text-gray-400 line-through text-sm">
                                                    ₹{item.price}
                                                </span>
                                            </div>

                                            <button
                                                onClick={() => addCart(item.id)}
                                                className="mt-4 bg-black hover:bg-gray-800 text-white py-2 rounded-xl font-semibold transition"
                                            >
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* FEATURES */}
                            <section className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
                                <h2 className="text-3xl font-bold mb-10 text-slate-800">What Makes Flexycart Special?</h2>

                                <div className="flex flex-wrap justify-center gap-6">
                                    {["⚡ Fast Checkout", "🔒 Secure Payments", "🚚 Fast Delivery", "🔄 Easy Returns", "💬 24/7 Support"].map((f, i) => (
                                        <div key={i} className="px-6 py-3 bg-blue-50 text-blue-700 rounded-xl shadow hover:scale-105 transition">
                                            {f}
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* DEAL BANNER */}
                            <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl shadow-xl p-12 text-center">
                                <h2 className="text-4xl font-bold mb-4">Big Deals, Bigger Savings 🔥</h2>
                                <p className="mb-6 text-blue-100">Get up to 70% OFF on selected products.</p>
                                <button className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
                                    Grab Deals Now
                                </button>
                            </section>
                            {/* WHY CHOOSE */}
                            <section className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
                                <h2 className="text-3xl font-bold mb-2 text-slate-800">Why Choose Flexycart?</h2>
                                <p className="text-slate-500 mb-10 text-center max-w-xl">
                                    A modern shopping platform built for speed, simplicity and trust.
                                </p>

                                <div className="flex flex-wrap justify-center gap-8">
                                    {[price, wide, smooth, secure].map((img, i) => (
                                        <div key={i} className="w-60 bg-blue-50 p-6 rounded-2xl shadow hover:shadow-xl hover:-translate-y-1 transition text-center">
                                            <img src={img} className="h-24 mx-auto mb-4" />
                                            <h3 className="font-semibold text-lg text-blue-700">Premium Experience</h3>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* TESTIMONIALS */}
                            <section className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center">
                                <h2 className="text-3xl font-bold mb-10 text-slate-800">What Customers Say</h2>

                                <div className="flex flex-wrap justify-center gap-8">
                                    {["Amazing experience!", "My daily shopping app", "Best prices ever"].map((t, i) => (
                                        <div key={i} className="w-72 bg-blue-50 p-6 rounded-2xl shadow text-center">
                                            ⭐⭐⭐⭐⭐
                                            <p className="mt-3 text-slate-600">{t}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>

                        </div>
                    </>
                )
            }

        </>
    )
}

export default Home