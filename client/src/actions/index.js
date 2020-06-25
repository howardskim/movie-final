import {
  HANDLE_SEARCH,
  GET_INITIAL_MOVIES,
  HANDLE_NEXT_PAGE,
  HANDLE_IMAGE_CLICK,
  HANDLE_SIDEBAR,
  HANDLE_RESET,
  AUTH_USER,
  AUTH_ERROR,
  SEARCH_ERROR,
  GET_FAVES,
  SAVED_MOVIE,
  DELETE_MOVIE,
  RESET_ERROR_MSG,
} from "./types";
import axios from "axios";

export const handleReset = () => {
  return {
    type: HANDLE_RESET,
  };
};

export const closeSidebar = () => {
  return {
    type: HANDLE_SIDEBAR,
  };
};

export const resetErrorMessage = () => {
  return {
    type: RESET_ERROR_MSG,
  };
};

export const getInitialMovies = (pageNum) => async (dispatch) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${pageNum}`
  );
  dispatch({
    type: GET_INITIAL_MOVIES,
    payload: response.data,
  });
};

export const handleSearch = (searched) => async (dispatch) => {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${searched}&page=1&include_adult=false`
    );
    dispatch({
      type: HANDLE_SEARCH,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SEARCH_ERROR,
      payload: "Search Error",
    });
  }
};

export const handleNext = (searched, nextPageNum) => async (dispatch) => {
  if (!searched) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&page=${nextPageNum}`
    );
    dispatch({
      type: HANDLE_NEXT_PAGE,
      payload: response.data,
    });
  } else {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US&query=${searched}&page=${nextPageNum}&include_adult=false`
    );
    dispatch({
      type: HANDLE_NEXT_PAGE,
      payload: response.data,
    });
  }
};

export const handlePrevious = (searched, previousPageNum) => async (
  dispatch
) => {};

export const handleImageClick = (info) => async (dispatch) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${info.id}/videos?api_key=${process.env.REACT_APP_MOVIE_KEY}&language=en-US`
  );
  const withTrailer = {
    ...info,
    ...response.data,
  };
  dispatch({
    type: HANDLE_IMAGE_CLICK,
    payload: withTrailer,
  });
};

export const signup = ({ email, password }, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signup", {
      email,
      password,
    });
    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.id);
    callback();
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Email in Use",
    });
  }
};

export const signout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("id");
  return {
    type: AUTH_USER,
    payload: "",
  };
};
export const signin = ({ email, password }, callback) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signin", {
      email,
      password,
    });
    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
      favorites: response.data.favorites,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.id);
    callback();
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid Login Credentials",
    });
  }
};

export const signinAndSave = (
  { email, password },
  callback,
  movieToSaveFunction
) => async (dispatch) => {
  try {
    const response = await axios.post("/api/signin", {
      email,
      password,
    });
    dispatch({
      type: AUTH_USER,
      payload: response.data.token,
      favorites: response.data.favorites,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("id", response.data.id);
    movieToSaveFunction();
    callback();
  } catch (error) {
    console.log(error);
    dispatch({
      type: AUTH_ERROR,
      payload: "Invalid Login Credentials",
    });
  }
};

export const addMovie = (newMovie) => async (dispatch) => {
  try {
    const response = await axios.post("/api/addMovie", newMovie);
    dispatch({
      type: SAVED_MOVIE,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFavorites = (id) => async (dispatch) => {
  try {
    const response = await axios.get(
      `/api/getFavorites/id?id=${id}`
    );
    dispatch({
      type: GET_FAVES,
      payload: response.data,
    });
  } catch (error) {}
};

export const deleteMovie = (id) => async (dispatch) => {
  let user = localStorage.getItem("id");
  try {
    const response = await axios.delete(
      `/api/deleteMovie/?id=${id}&user=${user}`
    );
    dispatch({
      type: DELETE_MOVIE,
      payload: response.data.id,
    });
  } catch (error) {}
};
