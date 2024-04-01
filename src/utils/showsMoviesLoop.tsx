import ArchiveCard from "../components/archive/ArchiveCard/ArchiveCard";
import { MovieObj, ShowObj } from "@/types";
import { Column, sizeObj } from "@/components/layout-components";
import React from "react";
import { SwiperSlide } from "swiper/react";


const showsMoviesLoop  = (
    sliderLoop: boolean,
    items : ShowObj[] | MovieObj[], 
    displaysShows: boolean = false,
    displaysPreviews: boolean = false,
    grid: boolean = false,
    colSizing?: sizeObj,
) => {
    
    const wrapper = (key: number, children: React.ReactElement ) => {
        return !!(grid && colSizing) ?
            <Column key={key} $size={colSizing}>
                {children}
            </Column> : 
            <SwiperSlide key={key}> {children} </SwiperSlide>
    };

    if(!items) {
        return <div />
    }

    return items.map((itm, key) =>{                          
        const url = displaysShows ? '/serie-tv/' : '/film/';
        const additionalClass: string[] = [];
        
        if(sliderLoop) {
            additionalClass.push('slider-card');
        }

        if(displaysShows) {
            additionalClass.push('show');
        }

        if(displaysPreviews) {
            additionalClass.push('preview-card');
        }

        return (
            wrapper(
                key, 
                <ArchiveCard 
                    id={itm.id}
                    title={displaysShows ? (itm as ShowObj).name : (itm as MovieObj).title} 
                    releaseDate={displaysShows ? (itm as ShowObj).first_air_date : (itm as MovieObj).release_date} 
                    posterPath={displaysPreviews ? itm.backdrop_path : itm.poster_path} 
                    vote={itm.vote_average}
                    url={url}
                    additionalClasses={additionalClass} />
            )
        )
    });
};

export default showsMoviesLoop;