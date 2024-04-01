import { ShowObj, MovieObj } from "@/types"
import Carousel from "../../misc/Carousel/Carousel";
import Link from "next/link";
import classes from  "@/styles/Homepage.module.css";
import { MainContainer } from "@/components/layout-components";
import { AiOutlineRight } from "react-icons/ai";
import showsMoviesLoop from "@/utils/showsMoviesLoop";


interface FeaturedProps {
    items: ShowObj[] | MovieObj[], 
    title: string,  
    displaysShows: boolean, 
    link: string
};

const Featured = ({ items, title, displaysShows, link } : FeaturedProps) => {
    
    const sliderSettings = {
        loop: false,
        speed: 500,
        slidesPerView: 3.2,
        breakpoints: {
            1280: {
                slidesPerView: 3.2,
            },
            950: {
                slidesPerView: 2.5
            },
            768: {
                slidesPerView: 1.5
            },
            0: {
                slidesPerView: 1.2
            }
        }
    };

    return (
        <div className={classes['hp-carousel-section']}>
            <MainContainer>
                <div className={classes['hp-carousel-section__head']}>
                    <h3 className={displaysShows ? 'tertiary-color' : 'secondary-color'}>
                        {displaysShows ? 'serie tv' : 'film'}
                    </h3>
                    <div className={classes['title-wrapper']}>
                        <h2>{title}</h2>
                        <Link href={link}>guarda tutti <AiOutlineRight /></Link>
                    </div>
                </div>
            </MainContainer>
            {items.length > 0 &&
                <div className={classes['hp-carousel__wrapper']}>
                    <Carousel 
                        sliderSettings={sliderSettings}
                        previewsSlider={true}
                        controls={true}>
                        {showsMoviesLoop(true, items,displaysShows, true, false)}
                    </Carousel>    
                </div>
            }
        </div>
    )
};

Featured.defaultProps = {
    displaysShows: false
};

export default Featured;