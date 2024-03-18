import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { useParams } from 'react-router'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckIcon from '@mui/icons-material/Check';

const data = {
  basic: {
    price: "US$ " + 98.48,
    discount: "Save up to 20%",
    detailsTitle: "The Cub Package",
    detailsContent:
      "3 Logo Designs + High Quality Mockup - NO COMPLEX OR MASCOT LOGO",
  },
  standard: {
    price: "US$ " + 126.48,
    discount: "Save up to 20%",
    detailsTitle: "The Queen - Most Selling",
    detailsContent:
      "4 HQ UltraQuality Logos + AI EPS Vector Source File + 3D Mockup + VIP Support + 5 Social Media Cover",
  },
  premium: {
    price: "US$ " + 180.78,
    discount: "Save up to 20%",
    detailsTitle: "The King - Rule the Competition",
    detailsContent:
      "5 ULTIMATE Logos + AI - EPS PDF JPG PNG File + 3D Mock-up + 5 Social Media Cover + Stationery Design",
  },
};

export default function PackTabs() {

    const params = useParams()

    const gig = useSelector((storeState) => storeState.gigModule.gigs.find((gig) => gig._id == params.gigId));

    const [selectedTab,setSelectedTab] = useState("basic")
    const [expandArrow,setExpandArrow] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {

    }, [selectedTab])


    function onTabClick(selectedTab){
        console.log(gig._id);
        console.log(selectedTab);
        setSelectedTab(selectedTab)
        console.log(gig);
    }

    function onPackSelect(){
        navigate(`/payment/${params.gigId}`)
    }

    console.log(gig.packages[selectedTab].description);
    console.log(selectedTab);
    return (
        <div className='packages-tabs'>
            <div className='nav-container'>
                <input id='package-tab-1' name="package-tab-group" type='radio' checked={selectedTab=="basic"} onClick={()=>onTabClick("basic")}></input>
                <label htmlFor="package-tab-1">Basic</label>
                <input id='package-tab-2' name="package-tab-group" type='radio' onClick={()=>onTabClick("standard")}></input>
                <label htmlFor="package-tab-2">Standard</label>
                <input id='package-tab-3' name="package-tab-group" type='radio' onClick={()=>onTabClick("premium")}></input>
                <label htmlFor="package-tab-3">Premium</label>
            </div>
            <div className='package-body'>
                <div className='price-wrapper'>
                    <h3>{gig.packages[selectedTab].price} US$ </h3>
                    <svg width="16" height="16" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" fill="#404145"><g clip-path="url(#info-outline-icon_svg_a)"><path d="M6.3 4h1.4v1.4H6.3V4Zm0 2.8h1.4V11H6.3V6.8ZM7 .5c-3.864 0-7 3.136-7 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7Zm0 12.6a5.607 5.607 0 0 1-5.6-5.6c0-3.087 2.513-5.6 5.6-5.6 3.087 0 5.6 2.513 5.6 5.6 0 3.087-2.513 5.6-5.6 5.6Z"></path></g><defs><clipPath id="info-outline-icon_svg_a"><path transform="translate(0 .5)" d="M0 0h14v14H0z"></path></clipPath></defs></svg>
                </div>
                    <div className='pack-description'>
                        <h5>{gig.packages[selectedTab].header}</h5> 
                        <p>{gig.packages[selectedTab].description}</p>
                    </div>
                    <div className='delivery-wrapper'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#ffffff" stroke-width="2.656"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="24" height="24" fill="white"></rect> <circle cx="12" cy="12" r="9" stroke="#616469 " stroke-linecap="round" stroke-linejoin="round"></circle> <path d="M12 5.5V12H18" stroke="#616469 " stroke-linecap="round" stroke-linejoin="round"></path> </g></svg> 
                        <h5>{gig.packages[selectedTab].time}</h5>
                    </div>
                   
                    <button type="button" className="collapsible" onClick={() => setExpandArrow(!expandArrow)}>
                    <p>What's included</p>
                    <KeyboardArrowUpIcon />
                    </button>
                    <div className="content" style={{ display: expandArrow ? 'block' : 'none' }}>
                    {gig.packages[selectedTab].included && gig.packages[selectedTab].included.length > 0 ? (
                        <ul>
                        {gig.packages[selectedTab].included.map((included, index) => (
                            <li key={index}><CheckIcon/>{included}</li>
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
