import { Star } from "lucide-react"
import React from "react"

export default function AboutSellerTop({ gig }) {
  return (
    <div className="about-the-seller-top">
      <img className="profile-picture" src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt="profile picture" />
      <div className="seller-info-text">
        <p onClick={() => scrollToAnchor("about-the-seller")}>{gig.owner.fullname}</p>
        <span>
          <Star fill="black" />
          {gig.owner.rate}
        </span>
      </div>
    </div>
  )
}
