import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Bestseller() {
  
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
    const navigate = useNavigate(); // 👈 ADD THIS

    useEffect(() => {
        const fetchBestsellers = async () => {
            try {
            const res = await axios.get("http://localhost:5000/api/products/bestsellers");
            setProducts(res.data.data);
            } catch (err) {
            console.error("Error fetching bestsellers:", err);
            }
        };

        fetchBestsellers();
    }, []);

    return (
    <>
        <style>{`
            .bestseller-section{
                padding:120px 0;
                background:#f7f7f8;
            }

            .featured-tag{
                display:inline-block;
                background:#7d6ee7;
                color:white;
                padding:6px 16px;
                border-radius:20px;
                font-size:12px;
                letter-spacing:2px;
                margin-bottom:15px;
            }

            .bestseller-title{
                font-size:28px;
                font-weight:600;
                margin-bottom:15px;
            }

            .bestseller-desc{
                color:#666;
                margin-bottom:25px;
            }

            /* PRODUCT CARD */
            .product-card{
                border:1px solid #eee;
                border-radius:10px;
                padding:20px;
                text-align:center;
                background:white;
                position:relative;
                transition:0.3s;
            }

            .product-card:hover{
                box-shadow:0 8px 20px rgba(0,0,0,0.08);
            }

            .product-card img{
                height:120px;
                object-fit:contain;
                margin-bottom:15px;
            }

            /* HOVER ICONS */
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

            .product-card:hover .product-icons{
                opacity:1;
                transform:translateX(0);
            }

            .product-icons i{
                background:#f1f1f1;
                padding:7px;
                border-radius:50%;
                font-size:13px;
                cursor:pointer;
                transition:0.2s;
            }

            .product-icons i:hover{
               background:#6c63ff;
                color:white;
            }

            /* TEXT */
            .product-stock{
                font-size:12px;
                color:#4caf50;
                margin-bottom:5px;
            }

            .product-price{
                margin:8px 0;
            }

            .old-price{
                text-decoration:line-through;
                color:#bbb;
                margin-right:6px;
            }

            .new-price{
                color:#6c63ff;
                font-weight:600;
            }

            .product-name{
                font-size:14px;
                font-weight:500;
            }

            /* ARROWS */
            .proslider-arrows{
                display:flex;
                gap:10px;
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
            }

            .check-btn{
                border-radius:30px;
                padding:12px 25px;
            }

            .right-section{
                background:white;
                padding:40px 20px;
                border-radius:5px;
            }

            .bestsellertitle{
                display:flex;
                justify-content:space-between;
                margin-bottom:10px;
            }

        `}</style>

        <div className="bestseller-section">
            <Container>
                <Row>
                    {/* LEFT TEXT */}
                    <Col md={4} className="align-content-center">
                        <div className="featured-tag">
                            FEATURED
                        </div>
                        <div className="bestseller-title">
                            Bestsellers Of The Week
                        </div>
                        <div className="bestseller-desc">
                            Made from premium non-stretch Japanese denim for a vintage-inspired look.
                        </div>
                        <Button variant="outline-dark" className="check-btn">
                            Check Other Products →
                        </Button>
                    </Col>

                    {/* RIGHT SLIDER */}
                    <Col md={8} className="right-section">
                        <div className="bestsellertitle">
                            <div className="product-title">
                                Products
                            </div>
                            <div className="proslider-arrows">
                                <div className="swiper-prev">
                                    <i className="bi bi-chevron-left"></i>
                                </div>
                                <div className="swiper-next">
                                    <i className="bi bi-chevron-right"></i>
                                </div>
                            </div>
                        </div>

                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                prevEl: ".swiper-prev",
                                nextEl: ".swiper-next",
                            }}
                            slidesPerView={4}
                            spaceBetween={20}
                            breakpoints={{
                                0:{slidesPerView:1},
                                576:{slidesPerView:2},
                                768:{slidesPerView:3},
                                992:{slidesPerView:4}
                            }}
                            >
                            {products.map((item,index)=>(
                                <SwiperSlide key={index}>
                                <div className="product-card">

                                    <div className="product-icons">
                                    <i className="bi bi-bag"></i>
                                    <i className="bi bi-eye"></i>
                                    <i
                                        className="bi bi-arrow-repeat"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCompare(item._id);
                                        }}
                                        ></i>
                                    <i className="bi bi-heart"></i>
                                    </div>

                                    <img 
                                    src={`http://localhost:5000/images/Products${item.img}`} 
                                    alt={item.name}
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    />

                                    <div className="product-stock">
                                    {item.status}
                                    </div>

                                    <div className="product-price">
                                    <span className="old-price">{item.oldPrice}</span>
                                    <span className="new-price">{item.price}</span>
                                    </div>

                                    <div 
                                    className="product-name"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    >
                                    {item.name}
                                    </div>

                                </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </Col>
                </Row>
            </Container>
        </div>

    </>
    );
}