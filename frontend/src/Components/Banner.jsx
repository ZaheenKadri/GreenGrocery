import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

export default function PromoCards() {
  return (
    <>
      <style>{`

      .banner-section{
        padding:40px 0;
      }

      .banner-card{
        height:220px;
        border-radius:12px;
        padding:30px;
        color:#111;
        position:relative;
        overflow:hidden;
        display:flex;
        flex-direction:column;
        justify-content:space-between;
      }

      .banner-card h4{
        font-weight:600;
      }

      .banner-btn{
        background:#000;
        border:none;
        padding:10px 20px;
        border-radius:25px;
        width:140px;
      }

      .banner1{
        background-image:url("../images/Banner/25-768x512.png");
        background-repeat:no-repeat;
        background-size:100%;
      }

      .banner2{
        background-image:url("../images/Banner/2.png");
        background-repeat:no-repeat;
        background-size:100%;
      }

      .banner3{
        background-image:url("../images/Banner/32-768x512.png");
        background-repeat:no-repeat;
        background-size:100%;
      }

      .banner-small{
        font-size:14px;
        color:#555;
      }

      @media (max-width:1025px){
        .banner1, 
        .banner3{
          background-size:150%;
        }
      }

      @media (max-width:780px){
        .banner1, 
        .banner2,
        .banner3{
          background-size:215%;
        }

        .banner-card h4{
          font-size: 17px
        }

        .banner-btn{
          margin-left: -17px !important;
        }
      }

      @media (max-width: 480px) {
        .banner1, .banner2, .banner3 {
          background-size: 100%;
          margin-bottom: 10px;
        }
      }

      `}</style>

      <div className="banner-section">
        <Container>
          <Row>

            {/* Card 1 */}
            <Col md={4}>
              <div className="banner-card banner1">
                <h4>Daily Milk & Eggs</h4>
                <Button className="banner-btn">Order Now!</Button>
              </div>
            </Col>

            {/* Card 2 */}
            <Col md={4}>
              <div className="banner-card banner2">
                <h4>Colorful Creams!</h4>
                <Button className="banner-btn">Order Now!</Button>
              </div>
            </Col>

            {/* Card 3 */}
            <Col md={4}>
              <div className="banner-card banner3">
                <div>
                  <div className="banner-small">0 Products</div>
                  <div className="banner-small">Uncategorized</div>
                  <h4>Hot cookies are ready!</h4>
                </div>

                <Button className="banner-btn">Order Now!</Button>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </>
  );
}