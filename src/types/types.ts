import { Random } from "unsplash-js/dist/methods/photos/types";

type ImagesType = Random[];

type TGetPhotos = (page: number, setHasMore: (value: (((prevState: boolean) => boolean) | boolean)) => void) => Promise<ImagesType | []>;

interface UserType {
    name: string;
    username: string;
    twitter_username: string | null;
    instagram_username: string | null;
    profile_img?: string;
    profile_image: {
        large: string;
        medium: string;
        small: string;
    } | null;
    links: {
        html: string;
    } | null;
    location: string | null;
    bio: string | null;
}

interface ImageCardType {
    likes: number;
    user: UserType;
    img_url?: string;
    alt_description?: string;
    description?: string;
    download_url?: string;
    id: string;
    color: string | undefined;
    urls: {
        raw: string;
        regular: string;
    } | null;
    width: number;
    height: number;
}


export type {
    ImageCardType,
    UserType,
    ImagesType,
    TGetPhotos,
};