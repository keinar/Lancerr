// import { Search, SearchIcon } from "lucide-react";
// import React from "react";
// import googleSvg from "../assets/imgs/google.129f8ec.svg";
// import metaSvg from "../assets/imgs/meta.398bc1c.svg";
// import netflixSvg from "../assets/imgs/netflix.e1b0070.svg";
// import paypalSvg from "../assets/imgs/paypal.0520267.svg";
// import pgSvg from "../assets/imgs/pg.a47f1ab.svg";

import Hero from "./Hero";

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
    <main className="home-page">
      <Hero />
    </main>

    // <main className="full main-container">
    //   <div className="home-page">
    //     <div className="hp-hero">
    //       <div className="hp-hero-content">
    //         <h1>
    //           Find the right <i>freelance</i> service, right away
    //         </h1>
    //         <div className="hp-hero-search-bar">
    //           <form className="hp-search-form">
    //             <input type="search" placeholder="Search for any service..." />
    //             <button className="inside-button">
    //               <SearchIcon size={16} color="white" />
    //             </button>
    //           </form>
    //         </div>
    //       </div>
    //       <div className="hp-hero-trusted"></div>
    //     </div>
    //   </div>
    // </main>
  );
}
