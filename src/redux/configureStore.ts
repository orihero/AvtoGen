import { user, order } from './reducers';
import { createStore, combineReducers } from 'redux';


let configureStore = () => {
    return createStore(combineReducers({
        user,
        order
    }))
}

export default configureStore;