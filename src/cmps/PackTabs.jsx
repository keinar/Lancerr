import React,{useState} from 'react'

const data = {
    basic:{price:98.48,discount:"Save up to 20%",detailsTitle:"The Cub Package", detailsContent:"3 Logo Designs + High Quality Mockup - NO COMPLEX OR MASCOT LOGO"},
    standard:{price:126.48,discount:"Save up to 20%",detailsTitle:"The Cub Package", detailsContent:"3 Logo Designs + High Quality Mockup - NO COMPLEX OR MASCOT LOGO"},
    premium:{price:180.78,discount:"Save up to 20%",detailsTitle:"The Cub Package", detailsContent:"3 Logo Designs + High Quality Mockup - NO COMPLEX OR MASCOT LOGO"}
}

export default function PackTabs() {
    const [selectedTab,setSelectedTab] = useState("basic")

    function onTabClick(selectedTab){
        setSelectedTab(selectedTab)
    }
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
            <div className='package-content'>
                <div className='price-wrapper'>
                    <h3>{data[selectedTab].price}</h3>
                    <svg width="16" height="16" viewBox="0 0 14 15" xmlns="http://www.w3.org/2000/svg" fill="#404145"><g clip-path="url(#info-outline-icon_svg_a)"><path d="M6.3 4h1.4v1.4H6.3V4Zm0 2.8h1.4V11H6.3V6.8ZM7 .5c-3.864 0-7 3.136-7 7s3.136 7 7 7 7-3.136 7-7-3.136-7-7-7Zm0 12.6a5.607 5.607 0 0 1-5.6-5.6c0-3.087 2.513-5.6 5.6-5.6 3.087 0 5.6 2.513 5.6 5.6 0 3.087-2.513 5.6-5.6 5.6Z"></path></g><defs><clipPath id="info-outline-icon_svg_a"><path transform="translate(0 .5)" d="M0 0h14v14H0z"></path></clipPath></defs></svg>
                </div>
            </div>
        </div>
    )
}
