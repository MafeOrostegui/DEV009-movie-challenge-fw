import { Actor } from "./actor";
import { Seasons } from "./seasons";

export interface TvShow {
    id: number;
    name: string;
    backdrop_path: string | null;
    poster_path: string;
    genres: { id: number; name: string }[];
    vote_average: number;
    overview: string;
    first_air_date: string;
    number_of_seasons: number;
    number_of_episodes: number;
    episode_run_time: number;
    seasons: Seasons[];
    credits: {
        cast: Actor[];
    };
    status: string;
    last_episode_to_air: { name: string, overview: string },
}
