import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Subscribe from "../Components/Subscribe";

export default function Product() {  
  const { category, subcategory } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

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
  const [allProducts, setAllProducts] = useState([]); // ✅ ADD HERE
  
  useEffect(() => {

    const fetchProducts = async () => {

      try {

        let url = "http://localhost:5000/api/products";

        // ✅ SUBCATEGORY
        if (category && subcategory) {
          url = `http://localhost:5000/api/products/category/${category}/${subcategory}`;
        }

        // ✅ CATEGORY
        else if (category) {
          url = `http://localhost:5000/api/products/category/${category}`;
        }

        const res = await axios.get(url);

        setProducts(res.data.data);
        setAllProducts(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();

  }, [category, subcategory]);

  const [campaigns, setCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await axios.get("http://localhost:5000/api/products/campaigns");
      setCampaigns(res.data.data);
    };

    fetchCampaigns();
  }, []);


  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(8);
  const handlePriceFilter = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/products/filter-by-price?min=${minPrice}&max=${maxPrice}`
    );

    setProducts(res.data.data);
    setAllProducts(res.data.data);
  };

  const [colors, setColors] = useState({});
  const [selectedColor, setSelectedColor] = useState(null);  
  useEffect(() => {
    const fetchColors = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/colors");
        setColors(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchColors();
  }, []);

  const [kgs, setKgs] = useState({});
  const [selectedKg, setSelectedKg] = useState(null);
  useEffect(() => {
    const fetchKg = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/kg");
        setKgs(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchKg();
  }, []);

  const [selectedBrand, setSelectedBrand] = useState(null);
  const [brands, setBrands] = useState({});
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/brands");
        setBrands(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchBrands();
  }, []);

  const [selectedStatus, setSelectedStatus] = useState(null);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/featured");
        setFeaturedProducts(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFeatured();
  }, []);

  const [tags, setTags] = useState({});
  const [selectedTag, setSelectedTag] = useState(null);
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/tags");
        setTags(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTags();
  }, []);

  const filteredProducts = allProducts.filter((p) => {
    const tagMatch = selectedTag
      ? Array.isArray(p.tags)
        ? p.tags.includes(selectedTag)
        : p.tags === selectedTag
      : true;

    const brandMatch = selectedBrand
      ? Array.isArray(p.brands)
        ? p.brands.includes(selectedBrand)
        : p.brands === selectedBrand
      : true;

    const kgMatch = selectedKg
      ? Array.isArray(p.kg)
        ? p.kg.includes(selectedKg)
        : p.kg === selectedKg
      : true;

    const colorMatch = selectedColor
      ? Array.isArray(p.color)
        ? p.color.includes(selectedColor)
        : p.color === selectedColor
      : true;

    const campaignMatch = selectedCampaign
      ? p.discount?.toString().replace("%", "") === selectedCampaign.replace("%", "")
      : true;

    const cleanPrice = parseFloat(p.price.toString().replace("$", ""));
    const priceMatch = cleanPrice >= minPrice && cleanPrice <= maxPrice;

    const statusMatch = selectedStatus
      ? selectedStatus === "On Sale"
        ? p.discount && p.discount !== "0%"
        : p.status === "In Stock"
      : true;

    return (
      tagMatch &&
      brandMatch &&
      kgMatch &&
      colorMatch &&
      campaignMatch &&
      priceMatch &&
      statusMatch
    );
  });

  const [bestsellers, setBestsellers] = useState([]);
  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products/bestsellers");
        setBestsellers(res.data.data);
      } catch (err) {
        console.error("Bestseller error:", err);
      }
    };

    fetchBestSellers();
  }, []);

  const [leftSlide, setLeftSlide] = useState(0);
  const [rightSlide, setRightSlide] = useState(0);

  const leftData = bestsellers.slice(0, 3) || [];
  const rightData = bestsellers.slice(3, 6) || [];

  // AUTO SLIDE
  useEffect(() => {
    if (leftData.length === 0 || rightData.length === 0) return;

    const interval = setInterval(() => {
      setLeftSlide((prev) =>
        leftData.length ? (prev + 1) % leftData.length : 0
      );
      setRightSlide((prev) =>
        rightData.length ? (prev + 1) % rightData.length : 0
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [leftData.length, rightData.length]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTag, selectedBrand, selectedKg, selectedColor, minPrice, maxPrice, selectedCampaign, selectedStatus]);

  return (
  <>
    <div className="product-sidebar-page">
      <div className="container">
        <div className="row">

          {/* LEFT SIDEBAR */}
          <div className="col-lg-3 sidebar25">
            <div className="product-sidebar-box">

              {/* CATEGORY */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                Product Categories <i className="bi bi-chevron-down"></i>
                </div>

                <ul className="sidebar-list">
                  {[
                    "Bakery",
                    "Bread",
                    "Candy",
                    "Coffee",
                    "Dairy & Eggs",
                    "Fresh Produce",
                    "Frozen",
                    "Meat & Fish",
                    "Meat & Seafoods",
                    "Organic Foods",
                    "Snacks",
                    "Uncategorized",
                  ].map((item, i) => (
                    <li
                      key={i}
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/product/category/${encodeURIComponent(item)}`)
                      }
                    >
                      {item}
                      <span>+</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CAMPAIGNS */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Product Campaigns <i className="bi bi-chevron-down"></i>
                </div>

                {campaigns
                  .filter(c => c.name === "25%" || c.name === "35%") // 👈 ONLY 25 & 35
                  .map((c, i) => (
                    <div
                      key={i}
                      className="sidebar-row"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        setSelectedCampaign(selectedCampaign === c.name ? null : c.name)
                      }
                    >
                      <span>Discount {c.name}</span>
                      <span>{c.count}</span>
                    </div>
                ))}
              </div>

              {/* Search */}
              <div className="sidebar-search-wrapper">
                <input type="text" placeholder="Search products..." className="sidebar-search-input" />
                <button className="sidebar-search-btn">
                  SEARCH
                </button>
              </div>

              {/* PRICE */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Filter by price <i className="bi bi-chevron-down"></i>
                </div>

                {/* RANGE SLIDER */}
                <div className="price-range-slider">
                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.1"
                    value={minPrice}
                    onChange={(e) => {
                      const value = Math.min(Number(e.target.value), maxPrice - 0.1);
                      setMinPrice(value);
                    }}
                    className="thumb thumb-left"
                  />

                  <input
                    type="range"
                    min="0"
                    max="8"
                    step="0.1"
                    value={maxPrice}
                    onChange={(e) => {
                      const value = Math.max(Number(e.target.value), minPrice + 0.1);
                      setMaxPrice(value);
                    }}
                    className="thumb thumb-right"
                  />

                  <div className="slider">
                    <div className="track"></div>
                    <div
                      className="range"
                      style={{
                        left: `${(minPrice / 8) * 100}%`,
                        right: `${100 - (maxPrice / 8) * 100}%`
                      }}
                    ></div>
                  </div>
                </div>

                {/* SHOW VALUE */}
                <div className="price-footer">
                  <button onClick={handlePriceFilter}>FILTER</button>
                  <span>PRICE: ${minPrice} — ${maxPrice}</span>
                </div>
              </div>

              {/* COLOR */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Filter by color <i className="bi bi-chevron-down"></i>
                </div>

                {Object.entries(colors).map(([color, count], i) => (
                  <div
                    className="sidebar-row"
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                    setSelectedColor(selectedColor === color ? null : color)
                    }
                  >
                    <span>
                      <i style={{ border: "1px solid #eee", background: color.toLowerCase() }}> </i> 
                      {color}
                    </span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>

              {/* KG */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Filter by KG <i className="bi bi-chevron-down"></i>
                </div>

                {Object.entries(kgs).map(([kg, count], i) => (
                  <div
                    className="sidebar-row"
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => 
                    setSelectedKg(selectedKg === kg ? null : kg)
                    }
                  >
                    <span>{kg} KG</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>

              {/* SUPPLIERS */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Filter by Suppliers <i className="bi bi-chevron-down"></i>
                </div>

                {[["Glasso",3],["Greenday",2],["Wilma",3],["Woodx",3]].map(([v,c],i)=>(
                  <div className="sidebar-row" key={i}>
                    <span>{v}</span>
                    <span>{c}</span>
                  </div>
                ))}
              </div>

              {/* BRANDS */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Product Brands <i className="bi bi-chevron-down"></i>
                </div>

                {Object.entries(brands).map(([brand, count], i) => (
                  <div
                    className="sidebar-row"
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedBrand(brand)}
                  >
                    <span>{brand}</span>
                    <span>{count}</span>
                  </div>
                ))}
              </div>

              {/* STATUS */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Product Status <i className="bi bi-chevron-down"></i>
                </div>

                {["In Stock", "On Sale"].map((status, i) => (
                  <div
                    key={i}
                    className="sidebar-row"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      setSelectedStatus(selectedStatus === status ? null : status)
                    }
                  >
                    <span>{status}</span>
                  </div>
                ))}
              </div>

              {/* FEATURED */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Featured Products <i className="bi bi-chevron-down"></i>
                </div>

                {featuredProducts.slice(0, 5).map((item, i) => (
                  <div className="featured-item" key={i}>
                    <img src={`http://localhost:5000/images/Products${item.img}`} />

                    <div>
                      <p>{item.name}</p>
                      <span>{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* TAGS */}
              <div className="sidebar-section">
                <div className="sidebar-title">
                  Product tags <i className="bi bi-chevron-down"></i>
                </div>
                <div className="tags">
                  {Object.entries(tags).map(([tag, count], i) => (
                    <span
                      key={i}
                      onClick={() => setSelectedTag(tag)}
                      style={{
                      cursor: "pointer",
                      background: selectedTag === tag ? "#6c63ff" : "#eee",
                      color: selectedTag === tag ? "#fff" : "#000"
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-9">

            {/* BANNER */}
            <div className="product-sidebar-banner">
              <span>100% Organic Certified</span>
              <h3>Crispy Bakery Products</h3>
              <p>Same time shipping guarantee!</p>
            </div>

            {/* TOOLBAR */}
            <div className="product-sidebar-toolbar">
              <span>Showing 1–12 of 22</span>
              <select>
                <option>Default sorting</option>
              </select>
            </div>

            {/* PRODUCTS */}
            <div className="row">
              {currentProducts.map((p, i) => (
                <div className="prowidth mb-4" key={i}>

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

                    <div className="product-icons">
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

                </div>
              ))}
            </div>

            {/* PAGINATION */}
            <div className="product-sidebar-pagination">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <div className="product-sidebar-bestseller mt-5">

              {/* LEFT */}
              <div className="bestseller-wrapper">
                  <div className="bestseller-header">

                  <h5>Bestsellers of the week</h5>

                  <div className="dots green-dots">
                    {leftData.map((_, i) => (
                      <span
                        key={i}
                        className={leftSlide === i ? "active" : ""}
                        onClick={() => setLeftSlide(i)}
                      ></span>
                    ))}
                  </div>

                </div>

                <div className="bestseller-card purple">

                  <span className="campaign-tag">CAMPAIGNS</span>

                  <div className="row align-items-center">

                    <div className="col-md-6">
                      <div className="rating">
                        ⭐ <b>5.4</b>
                      </div>

                      <h5 className="title">
                        {leftData.length > 0 && leftData[leftSlide]?.name}
                      </h5>

                      <p className="desc">
                        {leftData.length > 0 && leftData[leftSlide]?.subText}
                      </p>

                      <div className="price">
                        {leftData.length > 0 && leftData[leftSlide]?.price}
                      </div>

                      <button className="cart-btn">Add to cart</button>
                    </div>

                    <div className="col-md-6 text-center">
                      <img 
                        src={`http://localhost:5000/images/Products${leftData.length > 0 && leftData[leftSlide]?.img}`} 
                      />
                    </div>

                  </div>
                </div>
              </div>


              {/* RIGHT */}
              <div className="bestseller-wrapper">

                <div className="bestseller-header">

                  <h5>Bestsellers of the week</h5>

                  <div className="dots green-dots">
                    {rightData.map((_, i) => (
                      <span
                        key={i}
                        className={rightSlide === i ? "active" : ""}
                        onClick={() => setRightSlide(i)}
                      ></span>
                    ))}
                  </div>

                </div>

                <div className="bestseller-card green">

                  <span className="campaign-tag green-tag">CAMPAIGNS</span>

                  <div className="row align-items-center">

                    <div className="col-md-6">
                      <div className="rating">
                        ⭐ <b>4</b>
                      </div>

                      <h5 className="title">
                        {rightData.length > 0 && rightData[rightSlide]?.name}
                      </h5>

                      <p className="desc">
                        {rightData.length > 0 && rightData[rightSlide]?.subText}
                      </p>

                      <div className="price">
                        {rightData.length > 0 && rightData[rightSlide]?.price}
                      </div>

                      <button className="cart-btn">Add to cart</button>
                    </div>

                    <div className="col-md-6 text-center">
                      <img 
                        src={`http://localhost:5000/images/Products${rightData.length > 0 && rightData[rightSlide]?.img}`} 
                      />
                    </div>

                  </div>
                </div>
              </div>
            </div>    
          </div>
        </div>
      </div>
    </div>
    < Subscribe />
        <style>{`

      .price-range-slider {
        position: relative;
        width: 100%;
        margin: 20px 0;
      }

      /* SLIDER TRACK */
      .slider {
        position: relative;
        height: 5px;
      }

      .track {
        position: absolute;
        width: 100%;
        height: 5px;
        background: #ddd;
        border-radius: 5px;
      }

      .range {
        position: absolute;
        height: 5px;
        background: #6c63ff;
        border-radius: 5px;
      }

      /* INPUT RANGE */
      .thumb {
        pointer-events: none;
        position: absolute;
        height: 0;
        width: 102%;
        outline: none;
        z-index: 1;
        top: 2px;
        left: -2px;
      }

      .thumb::-webkit-slider-thumb {
        pointer-events: all;
        width: 16px;
        height: 16px;
        background: #6c63ff;
        border-radius: 50%;
        cursor: pointer;
        border: none;
      }

      .thumb::-moz-range-thumb {
        pointer-events: all;
        width: 16px;
        height: 16px;
        background: #6c63ff;
        border-radius: 50%;
        cursor: pointer;
        border: none;
      }

      .product-card-new {
        position: relative;
      }

      /* ICON CONTAINER */
      .product-icons {
        position: absolute;
        top: 15px;
        right: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        opacity: 0;
        transform: translateX(15px);
        transition: 0.3s;
      }

      /* ICON STYLE */
      .product-icons i {
        padding: 8px;
        border-radius: 50%;
        font-size: 14px;
        background: #f1f1f1;
        cursor: pointer;
        transition: 0.3s;
      }

      .product-icons i:hover {
        background: #6c63ff;
        color: white;
      }

      /* 🔥 SHOW ON HOVER */
      .product-card-new:hover .product-icons {
        opacity: 1;
        transform: translateX(0);
      }

      .featured-star {
        position: absolute;
        top: 0px;
        left: 0px;
        background: #fff3cd;
        padding: 6px;
        border-radius: 50%;
        font-size: 14px;
        color: #f1c40f;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
      }

      .featured-star i {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .Product-content{
        text-align: left;
      }

      .product-sidebar-page{
        background:#fff;
        padding:40px 0;
      }

      /* BANNER */
      .product-sidebar-banner{
        background:url('/images/Hero/banner-1350-12.png') center/cover no-repeat;
        padding:50px;
        border-radius:5px;
        margin-bottom:20px;
        text-align: center;
      }

      .product-sidebar-banner h3{
        font-weight: bold;
      }

      .product-sidebar-banner span{
        font-weight: bold;
        color: #1e84b4;
      }

      /* SIDEBAR */
      .product-sidebar-box{
        background:#fff;
        padding:20px;
        border-radius:8px;
        border: 1px solid #eee;
      }

      .sidebar-section{
        margin-bottom:25px;
      }

      .sidebar-title{
        font-weight:600;
        display:flex;
        justify-content:space-between;
        font-size:14px;
        margin-bottom:10px;
        cursor:pointer;
      }

      /* LIST */
      .sidebar-list{
        list-style:none;
        padding:0;
      }

      .sidebar-list li{
        display:flex;
        justify-content:space-between;
        padding:6px 0;
        font-size:13px;
      }

      /* ROW */
      .sidebar-row{
        display:flex;
        justify-content:space-between;
        font-size:13px;
        padding:5px 0;
      }

      /* SEARCH */
      .sidebar-search-wrapper{
        display:flex;
        align-items:center;
        border:1px solid #e5e5e5;
        border-radius:40px;
        padding:5px;
        background:#fff;
        margin:20px 0;
      }

      .sidebar-search-input{
        flex:1;
        border:none;
        outline:none;
        padding:10px 15px;
        font-size:14px;
        border-radius:40px;
      }

      .sidebar-search-btn{
        background:#d6cff9;
        border:none;
        padding:8px 18px;
        border-radius:30px;
        font-size:12px;
        font-weight:600;
        color:#6b63d9;
        transition:0.3s;
        margin-left:-20%;
      }

      .sidebar-search-btn:hover{
        background:#c7bff7;
      }

      /* PRICE */
      .price-bar{
        height:4px;
        background:#ddd;
        border-radius:10px;
        margin:15px 0;
        position:relative;
      }

      .price-footer{
        display:flex;
        justify-content:space-between;
        align-items:center;
      }

      .price-footer button{
        background:#b197fc;
        border:none;
        color:white;
        padding:5px 10px;
        border-radius:20px;
        font-size:11px;
      }

      /* COLORS */
      .bi-heart-fill{
  color:#ff4d6d !important;
}

      .sidebar-row i{
        display:inline-block;
        width:10px;
        height:10px;
        border-radius:50%;
        margin-right:5px;
      }

      /* FEATURED */
      .featured-item{
        display:flex;
        gap:10px;
        margin-bottom:10px;
      }

      .featured-item img{
        width:45px;
        height:45px;
        object-fit:cover;
      }

      .featured-item p{
        font-size:12px;
        margin:0;
      }

      .featured-item span{
        font-size:12px;
        color:#6c5ce7;
      }

      /* TAGS */
      .tags span{
        background:#eee;
        padding:5px 10px;
        font-size:15px;
        margin:3px;
        display:inline-block;
      }

      /* TOOLBAR */
      .product-sidebar-toolbar{
        display:flex;
        justify-content:space-between;
        margin-bottom:20px;
      }

      /* CARD */
      .product-card-new{
        background:#fff;
        padding:18px;
        border-radius:10px;
        text-align:center;
        border:1px solid #eee;
        transition:.3s;
        position:relative;
      }

      .product-card-new:hover{
        box-shadow:0 10px 20px rgba(0,0,0,0.08);
        transform:translateY(-4px);
      }

      /* IMAGE */
      .img-box{
        position:relative;
        margin-bottom:10px;
      }

      .img-box img{
        height:130px;
        object-fit:contain;
        width:100%;
      }

      /* TOP RIGHT ICON */
      .top-icon{
  position:absolute;
  top:5px;
  right:10px;
}

      .top-icon i{
        background:#eae6ff;
        padding:8px;
        border-radius:50%;
        font-size:14px;
      }

      /* STOCK */
      .stock{
        font-size:11px;
        color:#28a745;
        margin:5px 0;
        font-weight:500;
      }

      /* RATING */
      .rating{
        font-size:12px;
        color:#fbc531;
        margin-bottom:5px;
      }

      /* PRICE */
      .price-box{
        margin-bottom:5px;
      }

      .old-price{
        text-decoration:line-through;
        font-size:12px;
        color:#bbb;
        margin-right:5px;
      }

      .price{
        color:#6c63ff;
        font-weight:600;
      }

      /* TITLE */
      .product-title{
        font-size:14px;
        font-weight:600;
        margin:10px 0 15px;
      }

      /* LABELS */
      .labels{
        display:flex;
        gap:5px;
      }

      .labels span{
        font-size:10px;
        padding:3px 8px;
        border-radius:4px;
      }

      .labels .sale{
        background:#ffe066;
      }

      .labels .discount{
        background:#ff6b6b;
        color:#fff;
      }

      /* PAGINATION */
      .product-sidebar-pagination{
        text-align:center;
        margin:20px 0;
      }

      .product-sidebar-pagination button{
        margin:0 5px;
        padding:5px 10px;
        background:#ddd;
        border:none;
      }

      .product-sidebar-pagination .active{
        background:black;
        color:white;
      }

      /* BESTSELLER */
      .product-sidebar-bestseller{
        display:flex;
        gap:20px;
      }

      .bestseller-wrapper{
        flex:1;
        position:relative;
      }

      .bestseller-title{
        font-weight:600;
        margin-bottom:10px;
      }

      .bestseller-card{
        background:#fff;
        border-radius:10px;
        padding:25px;
        border:2px solid #7d6ee7;
        position:relative;
      }

      .bestseller-card.green{
        border-color:#5b8c74;
      }

      .campaign-tag{
        position:absolute;
        top:-12px;
        left:20px;
        background:#7d6ee7;
        color:#fff;
        font-size:11px;
        padding:5px 12px;
        border-radius:20px; 
        letter-spacing:1px;
      }

      .bestseller-header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        margin-bottom:20px;
      }

      .bestseller-header h5{
        font-weight:600;
        margin:0;
      }

      .dots{
        display:flex;
        align-items:center;
      }

      .green-tag{
        background:#5b8c74;
      }

      .title{
        font-weight:600;
        margin:10px 0;
      }

      .desc{
        font-size:13px;
        color:#777;
        line-height:1.5;
      }

      /* IMAGE */
      .bestseller-card img{
        max-height:160px;
        object-fit:contain;
      }

      /* BUTTON */
      .cart-btn{
        background:#111;
        color:#fff;
        border:none;
        padding:10px 20px;
        border-radius:30px;
        font-size:13px;
        margin-top:10px;
        transition:.3s;
      }

      .cart-btn:hover{
        background:#000;
      }

      /* DOTS */
      .dots span{
        width:12px;
        height:12px;
        border:2px solid #cfcfcf;
        border-radius:50%;
        display:inline-block;
        margin-left:6px;
        position:relative;
        cursor:pointer;
        transition:0.3s;
      }

      .dots span::after{
        content:"";
        width:5px;
        height:5px;
        background:#5b8c74;
        border-radius:50%;
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%) scale(0);
        transition:0.3s;
      }

      .dots span.active{
        border-color:#5b8c74;
      }

      .dots span.active::after{
        transform:translate(-50%,-50%) scale(1);
      }

      .bestseller-wrapper:first-child .dots span::after{
        background:#6c63ff;
      }

      .bestseller-wrapper:first-child .dots span.active{
        border-color:#6c63ff;
      }

      /* ============================= */
      /* RESPONSIVE */
      /* ============================= */

      /* ========================================= */
/* GLOBAL RESPONSIVE FIXES */
/* ========================================= */

*{
  box-sizing:border-box;
}

img{
  max-width:100%;
  height:auto;
}

/* ========================================= */
/* PRODUCT GRID */
/* ========================================= */

.prowidth{
  width:20%;
}
@media (max-width: 1025px) {
    .sidebar25 {
        flex: 0 0 auto;
        width: 25%;
    }
        .sidebar-search-btn {
    margin-left: -80%;
        }
}
/* LARGE TABLETS */
@media(max-width:1200px){
  .prowidth{
    width:25%;
  }
}

/* TABLETS */
@media(max-width:992px){
  .prowidth{
    width:33.33%;
  }

  .product-sidebar-box{
    margin-bottom:30px;
  }
}

/* MOBILE */
@media(max-width:768px){
  .prowidth{
    width:33%;
  }

  .product-sidebar-toolbar{
    display: none;
  }

  .product-sidebar-banner{
    padding:25px 15px;
  }

  .product-sidebar-banner h3{
    font-size:24px;
  }

  .product-sidebar-bestseller{
    flex-direction:column;
  }

  .bestseller-card{
    padding:20px;
  }

  .top-icon{
    left:auto;
    right:10px;
  }

  .product-icons{
    right:5px;
    top:10px;
  }

  .img-box img{
    height:120px;
  }
}

/* SMALL MOBILE */
@media(max-width:576px){

  .prowidth{
    width:50%;
  }

  .product-card-new{
    padding:12px;
  }

  .img-box img{
    height:100px;
  }

  .product-title{
    font-size:13px;
  }

  .price{
    font-size:14px;
  }

  .old-price{
    font-size:11px;
  }

  .sidebar-search-wrapper{
    flex-direction:column;
    gap:10px;
    border-radius:15px;
    padding:10px;
  }

  .sidebar-search-btn{
    width:100%;
    margin-left:0;
  }

  .sidebar-search-input{
    width:100%;
  }

  .price-footer{
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
  }

  .labels{
    flex-wrap:wrap;
  }

  .featured-item{
    align-items:center;
  }

  .featured-item img{
    width:50px;
    height:50px;
  }

  .bestseller-header{
    flex-direction:column;
    align-items:flex-start;
    gap:10px;
  }

  .bestseller-card .row{
    flex-direction:column-reverse;
    text-align:center;
  }

  .bestseller-card img{
    max-height:120px;
    margin-bottom:15px;
  }

  .cart-btn{
    width:100%;
  }
}

/* EXTRA SMALL DEVICES */
@media(max-width:360px){

  .product-sidebar-page{
    padding:10px 5px;
  }

  .product-sidebar-banner h3{
    font-size:18px;
  }

  .sidebar-title{
    font-size:13px;
  }

  .sidebar-row,
  .sidebar-list li{
    font-size:12px;
  }

  .product-title{
    font-size:12px;
  }

  .cart-btn{
    font-size:12px;
    padding:8px;
  }

  .img-box img{
    height:85px;
  }

  .product-icons{
    gap:5px;
  }

  .product-icons i{
    padding:6px;
    font-size:12px;
  }
}

      @media(max-width:768px){
        .product-sidebar-box{
          display: none;
        }

        .product-sidebar-bestseller{
          flex-direction:column;
        }

        .product-sidebar-toolbar{
          flex-direction:column;
          gap:10px;
        }

        .product-sidebar-banner{
          padding:30px 15px;
        }

        .product-card-new{
          padding:12px;
        }

        .img-box img{
          height:100px;
        }

        .side-icons{
          right:5px !important;
        }

        .sidebar-search-btn{
          margin-left:0;
          padding:6px 12px;
        }
      }

      @media(max-width:480px){
        .product-sidebar-page{
          padding:15px 8px;
        }

        .product-sidebar-banner{
          padding:20px 10px;
        }

        .product-sidebar-banner h3{
          font-size:16px;
        }

        .sidebar-title{
          font-size:13px;
        }

        .sidebar-list li{
          font-size:12px;
        }

        .sidebar-search-input{
          font-size:12px;
          padding:8px;
        }

        .sidebar-search-btn{
          font-size:10px;
          padding:6px 10px;
        }

        .product-card-new{
          padding:10px;
        }

        .img-box img{
          height:90px;
        }

        .price,
        .old-price{
          font-size:12px;
        }

        .cart-btn{
          padding:8px 16px;
          font-size:12px;
        }

        .featured-item img{
          width:35px;
          height:35px;
        }
      }

      @media(max-width:320px){
        .product-sidebar-page{
          padding:10px 5px;
        }

        .product-sidebar-banner{
          padding:15px 8px;
        }

        .product-sidebar-banner h3{
          font-size:14px;
        }

        .product-sidebar-banner span{
          font-size:12px;
        }

        .sidebar-search-wrapper{
          flex-direction:column;
          border-radius:20px;
        }

        .sidebar-search-input{
          width:100%;
          padding:8px;
          font-size:11px;
        }

        .sidebar-search-btn{
          width:100%;
          margin-top:5px;
          font-size:10px;
        }

        .product-card-new{
          padding:8px;
        }

        .img-box img{
          height:80px;
        }

        .side-icons{
          display:none;
        }

        .cart-btn{
          width:100%;
          padding:8px;
          font-size:11px;
        }

        .price,
        .old-price{
          font-size:11px;
        }

        .labels span{
          font-size:9px;
        }

        .featured-item{
          gap:5px;
        }

        .featured-item p,
        .featured-item span{
          font-size:10px;
        }

        .dots span{
          width:8px;
          height:8px;
        }
      }
    `}</style>
  </>
  );
}

