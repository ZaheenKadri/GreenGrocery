import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Subscribe from "../Components/Subscribe";

export default function FAQs() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  useEffect(() => {
  const fetchProducts = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  fetchProducts();
}, []);

const addToCompare = async (productId) => {

  try {

    const token = localStorage.getItem("token");

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

    alert(res.data.message);

    // refresh navbar compare count
    window.dispatchEvent(new Event("compareUpdated"));

  } catch (error) {

    console.log(error);

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

  const [openItem, setOpenItem] = useState(null);
  const [faqs, setFaqs] = useState({});

  const toggleAccordion = (id) => {
    setOpenItem(openItem === id ? null : id);
  };

  const showAlert = (msg) => {
    Swal.fire({
      title: msg,
      text: "More information coming soon!",
      icon: "info",
      confirmButtonColor: "#6f42c1"
    });
  };

  // 🔥 FETCH FAQ FROM BACKEND
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/faqs");
        setFaqs(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <>
      <div className="faq-wrapper">

        {/* HERO */}
        <section className="faq-hero text-center">
          <h1>FAQ</h1>
          <p>Home • FAQ</p>
        </section>

        {/* FAQ SECTION */}
        <section className="container faq-section">
          <div className="row g-5">

            {/* 🔥 DYNAMIC FAQ */}
            {Object.keys(faqs).map((category, index) => (
              <div className="col-lg-6" key={index}>

                <h5 className="faq-title">{category}</h5>

                {faqs[category].map((faq, i) => {

                  const id = `${category}-${i}`;

                  return (
                    <div className="faq-item" key={id}>

                      <button
                        className="faq-header"
                        onClick={() => toggleAccordion(id)}
                      >
                        <span className="icon">
                          {openItem === id ? "−" : "+"}
                        </span>

                        {faq.question}
                      </button>

                      {openItem === id && (
                        <div className="faq-body">
                          {faq.answer}
                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            ))}

          </div>
        </section>

        {/* PRODUCTS */}
        <section className="container products-section">

          <h5 className="mb-4">Recommended Products</h5>

          <div className="products-grid">

            {products.map((p,i)=>(
  <div
    className="product-cell"
    key={i}
    onClick={() => navigate(`/product/${p._id}`)}
    style={{ cursor: "pointer" }}
  >

    <div className="product-image">
      <img
        src={`http://localhost:5000/images/Products${p.img}`}
        alt={p.name}
      />
    </div>

    <div className="product-info">

      <span className="stock">
        {p.status || "IN STOCK"}
      </span>

      <p className="product-title">
        {p.name}
      </p>

      <div className="price">

        {p.oldPrice && (
          <span className="old">
            {p.oldPrice}
          </span>
        )}

        <span className="new">
          {p.price}
        </span>

      </div>

    </div>

    <div className="product-actions">

      <i
        className="bi bi-bag"
        onClick={(e) => {
          e.stopPropagation();
          showAlert("Add To Cart");
        }}
      ></i>

      <i
        className="bi bi-eye"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/product/${p._id}`);
        }}
      ></i>

      <i
        className="bi bi-arrow-repeat"
        onClick={(e) => {
          e.stopPropagation();
          addToCompare(p._id);
        }}
      ></i>

      <i
        className="bi bi-heart"
        onClick={(e) => {
          e.stopPropagation();
          showAlert("Wishlist");
        }}
      ></i>

    </div>

  </div>
))}

          </div>

        </section>

      </div>

      <Subscribe />

      <style>{`

      .faq-wrapper{
      background:#f7f7f7;
      padding-bottom:60px;
      overflow-x:hidden;
      }

      .faq-section{
      padding:70px 0;
      }

      .faq-title{
      font-size:16px;
      font-weight:600;
      margin-bottom:15px;
      }

      .faq-item{
      border:1px solid #e5e5e5;
      border-bottom:none;
      }

      .faq-item:last-child{
      border-bottom:1px solid #e5e5e5;
      }

      .faq-header{
      width:100%;
      background:#f7f7f7;
      border:none;
      text-align:left;
      padding:14px 18px;
      font-size:12px;
      font-weight:600;
      letter-spacing:1px;
      display:flex;
      align-items:center;
      gap:10px;
      cursor:pointer;
      }

      .icon{
      font-size:18px;
      width:20px;
      }

      .faq-body{
      padding:18px;
      font-size:13px;
      color:#555;
      border-top:1px solid #e5e5e5;
      background:white;
      }

      .faq-hero{
      background-image:url("/images/Hero/banner-1350-12.png");
      background-size:cover;
      background-position:center;
      padding:80px 20px;
      }

      .products-grid{
      display:grid;
      grid-template-columns:repeat(5,1fr);
      border:1px solid #eee;
      }

      .product-cell{
      display:flex;
      align-items:center;
      gap:15px;
      padding:15px;
      border-right:1px solid #eee;
      border-bottom:1px solid #eee;
      background:white;
      position:relative;
      transition:0.25s;
      }

      .product-cell:hover{
      border:1px solid #6f42c1;
      z-index:2;
      }

      .product-image img{
      width:60px;
      height:60px;
      object-fit:contain;
      }

      .product-info{
      flex:1;
      transition:0.25s;
      }

      .stock{
      font-size:11px;
      font-weight:600;
      color:#2f9e44;
      }

      .product-title{
      font-size:13px;
      margin:3px 0;
      }

      .price{
      font-size:12px;
      }

      .old{
      text-decoration:line-through;
      color:#aaa;
      margin-right:6px;
      }

      .new{
      color:#6f42c1;
      font-weight:600;
      }

      .product-actions{
          position: absolute;
          top: 50%;
          left: 65%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 10px;
          opacity: 0;
          transition: 0.3s;
      }

      .product-actions i{
          background: #f3f3f3;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          font-size: 14px;
      }

      .product-actions i:hover{
      background:#6f42c1;
      color:white;
      }

      .product-cell:hover .product-info{
      opacity:0;
      }

      .product-cell:hover .product-actions{
      opacity:1;
      }

      @media(max-width:1024px){
      .products-grid{
      grid-template-columns:repeat(3,1fr);
      }
      }

      @media(max-width:768px){
      .products-grid{
      grid-template-columns:repeat(2,1fr);
      }
      }

      @media(max-width:480px){
      .products-grid{
      grid-template-columns:1fr;
      }
      }

      `}</style>
    </>
  );
}