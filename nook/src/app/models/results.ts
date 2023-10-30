import { Movie } from "./movie"
import { TvShow } from "./tv-show";

export interface Results {
    results: (Movie | TvShow)[];
}

export const emptyResults: Results = {
    results: [],
};