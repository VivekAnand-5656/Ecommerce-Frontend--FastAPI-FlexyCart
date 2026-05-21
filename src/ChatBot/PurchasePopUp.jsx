import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { ImCross } from "react-icons/im";
import { toast, Bounce } from 'react-toastify';


const PurchasePopUp = () => {

    const {
        purchasePop,
        setPurchasePop,
        purchaseProduct,
        setPurchaseProduct,
        token
    } = useContext(AuthContext)

    const api_base = "https://e-commerce-project-3365.onrender.com"

    // ===== Form State =====
    const [formData, setFormData] = useState({

        quantity: 1,

        address: {
            street: "",
            district: "",
            state: "",
            pincode: ""
        },

        paymentMethod: "upi"
    })

    // ===== Handle Input =====
    const changeHandler = (e) => {

        const { name, value } = e.target

        // Address Fields
        if (
            name === "street" ||
            name === "district" ||
            name === "state" ||
            name === "pincode"
        ) {

            setFormData((prev) => ({
                ...prev,

                address: {
                    ...prev.address,
                    [name]: value
                }
            }))
        }

        // Quantity & Payment Method
        else {

            setFormData((prev) => ({
                ...prev,
                [name]: value
            }))
        }
    }

    // ===== Place Order =====
    const placeOrder = async (e) => {

        e.preventDefault()

        try {
            const body = {

                address: {
                    street: formData.address.street,
                    district: formData.address.district,
                    state: formData.address.state,
                    pincode: Number(formData.address.pincode)
                },

                paymentMethod: formData.paymentMethod
            }

            const response = await axios.post(

                `${api_base}/users/summaryorder/${formData.quantity}`,

                body,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log("Order Success:- ", response.data)

            toast.success(`${response.data.status}`, {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });

            setPurchasePop(false)

        } catch (error) {

            console.log("Order Error:- ", error)

            toast.error("Order Failed", {
                position: "top-center",
                autoClose: 2000,
                transition: Bounce
            });
        }
    }

    return (

        <div
            className={
                purchasePop            
                    ? 'w-[95%] sm:w-[85%] lg:w-[40vw] max-h-[90vh] overflow-y-auto p-4 rounded-2xl bg-white fixed top-1 left-1/2 -translate-x-1/2 -translate-y-1 flex flex-col lg:flex-row gap-5 shadow-2xl z-50 transition-all duration-300 scale-100 opacity-100'
                    : 'hidden'
            }
        >

            {/* Close Button */}
            <ImCross
                onClick={() => setPurchasePop(false)}
                className='absolute top-4 right-4 text-red-500 cursor-pointer text-lg hover:rotate-90 transition duration-300'
            />

            {/* ===== Product Card ===== */}

            <div
                className="w-full lg:w-[45%] bg-white p-4 rounded-3xl flex flex-col shadow-md hover:shadow-xl transition duration-300"
            >

                <img
                    src={purchaseProduct.image}
                    alt={purchaseProduct.name}
                    className="h-[220px] w-full object-cover rounded-2xl"
                />

                <h3 className="font-semibold mt-4 line-clamp-2 text-sm md:text-base">
                    {purchaseProduct.name}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-2">
                    {purchaseProduct.description}
                </p>

                <div className="flex items-center gap-2 mt-3">

                    <span className="text-xl font-bold text-green-600">
                        ₹{purchaseProduct.disc_price}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                        ₹{purchaseProduct.price}
                    </span>

                </div>

            </div>

            {/* ===== Form Section ===== */}

            <div className='w-full lg:w-[55%] p-2' >

                <label className='font-medium'>
                    Quantity
                </label>

                <select
                    name="quantity"
                    onChange={changeHandler}
                    value={formData.quantity}
                    className='w-full border p-2 rounded mt-1 outline-none'
                >

                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>

                </select>

                <form
                    onSubmit={placeOrder}
                    className='w-full flex flex-col gap-3 mt-4'
                >

                    <h1 className='font-bold text-xl'>
                        Add Address
                    </h1>

                    <input
                        type="text"
                        name="street"
                        placeholder='Street'
                        onChange={changeHandler}
                        className='border p-2 rounded outline-none focus:border-[#f5aa07] transition duration-200'
                    />

                    <input
                        type="text"
                        name="district"
                        placeholder='District'
                        onChange={changeHandler}
                        className='border p-2 rounded outline-none focus:border-[#f5aa07] transition duration-200'
                    />

                    <input
                        type="text"
                        name="state"
                        placeholder='State'
                        onChange={changeHandler}
                        className='border p-2 rounded outline-none focus:border-[#f5aa07] transition duration-200'
                    />

                    <input
                        type="number"
                        name="pincode"
                        placeholder='Enter PIN Code'
                        onChange={changeHandler}
                        className='border p-2 rounded outline-none focus:border-[#f5aa07] transition duration-200'
                    />

                    <select
                        name="paymentMethod"
                        onChange={changeHandler}
                        className='border p-2 rounded outline-none focus:border-[#f5aa07] transition duration-200'
                    >

                        <option value="upi">UPI</option>
                        <option value="cash">Cash</option>
                        <option value="netbanking">Net Banking</option>
                        <option value="card">Card</option>

                    </select>

                    <button
                        type='submit'
                        className='bg-[#f5aa07] p-3 rounded font-semibold hover:scale-[1.02] active:scale-[0.98] transition duration-200'
                    >
                        Place Order
                    </button>

                </form>

            </div>

        </div>
    )
}

export default PurchasePopUp