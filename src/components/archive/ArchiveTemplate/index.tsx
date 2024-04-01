import { Column, MainContainer, PageTopNav, Row, Section, SectionTilte } from "@/components/layout-components";
import showsMoviesLoop from "@/utils/showsMoviesLoop";
import { Button } from "@/components/layout-components";
import { AiOutlineHome, AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { useRouter } from "next/router";
import { useCallback, useState, useEffect, useRef } from "react";
import { fetchTMDB } from "@/tmdb";
import { ArchiveProps, MovieObj, ShowObj } from "@/types";
import classes from "@/styles/Archive.module.css";
import Filter from "./Filter";
import Loader from "@/components/misc/Loader";
import SearchForm from "@/components/misc/Search";

interface ArchiveTemplateProps extends ArchiveProps { 
    displayFilter: boolean,
    displaySearch: boolean
};

const Archive = (props: ArchiveTemplateProps) => {

    const {
        queryParams, 
        displaysShows, 
        displayFilter, 
        displaySearch,
        title,
        url,
        genres
    } = props;

    const router = useRouter();
    const archiveColSize = !displayFilter ? { sm: 12 } : { sm: 12, lg: 7, xl: 9};
    const cardColSize = !displayFilter ? { sm: 6, md: 4, lg: 3, xl: 2}: { sm: 6, md: 4, lg:6, xl: 3};
    const [error, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [results, setResults] = useState<MovieObj[] | ShowObj[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [filterParams, setFilterParams] = useState({});

    const archiveRef = useRef<HTMLDivElement | null>(null);

    const fetchItems = useCallback(async (page: number = 1, isLoadMore: boolean = false, filterParams: {} = {})  => {
        
        setIsLoading(true);
        setError(false);
        
        const response = await fetchTMDB(url, {...queryParams, ...filterParams, page: page});
        if(!response.results) {
            setError(true);
            return;
        }

        isLoadMore ? 
            setResults(prevState => {
                return [
                    ...prevState, 
                    ...response.results
                ]
            })
        :
            setResults(response.results);
        
        setPage(response.page);
        setTotalPages(response.total_pages);
        setIsLoading(false);

    }, [queryParams, url]);

    const submitCallback = (params: {}) => {
        setFilterParams(params);
        fetchItems(1, false, params);
        if(archiveRef.current && window.scrollY > archiveRef.current?.offsetTop) {
            window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        }
    };

    useEffect(() => {
        setError(false);
        setPage(1);
        setTotalPages(0);
        setResults([]);
    }, [router.asPath]);


    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    
    return (
        <MainContainer>
            <Section $margin="24px 0">
                <Row>
                    <Column $size={{ sm: 12}}>
                        <PageTopNav>
                            <Button $btnType="secondary" onClick={() => router.back()}>
                                <AiOutlineArrowLeft size={18} /> <span>Back</span>
                            </Button>
                            <Button $btnType="secondary" onClick={() => router.push('/')}>
                                <AiOutlineHome size={18} /> <span>Home</span>
                            </Button>
                        </PageTopNav>
                        <h3 className={displaysShows ? 'tertiary-color' : 'secondary-color'}>
                            {displaysShows ? 'serie tv' : 'film'}
                        </h3>
                        <SectionTilte>{title}</SectionTilte>
                        {displaySearch && 
                            <Section $margin="40px 0 0">
                                <SearchForm 
                                    archiveSearch={true} />
                            </Section>
                        }
                    </Column>
                </Row>
            </Section>
            <Row $gutter={16}>
                {displayFilter &&
                    <Column $size={{ sm: 12, lg: 5, xl: 3 }}>
                        <Filter 
                            key={router.asPath} 
                            displaysShows={displaysShows} 
                            {...genres && {
                                genres
                            }}
                            submitCallback={submitCallback} />
                    </Column>
                }
                <Column $size={archiveColSize}>
                    <div className={classes['archive-list']} ref={archiveRef}>
                        <Row $gutter={16}>
                            {   
                                ((!isLoading && !error) || !!results.length) && 
                                    showsMoviesLoop(false, results,displaysShows, false, true, cardColSize)
                            }
                            {
                                (!isLoading && !error && !results.length) && 
                                    <Column $size={{ sm: 12}}>
                                        <p>Nessun risultato trovato</p>
                                    </Column>    
                            }
                            {   
                                (isLoading && !error)  && 
                                    <div className={classes['centered']}>
                                        <Loader loaderSecondaryColor={displaysShows} />     
                                    </div>
                            }
                            {error && 
                                <div className={classes['centered']}>
                                    <p className={classes['archive-error']}>
                                        <span>Qualcosa è andato storto...</span>
                                        Non siamo riusciti a recuperare 
                                        {displaysShows ? ' le serie tv richieste' : ' i film richiesti'}.
                                    </p>
                                </div>
                            }
                        </Row>
                    </div>
                    <Row $gutter={16}>
                        <Column $size={{sm: 12}}>
                            {(!isLoading && page < totalPages) &&
                                <Button className={classes['load-more-btn']} onClick={() => fetchItems(page+1, true, filterParams)}>
                                    <span>Mostra altri</span><AiOutlinePlus size={18} /> 
                                </Button>
                            }
                        </Column>
                    </Row>
                </Column>
            </Row> 
        </MainContainer>
    );
};

Archive.defaultProps = {
    displaysShows: false,
    displayFilter: true,
    displaySearch: false
};


export default Archive;