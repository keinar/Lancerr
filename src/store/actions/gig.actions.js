import { store } from '../store.js'
import * as actions from '../reducers/gig.reducer.js'
import { gigService } from '../../services/gig.service.local.js'

export function addGig(gig){
    store.dispatch({type:actions.ADD_GIG, value:gig})
}

export async function loadGigs() {

    
    try {
        const gigs = await gigService.query()
        store.dispatch({ type: actions.SET_GIGS, gigs })
    } catch (err) {
        console.log('Had issues loading gigs', err);
        throw err
    } finally {
        // store.dispatch({ type: 'SET_IS_LOADING', isLoading: false })
    }

}