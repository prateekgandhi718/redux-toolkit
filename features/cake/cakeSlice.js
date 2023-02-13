const createSlice = require('@reduxjs/toolkit').createSlice

const initialState = {
    numOfCakes: 10,
}

const cakeSlice = createSlice({
    //This takes an object having three properties. name, initialstate, and reducers. Here we do not have to define action creators or reducers seperately.
    name: 'cake',
    initialState: initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakes = state.numOfCakes - 1
        },
        restocked: (state, action) => {
            state.numOfCakes = state.numOfCakes + action.payload
        },
    }
})

module.exports = cakeSlice.reducer
module.exports.cakeActions = cakeSlice.actions
