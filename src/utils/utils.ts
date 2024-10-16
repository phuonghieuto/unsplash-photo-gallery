import unsplash from "../api/unsplash";
import { TGetPhotos, ImageCardType } from "../types/types.ts";
import { toast } from "react-toastify";

// Function to convert number of likes to a more readable format
const convertLikes = (likes: number) => {
    if (likes < 1000) {
        return likes + "";
    } else {
        return (likes / 1000).toFixed(1) + "k";
    }
};

// Function to fetch a list of photos from the Unsplash API
const getListPhotos: TGetPhotos = async (page, setHasMore) => {
    try {
        const res = await unsplash.get("/photos", {
            params: { page, per_page: 30 },
        });

        // Check the link header to determine if there are more pages
        const linkHeader: string | undefined = res.headers.link;
        if (linkHeader) {
            const links = linkHeader.split(", ");
            const lastPageLink = links.find(link => link.includes('rel="last"'));
            if (lastPageLink) {
                const match = lastPageLink.match(/page=(\d+)/);
                const lastPage = match ? parseInt(match[1], 10) : null;
                if (lastPage && lastPage > page) {
                    setHasMore(true);
                } else {
                    setHasMore(false);
                }
            } else {
                setHasMore(false);
            }
        }

        // Return the list of photos if available
        if (res.data && res.data.length > 0) {
            return res.data;
        } else {
            toast.warn(`No images found on page ${page}`);
            return [];
        }
    } catch (err) {
        const error = err as { response?: { status: number } };
        toast.error("Can't find images, there is some error.");
        handleErrors(<number>error.response?.status);
        console.log(error);
        return [];
    }
};

// Function to fetch details of a single photo by its ID
const fetchPhoto = async (id: string): Promise<ImageCardType | null> => {
    try {
        const res = await unsplash.get(`/photos/${id}`);
        return res.data;
    } catch (err) {
        const error = err as { response?: { status: number } };
        toast.error("Error fetching photo details.");
        handleErrors(<number>error.response?.status);
        return null;
    }
};

// Function to handle different HTTP error statuses
const handleErrors = (status: number) => {
    switch (status) {
        case 400:
            toast.error("Bad Request: The request was unacceptable, often due to missing a required parameter.");
            break;
        case 401:
            toast.error("Unauthorized: Invalid Access Token.");
            break;
        case 403:
            toast.error("Forbidden: Missing permissions to perform request.");
            break;
        case 404:
            toast.error("Not Found: The requested resource doesn’t exist.");
            break;
        case 500:
        case 503:
            toast.error("Server Error: Something went wrong on Unsplash.");
            break;
        default:
            toast.error("An unknown error occurred.");
    }
};

export { convertLikes, getListPhotos, fetchPhoto };