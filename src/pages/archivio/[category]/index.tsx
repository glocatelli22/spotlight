import Archive from "@/components/archive/ArchiveTemplate";
import { DISCOVER_MOVIES_BASEURL, DISCOVER_SHOWS_BASEURL, GET_GENRES_BASEURL, evaluateArchiveParams, fetchTMDB } from "@/tmdb";
import { ArchiveProps } from "@/types";
import { GetStaticProps } from "next";


const ArchivePage = (props : ArchiveProps) => {

    const {
        title,
        url,
        displaysShows,
        genres
    } = props;

    return <Archive 
        displaysShows={displaysShows} 
        title={title} 
        url={url} 
        genres={genres} />
};

export const getStaticPaths = async () => {
    return {
        paths: [
            { 
                params: {
                    category: 'film',
                }
            }, 
            { 
                params: {
                    category: 'serie-tv'
                }
            }
        ],
        fallback: false
    }
};


export const getStaticProps = (async (context) => {
    
    const {category = ''} = context.params || {};    
    
    const displaysShows = category === 'serie-tv' ? true : false;
    const title = category === 'serie-tv' ? 'Tutte le serie tv' : 'Tutti i film';
    const url = category === 'serie-tv' ? DISCOVER_SHOWS_BASEURL : DISCOVER_MOVIES_BASEURL;
    
    const genresResponse = await fetchTMDB(GET_GENRES_BASEURL(displaysShows));

    return {
        props: {
            title,
            url,
            displaysShows,
            genres: genresResponse?.genres || []
        }
    };

}) satisfies GetStaticProps;

export default ArchivePage;