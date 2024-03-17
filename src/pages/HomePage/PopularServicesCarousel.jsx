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
    slidesToShow: 5,
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
          <h4>
            <small>Build your brand</small>Logo Design
          </h4>
          <picture>
            <source srcSet={LogoDesign} type="image/webp" />
            <img src={LogoDesign} alt="Logo Design" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Customize your site</small>WordPress
          </h4>
          <picture>
            <source srcSet={Wordpress} type="image/webp" />
            <img src={Wordpress} alt="WordPress" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Share your message</small>Voice Over
          </h4>
          <picture>
            <source srcSet={VoiceOver} type="image/webp" />
            <img src={VoiceOver} alt="Voice Over" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Engage your audience</small>Video Explainer
          </h4>
          <picture>
            <source srcSet={AnimatedExp} type="image/webp" />
            <img src={AnimatedExp} alt="Animated Explainer" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Reach more customers</small>Social Media
          </h4>
          <picture>
            <source srcSet={SocialMedia} type="image/webp" />
            <img src={SocialMedia} alt="Social Media" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Unlock growth online</small>SEO
          </h4>
          <picture>
            <source srcSet={SEO} type="image/webp" />
            <img src={SEO} alt="SEO" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Color your dreams</small>Illustration
          </h4>
          <picture>
            <source srcSet={Illustration} type="image/webp" />
            <img src={Illustration} alt="Illustration" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Go global</small>Translation
          </h4>
          <picture>
            <source srcSet={Translation} type="image/webp" />
            <img src={Translation} alt="Translation" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Learn your business</small>Data Entry
          </h4>
          <picture>
            <source srcSet={DataEntry} type="image/webp" />
            <img src={DataEntry} alt="Data Entry" />
          </picture>
        </div>
        <div className="slider-item">
          <h4>
            <small>Showcase your story</small>Book Covers
          </h4>
          <picture>
            <source srcSet={BookCovers} type="image/webp" />
            <img src={BookCovers} alt="Book Covers" />
          </picture>
        </div>
      </Slider>
    </div>
  )
}
