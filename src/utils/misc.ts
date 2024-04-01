import { VideoObj } from "@/types";

export const dateFormatter = (date: string) => {
    if(!date) {
        return "";
    }
    const releaseDateFormatted = date.split('-').reverse();
    return releaseDateFormatted.join('/');
};

export const textTrimmer = (text: string = '', lenght: number) : string => {
    let textArray = text?.split(' ') || [];
    const trim = textArray?.length > lenght;
    textArray.length = trim ? lenght : textArray?.length;
    return `${textArray.join(' ')}${trim ? '...' : ''}`;
};

export const getTrailer = (videos: VideoObj[]) => {
    if(!videos.length){
        return '';
    }
    const trailer = videos.filter(v => v.type === 'Trailer' && v.official);
    return trailer[0]?.key ? `https://www.youtube.com/embed/${trailer[0].key}` : '';
};

export const submenuList = [
    {
        title: 'Film',
        subMenuLinks: [
            {
                title: 'Tutti I Film',
                path: '/archivio/film'
            },
            {
                title: 'Ultime Uscite',
                path: '/archivio/film/ultime-uscite'
            },
            {
                title: 'Popolari',
                path: '/archivio/film/popolari'
            },
            {
                title: 'Top Rated',
                path: '/archivio/film/top-rated'
            },
            {
                title: 'Coming Soon',
                path: '/archivio/film/coming-soon'
            }
        ]
    },
    {
        title: 'Serie TV',
        subMenuLinks: [
            {
                title: 'Tutte Le Serie TV',
                path: '/archivio/serie-tv'
            },
            {
                title: 'In Onda',
                path: '/archivio/serie-tv/in-onda'
            },
            {
                title: 'Popolari',
                path: '/archivio/serie-tv/popolari'
            },
            {
                title: 'Top Rated',
                path: '/archivio/serie-tv/top-rated'
            }
        ]
    }
];

export const relatedCarouselSettings = {
    loop: true,
    speed: 500,
    slidesPerView: 3,
    style: {
        marginTop: '22px'
    },
    breakpoints: {
        901: {
            slidesPerView: 3 
        },
        0: {
            slidesPerView: 2
        }
    }
};