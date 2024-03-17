import { Search, SearchIcon } from "lucide-react"
import React from "react"

import Hero from "./Hero"
import TrustedBy from "./TrustedBy"
import PopularServicesCarousel from "./PopularServicesCarousel"

export function HomePage() {
  return (
    <main className="home-page">
      <Hero />
      <TrustedBy />
      <div className="popular-services">
        <h2>Popular Services</h2>
        <PopularServicesCarousel />
      </div>
    </main>
  )
}
