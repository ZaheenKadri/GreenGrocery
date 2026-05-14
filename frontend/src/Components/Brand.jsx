import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";

export default function BrandSection() {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/products/brands");

                const brandData = res.data.data;

                // 🔥 convert object → array
                const formatted = Object.keys(brandData).map((name) => ({
                    name,
                    img: "/images/brand-logos-8-100x84.webp" // static for now
                }));

                setBrands(formatted);

            } catch (err) {
                console.error(err);
            }
        };

        fetchBrands();
    }, []);

    return (
    <>
        <style>{`
            .brand-section{
                padding:20px 0;
                border: 2px solid red;
                border-radius: 5px;
            }

            .brand-title{
                font-size:20px;
                font-weight:600;
            }

            .brand-card{
                text-align:center;
                cursor:pointer;
                padding:10px;
                transition:0.3s;
            }

            .brand-card img{
                height:100%;
                width: 100%;
                object-fit:contain;
                margin-bottom:10px;
            }

            .brand-name{
                font-size:12px;
                letter-spacing:1px;
                color:#555;
            }

            .brand-card:hover{
                transform:translateY(-4px);
            }

            .col-lg-1 {
                flex: 0 0 auto;
                width: 12%;
            }

            @media (max-width: 430px) {
                .col-lg-1 {
                    flex: 0 0 auto;
                    width: 22%;
                }
            }
        `}</style>
        <div className="brand-section">
            <Container>
                <div className="brand-title">
                    Shop By Brands
                </div>
                <Row className="align-items-center">
                    {brands.map((brand,index)=>(
                        <Col key={index} xs={4} sm={3} md={2} lg={1} className="text-center">
                            <div className="brand-card">
                                <img src={brand.img} alt={brand.name} />
                                <div className="brand-name">
                                {brand.name.toUpperCase()}
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    </>
    );
}