import React, { useRef, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "../Components/Subscribe";

export default function BlogDetails(){
  const { id } = useParams();

  const [prevBlog, setPrevBlog] = useState(null);
  const [nextBlog, setNextBlog] = useState(null);

  useEffect(() => {
    const fetchPrevNext = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/prev-next/${id}`);
        const data = await res.json();

        setPrevBlog(data.prev);
        setNextBlog(data.next);
      } catch (error) {
        console.error("Error fetching prev/next:", error);
      }
    };

    fetchPrevNext();
  }, [id]);

  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/related/${id}`);
        const data = await res.json();
        setRelatedBlogs(data.blogs);
      } catch (error) {
        console.error("Error fetching related blogs:", error);
      }
    };

    fetchRelated();
  }, [id]);

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
        const data = await res.json();

        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const scrollRef = useRef();
  const [active, setActive] = useState(0);
  const [pause, setPause] = useState(false);

  //  SCROLL FUNCTION
  const scrollTo = (index) => {
    const container = scrollRef.current;
    const width = container.clientWidth;

    container.scrollTo({
      left: width * index,
      behavior: "smooth"
    });

    setActive(index);
  };

  //  AUTO SLIDER (5 sec)
  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      const next = (active + 1) % 2; 
      scrollTo(next);
    }, 5000);

    return () => clearInterval(interval);
  }, [active, pause]);

  if (!blog) return <h3 className="text-center mt-5">Loading...</h3>;

  return(
  <>
    <div className="blog-details-page">

      <div className="container">

        {/* IMAGE */}
        <div className="blog-image">
          <img src={`http://localhost:5000/images${blog.img}`} alt="" />
        </div>
        {/* CONTENT*/}
        <div className="blog-content">
          <p className="meta">
            XNT_ADMIN&nbsp;&nbsp;
            {new Date(blog.createdAt)
              .toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })
            .toUpperCase()}
          </p>
          <h2>{blog.title}</h2>
          <p>{blog.desc}</p>
          <h5 className="highlight">{blog.subTitle}</h5>
          <p>{blog.subDesc}</p>

          {/* LIST */}
          <ul>
            {blog.list?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <p>{blog.subDesc1}</p>

          <div className="blog-category">
            <b>Categories:</b> {blog.categories?.join(", ")}
          </div>

          <div className="blog-nav">
            {/* PREVIOUS */}
            {prevBlog ? (
              <a href={`/blog/${prevBlog._id}`} className="nav-link">
                ← {prevBlog.title}
              </a>
            ) : (
              <span className="disabled">No Previous</span>
            )}

            <span className="grid-icon">▦</span>

            {/* NEXT */}
            {nextBlog ? (
              <a href={`/blog/${nextBlog._id}`} className="nav-link">
                {nextBlog.title} →
              </a>
            ) : (
              <span className="disabled">No Next</span>
            )}
          </div>

        </div>
      </div>


      {/* 🔥 RELATED POSTS */}
      <div className="related-section">
        <p className="small text-center">Check out similar topics</p>
        <h4 className="text-center mb-4">Related Posts</h4>

        <div
          className="slider-container"
          ref={scrollRef}
          onMouseEnter={() => setPause(true)}   // 🔥 pause
          onMouseLeave={() => setPause(false)}  // 🔥 resume
        >

          {relatedBlogs.map((item) => (
            <div className="slide" key={item._id}>
              <div className="related-card">

                <img 
                  src={`http://localhost:5000/images${item.img}`} 
                  alt=""
                />

                <div className="overlay">
                  <p className="meta">
                    XNT_ADMIN •&nbsp;
                    {new Date(item.createdAt)
                      .toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric"
                      })
                    .toUpperCase()}
                  </p>

                  <Link to={`/blog/${item._id}`}
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <h6>{item.title}</h6>
                  </Link>
                  <p>{item.maindesc}</p>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* 🔥 DOTS */}
        <div className="dots">
          {[0,1].map((_, index) => (
            <span
              key={index}
              className={index === active ? "dot active" : "dot"}
              onClick={() => scrollTo(index)}
            ></span>
          ))}
        </div>

      </div>

    </div>
    < Subscribe />

    <style>{`

    .blog-details-page{
    padding:40px 0;
    background:#fff;
    }

    /* IMAGE */
    .blog-image{
    display:flex;
    justify-content:center;
    }

    .blog-image img{
    width:75%;
    border-radius:6px;
    }

    /* CONTENT */
    .blog-content{
    max-width:1000px;
    text-align: justify;
    margin:30px auto;
    }

    .meta{
    font-size:12px;
    color:#fff;
    font-weight: 700;
    }

    .blog-content h2{
    font-size:28px;
    margin:10px 0 20px;
    }

    .blog-content p{
    font-size:15px;
    color:#000;
    line-height:1.8;
    }

    .highlight{
    font-weight:600;
    margin:20px 0;
    }

    /* NAV */
    .blog-nav{
    display:flex;
    justify-content:space-between;
    margin:30px 0;
    padding:15px 0;
    border-top:1px solid #eee;
    border-bottom:1px solid #eee;
    font-weight:600;
    }

    /* RELATED */
    .related-section{
    background:#f6f6f6;
    padding:60px 0;
    }

    /* SLIDER */
    .slider-container{
    display:flex;
    gap:25px;
    overflow-x:auto;
    scroll-behavior:smooth;
    padding:0 20px;
    scrollbar-width:none;
    }

    .slider-container::-webkit-scrollbar{
    display:none;
    }

    /* CARD */
    .slide{
    min-width:350px;
    }

    .related-card{
    position:relative;
    border-radius:12px;
    overflow:hidden;
    height:400px;
    cursor:pointer;
    }

    .related-card img{
    width:100%;
    height:100%;
    object-fit:cover;
    transition:0.4s;
    }

    .related-card:hover img{
    transform:scale(1.05);
    }

    /* OVERLAY */
    .overlay{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height:100%;
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:flex-end;
    color:white;
    background:linear-gradient(
    to top,
    rgba(0,0,0,0.75) 0%,
    rgba(0,0,0,0.35) 40%,
    transparent 100%
    );
    }

    /* DOTS */
    .dots{
    display:flex;
    justify-content:center;
    gap:12px;
    margin-top:20px;
    }

    .dot{
    width:14px;
    height:14px;
    border:2px solid #ccc;
    border-radius:50%;
    cursor:pointer;
    position:relative;
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
    }

    .dot.active{
    border-color:black;
    }

    .dot.active::after{
    opacity:1;
    }


    /* ================= MOBILE IMPROVEMENTS ================= */

    /* Tablets */
    @media(max-width:992px){
      .slide{
        min-width:45%;
      }
    }

    /* Small tablets */
    @media(max-width:768px){

      .blog-image img{
        width:100%;
      }

      .blog-content{
        padding:0 15px;
      }

      .blog-content h2{
        font-size:22px;
      }

      .blog-content p{
        font-size:14px;
      }

      .slide{
        min-width:75%;
      }

      .related-card{
        height:320px;
      }
    }

    /* Phones */
    @media(max-width:576px){

      .blog-details-page{
        padding:20px 0;
      }

      .blog-content{
        padding:0 12px;
      }

      .blog-content h2{
        font-size:20px;
      }

      .blog-content p{
        font-size:13.5px;
      }

      .highlight{
        font-size:14px;
      }

      .blog-nav{
        font-size:12px;
      }

      .slide{
        min-width:90%;
      }

      .related-card{
        height:280px;
      }

      .overlay{
        padding:15px;
      }

      .overlay h6{
        font-size:14px;
      }

      .overlay p{
        font-size:12px;
      }
    }

    /* 🔥 EXTRA SMALL (320px) */
    @media(max-width:320px){

      .blog-content{
        padding:0 10px;
      }

      .blog-content h2{
        font-size:18px;
      }

      .blog-content p{
        font-size:12.5px;
        line-height:1.6;
      }

      .highlight{
        font-size:13px;
      }

      .blog-nav{
        font-size:11px;
        flex-direction:column;
        gap:8px;
        text-align:center;
      }

      .slide{
        min-width:100%;
      }

      .related-card{
        height:240px;
      }

      .overlay{
        padding:12px;
      }

      .overlay h6{
        font-size:13px;
      }

      .overlay p{
        font-size:11.5px;
      }

      .dot{
        width:12px;
        height:12px;
      }

      .dot::after{
        width:5px;
        height:5px;
      }
    }

    `}</style>

  </>
  )
}