import axios from "axios";
const axiosCustomer = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

export default axiosCustomer;