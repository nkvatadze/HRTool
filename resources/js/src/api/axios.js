import axios from "axios";

axios.defaults.headers = {
    Accept: "application/json",
};

let client = axios.create({
    baseURL: process.env.MIX_REACT_APP_SERVER_API,
});

export default client;
