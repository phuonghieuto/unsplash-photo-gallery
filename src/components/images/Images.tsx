import { useEffect, useState, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getListPhotos } from "../../utils/utils.ts";
import ImagesCol from "./ImageCol";
import { ImagesType } from "../../types/types.ts";
import Loader from "../loader/Loader";
import { toast } from "react-toastify";

const Images = () => {
    const [images, setImages] = useState<ImagesType[]>([[], [], [], []]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const fetchPhotos = useCallback(async () => {
        const fetchedImages = await getListPhotos(page);
        if (fetchedImages.length === 0) {
            setHasMore(false);
            toast.info("No more images");
            return;
        }
        const results: ImagesType[] = [[], [], [], []];
        fetchedImages.forEach((image, index) => {
            results[index % 4].push(image);
        });
        setImages((prevImages) => prevImages.map((col, index) => [...col, ...results[index]]));
    }, [page]);

    useEffect(() => {
        const fetchData = async () => {
            await fetchPhotos();
        };
        fetchData().then();
    }, [fetchPhotos]);

    const loadMorePhotos = async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <InfiniteScroll
            dataLength={images.flat().length}
            next={loadMorePhotos}
            hasMore={hasMore}
            loader={<Loader />}
            endMessage={<p style={{ textAlign: 'center' }}>No more images</p>}
        >
            <div className="p-2 md:p-5 md:py-10 md:px-20 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                {images.map((imagesCol, index) => (
                    <ImagesCol key={index} images={imagesCol} />
                ))}
            </div>
        </InfiniteScroll>
    );
};

export default Images;