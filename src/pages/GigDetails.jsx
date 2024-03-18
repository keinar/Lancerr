import React from 'react'
import ImageCarousel from '../cmps/ImageCarousel'
import profilePic from '../assets/imgs/profile_pic.png'
import PackTabs from '../cmps/PackTabs'
import { useParams } from 'react-router'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { DynamicModal } from '../cmps/DynamicModal'
import { userService } from '../services/user.service'
import { useEffect, useState } from 'react'
import { Star } from 'lucide-react'

export function GigDetails() {  

  const params = useParams()

  const gig = useSelector((storeState) => storeState.gigModule.gigs.find((gig) => gig._id == params.gigId));
  console.log("gig:" + gig);
  console.log(gig);
  if (!gig) {
    return (
      <div>Gig not found</div>
    )
  }

  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await userService.getById(gig.owner._id);
      setUser(fetchedUser);
    }
    fetchUser();
  }, [gig.owner._id]);

  

  async function loadUser(){
    const user = await userService.getById(gig.owner._id)
    return user
  }

  console.log("user is : " + user);


  var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
  const images = [
    gig.imgUrl,
    gig.imgUrl,
    gig.imgUrl,
    gig.imgUrl
  ];

  return (
    <div className='gig-index'>
      <div className='gig-details'>
        <div className='details-header'>
          <h1>{gig.title}</h1>
          <div className='about-the-seller'>
            <img className='profile-picture' src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt='profile picture' />
            <div className='seller-info-text'>
              <p>{gig.owner.fullname} </p>
              <span>
                {/* <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg> */}
                <Star fill='black'/>
                {gig.owner.rate}
              </span>
            </div>
          </div>
        </div>
        <ImageCarousel images={images} />
        <div className='about-this-gig'>
          <div className='small-side'>
            <div className='side-wrapper'>
              <div className='package-content'>
                <PackTabs/>
              </div>
              <div className='contact-seller'>
                <button>Contact me</button>
              </div>
            </div>
          </div>
          <h2>
            About this gig
          </h2>
          <div className='gig-description'>
            <p>{gig.description}</p>
            <h2>Services:</h2>
            <ul>
              {gig.services && gig.services.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
            <p>
              <strong>
              Please contact us with your requirements before placing the order to avoid cancellation. If you are clear about your requirement, Place your order now.
              </strong>
            </p>
          </div>
        </div>
        <div className='seller-wrapper'>
          <div className='about-the-seller-big'>
            <span>About the seller</span>
            <div className='profile-wrapper'>
              <img className='profile-picture' src={gig.owner.imgUrl.startsWith("http") ? gig.owner.imgUrl : profilePic} alt='profile picture' />
              <div className='seller-info-text'>
                <p>{gig.owner.fullname} </p>
                <span>
                  <svg width="16" height="15" viewBox="0 0 16 15" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 5.81285C16 5.98299 15.875 6.14367 15.75 6.26654L12.2596 9.61248L13.0865 14.3384C13.0962 14.4045 13.0962 14.4612 13.0962 14.5274C13.0962 14.7732 12.9808 15 12.7019 15C12.5673 15 12.4327 14.9527 12.3173 14.8866L8 12.656L3.68269 14.8866C3.55769 14.9527 3.43269 15 3.29808 15C3.01923 15 2.89423 14.7732 2.89423 14.5274C2.89423 14.4612 2.90385 14.4045 2.91346 14.3384L3.74038 9.61248L0.240385 6.26654C0.125 6.14367 0 5.98299 0 5.81285C0 5.5293 0.298077 5.41588 0.538462 5.37807L5.36539 4.68809L7.52885 0.387524C7.61539 0.207939 7.77885 0 8 0C8.22115 0 8.38462 0.207939 8.47115 0.387524L10.6346 4.68809L15.4615 5.37807C15.6923 5.41588 16 5.5293 16 5.81285Z"></path></svg>
                  {gig.owner.rate}
                </span>
              </div>

            </div>
          </div>
            <div className='user-description'>
              {user&&(
                <div>
                  <ul className='user-stats'>
                <div>
                  <li>
                    From <br />
                    <strong>
                      China
                    </strong>
                  </li>
                  <li>
                    Avg. response time <br />
                    <strong>
                      1 hour
                    </strong>
                  </li>
                  <li>
                    Languages <br />
                    <strong>
                      Chinese, English
                    </strong>
                  </li>
                </div>
                <div>
                  <li>
                    Member since <br />
                    <strong>
                      Dec 2021
                    </strong>
                  </li>
                  <li>
                    Last delivery <br />
                    <strong>
                      about 45 minutes
                    </strong>
                  </li>
                </div>
              </ul>
              <div className='user-story'>
                <p>
                  {user.userStory}
                </p>
              </div>
                </div>
              )}
              
          </div>
        </div>

      </div>
      <div className='big-side'>
        <div className='side-wrapper'>
          <div className='package-content'>
            <PackTabs />
            <DynamicModal/>
          </div>
          <div className='contact-seller'>
            <button>Contact me</button>
          </div>
        </div>
      </div>
    </div>
  )
}
