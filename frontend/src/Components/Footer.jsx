// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap-icons/font/bootstrap-icons.css";

// export default function Footer() {
//   return (
//     <>
//       <style>{`
//         body {
//           overflow-x: hidden;
//         }

//         .footer {
//           background: #111;
//           color: #ccc;
//           padding: 60px 0 20px;
//         }

//         .footer .container-fluid {
//           padding-left: 40px;
//           padding-right: 40px;
//         }

//         .footer h5 {
//           color: #fff;
//           font-weight: 600;
//           margin-bottom: 20px;
//         }

//         .footer p {
//           font-size: 14px;
//           line-height: 1.7;
//         }

//         .footer a {
//           color: #ccc;
//           text-decoration: none;
//           font-size: 14px;
//           display: block;
//           margin-bottom: 10px;
//         }

//         .footer a:hover {
//           color: #fff;
//         }

//         /* SOCIAL ICONS */
//         .footsocial-icons {
//           margin-bottom: 50px;
//         }

//         .footsocial-icons i {
//           font-size: 16px;
//           background: #222;
//           color: #fff;
//           width: 40px;
//           height: 40px;
//           display: inline-flex;
//           align-items: center;
//           justify-content: center;
//           border-radius: 50%;
//           margin-right: 12px;
//           cursor: pointer;
//           transition: 0.3s;
//         }

//         .footsocial-icons i:hover {
//           background: #6f42c1;
//         }

//         /* DOWNLOAD SECTION */
//         .download-wrapper {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           gap: 20px;
//           width: 120%;
//           flex-wrap: wrap;
//         }

//         .download-text {
//           color: #fff;
//           font-weight: 600;
//           font-size: 16px;
//           flex: 1;
//           max-width: 185px;
//         }

//         .app-buttons {
//           display: flex;
//           gap: 12px;
//           flex-wrap: nowrap; /* 🔥 keeps buttons same line */
//         }

//         .app-buttons img {
//           height: 48px;
//           width: auto;
//           max-width: 100%;
//           cursor: pointer;
//         }

//         /* FOOTER BOTTOM */
//         .footer-bottom {
//           border-top: 1px solid #222;
//           margin-top: 40px;
//           padding-top: 20px;
//           font-size: 13px;
//         }

//         .footer-bottom a {
//           display: inline;
//           margin-right: 15px;
//         }

//         .payment-icons img {
//           height: 26px;
//           width: 100%;
//           margin-left: 10px;
//         }

//         /* TABLET */
//         @media (max-width: 992px) {
//           .footer .container-fluid {
//             padding-left: 20px;
//             padding-right: 20px;
//           }
//         }

//         /* MOBILE */
//         @media (max-width: 576px) {
//           .footer {
//             padding: 40px 0 20px;
//           }

//           .download-wrapper {
//             flex-direction: column;
//             align-items: flex-start;
//             width: 100%;
//           }

//           .download-text {
//             margin-bottom: 15px;
//           }

//           .app-buttons {
//             flex-direction: row; /* keep same line */
//           }

//           .app-buttons img {
//             height: 40px;
//           }

//           .footer-bottom {
//             text-align: center;
//           }

//           .payment-icons {
//             margin-top: 10px;
//             text-align: center;
//           }
//         }

//         /* EXTRA SMALL DEVICES (320px) */
//         @media (max-width: 360px) {
//           .footer .container-fluid {
//             padding-left: 15px;
//             padding-right: 15px;
//           }

//           .download-text {
//             font-size: 14px;
//           }

//           .app-buttons img {
//             height: 36px;
//           }
//         }

//       `}</style>

//       <footer className="footer">
//         <div className="container-fluid">
//           <div className="row">

//             {/* About Company */}
//             <div className="col-lg-4 col-md-6 mb-4">
//               <h5>About Company</h5>
//               <p>
//                 Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
//                 Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
//               </p>

//               <div className="footsocial-icons">
//                 <i className="bi bi-whatsapp"></i>
//                 <i className="bi bi-facebook"></i>
//                 <i className="bi bi-dribbble"></i>
//                 <i className="bi bi-twitter"></i>
//                 <i className="bi bi-behance"></i>
//               </div>

//               <div className="download-wrapper">
//                 <div className="download-text">
//                   Download APP for fast and secure shopping:
//                 </div>

//                 <div className="app-buttons">
//                   <img src="/images/app-store.png" alt="App Store" />
//                   <img src="/images/google-play.png" alt="Google Play" />
//                 </div>
//               </div>
//             </div>

//             {/* Links */}
//             <div className="col-lg-2 col-md-6 mb-4">
//               <h5>Links</h5>
//               <a href="/">GreenGrocery INC</a>
//               <a href="/aboutus">About Us</a>
//               <a href="*">Company</a>
//               <a href="*">Careers</a>
//               <a href="*">Brands</a>
//             </div>

//             {/* Campaigns */}
//             <div className="col-lg-2 col-md-6 mb-4">
//               <h5>Campaigns</h5>
//               <a href="/product">Campaign of the Week</a>
//               <a href="/product">%50 Sales</a>
//               <a href="/product">Pre-Sale</a>
//               <a href="/product">Bakery</a>
//               <a href="/product">Outlet</a>
//             </div>

//             {/* Pages */}
//             <div className="col-lg-2 col-md-6 mb-4">
//               <h5>Pages</h5>
//               <a href="/order">Order Tracking</a>
//               <a href="*">Terms & Conditions</a>
//               <a href="*">Privacy Policy</a>
//               <a href="*">Tutorials</a>
//               <a href="/faqs">FAQ</a>
//             </div>

//             {/* Help */}
//             <div className="col-lg-2 col-md-6 mb-4">
//               <h5>Help</h5>
//               <a href="#"><i className="bi bi-messenger me-2"></i>Facebook Chat</a>
//               <a href="#"><i className="bi bi-whatsapp me-2"></i>Whatsapp Help</a>
//               <a href="#"><i className="bi bi-envelope me-2"></i>E-mail Support</a>
//               <a href="#"><i className="bi bi-chat-left-text me-2"></i>Contact</a>
//             </div>

//           </div>

//           <div className="footer-bottom d-flex flex-column flex-md-row justify-content-between align-items-center">
//             <div>
//               <a href="*">PRIVACY POLICY</a> |
//               <a href="*"> RETURNS POLICY</a> |
//               <a href="/faqs"> FAQ</a>
//             </div>

//             <div className="payment-icons mt-3 mt-md-0">
//               <img src="/images/footer1_img.png" alt="Payments" />
//             </div>
//           </div>

//         </div>
//       </footer>
//     </>
//   );
// }




import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <>
      <style>{`
        body {
          overflow-x: hidden;
        }

        .footer {
          background: #111;
          color: #ccc;
          padding: 60px 0 20px;
        }

        .footer .container-fluid {
          padding-left: 40px;
          padding-right: 40px;
        }

        .footer h5 {
          color: #fff;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .footer p {
          font-size: 14px;
          line-height: 1.7;
        }

        .footer a {
          color: #ccc;
          text-decoration: none;
          font-size: 14px;
          display: block;
          margin-bottom: 10px;
        }

        .footer a:hover {
          color: #fff;
        }

        /* SOCIAL ICONS */
        .footsocial-icons {
          margin-bottom: 50px;
        }

        .footsocial-icons i {
          font-size: 16px;
          background: #222;
          color: #fff;
          width: 40px;
          height: 40px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-right: 12px;
          cursor: pointer;
          transition: 0.3s;
        }

        .footsocial-icons i:hover {
          background: #6f42c1;
        }

        /* DOWNLOAD SECTION */
        .download-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          width: 120%;
          flex-wrap: wrap;
        }

        .download-text {
          color: #fff;
          font-weight: 600;
          font-size: 16px;
          flex: 1;
          max-width: 185px;
        }

        .app-buttons {
          display: flex;
          gap: 12px;
          flex-wrap: nowrap; /* 🔥 keeps buttons same line */
        }

        .app-buttons img {
          height: 48px;
          width: auto;
          max-width: 100%;
          cursor: pointer;
        }

        /* FOOTER BOTTOM */
        .footer-bottom {
          border-top: 1px solid #222;
          margin-top: 40px;
          padding-top: 20px;
          font-size: 13px;
        }

        .footer-bottom a {
          display: inline;
          margin-right: 15px;
        }

        .payment-icons img {
          height: 26px;
          width: 100%;
          margin-left: 10px;
        }

        /*  BOTTOM BAR (EXACT LIKE IMAGE) */
        .footer-bottom {
          border-top: 1px solid #222;
          margin-top: 40px;
          padding: 15px 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .footer-left a {
          display: inline-block;
          margin-right: 10px;
          font-size: 13px;
        }

        .footer-center {
          display: flex;
          gap: 20px;
        }

        .footer-center i {
          color: #ccc;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
        }

        .footer-center i:hover {
          color: #fff;
        }

        .footer-right img {
          height: 26px;
        }

        /* BOTTOM BAR (EXACT LIKE IMAGE) */
        .footer-bottom {
          border-top: 1px solid #222;
          margin-top: 40px;
          padding: 15px 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          flex-wrap: wrap;
        }

        .footer-left a {
          display: inline-block;
          margin-right: 10px;
          font-size: 13px;
        }

        .footer-center {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .footer-center i {
          color: #ccc;
          font-size: 14px;
          cursor: pointer;
          transition: 0.3s;
        }

        .footer-center i:hover {
          color: #fff;
        }

        .footer-right img {
          height: 26px;
          max-width: 100%;
          object-fit: contain;
        }

        /* TABLET */
        @media (max-width: 768px) {
          .footer-bottom {
            justify-content: center;
            text-align: center;
            padding: 15px 10px;
          }

          .footer-left,
          .footer-center,
          .footer-right {
            width: 100%;
            display: flex;
            justify-content: center;
          }

          .footer-left {
            flex-wrap: wrap;
            gap: 8px;
          }

          .footer-left a {
            margin-right: 0;
          }
        }

        /* MOBILE */
        @media (max-width: 480px) {
          .footer-bottom {
            flex-direction: column;
            gap: 12px;
            padding: 12px 8px;
          }

          .footer-left a {
            font-size: 12px;
          }

          .footer-center {
            gap: 14px;
          }

          .footer-center i {
            font-size: 13px;
          }

          .footer-right img {
            height: 22px;
          }
        }

        /* SMALL MOBILE 320px */
        @media (max-width: 320px) {
          .footer-bottom {
            margin-top: 25px;
            padding: 10px 5px;
            gap: 10px;
          }

          .footer-left {
            gap: 6px;
          }

          .footer-left a {
            font-size: 11px;
          }

          .footer-center {
            gap: 10px;
          }

          .footer-center i {
            font-size: 12px;
          }

          .footer-right img {
            height: 18px;
          }
        }

        /* TABLET */
        @media (max-width: 992px) {
          .footer .container-fluid {
            padding-left: 20px;
            padding-right: 20px;
          }
        }

        /* MOBILE */
        @media (max-width: 576px) {
          .footer {
            padding: 40px 0 20px;
          }

          .download-wrapper {
            flex-direction: column;
            align-items: flex-start;
            width: 100%;
          }

          .download-text {
            margin-bottom: 15px;
          }

          .app-buttons {
            flex-direction: row; /* keep same line */
          }

          .app-buttons img {
            height: 40px;
          }

          .footer-bottom {
            text-align: center;
          }

          .payment-icons {
            margin-top: 10px;
            text-align: center;
          }
        }

        /* EXTRA SMALL DEVICES (320px) */
        @media (max-width: 360px) {
          .footer .container-fluid {
            padding-left: 15px;
            padding-right: 15px;
          }

          .download-text {
            font-size: 14px;
          }

          .app-buttons img {
            height: 36px;
          }
        }

      `}</style>
      <footer className="footer">
        <div className="container-fluid">
          <div className="row">

            {/* About Company */}
            <div className="col-lg-4 col-md-6 mb-4">
              <h5>About Company</h5>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.
                Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante.
              </p>

              <div className="footsocial-icons">
                <i className="bi bi-whatsapp"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-dribbble"></i>
                <i className="bi bi-twitter"></i>
                <i className="bi bi-behance"></i>
              </div>

              <div className="download-wrapper">
                <div className="download-text">
                  Download APP for fast and secure shopping:
                </div>

                <div className="app-buttons">
                  <img src="/images/app-store.png" alt="App Store" />
                  <img src="/images/google-play.png" alt="Google Play" />
                </div>
              </div>
            </div>

            {/* Links */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Links</h5>
              <a href="/">GreenGrocery INC</a>
              <a href="/aboutus">About Us</a>
              <a href="*">Company</a>
              <a href="*">Careers</a>
              <a href="*">Brands</a>
            </div>

            {/* Campaigns */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Campaigns</h5>
              <a href="/product">Campaign of the Week</a>
              <a href="/product">%50 Sales</a>
              <a href="/product">Pre-Sale</a>
              <a href="/product">Bakery</a>
              <a href="/product">Outlet</a>
            </div>

            {/* Pages */}
            <div className="col-lg-2 col-md-6 mb-4">
              <h5>Pages</h5>
              <a href="/order">Order Tracking</a>
               <a href="*">Terms & Conditions</a>
               <a href="*">Privacy Policy</a>
               <a href="*">Tutorials</a>
               <a href="/faqs">FAQ</a>
             </div>

             {/* Help */}
             <div className="col-lg-2 col-md-6 mb-4">
               <h5>Help</h5>
               <a href="#"><i className="bi bi-messenger me-2"></i>Facebook Chat</a>
               <a href="#"><i className="bi bi-whatsapp me-2"></i>Whatsapp Help</a>
               <a href="#"><i className="bi bi-envelope me-2"></i>E-mail Support</a>
               <a href="#"><i className="bi bi-chat-left-text me-2"></i>Contact</a>
             </div>

           </div>

           {/*  EXACT FOOTER STRIP */}
               <div className="footer-bottom">

                 {/* LEFT */}
                 <div className="footer-left">
                   <a href="#">PRIVACY POLICY</a> |
                   <a href="#"> RETURNS POLICY</a> |
                   <a href="/faqs"> FAQ</a>
                 </div>

                 {/* CENTER ICONS */}
                 <div className="footer-center">
                   <i className="bi bi-globe"></i>
                   <i className="bi bi-twitter"></i>
                   <i className="bi bi-behance"></i>
                 </div>

                 {/* RIGHT PAYMENTS */}
                 <div className="footer-right">
                   <img src="/images/footer1_img.png" alt="payments" />
                 </div>
                </div>
         </div>
       </footer>
     </>
   );
}


 