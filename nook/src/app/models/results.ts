import { Movie } from "./movie"

export interface Results {
    results: Movie[];
}

export const emptyResults: Results = {
    results: [],
};