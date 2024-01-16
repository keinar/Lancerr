import React from 'react'
import ImageCarousel from '../cmps/ImageCarousel'
import logo1 from '../assets/imgs/logo1.png'
import logo2 from '../assets/imgs/logo2.png'
import logo3 from '../assets/imgs/logo3.png'
import logo4 from '../assets/imgs/logo4.png'
import profilePic from '../assets/imgs/profile_pic.png'
import PackTabs from '../cmps/PackTabs'


export default function GigDetails() {

    const images = [
        logo1,
        logo2,
        logo3,
        logo4
        // Add more image URLs as needed
      ];

  return (
    <div className='gig-index'>
      <div className='gig-details'>
        <h1>I will create minimalist logo design for your business</h1>
        <ImageCarousel images={images}/>
        <div className='about-this-gig'>
          <h3>
              About this gig
          </h3>
          <p>
          "Creating beautiful brand face, one at a time"

              We Perfectionist is a highly talented and dedicated team, focused on providing unique logo design absolutely from scratch. A Logo design is the face of your brand which is as equally important as the success of your business and we make sure to dig into the pillars of your success in depth.

              Nothing Beats the Experience! Check out my live portfolio, Client's feedback and be assured
              Portfolio: https://flic.kr/s/aHskHuJvwS

              Kindly select STANDARD or PREMIUM pack for the best results similar to my portfolio.

              Reasons that make our gig unique!
              Original, highly creative and conceptual design that clearly depicts the brand's message
              Swift, Reliable and Premium support
              Unlimited Revisions(until you are satisfied)
              Team of award-winning designers
              All types of vector source files-AI EPS PDF PNG JPEG

              Minimal Logo | Modern | Professional | Flat | Luxury | Text | Vintage | Badge | Feminine | Signature | Custom Logo Design

              Hearing from you would be an absolute pleasure, Go ahead and ORDER NOW!

              Note: On Sunday, I do take a break to enjoy with friends, and family, and a cup of coffee!
              I DO NOT DESIGN CARTOON/MASCOT LOGOS
          </p>
        </div>
        <div className='about-the-seller'>
          <img className='profile-picture' src={profilePic} alt='profile picture' />
          <div className='seller-info-text'>
              <p> Seller Name </p>
              <p> Catchy Catch Phrase</p>
              <span> * 4.9 </span>
          </div>
        </div>

      </div>
      <div className='package-content'>
        <PackTabs/>
      </div>
        
    </div>
  )
}
