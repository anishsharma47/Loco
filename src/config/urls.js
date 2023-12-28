export const API_BASE_URL = "https://api.apptask.thekaspertech.com/api/users"

export const getApiURL = (endpoint) => API_BASE_URL + endpoint

export const SIGNUP_API = getApiURL('/register');
export const LOGIN_API = getApiURL('/login');
export const ADD_COORDINATES = getApiURL('/addCoordinates');
export const GET_USER_INFO = getApiURL('/');





