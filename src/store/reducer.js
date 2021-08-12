import * as actionTypes from './action';
import * as utils from '../utils'

const initialState = {
    first: false,
    key: null,
    dark: false,
    metric: true,
    city: '',
    current: null,
    days: [],
    celsius: false,
    isFavorite: false,
    fahrenheit: false,
    tempFav: null,
    favorites: localStorage.getItem('favorites') === null ? [] : JSON.parse(localStorage.getItem('favorites')),
    lat: null,
    lan: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.TOGGLE_THEME:
            return {
                ...state,
                dark: state.dark ? false : true
            }
        case actionTypes.UPDATE_CITY:
            console.log(action.value);
            return {
                ...state,
                city: action.value,
            }
        case actionTypes.UPDATE_TEMPERATURE:
            console.log(action);
            return {
                ...state,
                celsius: action.celsius,
                fahrenheit: action.fahrenheit
            }
        case actionTypes.UPDATE_CURRENT:

            return {
                ...state,
                current: action.value
            }
        case actionTypes.TOGGLE_METRIC:
            return {
                ...state,
                metric: state.metric ? false : true
            }
        case actionTypes.UPDATE_DAYS:
            return {
                ...state,
                days: action.value

            }
        case actionTypes.UPDATE_KEY:
            let boolKey = utils.containsObject(state.favorites, { key: action.key, city: action.city });
            return {
                ...state,
                key: action.key,
                city: action.city,
                isFavorite: boolKey ? true : false

            }
        case actionTypes.UPDATE_FAVORITES:
            let boolFav = utils.containsObject(state.favorites, { key: state.key, city: state.city });
            let favorites = state.favorites;

            if (!boolFav) {
                localStorage.setItem('favorites',JSON.stringify([...state.favorites, { key: state.key, city: state.city }]));
                return {
                    ...state,
                    favorites: [...state.favorites, { key: state.key, city: state.city }],
                    isFavorite: boolFav ? false : true
                }
            } else {
                localStorage.setItem('favorites',JSON.stringify(favorites.splice(favorites.indexOf({ key: state.key, city: state.city }), 1)));
                return {
                    ...state,
                    favorites: favorites.splice(favorites.indexOf({ key: state.key, city: state.city }), 1),
                    isFavorite: boolFav ? false : true
                }

            }
            case actionTypes.TOGGLE_FIRST:
                return {
                    ...state,
                    first: true
                }
        default:
            return state
    }


}

export default reducer