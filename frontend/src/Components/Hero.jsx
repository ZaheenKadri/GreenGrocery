import React from "react";
import { Carousel, Container, Row, Col, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HeroSlider() {
  return (
    <>
      <style>{`
        .hero-section{
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          padding:60px 0;
          border-radius:5px;
        }

        .hero-b1{
          background-image: url("../images/Hero/banner-1350-8.png");
          height: 350px;
        }

        .hero-1{
          margin-left: 10%;
        }

        .hero-tag1{
          border:1px solid #dd2623;
          color:#dd2623;
          padding:4px 12px;
          border-radius:20px;
          font-size:12px;
          letter-spacing:2px;
          display:inline-block;
        }

        .hero-title1{
          font-size:42px;
          font-weight:700;
          color: white;
          line-height:1.2;
          width: 70%;
          margin-bottom: 15px;     
        }

        .hero-desc1{
          color: white;
          max-width:400px;
          margin-bottom:10px;
        }

        .hero-btn1{
          background:#ffc4c3;
          border:none;
          padding:12px 30px;
          border-radius:30px;
          font-weight:500;
        }
        
        .hero-b2{
          background-image: url("../images/Hero/banner-1350-12.png");
          height: 350px;
        }

        .hero-2{
          margin-left:45%;
        }

        .discount-box{
          display:flex;
          align-items:center;
          gap:10px;
          margin-bottom:20px;
          margin-top:-40px;
        }

        .discount-text{
          font-size:12px;
          letter-spacing:3px;
          color:#333;
        }

        .discount-time{
          border:1px solid #3a8ec9;
          padding:8px 15px;
          border-radius:6px;
          background:#e7f1f9;
        }

        .hero-title2{
          font-size:36px;
          font-weight:700;
          width: 125%;
        }

        .hero-price2{
          font-size:14px;
          color:#2c7fb8;
          letter-spacing:2px;
          margin-bottom:15px;
        }

        .hero-price2 span{
          font-size:42px;
          color:#333;
          font-weight:700;
          margin-left:8px;
        }

        .hero-desc2{
          color:#555;
          max-width:420px;
          margin-bottom:25px;
          width: 130%;
        }

        .hero-btn2{
          background:#2c7fb8;
          border:none;
          padding:12px 30px;
          border-radius:30px;
        }

        .hero-b3{
          background-image: url("../images/Hero/banner-1350-30.png");
          height: 350px;
        }

        .hero-3{
          margin-left:8%;
          margin-top: -40px;
        }

        .hero-tag3{
          border:1px solid #5a8f74;
          color:#5a8f74;
          padding:5px 14px;
          border-radius:20px;
          font-size:12px;
          letter-spacing:2px;
          display:inline-block;
          margin-bottom:15px;
        }

        .hero-title3{
          font-size:30px;
          font-weight:700;
          color:#1d1d1d;
          line-height:1.2;
          width:70%;
          margin-bottom:15px;
        }

        .hero-price3{
          color:#d62828;
          font-size:42px;
          font-weight:700;
        }

        .hero-desc3{
          color:#555;
          max-width:420px;
        }

        .hero-btn3{
          background:#5a8f74;
          border:none;
          padding:12px 30px;
          border-radius:30px;
          font-weight:500;
        }

        .hero-b4{
          background-image: url("../images/Hero/banner-1350-27.png");
          height: 350px;
        }

        .hero-4{
          display:flex;
          align-items:center;
          justify-content:center;
          text-align:center;
        }

        .hero-center{
          margin-top:-100px;
        }

        .hero-tag4{
          border:1px solid #5a8f74;
          color:#5a8f74;
          padding:5px 14px;
          border-radius:20px;
          font-size:12px;
          letter-spacing:2px;
          display:inline-block;
        }

        .hero-title4{
          font-size:40px;
          font-weight:700;
          color:#1d1d1d;
          margin-bottom:25px;
        }

        .hero-btn4{
          background:#5a8f74;
          border:none;
          padding:5px 30px;
          border-radius:30px;
          font-weight:500;
        }

        .carousel-control-prev,
        .carousel-control-next{
          width:40px;
          height:40px;
          background:#d8cfc3;
          border-radius:50%;
          top:50%;
          transform:translateY(-50%);
        }

        .carousel-control-prev{
          left: 15px;
        }

        .carousel-control-next{
          right: 15px;
        }

        .col-md-9 {
          flex: 0 0 auto;
          width: 80%;
        }

        /* RESPONSIVE HERO SECTION */
        @media (max-width:1200px){
            .hero-title1,
            .hero-title2,
            .hero-title3{
                font-size:32px;
            }

            .hero-title4{
                font-size:34px;
            }

            .hero-desc2{
                width:100%;
            }
        }

        @media (max-width:992px){

            .hero-section{
                padding:40px 20px;
            }

            .hero-1,
            .hero-2,
            .hero-3{
                margin-left:0;
            }

            .hero-3{
                margin-top: 1px;
            }

            .hero-title1,
            .hero-title2,
            .hero-title3{
                font-size:28px;
            }

            .hero-price2 span{
                font-size:34px;
            }

            .hero-price3{
                font-size:34px;
            }
        }

        @media (max-width:768px){
            .hero-section{
                height:auto;
                padding:40px 25px;
            }

            .hero-title1,
            .hero-title2,
            .hero-title3{
                font-size:24px;
            }

            .hero-title4{
                font-size:26px;
            }

            .hero-center{
                margin-top:0px;
            }

            .hero-desc1,
            .hero-desc2,
            .hero-desc3{
                font-size:14px;
            }

            .hero-btn1,
            .hero-btn2,
            .hero-btn3,
            .hero-btn4{
                padding:10px 20px;
                font-size:14px;
            }

            .discount-box{
                flex-direction:column;
                align-items:flex-start;
                gap:5px;
                margin-top:0;
            }
        }

        @media (max-width:480px){

            .hero-section{
                width:100vw;
                margin-left:-12px;
                border-radius:0;
            }
                
            .hero-title1,
            .hero-title2,
            .hero-title3{
                font-size:20px;
            }

            .hero-title4{
                font-size:22px;
            }

            .hero-price2 span{
                font-size:28px;
            }

            .hero-price3{
                font-size:28px;
            }

            .hero-center{
                margin-top:0;
            }
        }
      `}</style>

      <Container className="mt-4">
        <Carousel indicators={false}>
          
            {/* Slide 1 */}
            <Carousel.Item>
                <div className="hero-section hero-b1">
                    <Container>
                        <Row className="align-items-center hero-1">
                            <Col md={6}>
                                <span className="hero-tag1">32% Discount!</span>
                                <h2 className="hero-title1">
                                    Meet Products For Your Taste
                                </h2>

                                <p className="hero-desc1">
                                    Meet the largest meet store in our country
                                </p>

                                <Button className="hero-btn1">
                                    Check Products →
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Carousel.Item>

            {/* Slide 2 */}
            <Carousel.Item>
                <div className="hero-section hero-b2">
                    <Container>
                        <Row className="align-items-center hero-2">
                            <Col md={7}>
                
                                <div className="discount-box">
                                    <span className="discount-text">DISCOUNT END:</span>
                                    <span className="discount-time">undefined</span>
                                </div>

                                <h2 className="hero-title2">
                                    Fresh Bakery Products
                                </h2>

                                <div className="hero-price2">
                                    FROM <span>$14.25</span>
                                </div>

                                <p className="hero-desc2">
                                    Made from premium non-stretch Japanese denim for a vintage-inspired.
                                </p>

                                <Button className="hero-btn2">
                                    Products →
                                </Button>

                            </Col>
                        </Row>
                   </Container>
                </div>
            </Carousel.Item>

            {/* Slide 3 */}
            <Carousel.Item>
                <div className="hero-section hero-b3">
                    <Container>
                        <Row className="align-items-center hero-3">
                            <Col md={6}>
                                <span className="hero-tag3">HEALTHY MEAT</span>

                                <h2 className="hero-title3">
                                    Raised On Our Own Farm, Pamper Your Palate!
                                </h2>

                                <div className="hero-price3">$14.25</div>

                                <p className="hero-desc3">
                                    Aenean vel diam ut arcu pharetra dignissim ut sed leo.
                                </p>

                                <Button className="hero-btn3">
                                    Products →
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Carousel.Item>

            {/* Slide 4 */}
            <Carousel.Item>
                <div className="hero-section hero-b4 hero-4">
                    <Container>
                        <div className="hero-center">
                            <span className="hero-tag4">DAILY FRESH</span>

                            <h2 className="hero-title4">
                                Licensed Organic Pineapples
                            </h2>

                            <Button className="hero-btn4">
                                Products →
                            </Button>
                        </div>
                    </Container>
                </div>
            </Carousel.Item>
        </Carousel>
      </Container>
    </>
  );
}