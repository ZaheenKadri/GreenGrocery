import React, { useState, useEffect } from "react";
import Subscribe from "../Components/Subscribe";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";

export default function Order() {

  const images = [
    "/images/Order/product-42-300x300.jpeg",
    "/images/Order/product-51-300x300.jpeg",
  ];

  const [current, setCurrent] = useState(0);

  // 🔥 NEW STATES
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 TRACK ORDER FUNCTION
  const handleTrack = async () => {
    if (!orderId || !email) {
      Swal.fire("Error", "Please fill all fields", "warning");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/orders/track", {
        orderId,
        email
      });

      setOrderData(res.data);

      Swal.fire("Success", "Order Found!", "success");

    } catch (err) {
      setOrderData(null);
      Swal.fire("Error", "Order not found", "error");
    }
  };

  return (
    <>
      <div className="container-fluid order-wrapper">
        <div className="row">

          {/* LEFT FORM */}
          <div className="col-lg-6 col-md-12 p-5 order-form">
            <h2 className="title">Order Tracking Form</h2>

            <p className="desc">
              To track your order please enter your Order ID in the box below
              and press the "Track" button. This was given to you on your
              receipt and in the confirmation email you should have received.
            </p>

            <label className="label">ORDER ID</label>
            <input
              type="text"
              className="form-control input-box"
              placeholder="Found in your order confirmation email."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />

            <label className="label mt-3">BILLING EMAIL</label>
            <input
              type="email"
              className="form-control input-box"
              placeholder="Email you used during checkout."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button className="track-btn mt-4" onClick={handleTrack}>
              Track
            </button>

            {/* 🔥 RESULT SECTION */}
            {orderData && (
              <div className="mt-4 p-3 bg-white border rounded">

                <h5>Order Details</h5>

                <p><strong>Order ID:</strong> {orderData.orderId}</p>
                <p><strong>Status:</strong> {orderData.status}</p>
                <p><strong>Total:</strong> ${orderData.total}</p>

                <h6>Items:</h6>
                {orderData.items.map((item, i) => (
                  <div key={i}>
                    {item.name} (x{item.qty}) - ${item.price}
                  </div>
                ))}

              </div>
            )}

          </div>

          {/* RIGHT PRODUCT */}
          <div className="col-lg-6 col-md-12 p-5 product-side">
            <h2 className="title">Bestseller Fresh Produce</h2>

            <div className="product-card">
              <div className="row align-items-center">

                <div className="col-md-7 col-12">
                  <h5 className="product-title">
                    Naturally refined coconut oil
                  </h5>

                  <p className="product-text">
                    Vestibulum tortor quam, feugiat vitae, ultricies eget,
                    tempor sit amet.
                  </p>

                  <p className="price">$4.00 – $5.45</p>

                  <a href="#" className="view-link">
                    View products
                  </a>
                </div>

                <div className="col-md-5 col-12 text-center">
                  <img
                    src={images[current]}
                    alt="product"
                    className="product-img"
                  />
                </div>

              </div>

              {/* dots */}
              <div className="dots">
                {images.map((_, index) => (
                  <span
                    key={index}
                    className={index === current ? "dot active" : "dot"}
                    onClick={() => setCurrent(index)}
                  ></span>
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      <Subscribe />

      {/* CSS */}
      <style>{`

      .order-wrapper{
      background:#f7f7f7;
      min-height:100vh;
      }

      .title{
      font-weight:600;
      margin-bottom:15px;
      }

      .desc{
      color:#666;
      font-size:15px;
      line-height:1.6;
      max-width:500px;
      }

      .label{
      font-size:12px;
      font-weight:600;
      margin-top:15px;
      }

      .input-box{
      border-radius:30px;
      padding:12px 20px;
      margin-top:6px;
      border:1px solid #ddd;
      }

      .track-btn{
      background:#111;
      color:#fff;
      border:none;
      padding:12px 40px;
      border-radius:30px;
      font-weight:500;
      }

      .product-card{
      background:#fff;
      border-radius:10px;
      padding:50px;
      margin-top:20px;
      border:1px solid #eee;
      height: 90%;
      }

      .product-title{
      font-weight:600;
      margin-bottom:10px;
      }

      .product-text{
      color:#666;
      font-size:14px;
      }

      .price{
      font-weight:500;
      margin:10px 0;
      }

      .view-link{
      color:#000;
      font-weight:500;
      text-decoration:none;
      }

      .product-img{
      width:240px;
      height:auto;
      transition:0.4s;
      }

      .dots{
      display:flex;
      justify-content:center;
      align-items:center;
      gap:12px;
      margin-top:20px;
      }

      .dot{
      width:14px;
      height:14px;
      border:2px solid #cfcfcf;
      border-radius:50%;
      position:relative;
      cursor:pointer;
      }

      .dot::after{
      content:"";
      position:absolute;
      top:50%;
      left:50%;
      transform:translate(-50%,-50%);
      width:6px;
      height:6px;
      background:black;
      border-radius:50%;
      opacity:0;
      transition:0.3s;
      }

      .dot.active{
      border-color:black;
      }

      .dot.active::after{
      opacity:1;
      }

      @media(max-width:768px){
      .order-form{ padding:30px 20px; }
      .product-side{ padding:30px 20px; }
      .product-card{ padding:20px; }
      .product-img{ width:120px; margin-top:20px; }
      }

      @media(max-width:320px){
      .title{ font-size:20px; }
      .desc{ font-size:13px; }
      .track-btn{ width:100%; }
      }

      `}</style>
    </>
  );
}