import React from "react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import AIArtists from "../../assets/imgs/ai-artists-2x.webp"
import LogoDesign from "../../assets/imgs/logo-design-2x.webp"
import DataEntry from "../../assets/imgs/data-entry-2x.webp"
import Wordpress from "../../assets/imgs/wordpress-2x.webp"
import VoiceOver from "../../assets/imgs/voice-over-2x.webp"
import AnimatedExp from "../../assets/imgs/animated-explainer-2x.webp"
import SocialMedia from "../../assets/imgs/social-2x.webp"
import SEO from "../../assets/imgs/seo-2x.webp"
import Illustration from "../../assets/imgs/illustration-2x.webp"
import Translation from "../../assets/imgs/translation-2x.webp"
import BookCovers from "../../assets/imgs/book-covers-2x.webp"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function PopularServicesCarousel() {
  // Custom Next Arrow
  function SampleNextArrow(props) {
    const { className, style, onClick } = props
    return (
      <div className={className} style={{ ...style, display: "block", color: "black", right: 10 }} onClick={onClick}>
        <div className="custom-arrow">
          <ChevronRight size={24} />
        </div>
      </div>
    )
  }

  // Custom Previous Arrow
  function SamplePrevArrow(props) {
    const { className, style, onClick } = props
    return (
      <div className={className} style={{ ...style, display: "block", color: "black", left: -20 }} onClick={onClick}>
        <div className="custom-arrow">
          <ChevronLeft size={24} />
        </div>
      </div>
    )
  }

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div className="slider-item">
          <h4>
            <small>Add talent to AI</small>AI Artists
          </h4>
          <picture>
            <source srcSet={AIArtists} type="image/webp" />
            <img src={AIArtists} alt="AI Artists" />
          </picture>
        </div>
        <div className="slider-item">
          <img src={LogoDesign} alt="Logo Design" />
        </div>
        <div className="slider-item">
          <img src={Wordpress} alt="Wordpress" />
        </div>
        <div className="slider-item">
          <img src={VoiceOver} alt="Voice Over" />
        </div>
        <div className="slider-item">
          <img src={AnimatedExp} alt="Animated Explainer" />
        </div>
        <div className="slider-item">
          <img src={SocialMedia} alt="Social Media" />
        </div>
        <div className="slider-item">
          <img src={SEO} alt="SEO" />
        </div>
        <div className="slider-item">
          <img src={Illustration} alt="Illustration" />
        </div>
        <div className="slider-item">
          <img src={Translation} alt="Translation" />
        </div>
        <div className="slider-item">
          <img src={DataEntry} alt="Data Entry" />
        </div>
        <div className="slider-item">
          <img src={BookCovers} alt="Book Covers" />
        </div>
      </Slider>
    </div>
  )
}
