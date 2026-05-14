import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "../Components/Subscribe";

export default function Checkout() {

  // ============================
  // STEP
  // ============================

  const [step, setStep] = useState(1);

  // ============================
  // CART
  // ============================

  const [cart, setCart] = useState([]);

  const [loading, setLoading] = useState(true);

  const [placingOrder, setPlacingOrder] =
    useState(false);

  // ============================
  // FORM DATA
  // ============================

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "United States (US)",
    address: "",
    apartment: "",
    city: "",
    state: "California",
    zip: "",
    phone: "",
    email: "",
    notes: "",
    paymentMethod: "cod",
  });

  // ============================
  // HANDLE CHANGE
  // ============================

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ============================
  // FETCH CART
  // ============================

  useEffect(() => {

    const fetchCart = async () => {

      try {

        const token =
          localStorage.getItem("token");

        if (!token) {

          setLoading(false);
          return;
        }

        const res = await axios.get(
          "http://localhost:5000/api/cart",
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );

        setCart(res.data.data);

      } catch (error) {

        console.log(
          error.response?.data
        );

        console.log(error);

      } finally {

        setLoading(false);
      }
    };

    fetchCart();

  }, []);

  // ============================
  // TOTAL
  // ============================

  const subtotal = cart.reduce(
    (acc, item) =>
      acc +
      (
        Number(
          item.product.price.replace(
            "$",
            ""
          )
        ) * item.quantity
      ),
    0
  );

  // ============================
  // PLACE ORDER
  // ============================

  const placeOrder = async () => {

    try {

      // ========================
      // VALIDATION
      // ========================

      if (
        !formData.firstName ||
        !formData.lastName ||
        !formData.address ||
        !formData.city ||
        !formData.phone ||
        !formData.email
      ) {

        alert(
          "Please fill all required fields"
        );

        return;
      }

      // ========================
      // EMPTY CART
      // ========================

      if (cart.length === 0) {

        alert("Your cart is empty");
        return;
      }

      setPlacingOrder(true);

      // ========================
      // TOKEN
      // ========================

      const token =
        localStorage.getItem("token");

      if (!token) {

        alert("Please login first");
        return;
      }

      // ========================
      // API CALL
      // ========================

      const res = await axios.post(
        "http://localhost:5000/api/checkout/place",

        {
          customer: {
            firstName:
              formData.firstName,

            lastName:
              formData.lastName,

            company:
              formData.company,

            country:
              formData.country,

            address:
              formData.address,

            apartment:
              formData.apartment,

            city:
              formData.city,

            state:
              formData.state,

            zip:
              formData.zip,

            phone:
              formData.phone,

            email:
              formData.email,

            notes:
              formData.notes,
          },

          paymentMethod:
            formData.paymentMethod,

          total: subtotal,
        },

        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

      // ========================
      // SUCCESS
      // ========================

      alert(
        res.data.message ||
        "Order placed successfully"
      );

      console.log(res.data);

      // ========================
      // CLEAR CART UI
      // ========================

      setCart([]);

      // ========================
      // RESET FORM
      // ========================

      setFormData({
        firstName: "",
        lastName: "",
        company: "",
        country: "United States (US)",
        address: "",
        apartment: "",
        city: "",
        state: "California",
        zip: "",
        phone: "",
        email: "",
        notes: "",
        paymentMethod: "cod",
      });

      // ========================
      // GO TO STEP 1
      // ========================

      setStep(1);

    } catch (error) {

      console.log(error);

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data
          ?.message ||
        "Order failed"
      );

    } finally {

      setPlacingOrder(false);
    }
  };

  // ============================
  // LOADING
  // ============================

  if (loading) {

    return (
      <h3 className="text-center mt-5">
        Loading Checkout...
      </h3>
    );
  }

  return (
    <>
      <div className="checkout-page">

        {/* HEADER */}

        <div className="checkout-header text-center">

          <h2>
            Checkout
          </h2>

          <p>
            Home • Checkout
          </p>

        </div>

        <div className="container checkout-container">

          {/* STEP BAR */}

          <div className="step-bar">

            <div
              className={
                step === 1
                  ? "active-step"
                  : ""
              }
              onClick={() =>
                setStep(1)
              }
            >
              1 Billing & Shipping
            </div>

            <div
              className={
                step === 2
                  ? "active-step"
                  : ""
              }
              onClick={() =>
                setStep(2)
              }
            >
              2 Order & Payment
            </div>

          </div>

          {/* COUPON */}

          <div className="coupon-box">
            Have a coupon? Click here
            to enter your code
          </div>

          {/* STEP 1 */}

          {step === 1 && (

            <div className="row mt-4">

              {/* LEFT */}

              <div className="col-lg-6">

                <h5 className="mb-3">
                  Billing details
                </h5>

                <input
                  className="form-control custom-input"
                  placeholder="First Name *"
                  name="firstName"
                  value={
                    formData.firstName
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  className="form-control custom-input"
                  placeholder="Last Name *"
                  name="lastName"
                  value={
                    formData.lastName
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  className="form-control custom-input"
                  placeholder="Company Name (optional)"
                  name="company"
                  value={
                    formData.company
                  }
                  onChange={
                    handleChange
                  }
                />

                <select
                  className="form-control custom-input"
                  name="country"
                  value={
                    formData.country
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option>
                    United States (US)
                  </option>
                </select>

                <input
                  className="form-control custom-input"
                  placeholder="Street Address *"
                  name="address"
                  value={
                    formData.address
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  className="form-control custom-input"
                  placeholder="Apartment, suite, unit etc (optional)"
                  name="apartment"
                  value={
                    formData.apartment
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  className="form-control custom-input"
                  placeholder="Town / City *"
                  name="city"
                  value={
                    formData.city
                  }
                  onChange={
                    handleChange
                  }
                />

                <select
                  className="form-control custom-input"
                  name="state"
                  value={
                    formData.state
                  }
                  onChange={
                    handleChange
                  }
                >
                  <option>
                    California
                  </option>
                </select>

                <input
                  className="form-control custom-input"
                  placeholder="Zip Code *"
                  name="zip"
                  value={formData.zip}
                  onChange={
                    handleChange
                  }
                />

                <input
                  className="form-control custom-input"
                  placeholder="Phone *"
                  name="phone"
                  value={
                    formData.phone
                  }
                  onChange={
                    handleChange
                  }
                />

                <input
                  className="form-control custom-input"
                  placeholder="Email Address *"
                  name="email"
                  value={
                    formData.email
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

              {/* RIGHT */}

              <div className="col-lg-6">

                <h5 className="mb-3">
                  Additional information
                </h5>

                <textarea
                  className="form-control custom-textarea"
                  placeholder="Notes about your order"
                  name="notes"
                  value={
                    formData.notes
                  }
                  onChange={
                    handleChange
                  }
                />

              </div>

            </div>
          )}

          {/* STEP 2 */}

          {step === 2 && (

            <div className="order-box mt-4">

              <h5>
                Your order
              </h5>

              {/* PRODUCTS */}

              {cart.map((item) => (

                <div
                  className="order-row"
                  key={
                    item.product._id
                  }
                >

                  <span>
                    {
                      item.product.name
                    }
                    {" "}
                    ×
                    {
                      item.quantity
                    }
                  </span>

                  <span>

                    $
                    {(
                      Number(
                        item.product.price.replace(
                          "$",
                          ""
                        )
                      ) *
                      item.quantity
                    ).toFixed(2)}

                  </span>

                </div>

              ))}

              {/* SUBTOTAL */}

              <div className="order-row">

                <span>
                  Subtotal
                </span>

                <span>
                  $
                  {subtotal.toFixed(
                    2
                  )}
                </span>

              </div>

              {/* TOTAL */}

              <div className="order-row total">

                <span>
                  TOTAL
                </span>

                <span>
                  $
                  {subtotal.toFixed(
                    2
                  )}
                </span>

              </div>

              <hr />

              {/* PAYMENT */}

              <p className="payment-title">
                Select Payment Method
              </p>

              <div className="payment-options">

                <label>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank"
                    checked={
                      formData.paymentMethod ===
                      "bank"
                    }
                    onChange={
                      handleChange
                    }
                  />

                  Direct bank transfer

                </label>

                <label>

                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={
                      formData.paymentMethod ===
                      "cod"
                    }
                    onChange={
                      handleChange
                    }
                  />

                  Cash on delivery

                </label>

              </div>

              <p className="privacy-text">
                Your personal data will
                be used to process your
                order.
              </p>

              <button
                className="place-order"
                onClick={placeOrder}
                disabled={placingOrder}
              >
                {
                  placingOrder
                    ? "Placing Order..."
                    : "Place Order"
                }
              </button>

            </div>
          )}

          {/* BUTTONS */}

          <div className="checkout-buttons">

            {step === 2 && (

              <button
                className="btn-nav"
                onClick={() =>
                  setStep(1)
                }
              >
                Previous
              </button>
            )}

            {step === 1 && (

              <button
                className="btn-nav"
                onClick={() =>
                  setStep(2)
                }
              >
                Next
              </button>
            )}

          </div>

        </div>

        {/* CSS */}
<style>{`

.checkout-page{
background:#f7f7f7;
min-height:100vh;
}

.checkout-header{
background:#a7d1bf;
padding:60px 0;
}

.checkout-header h2{
font-weight:600;
}

.checkout-header p{
font-size:14px;
margin:0;
}

.checkout-container{
max-width:900px;
margin:auto;
padding:40px 20px;
}

.step-bar{
display:flex;
border:1px solid #ddd;
text-align:center;
font-size:14px;
cursor:pointer;
}

.step-bar div{
flex:1;
padding:10px;
}

.active-step{
background:#f3f3f3;
font-weight:600;
}

.coupon-box{
margin-top:15px;
border:1px solid #ddd;
border-radius:20px;
padding:8px 15px;
font-size:13px;
width:320px;
max-width:100%;
}

.custom-input{
margin-bottom:12px;
border-radius:20px;
padding:10px 15px;
font-size:14px;
}

.custom-textarea{
height:120px;
border-radius:20px;
padding:10px 15px;
font-size:14px;
}

.order-box{
border:1px solid #333;
padding:20px;
max-width:600px;
margin:auto;
background:white;
}

.order-row{
display:flex;
justify-content:space-between;
margin:10px 0;
font-size:14px;
}

.total{
font-weight:600;
}

.payment-title{
font-weight:600;
margin-top:10px;
}

.payment-desc{
font-size:13px;
color:#555;
}

.payment-options label{
display:block;
font-size:14px;
margin:5px 0;
}

.privacy-text{
font-size:12px;
color:#666;
margin-top:10px;
}

.place-order{
background:black;
color:white;
border:none;
padding:8px 20px;
border-radius:20px;
margin-top:10px;
}

.checkout-buttons{
display:flex;
justify-content:space-between;
margin-top:20px;
flex-wrap:wrap;
gap:10px;
}

.btn-nav{
background:black;
color:white;
border:none;
padding:6px 20px;
border-radius:20px;
}



/* Tablet */
@media(max-width:768px){

.checkout-header{
padding:40px 0;
}

.step-bar{
flex-direction:column;
}

.coupon-box{
width:100%;
}

.order-box{
max-width:100%;
}

}



/* Mobile */
@media(max-width:480px){

.checkout-container{
padding:20px 10px;
}

.checkout-header{
padding:30px 10px;
}

.checkout-header h2{
font-size:22px;
}

.order-box{
padding:15px;
}

.order-row{
font-size:13px;
}

.custom-input{
font-size:13px;
}

}



/* Small Mobile */
@media(max-width:320px){

.checkout-header h2{
font-size:20px;
}

.checkout-header p{
font-size:12px;
}

.order-row{
font-size:12px;
}

.btn-nav{
width:100%;
text-align:center;
}

.place-order{
width:100%;
}

}

`}</style>

      </div>

      <Subscribe />

    </>
  );
}