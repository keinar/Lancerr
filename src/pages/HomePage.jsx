import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CHANGE_COUNT } from '../store/reducers/user.reducer'


export function HomePage() {
    // Mock data for tags 
    const allTags = ["logo-design", "wordpress", "voice-over", "artistic", "professional", "accessible"]
    
    return (
        <section>
            <h2>
            Here, we will display all the tags. <br/>
             After selecting a tag, we will navigate to list of gigs with link to gig-details
            </h2 >
          

            <ul>
                {allTags.map((tag, index) => (
                    <li key={index}>
                        <button onClick={() => navigateToGigsPage(tag)}>
                            {tag}
                        </button>
                    </li>
                ))}
            </ul>
        </section >
    )
}