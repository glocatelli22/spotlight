import { MainContainer, Row, Column, SectionWithBg, Poster, DetailsWrapper, Button, TrailerWrapper, Section } from "@/components/layout-components";
import Carousel from "@/components/misc/Carousel/Carousel";
import Score from "@/components/misc/Score/Score";
import { Actor, VideoObj,  ProvidersType, ShowObj } from "@/types";
import { GET_WATCH_PROVIEDERS_BASEURL, fetchTMDB, SHOW_DETAILS_BASEURL, GET_RELATED_BASEURL, GET_TRAILER_BASEURL, GET_CREDITS } from "@/tmdb";
import { dateFormatter, getTrailer, relatedCarouselSettings } from "@/utils/misc";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import classes from "@/styles/ArchiveSingle.module.css";
import InfoTable from "@/components/single/InfoTable";
import Providers from "@/components/single/Providers";
import showsMoviesLoop from "@/utils/showsMoviesLoop";
import Cast from "@/components/single/Cast";

interface ShowSingle {
    show: ShowObj,
    relatedShows: ShowObj[],
    providers: ProvidersType,
    showVideos: VideoObj[],
    cast: Actor[]
};

export default function Show ({ show, relatedShows, providers, showVideos, cast } : ShowSingle) {

    const {
        backdrop_path,
        poster_path,
        name,
        overview,
        vote_average,
        first_air_date,
        last_air_date,
        status,
        number_of_seasons,
        tagline,
        homepage,
        budget,
        revenue,
        genres,
        production_countries,
        production_companies,
        episode_run_time,
        created_by
    } = show;

    const router = useRouter();

    const genresNames = genres ? show.genres.map(gn => gn.name) : [];
    const prodCountyNames = production_countries ? production_countries.map(pc => pc.iso_3166_1) : [];
    const prodCmpNames = production_companies ? production_companies.map(pc => pc.name) : [];
    const trailerUrl = getTrailer(showVideos);

    return (
        <>
            <SectionWithBg 
                $height={{ sm: 50, md: 60, xl: 70}} 
                $bgPath={`${process.env.posterBaseUrl}${backdrop_path}`}
                $fullBg={false}
                $padding="110px 0 8px"
                $margin="-72.9px 0 0">
                <MainContainer>
                    <Row $gutter={0} $centerContent={true}>
                        <Column $size={{sm: 12, xl: 10}}>
                            <Button $btnType="secondary" onClick={() => router.back()} $opacityCta={true}>
                                <AiOutlineArrowLeft size={18} /> <span>Back</span>
                            </Button>
                            <Row $gutter={16}>
                                <Column $size={{sm: 12, md: 5, xl: 4}}>
                                    <Poster $imgPath={`${process.env.posterBaseUrl}${poster_path}`} />
                                </Column>
                                <Column $size={{sm: 12, md: 7, xl: 8}}>
                                    <DetailsWrapper>
                                        <h1>{name}</h1>
                                        <div className="tertiary-color">
                                            <Score vote={vote_average}/>
                                        </div>
                                        <h3>Data di uscita</h3>
                                        <span>{dateFormatter(first_air_date)}</span>
                                        {number_of_seasons > 0 && <> 
                                            <h3>Stagioni</h3>
                                            <span>
                                                {number_of_seasons}
                                                {status !== 'Ended' ? ' (in prouzione)' : ' (terminata)'}
                                            </span> 
                                        </>} 
                                        {episode_run_time.length > 0 && 
                                            <>
                                                <h3>Durata episodio</h3>
                                                <span>{`${episode_run_time.join('\' / ')}'`}</span> 
                                            </>
                                        }
                                        <h3>Ultimo episodio</h3>
                                        <span>{dateFormatter(last_air_date)}</span>
                                        {!!(overview || tagline) && 
                                            <h3>Descrizione</h3>
                                        }
                                        {!!tagline &&
                                            <blockquote>{tagline}</blockquote>
                                        }
                                        <p>{overview}</p>
                                    </DetailsWrapper>
                                </Column>
                            </Row>
                        </Column>
                    </Row>
                </MainContainer>
            </SectionWithBg>
            <MainContainer>
                <Row $gutter={0} $centerContent={true}>
                    <Column $size={{sm: 12, xl: 10}}>
                        <Row $gutter={16}>
                            <Column $size={{sm: 12, md:5, lg: 4}} className={classes['info-tab-col']}>
                                <h4 className="tertiary-color">info</h4>
                                <InfoTable data={{
                                    genres: genresNames, 
                                    prodCountries: prodCountyNames, 
                                    prodCompanies: prodCmpNames,
                                    created_by,
                                    revenue,
                                    budget,
                                    homepage
                                }} />
                                {!!(providers.buy || providers.flatrate || providers.rent) && 
                                    <Section>
                                        <h4 className="tertiary-color">dove guardarlo</h4>
                                        <Providers providers={providers} />
                                    </Section>
                                }
                            </Column>
                            <Column $size={{sm: 12, md: 7, lg: 8}}>
                                {trailerUrl &&
                                    <Section>
                                        <h3>Trailer</h3>
                                        <TrailerWrapper $margin="16px 0 40px">
                                            <iframe title="trailer" src={trailerUrl} allowFullScreen></iframe>
                                        </TrailerWrapper> 
                                    </Section>
                                }
                                {cast.length > 0 && 
                                    <Section>
                                        <h4 className="tertiary-color">cast</h4>
                                        <h3>Hanno recitato in {name}</h3>
                                        <Cast cast={cast}/>
                                    </Section>
                                }
                                {relatedShows.length > 0 && 
                                    <Section>
                                        <h4 className="tertiary-color">serie tv correlate</h4>
                                        <h3>Chi ha visto {name} ha visto anche...</h3>
                                        <Carousel 
                                            sliderSettings={relatedCarouselSettings} 
                                            controls={true}>
                                            {showsMoviesLoop(true, relatedShows, true)}
                                        </Carousel>
                                    </Section>
                                }
                            </Column>
                        </Row>
                    </Column>
                </Row>
            </MainContainer>
        </>
    );
};

export const getServerSideProps = (async (context) => {

    const SHOW_ID = context.params?.id || '';

    const show = await fetchTMDB(`${SHOW_DETAILS_BASEURL}/${SHOW_ID}`);
    
    if(!show?.id) {
        return {
            notFound: true
        };
    }
    
    const relatedShows = await fetchTMDB(GET_RELATED_BASEURL(show.id, true));
    const providers = await fetchTMDB(GET_WATCH_PROVIEDERS_BASEURL(show.id, true));
    const showVideos =  await fetchTMDB(GET_TRAILER_BASEURL(show.id, true));
    const castResults = await fetchTMDB(GET_CREDITS(show.id, true));
    
    return {
        props: {
            show,
            relatedShows: relatedShows.results || [],
            providers: providers.results?.IT || [],
            showVideos: showVideos.results || [],
            cast: castResults?.cast?.filter?.((itm: {known_for_department: string}) => itm.known_for_department === 'Acting') || []
        }
    };

}) satisfies GetServerSideProps;