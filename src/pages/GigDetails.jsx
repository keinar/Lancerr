import React from 'react'
import ImageCarousel from '../cmps/ImageCarousel'
import logo1 from '../assets/imgs/logo1.png'
import logo2 from '../assets/imgs/logo2.png'
import logo3 from '../assets/imgs/logo3.png'
import logo4 from '../assets/imgs/logo4.png'
import profilePic from '../assets/imgs/profile_pic.png'
import PackTabs from '../cmps/PackTabs'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux/es/hooks/useSelector'

export  function GigDetails() {

  const params = useParams()

  const gig = useSelector((storeState) => storeState.gigModule.gigs.find((gig)=>gig._id==params.gigId));

  console.log(gig);
  if(!gig){
    return(
      <div>Gig not found</div>

    )
  }
    const images = [
        // logo1,
        // logo2,
        // logo3,
        // logo4
        // Add more image URLs as needed
        gig.imgUrl,
        gig.imgUrl,
        gig.imgUrl,
        gig.imgUrl
      ];

  return (
    <div className='gig-index'>
      <div className='gig-details'>
        <h1>{gig.title}</h1>
        <ImageCarousel images={images}/>
        <div className='about-this-gig'>
          <h3>
              About this gig
          </h3>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
          <p>{gig.description}</p>
        </div>
        <div className='about-the-seller'>
          <img className='profile-picture' src={gig.owner.imgUrl.startsWith("http")? gig.owner.imgUrl : profilePic} alt='profile picture' />
          <div className='seller-info-text'>
              <p>{gig.owner.fullname} </p>
              <span> 
              <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg> 
              {gig.owner.rate}
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
