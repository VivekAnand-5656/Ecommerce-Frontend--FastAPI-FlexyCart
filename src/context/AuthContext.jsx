import React, { createContext, useState } from 'react'
export const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem("token"));
    const [cartlength,setCartlength] = useState(0)
    const [showProfileMenu,setShowProfileMenu] = useState(false)
    const [catagories,setCatagories] = useState("/")
    const [allProducts,setAllProducts] = useState([])
    const [searchQuery,setSearchQuery] = useState("")
    const [lengthwishlist,setLengthwishlist] = useState(0)
    const [iswishadd,setIswishadd] = useState(false)
    const [chatShow,setChatShow] = useState(false)
    const login = (jwt)=>{
        setToken(jwt)
        localStorage.setItem("token", jwt)
        setIsLoggedIn(true)
    }
    const logout = ()=>{
        setToken(null)
        setIsLoggedIn(false)
        localStorage.removeItem("token")

    }
  return ( 
    <AuthContext.Provider value={
        {
            token,isLoggedIn,login,logout,cartlength,setCartlength,showProfileMenu,setShowProfileMenu,catagories,setCatagories,allProducts,setAllProducts,searchQuery,setSearchQuery,lengthwishlist,setLengthwishlist,iswishadd,setIswishadd, chatShow, setChatShow
        }
    } >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider