import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux/es/hooks/useSelector"
import { useParams } from "react-router"
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp"
import CheckIcon from "@mui/icons-material/Check"
import { ChevronDown, Info } from "lucide-react"

const data = {
  basic: {
    price: "US$ " + 98.48,
    discount: "Save up to 20%",
    detailsTitle: "The Cub Package",
    detailsContent: "3 Logo Designs + High Quality Mockup - NO COMPLEX OR MASCOT LOGO",
  },
  standard: {
    price: "US$ " + 126.48,
    discount: "Save up to 20%",
    detailsTitle: "The Queen - Most Selling",
    detailsContent: "4 HQ UltraQuality Logos + AI EPS Vector Source File + 3D Mockup + VIP Support + 5 Social Media Cover",
  },
  premium: {
    price: "US$ " + 180.78,
    discount: "Save up to 20%",
    detailsTitle: "The King - Rule the Competition",
    detailsContent: "5 ULTIMATE Logos + AI - EPS PDF JPG PNG File + 3D Mock-up + 5 Social Media Cover + Stationery Design",
  },
}

export default function PackTabs() {
  const params = useParams()

  const gig = useSelector(storeState => storeState.gigModule.gigs.find(gig => gig._id == params.gigId))

  const [selectedTab, setSelectedTab] = useState("basic")
  const [expandArrow, setExpandArrow] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {}, [selectedTab])

  function onTabClick(selectedTab) {
    console.log(gig._id)
    console.log(selectedTab)
    setSelectedTab(selectedTab)
    console.log(gig)
  }

  function onPackSelect() {
    navigate(`/payment/${params.gigId}`)
  }

  console.log(gig.packages[selectedTab].description)
  console.log(selectedTab)
  return (
    <div className="packages-tabs">
      <div className="nav-container">
        <button onClick={() => onTabClick("basic")} className={selectedTab === "basic" ? "active" : ""}>
          Basic
        </button>
        <button onClick={() => onTabClick("standard")} className={selectedTab === "standard" ? "active" : ""}>
          Standard
        </button>
        <button onClick={() => onTabClick("premium")} className={selectedTab === "premium" ? "active" : ""}>
          Premium
        </button>
      </div>
      <div className="nav-container"></div>
      <div className="package-body">
        <div className="package-header">
          <h5>{gig.packages[selectedTab].header}</h5>
          <div className="price-wrapper">
            <h3>{gig.packages[selectedTab].price} US$ </h3>
            <Info size={16} />
          </div>
        </div>

        <div className="pack-description">
          <p>{gig.packages[selectedTab].description}</p>
        </div>
        <div className="delivery-wrapper">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="2.656">
            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <rect width="24" height="24" fill="white"></rect> <circle cx="12" cy="12" r="9" stroke="#616469 " stroke-linecap="round" stroke-linejoin="round"></circle>{" "}
              <path d="M12 5.5V12H18" stroke="#616469 " stroke-linecap="round" stroke-linejoin="round"></path>{" "}
            </g>
          </svg>
          <h5>{gig.packages[selectedTab].time}</h5>
        </div>

        <button type="button" className="collapsible" onClick={() => setExpandArrow(!expandArrow)}>
          <p className="included">What's included</p>
          <ChevronDown color="#74767e" size="20" className={expandArrow ? "expanded" : "collapsed"} />
        </button>
        <div className="content" style={{ display: expandArrow ? "block" : "none" }}>
          {gig.packages[selectedTab].included && gig.packages[selectedTab].included.length > 0 ? (
            <ul>
              {gig.packages[selectedTab].included.map((included, index) => (
                <li key={index}>
                  <CheckIcon fontSize="small" />
                  {included}
                </li>
              ))}
            </ul>
          ) : (
            <p>No items included in this package.</p>
          )}
        </div>

        <button onClick={onPackSelect}>Continue</button>
      </div>
    </div>
  )
}
