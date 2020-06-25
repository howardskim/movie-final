import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import searchReducer from './searchReducer';
import sidebarReducer from './sidebarReducer';
import authReducer from './authReducer';

export default combineReducers({
    search: searchReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    form: formReducer
})