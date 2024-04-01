import React from "react";

import classes from "./ArchiveCard.module.css";
import Link from "next/link";

import { MovieShowPreview } from "@/types";
import { dateFormatter } from "@/utils/misc";
import Score from "../../misc/Score/Score";


const ArchiveCard = ( props: MovieShowPreview ) => {
    
    const {
        id, 
        title, 
        releaseDate, 
        posterPath, 
        vote, 
        url,
        additionalClasses
    } = props;

   
    const releaseDateFormatted = releaseDate ? dateFormatter(releaseDate) : '';
    const cssClasses = additionalClasses.map(cssClass => classes[cssClass]);
    const cardClasses = `${classes['archive-card']} ${cssClasses.join(' ')}`
    return (
        <Link href={url+id} className={cardClasses}  draggable={false}>
            {posterPath && 
                <div 
                    className={classes['archive-card__poster']} 
                    style={{backgroundImage: `url('${process.env.posterBaseUrl}${posterPath})'`}}
                    draggable={false}>
                </div>
            }
            <div className={classes['archive-card__content']} >
                <h3>{title}</h3>
                {releaseDateFormatted && <span>{releaseDateFormatted}</span>}
                <Score vote={vote} />
            </div>
        </Link>
    );
};

export default ArchiveCard;