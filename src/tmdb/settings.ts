const startDate = new Date();
let endDate = new Date();
endDate = new Date(endDate.setDate(endDate.getDate() - 30));
const showQueryDate = startDate.toISOString().split('T')[0];

export const GET_POPULAR_MOVIES_HP = '/movie/popular';
export const GET_POPULAR_SHOWS_HP = '/tv/popular';
export const DISCOVER_MOVIES_BASEURL = '/discover/movie';
export const DISCOVER_SHOWS_BASEURL = '/discover/tv';
export const MOVIE_DETAILS_BASEURL = '/movie';
export const SHOW_DETAILS_BASEURL = '/tv';

export const GET_TRAILER_BASEURL = (id: string, shows: boolean = false) => `/${shows ? 'tv' : 'movie'}/${id}/videos`; 
export const GET_RELATED_BASEURL = (id: string, shows: boolean = false) => `/${shows ? 'tv' : 'movie'}/${id}/similar`; 
export const GET_CREDITS = (id: string, shows: boolean = false) => `/${shows ? 'tv' : 'movie'}/${id}/credits`; 
export const GET_WATCH_PROVIEDERS_BASEURL = (id: string, shows: boolean = false) => `/${shows ? 'tv' : 'movie'}/${id}/watch/providers`;
export const GET_GENRES_BASEURL = (shows: boolean) =>  `/genre/${shows ? 'tv' : 'movie'}/list`;

export const SHOWS_WATCH_PROVIDERS = { with_watch_providers: '8|119|9|337|39|359|350|40|109|110' };
export const REGION = {region: 'IT'};
export const SHOWS_WATCH_REGION = { watch_region: 'IT'};

export const GET_SEARCH_URL = (shows: boolean, keywords: string) => `/search/${shows ? 'tv' : 'movie'}?query=${keywords}`;

export const UPCOMING_MOVIES_QUERY = {
    'release_date.gte': (new Date()).toISOString(),
    with_release_type: '3|2',
    ...REGION,
    sort_by: 'release_date.asc'
};

export const NOW_PLAYING_MOVIES_QUERY = {
    'release_date.lte': startDate.toISOString(),
    'release_date.gte': endDate.toISOString(),
    with_release_type: '3|2', 
    ...REGION,
    sort_by: 'release_date.desc',
};

export const POPULAR_MOVIE_PARAMS = {
    with_release_type: '3|2',
    ...REGION,
    sort_by: 'popularity.desc',
};

export const TOP_RATED_MOVIES = {
    with_release_type: '3|2',
    'vote_average.gte': 8,
    'vote_count.gte': 2000,
    ...REGION,
    sort_by: 'vote_average.desc',
};

export const POPULAR_SHOWS_PARAMS = {
    ...SHOWS_WATCH_PROVIDERS,
    ...SHOWS_WATCH_REGION,
    sort_by: 'popularity.desc'
};

export const SHOWS_ON_AIR_QUERY = {
    ...SHOWS_WATCH_REGION,
    ...SHOWS_WATCH_PROVIDERS,
    sort_by: 'first_air_date.desc',
    'air_date.lte': showQueryDate, 
    'first_air_date.lte': showQueryDate
};

export const TOP_RATED_SHOWS = {
    'vote_average.gte':8,
    'vote_count.gte': 2000,
    sort_by: 'vote_average.desc',
    ...SHOWS_WATCH_PROVIDERS,
    ...SHOWS_WATCH_REGION
};



interface ArchiveParams {
    url: string, 
    title: string, 
    queryParams: {} | null
};

export const evaluateArchiveParams = (category: string, slug: string) : ArchiveParams => {
    
    
    const evaluateSlug = (slug: string) : Pick<ArchiveParams, "queryParams" | "title"> => {
        
        switch(slug) {
            case 'ultime-uscite': 
                return {
                    title: 'Ultime uscite',
                    queryParams: NOW_PLAYING_MOVIES_QUERY
                };
            case 'popolari': 
                return {
                    title: 'Popolari',
                    queryParams: category === 'film' ? POPULAR_MOVIE_PARAMS : POPULAR_SHOWS_PARAMS
                };
            case 'top-rated': 
                return {
                    title: 'Top Rated',
                    queryParams: category === 'film' ? TOP_RATED_MOVIES : TOP_RATED_SHOWS
                };
            case 'coming-soon': 
                return {
                    title: 'Coming Soon',
                    queryParams: UPCOMING_MOVIES_QUERY
                };
            case 'in-onda': 
                return {
                    title: 'In Onda',
                    queryParams: SHOWS_ON_AIR_QUERY
                };
            case 'elenco-completo': 
                return {
                    title: category === 'film' ? 'Tutti i film' : 'Tutte le serie tv',
                    queryParams: {}
                };
            default: 
                return {
                    title: '',
                    queryParams: null
                };
        }
    };

    if(category != 'film' && category != 'serie-tv') {
        return {
            url: '',
            title: '',
            queryParams: null
        };
    }

    return {
        url: category === 'film' ? DISCOVER_MOVIES_BASEURL : DISCOVER_SHOWS_BASEURL,
        ...evaluateSlug(slug)
    };

};