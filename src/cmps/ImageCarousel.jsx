import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ImageCarousel({ images }) {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);

  const settings1 = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesPerRow: 1,
    slidesToScroll: 1,
    asNavFor: nav2,
  };

  const settings2 = {
    asNavFor: nav1,
    slidesToShow: 3,
    focusOnSelect: true,
  };

  return (
    <div className='carousel-container'>
      <Slider
        {...settings1}
        ref={(slider) => setNav1(slider)}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img src={image} className='selected-image' alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div>
        <Slider
          {...settings2}
          ref={(slider) => setNav2(slider)}
        >
          {images.map((image, index) => (
            <div key={index}>
              <img src={image} className='image-menu'  alt={`Slide ${index + 1}`} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
