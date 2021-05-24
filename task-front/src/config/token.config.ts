import axiosCustomer from "./axios.config";

const tokenAuth = (token: string) => {
    if (token) {
        axiosCustomer.defaults.headers.common['auth'] = token;
    } else {
        delete axiosCustomer.defaults.headers.common['auth'];
    }
}

export default tokenAuth;