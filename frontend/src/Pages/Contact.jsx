import React, { useState } from "react";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "../Components/Subscribe";
import { useBootstrapBreakpoints } from "react-bootstrap/esm/ThemeProvider";

export default function Contact() {

  // ✅ STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  // ✅ HANDLE CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ SCROLL FUNCTION
  const scrollToForm = () => {
    const form = document.getElementById("contactForm");

    if (form) {
      form.scrollIntoView({ behavior: "smooth" });
    }

    Swal.fire({
      title: "Opening Contact Form",
      icon: "info",
      confirmButtonColor: "#5c8f73"
    });
  };

  // ✅ HANDLE SUBMIT (CONNECTED TO BACKEND)
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          title: "Message Sent!",
          text: "Saved to database successfully",
          icon: "success",
          confirmButtonColor: "#5c8f73"
        });

        // RESET FORM
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });

      } else {
        throw new Error(data.message);
      }

    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message || "Something went wrong",
        icon: "error"
      });
    }

    setLoading(false);
  };

  return (
    <>
      <div className="contact-page">

        {/* HERO SECTION */}
        <section className="contact-hero">

          <img src="/images/Contact/hero-default-bg.png" alt="banner" className="hero-img" />

          <div className="hero-overlay">
            <p className="hero-small">SEND A MESSAGE</p>

            <h1>Contact With Professionals</h1>

            <button className="btn hero-btn" onClick={scrollToForm}>
              Go To Form <i className="bi bi-chevron-down ms-1"></i>
            </button>
          </div>

        </section>

        {/* CONTACT SECTION */}
        <section className="container contact-section" id="contactForm">
          <div className="row g-4">

            {/* MAP */}
            <div className="col-lg-6">
              <div className="map-box">
                <iframe
                  title="map"
                  src="https://maps.google.com/maps?q=london&t=&z=5&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            {/* FORM */}
            <div className="col-lg-6">

              <h3 className="form-title">Contact Form</h3>

              <form onSubmit={handleSubmit}>

                <label className="form-label">YOUR NAME</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control custom-input"
                  required
                />

                <label className="form-label mt-3">YOUR EMAIL</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control custom-input"
                  required
                />

                <label className="form-label mt-3">SUBJECT</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control custom-input"
                />

                <label className="form-label mt-3">
                  YOUR MESSAGE (OPTIONAL)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-control custom-textarea"
                  rows="5"
                ></textarea>

                <button
                  className="btn send-btn w-100 mt-4"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send"}
                </button>

              </form>

            </div>

          </div>
        </section>

      </div>

      <Subscribe />

      {/* CSS */}
      <style>{`

      .contact-page{
        background:#f5f5f5;
        overflow-x:hidden;
      }

      .contact-hero{
        position:relative;
        height:340px;
        overflow:hidden;
      }

      .hero-img{
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .hero-overlay{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        display:flex;
        flex-direction:column;
        justify-content:center;
        align-items:center;
        text-align:center;
      }

      .hero-small{
        font-size:14px;
        letter-spacing:2px;
        font-weight:600;
        color:#4b7c60;
      }

      .hero-overlay h1{
        font-size:40px;
        margin:10px 0 20px;
        font-weight:600;
        color:#4b7c60;
      }

      .hero-btn{
        background:#5c8f73;
        color:white;
        border-radius:25px;
        padding:10px 28px;
        border:none;
      }

      .hero-btn:hover{
        background:#4a765e;
      }

      .contact-section{
        padding:60px 0;
      }

      .map-box iframe{
        width:100%;
        height:601px;
        border:0;
        border-radius:6px;
      }

      .form-title{
        margin-bottom:20px;
        font-weight:600;
      }

      .custom-input{
        border-radius:25px;
        padding:12px 16px;
      }

      .custom-textarea{
        border-radius:20px;
        padding:12px;
      }

      .send-btn{
        background:#111;
        color:white;
        border-radius:25px;
        padding:12px;
        border:none;
      }

      .send-btn:hover{
        background:#333;
      }

      @media(max-width:768px){
        .map-box iframe{
          height:320px;
        }
      }

      `}</style>
    </>
  );
}

