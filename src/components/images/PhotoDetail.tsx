import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { AiOutlineTwitter, AiOutlineInstagram, AiOutlineLink } from "react-icons/ai";
import unsplash from "../../api/unsplash";
import { ImageCardType } from "../../types/types.ts";
import { toast } from "react-toastify";

const PhotoDetail = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState<ImageCardType | null>(null);

    useEffect(() => {
        const fetchPhoto = async () => {
            try {
                const res = await unsplash.get(`/photos/${id}`);
                setPhoto(res.data);
            } catch (error) {
                console.error("Error fetching photo details:", error);
                toast.error("Error fetching photo details.");
            }
        };
        fetchPhoto().then();
    }, [id]);

    if (!photo) {
        return (
            <div className="flex mt-10 justify-center min-h-screen">
                <div className="animate-spin inline-block size-10 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"
                     role="status"
                     aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-5 bg-gray-100">
            <h5 className="text-black font-bold text-2xl mb-5">
                Photo by: {` ${photo.user.name}`}
            </h5>
            <div
                className="w-11/12 border border-gray-300 rounded-2xl overflow-hidden shadow-neutral-500 shadow-md bg-white"
                style={{ borderColor: photo.color }}>
                <img src={photo.urls?.raw} alt={photo.description || "Photo"} className="w-full h-auto rounded-t-2xl" />
                <div className="p-8">
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">Photo Description</h2>
                    <div className="mb-5 text-gray-600">
                        <p className="text-xl mb-2">{photo.description}</p>
                        <p className="text-xl mb-2 italic">{photo.alt_description}</p>
                            <p className="font-semibold">Size: {`${photo.width} x ${photo.height}`}</p>
                        <p className="mt-4">
                            Download this photo:
                            <a href={`${photo.urls?.raw}?force=true`} download className="ml-2 bg-green-500 text-white py-1 px-2 rounded-lg hover:bg-green-600 transition">Download</a>
                        </p>
                    </div>
                    <h2 className="text-2xl font-bold mb-3 text-gray-800">Photographer</h2>
                    <div className = "flex items-center gap-x-5 mb-5">
                        <a
                            href = {photo.user.links?.html}
                            className = "flex items-center gap-x-5">
                            <img
                                className = "rounded-full w-16 h-16"
                                src = {photo.user.profile_image?.large}
                                alt = "profile img"
                            />
                        </a>
                        <div className = "flex flex-col">
                            <a
                                href = {photo.user.links?.html}
                                className = "flex items-center gap-x-5">

                                <AiOutlineLink/><span className = "font-bold text-lg">{photo.user.name}</span>
                            </a>
                            <div className = "flex items-center gap-x-2">
                                {photo.user.twitter_username && (
                                    <span className = "text-sm text-gray-400 flex items-center gap-x-1">
                                        <AiOutlineTwitter /> {photo.user.twitter_username}
                                    </span>
                                )}
                                {photo.user.instagram_username && (
                                    <span className = "text-sm text-gray-400 flex items-center gap-x-1">
                                        <AiOutlineInstagram /> {photo.user.instagram_username}
                                    </span>
                                )}
                            </div>
                            <span className = "text-sm">{photo.user.location}</span>
                        </div>
                    </div>
                    <div className = "text-gray-600">
                        <p className = "mb-2">{photo.user.bio}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhotoDetail;