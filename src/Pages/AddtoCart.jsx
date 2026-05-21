import React, { useContext, useEffect, useMemo, useState } from 'react'
import emptycart from '../images/empty.png'
import axios from 'axios'
import { toast, Bounce } from 'react-toastify'
import { AuthContext } from '../context/AuthContext'
import { FaTrash } from 'react-icons/fa'
import { FcMinus } from "react-icons/fc";
import { FcPlus } from 'react-icons/fc'
import { FcBusiness } from "react-icons/fc";
import { useNavigate } from 'react-router-dom'


const AddtoCart = () => {
  const { token, setCartlength } = useContext(AuthContext)
  const [allCarts, setAllCarts] = useState([])
  const [total, setTotal] = useState(0)
  const navigate = useNavigate()
  const api_base = "https://e-commerce-project-3365.onrender.com/"

  const fetchAllCarts = async () => {
    try {
      console.log("Carts Request Sending......")
      const cartRes = await axios.get(`${api_base}users/user-cart`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Carts:- ", cartRes.data)

      setAllCarts(cartRes.data)

    } catch (error) {
      console.log(`Error:- ${error} `)
    }
  }
  // ===== Total of CartTotal =======
  const sum = useMemo(() => {
    return allCarts.reduce((acc, item) => acc + item.carttotal, 0)
  }, [allCarts])
  console.log(`Sum :- ${sum}`)

  // ======= Increase Quantity ======= 
  const increaseQuantity = async (id) => {
    try {
      const plusRes = await axios.patch(`${api_base}users/updatequantity/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Quantity Increased.")
      await fetchAllCarts()
    } catch (error) {
      console.log(`Error :- ${error}`)
    }
  }
  // ======= Decrease Quantity ======= 

  const decreaseQuantity = async (id) => {
    try {
      const minusRes = await axios.patch(`${api_base}users/decreasequantity/${id}`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Quantity Decreased.")
      await fetchAllCarts()
    } catch (error) {
      console.log(`Error :- ${error}`)
    }
  }
  // ========= Remove Cart By Id ========
  const removeCart = async (id) => {
    try {
      const removeRes = await axios.delete(`${api_base}users/removecart/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Cart Removed")
      await fetchAllCarts()
      setCartlength(prev => prev - 1)
      toast.success("Item removed from cart 🗑️", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce
      });

    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }
  // ===== Clear ALl Cart ======
  const clearCart = async () => {
    try {
      setAllCarts([])
      setCartlength(0)
      const delet = await axios.delete(`${api_base}users/clearcart`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success("Cart cleared 🧹")

    } catch (error) {
      console.log(`Cart Clear Error:- ${error} `)
      fetchAllCarts()
    }
  }

  useEffect(() => {
    if (token) fetchAllCarts()
  }, [token])
  // ====== Order Place ------
  const placeOrder = async () => {
    try {
      const orderRes = await axios.post(`${api_base}users/orderplace`, {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log("Order Placed Successfully")
      toast.success("Order Placed Successfully 🎉", {
        position: "top-center",
        autoClose: 1000,
        transition: Bounce
      });
      await fetchAllCarts()
      setCartlength(0)
      navigate("/")

    } catch (error) {
      console.log(`Error:- ${error}`)
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#f6f9ff] flex flex-col items-center p-4 sm:p-6">

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#1e3a8a] mb-6 sm:mb-8">🛒 My Cart</h1>

      {/* MAIN WRAPPER */}
      <div className="w-full max-w-7xl flex flex-col lg:flex-row gap-6">

        {/* ================= LEFT : CART ITEMS ================= */}
        <div className="w-full lg:w-[68%] bg-white rounded-3xl shadow-xl p-4 sm:p-6 max-h-[70vh] overflow-y-auto">

          {allCarts.length === 0 ? (
            <div className="w-full h-full flex flex-col justify-center items-center text-center gap-4 py-20">
              <h1 className="text-xl sm:text-2xl font-semibold text-gray-600">Your cart feels lonely 🥺</h1>
              <button
                onClick={() => navigate("/")}
                className="bg-blue-600 hover:bg-[#011c55] text-white px-6 py-3 rounded-xl font-semibold transition">
                Continue Shopping
              </button>
            </div>
          ) : (
            allCarts.map((item) => (
              <div
                key={item.id}
                className="w-full flex flex-col sm:flex-row gap-4 sm:gap-6 mb-5 p-4 rounded-2xl border hover:shadow-lg transition bg-[#fbfdff]"
              >

                {/* Image */}
                <img
                  src={`${item.product.image}`}
                  alt=""
                  className="w-full sm:w-28 h-44 sm:h-28 object-cover rounded-xl"
                />

                {/* Info */}
                <div className="flex flex-col flex-1 text-center sm:text-left">
                  <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                    {item.product.name}
                  </h2>

                  <p className="text-xs text-gray-500 line-clamp-2">
                    {item.product.description}
                  </p>

                  <div className="flex justify-center sm:justify-start gap-3 mt-2 items-center">
                    <span className="text-xl font-bold text-blue-600">
                      ₹{item.product.disc_price}
                    </span>
                    <span className="text-gray-400 line-through">
                      ₹{item.product.price}
                    </span>
                  </div>
                </div>

                {/* Quantity + Delete */}
                <div className="flex sm:flex-col flex-row justify-between sm:justify-center items-center gap-4">

                  {/* Quantity */}
                  <div className="flex items-center gap-3 bg-white shadow px-3 py-2 rounded-xl">
                    <FcMinus
                      onClick={() => decreaseQuantity(item.product_id)}
                      className="cursor-pointer text-xl hover:scale-110"
                    />
                    <span className="font-bold">{item.quantity}</span>
                    <FcPlus
                      onClick={() => increaseQuantity(item.product_id)}
                      className="cursor-pointer text-xl hover:scale-110"
                    />
                  </div>

                  {/* Delete */}
                  <FaTrash
                    onClick={() => removeCart(item.id)}
                    className="text-red-500 cursor-pointer text-xl hover:scale-110"
                  />

                </div>
              </div>
            ))
          )}
        </div>

        {/* ================= RIGHT : SUMMARY ================= */}
        <div className="w-full lg:w-[32%] bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white rounded-3xl shadow-xl p-6 flex flex-col justify-between">

          <div>
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Order Summary</h2>
              <button
                onClick={clearCart}
                className="text-sm hover:text-red-300 transition">
                Clear Cart
              </button>
            </div>

            <div className="space-y-4 mt-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹ {sum}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-300">Free</span>
              </div>

              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-300">₹ 0</span>
              </div>

              <hr className="border-white/30" />

              <div className="flex justify-between text-2xl font-bold">
                <span>Total</span>
                <span>₹ {sum}</span>
              </div>

              <p className="text-sm text-gray-300">
                Taxes included • Delivery in 3–5 days
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8">
            <button
              onClick={placeOrder}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl transition">
              Place Order
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full mt-3 bg-white/20 hover:bg-white/30 py-3 rounded-xl transition">
              Continue Shopping
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AddtoCart