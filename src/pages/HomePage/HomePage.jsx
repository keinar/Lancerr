// import { Search, SearchIcon } from "lucide-react";
// import React from "react";
// import googleSvg from "../assets/imgs/google.129f8ec.svg";
// import metaSvg from "../assets/imgs/meta.398bc1c.svg";
// import netflixSvg from "../assets/imgs/netflix.e1b0070.svg";
// import paypalSvg from "../assets/imgs/paypal.0520267.svg";
// import pgSvg from "../assets/imgs/pg.a47f1ab.svg";

import { SearchIcon } from "lucide-react"
import Hero from "./Hero"

export function HomePage() {
  // Mock data for tags
  const allTags = ["Website Design", "Wordpress", "Logo Design", "AI Services"]

  return (
    <main className="home-page">
      <Hero allTags={allTags} />
    </main>
  )
}
