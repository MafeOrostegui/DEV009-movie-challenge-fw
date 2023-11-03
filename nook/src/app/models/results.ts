import { Movie } from "./movie"
import { TvShow } from "./tv-show";

export interface Results {
    results: (Movie | TvShow)[];
}
export type ResultsOrNull = Results | null;

export const emptyResults: ResultsOrNull = null;
