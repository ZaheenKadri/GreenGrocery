import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "../Components/Subscribe";

export default function Blog() {
    const navigate = useNavigate();

    const [archives, setArchives] = useState([]);
        useEffect(() => {
        const fetchArchives = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/blogs/archives");
                const data = await res.json();
                setArchives(data.archives);
            } catch (error) {
                console.error("Error fetching archives:", error);
            }
        };

        fetchArchives();
    }, []);
    const getMonthName = (month) => {
        const months = [
            "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"
        ];
        return months[month - 1];
    };

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/blogs/categories");
                const data = await res.json();
                setCategories(data.categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        fetchCategories();
    }, []);

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
        <div className="blog-page">

            {/* HEADER */}
            <div className="blog-header text-center">
                <h2 className="blog-title">Blog</h2>
                <p className="blog-breadcrumb">Home</p>
            </div>

            <div className="container blog-container">
                <div className="row">

                    {/* BLOG POSTS */}
                    <div className="col-lg-9">
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
                                            <h6 className="blog-post-title">{blog.title}</h6>
                                            <p className="blog-desc">{blog.maindesc}</p>
                                            <a href={`/blog/${blog._id}`} className="blog-read-more">READ MORE</a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* SIDEBAR */}
                    <div className="col-lg-3 blog-sidebar">

                        {/* SEARCH */}
                        <div className="blog-box">
                            <div className="blog-search-wrapper">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="blog-search-input"
                                />
                                <button className="blog-search-btn">
                                    SEARCH
                                </button>
                            </div>
                        </div>

                        {/* CATEGORIES */}
                        <div className="blog-box">
                            <h6 className="blog-sidebar-title">Categories</h6>
                            <ul className="blog-list">
                                {categories.map((cat) => (
                                    <li key={cat._id}>
                                        {cat._id} <span>{cat.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* PRODUCTS */}
                        <div className="blog-box">

                            <h6 className="blog-sidebar-title">Products</h6>

                            <div className="blog-product-item">
                                <img src="/images/Blog/product-42-80x80.jpeg" alt=""/>
                                <div>
                                    <p>Black Soy Bean</p>
                                    <span>$8.00</span>
                                </div>
                            </div>

                            <div className="blog-product-item">
                                <img src="/images/Blog/product-4-80x80.jpeg" alt=""/>
                                <div>
                                    <p>Almond Flour</p>
                                    <span>$10.00</span>
                                </div>
                            </div>

                            <div className="blog-product-item">
                                <img src="/images/Blog/product-46-80x80.jpeg" alt=""/>
                                <div>
                                    <p>Organic Broccoli</p>
                                    <span>$6.00</span>
                                </div>
                            </div>

                        </div>

                        {/* RECENT POSTS */}
                        <div className="blog-box">
                            <h6 className="blog-sidebar-title">Recent Posts</h6>
                            <ul className="blog-recent">
                                {blogs.map((blog) => (
                                    <a href={`/blog/${blog._id}`} key={blog._id}>
                                        <li>{blog.title}</li>
                                    </a> 
                                ))}
                            </ul>
                        </div>

                        {/* ARCHIVES */}
                        <div className="blog-box">
                            <h6 className="blog-sidebar-title">Archives</h6>
                            <ul className="blog-list">
                                {archives.map((item, index) => (
                                    <li 
                                        key={index}
                                        style={{ cursor: "pointer" }}
                                        onClick={() =>
                                            navigate(`/archive/${item._id.year}/${item._id.month}`)
                                        }
                                    >
                                        {getMonthName(item._id.month)} {item._id.year}
                                        <span>{item.count}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>

                </div>

            </div>

            < Subscribe />

            {/* CSS */}
            <style>{`
                .blog-page{
                    background:#fff;
                    min-height:100vh;
                }

                /* HEADER */
                .blog-page .blog-header{
                    background:#a8d5c2;
                    padding:80px 0;
                    margin-bottom:40px;
                }

                .blog-page .blog-title{
                    font-weight:600;
                }

                .blog-page .blog-breadcrumb{
                    font-size:14px;
                    color:#333;
                }

                /* BLOG CARD */
                .blog-page .blog-card{
                    background:#fff;
                    border:1px solid #eee;
                    height: 100%;
                }

                .blog-page .blog-image{
                    width:100%;
                    height:180px;
                    object-fit:cover;
                }

                .blog-page .blog-content{
                    padding:15px;
                }

                .blog-page .blog-date{
                    font-size:12px;
                    color:#777;
                }

                .blog-page .blog-post-title{
                    font-weight:600;
                    margin:8px 0;
                }

                .blog-page .blog-desc{
                    font-size:13px;
                    color:#666;
                }

                .blog-page .blog-read-more{
                    font-size:12px;
                    font-weight:600;
                    color:#000;
                    text-decoration:none;
                }

                /* SIDEBAR */
                .blog-page .blog-box{
                    background:#fff;
                    border:1px solid #eee;
                    padding:20px;
                    margin-bottom:20px;
                }

                .blog-page .blog-sidebar-title{
                    font-weight:600;
                    margin-bottom:15px;
                }

                .blog-page .blog-list{
                    list-style:none;
                    padding:0;
                }

                .blog-page .blog-list li{
                    display:flex;
                    justify-content:space-between;
                    padding:5px 0;
                    font-size:13px;
                }

                /* SEARCH BAR */
                .blog-page .blog-search-wrapper{
                    display:flex;
                    align-items:center;
                    border:1px solid #e5e5e5;
                    border-radius:40px;
                    padding:5px;
                    background:#fff;
                }

                .blog-page .blog-search-input{
                    flex:1;
                    border:none;
                    outline:none;
                    padding:10px 15px;
                    font-size:14px;
                    border-radius:40px;
                }

                .blog-page .blog-search-btn{
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

                .blog-page .blog-search-btn:hover{
                    background:#c7bff7;
                }


                /* PRODUCTS */
                .blog-page .blog-product-item{
                    display:flex;
                    gap:10px;
                    margin-bottom:12px;
                }

                .blog-page .blog-product-item img{
                    width:40px;
                    height:40px;
                    object-fit:cover;
                }

                /* RECENT POSTS */
                .blog-page .blog-recent{
                    list-style:none;
                    padding:0;
                    font-size:13px;
                }

                .blog-page .blog-recent li{
                    padding: 4px 0;
                }

                .blog-page .blog-recent a{
                    color:#333;
                    text-decoration:none;
                }

                /* RESPONSIVE */
                @media(max-width:992px){
                    .blog-page .blog-sidebar{
                        margin-top:40px;
                    }
                }

                @media(max-width:576px){
                    .blog-page .blog-image{
                        height:160px;
                    }
                }

                @media(max-width:320px){
                    .blog-page .blog-post-title{
                        font-size:14px;
                    }
                    .blog-page .blog-desc{
                        font-size:12px;
                    }
                }

            `}</style>
        </div>
    </>
    );
}