import axios from "axios";

const unsplashApi = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY}`,
    },
});

export default unsplashApi;