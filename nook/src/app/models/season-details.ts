import { Episodes } from "./episodes";

export interface SeasonDetails {
    id: string;
    air_date: string;
    episodes: Episodes[]
}
