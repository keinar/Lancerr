import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_COUNT } from "../store/reducers/user.reducer";
import googleSvg from "../assets/imgs/google.129f8ec.svg";
import paypalSvg from "../assets/imgs/paypal.0520267.svg";
import pgSvg from "../assets/imgs/pg.a47f1ab.svg";
import netflixSvg from "../assets/imgs/netflix.e1b0070.svg";
import metaSvg from "../assets/imgs/meta.398bc1c.svg";
import { Search } from "lucide-react";

export function HomePage() {
  // Mock data for tags
  const allTags = [
    "logo-design",
    "wordpress",
    "voice-over",
    "artistic",
    "professional",
    "accessible",
  ];

  return (
    <main className="main-container">
      <div className="hero">
        <div className="hero-content">
          <h1>
            Find the right <span>freelance</span> service, right away
          </h1>

          <form className="search-form-home">
            <input
              type="search"
              className="long-placeholder"
              placeholder="Search for any service..."
            />
            <button>
              <div className="submit-button-icon">
                <Search size={20} color="white" />
              </div>
            </button>
          </form>

          <div className="trusted-by">
            <span>Trusted by:</span>
            <ul>
              <li>
                <img src={metaSvg} alt="meta logo" />
              </li>
              <li>
                <img src={googleSvg} alt="google logo" />
              </li>
              <li>
                <img src={netflixSvg} alt="netflix logo" />
              </li>
              <li>
                <img src={pgSvg} alt="pg logo" />
              </li>
              <li>
                <img src={paypalSvg} alt="paypal logo" />
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="categories-blocks">
        <div className="category-block">
          <p>Graphics & Design</p>
        </div>
        <div className="category-block">
          <p>AI Services</p>
        </div>
        <div className="category-block">
          <p>Digital Marketing</p>
        </div>
        <div className="category-block">
          <p>Writing & Translation</p>
        </div>
        <div className="category-block">
          <p>Video & Animation</p>
        </div>
        <div className="category-block">
          <p>Music & Audio</p>
        </div>
        <div className="category-block">
          <p>Programming & Tech</p>
        </div>
        <div className="category-block">
          <p>Business</p>
        </div>
        <div className="category-block">
          <p>Data</p>
        </div>
      </div>

      <h2>Popular services</h2>
    </main>
  );
}

//     <section className="main-container">
//       <h2>Popular services</h2>

//       <ul>
//         {allTags.map((tag, index) => (
//           <li key={index}>
//             <button onClick={() => navigateToGigsPage(tag)}>{tag}</button>
//           </li>
//         ))}
//       </ul>
//     </section>
