import React, { useRef, useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "../Components/Subscribe";

export default function AboutUs() {

  const sliderRef = useRef(null);
  const [about, setAbout] = useState(null);

  // 🔥 FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/about");
        setAbout(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const showAlert = (text) => {
    Swal.fire({
      title: text,
      text: "More information coming soon!",
      icon: "info",
      confirmButtonColor: "#6f42c1"
    });
  };

  if (!about) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <>
      <div className="about-wrapper">

        {/* TOP SECTION */}
        <section className="top-section">
          <div className="container text-center">
            <span className="advanced-badge">ADVANCED</span>
            <h1 className="top-title">{about.topTitle}</h1>
            <p className="top-text">{about.topText}</p>
          </div>
        </section>

        {/* IMAGE + TEXT */}
        <section className="about-section container-fluid">
          <div className="row justify-content-center align-items-center about-row">

            <div className="col-lg-6">
              <div className="image-layout">
                <div className="left-images">
                  <img src={about.images.left1} alt="" />
                  <img src={about.images.left2} alt="" />
                </div>

                <div className="middle-image">
                  <img src={about.images.middle} alt="" />
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-content">
              <h3>{about.sectionTitle}</h3>
              <p>{about.sectionText}</p>

              <button
                className="btn btn-outline-primary read-btn"
                onClick={() => showAlert("Read More Details")}
              >
                Read More Details
              </button>
            </div>

          </div>
        </section>

        {/* FACTS */}
        <section className="facts-section text-center">
          <span className="badge bg-primary px-3 py-2 mb-2">
            RESPONSIVE
          </span>

          <h3>Fast facts: Finnish Design Shop</h3>

          <p className="facts-text" style={{ maxWidth: "600px", marginLeft: "30%"}}>{about.factsText}</p>
        </section>

        {/* STORIES */}
        <section className="container latest-section">

          <div className="latest-header">
            <h5>Latest Stories</h5>

            <div className="slider-arrows">
              <button onClick={scrollLeft}>‹</button>
              <button onClick={scrollRight}>›</button>
            </div>
          </div>

          <div className="stories-slider" ref={sliderRef}>
            {about.stories.map((story, index) => (
              <div className="story-card" key={index}>
                <img src={story.img} alt="" />
                <div className="p-2">
                  <small className="text-muted">XNT_ADMIN</small>
                  <p className="story-title">{story.title}</p>
                </div>
              </div>
            ))}
          </div>

        </section>

        {/* FEATURES */}
        <section className="container feature-section">

          <div className="row g-4">

            {about.features.map((f, i) => (
              <div className="col-lg-3 col-md-6" key={i}>
                <div className={`feature-box box${i+1}`}>
                  <span className="feature-label">{f.label}</span>
                  <h4>{f.title}</h4>
                  <button onClick={() => showAlert(f.button)}>
                    {f.button} →
                  </button>
                </div>
              </div>
            ))}

          </div>

        </section>

      </div>

      <Subscribe />

<style>{`

.about-wrapper{
  background:#f7f7f7;
  overflow-x:hidden;
}

.top-section{
  background:#efefef;
  padding:80px 0;
}

.advanced-badge{
  background:#000;
  color:#fff;
  font-size:11px;
  letter-spacing:2px;
  padding:6px 14px;
  border-radius:20px;
  margin-right: 90%;
}

.top-title{
  font-size:48px;
  margin-top:10px;
  text-align: justify;
}

.top-text{
  max-width:720px;
  margin-top:15px;
  text-align: justify;
}

.about-section{
  padding:80px 6%;
}

.image-layout{
  display:flex;
  gap:30px;
}

.left-images{
  display:flex;
  flex-direction:column;
  gap:20px;
}

.left-images img{
  width:350px;
  height:200px;
  object-fit:cover;
  border-radius:8px;
}

.middle-image img{
  width:280px;
  height:200px;
  border-radius:8px;
  margin-top: 45%;
}

.text-content{
  padding-left:100px;
}

.latest-section{
  padding:50px 0;
}

.latest-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
}

.slider-arrows button{
  border:none;
  background:#eee;
  width:35px;
  height:35px;
  border-radius:50%;
}

.stories-slider{
  display:flex;
  gap:30px;
  overflow-x:hidden;
  padding-top:20px;
}

.story-card{
  min-width:240px;
  background:white;
  border-radius:8px;
  overflow:hidden;
}

.story-card img{
  width:100%;
  height:130px;
  object-fit:cover;
}

.feature-section{
  padding:80px 0;
}

.feature-box{
  color:white;
  padding:60px 30px;
  border-radius:8px;
  text-align:center;
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  min-height:260px;
}

.feature-label{
  font-size:12px;
  letter-spacing:2px;
}

.feature-box h4{
  font-size:22px;
  margin:20px 0;
}

.feature-box button{
  background:none;
  border:none;
  color:white;
}

.box1{background:#6f63c1;}
.box2{background:#5e9076;}
.box3{background:#2d7fa5;}
.box4{background:#8ca96c;}

@media(max-width:768px){

.image-layout{
flex-direction:column;
}

.text-content{
padding-left:0;
}

}

`}</style>

    </>
  );
}