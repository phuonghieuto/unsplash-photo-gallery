import { AiOutlineInstagram, AiOutlineLike, AiOutlineTwitter } from "react-icons/ai";
import { FC } from "react";
import { ImageCardType } from "../../types/types.ts";
import { convertLikes } from "../../utils/utils.ts";
import { useNavigate } from "react-router-dom";

const ImageCard: FC<ImageCardType> = ({
                                          description,
                                          alt_description,
                                          img_url,
                                          likes,
                                          user,
                                          id,
                                      }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/unsplash-photo-gallery/photos/${id}`);
    };

    return (
        <article
            className="relative border-[1px] border-gray-200 rounded-md hover:scale-95 hover:transition-transform cursor-pointer shadow-xl"
            onClick={handleClick}
        >
            <div>
                <img
                    src={img_url}
                    className="block object-cover object-center rounded-t-md"
                    alt={description || alt_description}
                    title={description || alt_description}
                />
            </div>
            <div className="p-3 flex gap-x-5 items-center">
                <img
                    className="rounded-full max-w-10"
                    src={user.profile_img}
                    alt="profile img"
                />
                <p className="flex flex-col italic truncate">
                    <span className="font-bold truncate">{user.name}</span>
                    <div className="flex flex-col">
                        {user.twitter_username && (
                            <span className="text-sm text-gray-400 flex items-center gap-x-1 truncate">
                <AiOutlineTwitter /> {user.twitter_username}
              </span>
                        )}
                        {user.instagram_username && (
                            <span className="text-sm text-gray-400 flex items-center gap-x-1 truncate">
                <AiOutlineInstagram /> {user.instagram_username}
              </span>
                        )}
                    </div>
                </p>
                <p className="ml-auto flex items-center gap-x-1">
                    <AiOutlineLike />
                    <span className="text-xs">{convertLikes(likes)}</span>
                </p>
            </div>
        </article>
    );
};

export default ImageCard;