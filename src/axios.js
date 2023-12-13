import axios from "axios";
const instance = axios.create({
    baseURL:"http://localhost:3000",
     timeout: 3000,
     });
    instance.interceptors.request.use(function (config) {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
        });

        instance.interceptors.response.use(
            function (response) {
            return response;
            },
           function (error) {
            if (error.response.status === 500) {
            localStorage.clear();
            window.location = "/login";
            }
            return Promise.reject(error);
            }
            );

        export default instance;