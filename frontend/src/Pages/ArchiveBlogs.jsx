import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArchiveBlogs() {
    const { year, month } = useParams();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/blogs/archive-filter?year=${year}&month=${month}`
                );
                const data = await res.json();
                setBlogs(data.blogs);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBlogs();
    }, [year, month]);

    const getMonthName = (month) => {
        return [
            "January","February","March","April","May","June",
            "July","August","September","October","November","December"
        ][month - 1];
    };

    return (
        <div className="archive-page">

            {/* HEADER */}
            <div className="archive-header text-center">
                <h2>{getMonthName(month)} {year}</h2>
                <p>Home • {year} • {getMonthName(month)}</p>
            </div>

            {/* BLOG GRID */}
            <div className="container mt-5">
                <div className="row">
                    {blogs.map((blog) => (
                        <div className="col-lg-4 col-md-6 col-12 mb-4" key={blog._id}>
                            <div className="blog-card">
                                <img
                                    src={`http://localhost:5000/images${blog.img}`}
                                    alt=""
                                    className="blog-image"
                                />

                                <div className="blog-content">
                                    <p className="blog-date">
                                        XNT_ADM&nbsp;&nbsp;
                                        {new Date(blog.createdAt)
                                            .toLocaleDateString("en-US", {
                                                month: "long",
                                                day: "numeric",
                                                year: "numeric"
                                            })
                                            .toUpperCase()}
                                    </p>

                                    <h6 className="blog-post-title">
                                        {blog.title}
                                    </h6>

                                    <p className="blog-desc">
                                        {blog.maindesc}
                                    </p>

                                    <a href={`/blog/${blog._id}`} className="blog-read-more">
                                        READ MORE
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CSS */}
            <style>{`
                .archive-header {
                    background: #a8d5c2;
                    padding: 80px 0;
                }

                .archive-header h2 {
                    font-weight: 600;
                }

                .archive-header p {
                    font-size: 14px;
                    color: #333;
                }

                .blog-card {
                    background: #fff;
                    border: 1px solid #eee;
                    height: 100%;
                }

                .blog-image {
                    width: 100%;
                    height: 220px;
                    object-fit: cover;
                }

                .blog-content {
                    padding: 15px;
                }

                .blog-date {
                    font-size: 12px;
                    color: #777;
                }

                .blog-post-title {
                    font-weight: 600;
                    margin: 8px 0;
                }

                .blog-desc {
                    font-size: 13px;
                    color: #666;
                }

                .blog-read-more {
                    font-size: 12px;
                    font-weight: 600;
                    color: #000;
                    text-decoration: none;
                }
            `}</style>
        </div>
    );
}