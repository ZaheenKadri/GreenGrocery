import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";

export default function ShopByCategories() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]); // ✅ dynamic data

  const sliderRef = useRef(null);

  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // ✅ FETCH FROM BACKEND
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");

      // ⚠️ IMPORTANT: because backend returns { data: [...] }
      setCategories(res.data.data);

    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const handleMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDown(false);
  const handleMouseUp = () => setIsDown(false);

  const handleMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <>
      <style>{`
        .category-section{
          padding:40px 0;
          font-family:'Poppins',sans-serif;
        }

        .category-title{
          font-size:22px;
          font-weight:600;
          margin-bottom:25px;
        }

        .category-row{
          display:flex;
          gap:10px;
          overflow-x:auto;
          scroll-behavior:smooth;
          cursor:grab;
          user-select:none;
          padding-bottom:10px;
        }

        .category-row:active{
          cursor:grabbing;
        }

        .category-row::-webkit-scrollbar{
          display:none;
        }

        .category-card{
          width:112px;
          background:white;
          border:1px solid #e6e6e6;
          border-radius:8px;
          text-align:center;
          padding:20px 10px;
          transition:0.3s;
          flex-shrink:0;
        }

        .category-card:hover{
          transform:translateY(-5px);
          box-shadow:0 6px 18px rgba(0,0,0,0.08);
        }

        .category-img{
          height:60px;
          object-fit:contain;
          margin-bottom:10px;
          pointer-events:none;
        }

        .category-name{
          font-size:12px;
          font-weight:600;
          letter-spacing:1px;
          color:#444;
          pointer-events:none;
        }
      `}</style>

      <div className="category-section">
        <Container>

          <h4 className="category-title">Shop by Categories</h4>

          <div
            className="category-row"
            ref={sliderRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <div
                  className="category-card"
                  key={index}
                  onClick={() => navigate(`/product/category/${cat.name}`)}
                >
                  <img
                    src={`http://localhost:5000/images/Category${cat.img}`}
                    alt={cat.name}
                    className="category-img"
                  />

                  <div className="category-name">{cat.name}</div>
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>

        </Container>
      </div>
    </>
  );
}