import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Wishlist = () => {
  const { token } = useContext(AuthContext);
  const [wishlists, setWishlists] = useState([]);

  const api_base = "https://e-commerce-project-3365.onrender.com";

  const getWishlists = async () => {
    try {
      const response = await axios.get(`${api_base}/users/getwishlists`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlists(response.data);
    } catch (error) {
      console.log(`Error:- ${error}`);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(`${api_base}/users/removewishlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.success("Wishlist Removed Successfully 🎉", {
        position: "top-center",
        autoClose: 1000,
        transition: Bounce
      });

      setWishlists(prev => prev.filter(item => item.id !== id));
      getWishlists();
    } catch (error) {
      console.log(`Removal Error:- ${error}`);
      toast.error("Wishlist not Removed !", {
        position: "top-left",
        autoClose: 1000,
        transition: Bounce
      });
    }
  };

  useEffect(() => {
    getWishlists();
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#f5f7fb] sm:py-10 flex justify-center">
      
      {/* Main Card */}
      <div className="sm:w-[75%] w-[95%] bg-white rounded-3xl shadow-lg p-6 sm:p-8">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold">My Wishlist ❤️</h1>
          <span className="bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm">
            {wishlists.length} items
          </span>
        </div>

        {/* Wishlist Container */}
        <div className="max-h-[520px] overflow-y-auto pr-2">

          {wishlists.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-400 text-lg">
              Your wishlist is empty 😢
            </div>
          ) : (

            /* GRID RESPONSIVE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">

              {wishlists.map((item) => (
                <div
                  key={item.id}
                  className="flex sm:flex-row flex-col w-full min-h-[160px] justify-between items-center border bg-[#fafafa] p-3 sm:p-4 rounded-2xl hover:shadow-md transition"
                >

                  {/* LEFT SIDE */}
                  <div className="flex sm:flex-row flex-col items-center gap-3 sm:gap-5 w-full sm:w-auto">

                    <img
                      src={item.product.image}
                      className="w-full sm:w-[95px] h-[140px] sm:h-[95px] object-cover rounded-xl"
                    />

                    <div className="flex flex-col gap-1 w-full text-center sm:text-left">
                      <h2 className="font-semibold sm:text-lg text-[0.95rem] line-clamp-1">
                        {item.product.name}
                      </h2>

                      <div className="flex justify-center sm:justify-between gap-3">
                        <p className="text-green-600 font-bold sm:text-lg">
                          ₹ {item.product.disc_price}
                        </p>
                        <p className="text-gray-400 line-through text-sm">
                          ₹ {item.product.price}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT BUTTONS */}
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">

                    <button className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-medium transition">
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeWishlist(item.id)}
                      className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl font-medium transition"
                    >
                      Remove
                    </button>

                  </div>
                </div>
              ))}

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;