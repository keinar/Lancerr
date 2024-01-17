import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_COUNT } from "../store/reducers/user.reducer";
import googleSvg from "../assets/imgs/google.129f8ec.svg";
import paypalSvg from "../assets/imgs/paypal.0520267.svg";
import pgSvg from "../assets/imgs/pg.a47f1ab.svg";
import netflixSvg from "../assets/imgs/netflix.e1b0070.svg";
import metaSvg from "../assets/imgs/meta.398bc1c.svg";

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
