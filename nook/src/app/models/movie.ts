import { BackdropImage } from "./backdrop-image";
import { LogosImages } from "./logos-images";
import { Actor } from "./actor";

export interface Movie {
    id: number;
    title: string;
    genres: { id: number, name: string }[]; 
    poster_path: string;
    overview: string;
    popularity: number;
    vote_average: number;
    release_date: string;
    images: {
        backdrops: BackdropImage[]
        logos: LogosImages[]
    }
    credits: {
        cast: Actor[];
    }
}
