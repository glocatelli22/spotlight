import { Actor } from "@/types";
import Carousel from "../misc/Carousel/Carousel";
import ActorCard from "../archive/ActorCard/ActorCard";
import { SwiperSlide } from "swiper/react";
const Cast = ({ cast }: {cast: Actor[]}) => {

    const castCarouselSettings = {
        loop: false,
        arrows: false,
        speed: 500,
        slidesPerView: 4,
        style: {
            marginTop: '22px'
        },
        breakpoints: {
            1440: {
                slidesPerView: 4
            },
            769: {
                slidesPerView: 3
            },
            0: {
                slidesPerView: 2
            }
        }
    };

    return (
        <Carousel sliderSettings={castCarouselSettings} controls={true}>
            {cast.map(actor => (
                <SwiperSlide key={actor.name}>
                    <ActorCard 
                        key={actor.name}
                        name={actor.name}
                        character={actor.character} 
                        profile_path={actor.profile_path}/>
                </SwiperSlide>
            ))}
        </Carousel>
    );
}

export default Cast;