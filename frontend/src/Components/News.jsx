import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function NewsSlider() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/blogs");
                const data = await res.json();

                setBlogs(data.blogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
    <>
        <style>{`

            .news-section{
                padding:40px 0;
            }

            .title{
                display: flex;
                justify-content: space-between;
            }

            .news-title{
                font-size:24px;
                font-weight:600;
                margin-bottom:25px;
            }

            .news-card{
                background:#fff;
                border-radius:8px;
                overflow:hidden;
            }

            .news-image{
                position:relative;
            }

            .news-image img{
                width:100%;
                height:200px;
                object-fit:cover;
                border-radius:8px;
            }

            .news-tag{
                position:absolute;
                top:10px;
                right:10px;
                background:#fff;
                padding:5px 12px;
                font-size:12px;
                border-radius:6px;
                font-weight:600;
            }

            .news-content{
                padding:12px 5px;
            }

            .news-meta{
                font-size:10px;
                font-weight: 600;
                color:black;
                margin-bottom:6px;
                letter-spacing:1px;
            }

            .news-title-text{
                font-size:13px;
                font-weight:600;
                line-height:1.4;
            }

            .swiper-button-prev,
            .swiper-button-next{
                display: none;
            }
        `}</style>
        <div className="news-section">
            <Container>
                <div className="title">
                    <div className="news-title">
                        Latest News From The Store
                    </div>
                    <div className="proslider-arrows">
                        <div className="swiper-prev"><i className="bi bi-chevron-left"></i></div>
                        <div className="swiper-next"><i className="bi bi-chevron-right"></i></div>
                    </div>
                </div>
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        prevEl: ".swiper-prev",
                        nextEl: ".swiper-next",
                    }}
                    spaceBetween={20}
                    slidesPerView={4}
                    slidesPerGroup={1}
                    loop={false}
                    breakpoints={{
                    0:{slidesPerView:1},
                    576:{slidesPerView:2},
                    768:{slidesPerView:3},
                    992:{slidesPerView:4}
                    }}
                >
                    {blogs.map((blog,index)=>(
                        <SwiperSlide key={index}>
                            <div className="news-card">
                                <div className="news-image">
                                    <img src={`http://localhost:5000/images${blog.img}`} alt="news"/>
                                    <div className="news-tag">{blog.categories?.join(", ")}</div>
                                </div>
                                <div className="news-content">
                                    <div className="news-meta">
                                        XNT_ADM&nbsp;&nbsp;
                                        {new Date(blog.createdAt)
                                            .toLocaleDateString("en-US", {
                                            month: "long",
                                            day: "numeric",
                                            year: "numeric"
                                        })
                                        .toUpperCase()}
                                    </div>
                                    <div className="news-title-text">
                                        {blog.title}
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Container>
        </div>
    </>
    );
}