import { useEffect, useState } from "react"
import { setFilterBy } from "../store/actions/gig.actions.js"
import {store} from "../store/store.js"
import { useNavigate } from "react-router"

export function GigFilter() {

    // const [filterByToEdit, setFilterByToEdit] = useState()
    
    const filterBy = store.getState().gigModule.filterBy  
    const navigate = useNavigate()
    

    // useEffect(() => {
    //     onSetFilter(filterByToEdit)
    // }, [filterByToEdit])
     useEffect(() => {
        
        
     },[])

    function handleTagClick(tag) {
        
        
        // Create a new filter with the clicked tag
        const updatedFilter = {
            // ...filterByToEdit,
            tags: [tag], // Replace the existing tags with the clicked tag
        }
        const fieldsToUpdate = { ...filterBy, ...updatedFilter }
        setFilterBy(fieldsToUpdate)
        navigate('/gig')
        // setFilterByToEdit(updatedFilter)
    }

    return (
        // <section className="gig-filter">
        <nav
        id="categories-menu-package"
        className="categories-menu-package default has-overflow"
      >
                <ul className="categories">
                    {/* <button
                        className="category-button"
                        onClick={() => handleTagClick("logo-design")}
                    >
                        Logo Design
                    </button>
                    <button
                        className="category-button"
                        onClick={() => handleTagClick("Programming & Tech")}
                    >
                        Programming &amp; Tech
                    </button>
                    <button
                        className="category-button"
                        onClick={() => handleTagClick("Digital Marketing")}
                    >
                        Digital Marketing
                    </button> */}
                    <li onClick={() => handleTagClick("logo-design")}>Graphics & Design

                    </li>
                    <li onClick={() => handleTagClick("Programming & Tech")}>Programming & Tech</li>
                    <li onClick={() => handleTagClick("Digital Marketing")}>Digital Marketing</li>
                    <li onClick={() => handleTagClick("Video & Animation")}>Video & Animation</li>
                    <li onClick={() => handleTagClick("Writing & Translation")}>Writing & Translation</li>
                    <li onClick={() => handleTagClick("Music & Audio")}>Music & Audio</li>
                    <li onClick={() => handleTagClick("Business")}>Business</li>
                    <li onClick={() => handleTagClick("Data")}>Data</li>
                    <li onClick={() => handleTagClick("Photography")}>Photography</li>
                    <li onClick={() => handleTagClick("AI Services")}>AI Services</li>
                </ul>
                </nav>
            
        // </section>
    )
}