export const SET_GIGS = 'SET_GIGS'
export const ADD_GIG = 'ADD_GIG'


const initialState = {
    gigs: [{
        "_id": "i101",
        "title": "I will design your logo",
        "price": 12,
        "owner": {
          "_id": "u101",
          "fullname": "Dudu Da",
          "imgUrl": "url",
          "level": "basic/premium",
          "rate": 4
        },
        "daysToMake": 3,
        "description": "Make unique logo...",
        "imgUrl": "",
        "tags": [
          "logo-design",
          "artisitic",
          "proffesional",
          "accessible"
        ],
        "likedByUsers": ['mini-user'] // for user-wishlist : use $in
      }]
    
}

export function gigReducer(state = initialState, action) {
    var newState = state
    var gigs
    
    switch (action.type) {
        case SET_GIGS:
            newState = { ...state, gigs: action.gigs }
            break

        case ADD_GIG:
            const gig = action.value
            gig.id = "_"+new Date().getTime()
            newState= {...state, gigs:[...state.gigs,gig]}
            localStorage.setItem('gigsData', JSON.stringify(newState))
            return newState
        
        default:
    }
    return newState
}
