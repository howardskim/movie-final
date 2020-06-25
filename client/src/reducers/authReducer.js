import {
  AUTH_USER,
  AUTH_ERROR,
  GET_FAVES,
  DELETE_MOVIE,
  RESET_ERROR_MSG,
} from "../actions/types";

const initialState = {
    authenticated: '',
    errorMessage: '',
    favorites: [],
}
export default (state = initialState, action) => {
    switch(action.type){
        case AUTH_USER:
            return{
                ...state,
                authenticated: action.payload,
                favorites: action.favorites,
                errorMessage: ''
            }
        case AUTH_ERROR:
            return {
                ...state,
                errorMessage: action.payload
            }
        case GET_FAVES:
            return {
                ...state,
                favorites: action.payload
            }
        case RESET_ERROR_MSG:
            return {
                ...state,
                errorMessage: ''
            }
        case DELETE_MOVIE:
            const copy = [...state.favorites];
            const remaining = copy.filter(obj => obj.id !== action.payload);
            return {
                ...state,
                favorites: remaining
            }
        default: 
        return state
    }
}