import React from "react"
import ImageCarousel from "../cmps/ImageCarousel"
import profilePic from "../assets/imgs/profile_pic.png"
import PackTabs from "../cmps/PackTabs"
import { useParams } from "react-router"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { DynamicModal } from "../cmps/DynamicModal"
import { userService } from "../services/user.service"
import { useEffect, useState } from "react"
import { Star } from "lucide-react"
import Breadcrumbs from "../cmps/Breadcrumbs"
import { getFlagImage } from "../cmps/flags.jsx";


export function GigDetails() {
  const params = useParams()
  const filterBy = useSelector(storeState => storeState.gigModule.filterBy)

  const gig = useSelector(storeState => storeState.gigModule.gigs.find(gig => gig._id == params.gigId))
  if (!gig) {
    return <div>Gig not found</div>
  }

  const [user, setUser] = useState(null)

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

  function randomColor() {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  return (
    <div className="gig-index">
      <div className="gig-details">
        <div className="details-header">
          <Breadcrumbs filterBy={filterBy} />
          <h1>{gig.title}</h1>
          <div className="about-the-seller">
            <img className="profile-picture" src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt="profile picture" />
            <div className="seller-info-text">
              <p onClick={() => scrollToAnchor("about-the-seller")}>{gig.owner.fullname}</p>
              <span>
                <Star fill="black" />
                {gig.owner.rate}
              </span>
            </div>
          </div>
        </div>
        <ImageCarousel images={images} />
        <div className="about-this-gig">
          <div className="small-side">
            <div className="side-wrapper">
              <div className="package-content">
                <PackTabs />
              </div>
              <div className="contact-seller">
                <button>Contact me</button>
              </div>
            </div>
          </div>
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
        <div className="seller-wrapper" id="about-the-seller">
          <div className="about-the-seller-big">
            <span>About the seller</span>
            <div className="profile-wrapper">
              <img className="profile-picture" src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt="profile picture" />
              <div className="seller-info-text">
                <p>{gig.owner.fullname} </p>
                <span>
                  <Star fill="black" size={16} />
                  {gig.owner.rate}
                </span>
              </div>
            </div>
          </div>
          <div className="user-description">
            {user && (
              <div>
                <ul className="user-stats">
                  <div>
                    <li>
                      From <br />
                      <strong>{gig.owner.country}</strong>
                    </li>
                    <li>
                      Avg. response time <br />
                      <strong>{gig.owner.responseTime}</strong>
                    </li>
                    <li>
                      Languages <br />
                      <strong>{gig.owner.languages}</strong>
                    </li>
                  </div>
                  <div>
                    <li>
                      Member since <br />
                      <strong>{gig.owner.joined}</strong>
                    </li>
                    <li>
                      Last delivery <br />
                      <strong>{gig.owner.lastDelivery}</strong>
                    </li>
                  </div>
                </ul>
                <div className="user-story">
                  <p>{user.userStory}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="reviews">
          <ul>
            {gig.reviews &&
              gig.reviews.map((review, index) => (
                <li key={index}>
                  <div className="review-img-wrapper" style={{ backgroundColor: randomColor() }}>
                    <p>{review.name[0].toUpperCase()}</p>
                  </div>
                  <div>
                    <div className="review-header">
                      <p>{review.name}</p>
                      <span>
                        <img className="country-flag" src={getFlagImage(review.country)} alt={`${review.country} flag`} />
                        {review.country}
                      </span>                    </div>
                    <p>{review.review}</p>
                    <p>{review.reviewedAt}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="big-side">
        <div className="side-wrapper">
          <div className="package-content">
            <PackTabs />
            <DynamicModal />
          </div>
          <div className="contact-seller">
            <button>Contact me</button>
          </div>
        </div>
      </div>
    </div>
  )
}
