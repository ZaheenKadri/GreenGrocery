// import React from "react";
// import { useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function NotFound() {
//   const navigate = useNavigate();

//   const handleHome = () => {
//     Swal.fire({
//       icon: "info",
//       title: "Redirecting...",
//       text: "Taking you back to the Home Page",
//       confirmButtonColor: "#6f42c1",
//       timer: 1500,
//       showConfirmButton: false
//     });

//     setTimeout(() => {
//       navigate("/");
//     }, 1500);
//   };

//   return (
//     <>
//       <div className="notfound-wrapper">

//         {/* Header */}
//         <div className="notfound-header text-center">
//           <h2>Page Not Found</h2>
//           <p>
//             <span>Home</span> • <span>404 Not Found</span>
//           </p>
//         </div>

//         {/* Content */}
//         <div className="container text-center notfound-container">
//           <h1 className="error-code">404</h1>

//           <p className="error-text">
//             Sorry, but the page you are looking for does not exist or has been removed!
//           </p>

//           <button
//             className="btn btn-dark home-btn"
//             onClick={handleHome}
//           >
//             Go To Home Page
//           </button>
//         </div>

//       </div>

//       {/* CSS inside same file */}
//       <style>{`

//         .notfound-wrapper{
//           min-height:100vh;
//           display:flex;
//           flex-direction:column;
//         }

//         .notfound-header{
//           background:#C0F0DC;
//           padding:80px 10px;
//         }

//         .notfound-header h2{
//           font-weight:600;
//         }

//         .notfound-header p{
//           margin-top:5px;
//           font-size:14px;
//           color:#333;
//         }

//         .notfound-container{
//           flex:1;
//           display:flex;
//           flex-direction:column;
//           justify-content:center;
//           align-items:center;
//           padding:20px;
//         }

//         .error-code{
//           font-size:150px;
//           font-weight:700;
//           color:#6f5cc2;
//         }

//         .error-text {
//             margin-top: 10px;
//             font-size: 17px;
//             max-width: 615px;
//             font-weight: 600;
//         }

//         .home-btn{
//           margin-top:25px;
//           padding:10px 25px;
//           border-radius:30px;
//           transition:0.3s;
//         }

//         .home-btn:hover{
//           transform:scale(1.05);
//         }

//         /* Tablet */
//         @media (max-width:768px){
//           .error-code{
//             font-size:90px;
//           }

//           .error-text{
//             font-size:16px;
//           }
//         }

//         /* Mobile */
//         @media (max-width:480px){
//           .error-code{
//             font-size:70px;
//           }

//           .error-text{
//             font-size:14px;
//           }
//         }

//         /* Small devices */
//         @media (max-width:320px){
//           .error-code{
//             font-size:55px;
//           }

//           .error-text{
//             font-size:13px;
//           }

//           .home-btn{
//             padding:8px 20px;
//             font-size:14px;
//           }
//         }

//       `}</style>
//     </>
//   );
// }

import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import Subscribe from "../Components/Subscribe";

export default function NotFound() {
  const navigate = useNavigate();

  const handleHome = () => {
    Swal.fire({
      icon: "info",
      title: "Redirecting...",
      text: "Taking you back to the Home Page",
      confirmButtonColor: "#6f42c1",
      timer: 1500,
      showConfirmButton: false
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <>
      <div className="notfound-wrapper">

        {/* Header */}
        <div className="notfound-header text-center">
          <h2>Page Not Found</h2>
          <p>
            <span>Home</span> • <span>404 Not Found</span>
          </p>
        </div>

        {/* Content */}
        <div className="container text-center notfound-container">
          <h1 className="error-code">404</h1>

          <p className="error-text">
            Sorry, but the page you are looking for does not exist or has been removed!
          </p>

          <button
            className="btn btn-dark home-btn"
            onClick={handleHome}
          >
            Go To Home Page
          </button>
        </div>

      </div>
      < Subscribe />
      {/* CSS inside same file */}
      <style>{`

        .notfound-wrapper{
          min-height:100vh;
          display:flex;
          flex-direction:column;
        }

        .notfound-header{
          background:#C0F0DC;
          padding:80px 10px;
        }

        .notfound-header h2{
          font-weight:600;
        }

        .notfound-header p{
          margin-top:5px;
          font-size:14px;
          color:#333;
        }

        .notfound-container{
          flex:1;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          padding:20px;
        }

        .error-code{
          font-size:150px;
          font-weight:700;
          color:#6f5cc2;
        }

        .error-text {
            margin-top: 10px;
            font-size: 17px;
            max-width: 615px;
            font-weight: 600;
        }

        .home-btn{
          margin-top:25px;
          padding:10px 25px;
          border-radius:30px;
          transition:0.3s;
        }

        .home-btn:hover{
          transform:scale(1.05);
        }

        /* Tablet */
        @media (max-width:768px){
          .error-code{
            font-size:90px;
          }

          .error-text{
            font-size:16px;
          }
        }

        /* Mobile */
        @media (max-width:480px){
          .error-code{
            font-size:70px;
          }

          .error-text{
            font-size:14px;
          }
        }

        /* Small devices */
        @media (max-width:320px){
          .error-code{
            font-size:55px;
          }

          .error-text{
            font-size:13px;
          }

          .home-btn{
            padding:8px 20px;
            font-size:14px;
          }
        }

      `}</style>
    </>
  );
}