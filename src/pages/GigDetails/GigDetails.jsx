import React from "react"
import ImageCarousel from "../../cmps/ImageCarousel.jsx"
import PackTabs from "../../cmps/PackTabs.jsx"
import { useParams } from "react-router"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { DynamicModal } from "../../cmps/DynamicModal.jsx"
import { userService } from "../../services/user.service.js"
import { useEffect, useState } from "react"
import Breadcrumbs from "../../cmps/Breadcrumbs.jsx"
import GigReviews from "./GigReviews.jsx"
import AboutSeller from "./AboutSeller.jsx"
import AboutSellerTop from "./AboutSellerTop.jsx"

export function GigDetails() {
  const params = useParams()
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)
  const gig = useSelector(storeState => storeState.gigModule.gigs.find(gig => gig._id == params.gigId))
  const [isSticky, setIsSticky] = useState(false)

  if (!gig) {
    return <div>Gig not found</div>
  }

  const [user, setUser] = useState(null)

  useEffect(() => {
    const handleScroll = () => {
      const sideWrapper = document.querySelector(".side-wrapper")
      const top = sideWrapper.getBoundingClientRect().top
      setIsSticky(top <= 0)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await userService.getById(gig.owner._id)
      setUser(fetchedUser)
    }
    fetchUser()
  }, [gig.owner._id])

  const images = [gig.imgUrl, gig.imgUrl, gig.imgUrl, gig.imgUrl]

  function scrollToAnchor(id) {
    const element = document.getElementById(id)
    element.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="gig-index">
      <div className="gig-details">
        <div className="details-header">
          <Breadcrumbs filterBy={filterBy} />
          <h1>{gig.title}</h1>
          <AboutSellerTop gig={gig} />
        </div>
        <ImageCarousel images={images} />
        <div className="about-this-gig">
          <h2>About this gig</h2>
          <div className="gig-description">
            <p>{gig.description}</p>
            <h2>Services:</h2>
            <ul>{gig.services && gig.services.map((service, index) => <li key={index}>{service}</li>)}</ul>
            <p>
              <strong>Please contact us with your requirements before placing the order to avoid cancellation. If you are clear about your requirement, Place your order now.</strong>
            </p>
          </div>
        </div>
        <AboutSeller user={user} gig={gig} />
        <h3>Reviews</h3>
        <GigReviews reviews={gig.reviews} />
      </div>
      <div className={`big-side ${isSticky ? "sticky" : ""}`}>
        <div className="side-wrapper">
          <div className="package-content">
            <PackTabs />
          </div>
          <div className="contact-seller">
            <button>Contact me</button>
          </div>
        </div>
      </div>
    </div>
  )
}