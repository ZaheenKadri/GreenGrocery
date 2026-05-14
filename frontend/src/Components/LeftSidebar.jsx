import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function LeftSidebar() {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(null);
  
  // TESTIMONIAL STATE
  const [testimonials, setTestimonials] = useState([]);
  const [current, setCurrent] = useState(0);

  const showAlert = (text) => {
    Swal.fire({
      title: text,
      text: "Category Clicked",
      icon: "info",
      confirmButtonColor: "#6f42c1"
    });
  };

  // 🔥 FETCH TESTIMONIALS
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/testimonials");
        setTestimonials(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchTestimonials();
  }, []);

  //  AUTO SLIDER
  useEffect(() => {
    if (testimonials.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [testimonials]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/categories");

        setCategories(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
  }, []);

  const [categories, setCategories] = useState([]);
  // const categories = [
  //   {
  //     name: "Bakery",
  //     img: "/images/Category/041-bun-bread-80x80.png",
  //     sub: ["Fresh Bakery Breads", "Muffins & Donuts", "Rolls & Buns", "Tortillas"]
  //   },
  //   {
  //     name: "Bread",
  //     img: "/images/Category/020-bread-80x80.png",
  //     sub: ["White Bread", "Brown Bread", "Sandwich Bread"]
  //   },
  //   {
  //     name: "Candy",
  //     img: "/images/Category/047-candies-80x80.png",
  //     sub: ["Chocolates", "Gummies", "Lollipops"]
  //   },
  //   {
  //     name: "Coffee",
  //     img: "/images/Category/037-coffee-pack-80x80.png",
  //     sub: ["Instant Coffee", "Ground Coffee", "Cold Brew"]
  //   },
  //   {
  //     name: "Dairy & Eggs",
  //     img: "/images/Category/005-eggs-basket-80x80.png",
  //     sub: ["Milk", "Cheese", "Butter", "Eggs"]
  //   },
  //   {
  //     name: "Fresh Produce",
  //     img: "/images/Category/042-fruit-80x80.png",
  //     sub: ["Fruits", "Vegetables", "Herbs"]
  //   },
  //   {
  //     name: "Frozen",
  //     img: "/images/Category/045-ice-cream-cone-80x80.png",
  //     sub: ["Ice Cream", "Frozen Veg", "Frozen Snacks"]
  //   },
  //   {
  //     name: "Meat & Fish",
  //     img: "/images/Category/050-roasted-chicken-80x80.png",
  //     sub: ["Chicken", "Fish", "Mutton"]
  //   },
  //   {
  //     name: "Meat & Seafoods",
  //     img: "/images/Category/022-tuna-can-80x80.png",
  //     sub: ["Crab", "Prawns", "Salmon"]
  //   },
  //   {
  //     name: "Organic Foods",
  //     img: "/images/Category/043-berries-80x80.png",
  //     sub: ["Organic Fruits", "Organic Veg", "Organic Snacks"]
  //   },
  //   {
  //     name: "Snacks",
  //     img: "/images/Category/049-packet-80x80.png",
  //     sub: ["Chips", "Biscuits", "Namkeen"]
  //   }
  // ];

  return (
    <>
      <style>{`

      .leftsidebar{
        width:100%;
      }

      .category-box{
        background:#fff;
        border:1px solid #eee;
        border-radius:6px;
        padding:10px 0;
        margin-bottom:20px;
        margin-top: 10%;
      }

      .category-item{
        display:flex;
        align-items:center;
        justify-content:space-between;
        padding:10px 15px;
        font-size:14px;
        cursor:pointer;
        position: relative; 
      }

      .category-left{
        display:flex;
        align-items:center;
        gap:10px;
      }

      .category-icon{
        width:22px;
        height:22px;
      }

       /*  SUBMENU */
      .submenu{
        position:absolute;
        top:0;
        left:100%;
        width:220px;
        background:#fff;
        border:1px solid #eee;
        border-radius:6px;
        padding:10px;
        display:none;
        z-index:100;
        box-shadow:0 5px 15px rgba(0,0,0,0.1);
      }

      .category-item:hover .submenu{
        display:block;
      }

      .submenu-item{
        padding:8px 10px;
        font-size:14px;
        display:flex;
        align-items:center;
        gap:8px;
        cursor:pointer;
      }

      .submenu-item:hover{
        background:#f5f5f5;
      }

      .see-more{
        font-size:13px;
        padding:10px 15px;
        color:#6f42c1;
        cursor:pointer;
      }

      /* PROMO CARD */

      .promo-card{
        position:relative;
        border-radius:6px;
        overflow:hidden;
        margin-bottom:20px;
      }

      .promo-card img{
        width:100%;
        height:300px;
        object-fit:cover;
      }

      .promo-content{
        position:absolute;
        left:15px;
        color:#fff;
        top: 10%;
        font-weight: 600;
        font-size: 20px;
      }

      .promo-btn{
        background: #000;
        border: none;
        padding: 7px 25px;
        font-size: 15px;
        border-radius: 20px;
        color: #fff;
        margin-top: 80%;
        font-weight: 500;
      }

      /* FEATURED */

      .featured-box{
        background:#fff;
        border:1px solid #eee;
        border-radius:6px;
        padding:10px;
      }

      .featured-title{
        font-weight:600;
        font-size:14px;
        margin-bottom:10px;
      }

      .featured-item{
        display:flex;
        align-items:center;
        gap:10px;
        padding:8px 0;
        border-bottom:1px solid #f0f0f0;
      }

      .featured-item:last-child{
        border-bottom:none;
      }

      .featured-img{
        width:45px;
        height:45px;
        object-fit:cover;
      }

      .stock{
        font-size:11px;
        color:green;
      }

      .price{
        font-size:13px;
        font-weight:600;
      }

      /* TESTIMONIAL */

      .testimonial-slide{
  transition: all 0.5s ease;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn{
  from{
    opacity:0;
    transform: translateY(10px);
  }
  to{
    opacity:1;
    transform: translateY(0);
  }
}

      .testimonial-box{
        background:#f2f2f2;
        padding:25px;
        border-radius:6px;
        text-align:center;
        margin-top:20px;
      }

      .testimonial-text{
        font-size:14px;
        color:#555;
        line-height:1.6;
      }

      .testimonial-name{
        font-weight:600;
        margin-top:20px;
      }

      .testimonial-role{
        font-size:12px;
        letter-spacing:1px;
        color:#888;
      }

      /* SERVICE BOX */

      .service-box{
        display:flex;
        align-items:center;
        gap:12px;
        padding:14px;
        border-radius:6px;
        margin-top:12px;
        font-size:14px;
        font-weight:500;
        margin-bottom:20px;
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

      /* ===================== RESPONSIVE ===================== */

      @media (max-width:768px){

        .promo-card img{
          height:220px;
        }

        .featured-item{
          align-items:flex-start;
        }

      }

      @media (max-width:480px){

        .category-item{
          font-size:13px;
          padding:8px 12px;
        }

        .promo-card img{
          height:200px;
        }

        .featured-img{
          width:40px;
          height:40px;
        }

        .testimonial-box{
          padding:20px;
        }

      }

      @media (max-width:360px){

        .promo-card img{
          height:180px;
        }

        .testimonial-text{
          font-size:13px;
        }

        .service-box{
          font-size:13px;
          padding:12px;
        }

      }

      @media (max-width:320px){

        .category-item{
          font-size:12px;
          padding:7px 10px;
        }

        .category-icon{
          width:18px;
          height:18px;
        }

        .promo-card img{
          height:160px;
        }

        .featured-img{
          width:36px;
          height:36px;
        }

        .testimonial-box{
          padding:15px;
        }

        .service-box{
          font-size:12px;
          gap:8px;
        }

      }

      `}</style>

      <div className="leftsidebar">

        {/* CATEGORY LIST */}

        <div className="category-box">

        {categories.map((cat, i) => (
          <div
            key={i}
            className="category-item"
            onMouseEnter={() => setActiveIndex(i)}
            onMouseLeave={() => setActiveIndex(null)}
          >

            <div className="category-left" onClick={() => navigate(`/product/category/${cat.name}`)}>
              <img src={`http://localhost:5000/images/Category${cat.img}`} className="category-icon" />
              {cat.name}
            </div>

            {cat.subcategories?.length > 0 && (
              <i className="bi bi-chevron-right"></i>
            )}

            {/* SUBMENU */}
            {activeIndex === i && cat.subcategories?.length > 0 && (
              <div className="submenu">
                {cat.subcategories.map((sub, index) => (
                  <div
                    key={index}
                    className="submenu-item"
                    onClick={() =>
                      navigate(
                        `/product/category/${cat.name}/${sub}`
                      )
                    }
                    // onClick={() => showAlert(sub)}
                  >
                    {sub}
                  </div>
                ))}
              </div>
            )}

          </div>
        ))}

        <div className="see-more">See More</div>

      </div>

        {/* DAIRY PROMO */}

        <div className="promo-card">
          <img src="/images/left sidebar/3-370x370.png" alt="dairy"/>
          <div className="promo-content">
            <div>Dairy products</div>
            <button className="promo-btn" style={{ marginTop: "110%"}}>Order Now</button>
          </div>
        </div>


        {/* COOKIES PROMO */}

        <div className="promo-card">
          <img src="/images/left sidebar/banner-1350-11-370x370.png" alt="cookies"/>
          <div className="promo-content">
            <div>Hot cookies are ready!</div>
            <button className="promo-btn">Order Now</button>
          </div>
        </div>


        {/* FEATURED PRODUCTS */}

        <div className="featured-box">

          <div className="featured-title">Featured</div>

          <div className="featured-item">
            <img src="/images/left sidebar/product-46-300x300.jpeg" className="featured-img"/>
            <div>
              <div className="stock">IN STOCK</div>
              <div>Organic green fresh broccoli</div>
              <div className="price">$3.25</div>
            </div>
          </div>

          <div className="featured-item">
            <img src="/images/left sidebar/product-54-300x300.png" className="featured-img"/>
            <div>
              <div className="stock">IN STOCK</div>
              <div>Ultimate organic nut flour</div>
              <div className="price">$5.90</div>
            </div>
          </div>

          <div className="featured-item">
            <img src="/images/left sidebar/product-15-300x300.jpeg" className="featured-img"/>
            <div>
              <div className="stock">IN STOCK</div>
              <div>White large garlic</div>
              <div className="price">$1.20</div>
            </div>
          </div>

        </div>


        {/* FRUIT PROMO */}

        <div className="promo-card mt-3">
          <img src="/images/left sidebar/banner-1350-27-768x512.png" alt="fruits"/>
          <div className="promo-content">
            <div style={{ color: "black"}}>Fresh Fruit!</div>
            <button className="promo-btn" style={{ marginTop: "150%"}}>Order Now</button>
          </div>
        </div>


{/* TESTIMONIAL */}
        <h6 style={{ marginTop: "20px", fontWeight: "600" }}>Testimonials</h6>

        <div className="testimonial-box">
          {testimonials.length > 0 ? (
            <>
              <div className="testimonial-text">
                {testimonials[current]?.text}
              </div>

              <div className="testimonial-name">
                {testimonials[current]?.name}
              </div>

              <div className="testimonial-role">
                {testimonials[current]?.role}
              </div>
            </>
          ) : (
            <p>Loading testimonials...</p>
          )}
        </div>


        {/* SERVICE FEATURES */}

        <div className="service-box shipping">
          <i className="bi bi-truck"></i>
          World Class Free Shipping
        </div>

        <div className="service-box secure">
          <i className="bi bi-shield-check"></i>
          Secured Shopping
        </div>

        <div className="service-box payment">
          <i className="bi bi-credit-card"></i>
          Credit Cards
        </div>

      </div>
    </>
  );
}