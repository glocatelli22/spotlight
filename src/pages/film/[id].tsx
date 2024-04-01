import { MainContainer, Row, Column, SectionWithBg, Poster, DetailsWrapper, Button, TrailerWrapper, Section } from "@/components/layout-components";
import Carousel from "@/components/misc/Carousel/Carousel";
import Score from "@/components/misc/Score/Score";
import { Actor, MovieObj, VideoObj, ProvidersType, NamedItemsObj } from "@/types";
import { GET_TRAILER_BASEURL, GET_RELATED_BASEURL, GET_WATCH_PROVIEDERS_BASEURL, MOVIE_DETAILS_BASEURL, GET_CREDITS, fetchTMDB } from "@/tmdb";
import { dateFormatter, getTrailer, relatedCarouselSettings } from "@/utils/misc";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";
import classes from "@/styles/ArchiveSingle.module.css";
import InfoTable from "@/components/single/InfoTable";
import Providers from "@/components/single/Providers";
import showsMoviesLoop from "@/utils/showsMoviesLoop";
import Cast from "@/components/single/Cast";

interface MovieSingle {
    movie: MovieObj,
    relatedMovies: MovieObj[],
    providers: ProvidersType,
    movieVideos: VideoObj[],
    cast: Actor[],
    directors: NamedItemsObj[]
};

export default function Movie ({ movie, relatedMovies, providers, movieVideos, cast, directors } : MovieSingle) {

    const {
        backdrop_path,
        poster_path,
        title,
        overview,
        vote_average,
        release_date,
        tagline,
        runtime,
        homepage,
        budget,
        revenue,
        genres,
        production_countries,
        production_companies,
    } = movie;

    const router = useRouter();

    const genresNames = genres ? movie.genres.map(gn => gn.name) : [];
    const prodCountyNames = production_countries ? production_countries.map(pc => pc.iso_3166_1) : [];
    const prodCmpNames = production_companies ? production_companies.map(pc => pc.name) : [];
    const trailerUrl = getTrailer(movieVideos);

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
                            <Button $btnType="secondary" $opacityCta={true} onClick={() => router.back()}>
                                <AiOutlineArrowLeft size={18} /> <span>Back</span>
                            </Button>
                            <Row $gutter={16}>
                                <Column $size={{sm: 12, md: 5, xl: 4}}>
                                    <Poster $imgPath={`${process.env.posterBaseUrl}${poster_path}`} />
                                </Column>
                                <Column $size={{sm: 12, md: 7, xl: 8}}>
                                    <DetailsWrapper>
                                        <h1>{title}</h1>
                                        <div className="secondary-color">
                                            <Score vote={vote_average}/>
                                        </div>
                                        <h3>Data di uscita</h3>
                                        <span>{dateFormatter(release_date)}</span>
                                        {!!runtime && 
                                            <>
                                                <h3>Durata</h3>
                                                <span>{`${runtime}'`}</span>
                                            </>
                                        }
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
                                <h4 className="secondary-color">info</h4>
                                <InfoTable data={{
                                    genres: genresNames, 
                                    prodCountries: prodCountyNames, 
                                    prodCompanies: prodCmpNames,
                                    revenue,
                                    budget,
                                    homepage,
                                    directors
                                }} />
                                {!!(providers.buy || providers.flatrate || providers.rent) && 
                                    <>
                                        <h4 className="secondary-color">dove guardarlo</h4>
                                        <Providers providers={providers} />
                                    </>
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
                                        <h4 className="secondary-color">cast</h4>
                                        <h3>Hanno recitato in {title}</h3>
                                        <Cast cast={cast}/>
                                    </Section>
                                }
                                {relatedMovies.length > 0 && 
                                    <Section>
                                        <h4 className="secondary-color">film correlati</h4>
                                        <h3>Chi ha visto {title} ha visto anche...</h3>
                                        <Carousel 
                                            sliderSettings={relatedCarouselSettings} 
                                            controls={true}>
                                            {showsMoviesLoop(true, relatedMovies)}
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

    const MOVIE_ID = context.params?.id || '';

    const movie = await fetchTMDB(`${MOVIE_DETAILS_BASEURL}/${MOVIE_ID}`);
    
    if(!movie?.id) {
        return {
            notFound: true
        };
    }
    
    const relatedMovies = await fetchTMDB(GET_RELATED_BASEURL(movie.id));
    const providers = await fetchTMDB(GET_WATCH_PROVIEDERS_BASEURL(movie.id));
    const movieVideos =  await fetchTMDB(GET_TRAILER_BASEURL(movie.id));
    const castResults = await fetchTMDB(GET_CREDITS(movie.id));

    return {
        props: {
            movie,
            relatedMovies: relatedMovies.results || [],
            providers: providers.results?.IT || [],
            movieVideos: movieVideos.results || [],
            cast: castResults?.cast?.filter?.((itm: {known_for_department: string}) => itm.known_for_department === 'Acting') || [],
            directors: castResults?.crew?.filter?.((itm : {job: string}) => itm.job === 'Director') || []
        }
    };

}) satisfies GetServerSideProps;