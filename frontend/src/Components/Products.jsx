import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function KitchenProducts() {
  const navigate = useNavigate();

  // ============================
// ADD TO CART
// ============================

const addToCart = async (e, productId) => {

  // PREVENT CARD CLICK
  e.stopPropagation();

  try {

    const token = localStorage.getItem("token");

    // USER NOT LOGGED IN
    if (!token) {

      alert("Please login first");
      return;
    }

    const res = await axios.post(
      "http://localhost:5000/api/cart",
      {
        productId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    // SUCCESS
    alert(res.data.message);

    // UPDATE NAVBAR
    window.dispatchEvent(
      new Event("cartUpdated")
    );

  } catch (error) {

    console.log(error);

    // TOKEN EXPIRED
    if (
      error.response?.data?.message ===
        "Invalid token" ||
      error.response?.status === 401
    ) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      alert(
        "Session expired. Please login again."
      );

      return;
    }

    alert(
      error.response?.data?.message ||
      "Cart failed"
    );
  }
};
     // ============================
  // WISHLIST IDS
  // ============================

  const [wishlistIds, setWishlistIds] = useState([]);

  // ============================
  // FETCH WISHLIST IDS
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

        setWishlistIds(
          res.data.data.map((item) => item._id)
        );

      } catch (error) {

        console.log(error);
      }
    };

    fetchWishlist();

  }, []);


  // ============================
  // ADD TO WISHLIST
  // ============================

  const addToWishlist = async (e, productId) => {

    // PREVENT CARD CLICK
    e.stopPropagation();

    try {

      const token = localStorage.getItem("token");

      // USER NOT LOGGED IN
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/wishlist",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // SUCCESS MESSAGE
      alert(res.data.message);

      // UPDATE HEART ICON
        setWishlistIds((prev) =>
          prev.includes(productId)
            ? prev
            : [...prev, productId]
        );

      // UPDATE NAVBAR
      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

    } catch (error) {

      console.log(error);

      // ALREADY EXISTS
      if (
        error.response?.data?.message ===
        "Product already in wishlist"
      ) {

        alert("Already in wishlist ❤️");
        return;
      }

      // TOKEN EXPIRED
      if (
        error.response?.data?.message ===
          "Invalid token" ||
        error.response?.status === 401
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert(
          "Session expired. Please login again."
        );

        return;
      }

      alert(
        error.response?.data?.message ||
        "Wishlist failed"
      );
    }
  };
  
  const addToCompare = async (productId) => {

    try {

      const token = localStorage.getItem("token");

      // USER NOT LOGGED IN
      if (!token) {
        alert("Please login first");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/compare",
        {
          productId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // SUCCESS MESSAGE
      alert(res.data.message);

      // 🔥 IMPORTANT
      // refresh navbar compare list
      window.dispatchEvent(new Event("compareUpdated"));

    } catch (error) {

      console.log(error);

      // TOKEN EXPIRED
      if (
        error.response?.data?.message === "Invalid token" ||
        error.response?.status === 401
      ) {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        alert("Session expired. Please login again.");

        return;
      }

      alert(
        error.response?.data?.message || "Compare failed"
      );
    }
  };

  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products"); 
          
        setProducts(res.data.data);
        setAllProducts(res.data.data); 

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <style>{`

      .product-section{
        font-family:'Poppins',sans-serif;
      }

      .product-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
      }

      .product-headtitle{
        font-size:22px;
        font-weight:600;
      }

      .timer{
        display:flex;
        gap:6px;
        margin-left:15px;
      }

      .timer-box{
        background:#f3df4a;
        padding:4px 10px;
        border-radius:6px;
        font-size:14px;
      }

      .timer-box:last-child{
        background:#e53935;
        color:white;
      }

      .product-card{
        border:1px solid #eee;
        border-radius:10px;
        padding:15px;
        background:white;
        position:relative;
        transition:0.3s;
      }

      .product-card:hover{
        box-shadow:0 8px 20px rgba(0,0,0,0.08);
      }

      .product-card:hover .product-icons{
        opacity:1;
        transform:translateX(0);
      }

      .product-img{
        width:100%;
        height:150px;
        object-fit:contain;
      }

      .product-icons{
        position:absolute;
        right:10px;
        top:10px;
        display:flex;
        flex-direction:column;
        gap:8px;

        opacity:0;
        transform:translateX(15px);
        transition:0.3s;
      }

      .product-icons i{
        background:#f1f1f1;
        padding:7px;
        border-radius:50%;
        font-size:13px;
        cursor:pointer;
      }

      .stock{
        color:#2e7d32;
        font-size:12px;
        margin-top:8px;
      }

      .price-old{
        text-decoration:line-through;
        color:#bbb;
        margin-right:5px;
      }

      .price{
        color:#5a4bd4;
        font-weight:600;
      }

      .product-name{
        font-size:15px;
        font-weight:500;
        margin:6px 0;
      }

      .tag{
        font-size:11px;
        padding:3px 8px;
        border-radius:4px;
        margin-right:5px;
      }

      .probanner{
        padding:22px;
        border-radius:8px;
        text-align:center;
        font-weight:500;
        margin-top:30px;
      }

      .probanner1{
        background:#c8c6e6;
        color:#4a49c7;
      }

      .probanner2{
        background:#cde6d8;
        color:#2e7d60;
      }

      /* Swiper arrows */
      .proslider-arrows{
        display:flex;
        gap:10px;
        margin-left:630px;
      }

      .swiper-prev,
      .swiper-next{
        width:32px;
        height:32px;
        border:1px solid #ddd;
        border-radius:50%;
        display:flex;
        align-items:center;
        justify-content:center;
        cursor:pointer;
        background:white;
        transition:0.2s;
      }

      .swiper-prev:hover,
      .swiper-next:hover{
        background:#f5f5f5;
      }

      .swiper-prev i,
      .swiper-next i{
        font-size:14px;
      }

      @media (max-width:1025px){
        .proslider-arrows{
          margin-left: 270px;
        }
      }

      @media (max-width:780px){
        .proslider-arrows{
          margin-left: 75px;
        }
      }

      @media (max-width:480px){
        .timer{
          display:none;
        }

        .proslider-arrows{
          margin-left: 115px;
        }
      }


      /* ========================= */
        /* PRODUCT CARD */
        /* ========================= */

        .product-card-new {
          background: #fff;
          padding: 16px;
          border-radius: 10px;
          border: 1px solid #eee;
          transition: 0.3s;
          position: relative;
          text-align: left;
          height: 100%;
        }

        .product-card-new:hover {
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        /* IMAGE */
        .img-box {
          position: relative;
          text-align: center;
          margin-bottom: 10px;
        }

        .img-box img {
          height: 130px;
          width: 100%;
          object-fit: contain;
        }

        /* FEATURED STAR */
        .featured-star {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #fff3cd;
          padding: 6px;
          border-radius: 50%;
          font-size: 12px;
          color: #f1c40f;
        }

        /* TOP ICON */
        .top-icon {
          position: absolute;
          top: 8px;
          right: 8px;
        }

        .top-icon i {
          background: #eae6ff;
          padding: 7px;
          border-radius: 50%;
          font-size: 13px;
        }

        /* HOVER ICONS */
        .product-icons1 {
          position: absolute;
          top: 21px;
          right: 23px;

          display: flex;
          flex-direction: column;
          gap: 8px;

          opacity: 0;
          transform: translateX(10px);
          transition: 0.3s;
        }

        .product-card-new:hover .product-icons1 {
          opacity: 1;
          transform: translateX(0);
        }

        .product-icons1 i {
          background: #f1f1f1;
          padding: 7px;
          border-radius: 50%;
          font-size: 13px;
          cursor: pointer;
          transition: 0.3s;
        }

        .product-icons1 i:hover {
          background: #6c63ff;
          color: #fff;
        }

        /* CONTENT */
        .Product-content {
          padding-top: 5px;
        }

        /* STOCK */
        .stock {
          font-size: 11px;
          color: #28a745;
          font-weight: 500;
        }

        /* PRICE */
        .price-box {
          margin: 5px 0;
        }

        .old-price {
          text-decoration: line-through;
          font-size: 12px;
          color: #bbb;
          margin-right: 5px;
        }

        .price {
          color: #6c63ff;
          font-weight: 600;
        }

        /* TITLE */
        .product-title {
          font-size: 14px;
          font-weight: 600;
          margin: 8px 0;
        }

        /* LABELS */
        .labels {
          display: flex;
          gap: 5px;
        }

        .labels span {
          font-size: 10px;
          padding: 3px 8px;
          border-radius: 4px;
        }

        .labels .sale {
          background: #ffe066;
        }

        .labels .discount {
          background: #ff6b6b;
          color: white;
        }

        /* ICON CONTAINER */
      .product-icons1 {
        position: absolute;
        top: 23px;
        right: 23px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        opacity: 0;
        transform: translateX(15px);
        transition: 0.3s;
      }

      /* ICON STYLE */
      .product-icons1 i {
        padding: 8px;
        border-radius: 50%;
        font-size: 14px;
        background: #f1f1f1;
        cursor: pointer;
        transition: 0.3s;
      }

      .product-icons1 i:hover {
        background: #6c63ff;
        color: white;
      }

      /* 🔥 SHOW ON HOVER */
      .product-card-new:hover .product-icons1 {
        opacity: 1;
        transform: translateX(0);
      }

      `}</style>

      <div className="product-section">
        <Container>

          {/* Header */}
          <div className="product-header">

            <div className="d-flex align-items-center">
              <div className="product-headtitle">Kitchen Products</div>

              <div className="timer">
                <div className="timer-box">1396</div>
                <div className="timer-box">13</div>
                <div className="timer-box">01</div>
                <div className="timer-box">10</div>
              </div>
              <div className="proslider-arrows">
                <div className="swiper-prev"><i className="bi bi-chevron-left"></i></div>
                <div className="swiper-next"><i className="bi bi-chevron-right"></i></div>
              </div>
            </div>

          </div>

          {/* Product Slider */}

          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={5}
            slidesPerGroup={1}
            navigation={{
              prevEl: ".swiper-prev",
              nextEl: ".swiper-next",
            }}
            loop={false}
            breakpoints={{
              320:{slidesPerView:1},
              576:{slidesPerView:2},
              768:{slidesPerView:3},
              992:{slidesPerView:4},
              1200:{slidesPerView:5}
            }}
          >

          {products.map((p,index)=>(
            <SwiperSlide key={index}>

              <div 
                className="product-card-new"
                onClick={() => navigate(`/product/${p._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="img-box">
                  <img src={`http://localhost:5000/images/Products${p.img}`} alt="" />

                  {/* ⭐ FEATURED STAR */}
                  {p.featured && (
                    <div className="featured-star">
                      <i className="bi bi-star-fill"></i>
                    </div>
                  )}

                  {/* TOP RIGHT ICON */}
                  <div className="top-icon">
                  <i
                    className="bi bi-bag"
                    onClick={(e) =>
                      addToCart(e, p._id)
                    }
                  ></i>
                  </div>
                </div>

                <div className="product-icons1">
                  <i
                  className="bi bi-bag"
                  onClick={(e) =>
                    addToCart(e, p._id)
                  }
                ></i>
                  <i className="bi bi-eye"></i>
                  <i
                    className="bi bi-arrow-repeat"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCompare(p._id);
                    }}
                  ></i>
                  <i
                  className={`bi ${
                    wishlistIds.includes(p._id)
                      ? "bi-heart-fill"
                      : "bi-heart"
                  }`}
                  onClick={(e) =>
                    addToWishlist(e, p._id)
                  }
                ></i>
                </div>

                <div className="Product-content">
                  {/* STOCK */}
                  <p className="stock">IN STOCK 1 LBS</p>

                  {/* PRICE */}
                  <div className="price-box">
                    <span className="old-price">$8.00</span>
                    <span className="price">{p.price}</span>
                  </div>

                  {/* TITLE */}
                  <h6 className="product-title">{p.name}</h6>

                  {/* BADGES */}
                  <div className="labels">
                    {p.badge && <span className="sale">{p.badge}</span>}
                    {p.discount && <span className="discount">{p.discount}</span>}
                  </div>
                </div>

              </div>

            </SwiperSlide>
          ))}

          </Swiper>

          {/* Bottom banners */}

          <Row>
            <Col md={6}>
              <div className="probanner probanner1">
                30% discount on promotional products!
              </div>
            </Col>

            <Col md={6}>
              <div className="probanner probanner2">
                Extra 10% discount for members!
              </div>
            </Col>
          </Row>

        </Container>
      </div>
    </>
  );
}