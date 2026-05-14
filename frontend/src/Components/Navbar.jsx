import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Button, NavDropdown } from "react-bootstrap";
import { FaBars, FaSearch, FaFacebookF, FaTwitter, FaPinterestP, FaInstagramSquare, } from "react-icons/fa";


export default function CustomNavbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });

  const [registerData, setRegisterData] = useState({
    email: "",
    password: ""
  });

  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
  };

  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value
    });
  };

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Login successful ✅");

        // ✅ Store token
        localStorage.setItem("token", data.token);

        // ✅ Store user info
        localStorage.setItem("user", JSON.stringify(data.user));

        // ✅ ADD THIS LINE
        setUser(data.user);

        // ✅ Close modal
        setShowAuth(false);

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(registerData)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Registered successfully ✅");
        console.log(data);

        // auto switch to login
        setAuthTab("login");

      } else {
        alert(data.message);
      }

    } catch (error) {
      console.error(error);
      alert("Registration failed ❌");
    }
  };

  // ============================
// CART STATE
// ============================

const [cartProducts, setCartProducts] = useState([]);

// ============================
// FETCH CART
// ============================

useEffect(() => {

    const fetchCart = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCartProducts(res.data.data);

        } catch (error) {

            console.log(error);
        }
    };

    fetchCart();

}, []);

// ============================
// LIVE UPDATE CART
// ============================

useEffect(() => {

    const fetchCartProducts = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/cart",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCartProducts(res.data.data);

        } catch (error) {

            console.log(error);
        }
    };

    window.addEventListener(
        "cartUpdated",
        fetchCartProducts
    );

    return () => {

        window.removeEventListener(
            "cartUpdated",
            fetchCartProducts
        );
    };

}, []);

// ============================
// REMOVE FROM CART
// ============================

const removeCartProduct = async (productId) => {

    try {

        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:5000/api/cart/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setCartProducts((prev) =>
            prev.filter(
                (item) =>
                    item.product._id !== productId
            )
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

    } catch (error) {

        console.log(error);
    }
};

  // ============================
// WISHLIST STATE
// ============================

const [wishlistProducts, setWishlistProducts] = useState([]);

// ============================
// FETCH WISHLIST
// ============================

useEffect(() => {

    const fetchWishlist = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/wishlist",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWishlistProducts(res.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    fetchWishlist();

}, []);

// ============================
// LIVE UPDATE WISHLIST
// ============================

useEffect(() => {

    const fetchWishlistProducts = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/wishlist",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setWishlistProducts(res.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    window.addEventListener("wishlistUpdated", fetchWishlistProducts);

    return () => {
        window.removeEventListener(
            "wishlistUpdated",
            fetchWishlistProducts
        );
    };

}, []);

// ============================
// REMOVE FROM WISHLIST
// ============================

const removeWishlistProduct = async (productId) => {

    try {

        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:5000/api/wishlist/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setWishlistProducts((prev) =>
            prev.filter((item) => item._id !== productId)
        );

        window.dispatchEvent(new Event("wishlistUpdated"));

    } catch (error) {

        console.error("REMOVE WISHLIST ERROR:", error);
    }
};
  const [compareProducts, setCompareProducts] = useState([]);

    useEffect(() => {

        const fetchCompare = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await axios.get(
                    "http://localhost:5000/api/compare",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setCompareProducts(res.data.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchCompare();

    }, []);

  const [categories, setCategories] = useState([]);
  useEffect(() => {

    const fetchCategories = async () => {
      try {

        const res = await axios.get(
          "http://localhost:5000/api/categories"
        );

        setCategories(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();

  }, []);

  useEffect(() => {

    const fetchCompareProducts = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/compare",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCompareProducts(res.data.data);
            window.dispatchEvent(new Event("compareUpdated"));

        } catch (error) {
            console.error("COMPARE FETCH ERROR:", error);
        }
    };

    fetchCompareProducts();

}, []);
useEffect(() => {

    const fetchCompareProducts = async () => {

        try {

            const token = localStorage.getItem("token");

            if (!token) return;

            const res = await axios.get(
                "http://localhost:5000/api/compare",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCompareProducts(res.data.data);

        } catch (error) {
            console.error(error);
        }
    };

    window.addEventListener("compareUpdated", fetchCompareProducts);

    return () => {
        window.removeEventListener("compareUpdated", fetchCompareProducts);
    };

}, []);
const removeCompareProduct = async (productId) => {

    try {

        const token = localStorage.getItem("token");

        await axios.delete(
            `http://localhost:5000/api/compare/${productId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setCompareProducts((prev) =>
            prev.filter((item) => item._id !== productId)
        );
        window.dispatchEvent(new Event("compareUpdated"));

    } catch (error) {
        console.error("REMOVE COMPARE ERROR:", error);
    }
};
  const [showPages, setShowPages] = useState(false);
  const pagesTimeout = useRef(null);
  const [showProduct, setShowProduct] = useState(false);
  const productTimeout = useRef(null);
  const [showTemplate, setShowTemplate] = useState(false);
  const templateTimeout = useRef(null);
  const [showShop, setShowShop] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [openPages, setOpenPages] = useState(false);
  const [openShop, setOpenShop] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openTemplate, setOpenTemplate] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);  
  const [showCompare, setShowCompare] = useState(false);  
  const [showheart, setShowheart] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authTab, setAuthTab] = useState("login"); // login | register
  useEffect(() => {
    if (showAuth) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [showAuth]);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <>
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
        }

        .menu-icon {
          width: 30px;
          height: 30px;
          object-fit: contain;
          cursor: pointer;
        }

        .view-cart-btn{
          width:50%;
          background:#6c63ff;
          color:white;
          border:none;
          padding:12px;
          border-radius:30px;
          font-weight:500;
          transition:0.3s;
      }

      .view-cart-btn:hover{
          background:black;
      }

      .checkout-sidebar-btn{
          width:50%;
          background:#f5d90a;
          color:black;
          border:none;
          padding:12px;
          border-radius:30px;
          font-weight:500;
          transition:0.3s;
      }

      .checkout-sidebar-btn:hover{
          background:black;
          color:white;
      }

        /* ===== Login/Register Modal ===== */\
        .account-modal {
          padding: 10px 5px;
        }

        .account-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .account-header h4 {
          font-weight: 500;
          margin: 0;
        }

        .account-badge {
          background: black;
          color: white;
          padding: 5px 10px;
          font-size: 12px;
          border-radius: 5px;
          font-weight: 600;
        }

        .account-menu {
          margin-top: 10px;
        }

        .account-menu p {
          margin: 12px 0;
          font-size: 15px;
          cursor: pointer;
        }

        .account-menu p a {
          text-decoration: none;
          color: black;
        }

        .account-menu p:hover {
          color: #6f5cc4;
        }

        .account-menu .logout {
          color: #333;
        }

        .account-menu .logout:hover {
          color: red;
        }

        /* ===== AUTH MODAL ===== */
        .auth-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
        }

        .auth-modal {
          width: 350px;
          background: white;
          padding: 30px;
          position: relative;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from {transform: translateY(20px); opacity:0;}
          to {transform: translateY(0); opacity:1;}
        }

        /* CLOSE */
        .auth-close {
          position: absolute;
          top: -60px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display:flex;
          align-items:center;
          justify-content:center;
          cursor:pointer;
          font-weight:bold;
        }

        /* TABS */
        .auth-tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-weight: 500;
        }

        .auth-tabs span {
          cursor: pointer;
          color: #888;
        }

        .auth-tabs .active {
          color: #6f5cc4;
          font-weight: 600;
        }

        /* BODY */
        .auth-body input {
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          border: 1px solid #ddd;
          margin-bottom: 15px;
          outline: none;
        }

        /* REMEMBER */
        .auth-remember {
          font-size: 13px;
          margin-bottom: 15px;
        }

        /* BUTTON */
        .auth-btn {
          width: 100%;
          padding: 12px;
          border-radius: 30px;
          background: black;
          color: white;
          border: none;
          margin-top: 10px;
        }

        /* LINKS */
        .auth-link {
          font-size: 13px;
          margin-top: 10px;
          cursor: pointer;
        }

        .auth-info {
          font-size: 13px;
          color: #666;
        }

        .auth-policy {
          font-size: 12px;
          background: #f5f5f5;
          padding: 10px;
          border-radius: 6px;
          margin-top: 10px;
        }

        /* MOBILE */
        @media(max-width:480px){
          .auth-modal{
            width: 90%;
            padding:20px;
          }
        }

        /* ===== TOP BAR ===== */
        .topbar {
          display: flex;
          background: white;
          font-size: 12px;
          padding: 10px 0;
          border-bottom: 1px solid #eee;
          font-weight: bold;
        }

        .topbar-container{
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }

        .topbar a{
          color: black;
          text-decoration: none;
        }

        .topbar-right span {
          margin-left: 15px;
          cursor: pointer;
        }

        .social-icons svg {
          margin-left: 12px;
          font-size: 13px;
          cursor: pointer;
        }

        /* ===== MAIN HEADER ===== */
        .logo-img {
          width: 60%;
          margin-left: 5%;
        }

        /* SEARCH */
        .search-wrapper {
          border: 1px solid #ddd;
          border-radius: 40px;
          overflow: hidden;
          height: 50px;
        }

        .search-category {
          background: white;
          padding: 0 15px;
          display: flex;
          align-items: center;
          border-right: 1px solid #ddd;
        }

        .search-input {
          border: none;
          outline: none;
          flex: 1;
          padding-left: 15px;
        }

        .search-btn {
          background: #6f5cc4;
          border-radius: 50%;
          width: 49px;
          height: 49px;
          border: none;
          color: white;
          margin-left: -15px;
        }

        /* ===== COMPARE SIDEBAR ===== */
        .compare-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.4);
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
          z-index: 999;
        }

        .compare-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .compare-sidebar {
          overflow-y: scroll;
          position: fixed;
          top: 0;
          right: -420px;
          width: 400px;
          height: 100%;
          background: white;
          transition: 0.3s ease;
          z-index: 1000;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .compare-sidebar.open {
          right: 0;
        }

        /* HEADER */
        .compare-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 20px;
          border-bottom: 2px solid #eee;
          padding: 0 0 15px;
        }

        .compare-icons {
          display: flex;
          align-items: center;
          gap: 15px;
          position: relative;
        }

        .compare-icons i {
          font-size: 22px;
          font-weight: bold;
        }

        /* CONTENT */
        .compare-content {
          margin-top: 20px;
        }

        .compare-content h5 {
          font-weight: 600;
          margin-bottom: 20px;
          padding: 25px 0 15px;
          border-bottom: 2px solid #eee;
        }

        /* EMPTY STATE */
        .empty-compare {
          text-align: center;
          color: #777;
          display: flex;
          gap: 15px;
          margin-top: 25px;
        }

        .empty-compare i {
          font-size: 40px;
          margin-bottom: 10px;
          display: block;
        }

        .empty-content {
          color: #161616;
          display: flex;
          flex-direction: column;
        }

        .start-link {
          color: #161616;
          font-weight: 500;
          cursor: pointer;
          text-align: left;
          text-decoration: underline;
        }

        /* ICON SECTION */
        .icon-item {
          text-align: center;
          margin-left: 25px;
          position: relative;
          cursor: pointer;
          font-size: 25px;
        }

        .icon-item svg {
          font-size: 20px;
        }

        .icon-label {
          font-size: 13px;
          margin-top: 3px;
        }

        .badge-count {
          position: absolute;
          top: -5px;
          right: -5px;
          background: #6f5cc4;
          color: white;
          font-size: 10px;
          border-radius: 50%;
          padding: 2px 6px;
        }

        /* ===== PURPLE MENU ===== */
        .menu-bar {
          background: linear-gradient(to right, #6f5cc4, #7b6bd6);
          padding: 12px 0;
          position: sticky;
          top: 0;
          z-index: 2;
        }

        .categories-btn {
          background: #efde35;
          border: none;
          border-radius: 5px;
          padding: 8px 15px;
          font-weight: 600;
          font-size: 12px;
          color: black;
        }

        .menu-bar .nav-link {
          color: white !important;
          font-weight: 500;
          margin-right: 10px;
          font-size: 12px;
        }

        .icon-section{
          display: flex;
        }

        .right-info {
          color: white;
          display: flex;
          align-items: center;
          gap: 30px;
        }

        .right-info-div {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: bold;
        }

        .side-info {
          flex-direction: column;
          margin-left: 8px;
        }

        .side-info span{
          color: #d8d2ff;
          font-size: 10px;        
        }

        .phone-number {
          font-size: 18px;
          font-weight: bold;
        }

        /* LOCATION DROPDOWN */
        .location-wrapper{
          position:relative;
          cursor:pointer;
        }

        .location-dropdown{
          position:absolute;
          top:53px;
          right:0;
          width:360px;
          background:white;
          padding:20px;
          box-shadow:0 15px 35px rgba(0,0,0,0.15);
          z-index:999;
        }

        .location-dropdown h6{
          font-weight:600;
          margin-bottom:8px;
          color: black;
        }

        .location-text{
          font-size:13px;
          color: black;
          margin-bottom:15px;
        }

        .location-search{
          display:flex;
          align-items:center;
          background:#f5f5f5;
          border-radius:30px;
          padding:8px 12px;
          margin-bottom:15px;
        }

        .location-search input{
          border:none;
          background:transparent;
          outline:none;
          margin-left:8px;
          width:100%;
          font-size:13px;
        }

        .location-header{
          display:flex;
          justify-content:space-between;
          font-size:14px;
          margin-bottom:10px;
          color: black;
        }

        .location-header button{
          border:none;
          background:#eee;
          padding:4px 10px;
          border-radius:20px;
          font-size:12px;
        }

        .location-list{
          max-height:200px;
          overflow-y:auto;
        }

        .location-item{
          display:flex;
          justify-content:space-between;
          padding:10px 0;
          border-bottom:1px solid #f1f1f1;
          font-size:14px;
          color: black;
        }

        .location-item:hover{
          color:#6f5cc4;
        }

        .min{
          background:#f3f3f3;
          padding:2px 8px;
          border-radius:20px;
          font-size:12px;
        }

        /* ===== MEGA MENU ===== */
        .mega-wrapper {
          position: relative;
        }

        .mega-wrapper::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 20px;   /* same as your old margin-top */
        }

        .mega-link {
          color: white !important;
          font-weight: 500;
          font-size: 12px;
          cursor: pointer;
        }

        .mega-menu {
          position: absolute;
          top: 100%;
          left: -269px;
          width: 1522px;
          background: white;
          padding: 40px;
          box-shadow: 0 15px 40px rgba(0,0,0,0.08);
          margin-top: 20px;
          z-index: 999;
        }

        .mega-menu h6 {
          font-weight: 700;
          margin-bottom: 15px;
          font-size: 16px;
        }

        .mega-menu ul {
          list-style: none;
          padding: 0;
        }

        .mega-menu ul li {
          padding: 6px 0;
          font-size: 15px;
          cursor: pointer;
          transition: 0.2s;
        }

        .mega-menu ul li:hover {
          color: #6f5cc4;
        }

        .col-md-3 {
          flex: 0 0 auto;
          width: 20%;
        }

        .lang-dropdown {
          position: relative;
          margin-left: 15px;
        }

        .lang-dropdown span {
          cursor: pointer;
        }

        .lang-menu {
          position: absolute;
          top: 25px;
          left: 0;
          background: white;
          border: 1px solid #eee;
          list-style: none;
          padding: 5px 0;
          margin: 0;
          width: 80px;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: 0.3s;
          z-index: 999;
        }

        .lang-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .lang-menu li {
          padding: 6px 10px;
          font-size: 12px;
          cursor: pointer;
        }

        .lang-menu li:hover {
          background: #f3f3f3;
        }

        /* ===== DROPDOWN STYLING ===== */
        .custom-dropdown .dropdown-toggle {
          color: white !important;
          font-size: 12px;
          font-weight: 500;
        }

        .custom-dropdown .dropdown-menu {
          padding: 8px 0;
          margin-top: 20px;
        }

        .custom-dropdown .dropdown-item {
          font-size: 15px;
        }

        .dropdown-toggle::after {
          display: none;
        }

        .custom-dropdown .dropdown-item:hover {
          background: #f5dip;
          color: #6f5cc4;
        }

        .dropdown-menu{
          border: none;
          border-radius: 0;
        }

        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-wrapper::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          height: 10px;   /* same as gap */
        }

        /* dropdown */
        .dropdown-menu-custom {
          position: absolute;
          top: calc(100% + 8px);   /* spacing */
          left: 0;
          background: white;
          min-width: 200px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          padding: 10px 0;

          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.25s ease;
        }

        /* show on hover */
        .dropdown-wrapper:hover .dropdown-menu-custom {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* ===== SIDEBAR ===== */
        /* SIDE ICON BAR */
        .nav-side-icons {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 60px;
          background: #fff;
          border-right: 1px solid #eee;

          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 20px;
          gap: 20px;

          z-index: 1001;
        }

        /* SHOW ONLY WHEN SIDEBAR OPENS */
        .sidebar.open .nav-side-icons {
          left: 0;
          opacity: 1;
          visibility: visible;
          background:#f7f7f8;
          justify-content:space-between;
        }

        .nav-side-icon {
          font-size: 20px;
          position: relative;
          cursor: pointer;
          padding: 10px 0;
        }

        .nav-side-icon span {
          position: absolute;
          top: -5px;
          right: -10px;
          background: #6f5cc4;
          color: white;
          font-size: 10px;
          border-radius: 50%;
          padding: 2px 5px;
        }

        .sidebar-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          opacity: 0;
          visibility: hidden;
          transition: 0.3s;
          z-index: 999;
        }

        .sidebar-overlay.active {
          opacity: 1;
          visibility: visible;
        }

        .sidebar {
          position: fixed;
          top: 0;
          left: -520px;
          width: 500px;
          height: 100%;
          background: #fff;
          padding: 20px;
          transition: 0.3s ease;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          padding-left: 100px; /* space for icon bar */
        }

        .sidebar.open {
          left: 0;
          overflow: scroll;
        }

        .sidebar-header {
          display: flex;
          justify-content: flex-start;
          font-size: 22px;
          cursor: pointer;
          margin-bottom: 15px;
        }

        .sidebar-social svg {
          font-size: 16px;
          cursor: pointer;
          color: #555;
          transition: 0.3s;
        }

        .sidebar-social svg:hover {
          color: #6f5cc4;
        }

        /* MENU */
        .sidebar-menu {
          list-style: none;
          padding: 0;
          margin-top: 10px;
          flex: 1;
        }

        .sidebar-menu li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 13px 0;
          border-bottom: 1px solid #eee;
          font-weight: 500;
          cursor: pointer;
          font-size: 15px;
        }

        .sidebar-menu li:hover {
          color: #6f5cc4;
        }

        .has-sub {
          font-weight: 600;
        }

        /* SUBMENU */
        .submenu {
          list-style: none;
          padding-left: 15px;
          margin: 0;
          background: #fafafa;
        }

        .submenu li {
          padding: 10px 0;
          font-size: 14px;
          border-bottom: none;
          font-weight: 400;
        }

        .sidebar-link{
          text-decoration:none;
          color:inherit;
          width:100%;
          display:block;
        }

        .sidebar-link:hover{
          color:#6f5cc4;
        }

        /* MEGA DROPDOWN */
        .discount-wrapper {
          position: relative;
          cursor: pointer;
        }

        .discount-mega {
          position: absolute;
          top: 51px;
          right: -180px;
          width: 1405px;
          background: white;
          border-radius: 0;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
          z-index: 999;
        }

        /* HEADER */
        .discount-header h5 {
          font-weight: 600;
          margin-bottom: 5px;
          color: black;
        }

        .discount-header p {
          font-size: 13px;
          color: gray;
          margin-bottom: 20px;
        }

        /* PRODUCTS GRID */
        .discount-products {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 15px;
        }

        /* CARD */
        .discount-card {
          background: #fff;
          border-radius: 10px;
          text-align: center;
          padding: 10px;
          transition: 0.3s;
        }

        .discount-card:hover {
          transform: translateY(-5px);
        }

        .discount-card img {
          width: 100%;
          height: 80px;
          object-fit: contain;
        }

        /* TEXT */
        .discount-info {
          margin-top: 8px;
        }

        .discount-info .old {
          text-decoration: line-through;
          font-size: 12px;
          color: #aaa;
          margin-right: 5px;
        }

        .discount-info .price {
          color: #6f5cc4;
          font-weight: 600;
          font-size: 13px;
        }

        .discount-info p {
          font-size: 12px;
          margin-top: 5px;
          color: black;
        }

        .product-card{
          border:1px solid #eee;
          border-radius:12px;
          padding:15px;
          text-align:left;
          background:white;
          position:relative;
          transition:0.3s;
        }

        .product-card:hover{
          box-shadow:0 10px 25px rgba(0,0,0,0.08);
        }

        .product-icons{
          color: black;
        }

        /* IMAGE */
        .product-card img{
          height:120px;
          object-fit:contain;
          margin-bottom:10px;
        }

        /* BADGES */
        .sale-badge{
          position:absolute;
          bottom:10px;
          left:10px;
          background:#f5d90a;
          font-size:10px;
          padding:3px 8px;
          border-radius:4px;
          font-weight:600;
        }

        .discount-badge{
          position:absolute;
          bottom:10px;
          left:60px;
          background:#ff6b6b;
          color:white;
          font-size:10px;
          padding:3px 6px;
          border-radius:4px;
        }

        /* TOP ROW */
        .product-top{
          display:flex;
          justify-content:space-between;
          align-items:center;
          font-size:11px;
          margin-bottom:5px;
        }

        .rating{
          color:#f5b50a;
          font-size:12px;
        }

        /* STOCK */
        .product-stock{
          color:#4caf50;
          font-weight:500;
        }

        /* PRICE */
        .product-price{
          margin:6px 0;
        }

        .old-price{
          text-decoration:line-through;
          color:#bbb;
          margin-right:6px;
          font-size:13px;
        }

        .new-price{
          color:#6c63ff;
          font-weight:600;
          font-size:14px;
        }

        /* NAME */
        .product-name{
          font-size:13px;
          font-weight:500;
          color:#333;
        }

        /* HOVER ICONS IMPROVED */
        .product-icons{
          position:absolute;
          right:10px;
          top:10px;
          display:flex;
          flex-direction:column;
          gap:6px;
          opacity:0;
          transform:translateX(15px);
          transition:0.3s;
        }

        .product-card:hover .product-icons{
          opacity:1;
          transform:translateX(0);
        }

        .product-icons i{
          background:#f3f3f3;
          padding:6px;
          border-radius:50%;
          font-size:12px;
        }

        .product-icons i:hover{
          background:#6c63ff;
          color:white;
        }

        /* FOOTER */
        .sidebar-footer {
          font-size: 12px;
          color: #777;
          margin-top: 20px;
        }

        /* CATEGORY MENU */
        .categories-wrapper{
          position:relative;
        }

        .categories-menu{
          position:absolute;
          top:110%;
          left:0;
          width:260px;
          background:white;
          box-shadow:0 15px 40px rgba(0,0,0,0.08);
          border-radius:6px;
          padding:10px 0;
          z-index:999;
        }

        .categories-menu ul{
          list-style:none;
          padding:0;
          margin:0;
        }

        .categories-menu li{
          display:flex;
          justify-content:space-between;
          align-items:center;
          padding:12px 18px;
          font-size:14px;
          cursor:pointer;
          transition:0.2s;
        }

        .categories-menu li:hover{
          background:#f5f5f5;
          color:#6f5cc4;
        }

        /* CATEGORY SUBMENU */
        .has-submenu{
          position:relative;
        }

        .sub-menu{
          position:absolute;
          top:0;
          left:100%;
          width:250px;
          background:white;
          box-shadow:0 15px 40px rgba(0,0,0,0.08);
          border-radius:6px;
          padding:10px 0;
          display:none;
        }

        .has-submenu:hover .sub-menu{
          display:block;
        }

        .sub-menu ul{
          list-style:none;
          padding:0;
          margin:0;
        }

        .sub-menu li{
          padding:10px 18px;
          font-size:14px;
          cursor:pointer;
        }

        .sub-menu li:hover{
          background:#f5f5f5;
          color:#6f5cc4;
        }

        @media (min-width: 1400px) {
          .container {
            max-width: 1420px;
          }

          .icon-cart{
            display: none;
          }
        }

        @media(max-width: 1025px) {
          .menu-bar{
            display: none;
          }

          .logo-img{
            width: 80%
          }

          .icon-section{
            display: none;
          }

          .search{
            display: none;
          }

          .main-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .col-lg-3 {
            flex: 0 0 auto;
            width: 100%;
          }
        }

        @media(max-width: 780px) {
          .topbar-right{
            margin-left: -15px !important;
          }

          .topbar-div{
            margin-bottom: 10px;
          }

          .logo-img{
            margin-left: 0;
            width: 60%;
          }

          .main-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }

          .menu-bar{
            display: none;
          }

          .icon-section{
            display: none;
          }

          .search{
            display: none;
          }
        }

        @media(max-width: 500px) {
          .topbar-container{
            flex-direction: column;
          }

          .topbar-right{
            margin-left: -15px !important;
          }

          .topbar-div{
            margin-bottom: 10px;
          }

          .logo-img{
            margin-left: 0;
            width: 60%;
          }

          .main-header{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
            
          .menu-bar{
            display: none;
          }

          .icon-section{
            display: none;
          }

          .search{
            display: none;
          }

          .sidebar.open{
            width: 320px;
          }
        }

        .compare-product{
            display:flex;
            gap:12px;
            align-items:center;
            margin-bottom:18px;
            position:relative;
            padding-bottom:15px;
            border-bottom:1px solid #eee;
        }

        .compare-img{
            width:70px;
            height:70px;
            object-fit:contain;
            cursor:pointer;
        }

        .compare-info{
            flex:1;
        }

        .compare-name{
            font-size:14px;
            font-weight:500;
            cursor:pointer;
            margin-bottom:5px;
        }

        .compare-name:hover{
            color:#6c63ff;
        }

        .compare-price{
            display:flex;
            gap:8px;
            align-items:center;
        }

        .compare-remove{
            cursor:pointer;
            font-size:18px;
            color:#888;
        }

        .compare-remove:hover{
            color:red;
        }

        .start-link{
            color:#6c63ff;
            cursor:pointer;
            margin-top:10px;
        }

        .start-link:hover{
            text-decoration:underline;
        }
      `}</style>

      {/* ===== TOP BAR ===== */}
      <div className="topbar">
        <Container className="topbar-container">
          <div className="topbar-div">Welcome to our online store!</div>
          <div className="d-flex align-items-center topbar-right">
            <span><a href="/faqs">FAQ</a></span>
            <span><a href="/aboutus">ABOUT US</a></span>
            <div className="lang-dropdown">
              <span onClick={() => setOpenLang(!openLang)}>
                ENG <i className={`bi ${openLang ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
              </span>

              <ul className={`lang-menu ${openLang ? "open" : ""}`}>
                <li>SP</li>
                <li>GB</li>
                <li>KRD</li>
                <li>ENG</li>
              </ul>
            </div>
            <div className="social-icons d-flex align-items-center">
              <FaFacebookF />
              <FaTwitter />
              <FaPinterestP />
            </div>
          </div>
        </Container>
      </div>

      {/* ===== MAIN HEADER ===== */}
      <Container className="py-3">
        <Row className="align-items-center">

          {/* Logo */}
          <Col lg={3} className="main-header">
          <FaBars
              size={22}
              className="me-3"
              style={{ cursor: "pointer" }}
              onClick={() => setShowSidebar(true)}
            />
            <a href="/">
              <img
                src="/images/greengrocery-logo-white.png"
                alt="Logo"
                className="logo-img"
              />
            </a>
            <div className="icon-cart icon-item">
              <i className="bi bi-bag"></i>
              <span className="badge-count">
              {cartProducts.length}
            </span>
            </div>
          </Col>

          {/* Search */}
          <Col lg={5} className="search">
            <div className="d-flex align-items-center">
              <div className="search-wrapper d-flex w-100">
                <div className="search-category">
                  <img
                    src="/icons/find.png"
                    alt="menu"
                    className="menu-icon"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search for product..."
                  className="search-input"
                />
                <button className="search-btn">
                  <FaSearch />
                </button>
              </div>
            </div>
          </Col>

          {/* Icons */}
          <Col lg={4} className="justify-content-end icon-section">
            <div className="icon-item" onClick={() => setShowAuth(true)}>
              <i className="bi bi-person"></i>
              <div className="icon-label">Account</div>
            </div>

            <div className="icon-item" onClick={() => setShowCompare(true)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-refresh"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" /><path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" /></svg>
              
              <span className="badge-count">
                {compareProducts.length}
              </span>
              <div className="icon-label">Compare</div>
            </div>
            {/* ===== COMPARE SIDEBAR ===== */}
            <div
              className={`compare-overlay ${showCompare ? "active" : ""}`}
              onClick={() => setShowCompare(false)}
            ></div>

            <div className={`compare-sidebar ${showCompare ? "open" : ""}`}>
              
              {/* Header */}
              <div className="compare-header">
                <span onClick={() => setShowCompare(false)}>✕</span>

                <div className="compare-icons">
                  <i className="bi bi-bag"></i>

                  <i className="bi bi-heart"></i>

                  <i className="bi bi-arrow-repeat"></i>
                </div>
              </div>
              
              <div className="compare-content">

                <h5>Your Compared Products</h5>

                {compareProducts.length === 0 ? (

                    <div className="empty-compare">

                        <i className="bi bi-arrow-repeat"></i>

                        <div className="empty-content">
                            <span>No product is added to the compare list!</span>

                            <span
                                className="start-link"
                                onClick={() => {
                                    setShowCompare(false);
                                    navigate("/shop");
                                }}
                            >
                                Start Shopping
                            </span>
                        </div>

                    </div>

                ) : (

                    compareProducts.map((item) => (

                        <div className="compare-product" key={item._id}>

                            {/* IMAGE */}
                            <img
                                src={`http://localhost:5000/images/Products${item.img}`}
                                alt={item.name}
                                className="compare-img"
                                onClick={() => {
                                    navigate(`/product/${item._id}`);
                                    setShowCompare(false);
                                }}
                            />

                            {/* INFO */}
                            <div className="compare-info">

                                <div
                                    className="compare-name"
                                    onClick={() => {
                                        navigate(`/product/${item._id}`);
                                        setShowCompare(false);
                                    }}
                                >
                                    {item.name}
                                </div>

                                <div className="compare-price">
                                    <span className="old-price">
                                        {item.oldPrice}
                                    </span>

                                    <span className="new-price">
                                        {item.price}
                                    </span>
                                </div>

                            </div>

                            {/* REMOVE */}
                            <i
                                className="bi bi-x compare-remove"
                                onClick={() => removeCompareProduct(item._id)}
                            ></i>

                        </div>

                    ))
                )}

            </div>

            </div>
            

            <div className="icon-item" onClick={() => setShowheart(true)}>
              <i className="bi bi-heart"></i>
              <span className="badge-count">
                {wishlistProducts.length}
              </span>
              <div className="icon-label">Wishlist</div>
            </div>

            {/* ===== Wishlist SIDEBAR ===== */}
            <div
              className={`compare-overlay ${showheart ? "active" : ""}`}
              onClick={() => setShowheart(false)}
            ></div>

            <div className={`compare-sidebar ${showheart ? "open" : ""}`}>
              
              {/* Header */}
              <div className="compare-header">
                <span onClick={() => setShowheart(false)}>✕</span>

                <div className="compare-icons">
                  <i className="bi bi-bag"></i>

                  <i className="bi bi-heart"></i>

                  <i className="bi bi-arrow-repeat"></i>
                </div>
              </div>

              {/* Content */}
              <div className="compare-content">

                  <h5>Your Wishlist</h5>

                  {wishlistProducts.length === 0 ? (

                      <div className="empty-compare">

                          <i className="bi bi-heart"></i>

                          <div className="empty-content">
                              <span>There are no products on the wishlist!</span>

                              <span
                                  className="start-link"
                                  onClick={() => {
                                      setShowheart(false);
                                      navigate("/shop");
                                  }}
                              >
                                  Start Shopping
                              </span>
                          </div>

                      </div>

                  ) : (

                      wishlistProducts.map((item) => (

                          <div className="compare-product" key={item._id}>

                              {/* IMAGE */}
                              <img
                                  src={`http://localhost:5000/images/Products${item.img}`}
                                  alt={item.name}
                                  className="compare-img"
                                  onClick={() => {
                                      navigate(`/product/${item._id}`);
                                      setShowheart(false);
                                  }}
                              />

                              {/* INFO */}
                              <div className="compare-info">

                                  <div
                                      className="compare-name"
                                      onClick={() => {
                                          navigate(`/product/${item._id}`);
                                          setShowheart(false);
                                      }}
                                  >
                                      {item.name}
                                  </div>

                                  <div className="compare-price">

                                      <span className="old-price">
                                          {item.oldPrice}
                                      </span>

                                      <span className="new-price">
                                          {item.price}
                                      </span>

                                  </div>

                              </div>

                              {/* REMOVE */}
                              <i
                                  className="bi bi-x compare-remove"
                                  onClick={() => removeWishlistProduct(item._id)}
                              ></i>

                          </div>

                      ))
                  )}

              </div>

            </div>

            <div className="icon-item" onClick={() => setShowCart(true)}>
              <i className="bi bi-bag"></i>
              <span className="badge-count">
                {cartProducts.length}
              </span>
              <div className="icon-label">Cart</div>
            </div>
            {/* ===== CART SIDEBAR ===== */}
            <div
              className={`compare-overlay ${showCart ? "active" : ""}`}
              onClick={() => setShowCart(false)}
            ></div>

            <div className={`compare-sidebar ${showCart ? "open" : ""}`}>
              
              {/* Header */}
              <div className="compare-header">
                <span onClick={() => setShowCart(false)}>✕</span>

                <div className="compare-icons">
                  <i className="bi bi-bag"></i>
                  <i className="bi bi-heart"></i>
                  <i className="bi bi-arrow-repeat"></i>
                </div>
              </div>

              {/* Content */}
              <div className="compare-content">

                  <h5>Your Cart</h5>

                  {cartProducts.length === 0 ? (

                      <div
                          className="empty-compare"
                          style={{ flexDirection: "column" }}
                      >

                          <i
                              className="bi bi-bag"
                              style={{
                                  fontSize: "60px",
                                  color: "#ddd",
                                  display: "flex",
                              }}
                          ></i>

                          <div
                              className="empty-content"
                              style={{ textAlign: "left" }}
                          >

                              <span
                                  style={{
                                      fontWeight: "500",
                                      marginTop: "10px",
                                  }}
                              >
                                  No products in the cart.
                              </span>

                              <span
                                  style={{
                                      fontSize: "13px",
                                      color: "#777",
                                      marginTop: "5px",
                                  }}
                              >
                                  Free shipping on all orders
                                  over $450
                              </span>

                          </div>

                      </div>

                  ) : (

                      cartProducts.map((item) => (

                          <div
                              className="compare-product"
                              key={item.product._id}
                          >

                              <img
                                  src={`http://localhost:5000/images/Products${item.product.img}`}
                                  alt={item.product.name}
                                  className="compare-img"
                              />

                              <div className="compare-info">

                                  <div className="compare-name">
                                      {item.product.name}
                                  </div>

                                  <div className="compare-price">

                                      <span className="new-price">
                                          {item.product.price}
                                      </span>

                                      <span>
                                          Qty: {item.quantity}
                                      </span>

                                  </div>

                              </div>

                              <i
                                  className="bi bi-x compare-remove"
                                  onClick={() =>
                                      removeCartProduct(
                                          item.product._id
                                      )
                                  }
                              ></i>

                          </div>

                      ))
                  )}
            {/* VIEW CART */}
            <button
                className="view-cart-btn"
                onClick={() => {
                    navigate("/cart");
                    setShowCart(false);
                }}
            >
                View Cart
            </button>

            {/* CHECKOUT */}
            <button
                className="checkout-sidebar-btn"
                onClick={() => {
                    navigate("/checkout");
                    setShowCart(false);
                }}
            >
                Checkout
            </button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* ===== MENU BAR ===== */}
      <Navbar expand="lg" className="menu-bar">
        <Container>
          <div
            className="categories-wrapper me-3"
            onMouseEnter={() => setShowCategories(true)}
            onMouseLeave={() => setShowCategories(false)}
          >
            <Button className="categories-btn">
              CATEGORIES <i className="bi bi-chevron-down ms-1"></i>
            </Button>

            {showCategories && (
              <div className="categories-menu">
                <ul>
                  {categories.map((cat, i) => (
                    <li
                      key={i}
                      className="has-submenu"
                      onClick={() =>
                        navigate(
                          `/product/category/${encodeURIComponent(cat.name)}`
                        )
                      }
                    >
                      {cat.name}

                      {cat.subcategories?.length > 0 && (
                        <i className="bi bi-chevron-right"></i>
                      )}

                      {cat.subcategories?.length > 0 && (
                        <div className="sub-menu">
                          <ul>
                            {cat.subcategories.map((sub, index) => (
                              <li
                                key={index}
                                onClick={(e) => {
                                  e.stopPropagation();

                                  navigate(
                                    `/product/category/${encodeURIComponent(cat.name)}/${encodeURIComponent(sub)}`
                                  );
                                }}
                              >
                                {sub}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">HOME</Nav.Link>
              <div
                className="mega-wrapper"
                onMouseEnter={() => setShowShop(true)}
                onMouseLeave={() => setShowShop(false)}
              >
                <Nav.Link className="mega-link">
                  SHOP <i className="bi bi-chevron-down ms-1"></i>
                </Nav.Link>

                {showShop && (
                  <div className="mega-menu">
                    <Container>
                      <Row>
                        <Col md={3}>
                          <h6>CATALOG</h6>
                          <ul>
                            <li>Style 1</li>
                            <li>Style 2</li>
                            <li>Style 3</li>
                            <li>Load More</li>
                            <li>Infinite Scroll</li>
                            <li>Pagination</li>
                            <li>Campaign Page</li>
                          </ul>
                        </Col>

                        <Col md={3}>
                          <h6>SHOP LAYOUTS</h6>
                          <ul>
                            <li>Default</li>
                            <li>Elementor Shop</li>
                            <li>Left Shop</li>
                            <li>Right Sidebar</li>
                            <li>Top Sidebar</li>
                            <li>Top Hidden Sidebar</li>
                            <li>Fixed Sidebar</li>
                            <li>Full Width</li>
                            <li>Masonry Grid</li>
                          </ul>
                        </Col>

                        <Col md={3}>
                          <h6>SHOP COLUMNS</h6>
                          <ul>
                            <li>List Type</li>
                            <li>Column Three</li>
                            <li>Column Four</li>
                            <li>Column Five</li>
                            <li>Column Six</li>
                          </ul>
                        </Col>

                        <Col md={3}>
                          <h6>HERO TYPES</h6>
                          <ul>
                            <li>Category List</li>
                            <li>Category Slider</li>
                            <li>Hero Breadcrumbs</li>
                            <li>Shop No Title</li>
                            <li>Shop Category Page</li>
                            <li>Shop Tag Page</li>
                          </ul>
                        </Col>

                        <Col md={3}>
                          <h6>SHOP PAGES</h6>
                          <ul>
                            <li>Checkout</li>
                            <li>My Account</li>
                          </ul>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                )}
              </div>
              <NavDropdown
                id="products-dropdown"
                className="custom-dropdown"
                show={showProduct}
                onMouseEnter={() => {
                  clearTimeout(productTimeout.current);
                  setShowProduct(true);
                }}
                onMouseLeave={() => {
                  productTimeout.current = setTimeout(() => {
                    setShowProduct(false);
                  }, 200);
                }}
                title={
                  <span>
                    PRODUCT <i className="bi bi-chevron-down ms-1"></i>
                  </span>
                }
              >
                <NavDropdown.Item as={Link} to="/product">Product Types</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/product">Showcase Styles</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/product">Gallery Styles</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/product">Page Layouts</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown
                id="pages-dropdown"
                className="custom-dropdown"
                show={showPages}
                onMouseEnter={() => {
                  clearTimeout(pagesTimeout.current);
                  setShowPages(true);
                }}
                onMouseLeave={() => {
                  pagesTimeout.current = setTimeout(() => {
                    setShowPages(false);
                  }, 200);
                }}
                title={
                  <span>
                    PAGES <i className="bi bi-chevron-down ms-1"></i>
                  </span>
                }
              >
                <NavDropdown.Item as={Link} to="/">Home</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/blog">Blog</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/faqs">FAQ</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/order">Order Tracking</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/404">404</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/aboutus">About Us</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/contact">Contact</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
              <NavDropdown
                id="templates-dropdown"
                className="custom-dropdown"
                show={showTemplate}
                onMouseEnter={() => {
                  clearTimeout(templateTimeout.current);
                  setShowTemplate(true);
                }}
                onMouseLeave={() => {
                  templateTimeout.current = setTimeout(() => {
                    setShowTemplate(false);
                  }, 200);
                }}
                title={
                  <span>
                    TEMPLATES <i className="bi bi-chevron-down ms-1"></i>
                  </span>
                }
              >
                <NavDropdown.Item>Elementor Header 1</NavDropdown.Item>
                <NavDropdown.Item>Elementor Header 2</NavDropdown.Item>
                <NavDropdown.Item>Elementor Header 3</NavDropdown.Item>
                <NavDropdown.Item>Elementor Header 4</NavDropdown.Item>
                <NavDropdown.Item>Elementor Header 5</NavDropdown.Item>
                <NavDropdown.Item>Elementor Header 6</NavDropdown.Item>
              </NavDropdown>
            </Nav>

            <div className="right-info">
              <div
                className="location-wrapper"
                onClick={() => setShowLocation(!showLocation)}
              >
                <div className="side-info right-info-div">
                  <span>Your Location</span>
                  <div>
                    Select a Location
                    <i className={`bi ms-1 ${showLocation ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                  </div>
                </div>

                {showLocation && (
                  <div className="location-dropdown">

                    <h6>Choose your Delivery Location</h6>

                    <p className="location-text">
                      Enter your address and we will specify the offer for your area.
                    </p>

                    <div className="location-search">
                      <i className="bi bi-search"></i>
                      <input type="text" placeholder="Search your area" />
                    </div>

                    <div className="location-header">
                      <span>Select a Location</span>
                      <button>Clear All</button>
                    </div>

                    <div className="location-list">

                      <div className="location-item">
                        <span>Alabama</span>
                        <span className="min">Min: $130</span>
                      </div>

                      <div className="location-item">
                        <span>Alaska</span>
                        <span className="min">Min: $135</span>
                      </div>

                      <div className="location-item">
                        <span>Arizona</span>
                        <span className="min">Min: $400</span>
                      </div>

                      <div className="location-item">
                        <span>California</span>
                        <span className="min">Min: $230</span>
                      </div>

                      <div className="location-item">
                        <span>Colorado</span>
                      </div>

                      <div className="location-item">
                        <span>New Jersey</span>
                      </div>

                    </div>

                  </div>
                )}
              </div>
              <div
                className="discount-wrapper"
                onClick={() => setShowDiscount(!showDiscount)}
              >
                <div className="right-info-div">
                  <img src="/icons/discount.png" alt="" style={{ width: "30px" }} />
                  <div className="side-info">
                    <span>Only This Weekend</span>
                    <div>
                      Super Discount
                      <i className={`bi ms-1 ${showDiscount ? "bi-chevron-up" : "bi-chevron-down"}`}></i>
                    </div>
                  </div>
                </div>

                {showDiscount && (
                  <div className="discount-mega">

                    {/* HEADER */}
                    <div className="discount-header">
                      <h5>Items on sale this week</h5>
                      <p>Top picks this week. Up to 50% off the best selling products.</p>
                    </div>

                    {/* PRODUCTS */}
                    <div className="discount-products">

                      {[
                        {
                          name: "Organic green fresh broccoli",
                          price: "$3.25",
                          old: "$4.00",
                          img: "/images/Products/product-4-300x300.jpeg",
                        },
                        {
                          name: "New crop yellow green lettuce",
                          price: "$2.84",
                          old: "$3.22",
                          img: "/images/Products/product-12-300x300.jpeg",
                        },
                        {
                          name: "Chopped black premium pecans",
                          price: "$5.00",
                          old: "$6.00",
                          img: "/images/Products/product-15-300x300.jpeg",
                        },
                        {
                          name: "Ultimate organic nut flour",
                          price: "$2.25",
                          old: "$3.45",
                          img: "/images/Products/product-16-300x300.png",
                        },
                        {
                          name: "Golden special premium raisins",
                          price: "$3.96",
                          old: "$4.25",
                          img: "/images/Products/product-20-300x300.jpeg",
                        },
                        {
                          name: "Natural sliced featured almonds",
                          price: "$1.20",
                          old: "$1.40",
                          img: "/images/Products/product-21-300x300.jpeg",
                        },
                      ].map((item, i) => (
                        <div className="product-card">
                          {/* HOVER ICONS */}
                          <div className="product-icons">
                              <i className="bi bi-bag"></i>
                              <i className="bi bi-eye"></i>
                              <i className="bi bi-arrow-repeat"></i>
                              <i className="bi bi-heart"></i>
                          </div>
                          <img src={item.img} alt={item.name} />
                          <div className="product-stock">
                              IN STOCK 1 LBS
                          </div>
                          <div className="product-price">
                              <span className="old-price">{item.old}</span>
                              <span className="new-price">{item.price}</span>
                          </div>
                          <div className="product-name">
                              {item.name}
                          </div>
                        </div>
                      ))}

                    </div>
                  </div>
                )}
              </div>
              <div className="right-info-div" >
                <img src="/icons/phone-call-24-hours-svgrepo-com.svg" alt="Phone Icon" style={{ width: '30px' }} />
                <div className="side-info">
                  <span>Call Anytime</span>
                  <div className="phone-number">280 900 3434</div>
                </div>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* ===== SIDEBAR ===== */}
      <div className={`sidebar ${showSidebar ? "open" : ""}`}>
  
        {/* SIDE ICONS (only inside sidebar) */}
        <div className={`nav-side-icons ${showSidebar ? "show" : ""}`}>
          <div className="d-flex flex-column justify-content-center">
            <div className="sidebar-header">
              <span onClick={() => setShowSidebar(false)}>✕</span>
            </div>
            <div className="nav-side-icon">
              <div className="nav-side-icon">
                <i className="bi bi-bag"></i>

                <span>
                  {cartProducts.length}
                </span>
              </div>
              <div className="nav-side-icon"><i className="bi bi-arrow-repeat"></i><span>0</span></div>
              <div className="nav-side-icon"><i className="bi bi-heart"></i><span>0</span></div>
              <div className="nav-side-icon"><i className="bi bi-person"></i></div>
              <div className="nav-side-icon"><i className="bi bi-card-text"></i></div>
            </div>
          </div>
          {/* SOCIAL ICONS */}
          <div className="sidebar-social d-flex flex-column justify-content-center gap-3">
            <FaFacebookF />
            <FaInstagramSquare />
            <FaTwitter />
            <FaPinterestP />
          </div>
        </div>

        {/* Search */}
        <Col lg={12} className="search">
          <div className="d-flex align-items-center">
            <div className="search-wrapper d-flex w-100">
              <div className="search-category">
                <FaBars />
              </div>
              <input
                type="text"
                placeholder="Search for product..."
                className="search-input"
              />
              <button className="search-btn">
                <FaSearch />
              </button>
            </div>
          </div>
        </Col>

        {/* MENU */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/" className="sidebar-link">Home</Link>
          </li>

          <li onClick={() => setOpenShop(!openShop)} className="has-sub">
            Shop
            <i className={`bi ${openShop ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
          </li>

          {openShop && (
            <ul className="submenu">

              <li className="fw-bold">Catalog</li>
              <li>Style 1</li>
              <li>Style 2</li>
              <li>Style 3</li>
              <li>Load More</li>
              <li>Infinite Scroll</li>
              <li>Pagination</li>
              <li>Campaign Page</li>

              <li className="fw-bold mt-2">Shop Layouts</li>
              <li>Default</li>
              <li>Elementor Shop</li>
              <li>Left Shop</li>
              <li>Right Sidebar</li>
              <li>Top Sidebar</li>
              <li>Full Width</li>

              <li className="fw-bold mt-2">Shop Columns</li>
              <li>List Type</li>
              <li>Column Three</li>
              <li>Column Four</li>
              <li>Column Five</li>
              <li>Column Six</li>

              <li className="fw-bold mt-2">Shop Pages</li>
              <li>Checkout</li>
              <li>My Account</li>

            </ul>
          )}

          <li onClick={() => setOpenProduct(!openProduct)} className="has-sub">
            Product
            <i className={`bi ${openProduct ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
          </li>

          {openProduct && (
            <ul className="submenu">
              <li>Product Types</li>
              <li>Showcase Styles</li>
              <li>Gallery Styles</li>
              <li>Page Layouts</li>
            </ul>
          )}

          {/* DROPDOWN */}
          <li onClick={() => setOpenPages(!openPages)} className="has-sub">
            Pages
            <i className={`bi ${openPages ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
          </li>

          {openPages && (
            <ul className="submenu">
              <li><Link to="/" className="sidebar-link">Home</Link></li>
              <li><Link to="/blog" className="sidebar-link">Blog</Link></li>
              <li><Link to="/faqs" className="sidebar-link">FAQ</Link></li>
              <li><Link to="/order" className="sidebar-link">Order Tracking</Link></li>
              <li><Link to="/404" className="sidebar-link">404</Link></li>
              <li><Link to="/aboutus" className="sidebar-link">About Us</Link></li>
              <li><Link to="/contact" className="sidebar-link">Contact</Link></li>
            </ul>
          )}

          <li>
            <Link to="/contact" className="sidebar-link">Contact</Link>
          </li>
  
          <li onClick={() => setOpenTemplate(!openTemplate)} className="has-sub">
            Templates
            <i className={`bi ${openTemplate ? "bi-chevron-down" : "bi-chevron-right"}`}></i>
          </li>

          {openTemplate && (
            <ul className="submenu">
              <li>Elementor Header 1</li>
              <li>Elementor Header 2</li>
              <li>Elementor Header 3</li>
              <li>Elementor Header 4</li>
              <li>Elementor Header 5</li>
              <li>Elementor Header 6</li>
            </ul>
          )}
        </ul>

        <div className="sidebar-footer">
          © 2022, GreenGrocery Theme. Made with passion.
        </div>
      </div>
      <div
        className={`sidebar-overlay ${showSidebar ? "active" : ""}`}
        onClick={() => setShowSidebar(false)}
      ></div>
      {showAuth && (
        <div className="auth-overlay" onClick={() => setShowAuth(false)}>
          
          <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
            
            {/* CLOSE */}
            <div className="auth-close" onClick={() => setShowAuth(false)}>✕</div>

            {/* TABS */}
            {!user && (
              <div className="auth-tabs">
                <span
                  className={authTab === "login" ? "active" : ""}
                  onClick={() => setAuthTab("login")}
                >
                  Sign In
                </span>
                <span
                  className={authTab === "register" ? "active" : ""}
                  onClick={() => setAuthTab("register")}
                >
                  Register
                </span>
              </div>
            )}

            <div className="auth-body">
              
              {/* ✅ IF USER IS LOGGED IN */}
              {user ? (
                <>
                <div className="account-modal">
                  
                  {/* HEADER */}
                  <div className="account-header">
                    <h4>Hello</h4>
                    <span className="account-badge">
                      {user.name || "USER"}
                    </span>
                  </div>

                  <hr />

                  {/* MENU */}
                  <div className="account-menu">
                    <p><Link to="/dashboard">Dashboard</Link></p>
                    <p><Link to="/orders">Orders</Link></p>
                    <p><Link to="/downloads">Downloads</Link></p>
                    <p><Link to="/addresses">Addresses</Link></p>
                    <p><Link to="/account">Account details</Link></p>

                    <p
                      className="logout"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("user");
                        setUser(null);
                        setShowAuth(false);
                      }}
                    >
                      Log out
                    </p>
                  </div>

                </div>
                </>
              ) : (
                <>
                  {/* 🔹 LOGIN TAB */}
                  {authTab === "login" && (
                    <>
                      <input name="email" placeholder="Username or email *" onChange={handleLoginChange}/>
                      <input type="password" name="password" placeholder="Password *" onChange={handleLoginChange} />

                      <div className="auth-remember">
                        <input type="checkbox" style={{marginLeft: "-45%", marginRight: "-45%"}}/> Remember me
                      </div>

                      <button className="auth-btn" onClick={handleLogin}>Login</button>

                      <p className="auth-link">Lost your password?</p>
                    </>
                  )}

                  {/* 🔹 REGISTER TAB */}
                  {authTab === "register" && (
                    <>
                      <input name="name" placeholder="Username *" onChange={handleRegisterChange} />
                      <input name="email" placeholder="Email address *" onChange={handleRegisterChange} />
                      <input type="password" name="password" placeholder="Password *" onChange={handleRegisterChange}/>

                      <p className="auth-info">
                        A password will be sent to your email address.
                      </p>

                      <div className="auth-policy">
                        Your personal data will be used to support your experience throughout this website, 
                        to manage access to your account, 
                        and for other purposes described in our privacy policy.
                      </div>

                      <button className="auth-btn" onClick={handleRegister}> Register </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}  
    </>
  );
}
