import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getListPhotos } from "../../utils/utils.ts";
import ImagesCol from "./ImageCol";
import { ImagesType } from "../../types/types.ts";
import Loader from "../loader/Loader";

const Images = () => {
    // State to store images in a 4-column layout
    const [images, setImages] = useState<ImagesType[]>([[], [], [], []]);
    // State to keep track of the current page for pagination
    const [page, setPage] = useState(1);
    // State to determine if there are more images to load
    const [hasMore, setHasMore] = useState(true);

    // Function to fetch photos from the API
    const fetchPhotos = useCallback(async () => {
        const fetchedImages = await getListPhotos(page, setHasMore);
        if (fetchedImages.length === 0) {
            return;
        }
        // Distribute fetched images into 4 columns
        const results: ImagesType[] = [[], [], [], []];
        fetchedImages.forEach((image, index) => {
            results[index % 4].push(image);
        });
        // Update the state with the new images
        setImages((prevImages) => prevImages.map((col, index) => [...col, ...results[index]]));
    }, [page]);

    // Fetch photos when the component mounts or the page changes
    useEffect(() => {
        const fetchData = async () => {
            await fetchPhotos();
        };
        fetchData().then();
    }, [fetchPhotos]);

    // Function to load more photos when the user scrolls down
    const loadMorePhotos = async () => {
        // Simulate a delay before loading more photos
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // Increment the page number to fetch the next set of photos
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={images.flat().length} // Total number of images loaded
                next={loadMorePhotos} // Function to load more photos
                hasMore={hasMore} // Boolean to indicate if there are more photos to load
                loader={<Loader />} // Loader component to show while loading more photos
                endMessage={<p style={{ textAlign: 'center' }}>No more images</p>} // Message to show when no more photos are available
            >
                <div className="p-2 md:p-5 md:py-10 md:px-20 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                    {images.map((imagesCol, index) => (
                        <ImagesCol
                            key={index} // Unique key for each column
                            images={imagesCol} // Images for the current column
                        />
                    ))}
                </div>
            </InfiniteScroll>
        </div>
    );
};

export default Images;