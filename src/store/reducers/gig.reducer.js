export const SET_GIGS = 'SET_GIGS'
export const ADD_CAR = 'ADD_CAR'


const initialState = {
    gigs: []
    
}

export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break

            break
        default:
    }
    return newState
}
