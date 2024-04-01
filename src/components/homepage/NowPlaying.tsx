import { MovieObj } from "@/types";
import { Row, Column, MainContainer, SectionTilte, SectionWithBg, LinkButton, DetailsWrapper } from "../layout-components";
import classes from "@/styles/Homepage.module.css";
import Score from "@/components/misc/Score/Score";
import { dateFormatter, textTrimmer } from "@/utils/misc";

const NowPlaying = ({ movie } : {movie: MovieObj}) => {
    const {
        backdrop_path,
        title,
        overview,
        vote_average,
        release_date,
        id
    } = movie;
    
    const description = textTrimmer(overview, 20);
    
    return (
        <SectionWithBg 
            className={classes['hp-head']} 
            $height={{ sm: 65, md: 70, xl: 75}} 
            $bgPath={`${process.env.posterBaseUrl}${backdrop_path}`}
            $padding="110px 0 0"
            $mobileFlexEnd={true}
            $margin="-72.9px 0 80px">
            <MainContainer>
                <div className={classes['hp-head__content']}>
                    <Row>
                        <Column $size={{sm: 12, md: 8, lg: 6, xl: 5}} style={{marginBottom: 0}}>
                            <DetailsWrapper>
                                <h3 className="secondary-color">al cinema</h3>
                                <SectionTilte>{title}</SectionTilte>
                                <span className="date">{dateFormatter(release_date)}</span>
                                <div className="secondary-color">
                                    <Score vote={vote_average}/>
                                </div>
                                <p>{description}</p>
                                <LinkButton href={`/film/${id}`}>
                                    Scopri di più
                                </LinkButton>
                            </DetailsWrapper>
                        </Column>
                    </Row>
                </div>
            </MainContainer>
        </SectionWithBg>
    );
};

export default NowPlaying;