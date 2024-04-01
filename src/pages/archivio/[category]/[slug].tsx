import Archive from "@/components/archive/ArchiveTemplate";
import { GET_GENRES_BASEURL, evaluateArchiveParams, fetchTMDB } from "@/tmdb";
import { ArchiveProps } from "@/types";
import { GetStaticProps } from "next";


const ArchivePage = (props : ArchiveProps) => {

    const {
        title,
        queryParams,
        url,
        displaysShows,
        genres
    } = props;

    return <Archive 
        displaysShows={displaysShows} 
        title={title} 
        queryParams={queryParams}
        url={url} 
        genres={genres} />
};

export const getStaticPaths = async () => {
    return {
        paths: [
            { 
                params: {
                    category: 'film',
                    slug: 'popolari'
                }
            }, 
            { 
                params: {
                    category: 'film',
                    slug: 'coming-soon'
                }
            }, 
            { 
                params: {
                    category: 'film',
                    slug: 'ultime-uscite'
                }
            }, 
            { 
                params: {
                    category: 'film',
                    slug: 'top-rated'
                }
            }, 
            { 
                params: {
                    category: 'serie-tv',
                    slug: 'popolari'
                }
            }, 
            { 
                params: {
                    category: 'serie-tv',
                    slug: 'in-onda'
                }
            }, 
            { 
                params: {
                    category: 'serie-tv',
                    slug: 'top-rated'
                }
            }
        ],
        fallback: false
    }
};


export const getStaticProps = (async (context) => {
    
    const {category = '', slug = ''} = context.params || {};    
    const { title, queryParams, url} = evaluateArchiveParams(category as string, slug as string)
    const displaysShows = category === 'serie-tv' ? true : false;
    
    if(!queryParams || !url) {
        return {
            notFound: true
        }
    }
    
    const genresResponse = await fetchTMDB(GET_GENRES_BASEURL(displaysShows));

    return {
        props: {
            title,
            queryParams,
            url,
            displaysShows,
            genres: genresResponse?.genres || []
        }
    };

}) satisfies GetStaticProps;

export default ArchivePage;