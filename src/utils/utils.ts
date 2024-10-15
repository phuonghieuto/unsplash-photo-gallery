// import { unsplash } from "../api/unsplash";
import unsplash from "../api/unsplash";
import { ImagesType, TGetPhotos, TGetRandomPhotos } from "../types/types.ts";
import { toast } from "react-toastify";

const convertLikes = (likes: number) => {
    if (likes < 1000) {
        return likes + "";
    } else {
        return (likes / 1000).toFixed(1) + "k";
    }
};

// const getPhotos: TGetPhotos = async (searchQuery) => {
//     try {
//         const res = await unsplash.g.getPhotos({
//             query: searchQuery,
//         });
//         if (res.response && res.response.results.length > 0) {
//             toast.success("Successfully find images");
//             return res.response.results;
//         } else {
//             toast.warn(`No images related to "${searchQuery}"`);
//             return [];
//         }
//     } catch (error) {
//         toast.error("Can't find images there is some error.");
//         console.log(error);
//         return [];
//     }
// };

const getRandomPhotos: TGetRandomPhotos = async () => {
    try {
        const res = await unsplash.get("/photos/random", {
            params: {
                count: 30,
            },
        })
        if (res.data) {
            let results: ImagesType = [];
            if (Array.isArray(res.data)) {
                results = res.data as ImagesType;
            } else {
                results.push(res.data);
            }
            toast.success("Successfully found random images.");
            return results;
        } else {
            toast.warn(`Can't find random images.`);
            return [];
        }
    } catch (error) {
        toast.error("Can't find images there is some error.");
        console.log(error);
        return [];
    }
};

const getListPhotos: TGetPhotos = async (page) => {
    try {
        const res = await unsplash.get("/photos", {
            params: { page, per_page: 30 },
        });
        if (res.data && res.data.length > 0) {
            console.log(res.data);
            return res.data;
        } else {
            toast.warn(`No images found on page ${page}`);
            return [];
        }
    } catch (error) {
        toast.error("Can't find images, there is some error.");
        console.log(error);
        return [];
    }
};

export { convertLikes, getListPhotos, getRandomPhotos };