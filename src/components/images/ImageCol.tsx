import { FC } from "react";
import { ImagesType, UserType } from "../../types/types.ts";
import ImageCard from "./ImageCard";

const ImagesCol: FC<{ images: ImagesType }> = ({ images }) => {
    return (
        <section className="flex flex-col gap-y-10">
            {images.map((image) => {
                const { id, likes, user, description, alt_description, links, urls, color, width, height } = image;
                const userObj: UserType = {
                    name: user.name,
                    username: user.username,
                    twitter_username: user.twitter_username ?? null,
                    instagram_username: user.instagram_username ?? null,
                    profile_img: user.profile_image?.medium,
                    profile_image: user.profile_image,
                    links: user.links,
                    location: user.location ?? null,
                    bio: user.bio ?? null,
                };
                return (
                    <ImageCard
                        key={id}
                        id={id}
                        description={description ?? ""}
                        alt_description={alt_description ?? ""}
                        download_url={links?.html ?? ""}
                        img_url={urls?.regular ?? ""}
                        likes={likes}
                        user={userObj}
                        color={color ?? ""}
                        urls={urls}
                        width={width}
                        height={height}
                    />
                );
            })}
        </section>
    );
};

export default ImagesCol;