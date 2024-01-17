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
              <span> 
              <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg> 4.9
              </span>
          </div>
        </div>

      </div>
      <div className='side-wrapper'>
        <div className='package-content'>
          <PackTabs/>
        </div>
        <div className='contact-seller'>
          <button>Contact me</button>
        </div> 
      </div>
    </div>
  )
}
