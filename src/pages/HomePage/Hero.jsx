import { SearchIcon } from "lucide-react"
import React, { useEffect, useState } from "react"

export default function Hero(allTags) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      const divs = document.querySelectorAll(".hero-background")
      divs.forEach((div, index) => {
        if (index === currentIndex) {
          div.style.opacity = 1
        } else {
          div.style.opacity = 0
        }
      })

      setCurrentIndex(prevIndex => (prevIndex + 1) % divs.length)
    }, 5000)

    return () => clearInterval(intervalId)
  }, [currentIndex])

  return (
    <section className="hero">
      <div className="hero-backgrounds">
        <div className="hero max-width-container">
          <div className="hp-hero-content">
            <h1>
              <strong>Find the right</strong> <i>freelance</i> <br />
              <strong> service, right away</strong>
            </h1>
            <div className="hp-hero-search-bar">
              <form className="hp-search-form">
                <input type="search" placeholder="Search for any service..." />
                <button className="inside-button">
                  <SearchIcon size={16} color="white" />
                </button>
              </form>
              <div className="popular-tags">
                <p>Popular:</p>
                {allTags.allTags.map(tag => (
                  <button key={tag}>{tag}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="hp-hero-trusted"></div>
        </div>
        <div className="hero-background hero-jenny" style={{ opacity: 1 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499430/jenny-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@Jenny</div>
              <div>
                <b>Children's Voice Over</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-colin" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499432/colin-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@colinstark</div>
              <div>
                <b>Creative Director</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-scarlett" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499428/scarlett-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">Scarlett</div>
              <div>
                <b>Business Founder</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-jordan" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499439/jordan-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">@jordanruncie_</div>
              <div>
                <b>Production Assistant</b>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-background hero-christina" style={{ opacity: 0 }}>
          <div className="blured-box">
            <div className="worker-image">
              <img src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_40,dpr_1.0/v1/attachments/generic_asset/asset/7539ee9d7a6ab02e3d23069ebefb32c8-1690386499422/christina-2x.png" />
            </div>
            <div className="worker-details">
              <div className="name">Christina</div>
              <div>
                <b>Jewelry Shop Owner</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
