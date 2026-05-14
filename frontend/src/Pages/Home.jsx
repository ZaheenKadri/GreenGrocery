import LeftSidebar from "../Components/LeftSidebar";
import Hero from "../Components/Hero";
import Category from "../Components/Category";
import Products from "../Components/Products";
import Featured from "../Components/Featured";
import Banner from "../Components/Banner";
import Brand from "../Components/Brand";
import News from "../Components/News";
import Bestseller from "../Components/Bestseller";
import Subscribe from "../Components/Subscribe";

function Home() {
  return (
    <>
      <style>{`
        .hero {
          flex: 0 0 auto;
          width: 80%; 
        }

        @media (max-width:480px){
          .hero {
            flex: 0 0 auto;
            width: 100%;
          }
        }
      `}</style>

      <div className="container">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 d-none d-md-block">
            <LeftSidebar />
          </div>
          {/* Hero Section */}
          <div className="hero">
            <Hero />
            <Category />
            <Products />
            <Featured />
            <Banner />
            <Brand />
            <News />
          </div>
        </div>
      </div>
      <Bestseller />
      <Subscribe />
    </>
  );
}

export default Home;