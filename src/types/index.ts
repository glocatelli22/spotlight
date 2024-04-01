export interface MovieShowPreview {
    id: string, 
    title: string, 
    releaseDate?: string, 
    posterPath?: string, 
    vote: number, 
    url: string,
    additionalClasses: string[]
};

export interface NamedItemsObj {
    name: string
}

interface MovieShowsCommon {
    id: string,
    release_date: string,
    backdrop_path?: string,
    poster_path?: string,
    vote_average: number
    overview?: string
    tagline?: string
    revenue?: number
    budget?: number
    homepage?: string,
    genres: NamedItemsObj[],
    production_companies: NamedItemsObj[],
    production_countries: { iso_3166_1: string }[],
    director: string
};

export interface MovieObj extends MovieShowsCommon {
    title: string,
    runtime?: number
};

export interface ShowObj extends MovieShowsCommon {
    name: string,
    first_air_date: string,
    last_air_date: string,
    number_of_seasons: number,
    status: string,
    created_by: NamedItemsObj[],
    episode_run_time: string[]
};

export interface VideoObj {
    key: string,
    type: string,
    official: boolean
};

export interface ProviderObj {
    provider_name: string,
    logo_path: string
};

export interface ProvidersType {
    buy: ProviderObj[]
    flatrate: ProviderObj[]
    rent: ProviderObj[]
};

export interface Actor {
    name: string,
    character: string,
    profile_path: string
};

export interface Genre extends NamedItemsObj {
    id: string
};

export interface ArchiveProps { 
    title: string, 
    queryParams?: {
        [key: string]: string
    },
    url: string, 
    displaysShows: boolean,
    genres?: Genre[]
};