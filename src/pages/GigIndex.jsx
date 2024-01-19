import { useEffect } from 'react'
import { useSelector } from 'react-redux'
// import { loadCars, addCar, updateCar, removeCar } from '../store/actions/gig.actions.js'

import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { gigService } from '../services/gig.service.local.js'
import {GigList} from '../cmps/GigList.jsx'
import { loadGigs } from '../store/actions/gig.actions.js'

export function GigIndex() {

    const gigs = useSelector(storeState => storeState.gigModule.gigs)

    useEffect(() => {
        // Sanitize filterBy
        loadGigs()        
    }, [])
    
    if (!gigs) return <div>Loading..</div>
    return (
        <section className='gigs-index'>
            <h3>Results for "Logo Design"
               Website Design <br/> LIST OF GIGS</h3>
            <main>
            <GigList gigs={gigs} />
            </main>
        </section>
    )
}