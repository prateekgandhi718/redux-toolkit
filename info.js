// This file is for notes only. 

//Extra reducers?

// Let's go back to pure Redux for a minute. If I want to reduce ice cream by 1 when a cake is ordered I could do that as follows. 

const redux = require('redux')
const createStore = redux.createStore
const combineReducers = redux.combineReducers

const reduxLogger = require('redux-logger')
const logger = reduxLogger.createLogger()
const applyMiddleware = redux.applyMiddleware

const CAKE_ORDERED = "CAKE_ORDERED"
const CAKE_RESTOCKED = "CAKE_RESTOCKED"

const ICECREAM_ORDERED = "ICECREAM_ORDERED"
const ICECREAM_RESTOCKED = "ICECREAM_RESTOCKED"
//Action is an object having different properties. Action creator is a function which returns the action (an object)

const orderCake = () => {
    return {
        type: CAKE_ORDERED,
        payload: 1
    }
}

const restockCake = (qty) => {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    }
}

const orderIceCream = () => {
    return {
        type: ICECREAM_ORDERED,
        payload: 1
    }
}

const restockIceCream = (qty) => {
    return {
        type: ICECREAM_RESTOCKED,
        payload: qty
    }
}

const initialCakeState = {
    numOfCakes: 10
}

const initialIceCreamState = {
    numOfIceCream: 10
}

//REDUCERS in its simplest form can be defined as (previousState, action) => newState

const cakeReducer = (state = initialCakeState, action) => {
    switch (action.type) {
        case CAKE_ORDERED:
            return {
                ...state, //this is to copy the initial state object first before making changes. because it can have more than one property.
                numOfCakes: state.numOfCakes - 1
            }
        
        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            }

        default:
            return state
    }
}

const iceCreamReducer = (state = initialIceCreamState, action) => {
    switch (action.type){
        case ICECREAM_ORDERED:
            return {
                ...state, //this is to copy the initial state object first before making changes. because it can have more than one property.
                numOfIceCream: state.numOfIceCream - 1
            }
        
        case ICECREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream + action.payload
            }
        
        case CAKE_ORDERED:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }    

        default:
            return state
    }
    
}

//COMBINING THE REDUCERS.
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer
})

const store = createStore(rootReducer, applyMiddleware(logger)) // since reducer accepts initial state as an argument, this essentially means our store also has initial state
console.log('Initial state :', store.getState())

const unsubscribe = store.subscribe(() => {})

store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderCake())
store.dispatch(orderIceCream())
store.dispatch(orderIceCream())
store.dispatch(restockIceCream(5))
store.dispatch(restockCake(5))

unsubscribe()


//Now this can be done in redux. But this cannot be done in toolkit and we would need to use extrareducers.