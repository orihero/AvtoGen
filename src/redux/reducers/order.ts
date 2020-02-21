import { ORDER_LOADED } from './../types';
const initialState = {
    current: null,
    history: []
}

export let order = (state = initialState, { type, payload }) => {
    switch (type) {

        case ORDER_LOADED: {
            let { name, data } = payload;
            return { ...state, [name]: data }
        }
        default:
            return state
    }
}
