export const SET_GIGS = 'SET_GIGS'
export const ADD_GIG = 'ADD_GIG'
export const UPDATE_GIG = 'UPDATE_GIG'

const initialState = {
    gigs: []
}

export function gigReducer(state = initialState, action) {
    var newState = state
   
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break
        case ADD_GIG:
            return {
                ...state,
                gigs: [action.gig,...state.gigs ]
                // gigs: state.gigs ? [...state.gigs, action.gig] : [action.gig]

            }
        case UPDATE_GIG:
            return {
                ...state,
                gigs: state.gigs.map(gig => gig._id === action.gig._id ? action.gig : gig)
            }
        // case ADD_GIG:
        //     const gig = action.value
        //     gig.id = "_" + new Date().getTime()
        //     newState = { ...state, gigs: [...state.gigs, gig] }
        //     localStorage.setItem('gigsData', JSON.stringify(newState))
        //     return newState

        default:
            return state;
    }
    return newState
}
