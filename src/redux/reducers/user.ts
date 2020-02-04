import { strings } from './../../locales/strings';
import { USER_LOADED, USER_LOGGED_IN, SET_LANGUAGE, USER_LOGGED_OUT } from './../types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    // token: "",
    settings: {
        language: 'ru'
    }
}

let columnKey = '@user';

export const user = (state = initialState, { type, payload }) => {
    let newState;
    switch (type) {
        case USER_LOADED:
            return { ...state, ...payload }
        case USER_LOGGED_IN:
            newState = { ...state, ...payload };
            AsyncStorage.setItem(columnKey, JSON.stringify(newState));
            return newState;
        case SET_LANGUAGE:
            strings.setLanguage(payload);
            newState = { ...state, settings: { ...state.settings, language: payload } }
            AsyncStorage.setItem(columnKey, JSON.stringify(newState));
            return newState;
        case USER_LOGGED_OUT:
            AsyncStorage.setItem(columnKey, '')
            return {}
        default:
            return state
    }
}
