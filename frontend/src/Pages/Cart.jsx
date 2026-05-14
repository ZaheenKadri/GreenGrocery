import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cart() {

const [cart, setCart] = useState([]);

const [loading, setLoading] = useState(true);

// ============================
// FETCH CART
// ============================

useEffect(() => {

const fetchCart = async () => {

try {

const token = localStorage.getItem("token");

if (!token) {
setLoading(false);
return;
}

const res = await axios.get(
"http://localhost:5000/api/cart",
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setCart(res.data.data);

} catch (error) {

console.log(error.response?.data);
console.log(error);

} finally {

setLoading(false);
}
};

fetchCart();

}, []);


// ============================
// INCREASE QTY
// ============================

const increase = async (productId)=>{

try{

const token = localStorage.getItem("token");

await axios.post(
"http://localhost:5000/api/cart",
{
productId
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setCart(cart.map(item =>

item.product._id === productId

? {
...item,
quantity:item.quantity + 1
}

: item
));

window.dispatchEvent(
new Event("cartUpdated")
);

}catch(error){

console.log(error.response?.data);
console.log(error);
}
};


// ============================
// DECREASE QTY
// ============================

const decrease = async (productId)=>{

const updatedCart = cart.map(item => {

if(
item.product._id === productId &&
item.quantity > 1
){

return {
...item,
quantity:item.quantity - 1
};
}

return item;
});

setCart(updatedCart);
};


// ============================
// REMOVE ITEM
// ============================

const removeItem = async (productId)=>{

try{

const token = localStorage.getItem("token");

await axios.delete(
`http://localhost:5000/api/cart/${productId}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
);

setCart(cart.filter(
item => item.product._id !== productId
));

window.dispatchEvent(
new Event("cartUpdated")
);

}catch(error){

console.log(error.response?.data);
console.log(error);
}
};


// ============================
// SUBTOTAL
// ============================

const subtotal = cart.reduce(
(acc,item)=>

acc +

(
Number(
item.product.price.replace("$","")
)
*
item.quantity
),
0
);


// ============================
// LOADING
// ============================

if(loading){

return (
<h3 className="text-center mt-5">
Loading Cart...
</h3>
);
}


// ============================
// JSX
// ============================

return (

<div className="cart-page">

{/* HEADER */}

<div className="cart-header text-center">
<h2>Cart</h2>
<p>Home • Cart</p>
</div>


<div className="container cart-container">

<div className="row">

{/* LEFT SIDE */}

<div className="col-lg-8">

{cart.length === 0 ? (

<div className="text-center py-5">

<h4>Your cart is empty</h4>

<p className="text-muted">
Add some products to your cart
</p>

</div>

) : (

cart.map(item => (

<div
className="cart-item"
key={item.product._id}
>

<img
src={`http://localhost:5000/images/Products${item.product.img}`}
alt=""
className="cart-img"
/>

<div className="cart-info">

<h6>{item.product.name}</h6>

<p>
{item.product.price} x {item.quantity}
</p>

</div>

<div className="cart-qty">

<button
onClick={()=>
decrease(item.product._id)
}
>
-
</button>

<span>{item.quantity}</span>

<button
onClick={()=>
increase(item.product._id)
}
>
+
</button>

</div>

<div className="cart-price">

$
{(
Number(
item.product.price.replace("$","")
)
*
item.quantity
).toFixed(2)}

</div>

<div
className="cart-remove"
onClick={()=>
removeItem(item.product._id)
}
>
🗑
</div>

</div>

))
)}

{/* COUPON */}

<div className="cart-coupon">

<input
type="text"
placeholder="Coupon code"
/>

<button>
Apply Coupon
</button>

</div>

</div>


{/* RIGHT SIDE */}

<div className="col-lg-4">

<div className="cart-total-box">

<h5>Cart totals</h5>

<div className="cart-total-row">

<span>SUBTOTAL</span>

<span>
${subtotal.toFixed(2)}
</span>

</div>

<div className="cart-total-row">

<span>TOTAL</span>

<span>
${subtotal.toFixed(2)}
</span>

</div>

<button className="checkout-btn">

Proceed To Checkout

</button>

</div>

</div>

</div>

</div>


{/* CSS */}

<style>{`

.cart-page{
background:#fff;
min-height:100vh;
}


/* HEADER */

.cart-page .cart-header{
background:#a8d5c2;
padding:40px 0;
margin-bottom:40px;
}

.cart-page .cart-header h2{
font-weight:600;
}

.cart-page .cart-header p{
font-size:14px;
}


/* CART ITEM */

.cart-page .cart-item{
display:flex;
align-items:center;
justify-content:space-between;
border-bottom:1px solid #eee;
padding:20px 0;
gap:15px;
flex-wrap:wrap;
}

.cart-page .cart-img{
width:60px;
height:60px;
object-fit:contain;
}

.cart-page .cart-info{
flex:1;
min-width:180px;
}

.cart-page .cart-info h6{
font-size:14px;
margin-bottom:5px;
}

.cart-page .cart-info p{
font-size:13px;
color:#777;
}


/* QTY */

.cart-page .cart-qty{
display:flex;
align-items:center;
border:1px solid #ddd;
border-radius:20px;
padding:3px 10px;
}

.cart-page .cart-qty button{
border:none;
background:none;
font-size:16px;
padding:0 8px;
cursor:pointer;
}

.cart-page .cart-qty span{
min-width:20px;
text-align:center;
}


/* PRICE */

.cart-page .cart-price{
min-width:60px;
font-size:14px;
color:#6b63d9;
}


/* REMOVE */

.cart-page .cart-remove{
cursor:pointer;
font-size:16px;
}


/* COUPON */

.cart-page .cart-coupon{
display:flex;
gap:10px;
margin-top:20px;
flex-wrap:wrap;
}

.cart-page .cart-coupon input{
flex:1;
padding:10px;
border-radius:30px;
border:1px solid #ddd;
}

.cart-page .cart-coupon button{
background:#6b63d9;
border:none;
color:#fff;
padding:10px 20px;
border-radius:30px;
}


/* TOTAL BOX */

.cart-page .cart-total-box{
border:1px solid #eee;
padding:25px;
}

.cart-page .cart-total-box h5{
margin-bottom:20px;
}

.cart-page .cart-total-row{
display:flex;
justify-content:space-between;
margin-bottom:10px;
font-size:14px;
}

.cart-page .checkout-btn{
width:100%;
background:#6b63d9;
color:#fff;
border:none;
padding:12px;
border-radius:30px;
margin-top:20px;
}


/* RESPONSIVE */

@media(max-width:768px){

.cart-page .cart-item{
flex-direction:column;
align-items:flex-start;
}

.cart-page .cart-qty{
margin-top:10px;
}

.cart-page .cart-price{
margin-top:10px;
}

}

@media(max-width:320px){

.cart-page .cart-info h6{
font-size:13px;
}

.cart-page .cart-info p{
font-size:12px;
}

.cart-page .checkout-btn{
font-size:13px;
}

}

`}</style>

</div>
);
}