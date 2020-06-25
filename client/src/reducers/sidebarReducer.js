import {
  HANDLE_IMAGE_CLICK,
  HANDLE_SIDEBAR,
  HANDLE_RESET,
  SAVED_MOVIE,
} from "../actions/types";
const initialState = {
  show: false,
  info: '',
  saved: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case HANDLE_IMAGE_CLICK:
      return {
        ...state,
        info: action.payload,
        show: !state.show,
        saved: false
      };
    case HANDLE_SIDEBAR:
      return {
        ...state,
        show: !state.show,
        info: "",
        saved: false
      };
    case HANDLE_RESET:
      return {
        ...state,
        show: false,
        saved: false,
      };
    case SAVED_MOVIE:
      return {
        ...state,
        saved: true,
      };
    default:
      return state;
  }
}
