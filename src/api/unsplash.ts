// import {createApi} from "unsplash-js";
import axios from "axios";

// export const unsplash = createApi({
//     accessKey: import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY,
// });

const unsplashApi = axios.create({
    baseURL: "https://api.unsplash.com",
    headers: {
        Authorization: `Client-ID ${import.meta.env.VITE_UNSPLASH_API_ACCESS_KEY}`,
    },
});

export default unsplashApi;