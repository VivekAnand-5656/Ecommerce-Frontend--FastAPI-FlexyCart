import axios from 'axios'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import boy from '../images/boy.png'
import boy2 from '../images/boy2.png'
import boy3 from '../images/boy3.png'
import boy4 from '../images/boy4.png'
import boy5 from '../images/boy5.png'
import women from '../images/women.png'
import men from '../images/men.png'
import elctronics from '../images/ect.png'
import shoes from '../images/sh.png'
import sale1 from '../images/sale1.png'
import sale2 from '../images/sale2.png'
import sale3 from '../images/sale3.png'
import cosmetic from '../images/cosm.png'
import { FaCircleArrowRight } from "react-icons/fa6";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { toast, Bounce } from 'react-toastify'

import { Carousel } from 'react-responsive-carousel'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Catagories from '../components/Catagories'
import Profile from '../components/Profile'
import { data, useNavigate } from 'react-router-dom'

const Hero = () => {
    const { token, cartlength, setCartlength, showProfileMenu, setShowProfileMenu, lengthwishlist, setLengthwishlist, iswishadd, setIswishadd, purchaseProduct,setPurchaseProduct,purchasePop,
        setPurchasePop, } = useContext(AuthContext)
    const [products, setProducts] = useState([])
    const [newArrivalProducts, setNewArrivalProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const [wishlist, setWishlist] = useState([])


    const images = [boy, boy2, boy3, boy4, boy5]
    const [active, setActive] = useState(null)

    const megasales = [sale1, sale2, sale3]

    const catg = [
        { img: women, name: "Women Fashion", navi: "womens" },
        { img: men, name: "Men Fashion", navi: "mens" },
        { img: elctronics, name: "Electronics", navi: "electronics" },
        { img: shoes, name: "Shoes", navi: "/" },
        { img: cosmetic, name: "Cosmetic", navi: "cosmetic" }
    ]

    // ---- All Products Fetch ------
    const api_base = "https://e-commerce-project-3365.onrender.com"
    // =========== But Product ========= 
    const buyProduct = async(productid)=>{
        try {
            const response = await axios.post(`${api_base}/users/buyproduct/${productid}`,{},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            const datas = response.data["Product"]
            console.log("Purchase Product:- ",datas);
            setPurchaseProduct(datas)
            setPurchasePop(true)
            toast.success("Buying Successfully 🎉", {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
            
        } catch (error) {
            console.log(`Error:- ${error}`);
            toast.error(`Product Buying Error :- ${error}`, {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
            
        }
    }
    const fetchProducts = async () => {
        try {
            console.log("Started")
            setLoading(true)
            const productRes = await axios.get(`${api_base}/users/products`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Products:- ", productRes.data)
            setLoading(false)
            setProducts(productRes.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
            setLoading(false)

        }
    }


    // ------ Fetch New Arrival Products -----------
    const fetchNewArrivalProducts = async () => {
        try {
            const arrivalRes = await axios.get(`${api_base}/users/allnewarrivalproducts`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Api Call Success")
            console.log("Api data:- ", arrivalRes.data)
            setNewArrivalProducts(arrivalRes.data)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }


    // ======= Cart Length ======
    const cartSize = async () => {
        try {
            const sizeres = await axios.get(`${api_base}/users/user-cart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            console.log("Size of Cart :- ", sizeres.data.length)
            setCartlength(sizeres.data.length)
        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }

    // ================ Add to Cart ===========
    const addCart = async (id) => {
        try {
            console.log("Cart Adding.....")
            const cartRes = await axios.post(`${api_base}/users/addtocart/${id}`, {},
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
            cartSize()
        } catch (error) {
            console.log(`Error:- ${error}`)
            toast.error("Cart not added !", {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
        }
    }
    // ==== Get Wishlist ===
    const getWishlist = async () => {
        try {
            const response = await axios.get(`${api_base}/users/getwishlists`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const datas = response.data
            console.log("Api data:- ", datas)
            setWishlist(datas)
            setLengthwishlist(datas.length)
            console.log("Len:- ", datas.length);

        } catch (error) {
            console.log(`Error:- ${error}`)
        }
    }
    // ===== Add to Wishlist =====
    const addtowishlist = async (id) => {
        try {
            const response = await axios.post(`${api_base}/users/addtowishlist/${id}`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            const datas = response.data
            console.log(" Wishlist Added Successfully :- ", datas)

            toast.success("Wishlist Added Successfully 🎉", {
                position: "top-center",
                autoClose: 1000,
                transition: Bounce
            });
            setIswishadd(datas.success)
            getWishlist()
            fetchProducts()

        } catch (error) {
            console.log(`Error:- ${error}`)
            toast.error("Product not added to Wishlist !", {
                position: "top-left",
                autoClose: 1000,
                transition: Bounce
            });
        }
    }

    // ==== Remove Wishlist ====
    const removeWishlist = async (id) => {
        try {
            const response = await axios.delete(`${api_base}/users/removewishlist/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            toast.success("Wishlist Removed Successfully 🎉", {
                position: "top-center",
                autoClose: 1000,
                transition: Bounce
            });
            console.log("Remove:- ", response.data);
            getWishlist()
            fetchProducts()

        } catch (error) {
            console.log(`Removal Error:- ${error}`)
            toast.error("Wishlist not Removed !", {
                position: "top-left",
                autoClose: 1000,
                transition: Bounce
            });
        }
    }
    useEffect(() => {
        if (!token) return

        const loadData = async () => {
            await Promise.all([
                fetchProducts(),
                fetchNewArrivalProducts(),
                cartSize(),
                getWishlist()
            ])
        }

        loadData()
    }, [token])


    return (
        <>
            <div className="w-full bg-slate-100 lg:p-6 p-1.5 flex flex-col gap-5 ">

                <Profile />
                {/* HERO */}
                <section className="lg:w-full w-full lg:h-[75vh] h-auto bg-linear-to-br from-[#000000] relative to-[#010447] lg:rounded-3xl rounded-2xl shadow-xl lg:flex-row flex flex-col lg:justify-between justify-center items-center lg:px-10 px-2 ">

                    {/* Left Text */}
                    <div className="lg:w-[40%] w-full h-[45%] lg:h-auto flex  flex-col lg:gap-6 gap-2 text-white ">
                        <h1 className="lg:text-5xl text-5xl  font-extrabold leading-tight">
                            <span className="text-[#ffef10]">Shop Smarter</span>
                            <br /> Live Better with Flexycart
                        </h1>

                        <p className="text-gray-600 lg:text-lg text-xl max-w-xl">
                            Your one-stop destination for electronics, fashion, gadgets and daily essentials.
                        </p>

                        <p className="lg:text-sm text-xl text-gray-400">
                            Fast delivery • Best prices • Trusted quality
                        </p>
                    </div>

                    {/* Right Image Hover Gallery */}
                    <div className="lg:w-[50%]  w-full lg:h-auto h-[40%] flex justify-center">
                        <div className="w-full lg:h-[85%] h-full lg:rounded-l-full flex  justify-center overflow-scroll lg:overflow-hidden   items-center lg:gap-4 gap-2 p-5">

                            {images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    className=" lg:w-[22%] w-[25%] lg:h-[80%] h-[60%] scroll-smooth object-cover lg:rounded-3xl rounded-2xl transition-all duration-300 hover:-translate-y-3 hover:scale-150 hover:shadow-2xl cursor-pointer" />
                            ))}

                        </div>
                    </div>

                </section>

                {/* MEGA SALE CAROUSEL */}
                <section className="flex justify-center">
                    <Carousel
                        className="lg:w-[75%] w-full lg:rounded-3xl rounded overflow-hidden shadow-xl"
                        autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3000}
                    >
                        {[sale1, sale2, sale3].map((img, i) => (
                            <div key={i}>
                                <img src={img} className="lg:h-[420px] h-70 w-full object-cover" />
                            </div>
                        ))}
                    </Carousel>
                </section>

                {/* CATEGORIES */}
                <section className="flex flex-col items-center lg:gap-5 gap-2 relative ">
                    <h2 className="lg:text-3xl text-2xl font-bold">Shop by Categories</h2>

                    <div className=" flex flex-wrap relative justify-center lg:gap-8 gap-2 bg-yellow-100 lg:p-5 p-2 rounded-3xl shadow-inner w-full">
                        {catg.map(item => (
                            <div
                                onClick={() => navigate(item.navi)}
                                key={item.name}
                                className="lg:w-25 w-20 bg-white lg:rounded-2xl rounded p-2 flex flex-col items-center gap-2 shadow hover:shadow-xl hover:-translate-y-1 transition cursor-pointer">
                                <img src={item.img} className="lg:h-15 h-10 " />
                                <p className="font-semibold text-[0.7rem] ">{item.name}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* NEW ARRIVALS */}
                <section className="flex flex-col items-center gap-5">
                    <div className="flex flex-wrap justify-center gap-5">
                        {newArrivalProducts.map(item => (
                            <div key={item.id}
                                className="w-60 bg-white rounded-3xl shadow hover:shadow-2xl transition overflow-hidden relative">
                                <span className="absolute top-3 left-3  bg-yellow-400 px-3 py-1 rounded-full text-xs font-bold">
                                    Trending
                                </span>
                                <img src={item.image} className="h-44 w-full object-cover" />
                                <div className="p-4 text-center">
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-green-600 font-bold">₹ {item.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ALL PRODUCTS */}
                <section className="flex flex-col items-center bg-[#f4f6fb] py-2 rounded-3xl">

                    {/* <h2 className="text-4xl font-bold mb-12 tracking-wide text-slate-800">
                        All Products
                    </h2> */}

                    <div className="flex flex-wrap justify-center lg:gap-10 gap-5">

                        {products.map(item => (
                            <div
                                key={item.id}
                                className="relative lg:w-[240px] w-48 bg-white p-4 rounded-3xl flex flex-col shadow-md hover:shadow-2xl hover:-translate-y-1 transition duration-300"
                            >

                                {/* HEART ICON */}
                                <div className="absolute right-4 top-4 text-xl">
                                    {
                                        wishlist.some(itm => itm.product_id === item.id) ? (
                                            <FaHeart
                                                onClick={() => {
                                                    const wishitem = wishlist.find(w => w.product_id === item.id)
                                                    removeWishlist(wishitem.id)
                                                }}
                                                className="text-red-500 cursor-pointer hover:scale-125 transition"
                                            />
                                        ) : (
                                            <FaRegHeart
                                                onClick={() => addtowishlist(item.id)}
                                                className="cursor-pointer hover:scale-125 transition"
                                            />
                                        )
                                    }
                                </div>

                                {/* IMAGE */}
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="h-[190px] w-full object-cover rounded-2xl"
                                />

                                {/* INFO */}
                                <h3 className="font-semibold mt-4 line-clamp-1">{item.name}</h3>
                                <p className="text-sm text-gray-500 line-clamp-1">
                                    {item.description}
                                </p>

                                {/* PRICE */}
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xl font-bold text-green-600">
                                        ₹{item.disc_price}
                                    </span>
                                    <span className="text-gray-400 line-through text-sm">
                                        ₹{item.price}
                                    </span>
                                </div>

                                {/* BUTTON */}
                                <div
                                    className="mt-4  text-white py-2 rounded-xl font-semibold transition flex justify-between "

                                >
                                    <button
                                        onClick={() => addCart(item.id)}
                                        className="bg-black p-1.5 cursor-pointer   text-white  rounded-xl font-semibold transition"
                                    >
                                        Add to Cart
                                    </button>
                                    <button
                                    onClick={()=>buyProduct(item.id)}
                                        className="bg-[#de9905] p-1.5 cursor-pointer  not-even: text-white rounded-xl font-semibold transition"
                                    >
                                        Buy Now
                                    </button>

                                </div>

                            </div>
                        ))}

                    </div>
                </section>

            </div>
        </>
    )
}

export default Hero