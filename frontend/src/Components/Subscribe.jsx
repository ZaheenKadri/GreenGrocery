import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

export default function SubscribeSection() {
    const [email, setEmail] = useState("");
    const handleSubscribe = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (res.ok) {
                alert("Subscribed successfully 🎉");
                setEmail("");
            } else {
                alert(data.message);
            }

        } catch (err) {
            alert("Error ❌");
        }
    };
    return (
    <>
        <style>{`

            .subscribe-section{
                background: white;
                padding:60px 0;
            }

            .subscribe-title{
                font-size:24px;
                font-weight:600;
                margin-bottom:25px;
            }

            .subscribe-input{
                position:relative;
                max-width:500px;
            }

            .subscribe-input input{
                width:100%;
                height:55px;
                border-radius:35px;
                border:1px solid #ddd;
                padding-left:20px;
                padding-right:120px;
            }

            .subscribe-btn{
                position:absolute;
                right:5px;
                top:5px;
                height:45px;
                border-radius:30px;
                padding:0 25px;
                background:#a8a0e6;
                border:none;
            }

            .call-center{
                text-align:right;
            }

            .call-title{
                font-size:12px;
                letter-spacing:2px;
                color:#777;
                margin-bottom:10px;
            }

            .call-number{
                font-size:22px;
                font-weight:600;
                color:#6b63c5;
                }

            @media(max-width:768px){
                .call-center{
                    text-align:left;
                    margin-top:30px;
                }
            }

        `}</style>

        <div className="subscribe-section">
            <Container>
                <Row className="align-items-center">
                    {/* LEFT SIDE */}
                    <Col md={8}>
                        <div className="subscribe-title">
                            Get a surprise discount by registering!
                        </div>
                        <div className="subscribe-input">
                            <Form.Control
                                type="email"
                                placeholder="Your E-mail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button className="subscribe-btn" onClick={handleSubscribe}>
                                Submit
                            </Button>
                        </div>
                    </Col>

                    {/* RIGHT SIDE */}
                    <Col md={4} className="call-center">
                        <div className="call-title">
                            CALL OUR CALL CENTER
                        </div>
                        <div className="call-number">
                            +1 (800) 634 97 25
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    </>
  );
}