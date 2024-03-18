import { Search, SearchIcon } from "lucide-react"
import React, { useEffect } from "react"

import Hero from "./Hero"
import TrustedBy from "./TrustedBy"
import PopularServicesCarousel from "./PopularServicesCarousel"
import {  setFilterBy } from "../../store/actions/gig.actions.js"

export function HomePage() {

  useEffect(()=>{
        setFilterBy([])
  }, [])
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
