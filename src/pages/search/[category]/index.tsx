import Archive from "@/components/archive/ArchiveTemplate";
import { GET_SEARCH_URL} from "@/tmdb";
import { useRouter } from "next/router";


const ArchivePage = () => { 


    const router = useRouter();
    const { category, keywords = '' } = router.query;
    console.log(router.query)
    
    const title = `Risultati di ricerca per: ${keywords}`;

    const url = GET_SEARCH_URL(category === 'serie-tv', keywords as string);
    
    return <Archive 
        displayFilter={false}
        displaySearch={true}
        displaysShows={category === 'serie-tv'} 
        title={title} 
        url={url} />
};


export default ArchivePage;