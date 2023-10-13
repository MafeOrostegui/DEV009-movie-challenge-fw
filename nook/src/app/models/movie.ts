import { BackdropImage } from "./backdrop-image";
import { LogosImages } from "./logos-images";

export interface Movie {
    id: number;
    title: string;
    genre_ids: number[]
    genres: { name: string }[];
    poster_path: string;
    overview: string;
    popularity: number;
    vote_average: number;
    release_date: string;
    images: {
        backdrops: BackdropImage[]
        logos: LogosImages[]
    }
}
