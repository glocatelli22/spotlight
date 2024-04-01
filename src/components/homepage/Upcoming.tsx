import { MovieObj, VideoObj } from "@/types";
import { LinkButton, Row, Column, MainContainer, SectionTilte, SectionWithBg, DetailsWrapper, TrailerWrapper, Poster } from "../layout-components";
import classes from "@/styles/Homepage.module.css";
import { dateFormatter, getTrailer, textTrimmer } from "@/utils/misc";
import Image from "next/image";

const UpComing = ({ movie, movieVideos } : {movie: MovieObj, movieVideos: VideoObj[]}) => {
   
    const {
        backdrop_path,
        title,
        overview,
        release_date,
        id
    } = movie;
    
    const description = textTrimmer(overview, 60);

    const trailerUrl = getTrailer(movieVideos);
    const background = backdrop_path ? process.env.posterBaseUrl+backdrop_path : '/fallback.jpg';

    if(!trailerUrl && !backdrop_path) {
        return <></>;
    }

    return (
        <SectionWithBg 
            $height={{ sm: 40, md: 50, xl: 60}} 
            className={classes['hp-upcoming-movie']} 
            $bgPath={background}
            $padding="40px 0 0"
            $margin="40px 0"
            $fadeBoth={true}>
            <MainContainer>
                <Row $gutter={20} className={classes['hp-upcoming-movie__row']}>
                    <Column $size={{sm: 12, xl: 6}}>
                        <TrailerWrapper>
                            {trailerUrl && 
                                <iframe title="trailer" src={trailerUrl} allowFullScreen></iframe> 
                            }
                            {!!(!trailerUrl && backdrop_path) &&
                                <Image 
                                    src={`${process.env.posterBaseUrl}${backdrop_path}`} 
                                    alt={title}
                                    fill
                                />
                            }
                        </TrailerWrapper>
                    </Column>
                    <Column $size={{sm: 12, xl: 6}}>
                        <DetailsWrapper>
                            <h3 className="secondary-color">coming soon</h3>
                            <SectionTilte>{title}</SectionTilte>
                            <span className="date">{dateFormatter(release_date)}</span>
                            <p>{description}</p>
                            <LinkButton href={`/film/${id}`}>
                                Scopri di più
                            </LinkButton>
                        </DetailsWrapper>
                    </Column>
                </Row>
            </MainContainer>
        </SectionWithBg>
    );
};

export default UpComing;