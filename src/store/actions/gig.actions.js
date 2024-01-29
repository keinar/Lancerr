import { store } from "../store.js";
import * as actions from "../reducers/gig.reducer.js";
import { ADD_GIG, SET_GIGS, UPDATE_GIG } from "../reducers/gig.reducer.js";
import { gigService } from "../../services/gig.service.local.js";

export async function saveGig(gigToSave) {
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    const type = gigToSave.id ? UPDATE_GIG : ADD_GIG
    try {
        const savedGig = await gigService.save(gigToSave)
        await store.dispatch({ type, gig: savedGig })
    } catch (err) {
        console.log('Had issues saving gig', err);
        throw err
    } finally {
        // store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function loadGigs() {
  try {
    const gigs = await gigService.query();
    store.dispatch({ type: SET_GIGS, gigs });
  } catch (err) {
    console.log("Had issues loading gigs", err);
    throw err;
  } finally {
    // store.dispatch({ type: 'SET_IS_LOADING', isLoading: false })
  }
}

export function onToggleModal(modalData = null) {
    store.dispatch({
        type: SET_MODAL_DATA,
        modalData,
    })
}