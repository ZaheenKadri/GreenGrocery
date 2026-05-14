import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Subscribe from "../Components/Subscribe";

export default function ProductDetail() {
  const { id } = useParams();

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

  const [prevProduct, setPrevProduct] = useState(null);
  const [nextProduct, setNextProduct] = useState(null);
  useEffect(() => {
    const fetchPrevNext = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/prev-next/${id}`
        );
        setPrevProduct(res.data.prev);
        setNextProduct(res.data.next);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPrevNext();
  }, [id]);

  const [product, setProduct] = useState(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
  }, [id]);
  
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/related/${id}`
        );
        setRelatedProducts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRelated();
  }, [id]);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/products/featured"
        );
        setFeaturedProducts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeatured();
  }, []);

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container my-5 product-page">
      <div className="row">

        {/* LEFT IMAGE */}
        <div className="col-md-4 text-center position-relative proimg">
          {/* <span className="badge-sale">SALE 19%</span> */}
          {product.discount && (
            <>
              <span className="badge-sale">{product.badge}</span>
              <span className="badge-sale1">{product.discount}</span>
            </>
          )}

          <img
            src={`http://localhost:5000/images/Products${product.img}`}
            className="main-img"
          />

          <div className="thumbs d-flex justify-content-center mt-3">
            <img src="../images/Products/product-4-300x300.jpeg" />
            <img src="../images/Products/product-4-300x300.jpeg" />
            <img src="../images/Products/product-4-300x300.jpeg" />
            <img src="../images/Products/product-4-300x300.jpeg" />
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="col-md-5 prodetails">

          <p className="breadcrumb">
            HOME • PRODUCTS • {product.name}
          </p>

          <h4 className="title">{product.name}</h4> 

          <p className="price">
            {product.oldPrice && <span className="old">{product.oldPrice}</span>}
            <span className="new">{product.price}</span>
          </p>

          <p className="desc">{product.subText}</p>

          {/* QTY + CART */}
          <div className="d-flex align-items-center gap-3 my-3">

            <div className="qty">
              <button onClick={() => setQty(qty > 1 ? qty - 1 : 1)}>-</button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}>+</button>
            </div>

            <button
              className="btn cart-btn"
              onClick={(e) =>
                addToCart(e, product._id)
              }
            >
              Add To Cart
            </button>

            <i
              className={`bi ${
                wishlistIds.includes(product._id)
                  ? "bi-heart-fill"
                  : "bi-heart"
              } icon`}
              onClick={(e) =>
                addToWishlist(e, product._id)
              }
            ></i>
            <i
            className="bi bi-arrow-repeat icon"
            onClick={(e) => {
              e.stopPropagation();
              addToCompare(product._id);
            }}
            ></i>
          </div>

          <button className="btn buy-btn w-100">Buy Now</button>

          <p className="meta">
            <b>Categories:</b> {product.category?.join(", ")}
          </p>

          <p className="meta">
            <b>Tags:</b> {product.tags?.join(", ")}
          </p>

          <p className="meta">
            <b>Brands:</b> {product.brands?.join(", ")}
          </p>

          {/* SOCIAL */}
          <div className="social d-flex gap-2 mt-2">
            <i className="bi bi-facebook"></i>
            <i className="bi bi-twitter"></i>
            <i className="bi bi-instagram"></i>
            <i className="bi bi-youtube"></i>
            <i className="bi bi-whatsapp"></i>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-md-3 side">

          {/* SERVICE FEATURES */}
          <div className="service-box shipping">
            <i className="bi bi-truck"></i>
            World Class Free Shipping
          </div>

          <div className="service-box secure">
            <i className="bi bi-shield-check"></i>
            100% Secure Shopping
          </div>

          <div className="service-box payment">
            <i className="bi bi-credit-card"></i>
            100% Secure Shopping
          </div>

          <div className="why mt-4">
            <h4>Why GreenGrocery?</h4>
            <ul>
              <li>✔ Free 30-Day returns</li>
              <li>✔ 100% Secured Shopping</li>
              <li>✔ Sold and shipped by GG</li>
              <li>✔ High Level Customization</li>
            </ul>
          </div>

          <div className="deal mt-4">
            <h6>Deals Of The Week</h6>
            <div className="deal-card">
              <img src="/images/left sidebar/3-370x370.png" />
              <button>Check Campaign →</button>
            </div>
          </div>

        </div>
      </div>

      {/* PRODUCT TABS */}
      <div className="product-tabs mt-5">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "description" ? "active" : ""}`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "info" ? "active" : ""}`}
              onClick={() => setActiveTab("info")}
            >
              Additional information
            </button>
          </li>

          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "qa" ? "active" : ""}`}
              onClick={() => setActiveTab("qa")}
            >
              Q & A
            </button>
          </li>
        </ul>

        <div className="tab-content p-3">
          {activeTab === "description" && (
            <>
              <p className="tab-desc">{product.description}</p>
              
              <h6>Features</h6>
              <ul className="feature-list">
                {product.features?.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </>
          )}

          {activeTab === "info" && (
            <>
              <h6>Additional Information</h6>
              <ul className="feature-list">
                <li><b>Weight:</b> {product.weight}</li>
                <li><b>Dimensions:</b> {product.dimensions}</li>
              </ul>
            </>
          )}

          {activeTab === "qa" && (
            <>
              <h6>Q & A</h6>
              <p>No questions yet. Be the first to ask!</p>
            </>
          )}

        </div>
      </div>

      {/* YOU MAY ALSO LIKE */}
      <div className="mt-5">
        <h5 className="section-title">You May Also Like</h5>

        <div className="row">
          {relatedProducts.map((p, index) => (
            <div className="col-lg-2 col-md-4 col-6 mb-4" key={index}>
              <div
                className="product-card-new"
                onClick={() => navigate(`/product/${p._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="img-box">
                  <img
                    src={`http://localhost:5000/images/Products${p.img}`}
                    alt=""
                  />

                  {/* ⭐ FEATURED */}
                  {p.featured && (
                    <div className="featured-star">
                      <i className="bi bi-star-fill"></i>
                    </div>
                  )}

                  {/* TOP ICON */}
                  <div className="top-icon">
                    <i
                    className="bi bi-bag"
                    onClick={(e) =>
                      addToCart(e, p._id)
                    }
                  ></i>
                  </div>
                </div>

                {/* HOVER ICONS */}
                <div className="product-icons1">
                  <i
                    className="bi bi-bag"
                    onClick={(e) =>
                      addToCart(e, p._id)
                    }
                  ></i>
                  <i className="bi bi-eye"></i>
                  <i className="bi bi-arrow-repeat"></i>
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
                  <p className="stock">IN STOCK 1 LBS</p>

                  <div className="price-box">
                    {p.oldPrice && (
                      <span className="old-price">{p.oldPrice}</span>
                    )}
                    <span className="price">{p.price}</span>
                  </div>

                  <h6 className="product-title">{p.name}</h6>

                  <div className="labels">
                    {p.badge && <span className="sale">{p.badge}</span>}
                    {p.discount && (
                      <span className="discount">{p.discount}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* VIEWERS ALSO LIKED */}
      <div className="mt-5">
        <h5 className="section-title">Viewers Also Liked</h5>
        <div className="row">
          {featuredProducts.map((p, index) => (
            <div className="col-lg-2 col-md-4 col-6 mb-4" key={index}>
              <div
                className="product-card-new"
                onClick={() => navigate(`/product/${p._id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="img-box">
                  <img
                    src={`http://localhost:5000/images/Products${p.img}`}
                    alt=""
                  />

                  {/* ⭐ FEATURED */}
                  {p.featured && (
                    <div className="featured-star">
                      <i className="bi bi-star-fill"></i>
                    </div>
                  )}

                  {/* TOP ICON */}
                  <div className="top-icon">
                    <i
                    className="bi bi-bag"
                    onClick={(e) =>
                      addToCart(e, p._id)
                    }
                  ></i>
                  </div>
                </div>

                {/* HOVER ICONS */}
                <div className="product-icons1">
                  <i
                    className="bi bi-bag"
                    onClick={(e) =>
                      addToCart(e, p._id)
                    }
                  ></i>
                  <i className="bi bi-eye"></i>
                  <i className="bi bi-arrow-repeat"></i>
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
                  <p className="stock">IN STOCK 1 LBS</p>

                  <div className="price-box">
                    {p.oldPrice && (
                      <span className="old-price">{p.oldPrice}</span>
                    )}
                    <span className="price">{p.price}</span>
                  </div>

                  <h6 className="product-title">{p.name}</h6>

                  <div className="labels">
                    {p.badge && <span className="sale">{p.badge}</span>}
                    {p.discount && (
                      <span className="discount">{p.discount}</span>
                    )}
                  </div>
                </div>
              </div>
            
            </div>
          ))}
        </div>
        {/* PREV / NEXT BAR */}
        <div className="prev-next-bar d-flex justify-content-between align-items-center mb-4">

          <div
            className="prev-item"
            onClick={() => prevProduct && navigate(`/product/${prevProduct._id}`)}
          >
            <i className="bi bi-arrow-left"></i>
            {prevProduct ? prevProduct.name : "Previous"}
          </div>

          <div
            className="next-item"
            onClick={() => nextProduct && navigate(`/product/${nextProduct._id}`)}
          >
            {nextProduct ? nextProduct.name : "Next"}
            <i className="bi bi-arrow-right"></i>
          </div>

        </div>
      </div>

      {/* STICKY CART BAR */}
      <div className="sticky-cart-bar">
        <div className="cart-left d-flex align-items-center gap-3">
          <img
            src={`http://localhost:5000/images/Products${product.img}`}
            alt=""
            className="cart-img"
          />

          <div>
            <div className="cart-title">{product.name}</div>

            <div className="cart-price">
              {product.oldPrice && (
                <span className="old-price">{product.oldPrice}</span>
              )}
              <span className="new-price">{product.price}</span>
            </div>
          </div>
        </div>

        <button
          className="btn add-cart-btn"
          onClick={(e) =>
            addToCart(e, product._id)
          }
        >
          Add To Cart
        </button>
      </div>
      <Subscribe/>

      {/* INTERNAL CSS */}
      <style>{`
        /* ========================= */
        /* STICKY CART BAR */
        /* ========================= */

        .sticky-cart-bar {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;

          background: #fff;
          border-top: 1px solid #eee;

          padding: 10px 20px;

          display: flex;
          justify-content: space-between;
          align-items: center;

          z-index: 999;
        }

        /* LEFT SIDE */
        .cart-left {
          display: flex;
          align-items: center;
        }

        .bi-heart-fill{
  color:#ff4d6d !important;
}
        /* IMAGE */
        .cart-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          border-radius: 5px;
        }

        /* TITLE */
        .cart-title {
          font-size: 14px;
          font-weight: 500;
        }

        /* PRICE */
        .cart-price {
          font-size: 13px;
        }

        .old-price {
          text-decoration: line-through;
          color: #bbb;
          margin-right: 5px;
        }

        .new-price {
          color: #6c63ff;
          font-weight: 600;
        }

        /* BUTTON */
        .add-cart-btn {
          background: black;
          color: white;
          border-radius: 25px;
          padding: 8px 20px;
          font-size: 14px;
        }

        /* MOBILE RESPONSIVE */
        @media (max-width: 576px) {
          .cart-title {
            font-size: 12px;
          }

          .cart-img {
            width: 40px;
            height: 40px;
          }

          .add-cart-btn {
            padding: 6px 15px;
            font-size: 12px;
          }
        }
        .prev-next-bar {
          padding: 15px 10px;
          border-bottom: 1px solid #eee;
          font-size: 14px;
        }

        .prev-item,
        .next-item {
          cursor: pointer;
          color: #000;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: 0.3s;
        }

        .prev-item:hover,
        .next-item:hover {
          color: #6c63ff;
        }

        .next-item {
          justify-content: flex-end;
        }
        .product-page {
          font-family: Arial;
        }

        .badge-sale {
          position: absolute;
          left: 20px;
          top: 20px;
          background: #efed35;
          padding: 2px 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .badge-sale1 {
          position: absolute;
          left: 20px;
          top: 45px;
          background: #efed35;
          padding: 2px 5px;
          font-size: 12px;
          font-weight: bold;
        }

        .main-img {
          height: 50%;
          width: 80%;
          object-fit: contain;
        }

        .thumbs img {
          width: 45px;
          margin: 5px;
          border: 1px solid #ddd;
          padding: 5px;
          cursor: pointer;
        }

        .breadcrumb {
          font-size: 12px;
          color: gray;
        }

        .title {
          font-weight: bold;
          margin: 10px 0;
        }

        .price .old {
          text-decoration: line-through;
          color: #aaa;
          margin-right: 10px;
        }

        .price .new {
          color: #6f42c1;
          font-weight: bold;
        }

        .desc {
          font-size: 17px;
          color: #666;
        }

        .qty {
          display: flex;
          align-items: center;
          border: 1px solid #ddd;
          border-radius: 20px;
          padding: 5px 10px;
        }

        .qty button {
          border: none;
          background: none;
          font-size: 18px;
        }

        .qty span {
          padding: 0 10px;
        }

        .cart-btn {
          border-radius: 25px;
        }

        .buy-btn {
          background: #6f42c1;
          color: white;
          border-radius: 25px;
          padding: 10px;
          margin-bottom: 10px;
        }

        .icon {
          font-size: 18px;
          cursor: pointer;
        }

        .meta {
          font-size: 13px;
          color: #555;
        }

        .social i {
          background: #eee;
          padding: 6px;
          border-radius: 50%;
          cursor: pointer;
        }

        .side{
          width: 25%
        }

        /* SERVICE BOX */

        .service-box{
          display:flex;
          align-items:center;
          gap:12px;
          padding:13px;
          border-radius:6px;
          margin-top:10px;
          font-size:14px;
          font-weight:500;
          margin-bottom:25px;
        }

        .service-box i{
          font-size:20px;
        }

        .shipping{
          background:#dcd9f6;
          color:#4a45a4;
        }

        .secure{
          background:#cfe8da;
          color:#2e6a57;
        }

        .payment{
          background:#f4efb5;
          color:#8a7f00;
        }

        .why {
          border: 1px solid #eee;
          padding: 10px;
          background: #f2f2f2;
          border-radius: 5px;
        }

        .why ul {
          padding-left: 0;
          font-size: 14px;
          list-style: none;
        }

        .why h4{
          font-size:20px;
          margin-bottom: 30px;
          font-weight: bold;
        }

        .why li{
          margin-bottom: 10px;
        }

        .deal-card {
          position: relative;
        }

        .deal h6{
          font-size:20px;
          font-weight: bold;
        }

        .deal-card img {
          width: 100%;
          border-radius: 10px;
          object-fit: cover;
        }

        .deal-card button {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: black;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        /* TABS */
        .product-tabs .nav-tabs {
          border-bottom: 1px solid #ddd;
        }

        .product-tabs .nav-link {
          color: #555;
          font-size: 14px;
        }

        .product-tabs .nav-link.active {
          border: none;
          border-bottom: 2px solid #6f42c1;
          color: #000;
          font-weight: bold;
        }

        /* TAB CONTENT */
        .tab-desc {
          font-size: 14px;
          color: #666;
        }

        .feature-list {
          list-style: none;
          padding-left: 0;
        }

        .feature-list li {
          margin-bottom: 8px;
          position: relative;
          padding-left: 15px;
        }

        .feature-list li::before {
          content: "•";
          position: absolute;
          left: 0;
        }

        /* SECTION TITLE */
        .section-title {
          font-weight: bold;
          margin-bottom: 20px;
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

        .product-card:hover .product-icons1{
          opacity:1;
          transform:translateX(0);
        }

        .product-img{
          width:100%;
          height:150px;
          object-fit:contain;
        }

        .product-icons1{
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

        .product-icons1 i{
          background:#f1f1f1;
          padding:7px;
          border-radius:50%;
          font-size:13px;
          cursor:pointer;
        }

        .product-icons1 i:hover{
          background:#6c63ff;
          color:white;
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

        @media (max-width:780px){
          .side{
            width:100%
          }

          .proimg{
            width:100%
          }

          .prodetails{
            width:100%
          }

          .procard{
            width:25%
          }
        }

        @media (max-width: 480px) {
          .procard {
            width: 50%;
          }
        }
      `}</style>
    </div>
  );
}