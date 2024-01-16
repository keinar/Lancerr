import { store } from '../store.js'
import * as actions from '../reducers/gig.reducer.js'
export function addGig(gig){
    store.dispatch({type:actions.ADD_GIG, value:gig})
}