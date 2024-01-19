import { legacy_createStore as createStore, combineReducers } from 'redux'

import { gigReducer } from './reducers/gig.reducer.js'
import { userReducer } from './reducers/user.reducer.js'
import { reviewReducer } from './review.reducer'
import { systemReducer } from './system.reducer'

const rootReducer = combineReducers({
    gigModule: gigReducer,
    userModule: userReducer,
    systemModule: systemReducer,
    reviewModule: reviewReducer,
})


const middleware = (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__() : undefined
export const store = createStore(rootReducer, middleware)


store.subscribe(() => {
    console.log('**** Store state changed: ****')
    console.log('storeState:\n', store.getState())
    console.log('*******************************')
})



