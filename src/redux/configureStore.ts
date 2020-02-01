import { user } from './reducers/user';
import { createStore, combineReducers } from 'redux';


let configureStore = () => {
    return createStore(combineReducers({
        user
    }))
}

export default configureStore;