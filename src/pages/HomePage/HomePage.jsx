import { Search, SearchIcon } from "lucide-react"
import React from "react"

import Hero from "./Hero"
import TrustedBy from "./TrustedBy"
import PopularServicesCarousel from "./PopularServicesCarousel"

export function HomePage() {
  // Mock data for tags
  const allTags = [
    { description: "Website Design", href: "/explore?tags=website-design" },
    { description: "Wordpress", href: "/explore?tags=wordpress" },
    { description: "Logo Design", href: "/explore?tags=logo-design" },
    { description: "AI Services", href: "/explore?tags=ai-services" },
  ]

  return (
    <main className="home-page">
      <Hero allTags={allTags } />
      <TrustedBy />
      <div className="popular-services">
        <h2>Popular Services</h2>
        <PopularServicesCarousel />
      </div>
    </main>
  )
}
