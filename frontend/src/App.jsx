// import { Routes, Route } from "react-router-dom";

// import Home from "./Pages/Home.jsx";
// import Navbar from "./Components/Navbar";
// import Footer from "./Components/Footer";
// import NotFound from "./Pages/404";
// import AboutUs from "./Pages/aboutus.jsx:";

// function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="*" element={<NotFound />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//       </Routes>

//       <Footer />
//     </>
//   );
// }

// export default App;


import { Routes, Route } from "react-router-dom";

import Home from "./Pages/Home.jsx";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import NotFound from "./Pages/404.jsx";
import AboutUs from "./Pages/Aboutus.jsx";
import Contact from "./Pages/Contact.jsx";
import FAQs from "./Pages/FAQs.jsx";
import Order from "./Pages/Order";
import Checkout from "./Pages/Checkout";
import Blog from "./Pages/Blog";
import BlogDetails from "./Pages/BlogDetails.jsx";
import Product from "./Pages/Product.jsx";
import ProductDetails from "./Pages/ProductDetails.jsx";
import ArchiveBlogs from "./Pages/ArchiveBlogs.jsx";
import Cart from "./Pages/Cart.jsx";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/order" element={<Order />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/archive/:year/:month" element={<ArchiveBlogs />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product/category/:category" element={<Product />} />
        <Route path="/product/category/:category/:subcategory" element={<Product />}/>
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Cart" element={<Cart />} />

        {/* Default Route */}
        <Route path="*" element={<Order />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;