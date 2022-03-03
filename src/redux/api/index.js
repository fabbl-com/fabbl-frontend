import axios from "axios";

const ENDPOINT = process.env.REACT_APP_ENDPOINT;

const accessToken = localStorage.getItem("accessToken");

const Axios = axios.create({
  baseURL: ENDPOINT,
  withCredentials: true,
  headers: {
    "Access-Controll-Allow-origin": "*",
    "Access-Control-Allow-Headers": "X-Requested-With,content-type",
    "Access-Control-Allow-Credentials": true,
    Authorization: `Bearer ${accessToken}`
  }
});

export default Axios;
