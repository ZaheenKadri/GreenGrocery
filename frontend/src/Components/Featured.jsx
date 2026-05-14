import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function ProductColumns() {
  const navigate = useNavigate();
  
    const [featured, setFeatured] = useState([]);
    const [bestseller, setBestseller] = useState([]);
    const [onSale, setOnSale] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
            const featuredRes = await axios.get("http://localhost:5000/api/products/featured");
            const bestsellerRes = await axios.get("http://localhost:5000/api/products/bestsellers");

            const saleRes = await axios.get("http://localhost:5000/api/products/campaign-products/25");

            setFeatured(featuredRes.data.data);
            setBestseller(bestsellerRes.data.data); 
            setOnSale(saleRes.data.data);

            } catch (err) {
            console.error("Error fetching column products:", err);
            }
        };

        fetchData();
    }, []);

    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

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

    const ProductSlider = ({ title, data, prev, next }) => {

        const groupedData = chunkArray(data, 3); // ✅ now valid

        return (
            <div className="product-col">

                <div className="col-header">
                    <h5>{title}</h5>
                    <div className="slider-arrows">
                        <div className={prev}><i className="bi bi-chevron-left"></i></div>
                        <div className={next}><i className="bi bi-chevron-right"></i></div>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        prevEl: `.${prev}`,
                        nextEl: `.${next}`
                    }}
                    slidesPerView={1}
                    spaceBetween={15}
                >
                    {groupedData.map((group, i) => (
                        <SwiperSlide key={i}>
                            {group.map((item, index) => (
                                // <div className="mini-card" key={index}>
                                <div
                                    className="mini-card"
                                    key={index}
                                    onClick={() => navigate(`/product/${item._id}`)}
                                    style={{ cursor: "pointer" }}
                                >

                                    <div className="mini-img">
                                        <img src={`http://localhost:5000/images/Products${item.img}`} alt="" />
                                    </div>

                                    <div className="mini-info">

                                        <div className="product-details">
                                            <div className="stock">{item.status}</div>

                                            <div className="mini-name">
                                                {item.name}
                                            </div>

                                            <div className="mini-price">
                                                <span className="old">{item.oldPrice}</span>
                                                <span className="new">{item.price}</span>
                                            </div>
                                        </div>

                                        <div className="product-actions">
                                            <i
                                                className="bi bi-bag"
                                                onClick={(e) =>
                                                    addToCart(e, item._id)
                                                }
                                            ></i>
                                            <i className="bi bi-eye"></i>
                                            <i
                                                className="bi bi-arrow-repeat"
                                                onClick={(e) => {
                                                    e.stopPropagation();

                                                    addToCompare(item._id);

                                                    // 🔥 refresh compare navbar/sidebar
                                                    window.dispatchEvent(new Event("compareUpdated"));
                                                }}
                                            ></i>
                                            <i
                                            className={`bi ${
                                                wishlistIds.includes(item._id)
                                                ? "bi-heart-fill"
                                                : "bi-heart"
                                            }`}
                                            onClick={(e) =>
                                                addToWishlist(e, item._id)
                                            }
                                            ></i>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        );
    };
    return (
    <>

        <style>{`
            .section-products{
                padding:40px 0 0;
                font-family:Poppins;
            }

            .banner-img{
                height:420px;
                width:260px;
            }

            .product-col{
                background:white;
            }

            .col-header{
                display:flex;
                justify-content:space-between;
                align-items:center;
                margin-bottom:15px;
            }

            .slider-arrows{
                display:flex;
                gap:10px;
            }

            .slider-arrows div{
                width:28px;
                height:28px;
                border:1px solid #ddd;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:50%;
                cursor:pointer;
            }

            .mini-width{
                width:275px;
            }

            .mini-card{
                display:flex;
                gap:15px;
                padding:12px;
                border:1px solid #eee;
                border-radius:8px;
                margin-bottom:12px;
                align-items:center;
                position:relative;
                overflow:hidden;
            }

            .mini-card img{
                width:60px;
                height:60px;
                object-fit:contain;
                transition:0.3s;
            }

            /* PRODUCT INFO */
            .mini-info{
                position:relative;
                width:100%;
            }

            .product-details{
                transition:0.3s;
            }

            /* ACTION ICONS */
            .product-actions{
                position:absolute;
                top:50%;
                left:50%;
                transform:translate(-50%,-50%);
                display:flex;
                gap:10px;
                opacity:0;
                transition:0.3s;
            }

            .product-actions i{
                background:#f3f3f3;
                width:32px;
                height:32px;
                display:flex;
                align-items:center;
                justify-content:center;
                border-radius:50%;
                cursor:pointer;
                font-size:14px;
            }

            .product-actions i:hover{
                background:#6f42c1;
                color:white;
            }

            /* HOVER EFFECT */
            .mini-card:hover img{
                opacity:0.2;
            }

            .mini-card:hover .product-details{
                opacity:0;
            }

            .mini-card:hover .product-actions{
                opacity:1;
            }

            /* TEXT */
            .stock{
                color:#2e7d32;
                font-size:11px;
                font-weight:600;
            }

            .mini-name{
                font-size:14px;
                font-weight:500;
                margin:3px 0;
            }

            .old{
                text-decoration:line-through;
                color:#bbb;
                margin-right:5px;
            }

            .new{
                color:#5a4bd4;
                font-weight:600;
            }

        `}</style>

        <div className="section-products">
            <Container>
                <Row>
                    <Col md={3} className="mini-width">
                        <img src="../images/vertical-banner-1.png" className="banner-img"/>
                    </Col>

                    <Col md={3} className="mini-width">
                        <ProductSlider title="Featured" data={featured} prev="prev1" next="next1"/>
                    </Col>

                    <Col md={3} className="mini-width">
                        <ProductSlider title="On Sale" data={onSale} prev="prev2" next="next2"/>
                    </Col>

                    <Col md={3} className="mini-width">
                        <ProductSlider title="Bestseller" data={bestseller} prev="prev3" next="next3"/>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
    );
}