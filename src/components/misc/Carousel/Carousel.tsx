
import { Swiper, SwiperProps, SwiperRef } from "swiper/react";

import { useEffect, useRef, useState } from "react";
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import classes from './Carousel.module.css';

import 'swiper/css';

interface CarouselProps {
    children: React.ReactNode[] |  React.ReactNode 
    sliderSettings: SwiperProps,
    previewsSlider?: boolean,
    controls?: true
}

const Carousel = ({ children, sliderSettings, previewsSlider, controls } : CarouselProps) => {
    
    const carouselRef = useRef<SwiperRef | null>(null);
    const navigationPrevRef = useRef<HTMLButtonElement | null>(null);
    const navigationNextRef = useRef<HTMLButtonElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const controlsDisableHandler = () => {
        if(navigationPrevRef.current) {
            navigationPrevRef.current.disabled = carouselRef.current?.swiper.isBeginning || false;
        }
        if(navigationNextRef.current) {
            navigationNextRef.current.disabled = carouselRef.current?.swiper.isEnd || false;
        }
    };

    const sliderConfigs = {
        ...sliderSettings,
        ...!previewsSlider && {
            spaceBetween: 24
        },
        ...!sliderSettings.loop && {
            onInit: () => controlsDisableHandler(),
            onSlideChange: () => controlsDisableHandler(),
        }
    };
    
    const carouselPrev = () => {
        carouselRef.current?.swiper.slidePrev();       
    };

    const carouselNext = () => {
        carouselRef.current?.swiper.slideNext();
    };

    useEffect(() => {
        carouselRef.current?.swiper.slideTo(0, 0);
    }, [children]);

    useEffect(() => {
        window.addEventListener('resize', controlsDisableHandler);
        
        const startDraggingHandler = () => setIsDragging(true);
        const endDraggingHandler = () => setIsDragging(false);
        
        carouselRef.current?.swiper.on('sliderMove', startDraggingHandler);
        carouselRef.current?.swiper.on('transitionEnd', endDraggingHandler)
        
        return () => {
            window.removeEventListener('resize', controlsDisableHandler);
        };

    });

    return (
        <>
            <div className={previewsSlider ? classes['previews-carousel-wrapper'] : ''}>
                <div className={isDragging ? 'dragging' : ''}>
                    <Swiper 
                        {...sliderConfigs} 
                        className={ previewsSlider ? 'half-cutted' : ''} 
                        ref={carouselRef}>
                        {children}
                    </Swiper>
                </div>
            </div>
            {controls &&
                <div className={classes['carousel-custom-controls']}>
                    <button 
                        ref={navigationPrevRef}
                        className={classes['custom-carousel-button']} 
                        onClick={carouselPrev}>
                        <AiOutlineLeft />
                    </button>
                    <button 
                         ref={navigationNextRef}
                        className={classes['custom-carousel-button']}
                        onClick={carouselNext}>
                        <AiOutlineRight />
                    </button>
                </div>
            }
        </>
    );
};

Carousel.defaultProps = {
    previewSlider: false,
    controls: false,
    displayShows: false
};

export default Carousel;