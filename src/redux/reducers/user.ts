import { strings } from './../../locales/strings';
import { USER_LOADED, USER_LOGGED_IN, SET_LANGUAGE } from './../types';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    token: "",
    settings: {
        language: 'ru'
    }
}

export const user = (state = initialState, { type, payload }) => {
    let newState;
    switch (type) {
        case USER_LOADED:
            return { ...state, ...payload }
        case USER_LOGGED_IN:
            newState = { ...state, ...payload };
            AsyncStorage.setItem('@user', JSON.stringify(newState));
            return newState;
        case SET_LANGUAGE:
            strings.setLanguage(payload);
            newState = { ...state, settings: { ...state.settings, language: payload } }
            AsyncStorage.setItem('@user', JSON.stringify(newState));
            return newState;
        default:
            return state
    }
}
